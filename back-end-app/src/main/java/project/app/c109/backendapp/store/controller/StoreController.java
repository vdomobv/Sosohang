package project.app.c109.backendapp.store.controller;

import io.swagger.v3.oas.annotations.headers.Header;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
import project.app.c109.backendapp.ex.ErrorResponse;
import project.app.c109.backendapp.keyword.domain.entity.Keyword;
import project.app.c109.backendapp.config.security.jwt.JwtUtils;
import project.app.c109.backendapp.store.domain.dto.request.StoreLoginRequest;
import project.app.c109.backendapp.store.domain.dto.request.StoreRegisterRequest;
import project.app.c109.backendapp.store.domain.dto.request.StoreUpdateRequest;
import project.app.c109.backendapp.store.domain.dto.response.StoreLoginResponse;
import project.app.c109.backendapp.store.domain.entity.Store;
import project.app.c109.backendapp.store.repository.StoreRepository;
import project.app.c109.backendapp.store.service.StoreService;
import project.app.c109.backendapp.storekeyword.service.StoreKeywordService;


import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/store")
public class StoreController {

	private static final Logger logger = LoggerFactory.getLogger(StoreController.class);

	private final StoreService storeService;

	private final StoreKeywordService storeKeywordService;

	private final JwtUtils jwtUtils;

	private final PasswordEncoder passwordEncoder;

	private final StoreRepository storeRepository;

	@Autowired
	public StoreController(StoreService storeService, StoreKeywordService storeKeywordService, JwtUtils jwtUtils, PasswordEncoder passwordEncoder, StoreRepository storeRepository) {
		this.storeKeywordService = storeKeywordService;
		this.storeService = storeService;
		this.jwtUtils = jwtUtils;
		this.passwordEncoder = passwordEncoder;
		this.storeRepository = storeRepository;
	}

	@PostMapping("/register")
	public ResponseEntity<?> registerStore(@RequestBody StoreRegisterRequest request) {
		try {
			storeService.registerStore(request);
			return ResponseEntity.ok("Store registered successfully");
		} catch (EntityExistsException ex) {
			ErrorResponse errorResponse = new ErrorResponse(409, "가입된 회원");
			return ResponseEntity.status(HttpStatus.CONFLICT).body(errorResponse);
		}
	}

	@PostMapping("/duplicated")
	public ResponseEntity<?> checkDuplication(@RequestBody String registrationNumber) {
		boolean isDuplicated = storeRepository.existsByRegistrationNumber(registrationNumber);

		if (isDuplicated) {
			// 중복된 스토어가 존재하면 클라이언트에게 중복된 회원임을 알려줍니다.
			ErrorResponse errorResponse = new ErrorResponse(409, "가입된 회원");
			return ResponseEntity.status(HttpStatus.CONFLICT).body(errorResponse);
		} else {
			// 중복되지 않은 경우 신규 회원임을 알려줍니다.
			return ResponseEntity.ok("신규 회원입니다");
		}
	}

