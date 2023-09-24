package project.app.c109.backendapp.store.controller;


import io.swagger.v3.oas.annotations.Operation;
import java.time.LocalDateTime;
import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import project.app.c109.backendapp.store.domain.dto.request.StoreRequestDTO;
import project.app.c109.backendapp.store.domain.dto.response.StoreResponseDTO;
import project.app.c109.backendapp.store.domain.entity.Store;
import project.app.c109.backendapp.store.service.StoreService;

@RestController
@RequestMapping("/api/store")
public class StoreController {

	@Autowired
	private StoreService storeService;

	@Operation(summary = "모든 상점 정보 조회")
	@GetMapping
	public ResponseEntity<List<Store>> getAllStores() {
		return ResponseEntity.ok(storeService.findAll());
	}

	@Operation(summary = "특정 상점 정보 조회")
	@GetMapping("/{storeSeq}")
	public ResponseEntity<Store> getStore(@PathVariable Integer storeSeq) {
		return storeService.findById(storeSeq)
			.map(ResponseEntity::ok)
			.orElse(ResponseEntity.notFound().build());
	}

	@Operation(summary = "새로운 상점 정보 생성")
	@PostMapping
	public ResponseEntity<StoreResponseDTO> createStore(
		@Valid @RequestBody StoreRequestDTO storeRequestDTO) {

		Store store = new Store();

		store.setStoreId(storeRequestDTO.getStoreId());
		store.setCategorySeq(storeRequestDTO.getCategorySeq());
		store.setStorePassword(storeRequestDTO.getStorePassword());
		store.setStoreName(storeRequestDTO.getStoreName());
		store.setStoreId(storeRequestDTO.getStoreId());
		store.setStoreLocation(storeRequestDTO.getStoreLocation());
		store.setStoreParkinglot(storeRequestDTO.getStoreParkinglot());
		store.setRegistrationNumber(storeRequestDTO.getRegistrationNumber());
		store.setStoreWorkhour(storeRequestDTO.getStoreWorkhour());
		store.setStoreHoliday(storeRequestDTO.getStoreHoliday());
		store.setStoreExtraInfo(storeRequestDTO.getStoreExtraInfo());
		store.setStoreUrl(storeRequestDTO.getStoreUrl());
		store.setStoreTell(storeRequestDTO.getStoreTell());
		store.setOwnerTell(storeRequestDTO.getOwnerTell());
		store.setAddedDate(LocalDateTime.now());
		storeService.save(store);

		return ResponseEntity.status(201).build();
	}
}
