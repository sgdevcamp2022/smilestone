import styled, { keyframes } from "styled-components";
const Logo = require("../../assets/images/sMarketLogo.png");

const turn = keyframes`
0%{
    transform: rotate(270deg);
}
100%{
    transform: rotate(-90deg);
}
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 50px;
  animation: ${turn} 1s linear infinite;
  transform-origin: 50% 50%;
  opacity: 0.5;
`;

const Loading = () => {
  return (
    <LoadingWrapper>
      <img src={Logo} alt="logo" />
    </LoadingWrapper>
  );
};

export default Loading;
