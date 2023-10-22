"use client"; // Error components must be Client Components

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({ error }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    if (error.message === "Invalid Session") {
      signOut({ callbackUrl: "/signin", redirect: true });
    } else if (error.message === "No Session Detected") {
      router.push("/signin");
    } else {
      signOut({ callbackUrl: "/signin", redirect: true });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return null;
}
