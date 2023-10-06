package project.app.c109.backendapp.reviewkeyword.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "review_keyword")
public class ReviewKeyword {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_keyword_seq")
    private Integer reviewKeywordSeq;

    @Column
    private Integer categorySeq;

    @Column
    private String reviewKeywordName;

}
