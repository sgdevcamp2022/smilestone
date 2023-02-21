import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/context";
import styled from "styled-components";

const CardWrapper = styled.div`
  justify-content: center;
  padding-bottom: 40px;
  height: auto;

  @media (max-width: 690px) {
    /* width: 200px; */
    width: 100%;
    /* margin: 0 5%; */
  }
  // 아이패드 (모바일 버전)
  @media (min-width: 691px) and (max-width: 890px) {
    /* width: 230px; */
    width: 100%;
  }
  // 모니터
  @media (min-width: 891px) {
    width: 100%;
    height: auto;
  }
`;

const ListCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  margin: auto;
  cursor: pointer;
  @media (max-width: 690px) {
  }
  // 아이패드 (모바일 버전)
  @media (min-width: 691px) and (max-width: 890px) {
  }
  // 모니터
  @media (min-width: 891px) {
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  flex: none;
  aspect-ratio: 1/1;
  margin: auto;
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

const ImageItself = styled.div`
  display: block;
  border-radius: 15px;
  border: 1px solid silver;
  background-color: #999;
  object-fit: cover;
  aspect-ratio: 1/1;
  width: 100%;
  @media (max-width: 690px) {
    /* margin: 0 5%; */
    width: 200px;
  }
  // 아이패드 (모바일 버전)
  @media (min-width: 691px) and (max-width: 890px) {
    width: 210px;
    /* margin: 0 2%; */
  }
  // 모니터
  @media (min-width: 891px) {
    width: 220px;
    /* margin: 0 2%; */
  }
`;

const LettersWrapper = styled.div`
  @media (max-width: 690px) {
    font-size: 16px;
    margin: 10px 0;
    padding-left: 3%;
  }
  // 아이패드 (모바일 버전)
  @media (min-width: 691px) and (max-width: 890px) {
    font-size: 17px;
    margin: 15px 0;
    padding-left: 5%;
  }
  // 모니터
  @media (min-width: 891px) {
    margin-left: 10%;
  }
`;

const ProductTitle = styled.p`
  text-overflow: ellipsis;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
  @media (max-width: 690px) {
    font-size: 16px;
    margin: 10px 0;
  }
  // 아이패드 (모바일 버전)
  @media (min-width: 691px) and (max-width: 890px) {
    font-size: 17px;
    margin: 15px 0;
  }
  // 모니터
  @media (min-width: 891px) {
    font-size: 18px;
    margin: 17px 0;
  }
`;

const ProductPrice = styled.p`
  font-weight: bold;
  @media (max-width: 690px) {
    margin-bottom: 8px;
    font-size: 15px;
  }
  // 아이패드 (모바일 버전)
  @media (min-width: 691px) and (max-width: 890px) {
    margin-bottom: 9px;
  }
  // 모니터
  @media (min-width: 891px) {
    margin-bottom: 10px;
  }
`;

const Chats = styled.p``;

const ProductInfoListCard = ({ post, maxWidth }) => {
  const navigate = useNavigate();
  const myInfo = useContext(UserContext);
  const { productId, title, price, view } = post;

  return (
    <CardWrapper
      maxWidth={maxWidth}
      onClick={() => {
        if (myInfo?.id === "") {
          alert("로그인 후 이용 가능합니다.");
          navigate(`/`);
        } else if (myInfo?.id !== "") {
          navigate(`/product/detail/${productId}`);
        }
      }}
      // onClick={() => {
      //   navigate(`/product/detail/${productId}`);
      // }}
    >
      <ListCardWrapper>
        <ImageWrapper>
          <ImageItself />
        </ImageWrapper>
        <LettersWrapper>
          <ProductTitle>{title}</ProductTitle>
          <ProductPrice>{price} 원</ProductPrice>
          <ProductPrice>조회 {view}</ProductPrice>
        </LettersWrapper>
      </ListCardWrapper>
    </CardWrapper>
  );
};

export default ProductInfoListCard;
