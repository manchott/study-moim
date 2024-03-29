import { useEffect, useRef, useState } from "react";
import userInfo from "../../zustand/store";
import { Link, NavLink } from "react-router-dom";
import Moment from "moment";
import "moment/locale/ko";

export default function QuestionComment({ comment, commentUserId }) {
  const [pt, setPt] = useState(comment.publishTime);
  if (pt === null) {
    return null;
  }

  const { info } = userInfo();
  const [isMine, setIsMine] = useState(false);
  const IMAGE_ROOT = import.meta.env.VITE_APP_IMAGE_ROOT;
  const image = IMAGE_ROOT + comment.user.saveName;
  useEffect(() => {
    if (info.userId === commentUserId) {
      setIsMine(true);
    }
  }, []);

  const API_SERVER = import.meta.env.VITE_APP_API_SERVER;

  const handleRemove = () => {
    if (window.confirm(`댓글을 삭제하시겠습니까?`)) {
      fetch(
        `http://${API_SERVER}/api/v1/articles/question/comment/${comment.questionBoardCommentId}/`,
        {
          method: "DELETE",
        }
      ).then((res) => {
        if (res.ok) {
          alert("댓글 삭제완료");
          window.location.reload();
        }
      });
    }
  };

  return (
    <>
      <div className="flex flex-col max-w-4xl mx-auto border border-gray-200 rounded-[10px] justify-end items-end w-9/12 bg-white mb-3 p-7">
        <div className="w-full">
          {/* 댓글 맨위 */}
          <div className="flex flex-row justify-between pb-5 border-b">
            <div className="flex justify-start items-center relative gap-px">
              <img
                className="w-10 rounded-full"
                src={image}
              />
              <div className="pl-3">
                <NavLink
                  to={`/mypage/${commentUserId}`}
                  className="hover:text-[#989aff]"
                >
                  <div className="px-2.5 ext-[15px] font-bold">
                    {comment.user.nickname}
                  </div>
                </NavLink>
                <div className="px-2.5 text-[14px] text-center text-[#7b7474]">
                {Moment(comment.publishTime).format(
                    "YYYY년 MM월 DD일 HH:mm"
                  )}
                </div>
              </div>
            </div>
            {/* 수정 삭제 버튼 */}

            <div className={!isMine ? "invisible" : "visible"}>
              <button
                onClick={handleRemove}
                className="text-[14px] text-center hover:font-bold"
              >
                삭제
              </button>
            </div>
          </div>
          {/* 댓글 내용 */}
          <ppre className="w-full mt-5 text-[15px] text-start whitespace-pre-wrap break-all font-sans">
            {comment.content}
          </ppre>
        </div>
      </div>
    </>
  );
}
