package base.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import base.Entiry.Messages;
import base.Entiry.Room;
import base.model.MessagesModel;
import base.model.RoomModel;
import base.repo.MessagesRepo;
import base.repo.RoomRepo;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/whatsapp")
public class WhatsAppController {

	@Autowired
	private RoomRepo roomRepo;

	@Autowired
	private MessagesRepo msgRepo;

	@GetMapping("/rooms")
	public ResponseEntity<List<RoomModel>> findAllRooms() {
		return new ResponseEntity<>(roomRepo.findAll().stream().map(room -> {
			RoomModel roomModel = new RoomModel();
			BeanUtils.copyProperties(room, roomModel);

			roomModel.setMessageList(room.getMessageList().stream().map(msg -> {
				MessagesModel msgModel = new MessagesModel();
				BeanUtils.copyProperties(msg, msgModel);
				return msgModel;
			}).collect(Collectors.toList()));

			return roomModel;
		}).collect(Collectors.toList()), HttpStatus.OK);
	}

	@PostMapping("/createnewroom")
	public ResponseEntity<RoomModel> createNewRoom(@RequestBody RoomModel room) {

		Room roomEntity = new Room();
		BeanUtils.copyProperties(room, roomEntity);

		Room saved = roomRepo.save(roomEntity);
		RoomModel roomModel = new RoomModel();
		BeanUtils.copyProperties(saved, roomModel);
		if (saved.getRoomId() != null)
			return new ResponseEntity<>(roomModel, HttpStatus.CREATED);

		return new ResponseEntity<>(null, HttpStatus.OK);
	}

	@PostMapping("/addmsgtoroom/{roomId}")
	public ResponseEntity<String> addMsgToRoom(@RequestBody MessagesModel msgModel, @PathVariable Integer roomId) {

		Room room = roomRepo.findById(roomId).orElse(null);
		if (room == null || room.getRoomId() == null)
			return new ResponseEntity<>("Room not found", HttpStatus.NO_CONTENT);

		Messages messages = new Messages();
		BeanUtils.copyProperties(msgModel, messages);
		messages.setRoom(room);

		List<Messages> messagesList = new ArrayList<>();
		messagesList.add(messages);

		room.setMessageList(messagesList);

		Room saved = roomRepo.save(room);
		if (saved.getRoomId() != null)
			return new ResponseEntity<>("SUCCESS", HttpStatus.CREATED);

		return new ResponseEntity<>("FAILED", HttpStatus.OK);
	}

	@GetMapping("/messagesforroom/{roomId}")
	public ResponseEntity<List<MessagesModel>> messagesForRoom(@PathVariable Integer roomId) {
		return new ResponseEntity<>(msgRepo.findByRoom(new Room(roomId, null, null, null)).stream().map(msg -> {
			MessagesModel messagesModel = new MessagesModel();
			BeanUtils.copyProperties(msg, messagesModel);
			return messagesModel;
		}).collect(Collectors.toList()), HttpStatus.OK);
	}
}
