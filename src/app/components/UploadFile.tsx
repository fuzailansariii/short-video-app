"use client";
import { useState } from "react";
import { IKUpload } from "imagekitio-next";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { Loader2 } from "lucide-react";

interface FileUploadProps {
  onSuccess: (res: IKUploadResponse) => void;
  onProgress?: (progress: number) => void;
  fileType?: "image" | "video";
}

export default function UploadFile({
  onSuccess,
  onProgress,
  fileType,
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onError = (err: { message: string }) => {
    console.log("Error", err);
    setError(err.message);
    setUploading(false);
  };

  const successHandler = (res: IKUploadResponse) => {
    console.log("Success", res);
    setUploading(false);
    setError(null);
    onSuccess(res);
  };

  const handleProgress = () => {
    setUploading(true);
    setError(null);
  };

  const handleStartUpload = (evt: ProgressEvent) => {
    if (evt.lengthComputable && onProgress) {
      const percentComplete = (evt.loaded / evt.total) * 100;
      onProgress(Math.round(percentComplete));
    }
  };

  const validateFile = (file: File) => {
    if (fileType === "video") {
      if (!file.type.startsWith("video/")) {
        setError("Please upload a video file");
        return false;
      }
      if (file.size > 100 * 1024 * 1024) {
        setError("Video must be less than 100MB.");
        return false;
      }
    } else {
      const validtypes = ["image/jpeg", "image/png", "image/webp"];
      if (!validtypes.includes(file.type)) {
        setError("Please upload a valid file(JPEG, PNG, WEBP)");
        return false;
      }
      if (file.size > 3 * 1024 * 1024) {
        setError("File must be less than 3MB");
        return false;
      }
    }
    return true;
  };

  return (
    <div className="space-y-2">
      <IKUpload
        fileName={fileType === "video" ? "video" : "image"}
        useUniqueFileName={true}
        folder={fileType === "video" ? "videos/" : "images/"}
        validateFile={validateFile}
        onError={onError}
        onSuccess={successHandler}
        onUploadProgress={handleStartUpload}
        onUploadStart={handleProgress}
      />
      {uploading && (
        <div className="flex items-center gap-2 text-sm">
          <Loader2 className="animate-spin w-4 h-4" />
          <span>Uploading...</span>
        </div>
      )}{" "}
      {error && <div className="text-sm text-red-600">{error}</div>}
    </div>
  );
}
