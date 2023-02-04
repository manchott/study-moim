import React from "react";
import FollowerList from "./FollowerList";
import FollowingList from "./FollowingList";
import MyPageUpdateForm from "./MyPageUpdateForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";

export default function MyPageModal({ showModal, clickModal, setShowModal }) {
  window.onkeydown = function (event) {
    if (event.keyCode == 27) {
      setShowModal(null)
    }
  };

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-4xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-center justify-between pl-5 py-2 border-b border-solid rounded-t">
                  {showModal === "follower" ? (
                    <h3 className="text-xl font-bold">팔로워</h3>
                  ) : null}
                  {showModal === "following" ? (
                    <h3 className="text-xl font-semibold">팔로잉</h3>
                  ) : null}
                  {showModal === "modify" ? (
                    <h3 className="text-xl font-semibold">프로필 수정</h3>
                  ) : null}
                  <button
                    className="pr-8 py-2 transition-all"
                    onClick={clickModal}
                  >
                    <FontAwesomeIcon icon={faCircleXmark} size="lg" className="hover:text-red-500"/>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="my-4 text-slate-500 text-lg leading-relaxed overflow-auto">
                    {showModal === "follower" ? <FollowerList /> : null}
                    {showModal === "following" ? <FollowingList /> : null}
                    {showModal === "modify" ? <MyPageUpdateForm /> : null}
                  </div>
                </div>
                {/* footer */}
                {/* <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Save Changes
                  </button>
                </div> */}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
