import React, { useContext } from "react";
import { UserContext } from "../../context/context";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BsFillHandbagFill } from "react-icons/bs";

function GridList({ data }) {
  const myInfo = useContext(UserContext);
  const navigate = useNavigate();

  const handleNavigate = (productId) => {
    navigate(`/product/detail/${productId}`);
  };

  return (
    <GridMain>
      <Header>{"게시된 기술"}</Header>
      <Content>
        {data.map((item) => {
          return (
            <div
              key={item.id}
              className="ItemWrapper"
              onClick={() => handleNavigate(item.id)}
            >
              <div className="imageWrapper">
                {/* {item.productImage[0] ? (
                  <img
                    alt="productImage"
                    src={`${SERVER_PORT}/${item.productImage[0].imageUrl}`}
                  />
                ) : ( */}

                <BsFillHandbagFill className="noImage" />
                {/* )} */}
              </div>
              <div className="infoWrapper">
                <div>
                  <span>{item.title}</span>
                </div>
                <div>
                  <span>{item.price}</span>
                </div>
                <div></div>
                <div>{/* <span>채팅{item.chatRoom.length}</span> */}</div>
              </div>
            </div>
          );
        })}
      </Content>
    </GridMain>
  );
}

const GridMain = styled.section`
  @media (max-width: 690px) {
    padding: 0px 15px;
  }
  @media (min-width: 691px) and (max-width: 890px) {
    padding: 0px 15px;
  }
  @media (min-width: 891px) {
    width: 677px;
    margin: 0px auto;
  }
`;
const Header = styled.div`
  margin-bottom: 20px;
  h2 {
    font-size: 20px;
    font-weight: 600;
  }
`;
const Content = styled.div`
  .imageWrapper {
    position: relative;
    .noImage {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 50px;
      color: silver;
    }
  }

  @media (max-width: 630px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    .ItemWrapper {
      margin-bottom: 50px;
      margin-right: 10px;

      .imageWrapper {
        width: 100%;
        height: 220px;
      }
    }
  }
  @media (min-width: 631px) and (max-width: 690px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    .ItemWrapper {
      margin: 0px auto 50px;
      .imageWrapper {
        width: 300px;
        height: 300px;
      }
    }
  }
  @media (min-width: 691px) and (max-width: 890px) {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    .ItemWrapper {
      margin: 0px auto 50px;
      .imageWrapper {
        width: 200px;
        height: 200px;
      }
    }
  }
  @media (min-width: 891px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .ItemWrapper {
      margin-bottom: 50px;
      .imageWrapper {
        width: 200px;
        height: 200px;
      }
    }
  }

  .ItemWrapper {
    display: flex;
    flex-direction: column;
    cursor: pointer;

    .imageWrapper {
      overflow: hidden;
      border: 0.5px solid #ccc;
      border-radius: 15px;
      img {
        width: 100%;
      }
    }
    .infoWrapper {
      div:nth-child(1) {
        margin-top: 20px;
      }
      div:nth-child(2) {
        margin-top: 14px;
        font-weight: bold;
      }
      div:nth-child(3) {
        margin-top: 10px;
        font-size: 13px;
      }
      div:nth-child(4) {
        margin-top: 8px;
        font-size: 13px;
        color: #999;
        span:nth-child(1) {
          margin-right: 4px;
        }
        span:nth-child(2) {
          margin-left: 6px;
        }
      }
    }
  }
`;

export default GridList;
