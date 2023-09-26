package project.app.c109.backendapp.storekeyword.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import project.app.c109.backendapp.keyword.domain.entity.Keyword;
import project.app.c109.backendapp.store.domain.entity.Store;

import javax.persistence.*;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Table(name = "store_keyword")
public class StoreKeyword {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "store_keyword_seq")
    private Integer storeKeywordSeq;

    @ManyToOne
    @JoinColumn(name = "store_seq", referencedColumnName = "store_seq")
    private Store store;

    @ManyToOne
    @JoinColumn(name = "keyword_seq", referencedColumnName = "keyword_seq")
    private Keyword keyword;
}
