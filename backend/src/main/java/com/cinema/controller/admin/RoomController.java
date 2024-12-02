package com.cinema.controller.admin;

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

import com.cinema.entity.Room;
import com.cinema.service.RoomService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/admin/salas")
@CrossOrigin(origins = "*")
public class RoomController {
    @Autowired
    private RoomService roomService;

    @PostMapping
    public ResponseEntity<Room> createRoom(@RequestBody Room room){
        Room createRoom = roomService.createRoom(room);
        return ResponseEntity.ok(createRoom);
    }

    @GetMapping
    public List<Room> getAllList(){
        return roomService.findAllRooms();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Room> getSalas(@PathVariable Long id){
        Optional<Room> room = roomService.getRoom(id);
        return room.map(ResponseEntity::ok).orElseGet(()-> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoom(@PathVariable Long id) {
        roomService.deleteRoom(id);
        return ResponseEntity.noContent().build();
    }
}
