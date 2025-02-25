"use client";
import UploadVideo from "@/app/components/UploadVideo";
import { useRef } from "react";

function Dashboard() {
  const modalRef = useRef<HTMLDialogElement>(null);

  const openModal = () => {
    modalRef.current?.showModal();
  };
  const closeModal = () => {
    modalRef.current?.close();
  };

  return (
    <div className="min-h-[65vh]">
      <div className="flex w-full justify-between items-center px-10">
        <div>
          <h1 className="text-2xl md:text-3xl">Dashboard</h1>
        </div>
        <button onClick={openModal} className="flex space-x-2 btn">
          <p>Upload</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
            />
          </svg>
        </button>
      </div>
      <UploadVideo modalRef={modalRef} closeModal={closeModal} />
      <div></div>
    </div>
  );
}

export default Dashboard;
