"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/Button";
import { ChevronRight } from "lucide-react";

type Props = {
  conversation: {
    speakerA: string;
    speakerB: string;
    textA: string;
    textB: string;
    contextNote?: string;
  };
  onNext: () => void;
};

export default function ContextConversation({ conversation, onNext }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="w-full flex flex-col gap-6"
    >
      <div className="bg-white rounded-lg border border-border shadow-sm p-6 md:p-8 flex flex-col gap-6">
        <div className="text-center space-y-2 border-b border-border pb-4">
          <h3 className="text-xl font-bold text-foreground">In Action</h3>
          <p className="text-muted-foreground text-sm">See how this signal appears in real life.</p>
        </div>

        <div className="flex flex-col gap-4">
          {/* Speaker A */}
          <div className="flex flex-col items-start gap-1 max-w-[85%]">
             <span className="text-xs font-bold text-muted-foreground ml-1">{conversation.speakerA}</span>
             <div className="bg-secondary p-4 rounded-2xl rounded-tl-sm text-foreground text-lg leading-relaxed shadow-sm">
                &quot;{conversation.textA}&quot;
             </div>
          </div>

          {/* Speaker B */}
          <div className="flex flex-col items-end gap-1 max-w-[85%] self-end">
             <span className="text-xs font-bold text-muted-foreground mr-1">{conversation.speakerB}</span>
             <div className="bg-primary/10 border border-primary/20 p-4 rounded-2xl rounded-tr-sm text-foreground text-lg leading-relaxed shadow-sm">
                &quot;{conversation.textB}&quot;
             </div>
          </div>
        </div>

        {conversation.contextNote && (
            <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-lg mt-2">
                <p className="text-sm text-yellow-800 italic text-center">
                    💡 {conversation.contextNote}
                </p>
            </div>
        )}

      </div>

      <div className="flex justify-end">
        <Button
            variant="primary"
            size="lg"
            onClick={onNext}
            rightIcon={<ChevronRight className="w-4 h-4" />}
            className="w-full md:w-auto"
        >
            Next Signal
        </Button>
      </div>
    </motion.div>
  );
}
