// modules
import React, { useState, useContext } from "react";
import { loginUser } from "../../apis/user.js";
import { UserDispatchContext } from "../../context/context";
import { useNavigate } from "react-router-dom";
// components
import Modal, { IProps } from "../modal/Modal";
// styles
import {
  LoginBox,
  LogoBox,
  Id,
  Password,
  LoginBtn,
  Usersign,
  Usersignup,
} from "./LoginStyled";
const Logo = require("../../assets/images/sMarketLogo.png");

const Login = (props: IProps) => {
  const { visible, setVisible, setOpenSignup } = props;
  const dispatch = useContext(UserDispatchContext);
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [useFadeOut, setUseFadeOut] = useState(false);

  const goToSignup = () => {
    setUseFadeOut(true);
    setTimeout(() => {
      setVisible(false);
      setUseFadeOut(false);
      setOpenSignup(true);
    }, 400);
  };

  const handleLogin = () => {
    loginUser(id, password).then((response) => {
      const user = response;
      console.log(response);

      if (response.tokens.access_token) {
        localStorage.setItem("login-token", response.tokens.access_token);
      }

      dispatch({
        type: "LOGIN",
        payload: {
          id: user.id,
          nickname: user.userId,
        },
      });

      setUseFadeOut(true);
      setTimeout(() => {
        setVisible(false);
        setUseFadeOut(false);
      }, 500);

      window.alert("성공적으로 로그인 되었습니다 !");
      navigate("/");
    });
  };

  const handleIdInput = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setId(e.target.value);
  };

  const handlePwInput = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPassword(e.target.value);
  };

  const handleEnter = (e: { keyCode: number }) => {
    if (e.keyCode === 13) {
      handleLogin();
    }
  };

  const isValidButton = isValidId(id) && isValidPw(password);

  function isValidId(str: string) {
    const regId = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{5,12}$/;
    return regId.test(str);
  }

  function isValidPw(str: string) {
    const regPw = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,15}$/;
    return regPw.test(str);
  }

  return (
    <Modal
      width="365px"
      visible={visible}
      setVisible={setVisible}
      useFadeOut={useFadeOut}
    >
      <LoginBox>
        <LogoBox>
          <img src={Logo} alt="logo" />
        </LogoBox>
        <div>
          <Id
            onChange={handleIdInput}
            onKeyDown={handleEnter}
            type="text"
            placeholder="아이디를 입력하세요"
            id="id"
            name="id"
            required
          />
          <Password
            onChange={handlePwInput}
            onKeyDown={handleEnter}
            type="password"
            placeholder="비밀번호를 입력하세요"
            id="password"
            name="password"
            required
          />
        </div>
        <div>
          <LoginBtn disabled={!isValidButton} onClick={handleLogin}>
            로그인
          </LoginBtn>
        </div>
        <Usersign>
          <span>아직 회원이 아니신가요?</span>
          <Usersignup onClick={goToSignup}>회원가입</Usersignup>
        </Usersign>
      </LoginBox>
    </Modal>
  );
};

export default Login;
