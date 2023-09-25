package project.app.c109.backendapp.store.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.app.c109.backendapp.keyword.domain.entity.Keyword;
import project.app.c109.backendapp.store.domain.dto.request.StoreRegisterRequest;
import project.app.c109.backendapp.store.domain.entity.Store;
import project.app.c109.backendapp.store.service.StoreService;
import project.app.c109.backendapp.storekeyword.service.StoreKeywordService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/store")
public class StoreController {

	private final StoreService storeService;

	private final StoreKeywordService storeKeywordService;

	@Autowired
	public StoreController(StoreService storeService, StoreKeywordService storeKeywordService) {
		this.storeKeywordService = storeKeywordService;
		this.storeService = storeService;
	}

	@PostMapping("/register")
	public Store registerStore(@RequestBody StoreRegisterRequest request) {
		return storeService.registerStore(request);
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
}