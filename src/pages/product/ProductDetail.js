import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getProductDetail, getProductList } from "../../apis/product";
import { UserContext } from "../../context/context";
import DetailDeleteModal from "../../components/button/DetailDeleteModal";
import UserProfile from "../../components/profile/UserProfile";
import GridList from "../../components/list/GridList";
import Loading from "../../components/loading/Loading";
import { BsFillHandbagFill } from "react-icons/bs";

import {
  MainWrapper,
  InfoWrapper,
  UserInfo,
  Line,
  InfoTop,
  InfoBottom,
  FixAndDelete,
  GrayLetters,
  ImageWrapper,
  ImageItself,
} from "./ProductDetailStyle";
import { BsHeartFill } from "react-icons/bs";

function ProductDetailDelay() {
  const location = useLocation();
  const myInfo = useContext(UserContext);
  const [product, setProduct] = useState();
  const [products, setProducts] = useState([]);
  const params = useParams();
  const productId = params.id;

  useEffect(() => {
    getProductDetail(productId).then((data) => setProduct(data));
  }, [productId]);

  return product ? (
    <ProductDetail product={product} products={products} />
  ) : (
    <Loading />
  );
}
const ProductDetail = (props) => {
  const navigate = useNavigate();
  const myInfo = useContext(UserContext);
  const { product, products } = props;
  //   const isMe = myInfo.id === product.user.id;
  const [openModal, setOpenModal] = useState(false);

  const handleCallback = (roomId) => {
    navigate(`/chat`, { state: { roomId } });
  };

  //   const goEditProduct = () => {
  //     navigate("/product/edit", { state: { product } });
  //   };

  return (
    <MainWrapper>
      <ImageWrapper />

      <InfoWrapper>
        <UserInfo>
          <UserProfile user={product.sellerId} />

          <div
            className="ChatBtn"
            onClick={() => {
              if (myInfo?.id === "") {
                alert("로그인 후 이용 가능합니다.");
              }
              handleCallback();
            }}
          >
            <span>판매자와 채팅하기</span>
          </div>
        </UserInfo>
        <Line />
        <InfoTop>
          <h1>{product.title}</h1>
          <div>
            <span>카테고리 {product.category}</span>
            <span>게시일자 {product.createdAt}</span>
          </div>
          <div>{product.price} 원</div>
        </InfoTop>
        <InfoBottom>
          <div
            dangerouslySetInnerHTML={{
              __html: product.content,
            }}
          />
          <div>
            <span>채팅 {product.chatRoom ? product.chatRoom.length : 0}</span>
            <span>조회 {product.view}</span>
            <FixAndDelete>
              <p>수정</p>
              <p onClick={() => setOpenModal(true)}>삭제</p>
            </FixAndDelete>
          </div>
        </InfoBottom>
      </InfoWrapper>
      {products.length > 0 && <GridList data={products} />}
      <DetailDeleteModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        data={product}
        isProduct={true}
      />
    </MainWrapper>
  );
};

export default ProductDetailDelay;
