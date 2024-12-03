package com.cinema.repository;

import com.cinema.entity.Hour;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HourRepository extends JpaRepository<Hour, Long> {
}
