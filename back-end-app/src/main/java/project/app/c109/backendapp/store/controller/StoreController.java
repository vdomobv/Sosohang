package project.app.c109.backendapp.store.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import project.app.c109.backendapp.keyword.domain.entity.Keyword;
import project.app.c109.backendapp.config.security.jwt.JwtUtils;
import project.app.c109.backendapp.store.domain.dto.request.StoreLoginRequest;
import project.app.c109.backendapp.store.domain.dto.request.StoreRegisterRequest;
import project.app.c109.backendapp.store.domain.entity.Store;
import project.app.c109.backendapp.store.service.StoreService;
import project.app.c109.backendapp.storekeyword.service.StoreKeywordService;


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


	@Autowired
	public StoreController(StoreService storeService, StoreKeywordService storeKeywordService, JwtUtils jwtUtils, PasswordEncoder passwordEncoder) {
		this.storeKeywordService = storeKeywordService;
		this.storeService = storeService;
		this.jwtUtils = jwtUtils;
		this.passwordEncoder = passwordEncoder;
	}

	@PostMapping("/register")
	public ResponseEntity<String> registerStore(@RequestBody StoreRegisterRequest request) {
		storeService.registerStore(request);
		return ResponseEntity.ok("Store registered successfully");
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
	public ResponseEntity<?> login(@RequestBody StoreLoginRequest storeLoginRequest) throws AuthenticationException {
		logger.info("Attempting store login for registrationNumber: " + storeLoginRequest.getRegistrationNumber());

		Store store = storeService.findStoreByRegistrationNumber(storeLoginRequest.getRegistrationNumber());

		if (store != null && passwordEncoder.matches(storeLoginRequest.getStorePassword(), store.getStorePassword())) {
			// 로그인 성공 시 JWT 토큰 생성하여 반환
			String token = jwtUtils.generateStoreToken(storeLoginRequest.getRegistrationNumber());
			logger.info("Store login successful for registrationNumber: " + storeLoginRequest.getRegistrationNumber());
			Map<String, String> response = new HashMap<>();
			response.put("token", token);
			return ResponseEntity.ok(response);
		} else {
			logger.error("Store login failed for registrationNumber: " + storeLoginRequest.getRegistrationNumber());
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
	}
}