// app/api/transcribeAudio/route.ts
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
    try {
        const formData = await req.formData();
        const audioBlob = formData.get('file');
        if (!audioBlob) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        formData.append('model', 'whisper-1')

        const whisperResponse = await fetch('https://api.openai.com/v1/audio/transcriptions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
            },
            body: formData,
        });

        if (!whisperResponse.ok) {
            const errorText = await whisperResponse.text();
            console.error('Error response from Whisper API:', errorText);
            return NextResponse.json({ error: 'Error transcribing audio', details: errorText }, { status: whisperResponse.status });
        }

        const data = await whisperResponse.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error transcribing audio:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
};
