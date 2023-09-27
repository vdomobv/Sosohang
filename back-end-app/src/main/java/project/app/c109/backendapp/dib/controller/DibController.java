package project.app.c109.backendapp.dib.controller;

import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.app.c109.backendapp.dib.domain.entity.Dib;
import project.app.c109.backendapp.dib.service.DibService;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;
import java.util.List;

@RestController
@RequestMapping("api/v1/dib")
public class DibController {

    private final DibService dibService;

    public DibController(DibService dibService) {
        this.dibService = dibService;
    }

    @GetMapping("{memberSeq}")
    public ResponseEntity<List<Dib>> getDibsByMemberSeq(@PathVariable Integer memberSeq) {
        try {
            List<Dib> dibs = dibService.getDibsByMember(memberSeq);
            return ResponseEntity.ok(dibs);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping("/add")
    public ResponseEntity<String> addDib(@RequestParam Integer memberId, @RequestParam Integer storeId) {
        try {
            dibService.addDib(memberId, storeId);
            return ResponseEntity.ok("Dib added successfully.");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Entity not found: " + e.getMessage());
        } catch (EntityExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Entity already Exists: " + e.getMessage());
        }
    }

    @DeleteMapping("/remove")
    public ResponseEntity<String> removeDib(@RequestParam Integer memberSeq, @RequestParam Integer storeSeq) {
        try {
            dibService.removeDib(memberSeq, storeSeq);
            return ResponseEntity.noContent().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Entity not found: " + e.getMessage());
        }
    }

}
