import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export interface Props {
  children: ReactNode;
  className?: string;
}

function Root({ children, className }: Props) {
  return <div className={twMerge("", className)}>{children}</div>;
}

function Content({ children, className }: Props) {
  return (
    <div className={twMerge("mx-auto max-w-7xl px-[min(5vw,83px)]", className)}>
      {children}
    </div>
  );
}

const Container = { Root, Content };

export default Container;
