package project.app.c109.backendapp.review.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import project.app.c109.backendapp.keyword.domain.entity.Keyword;
import project.app.c109.backendapp.reviewkeyword.entity.ReviewKeyword;

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

    @ManyToOne
    @JoinColumn(name = "review_keyword_seq")
    private ReviewKeyword reviewKeyword;

    @Column(name = "store_seq")
    private Integer storeSeq;

    @Column(name = "review_keyword_count")
    private Integer reviewKeywordCount;

}
