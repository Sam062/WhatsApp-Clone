package base.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import base.Entiry.Room;

public interface RoomRepo extends JpaRepository<Room, Integer> {

}
