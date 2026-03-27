import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  className?: string;
}>;

export default function Card({ children, className = "" }: Props) {
  return (
    <div
      className={
        "rounded-[32px] border border-white/5 bg-zinc-900/50 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:shadow-primary/5 hover:-translate-y-1 hover:border-white/10 " +
        className
      }
    >
      {children}
    </div>
  );
}
