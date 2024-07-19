import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { LuLoader, LuLoader2 } from "react-icons/lu";

export function Messages({ humanMessages, AIMessages }:
{
    humanMessages: { text: string; from: string; id: number }[],
    AIMessages: { text: string; from: string; id: number }[]
}) {

    // Combine human and AI messages
    const combinedMessages = [...humanMessages, ...AIMessages];

    // Sort messages by id (chronological order)
    combinedMessages.sort((a, b) => (a.id) - (b.id));

    return (
        <div className="p-3 pt-16 mx-auto max-w-5xl max-h-full overflow-y-scroll">
            <AnimatePresence>
                {combinedMessages.length > 0 && (
                    <div className="space-y-2">
                        {combinedMessages.map(({ text, from, id }) => (
                            <motion.div
                                key={id + text}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ ease: 'easeInOut', duration: 0.3 }}
                                className={cn(
                                    {
                                        "ml-auto": from === 'Human',
                                        "mr-auto": from !== 'Human'
                                    },
                                    "p-4 rounded-md bg-[#F4A261] w-3/4"
                                )}
                            >
                                <p className="text-xs">{from}</p>
                                {text === 'Loading' ? 
                                        <LuLoader2 className="animate-spin mt-1 size-5" />
                                    :
                                        <p>{text}</p>
                                }
                            </motion.div>
                        ))}
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
