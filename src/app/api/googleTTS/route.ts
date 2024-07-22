import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
    try {
        const { text } = await req.json();

        const response = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                audioConfig: {
                    audioEncoding: "MP3",
                    pitch: 0,
                    speakingRate: 1
                },
                input: {
                    text: text
                },
                voice: {
                    languageCode: "en-US",
                    name: "en-US-Casual-K"
                }
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error('Error generating GoogleTTS response' + errorText);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error generating audio:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
};
