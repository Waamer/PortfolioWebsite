import { NextResponse } from 'next/server';
import { GPTRole } from '@/components/AI-Assistant/GPTrole'

export const POST = async (req: Request) => {
    try {
        const { text } = await req.json();

        const gptResponse = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [
                    { role: 'system', content: GPTRole },
                    { role: 'user', content: text }
                ],
            }),
        });

        if (!gptResponse.ok) {
            throw new Error('Error generating GPT response');
        }

        const data = await gptResponse.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error generating GPT response:', error);
        return NextResponse.json({ error: 'Error generating GPT response' }, { status: 500 });
    }
};
