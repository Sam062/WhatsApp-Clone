package base.model;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomModel {
	private Integer roomId;

	private String roomName;
	private boolean active;
	private String avatar;

	private List<MessagesModel> messageList;
}
