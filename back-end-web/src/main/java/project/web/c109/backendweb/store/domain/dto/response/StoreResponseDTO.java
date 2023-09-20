package project.web.c109.backendweb.store.domain.dto.response;

import java.util.Date;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class StoreResponseDTO {

	private Integer storeSeq;

	private Integer categorySeq;

	private String storeName;

	private String storeId;

	private String storeLocation;

	private String storeTell;

	private String ownerTell;

	private String storeParkinglot;

	private String registrationNumber;

	private String storeWorkhour;

	private String storeHoliday;

	private String storeExtraInfo;

	private String storeUrl;

	private Date addedDate;
}
