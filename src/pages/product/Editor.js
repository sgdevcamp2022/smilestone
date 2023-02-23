import { useRef, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { usePrompt } from "../../hooks/blocker";
import Quill from "quill";
import "quill/dist/quill.bubble.css";
import styled from "styled-components";
import { postProduct, category } from "../../apis/product";
import { UserContext } from "../../context/context";
import LeavePageButton from "../../components/button/LeavePageButton";
const EditorWrapper = styled.div``;
const EditorBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleInput = styled.input`
  font-size: 25px;
  outline: none;
  padding-bottom: 8px;
  border: none;
  border-bottom: 1px solid #f37802;
  margin: 20px 0;
  width: 100%;
`;

const PriceAndCategoryWrapper = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  justify-content: flex-start;
  align-items: center;
`;

const PriceWrapper = styled.div`
  display: flex;
  width: 50%;
  height: 41px;
  margin-right: 10px;
  border-bottom: 1px solid #f37802;
`;

const Won = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  padding-left: 10px;
  color: ${(props) => (props.priceValid === true ? "#F37802" : "#757575")};
`;

const PriceInput = styled.input`
  display: flex;
  font-size: 20px;
  outline: none;
  padding-bottom: 2px;
  border: none;
  width: 100%;

  &&::-webkit-outer-spin-button,
  &&::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const CatergoryWrapper = styled.div`
  display: flex;
  width: 50%;
  margin-left: 10px;
  border-bottom: 1px solid #f37802;
`;

const CategorySelect = styled.select`
  display: flex;
  align-items: center;
  width: 170px;
  height: 40px;
  padding: 0;
  border: none;
  font-size: 20px;
  border-radius: 3px;
`;

const PlaceHolder = styled.option`
  color: gray;
`;
const DropDown = styled.option`
  display: flex;
  flex-direction: row;
  font-size: 15px;
`;

const QuillWrapper = styled.div`
  margin: 20px 10px 0 10px;
  .ql-editor {
    padding: 0;
    min-height: 320px;
    font-size: 20px;
    line-height: 1.5;
  }

  .ql-editor.ql-blanck::before {
    left: 0px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 25px;
`;

const SubmitButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
  border: none;
  border-radius: 5px;
  width: 90px;
  height: 40px;
  color: white;
  background-color: #f37802;
  font-size: 20px;

  :hover {
    cursor: pointer;
  }
`;

const Editor = (props) => {
  //게시글 내용
  let productId = 0;
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const quillElement = useRef(null); //quill div ref
  const quillInstance = useRef(null); //quill 생성용
  const categorySelection = useRef(null);
  const selectBox = useRef(null);
  const [priceInput, setPriceInput] = useState(false); //₩ 색 변경위한 state
  const [allContents, setAllContents] = useState({
    title: "",
    productId: NaN,
    sellerId: NaN,
    price: "0",
    content: "",
  }); //게시글 정보 묶어서 저장

  // 카테고리 받아와서 넘기기 위한 State

  const [category, setCategory] = useState([
    {
      id: 0,
      categoryName: "카테고리 선택",
    },
    {
      id: 1,
      categoryName: "영어",
    },
    {
      id: 2,
      categoryName: "수학",
    },
    {
      id: 3,
      categoryName: "과학",
    },
    {
      id: 4,
      categoryName: "컴퓨터",
    },
    {
      id: 5,
      categoryName: "디자인",
    },
  ]);

  // useEffect(() => {
  //   fetch("/api/product/category?category=컴퓨터",
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${localStorage.getItem("login-token")}`,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setCategory(data);
  //       console.log(data);
  //     });
  // }, []);

  //가격정보 저장과 원 이모티콘 색 변환을 위한 불리언 값 저장
  const onPriceChange = (e) => {
    if (e.target.value.length > 9) {
      e.target.value = 999999999;
    }
    if (e.target.value.length < 1) {
      setPriceInput(false);
    } else setPriceInput(true);
    setAllContents({ ...allContents, price: e.target.value });
  };

  //제목 저장
  const onChangeTitle = (e) => {
    setAllContents({
      ...allContents,
      title: e.target.value,
    });
  };

  // 선택된 카테고리 저장
  const onCategorySelect = (e) => {
    setAllContents({ ...allContents, productId: e.target.value });
  };

  //게시글 내용을 저장하는 함수
  const handleSubmit = () => {
    setAllContents({
      ...allContents,
      userId: user.id,
    });
    const descriptionText = quillElement.current.innerText;
    return { ...allContents, content: descriptionText };
  };

  const onCategoryNotSelected = () => {
    categorySelection.current.focus();
  };

  const goToDetail = () => {
    navigate(`/product`, {
      state: { productId: productId },
      replace: true,
    });
  };

  //완료 버튼 클릭시 인풋 값 확인 후 전송
  const onButtonClick = async () => {
    const sendableResult = handleSubmit();
    if (sendableResult.content.length < 5) {
      alert("내용을 5자 이상 등록해주세요");
      return;
    }
    if (sendableResult.title.length < 1) {
      alert("제목을 더 입력해주세요");
      return;
    }
    if (!sendableResult.productId || sendableResult.productId === "0") {
      onCategoryNotSelected();
      alert("카테고리를 선택해주세요");
      return;
    } else {
      postProduct(sendableResult).then((data) => {
        productId = data.productId;
        data.productId && goToDetail();

        window.alert("글이 게시되었습니다 !");
      });
    }
  };

  usePrompt(
    "변경내용이 저장되지 않습니다. 페이지를 떠나시겠습니까?",
    Boolean(productId)
  );

  useEffect(() => {
    quillInstance.current = new Quill(quillElement.current, {
      placeholder: `sMarket에 올릴 기술 내용을 작성해주세요. (거짓 혹은 허위 게시글은 제한될 수 있어요.)`,
    });
  }, [user]);

  return (
    <>
      <EditorBlock>
        <TitleInput placeholder=" 글 제목" onChange={(e) => onChangeTitle(e)} />
        <PriceAndCategoryWrapper>
          <PriceWrapper>
            <Won priceValid={priceInput}>₩</Won>
            <PriceInput
              type="number"
              placeholder=" 가격 (선택사항)"
              onChange={(e) => onPriceChange(e)}
              max="999999999"
            />
          </PriceWrapper>
          <CatergoryWrapper onChange={(e) => e.target.blur()}>
            <CategorySelect
              ref={selectBox}
              required
              id="category"
              name="category"
              placeholder="카테고리"
              onChange={(e) => onCategorySelect(e)}
            >
              <PlaceHolder value="0" ref={categorySelection}>
                카테고리 선택
              </PlaceHolder>
              {category.map((data) => (
                <DropDown key={data.id} value={data.id}>
                  {data.categoryName}
                </DropDown>
              ))}
            </CategorySelect>
          </CatergoryWrapper>
        </PriceAndCategoryWrapper>
        <EditorWrapper>
          <QuillWrapper>
            <div ref={quillElement} />
          </QuillWrapper>
        </EditorWrapper>
        <ButtonWrapper>
          <SubmitButton onClick={() => onButtonClick()}>완료</SubmitButton>
          <LeavePageButton content="취소" />
        </ButtonWrapper>
      </EditorBlock>
    </>
  );
};

export default Editor;
