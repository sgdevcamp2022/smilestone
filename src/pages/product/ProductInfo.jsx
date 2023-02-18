import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { getProductList } from "../../apis/product";
import { UserContext } from "../../context/context";
import Loading from "../../components/loading/Loading";
import ProductInfoList from "../../components/list/ProductInfoList";
import ListTitle from "../../components/list/ListTitle";
import RegisterButton from "../../components/button/RegisterButton";
import NoProductInfo from "../../components/list/NoProductInfo";

const WholeWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const ContentsWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-content: center;
  @media (max-width: 690px) {
  }
  // 아이패드 (모바일 버전)
  @media (min-width: 691px) and (max-width: 890px) {
    width: 800px;
  }
  // 모니터
  @media (min-width: 891px) {
    width: 1024px;
  }
`;

const ListWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

//조건부 렌더링 함수
const ProductInfoDelay = () => {
  const user = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(Boolean);
  const [productInfoData, setProductInfoData] = useState([]);

  // useEffect(() => {
  //   setIsLogin(Boolean);
  // }, [user]);

  getProductList().then((data) => {
    setProductInfoData(data.productList);
    setLoading(false);
  });

  return (
    <>
      <ProductInfo />
      {/* <RegisterButton /> */}
    </>
  );
};

//로그인시 리스트
// const ProductInfoWhenLogin = ({ data, user }) => {
//   const productList = data;
//   return (
//     <>
//       <ListTitle title={`기술 게시판`} />
//       <WholeWrapper>
//         {productList ? (
//           <ListWrapper>
//             <ProductInfoList maxWidth={1024} data={productList} />
//           </ListWrapper>
//         ) : (
//           <NoProductInfo />
//         )}
//       </WholeWrapper>
//     </>
//   );
// };

//비로그인시 기본 리스트
const ProductInfo = ({ data }) => {
  const productList = data;

  return (
    <>
      <ListTitle title={`기술 게시판`} />

      <WholeWrapper>
        <ContentsWrapper>
          {productList ? (
            <ListWrapper>
              <ProductInfoList maxWidth={1024} data={productList} />
            </ListWrapper>
          ) : (
            <NoProductInfo />
          )}
        </ContentsWrapper>
      </WholeWrapper>
    </>
  );
};

export default ProductInfoDelay;
