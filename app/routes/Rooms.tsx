import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Input,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { atom, useRecoilState } from "recoil";
import { CurrentUser } from "../core/auth.js";
import {
  getRoomList,
  GetRoomListResponse,
  GetRoomListResponseData,
} from "../core/axios.js";
import { usePageEffect } from "../core/page.js";
import { configSocket, getSocket } from "../core/socket.js";

type item = {
  email: string;
  message: string;
};

export const TotalMessages = atom<item[]>({
  key: "TotalMessages",
  default: [],
});

export default function Rooms(): JSX.Element {
  usePageEffect({ title: "Rooms" });
  const [roomList, setRoomList] = useState<GetRoomListResponseData[]>([]);
  const [roomId, setRoomId] = useState<number | null>();
  const [totalMessages, setTotalMessages] = useState<item[]>([]);
  // const [totalMessages, setTotalMessages] = useRecoilState(TotalMessages);
  const [currentUser, setCurrentUser] = useRecoilState(CurrentUser);
  const [open, setOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState<string>("");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

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
    getRoomList().then((response: GetRoomListResponse) => {
      if (response.data) {
        setRoomList(response.data);
      }
    });
  }, []);

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

  const scrollToBottom = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    inputRef.current.focus();
    if (inputMessage === "") return;
    getSocket().emit("group chat", roomId, currentUser, inputMessage);
    // addMessage(currentUser, inputMessage);
    setInputMessage("");
  };

  const pressEnterToSendMessage = (e: any) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <Container sx={{ py: "20vh" }} maxWidth="sm">
      {roomId !== null &&
        roomList.map((room: GetRoomListResponseData, index: number) => (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              border: "5px solid #4F7480",
              margin: "20px",
            }}
            key={index}
          >
            <Typography variant="h1" align="center" key={index}>
              Room ID: {room.id}
            </Typography>
            <IconButton
              onClick={() => {
                getSocket().emit("join room", room.id, currentUser);
                setOpen(true);
                setRoomId(room.id);
              }}
            >
              Enter
            </IconButton>
          </div>
        ))}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle style={{ fontSize: 20 }}>Room ID: {roomId}</DialogTitle>
        <DialogContent style={{ height: "400px", width: "400px" }}>
          <DialogContentText>
            {totalMessages.length > 0 ? (
              totalMessages.map((item: item, index: number) => (
                <Box key={index}>
                  <Typography style={{ display: "inline", fontWeight: "bold" }}>
                    {item.email}:&nbsp;
                  </Typography>
                  <Typography>{item.message}</Typography>
                </Box>
              ))
            ) : (
              <Typography>No message yet</Typography>
            )}
          </DialogContentText>
          <Box ref={messagesEndRef} />
        </DialogContent>
        <DialogActions style={{ padding: "16px 24px" }}>
          <Input
            autoFocus={true}
            fullWidth={true}
            inputRef={inputRef}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Message"
            value={inputMessage}
            onKeyPress={(e) => pressEnterToSendMessage(e)}
          />

          <Button color="primary" variant="contained" onClick={sendMessage}>
            Send
          </Button>
        </DialogActions>
      </Dialog>
      {/*<SocketManager />*/}
    </Container>
  );
}
