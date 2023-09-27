package project.app.c109.backendapp.store.domain.dto.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.List; // 추가

@Getter
@Setter
public class StoreRegisterRequest {

	@NotNull
	private Integer categorySeq;

	@NotBlank
	private String storePassword;

	@NotBlank
	private String storeName;

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

	private List<Integer> selectedKeywordSeqList;

	private String storeImage;
}
