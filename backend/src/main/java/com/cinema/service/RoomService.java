package com.cinema.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cinema.entity.Room;
import com.cinema.repository.RoomRepository;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    public List<Room> findAllRooms(){
        return roomRepository.findAll();
    }
    
    public Room createRoom(Room room){
        return roomRepository.save(room);
    }

    public Optional<Room> getRoom(Long id) {
        return roomRepository.findById(id);
    }

    public Room updateRoom(Long id, Room roomDetails) {
        if (roomRepository.existsById(id)) {
            return roomRepository.save(roomDetails);
        }
        return null;
    }

    public void deleteRoom(Long id) {
        roomRepository.deleteById(id);
    }
}
