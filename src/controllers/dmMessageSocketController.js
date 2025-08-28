import { createMessageService } from '../services/messageService';
import {
  RECEIVE_DIRECT_MESSAGE,
  SEND_DIRECT_MESSAGE
} from '../utils/common/eventConstants';
import { getDirectRoomId } from '../utils/common/getRoomId';

export default function directChatHandlers(io, socket) {
  // join direct chat already added

  socket.on(SEND_DIRECT_MESSAGE, async ({ senderId, receiverId, text }, cb) => {
    const roomId = getDirectRoomId(senderId, receiverId);

    // 1. Save in DB
    const message = await createMessageService({ senderId, receiverId, text });

    // 2. Broadcast to both participants
    io.to(roomId).emit(RECEIVE_DIRECT_MESSAGE, message);

    cb?.({
      success: true,
      message: 'Message sent successfully',
      data: message
    });
  });
}
