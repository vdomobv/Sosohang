package project.app.c109.backendapp.store.domain.dto.response;

import lombok.Data;
import project.app.c109.backendapp.store.domain.entity.Store;

@Data
public class StoreLoginResponse {
    private String token;
    private Store store;

    public StoreLoginResponse(String token, Store store) {
        this.token = token;
        this.store = store;
    }
}
