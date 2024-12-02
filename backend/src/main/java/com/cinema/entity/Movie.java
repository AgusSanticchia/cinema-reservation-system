package com.cinema.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
