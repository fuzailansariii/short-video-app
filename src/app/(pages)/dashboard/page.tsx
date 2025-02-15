"use client";
import UploadFile from "@/app/components/UploadFile";

function Dashboard() {
  const handleUploadSuccess = () => {
    console.log("video upload successfully!");
  };
  return (
    <div>
      <UploadFile onSuccess={handleUploadSuccess} fileType="video" />
    </div>
  );
}

export default Dashboard;
