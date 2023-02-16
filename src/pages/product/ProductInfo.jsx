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
  // useEffect(() => {
  //   isLogin
  //     ? getProductList().then((data) => {
  //         setProductInfoData(data.productList);
  //         setLoading(false);
  //       })
  //     : getProductList().then((data) => {
  //         setProductInfoData(data.bestProducts);
  //         setLoading(false);
  //       });
  // }, [isLogin]);
  return isLogin ? (
    <>
      {/* <ProductInfoWhenLogin data={productInfoData} user={user} /> */}
      {/* <RegisterButton /> */}
    </>
  ) : (
    <>
      <ProductInfo />
      {/* <RegisterButton /> */}
    </>
  );
};

//로그인시 매물리스트 함수
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

//비로그인시 인기 매물 리스트, 기본은 베스트, 지역 선택시 해당 지역

const ProductInfo = () => {
  const [productListResult, setProductListResult] = useState();
  useEffect(() => {
    getProductList().then((data) => setProductListResult(data.Products));
  }, []);
  return (
    productListResult && (
      <>
        <ListTitle title={`기술 게시판`} />

        <WholeWrapper>
          <ContentsWrapper>
            <ListWrapper>
              <ProductInfoList maxWidth={1024} data={productListResult} />
            </ListWrapper>
          </ContentsWrapper>
        </WholeWrapper>
      </>
    )
  );
};

export default ProductInfoDelay;
