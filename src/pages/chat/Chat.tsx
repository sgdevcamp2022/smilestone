import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { ChangeEvent, useState } from "react";

const stompClient = Stomp.over(
  new SockJS("http://3.34.86.115:8090/smilestone/chat")
);
stompClient.connect(
  {},
  (frame) => {},
  (e) => {}
);

export default function Chat() {
  const [state, setState] = useState("close");
  const [username, setUsername] = useState("tester");
  const [roomId, setRoomId] = useState("0");
  const [roomId2, setRoomId2] = useState("1");
  const [message, setMessage] = useState("");
  const [message2, setMessage2] = useState("");
  const [messageHistory, setMessageHistory] = useState<any>([]);
  const [messageHistory2, setMessageHistory2] = useState<any>([]);

  const onClickTestChatRoom = () => {
    stompClient.subscribe(`/chat/${roomId}`, (msg) => {
      const jsonFrame = JSON.parse(msg.body);
      setMessageHistory((prev: any) => [
        ...prev,
        {
          sender: jsonFrame.sender,
          message: jsonFrame.message,
          chatAt: jsonFrame.chatAt,
        },
      ]);
    });
  };

  const onClickTestChatRoom2 = () => {
    stompClient.subscribe(`/chat/${roomId2}`, (msg) => {
      const jsonFrame = JSON.parse(msg.body);
      setMessageHistory2((prev: any) => [
        ...prev,
        {
          sender: jsonFrame.sender,
          message: jsonFrame.message,
          chatAt: jsonFrame.chatAt,
        },
      ]);
    });
  };

  const onChangeMessage = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const onChangeMessage2 = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage2(e.target.value);
  };

  const onClickSendMessage = () => {
    stompClient.send(
      `/pub/chat.${roomId}`,
      {},
      JSON.stringify({
        roomId: roomId,
        sender: username,
        message: message,
        chatAt: new Date().toISOString(),
      })
    );
  };

  const onClickSendMessage2 = () => {
    stompClient.send(
      `/pub/chat.${roomId2}`,
      {},
      JSON.stringify({
        roomId: roomId2,
        sender: username,
        message: message2,
        chatAt: new Date().toISOString(),
      })
    );
  };

  return (
    <>
      <div>{state}</div>
      <div>
        <button onClick={onClickTestChatRoom}>join test chat room</button>
        <input type={"text"} onChange={onChangeMessage} value={message} />
        <button onClick={onClickSendMessage}>send</button>
        {messageHistory.map((v: any, i: number) => (
          <div key={i}>{v.sender + " : " + v.message + " / " + v.chatAt}</div>
        ))}
      </div>
      <div>
        <button onClick={onClickTestChatRoom2}>join test chat room2</button>
        <input type={"text"} onChange={onChangeMessage2} value={message2} />
        <button onClick={onClickSendMessage2}>send</button>
        {messageHistory2.map((v: any, i: number) => (
          <div key={i}>{v.sender + " : " + v.message + " / " + v.chatAt}</div>
        ))}
      </div>
    </>
  );
}
