package com.cinema.controller.admin;

import com.cinema.model.Reservation;
import com.cinema.model.Schedule;
import com.cinema.service.ReservationService;
import com.cinema.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/admin/reservation")
@CrossOrigin(origins = "*")
public class ReservationController {

    private final ReservationService reservationService;
    private final ScheduleService scheduleService;


    public ReservationController(ReservationService reservationService, ScheduleService scheduleService) {
        this.reservationService = reservationService;
        this.scheduleService = scheduleService;
    }

    @GetMapping
    public List<Reservation> getAllReservations() {
        return reservationService.findAllReservations();
    }
    @PostMapping("/generate")
    public String generateReservations() {
        List<Schedule> schedules = scheduleService.getAllSchedules();
        List<Reservation> newReservations = new ArrayList<>();

        for (Schedule schedule : schedules) {
            if (!reservationService.existsBySchedule(schedule)) {
                Reservation reservation = new Reservation();
                reservation.setSchedule(schedule);
                reservation.setSeats(new ArrayList<>());
                newReservations.add(reservation);
            }
        }
        reservationService.saveAll(newReservations);

        return  newReservations.size() + " new reservations generated";
    }
}
