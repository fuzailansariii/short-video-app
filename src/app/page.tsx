"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import UploadFile from "./components/UploadFile";
import { IKVideo } from "imagekitio-next";

export default function Home() {
  const [videos, setVideos] = useState<
    {
      videoUrl: string;
      title: string;
      description: string;
      thumbnailUrl: string;
    }[]
  >([]);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get("/api/videos");
        setVideos(response?.data);
      } catch (error: any) {
        console.error("error fetching videos", error);
      }
    };
    fetchVideo();
  }, []);

  const handleUploadSuccess = async (res: any) => {
    try {
      const videoData = {
        title: res.name,
        description: "Uploaded video",
        videoUrl: res.url,
        thumbnailUrl: res.thumbnailUrl || "", // Provide fallback or extract from res
      };
      await axios.post("/api/videos", videoData);
      setVideos((prev) => [...prev, videoData]);
    } catch (error) {
      console.error("Error saving video data", error);
    }
  };

  return (
    <div>
      <UploadFile onSuccess={handleUploadSuccess} fileType="video" />
      <div>
        {videos.map((video, index) => (
          <IKVideo path={video.videoUrl} controls={true} />
        ))}
      </div>
    </div>
  );
}
