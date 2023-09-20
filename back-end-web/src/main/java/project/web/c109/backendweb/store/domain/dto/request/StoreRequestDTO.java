package project.web.c109.backendweb.store.domain.dto.request;

import lombok.Getter;
import lombok.Setter;
import javax.validation.constraints.*;

@Getter
@Setter
public class StoreRequestDTO {

	@NotNull
	private Integer categorySeq;

	@NotBlank
	private String storePassword;

	@NotBlank
	private String storeName;

	@NotBlank
	private String storeId;

	private String storeLocation;

	private String storeTell;

	private String ownerTell;

	private String storeParkinglot;

	@NotBlank
	private String registrationNumber;

	private String storeWorkhour;

	private String storeHoliday;

	private String storeExtraInfo;

	private String storeUrl;

}
