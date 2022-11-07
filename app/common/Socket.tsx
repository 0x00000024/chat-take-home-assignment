import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { configSocket, getSocket } from "../core/socket.js";
import { TotalMessages } from "../routes/Rooms.js";

export function SocketManager(): JSX.Element {
  const [totalMessages, setTotalMessages] = useRecoilState(TotalMessages);

  const addMessage = (email: string, message: string) => {
    console.log("before merge", totalMessages);
    const newMessage = [{ email: email, message: message }];
    const totalMessagesTmp1 = totalMessages;
    const totalMessagesTmp2 = totalMessagesTmp1.concat(newMessage);
    setTotalMessages(totalMessagesTmp2);
    console.log("after merge", totalMessages);
    // if (roomId !== null) {
    //   scrollToBottom();
    // }
  };

  useEffect(() => {
    configSocket();
    const socket = getSocket();
    socket.on("connect", () => {
      console.log("Connected");
      socket.on("join room", (email: string) => {
        console.log("a user joined the room");
        const message = `${email} has joined the room`;
        addMessage(email, message);
      });
      socket.on("group chat", (email: string, message: string) => {
        console.log("group chat received");
        addMessage(email, message);
      });
      socket.on("leave room", (email: string) => {
        const message = `${email} has left the room`;
        addMessage(email, message);
      });
    });
  }, []);

  return <></>;
}
