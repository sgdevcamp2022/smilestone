import styled from "styled-components";
import { DProps } from "./ProductInfoListCard";

function ListTitle(props: DProps) {
  return <TitleWrapper>{props.title}</TitleWrapper>;
}

// export default ListTitle;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 180px;
  padding-bottom: 50px;
  letter-spacing: -2px;
  font-size: 32px;
  font-weight: 500;
`;

export default ListTitle;
