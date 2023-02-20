import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ProductInfoListCard from "./ProductInfoListCard";

const AllWrapper = styled.div`
  display: grid;
  justify-content: center;
  width: 100%;
`;

const ListWrapper = styled.div`
  display: grid;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  background-color: white;
  @media (max-width: 690px) {
    grid-template-columns: 1fr 1fr;
    max-width: 600px;
    min-width: 350px;
  }
  // 아이패드 (모바일 버전)
  @media (min-width: 691px) and (max-width: 890px) {
    width: 690px;
    grid-template-columns: 1fr 1fr 1fr;
  }
  // 모니터
  @media (min-width: 891px) {
    width: 100%;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const MoreView = styled.button`
  display: flex;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 20px;
  border: none;
  width: max-content;
  background-color: transparent;
  color: #858e96;
  font-size: 16px;
`;

const ListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  margin: 0 auto;
  width: 768px;
  margin-top: 2rem;
`;
const ProductInfoList = (props) => {
  // const { maxWidth, post } = props;

  // return (
  //   <AllWrapper>
  //     <ListWrapper>
  //       {post &&
  //         post.map((post) => (
  //           <ProductInfoListCard
  //             key={post.id}
  //             data={post}
  //             maxWidth={maxWidth}
  //           />
  //         ))}
  //       {maxWidth === 800 && <MoreView> 더보기 </MoreView>}
  //     </ListWrapper>
  //   </AllWrapper>
  // );

  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(false);

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

  if (loading) {
    return <ListBlock>대기 중</ListBlock>;
  }

  if (!posts) {
    return null;
  }

  return (
    <ListBlock>
      {posts.map((post) => (
        <ProductInfoListCard key={post.productId} post={post} />
      ))}
    </ListBlock>
  );
};

export default ProductInfoList;
