package com.cinema.service;

import com.cinema.entity.Reservation;
import com.cinema.entity.Hour;
import com.cinema.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    public List<Reservation> findAllReservations() {
        return reservationRepository.findAll();
    }
    public void saveAll(List<Reservation> reservations) {
        reservationRepository.saveAll(reservations);
    }

    public boolean existsByHour(Hour hour) {
        return reservationRepository.existsByHour(hour);
    }

}
