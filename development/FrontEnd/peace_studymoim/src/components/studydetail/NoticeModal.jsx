import { useParams } from "react-router";
import { useRef } from "react";

export default function NoticeModal(props) {
  console.log(props)
  const API_SERVER = import.meta.env.VITE_APP_API_SERVER;
  const studyId = useParams();

  window.onkeydown = function (event) {
    if (event.keyCode == 27) {
      props.onCancel();
    }
  };

  const requestRef = useRef("");

  function submitHandler(event) {
    event.preventDefault();
    const enteredRequest = requestRef.current.value;

    const requestData = {
      notice: enteredRequest,
      studyId: studyId.study_id,
    };
    fetch(`http://${API_SERVER}/api/v1/study/${studyId.study_id}/notice`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    }).then((res) => {
      if (res.ok) {
        props.onCancel();
        location.reload();
      }
    });
  }
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-slate-200 rounded-t">
              <img
                src="/logo.png"
                className="flex-grow-0 flex-shrink-0 w-[385px] h-[237.5px] rounded-xl object-cover"
              />
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => props.onCancel()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            {/*body*/}
            <form
                onSubmit={submitHandler}
                className="flex flex-col justify-center items-center"
              >
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  maxLength={100}
                  ref={requestRef}
                  // placeholder={props.} 
                ></textarea>
              <button
                className="flex justify-center items-center flex-grow h-11 relative gap-2.5 px-1 py-3.5 rounded-lg bg-white border border-[#4f4f4f] text-sm text-[#4f4f4f]"
              >
                제출하기 
              </button>
              </form>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}