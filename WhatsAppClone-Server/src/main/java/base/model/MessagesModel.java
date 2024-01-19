package base.model;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MessagesModel {
	private Integer msgId;

	private String msg;

	private String msgFrom;

	private Date timestamp;
}
