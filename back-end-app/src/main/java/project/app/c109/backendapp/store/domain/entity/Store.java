package project.app.c109.backendapp.store.domain.entity;

import java.time.LocalDateTime;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import project.app.c109.backendapp.category.domain.entity.Category;

@Entity
@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Table(name = "store")
public class Store {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "store_seq")
	private Integer storeSeq;

	@ManyToOne
	@JoinColumn(name = "category_seq", referencedColumnName = "category_seq")
	private Category category;

	@JsonIgnore
	@Column(name = "store_password")
	private String storePassword;

	@Column(name = "store_name")
	private String storeName;

	@Column(name = "store_location")
	private String storeLocation;

	@Column(name = "store_tell")
	private String storeTell;

	@JsonIgnore
	@Column(name = "owner_tell")
	private String ownerTell;

	@Column(name = "store_parkinglot")
	private String storeParkinglot;

	@JsonIgnore
	@Column(name = "registration_number", unique = true)
	private String registrationNumber;

	@Column(name = "store_workhour")
	private String storeWorkhour;

	@Column(name = "store_holiday")
	private String storeHoliday;

	@Column(name = "store_extra_info")
	private String storeExtraInfo;

	@Column(name = "store_url")
	private String storeUrl;

	@Column(name = "added_date")
	private LocalDateTime addedDate;

	@Column( name = "store_image")
	private String storeImage;
}