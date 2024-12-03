package com.cinema.controller.admin;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cinema.entity.Hour;
import com.cinema.service.HourService;

@RestController
@RequestMapping("/admin/hour")
@CrossOrigin("*")
public class HourController {

    @Autowired
    private HourService hourService;

     @PostMapping
    public ResponseEntity<Hour> createHour(@RequestBody Hour hour) {
        try {
            Hour createdHour = hourService.createHour(hour);
            return ResponseEntity.ok(createdHour);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping
    public List<Hour> getAllHours() {
        return hourService.findAllHours();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Hour> getHour(@PathVariable Long id) {
        Optional<Hour> Hour = hourService.getHour(id);
        return Hour.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHour(@PathVariable Long id) {
        hourService.deleteHour(id);
        return ResponseEntity.noContent().build();
    }
    
}
