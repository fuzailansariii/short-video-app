"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function Headers() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Logout Successful.");
    } catch (error) {
      console.error("Error during Sign out");
    }
  };

  return (
    <div className="flex justify-between px-5 py-3">
      <div className="text-2xl">
        <Link href={"/"}>Quick Videos</Link>
      </div>
      <div className="flex space-x-2 items-center">
        {session ? (
          <div className="flex gap-3 items-center">
            <h1>
              Welcome, <span>{session.user.email}</span>
            </h1>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 cursor-pointer"
              onClick={handleSignOut}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
              />
            </svg>
          </div>
        ) : (
          <div className="space-x-4">
            <Link href={"/sign-in"}>Sign In</Link>
            <Link href={"/sign-up"}>Sign Up</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Headers;
