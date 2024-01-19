package base.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import base.Entiry.Messages;
import base.Entiry.Room;

public interface MessagesRepo extends JpaRepository<Messages, Integer> {

	List<Messages> findByRoom(Room room);

}
