package com.cinema.repository;

import com.cinema.entity.Reservation;
import com.cinema.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    Optional<Reservation> findByScheduleId(Long scheduleId);
    boolean existsBySchedule(Schedule schedule);

    @Query("SELECT r FROM Reservation r JOIN r.schedule h JOIN h.movie_id m WHERE m.id = :movieId")
    List<Reservation> findReservationsByMovieId(@Param("movieId") Long movieId);
}