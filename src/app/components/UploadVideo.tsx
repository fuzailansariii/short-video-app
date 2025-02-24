"use client";
import React, { useState } from "react";
import UploadFile from "./UploadFile";
import { VideoModal } from "@/schemas/zodSchema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

interface UploadVideoProps {
  modalRef: any;
  closeModal: () => void;
}

export default function UploadVideo({
  modalRef,
  closeModal,
}: UploadVideoProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof VideoModal>>({
    resolver: zodResolver(VideoModal),
  });
  const handleUploadSuccess = () => {
    console.log("video upload successfully!");
  };

  const onSubmit = async (data: z.infer<typeof VideoModal>) => {
    console.log("Form Submit successfully");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <dialog ref={modalRef} className="modal">
        <div className="modal-box flex flex-col justify-center gap-5">
          <div>
            <h1 className="text-xl font-semibold">
              Please enter the details of the video
            </h1>
          </div>
          <div className="flex flex-col gap-5 rounded-md mx-auto w-full">
            <input
              {...register("title")}
              type="text"
              placeholder="Title"
              className="input input-bordered w-full"
            />
            {errors.title?.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title?.message}
              </p>
            )}
            <input
              {...register("description")}
              type="text"
              placeholder="Description"
              className="input input-bordered w-full grow"
            />
            {errors.description?.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description?.message}
              </p>
            )}
            <div className="space-y-2">
              <p>Upload Video</p>
              <UploadFile onSuccess={handleUploadSuccess} fileType="video" />
            </div>
            <div>
              <p>Upload Thumbnail</p>
              <UploadFile onSuccess={handleUploadSuccess} fileType="image" />
            </div>
            <button type="submit" className="btn btn-primary">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Upload"
              )}
            </button>
            <button className="btn" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
        {/* <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form> */}
      </dialog>
    </form>
  );
}
