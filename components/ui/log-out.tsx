"use client";
import { signOut } from "next-auth/react";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function LogOut({ children }: Props) {
  return React.Children.map(children, (child) =>
    React.cloneElement(child as React.ReactElement<any>, {
      onClick: () => signOut({ callbackUrl: "/signin", redirect: true }),
    }),
  );
}
