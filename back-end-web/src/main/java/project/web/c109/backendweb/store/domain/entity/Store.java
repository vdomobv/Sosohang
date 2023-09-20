package project.web.c109.backendweb.store.domain.entity;

import javax.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;
@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "store")
public class Store {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "store_seq")
	private Integer storeSeq;

	@Column(name = "category_seq")
	private Integer categorySeq;

	@Column(name = "store_password")
	private String storePassword;

	@Column(name = "store_name")
	private String storeName;

	@Column(name = "store_id")
	private String storeId;

	@Column(name = "store_location")
	private String storeLocation;

	@Column(name = "store_tell")
	private String storeTell;

	@Column(name = "owner_tell")
	private String ownerTell;

	@Column(name = "store_parkinglot")
	private String storeParkinglot;

	@Column(name="registration_number")
	private String registrationNumber;

	@Column (name="store_workhour")
	private String storeWorkhour;

	@Column (name="store_holiday")
	private String storeHoliday;

	@Column (name="store_extra_info")
	private String storeExtraInfo;

	@Column (name="store_url")
	private String storeUrl;

	@Column (name="added_date")
	private LocalDateTime addedDate;

}
