package project.app.c109.backendapp.store.domain.dto.response;

import lombok.Data;
import project.app.c109.backendapp.store.domain.entity.Store;

@Data
public class StoreInfoResponse {
    private String registartionNumber;
    private Store store;

    public StoreInfoResponse(String registartionNumber, Store store) {
        this.registartionNumber = registartionNumber;
        this.store = store;
    }
}
