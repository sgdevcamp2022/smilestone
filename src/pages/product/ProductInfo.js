import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
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

// 렌더링 함수
const ProductInfoDelay = () => {
  const [loading, setLoading] = useState(true);
  const [productInfoData, setProductInfoData] = useState([]);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/product/list/all`);
        setPosts(response.data);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <>
      <ProductInfo data={productInfoData} />
      <RegisterButton />
    </>
  );
};

//로그인 비로그인 공통 리스트
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
