package project.app.c109.backendapp.keyword.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import project.app.c109.backendapp.category.domain.entity.Category;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "keyword")
public class Keyword {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "keyword_seq")
    private Integer keywordSeq;

    @Column
    private String keywordName;

    @ManyToOne
    @JoinColumn(name = "category_seq", referencedColumnName = "category_seq")
    private Category category;
}
