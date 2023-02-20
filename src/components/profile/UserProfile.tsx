import React from "react";
// import { CLIENT_PORT } from "config";
import styled from "styled-components";
const Logo = require("../../assets/images/sMarketLogo.png");

const MainWrapper = styled.div`
  display: flex;
  padding: 20px 0px;
  cursor: pointer;
  :hover {
    div {
      span:nth-child(1) {
        border-bottom: 1.5px solid;
      }
    }
  }
  picture {
    border-radius: 100%;
    overflow: hidden;
    img {
      width: 44px;
    }
  }
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 8px;
    span:nth-child(1) {
      width: fit-content;
      height: 15px;
      font-size: 15px;
      font-weight: 600;
    }
    span:nth-child(2) {
      margin-top: 4px;
      font-size: 13px;
      font-weight: 300;
    }
  }
`;

const UserProfile = (props: any) => {
  const { user } = props;

  return (
    <MainWrapper>
      <picture>
        <img src={Logo} alt="user" />
      </picture>
      <div>
        <span>{user.nickname}</span>
      </div>
    </MainWrapper>
  );
};

export default UserProfile;
