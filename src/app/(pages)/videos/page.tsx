"use client";
import { VideoModal } from "@/schemas/zodSchema";
import axios from "axios";
import { IKImage, IKVideo } from "imagekitio-next";
import { useEffect, useState } from "react";
import { z } from "zod";

export default function Videos() {
  type Video = z.infer<typeof VideoModal>;

  const [videoData, setVideoData] = useState<Video[]>([]);

  useEffect(() => {
    async function fetchVideo() {
      try {
        const response = await axios.get<Video[]>("/api/videos");
        console.log("Video Data: ", response.data);
        setVideoData(response.data);
      } catch (error) {
        console.error("Error fetching videos: ", error);
      }
    }
    fetchVideo();
  }, []);

  return (
    // <div>
    //   {videoData.map((video, index) => (
    //     <div key={index}>
    //       <IKVideo
    //         className="ikvideo-default"
    //         path={new URL(video.videoUrl).pathname.substring(1)}
    //         transformation={[{ height: "1980", width: "1080" }]}
    //         controls={true}
    //       />
    //       <IKImage
    //         className="ikimage-thumbnail"
    //         path={new URL(video.thumbnailUrl).pathname.substring(1)}
    //         alt={video.title}
    //         transformation={[{ height: "200", width: "200" }]} // Optional thumbnail resize
    //       />
    //       <p>{video.description}</p>
    //     </div>
    //   ))}
    // </div>
    <div>
      <h1>Images</h1>
    </div>
  );
}
