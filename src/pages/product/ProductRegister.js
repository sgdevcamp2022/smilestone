import styled from "styled-components";
import Editor from "./Editor";

//styled-components 시작

const WholeWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const RegisterWrapper = styled.div`
  /* display: flex; */
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 0;
  @media (max-width: 690px) {
    width: 80%;
  }
  // 아이패드 (모바일 버전)
  @media (min-width: 691px) and (max-width: 890px) {
    justify-content: center;
    width: 500px;
  }
  // 모니터
  @media (min-width: 891px) {
    width: 677px;
    margin: 0px auto;
  }
`;

const Register = () => {
  return (
    <>
      <WholeWrapper>
        <RegisterWrapper>
          <Editor />
        </RegisterWrapper>
      </WholeWrapper>
    </>
  );
};

export default Register;
