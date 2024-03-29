import { useState, useRef, useEffect } from "react";
import userInfo from "../../zustand/store";
import MDEditor from "@uiw/react-md-editor";

export default function PlayerMemo({ lectureId }) {
  const { info } = userInfo();
  // 생성중에는 create 못하게 하기
  const [isLoading, setIsLoading] = useState(false);
  // input창에 있는 값을 얻기, DOM요소에 접근하는 것
  const API_SERVER = import.meta.env.VITE_APP_API_SERVER;

  const [prevMemo, setPrevMemo] = useState(""); 
  const [memoContent, setMemoContent] = useState(""); 
  const onAddMemo = (e) => {
    setMemoContent(e);
  };

  const updateMemo = {
    memo: memoContent, 
  };

  useEffect(() => {
    const getPrevMemo = async () => {
      await fetch(
        `http://${API_SERVER}/api/v1/note/${lectureId}/${info.userId}`
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setPrevMemo(data);
          setMemoContent(data.content); 
          let memoContent = document.getElementById("memoText");
          memoContent.value = data.content;
        });
    };
    getPrevMemo();
  }, []);

  
  function onSubmit(e) {
    e.preventDefault();

    if (!isLoading) {
      setIsLoading(true);
      // Create 호출
      // 두번째 인자로 메서드를 넣어줌
      fetch(`http://${API_SERVER}/api/v1/note/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // body : 수정을 위한 정보를 넣어줘야함
        // + JSON 문자열로도 변환시켜줌
        body: JSON.stringify({
          userId: info.userId,
          lectureId: lectureId,
          content: memoContent,
        }),
      }).then((res) => {
        if (res.ok) {
          setIsLoading(false);
          alert("메모가 저장되었습니다.");
        }
      });
    }
  }
  return (
    <>
      <form
        onSubmit={onSubmit}
        className="flex flex-col justify-start items-end w-full h-full"
      >
        {/* <textarea
          id="memoText"
          className="w-full h-full border p-2 scrollbar-none"
          placeholder="마크다운 양식으로 작성하기"
          ref={contentRef}
        
        ></textarea> */}
        <div className="w-full h-full"> 
          <MDEditor value={updateMemo.memo} onChange={onAddMemo} preview="edit" height="80vh" />
        </div> 
        <div className="flex flex-row gap-6 justify-end items-center">
          <div className="text-xs">*저장하기를 눌러 수정 반영</div>
          <button className="shadow-innerDown w-[65px] h-[30px] mt-[10px] bg-[#b1b2ff] font-bold text-white text-[9pt] rounded-md hover:bg-[#8b8dff] hover:shadow-innerUp">
            저장하기
          </button>
        </div>
      </form>
    </>
  );
}
