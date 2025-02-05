"use client";

import axios from "axios";
import { ImageKitProvider } from "imagekitio-next";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;

export default function Provider({ children }: { children: ReactNode }) {
  const authenticator = async () => {
    try {
      const response = await axios("/api/imagekit-auth");

      if (!response.data) {
        const errorText = await response.data.error();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }

      const data = await response.data;
      const { signature, expire, token } = data;
      return { signature, expire, token };
    } catch (error: any) {
      throw new Error(`Authentication request failed: ${error.message}`);
    }
  };

  return (
    <div className="App">
      <SessionProvider>
        <ImageKitProvider
          urlEndpoint={urlEndpoint}
          publicKey={publicKey}
          authenticator={authenticator}
        >
          {children}
        </ImageKitProvider>
      </SessionProvider>
    </div>
  );
}
