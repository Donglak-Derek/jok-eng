import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  className?: string;
}>;

export default function Card({ children, className = "" }: Props) {
  return (
    <div
      className={
        "rounded-2xl shadow-md border border-black/5 dark:border-white/10 bg-[color:var(--card-bg)] " +
        "" +
        className
      }
    >
      {children}
    </div>
  );
}
