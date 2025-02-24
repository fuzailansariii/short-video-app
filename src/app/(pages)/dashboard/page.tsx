"use client";
import UploadFile from "@/app/components/UploadFile";
import UploadVideo from "@/app/components/UploadVideo";
import { useRef } from "react";

function Dashboard() {
  const modalRef = useRef<HTMLDialogElement>(null);

  const openModal = () => {
    modalRef.current?.showModal();
  };

  const handleUploadSuccess = () => {
    console.log("video upload successfully!");
  };
  return (
    <div className="min-h-[65vh]">
      <div className="relative flex justify-between">
        <button onClick={openModal}>
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
        {openModal ? (
          <>
            <button className="btn" onClick={openModal}>
              open modal
            </button>
            <dialog ref={modalRef} className="modal">
              <div className="modal-box flex justify-center">
                <div className="flex flex-col gap-5 rounded-md mx-auto w-full">
                  <input
                    type="text"
                    placeholder="Title"
                    className="input input-bordered w-full max-w-xs"
                  />
                  <input
                    type="text"
                    placeholder="Description"
                    className="input input-bordered w-full max-w-xs"
                  />
                  <UploadFile
                    onSuccess={handleUploadSuccess}
                    fileType="video"
                  />
                  <button className="btn btn-primary max-w-xs">Upload</button>
                </div>
              </div>
              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>
          </>
        ) : null}
        {/* <UploadVideo modalRef={modalRef} /> */}
      </div>
    </div>
  );
}

export default Dashboard;
