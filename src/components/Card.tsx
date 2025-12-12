import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  className?: string;
}>;

export default function Card({ children, className = "" }: Props) {
  return (
    <div
      className={
        "rounded-3xl border border-secondary/35 bg-card/85 backdrop-blur shadow-[0_10px_50px_rgba(124,58,237,0.18)] transition duration-200 hover:border-tertiary/45 hover:shadow-[0_10px_70px_rgba(236,72,153,0.2)] hover:-translate-y-0.5 " +
        className
      }
    >
      {children}
    </div>
  );
}
