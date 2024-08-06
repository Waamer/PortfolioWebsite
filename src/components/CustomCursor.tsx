'use client'
import { motion, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";

interface CustomCursorProps {
    brandName?: string;
    cursorType: string;
}

export function CustomCursor({ brandName, cursorType }: CustomCursorProps) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const [mouseDown, setMouseDown] = useState(false);

    useEffect(() => {
        const mouseMove = (e: { clientX: number; clientY: number }) => {
            x.set(e.clientX - 6);
            y.set(e.clientY - 6);
        };

        const handleMouseDown = () => setMouseDown(true);
        const handleMouseUp = () => setMouseDown(false);

        window.addEventListener('mousemove', mouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', mouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [x, y]);

    const variants = {
        default: {
            height: 12,
            width: 12,
            backgroundColor: 'black',
            scale: mouseDown ? 0.5 : 1,
        },
        text: {
            height: 150,
            width: 200,
            backgroundColor: 'yellow',
            mixBlendMode: 'difference' as const,
            borderRadius: '8%',
            top: -60,
            left: -90,
        },
        brand: {
            height: 24,
            width: 110,
            backgroundColor: '#F4A261',
            borderRadius: '4%',
            color: 'black',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            top: -5,
            left: -40,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            scale: mouseDown ? 0.8 : 1,
        },
    };

    return (
        <motion.div
            className='cursor'
            style={{ x, y }}
            animate={cursorType}
            variants={variants}
            transition={{ type: 'spring', stiffness: 600, damping: 30 }}
        >
            {cursorType === "brand" && (
                <motion.p className="text-sm font-medium">
                    {brandName}
                </motion.p>
            )}
        </motion.div>
    );
}
