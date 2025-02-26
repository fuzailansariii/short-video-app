"use client";
import React, { useState } from "react";
import UploadFile from "./UploadFile";
import { VideoModal } from "@/schemas/zodSchema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import axios from "axios";

interface UploadVideoProps {
  modalRef: any;
  closeModal: () => void;
}

export default function UploadVideo({
  modalRef,
  closeModal,
}: UploadVideoProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof VideoModal>>({
    resolver: zodResolver(VideoModal),
  });

  // const onSubmit = (data: z.infer<typeof VideoModal>) => {
  //   console.log("Form Data: ", data);
  // };
  const handleVideoUpload = (res: IKUploadResponse) => {
    console.log("Video uploaded: ", res.url);
    setVideoUrl(res.url);
  };
  const handleThumbnailUpload = (res: IKUploadResponse) => {
    console.log("Thumbnail uploaded: ", res.url);
    setThumbnailUrl(res.url);
  };

  const onSubmit = async (data: z.infer<typeof VideoModal>) => {
    console.log("Submitting form: ", data);
    setIsSubmitting(true);
    if (!videoUrl) {
      alert("Please upload a video before submitting.");
      setIsSubmitting(false);
      return;
    }
    if (!thumbnailUrl) {
      alert("Please upload a thumbnail before submitting.");
      setIsSubmitting(false);
      return;
    }

    try {
      await axios.post("/api/upload-videos", {
        title: data.title,
        description: data.description,
        videoUrl,
        thumbnailUrl,
      });

      console.log("Video details saved in the database!");
      reset();
      setVideoUrl(null);
      setThumbnailUrl(null);
      closeModal();
    } catch (error: any) {
      console.error("Form Submit Failed ", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <dialog ref={modalRef} className="modal">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex justify-center w-full"
      >
        <div className="modal-box flex flex-col justify-center">
          <div className="flex flex-col gap-5 rounded-md mx-auto w-full">
            <h1 className="text-xl font-semibold">
              Please enter the details of the video
            </h1>
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
              <UploadFile onSuccess={handleVideoUpload} fileType="video" />
              <p>Upload Thumbnail</p>
              <UploadFile onSuccess={handleThumbnailUpload} fileType="image" />
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
      </form>
    </dialog>
  );
}
