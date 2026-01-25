
import { cn } from "@/lib/utils";

type Props = {
    status?: 'premium' | 'robot';
    className?: string;
    showLabel?: boolean;
};

export default function AudioStatusBadge({ status, className, showLabel = true }: Props) {
    if (status !== 'premium' && status !== 'robot') return null;

    return (
        <div 
           className={cn(`
               flex items-center gap-1.5 px-2 py-1.5 rounded-full text-xs font-bold border select-none
               ${status === 'premium' 
                   ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                   : 'bg-amber-50 text-amber-700 border-amber-200'
               }
           `, className)}
           title={status === 'premium' ? "Community Sponsored Audio" : "Robot Voice (Needs Sponsor)"}
        >
            <span>{status === 'premium' ? "💎" : "🤖"}</span>
            {showLabel && (
                <span className="hidden sm:inline">
                    {status === 'premium' ? "Premium" : "Robot"}
                </span>
            )}
        </div>
    );
}
