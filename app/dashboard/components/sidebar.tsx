"use client";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
  links: {
    text: string;
    icon: JSX.Element;
    url: string;
    separator: boolean;
  }[];
};

export default function Sidebar({ links }: Props) {
  const pathname = usePathname();

  return (
    <ul>
      {links.map(({ icon, separator, text, url }, index) => {
        if (separator === true) {
          return <Separator key={index} />;
        }
        const isActive = pathname === url;
        return (
          <li className="text-gray-500" role="button" key={text}>
            <Link
              href={url}
              className={cn(
                "flex h-14 items-center gap-2 px-3",
                isActive ? "bg-primary text-primary-foreground" : null,
              )}
            >
              {icon}
              <p className="text-sm font-semibold">{text}</p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
