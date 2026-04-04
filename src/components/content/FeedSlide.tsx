"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface FeedSlideProps {
    children: (isActive: boolean) => React.ReactNode;
}

export default function FeedSlide({ children }: FeedSlideProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { margin: "-45% 0px -45% 0px", once: false });
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        setIsActive(isInView);
    }, [isInView]);

    return (
        <div
            ref={ref}
            className="w-full h-full embla__slide relative flex flex-col snap-center max-h-[100dvh]"
        >
            {/* The render prop allows the child component (like a Video Player) to know if it should be playing */}
            {children(isActive)}
        </div>
    );
}
