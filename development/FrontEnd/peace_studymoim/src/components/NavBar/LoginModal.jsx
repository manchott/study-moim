import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faComment } from "@fortawesome/free-solid-svg-icons";

export default function LoginModal(props) {
  const REST_API_KEY = import.meta.env.VITE_APP_REST_API_KEY;
  const API_SERVER = import.meta.env.VITE_APP_API_SERVER;
  const REDIRECT_URI = `http://${API_SERVER}/api/v1/oauth/login`;
  const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;

  window.onkeydown = function (event) {
    if (event.keyCode == 27) {
      props.onCancel();
    }
  };

  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URI;
  };

  function cancelHandler() {
    props.onCancel();
  }

  return (
    <>
      <div className="justify-center items-center flex fixed inset-0 z-50">
        {/*content*/}
        <div className="w-[350px] h-[350px] rounded-lg shadow-lg flex flex-col bg-white outline-none focus:outline-none">
          {/*header*/}
          <div className="flex items-center justify-between py-5 px-6 border-b">
            <p className="font-bold">로그인</p>
            <button className="transition-all" onClick={() => cancelHandler()}>
              <FontAwesomeIcon
                icon={faXmark}
                size="lg"
                className="hover:text-red-500"
              />
            </button>
          </div>
          {/*body*/}
          <div className="flex flex-col items-center justify-center py-5 px-6 gap-5">
            <img
              src={"/logo.png"}
              className="border w-[100px] object-cover rounded-full"
            />
            <p className="text-gray-500 text-[14px] text-center">
              스터디 모임은 쓰임 <br /> 간편 로그인 및 회원가입
            </p>
            <button className="bg-[#F7E600] w-[250px] h-[50px] rounded-[7px] flex justify-center items-center gap-4 hover:scale-105"
              onClick={handleLogin}
            >
              <FontAwesomeIcon
                icon={faComment}
                size="lg"
                className="text-[#3A1D1D]"
              />
              <p className="font-bold">카카오로 시작하기</p>
            </button>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}