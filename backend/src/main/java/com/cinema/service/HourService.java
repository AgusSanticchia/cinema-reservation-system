package com.cinema.service;

import com.cinema.entity.Hour;
import com.cinema.repository.HourRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class HourService {

    @Autowired
    private HourRepository hourRepository;

    public List<Hour> findAllHours() {
        return hourRepository.findAll();
    }

    public List<Hour> getAllHours() {
        return hourRepository.findAll();
    }

    public Hour createHour(Hour hour) {
        return hourRepository.save(hour);
    }

    public Optional<Hour> getHour(Long id) {
        return hourRepository.findById(id);
    }

    public Hour updateHour(Long id, Hour hourDetails) {
        if (hourRepository.existsById(id)) {
            hourDetails.setId(id);
            return hourRepository.save(hourDetails);
        }
        return null;
    }

    public void deleteHour(Long id) {
        hourRepository.deleteById(id);
    }

}
