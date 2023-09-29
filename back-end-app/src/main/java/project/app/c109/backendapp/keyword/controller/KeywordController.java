package project.app.c109.backendapp.keyword.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import project.app.c109.backendapp.keyword.domain.entity.Keyword;
import project.app.c109.backendapp.keyword.service.KeywordService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/keywords")
public class KeywordController {

    private final KeywordService keywordService;

    @Autowired
    public KeywordController(KeywordService keywordService) {
        this.keywordService = keywordService;
    }

    @GetMapping("/category/{categoryId}")
    public List<Keyword> getKeywordsByCategory(@PathVariable Integer categoryId) {
        // 카테고리별 키워드 조회 서비스 호출
        return keywordService.getKeywordsByCategory(categoryId);
    }

    @GetMapping("")
    public List<Keyword> getAllKeywords() {
        return keywordService.getAllKeywords();
    }
}