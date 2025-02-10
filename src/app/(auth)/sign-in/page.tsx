"use client";
import { SignInModel } from "@/schemas/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

export default function SignIn() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof SignInModel>>({
    resolver: zodResolver(SignInModel),
  });

  const onSubmit = async (data: z.infer<typeof SignInModel>) => {
    setIsSubmitting(true);
    const { email, password } = data;
    try {
      const response = await signIn("credentials", {
        redirect: false,
        email: email,
        password: password,
      });

      if (response?.ok) {
        toast.success("Login successful.");
        router.push("/dashboard");
      } else {
        if (response?.error === "Invalid email.") {
          toast.error("Email not found. Please check your email.");
        } else if (response?.error === "Invalid password.") {
          toast.error("Incorrect password. Please try again.");
        } else {
          toast.error(response?.error || "Invalid email or password.");
        }
      }
      reset();
    } catch (error: any) {
      toast.error("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md px-4 py-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-1">
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>

              <input
                {...register("email")}
                type="email"
                className="grow"
                placeholder="Email"
              />
            </label>
            {errors.email?.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email?.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
                />
              </svg>

              <input
                {...register("password")}
                type="password"
                className="grow"
                placeholder="Password"
              />
            </label>
            {errors.password?.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password?.message}
              </p>
            )}
          </div>
          <button disabled={isSubmitting} className="btn w-full">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>{" "}
        <p className="flex justify-center">
          If you are new?
          <span className="ml-1">
            <Link href={"/sign-up"} className="text-red-200 underline">
              Sign Up
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
}
