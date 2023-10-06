package project.app.c109.backendapp.cart.domain.dto.request;

import lombok.Getter;
import javax.validation.constraints.NotNull;

@Getter
public class CartRequestDTO {

    @NotNull
    private Integer memberSeq;
    @NotNull
    private Integer productSeq;
    @NotNull
    private Integer quantity;

}
