import styled, { keyframes } from "styled-components";
import { FaCarrot } from "react-icons/fa";

const Loading = () => {
  return (
    <LoadingWrapper>
      <FaCarrot />
    </LoadingWrapper>
  );
};

export default Loading;

const turnCarrot = keyframes`
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
  animation: ${turnCarrot} 1s linear infinite;
  transform-origin: 50% 50%;
  opacity: 0.5;
`;
