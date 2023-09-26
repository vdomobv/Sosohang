package project.app.c109.backendapp.serverStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/test")
public class ServerStatusController {

	@GetMapping
	public ResponseEntity<String> checkServerStatus() {
		return ResponseEntity.ok("Server 배포 성공");
	}
}