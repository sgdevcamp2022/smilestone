import SockJS from "sockjs-client"
import Stomp from "stompjs"
import {ChangeEvent, useState} from "react";

const stompClient = Stomp.over(new SockJS("http://localhost:8080/smilestone/chat"))
stompClient.connect({}, () => {})

export default function TestChat() {
  const [state, setState] = useState("close")
  const [username, setUsername] = useState("tester")
  const [roomId, setRoomId] = useState("testRoom")
  const [message, setMessage] = useState("")
  const [messageHistory, setMessageHistory] = useState<any>([])

  const onClickTestChatRoom = () => {
    stompClient.subscribe("/chatroom/" + roomId,  (frame) => {
      const jsonFrame = JSON.parse(frame.body)
      console.log(messageHistory)
      setMessageHistory([...messageHistory, {sender: jsonFrame.sender, message: jsonFrame.message, chatAt: jsonFrame.chatAt}])
      console.log(messageHistory)
    })
  }

  const onChangeMessage = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }

  const onClickSendMessage = () => {
    stompClient.send("/pub/chat", {}, JSON.stringify({roomId: roomId, sender: username, message: message, chatAt: new Date().toISOString()}))
  }

  return (
    <>
      <div>{state}</div>
      <button onClick={onClickTestChatRoom}>join test chat room</button>
      <input type={"text"} onChange={onChangeMessage} value={message}/>
      <button onClick={onClickSendMessage}>send</button>
      {
        messageHistory.map((v: any, i: number) => (
          <div key={i}>{v.sender + " : " + v.message + " / " + v.chatAt}</div>
        ))
      }
    </>
  )
}
