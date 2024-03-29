import React from "react";
import RingModalItem from "./RingModalItem.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";

export default function RingModal(props) {
  window.onkeydown = function (event) {
    if (event.keyCode == 27) {
      props.onCancel();
    }
  };
  function cancelHandler() {
    props.onCancel();
  }

  return (
    <>
      {/* 모달 백드롭 여기보고하셈  id배경이랑 모달내용에 absolute 를 주고 / id배경에는 z인덱스를 빼줌(제일 밑으로) */}
      <div className="justify-center items-center flex overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none pt-16">
        <div id="배경" onClick={() => cancelHandler()} className="absolute opacity-25 w-full h-full inset-0 bg-black"></div>
        <div id="모달내용" className="absolute min-w-[400px] max-w-[60%] bg-white shadow-2xl rounded-lg z-45">
          <div className="flex w-full items-center justify-between px-5 py-3 border-b">
            <p className="text-[15px] font-semibold flex items-center gap-3">
              <FontAwesomeIcon icon={faBell} color="ye"/> 새로운 소식
            </p>
            <button className="transition-all" onClick={() => cancelHandler()}>
              <FontAwesomeIcon
                icon={faXmark}
                size="lg"
                className="hover:text-red-500"
              />
            </button>
          </div>
          <div className="flex flex-col w-full items-start justify-start">
            {props.alarmList.map((alarm) => (
              <RingModalItem
                key={alarm.alarmId}
                alarm={alarm}
                onLinkClick={cancelHandler}
              />
            ))}
            {props.alarmList.length == 0 ? <p className="text-[15px]  px-5 py-3">새로운 소식이 없습니다.</p> : null}
          </div>
        </div>
      </div>
    </>
  );
}

