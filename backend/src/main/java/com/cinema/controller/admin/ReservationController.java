package com.cinema.controller.admin;

import com.cinema.entity.Reservation;
import com.cinema.entity.Hour;
import com.cinema.service.ReservationService;
import com.cinema.service.HourService;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/admin/reservation")
@CrossOrigin(origins = "*")
public class ReservationController {

    private final ReservationService reservationService;
    private final HourService hourService;


    public ReservationController(ReservationService reservationService, HourService hourService) {
        this.reservationService = reservationService;
        this.hourService = hourService;
    }

    @GetMapping
    public List<Reservation> getAllReservations() {
        return reservationService.findAllReservations();
    }

    @PostMapping("/generate")
    public String generateReservations() {
        List<Hour> hours = hourService.getAllHours();
        List<Reservation> newReservations = new ArrayList<>();

        for (Hour hour : hours) {
            if (!reservationService.existsByHour(hour)) {
                Reservation reservation = new Reservation();
                reservation.setHour(hour);
                reservation.setSeats(new ArrayList<>());
                newReservations.add(reservation);
            }
        }
        reservationService.saveAll(newReservations);

        return  newReservations.size() + " new reservations generated";
    }
}
