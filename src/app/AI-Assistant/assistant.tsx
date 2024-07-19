// Assistant.tsx
'use client';
import { AnimatePresence, motion } from "framer-motion";
import { useState, useRef } from "react";
import { LuMic, LuPhoneCall, LuStopCircle } from "react-icons/lu";
import { Visualizer } from "react-sound-visualizer";
import { Messages } from "./messages";

export function Assistant() {
    const [isOpen, setIsOpen] = useState(0)
    const [audioStream, setAudioStream] = useState<MediaStream | null>(null)
    const [isRecording, setIsRecording] = useState<boolean>(false)
    const [transcripts, setTranscripts] = useState<{ text: string; from: string, id: string }[]>([])
    const [AIResponses, setAIResponses] = useState<{ text: string; from: string, id: string }[]>([
        {
            text: `Hi! My name is Bill, Waleed's AI Assistant. How can I help you today?`,
            from: 'AI',
            id: '' + Date.now()
        }
    ])

    const mediaRecorderRef = useRef<MediaRecorder | null>(null)
    const chunksRef = useRef<BlobPart[]>([])

    const startRecording = () => {
        setIsRecording(true)
        navigator.mediaDevices
            .getUserMedia({ audio: true, video: false })
            .then((stream) => {
                setAudioStream(stream)
                const mediaRecorder = new MediaRecorder(stream)
                mediaRecorderRef.current = mediaRecorder

                mediaRecorder.ondataavailable = (event) => {
                    chunksRef.current.push(event.data)
                };

                mediaRecorder.onstop = () => {
                    const blob = new Blob(chunksRef.current, { type: 'audio/wav' })
                    chunksRef.current = []
                    transcribeAudio(blob)
                };

                mediaRecorder.start()
            });
    };

    const stopRecording = () => {
        setIsRecording(false)
        if (audioStream) {
            audioStream.getTracks().forEach((track) => track.stop())
        }
        setAudioStream(null);

        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop()
            mediaRecorderRef.current = null
        }
    };

    const handleToggleRecording = () => {
        if (!isRecording) {
            startRecording()
        } else {
            stopRecording()
        }
    };

    const transcribeAudio = async (audioBlob: Blob) => {
        try {
            const formData = new FormData()
            formData.append('file', audioBlob, 'audio.wav')

            const response = await fetch('/api/transcribeAudio', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Error transcribing audio')
            }

            const data = await response.json()
            const userTranscript = { text: data.text, from: `Human`, id: '' + Date.now() }
            setTranscripts((prevTranscripts) => [...prevTranscripts, userTranscript])
            await GPT(userTranscript.text)
        } catch (error) {
            console.error('Error transcribing audio:', error)
        }
    };

    const GPT = async (text: string) => {
        try {
            const response = await fetch('/api/gpt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
            });

            if (!response.ok) {
                throw new Error('Error generating GPT response')
            }

            const data = await response.json()
            const aiResponse = { text: data.choices[0].message.content, from: `AI`, id: '' + Date.now() }
            setAIResponses((prevResponses) => [...prevResponses, aiResponse])
        } catch (error) {
            console.error('Error generating GPT response:', error)
        }
    };

    return (
        <>
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    transition={{ ease: 'easeInOut', duration: 0.7, delay: 2 }}
                    className="absolute bottom-5 right-5"
                >
                    <button onClick={() => setIsOpen(isOpen + 1)} className="flex gap-1.5 items-center px-2.5 py-1.5 rounded-md font-medium bg-[#F4A261] transition-all duration-200 hover:bg-[#E9C46A]">
                        <LuPhoneCall />
                        Call my AI Assistant
                    </button>
                </motion.div>

                {isOpen % 2 === 1 && (
                    <motion.div
                        key={isOpen}
                        initial={{ opacity: 0, y: -12, filter: 'blur(2px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -12, filter: 'blur(2px)' }}
                        transition={{ ease: 'easeInOut', duration: 0.2 }}
                        className="bg-[#031820]/40 w-screen h-screen absolute top-0 left-0 z-[3] flex items-center justify-center sm:p-6"
                    >
                        <div className="bg-[#FFFFF0]/[94%] max-w-2xl w-full h-full z-[3] sm:rounded-md">
                            <div className="absolute bg-[#FFFFF0] border-b-2 border-black max-w-2xl w-full sm:rounded-t-lg">
                            <div className="flex gap-2 ml-1.5 my-1">
                                <button onClick={() => setIsOpen(isOpen + 1)} className="flex items-center px-2.5 pt-1.5 pb-1 my-1 rounded-md font-medium bg-[#F4A261] transition-all duration-200 hover:bg-[#F4A261]/50 text-nowrap">
                                    End Call
                                </button>
                                <button onClick={handleToggleRecording} className="flex items-center px-1.5 py-1 my-1 rounded-md font-medium bg-[#F4A261] transition-all duration-200 hover:bg-[#F4A261]/50">
                                    {!isRecording ? (<LuMic className="size-5" />) : <LuStopCircle className="size-5 text-red-600 animate-pulse" />}
                                </button>
                                {isRecording && (
                                    <Visualizer audio={audioStream} mode={'continuous'} slices={26} strokeColor='#264653' autoStart={true}>
                                        {({ canvasRef }) => (
                                            <canvas ref={canvasRef} height={100} className="w-full max-w-[200px] sm:max-w-[150px] max-h-[40px] mx-0.5 pr-0.5" />
                                        )}
                                    </Visualizer>
                                )}
                                </div>
                            </div>
                            <Messages humanMessages={transcripts} AIMessages={AIResponses} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