	@PostMapping("/register/phone-check")
	public ResponseEntity<Map<String, String>> handlePhoneVerification(@RequestParam String ownerPhone) {
		String authCode = storeService.handlePhoneVerification(ownerPhone);
		Map<String, String> response = new HashMap<>();
		response.put("status", "success");
		response.put("authCode", authCode);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@PostMapping("/password/phone-check")
	public ResponseEntity<Map<String, String>> handlePhoneVerificationForPasswordChange(@RequestParam String registrationNumber, @RequestParam String ownerTell) {
		try {
			Store store = storeService.findStoreByRegistrationNumber(registrationNumber);
			String savedOwnerTell = store.getOwnerTell();

			if (savedOwnerTell.equals(ownerTell)) {
				String authCode = storeService.handlePhoneVerification(ownerTell);
				Map<String, String> response = new HashMap<>();
				response.put("status", "success");
				response.put("authCode", authCode);
				return new ResponseEntity<>(response, HttpStatus.OK);
			} else {
				Map<String, String> response = new HashMap<>();
				response.put("status", "failure");
				response.put("message", "등록된 휴대폰 번호와 일치하지 않습니다.");
				return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
			}
		} catch (EntityNotFoundException e) {
			Map<String, String> response = new HashMap<>();
			response.put("status", "failure");
			response.put("message", e.getMessage());
			return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/password/change")
	public ResponseEntity<Map<String, String>> changePassword(@RequestParam String registrationNumber,
															  @RequestParam String newPassword) {
		logger.info("Received a request to change password for registrationNumber: {}", registrationNumber);

		storeService.changePassword(registrationNumber, newPassword);

		Map<String, String> response = new HashMap<>();
		response.put("status", "success");
		response.put("message", "Password has been successfully changed.");
		logger.info("Password changed successfully for registrationNumber: {}", registrationNumber);

		return ResponseEntity.ok(response);
	}

	@PostMapping("/verify-code")
	public ResponseEntity<Map<String, String>> verifyAuthCode(@RequestParam String ownerPhone,
															  @RequestParam String authCode) {
		boolean isVerified = storeService.verifyAuthCode(ownerPhone, authCode);
		Map<String, String> response = new HashMap<>();
		if (isVerified) {
			response.put("status", "success");
			response.put("message", "The authentication code is valid.");
			logger.info("Authentication code verified successfully for memberPhone: {}", ownerPhone);
			return new ResponseEntity<>(response, HttpStatus.OK);
		} else {
			response.put("status", "error");
			response.put("message", "The authentication code is invalid or expired.");
			logger.warn("Authentication code verification failed for memberPhone: {}", ownerPhone);
			return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
		}
	}

	@PutMapping("/update/{storeSeq}")
	public ResponseEntity<Store> updateStoreInfo(@RequestBody StoreUpdateRequest storeUpdateRequest, @PathVariable Integer storeSeq) {
		try {
			Store updateStore = storeService.updateStoreInfo(storeUpdateRequest, storeSeq);
			return ResponseEntity.ok(updateStore);
		} catch (EntityNotFoundException e) {
			// 상점이나 카테고리를 찾을 수 없는 경우 처리
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}

	@GetMapping("")
	public List<Store> getAllStores() {
		return storeService.getAllStores();
	}

	@GetMapping("/{storeId}")
	public ResponseEntity<Store> getStoreDetails(@PathVariable Integer storeId) {
		Store store = storeService.getStoreDetails(storeId);
		if (store != null) {
			return ResponseEntity.ok(store);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@GetMapping("/category/{categoryId}")
	public List<Store> getStoresByCategory(@PathVariable Integer categoryId) {
		return storeService.getStoresByCategory(categoryId);
	}

	@GetMapping("/keyword/{keywordId}")
	public List<Store> getStoresByKeyword(@PathVariable Integer keywordId) {
		return storeService.getStoresByKeyword(keywordId);
	}

	@GetMapping("/keywordlist/{storeId}")
	public ResponseEntity<List<Keyword>> getStoreKeywords(@PathVariable Integer storeId) {
		List<Keyword> keywords = storeKeywordService.getKeywordsByStoreId(storeId);
		return ResponseEntity.ok(keywords);
	}

	@PostMapping("/login")
	public ResponseEntity<StoreLoginResponse> login(@RequestBody StoreLoginRequest storeLoginRequest) throws AuthenticationException {
		logger.info("Attempting store login for registrationNumber: " + storeLoginRequest.getRegistrationNumber());

		Store store = storeService.findStoreByRegistrationNumber(storeLoginRequest.getRegistrationNumber());

		if (store != null && passwordEncoder.matches(storeLoginRequest.getStorePassword(), store.getStorePassword())) {
			// 로그인 성공 시 JWT 토큰 생성하여 반환
			String token = jwtUtils.generateStoreToken(storeLoginRequest.getRegistrationNumber());
			logger.info("Store login successful for registrationNumber: " + storeLoginRequest.getRegistrationNumber());

			// 토큰과 스토어 정보를 응답 객체에 담아 반환
			StoreLoginResponse response = new StoreLoginResponse(token, store);
			return ResponseEntity.ok(response);
		} else {
			logger.error("Store login failed for registrationNumber: " + storeLoginRequest.getRegistrationNumber());
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
	}

	@PostMapping("/token_test")
	public ResponseEntity<?> test(HttpServletRequest request) {
		String jwtToken = request.getHeader("Authorization"); // Authorization 헤더에서 JWT 토큰을 추출
		logger.info(jwtToken);
		if (jwtToken != null && jwtToken.startsWith("Bearer ")) {
			jwtToken = jwtToken.substring(7); // "Bearer " 부분을 제외한 토큰 추출
			// JWT 토큰의 유효성 검사
			if (jwtUtils.validateToken(jwtToken)) {
				String registrationNumber = jwtUtils.getRegistrationNumberFromToken(jwtToken);
				if (registrationNumber != null) {
					Store store = storeService.findStoreByRegistrationNumber(registrationNumber);
					if (store != null) {
						return ResponseEntity.ok(store);
					} else {
						return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Store not found");
					}
				} else {
					return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid JWT token");
				}
			}
		}

		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
	}

	@GetMapping("/nearby")
	public ResponseEntity<List<Store>> getNearStores (@RequestParam Double latitude, @RequestParam Double longitude) {
		List<Store> stores = storeService.getNearStores(latitude, longitude);
		return ResponseEntity.ok(stores);
	}


}