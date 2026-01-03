import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  className?: string;
}>;

export default function Card({ children, className = "" }: Props) {
  return (
    <div
      className={
        "rounded-2xl border border-black/5 bg-white shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-1 hover:border-black/10 " +
        className
      }
    >
      {children}
    </div>
  );
}
