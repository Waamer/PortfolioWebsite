import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { LuLoader, LuLoader2 } from "react-icons/lu";

export function Messages({ humanMessages, AIMessages }:
{
    humanMessages: { text: string; from: string; id: number, hasAnimated?: boolean }[],
    AIMessages: { text: string; from: string; id: number, hasAnimated?: boolean }[]
}) {
    // Combine human and AI messages
    const combinedMessages = [...humanMessages, ...AIMessages];

    // Sort messages by id (chronological order)
    combinedMessages.sort((a, b) => (a.id) - (b.id));

    return (
        <div className="p-3 pt-16 mx-auto max-w-5xl max-h-full overflow-y-auto">
            <AnimatePresence>
                {combinedMessages.length > 0 && (
                    <div className="space-y-2">
                        {combinedMessages.map(({ text, from, id, hasAnimated = false }) => (
                            <motion.div
                                key={id + text}
                                initial={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ ease: 'easeInOut', duration: 0.3 }}
                                className={cn(
                                    {
                                        "ml-auto": from === 'Human',
                                        "mr-auto": from !== 'Human'
                                    },
                                    "p-4 rounded-md bg-[#F4A261] w-3/4"
                                )}
                            >
                                <p className="text-[13px]">{from}</p>
                                {from === 'Human' ? (
                                    <motion.p
                                        initial={{ opacity: 0, y: 0 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ ease: 'easeInOut', duration: 0.3 }}
                                        className="leading-tight"
                                    >
                                        {text === 'Loading' ? (<LuLoader2 className="animate-spin mt-1 size-5" />) : text}
                                    </motion.p>
                                ) : (
                                    text === 'Loading' ? 
                                    <LuLoader2 className="animate-spin mt-1 size-5" />
                                    :
                                    <motion.p
                                        initial={{ opacity: 0, y: 0 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ ease: 'easeInOut', duration: 0.3 }}
                                        className="leading-tight"
                                    >
                                        {text}
                                    </motion.p>
                                )}
                            </motion.div>
                        ))}
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

