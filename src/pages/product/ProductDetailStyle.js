import styled from "styled-components";

const ImageWrapper = styled.div`
  display: flex;
  border-radius: 15px;
  border: 1px solid silver;
  flex: none;
  aspect-ratio: 3/2;
  margin: auto;
  object-fit: cover;

  background-color: #999;
  @media (max-width: 690px) {
    width: 200px;
  }
  // 아이패드 (모바일 버전)
  @media (min-width: 691px) and (max-width: 890px) {
    width: 210px;
  }
  // 모니터
  @media (min-width: 891px) {
    width: 220px;
    height: auto;
  }
`;

const MainWrapper = styled.main`
  display: flex;
  flex-direction: column;
  padding-top: 70px;
`;

const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .ChatBtn {
    border: 1px solid #ff8a3d;
    border-radius: 50px;
    padding: 15px 20px;
    cursor: pointer;
    :hover {
      background-color: #ff8a3d;
      span {
        color: #ffff;
      }
    }
    span {
      color: #ff8a3d;
    }
  }
`;

const InfoWrapper = styled.section`
  @media (max-width: 890px) {
    padding: 0px 15px;
  }
  @media (min-width: 891px) {
    width: 677px;
    margin: 0px auto;
  }
`;

const Line = styled.div`
  border-bottom: 1px solid #99999940;
  margin-bottom: 30px;
`;
const InfoTop = styled.div`
  padding-bottom: 30px;
  h1 {
    padding-bottom: 8px;
    font-weight: 500;
    font-size: 20px;
  }
  div:nth-child(2) {
    padding-bottom: 8px;
    span {
      margin-right: 8px;
      font-size: 13px;
      color: #999;
    }
  }
  div:nth-child(3) {
    span {
      font-weight: 600;
      font-size: 17px;
    }
  }
`;

const InfoBottom = styled.div`
  div {
    padding-bottom: 30px;
  }
  div:nth-child(1) {
    color: #333;
    p {
      padding-bottom: 8px;
    }
  }
  div:nth-child(2) {
    border-bottom: 1px solid #99999940;
    span {
      display: inline-flex;
      margin-right: 10px;
      color: #71717199;
      font-size: 13px;
    }
  }
`;

const FixAndDelete = styled.div`
  display: inline-flex;
  height: 7px;
  justify-content: flex-end;
  font-size: 13px;
  color: #71717199;

  p:hover {
    cursor: pointer;
  }
  p:nth-child(2) {
    margin-left: 10px;
  }

  // 스마트폰
  @media (min-width: 300px) and (max-width: 450px) {
    width: 55%;
  }
  @media (max-width: 690px) and (min-width: 450px) {
    width: 70%;
  }
  // 아이패드 (모바일 버전)
  @media (min-width: 691px) and (max-width: 890px) {
    width: 78%;
  }
  // 모니터
  @media (min-width: 891px) {
    width: 79%;
  }
`;

export {
  MainWrapper,
  InfoWrapper,
  UserInfo,
  Line,
  InfoTop,
  InfoBottom,
  FixAndDelete,
  ImageWrapper,
};
