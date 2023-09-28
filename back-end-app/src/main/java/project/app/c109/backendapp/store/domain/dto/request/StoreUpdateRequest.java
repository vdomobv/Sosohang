package project.app.c109.backendapp.store.domain.dto.request;

import lombok.Getter;
import org.springframework.lang.Nullable;

import javax.validation.constraints.Null;
import java.util.List;

@Getter
public class StoreUpdateRequest {

    @Nullable
    private Integer categorySeq;

    @Nullable
    private List<Integer> selectedKeywordSeqList;

    @Nullable
    private String storeName;

    @Nullable
    private String storeLocation;

    @Nullable
    private String storeTell;

    @Nullable
    private String ownerTell;

    @Nullable
    private String storeParkinglot;

    @Nullable
    private String storeWorkhour;

    @Nullable
    private String storeHoliday;

    @Nullable
    private String storeExtraInfo;

    @Nullable
    private String storeUrl;

    @Nullable
    private String storeImage;

    @Nullable
    private Double storeLatitude;

    @Nullable
    private Double storeLongitude;
}
