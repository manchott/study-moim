import { Link } from "react-router-dom";

export default function LectureQuestion({ lectureQuestion }) {
  const dateBase = new Date(lectureQuestion.publishTime);
  const date = dateBase.toString().substring(0, 24);
  const commentAmount = lectureQuestion.questionBoardComments.length;
  const slicedContent = lectureQuestion.content.substring(0, 100) + "...";

  return (
    <>
      <Link
        to={`/community/question/${lectureQuestion.questionBoardId}`}
        className="w-full hover:bg-gray-100"
      >
        <div className="mx-10 my-5 border-b">
          <div className="font-bold text-[18px] my-3">
            {lectureQuestion.title}
          </div>
          <div className="text-[12px] my-3 text-gray-800">
            {lectureQuestion.content > 100
              ? slicedContent
              : lectureQuestion.content}
          </div>
          <div className="flex flex-row items-center gap-[30px] pb-5">
            <p className="text-[12px] font-bold">
              {lectureQuestion.user.nickname}
            </p>
            <p className="text-[12px] font-bold text-center text-gray-500">
              {date}
            </p>
            <p className="text-[12px] font-bold text-center text-gray-500">
              조회수 {lectureQuestion.hit}
            </p>
            <p className="text-[12px] font-bold text-center text-gray-500">
              댓글 {commentAmount}
            </p>
          </div>
        </div>
      </Link>
    </>
  );
}