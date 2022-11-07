import { io, Socket } from "socket.io-client";

let socket: Socket;

export const configSocket = (): void => {
  socket = io(API_ORIGIN, {
    withCredentials: true,
    extraHeaders: {
      "my-custom-header": "abcd",
    },
  });
};

export const getSocket = (): Socket => socket;

export const disconnectSocket = (): void => {
  socket.disconnect();
  console.log("disconnected");
};
