import SockJS from "sockjs-client";
import Stomp from "stompjs";
import moment from "moment";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { BsChatDots } from "react-icons/bs";
import {
  MainWrapper,
  ProductWrapper,
  NoTalkWrapper,
} from "../../components/chat/ChatRoomContentStyled";
import { UserContext } from "../../context/context";

// 채팅 내용
function Chat() {
  const [state, setState] = useState("close");
  const [username, setUsername] = useState("tester1");
  const [roomId, setRoomId] = useState("0");
  const [message, setMessage] = useState("");
  const [messageHistory, setMessageHistory] = useState([]);
  const [stompClient, setStompClient] = useState(
    Stomp.over(new SockJS("http://3.34.86.115:8090/smilestone/chat"))
  );

  useEffect(() => {
    stompClient.connect(
      {},
      (frame) => {},
      (e) => {}
    );
  }, []);

  const onClickTestChatRoom = (sellerName) => () => {
    stompClient.subscribe(`/chat/${roomId}`, (msg) => {
      const jsonFrame = JSON.parse(msg.body);
      setMessageHistory((prev) => [
        ...prev,
        {
          sender: jsonFrame.sender,
          message: jsonFrame.message,
          chatAt: jsonFrame.chatAt,
        },
      ]);
    });
  };

  const onChangeMessage = (e) => {
    setMessage(e.target.value);
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
  const user = useContext(UserContext);

  return (
    <>
      <button onClick={onClickTestChatRoom("tester2")}>.</button>
      <MainWrapper>
        {/* <div>{state}</div> */}

        <ul className="textWrapper">
          {/* {messageHistory.map((v, i) => (
          <div key={i}>{v.sender + " : " + v.message + " / " + v.chatAt}</div>
        ))} */}
          {messageHistory.map((v, i) => {
            const prevChat = messageHistory[i - 1];
            const nextChat = messageHistory[i + 1];
            const prevDate = moment(prevChat?.chatAt).format("YYYY-MM-DD");
            const curDate = moment(v?.chatAt).format("YYYY-MM-DD");
            const curTime = moment(v?.chatAt).format("YYYY-MM-DD HH:mm");
            const nextTime = moment(nextChat?.chatAt).format(
              "YYYY-MM-DD HH:mm"
            );
            let textTime = "";
            let isNewDate = false;
            if (v?.sender !== nextChat?.sender) {
              textTime = moment(v.chatAt).format("h:mm a");
            }
            if (textTime === "" && i !== 0 && curTime !== nextTime) {
              textTime = moment(v.chatAt).format("h:mm a");
            }
            if (i === 0 || prevDate !== curDate) {
              isNewDate = true;
            }

            return (
              <div key={i}>
                {isNewDate && (
                  <div className="newDateLine">
                    <span>{curDate}</span>
                  </div>
                )}

                <li
                  key={i}
                  className={
                    v.sender !== undefined
                      ? v.sender === user?.id
                        ? "isMy"
                        : "isOther"
                      : v.isMy
                      ? "isMy"
                      : "isOther"
                  }
                >
                  <div className="timeWrapper">
                    <span>{textTime}</span>
                  </div>
                  <div className="chatWrapper">
                    <div dangerouslySetInnerHTML={{ __html: v.message }} />
                  </div>
                </li>
              </div>
            );
          })}
        </ul>
      </MainWrapper>

      <FooterMainWrapper>
        <input
          type="text"
          className="chatInput"
          value={message}
          placeholder="메시지를 입력해주세요"
          onChange={onChangeMessage}
        />
        <BsFillArrowUpCircleFill
          className="submitBtn"
          size={30}
          onClick={onClickSendMessage}
        />
      </FooterMainWrapper>
    </>
  );
}

// 다 합친거
export default function ChatDelay(props) {
  const me = useContext(UserContext);
  const { chats, product } = props;

  return (
    <>
      <ChatProductContent product={product} />
      <Chat />
    </>
  );
}

function ChatProductContent(props) {
  const { product } = props;

  return (
    product && (
      <ProductWrapper>
        <div className="middleWrapper">
          <div className="textWrapper">
            <p>{product.title}</p>
            <p>{product.price}</p>
          </div>
        </div>
        <div className="stateWrapper">
          <p>판매 중</p>
        </div>
      </ProductWrapper>
    )
  );
}

function NotFoundChats() {
  return (
    <NoTalkWrapper>
      아직 대화가 없습니다.
      <BsChatDots />
    </NoTalkWrapper>
  );
}

const FooterMainWrapper = styled.div`
  display: flex;
  border: 1px solid #ff8a3d;
  border-radius: 0.3em;
  margin-left: 100px;
  margin-right: 100px;
  /* width: 90%; */
  background-color: white;

  .chatInput {
    flex: 1;
    padding: 10px;
    border: 0;
    border-radius: 0.3em;
    height: 100%;
    font-size: 15px;
    :placeholder-shown {
      font-size: 13px;
      opacity: 0.5;
    }
    :focus {
      outline: none;
    }
  }
  .submitBtn {
    align-self: flex-end;
    margin: 10px;
    color: #ff8a3d;
  }
`;
