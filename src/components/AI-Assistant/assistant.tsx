'use client';
import { AnimatePresence, motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { LuMic, LuPhoneCall, LuStopCircle } from "react-icons/lu";
import { Visualizer } from "react-sound-visualizer";
import { Messages } from "./messages";
import { HiMiniSpeakerWave } from "react-icons/hi2";

export function Assistant() {
    const [isOpen, setIsOpen] = useState(0)
    const [audioStream, setAudioStream] = useState<MediaStream | null>(null)
    const [isRecording, setIsRecording] = useState<boolean>(false)
    const [transcripts, setTranscripts] = useState<{ text: string; from: string; id: number; hasAnimated?: boolean }[]>([])
    const [AIResponses, setAIResponses] = useState<{ text: string; from: string; id: number; hasAnimated?: boolean }[]>([
        {
            text: `Hi! My name is Bill, Waleed's AI Assistant. How can I help you today?`,
            from: 'AI',
            id: 0,
            hasAnimated: true,
        }
    ]);
    const [AITalking, setAITalking] = useState(false)
    const [responseProcessing, setResponseProcessing] = useState(false)

    const mediaRecorderRef = useRef<MediaRecorder | null>(null)
    const chunksRef = useRef<BlobPart[]>([])
    const messageCountRef = useRef<number>(1)
    const audioRef = useRef<HTMLAudioElement | null>(null)

    useEffect(() => {
        if (isOpen % 2 === 1) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }

        return () => {
            document.body.style.overflow = 'auto'
        };
    }, [isOpen])

    const startRecording = () => {
        setIsRecording(true)
        navigator.mediaDevices
            .getUserMedia({ audio: true, video: false })
            .then((stream) => {
                setAudioStream(stream);
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
        setResponseProcessing(true);
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
            const currentMessageCount = messageCountRef.current;

            setTranscripts((prevTranscripts) =>
                prevTranscripts.filter((transcript) => transcript.from !== 'Human' || transcript.hasAnimated)
            );
    
            setTranscripts((prevTranscripts) => [
                ...prevTranscripts,
                { text: 'Loading', from: 'Human', id: currentMessageCount },
            ]);
    
            messageCountRef.current += 1;
    
            const formData = new FormData();
            formData.append('file', audioBlob, 'audio.wav');
    
            const response = await fetch('/api/transcribeAudio', {
                method: 'POST',
                body: formData,
            });
    
            if (!response.ok) {
                throw new Error('Error transcribing audio');
            }
    
            const data = await response.json();
            updateMessage(data.text, 'Human', currentMessageCount);
            await GPT(data.text);
        } catch (error) {
            console.error('Error transcribing audio:', error);
        }
    };
    

    const GPT = async (text: string) => {
        try {
            const currentMessageCount = messageCountRef.current
            setAIResponses((prevResponses) => [
                ...prevResponses,
                { text: 'Loading', from: 'AI', id: currentMessageCount },
            ]);
            messageCountRef.current += 1

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
            updateMessage(data.choices[0].message.content, 'AI', currentMessageCount)
            await playTTSAudio(data.choices[0].message.content);
        } catch (error) {
            console.error('Error generating GPT response:', error)
        }
    };

    const playTTSAudio = async (text: string) => {
        try {
            const response = await fetch('/api/googleTTS', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
            });

            if (!response.ok) {
                throw new Error('Error generating GoogleTTS response!')
            }

            const data = await response.json();
            const audioSrc = `data:audio/mp3;base64,${data.audioContent}`
            const audio = new Audio(audioSrc)
            audioRef.current = audio
            audio.play()
            setAITalking(true)
            audio.onended = () => { setAITalking(false); setResponseProcessing(false); }
        } catch (error) {
            console.error('Error generating GoogleTTS response:', error)
        }
    };

    const updateMessage = (newText: string, from: string, id: number) => {
        if (from === 'Human') {
            setTranscripts((prevTranscripts) =>
                prevTranscripts.map((transcript) =>
                    transcript.id === id ? { ...transcript, text: newText, hasAnimated: true } : transcript
                )
            );
        } else if (from === 'AI') {
            setAIResponses((prevResponses) =>
                prevResponses.map((response) =>
                    response.id === id ? { ...response, text: newText, hasAnimated: true } : response
                )
            );
        }
    };

    const endCall = () => {
        setIsOpen(isOpen + 1)
        mediaRecorderRef.current = null
        chunksRef.current = []
        messageCountRef.current = 1
        setAudioStream(null)
        setIsRecording(false)
        setResponseProcessing(false)
        setAITalking(false)
        setTranscripts([])
        setAIResponses([
            {
                text: `Hi! My name is Bill, Waleed's AI Assistant. How can I help you today?`,
                from: 'AI',
                id: 0,
                hasAnimated: true,
            }
        ])
        if (audioRef.current) {
            audioRef.current.pause()
            audioRef.current = null
        }
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, filter: 'blur(8px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ ease: 'easeInOut', duration: 1, type: "spring", stiffness: 200 }}
                className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-[9]"
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
                    className="bg-[#031820]/40 w-screen h-[100dvh] fixed top-0 left-0 z-[21] flex items-center justify-center md:p-6 lg:hidden"
                >
                    <div className="bg-[#FFFFF0] md:max-w-2xl w-full h-full z-[21] md:rounded-md">
                        <div className="fixed bg-[#FFFFF2] border-b-2 border-black md:max-w-2xl w-full sm:rounded-t-lg">
                            <div className="flex gap-2 ml-1.5 my-1">
                                <button onClick={endCall} className="flex items-center px-2.5 pt-1.5 pb-1 my-1 rounded-md font-medium bg-[#F4A261] transition-all duration-200 hover:bg-[#F4A261]/70 text-nowrap">
                                    End Call
                                </button>
                                <button onClick={handleToggleRecording} disabled={responseProcessing} className="flex items-center px-1.5 py-1 my-1 rounded-md font-medium bg-[#F4A261] transition-all duration-200 hover:bg-[#F4A261]/70 disabled:bg-[#F4A261]/50 disabled:cursor-not-allowed">
                                    {!isRecording ? (<LuMic className="size-5" />) : <LuStopCircle className="size-5 text-red-600 animate-pulse" />}
                                </button>
                                {isRecording && audioStream && <Visualizer audio={audioStream} mode={'continuous'} slices={26} strokeColor='#264653' autoStart={true}>
                                        {({ canvasRef }) => (
                                            <canvas ref={canvasRef} height={100} className="w-full max-w-[200px] sm:max-w-[150px] max-h-[40px] mx-0.5 pr-0.5" />
                                        )}
                                    </Visualizer>}
                                {AITalking && (
                                    <div className="flex items-center px-2.5 pt-1.5 pb-1 my-1 rounded-md text-sm font-medium bg-[#F4A261]/50 transition-all duration-200 text-nowrap animate-pulse">
                                        <HiMiniSpeakerWave className="mr-1" />
                                        Talking
                                    </div>
                                )}
                            </div>
                        </div>
                        <Messages humanMessages={transcripts} AIMessages={AIResponses} />
                    </div>
                </motion.div>
            )}

            {isOpen % 2 === 1 && (
                <motion.div
                key={isOpen}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ ease: 'easeInOut', duration: 0.2 }}
                className="hidden lg:block fixed bg-[#FFFFF2] bottom-0 right-5 border-2 border-b-0 border-black min-h-96 max-w-sm w-full rounded-t-lg z-[21]"
            >
                    <div className="fixed bg-[#FFFFF2] border-b-2 border-black md:max-w-2xl w-full sm:rounded-t-lg">
                        <div className="flex gap-2 ml-1.5 my-1">
                            <button onClick={endCall} className="flex items-center px-2.5 pt-1.5 pb-1 my-1 rounded-md font-medium bg-[#F4A261] transition-all duration-200 hover:bg-[#F4A261]/70 text-nowrap">
                                End Call
                            </button>
                            <button onClick={handleToggleRecording} disabled={responseProcessing} className="flex items-center px-1.5 py-1 my-1 rounded-md font-medium bg-[#F4A261] transition-all duration-200 hover:bg-[#F4A261]/70 disabled:bg-[#F4A261]/50 disabled:cursor-not-allowed">
                                {!isRecording ? (<LuMic className="size-5" />) : <LuStopCircle className="size-5 text-red-600 animate-pulse" />}
                            </button>
                            {isRecording && audioStream && <Visualizer audio={audioStream} mode={'continuous'} slices={26} strokeColor='#264653' autoStart={true}>
                                    {({ canvasRef }) => (
                                        <canvas ref={canvasRef} height={100} className="w-full max-w-[200px] sm:max-w-[150px] max-h-[40px] mx-0.5 pr-0.5" />
                                    )}
                                </Visualizer>}
                            {AITalking && (
                                <div className="flex items-center px-2.5 pt-1.5 pb-1 my-1 rounded-md text-sm font-medium bg-[#F4A261]/50 transition-all duration-200 text-nowrap animate-pulse">
                                    <HiMiniSpeakerWave className="mr-1" />
                                    Talking
                                </div>
                            )}
                        </div>
                    </div>
                    <Messages humanMessages={transcripts} AIMessages={AIResponses} />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
