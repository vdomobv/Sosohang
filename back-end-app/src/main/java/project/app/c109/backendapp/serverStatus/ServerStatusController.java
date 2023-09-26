package project.app.c109.backendapp.serverStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/v1/test")
@Tag(name = "TEST", description = "SERVER STATUS CHECK")
public class ServerStatusController {

	@GetMapping
	@Operation(summary = "Check server status", description = "Returns a message indicating server deployment status.")
	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "Server 배포 성공",
			content = @Content(schema = @Schema(implementation = String.class))),
		@ApiResponse(responseCode = "500", description = "Internal Server Error")
	})
	public ResponseEntity<String> checkServerStatus() {
		return ResponseEntity.ok("Server 배포 성공");
	}
}
