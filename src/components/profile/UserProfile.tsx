import React from "react";
// import { CLIENT_PORT } from "config";
import styled from "styled-components";
import { IoPersonCircleSharp } from "react-icons/io5";

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

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 8px;
    span {
      width: fit-content;
      font-size: 18px;
      font-weight: 600;
    }
  }
`;

const UserProfile = (props: any) => {
  const { user } = props;

  return (
    <MainWrapper>
      <picture>
        <IoPersonCircleSharp size="50" />
      </picture>
      <div>
        <span>sMilestone{user?.id}</span>
      </div>
    </MainWrapper>
  );
};

export default UserProfile;
