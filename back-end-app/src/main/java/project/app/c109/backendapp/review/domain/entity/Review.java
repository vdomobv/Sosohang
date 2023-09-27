package project.app.c109.backendapp.review.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "review")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_seq")
    private Integer reviewSeq;

    @Column(name = "store_seq")
    private Integer storeSeq;

    @Column(name = "keyword_seq")
    private Integer keywordSeq;

    @Column(name = "category_seq")
    private Integer categorySeq;

}
