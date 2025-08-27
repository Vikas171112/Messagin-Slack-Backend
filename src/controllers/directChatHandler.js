import { JOIN_DIRECT_CHAT } from '../utils/common/eventConstants.js';
import { getDirectRoomId } from '../utils/common/getRoomId.js';

export default function directChatHandlers(io, socket) {
  socket.on(JOIN_DIRECT_CHAT, ({ userId, friendId }, cb) => {
    const roomId = getDirectRoomId(userId, friendId);
    socket.join(roomId);
    console.log(`User ${userId} joined direct chat: ${roomId}`);

    cb?.({
      success: true,
      message: 'Joined direct chat successfully',
      data: roomId
    });
  });
}
