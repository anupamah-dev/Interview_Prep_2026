package com.example.demo.controller;

import com.example.demo.model.Question;
import com.example.demo.repository.QuestionRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {
    private final QuestionRepository repo;
    public QuestionController(QuestionRepository repo) { this.repo = repo; }

    @GetMapping
    public List<Question> list() {
        return repo.findAll();
    }

    @PostMapping
    public ResponseEntity<Question> create(@RequestBody Question q) {
        return ResponseEntity.ok(repo.save(q));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Question> get(@PathVariable Long id) {
        return repo.findById(id).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
