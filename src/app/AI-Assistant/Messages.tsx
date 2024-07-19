import { cn } from "@/lib/utils";

export function Messages({ humanMessages }: { humanMessages: { text: string; from: string; id: string }[] }) {
    // Example AI messages array
    const AIMessages: { text: string; from: string; id: string }[] = [{ text: 'hi', from: 'AI', id: '' + Date.now() }];

    // Combine human and AI messages
    const combinedMessages = [...humanMessages, ...AIMessages];

    // Sort messages by id (chronological order)
    combinedMessages.sort((a, b) => parseInt(a.id) - parseInt(b.id));

    return (
        <div className="p-3 mx-auto max-w-5xl">
            {combinedMessages.length > 0 && (
                <div className="space-y-2">
                    {combinedMessages.map(({ text, from, id }) => (
                        <p
                            key={id}
                            className={cn(
                                {
                                    "ml-auto": from === 'Human',
                                    "mr-auto": from !== 'Human'
                                },
                                "p-4 rounded-md bg-[#F4A261] w-3/4"
                            )}
                        >
                            <p className="text-xs">{from}</p>
                            {text}
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
}
