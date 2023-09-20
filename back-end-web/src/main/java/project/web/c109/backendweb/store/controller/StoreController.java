package project.web.c109.backendweb.store.controller;


import io.swagger.v3.oas.annotations.Operation;
import javax.persistence.criteria.CriteriaBuilder.In;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.web.c109.backendweb.store.domain.entity.Store;
import project.web.c109.backendweb.store.service.StoreService;
import java.util.List;

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

}
