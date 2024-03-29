import { Link, NavLink } from "react-router-dom";
import userInfo from "../../zustand/store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import RingModal from "./RingModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

/** @function 로그인된상태네비게이션바 */
export default function NavBarLogInMd() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { setLogOut, info } = userInfo();

  if (!info) {
    return null;
  }

  function closeModalHandler() {
    setShowModal(false);
  }

  function logoutHandler() {
    setLogOut();
    localStorage.clear();
    navigate("/");
  }

  return (
    <div className="flex flex-col w-[360px] relative gap-3">
      <div
        onClick={() => setShowModal(true)}
        className="flex items-center cursor-pointer hover:text-[#B1B2FF] text-[16px]"
      >
        알림
      </div>
      {showModal ? <RingModal onCancel={closeModalHandler} /> : null}
      <a href={`/mypage/${info.userId}`}>
        <button className="text-[16px] hover:text-[#B1B2FF]">MyPage</button>
      </a>
      <button
        className="text-left text-[16px] hover:text-[#B1B2FF]"
        onClick={logoutHandler}
      >
        로그아웃
      </button>
    </div>
  );
}
