import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
    try {
        console.log('Received request');
        const { text } = await req.json();
        console.log('Text to synthesize:', text);

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

        console.log('Google TTS API response status:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Google TTS API response text:', errorText);
            throw new Error('Error generating GoogleTTS response');
        }

        const data = await response.json();
        console.log('Google TTS API response data:', data);

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error generating audio:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
};
