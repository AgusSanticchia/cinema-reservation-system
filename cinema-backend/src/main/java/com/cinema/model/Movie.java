package com.cinema.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collection;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "movies")
public class Movie {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String title;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private String genre;

    @Column(nullable = false, length = 50)
    private String director;

    @Column(columnDefinition = "TEXT",nullable = false)
    private String posterImage;

    @Column(nullable = false)
    private String duration;

    public enum Genre {
        drama, thriller, comedy, fantasy, romance, science, fiction, adventure, sports, action, western, horror, musical, mystery
    }

}
