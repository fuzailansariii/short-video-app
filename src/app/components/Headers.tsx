"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

function Headers() {
  const { data: session } = useSession();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error during Sign out");
    }
  };

  return (
    <div>
      <div>
        {session ? (
          <div>
            <h1>
              Welcome, <span>{session.user.name}</span>
            </h1>
            <button onClick={handleSignOut}>Sign Out</button>
          </div>
        ) : (
          <div>
            <Link href={"/sign-in"}>Sign In</Link>
            <Link href={"/sign-up"}>Sign Up</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Headers;
