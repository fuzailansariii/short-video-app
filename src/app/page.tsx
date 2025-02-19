"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col h-screen max-w-screen-lg mx-auto my-5 ">
      <div className="flex flex-col gap-5 text-center justify-center items-center w-full h-1/4 px-4">
        <h1 className="font-quicksand  text-3xl font-semibold md:text-5xl">
          Discover & Share Amazing Videos
        </h1>
        <p className="text-xl md:text-2xl">
          Upload your moments, explore new content, and connect with a community
          of creators.
        </p>
      </div>

      <div className="flex space-x-5 justify-center items-center w-full ">
        <Link href={"/videos"}>
          <button className="btn btn-secondary">Start Watching Now</button>
        </Link>
        <Link href={"/dashboard"}>
          <button className="btn btn-outline">Upload Video</button>
        </Link>
      </div>
    </div>
  );
}
