'use client'
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

interface CustomCursorProps {
    brandName?: string;
    cursorType: string;
}

export function CustomCursor({ brandName, cursorType }: CustomCursorProps) {
    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);
    const ringX = useMotionValue(0);
    const ringY = useMotionValue(0);
    const [mouseDown, setMouseDown] = useState(false);
    const [isClickable, setIsClickable] = useState(false);

    const springConfig = { damping: 30, stiffness: 500, mass: 0.5 };
    const springX = useSpring(ringX, springConfig);
    const springY = useSpring(ringY, springConfig);

    useEffect(() => {
        const mouseMove = (e: MouseEvent) => {
            cursorX.set(e.clientX - 6);
            cursorY.set(e.clientY - 6);
            ringX.set(e.clientX - 6);
            ringY.set(e.clientY - 6);

            const element = e.target as HTMLElement;
            if (element) {
                const tagName = element.tagName.toLowerCase();
                const isClickableElement =
                    tagName === 'a' ||
                    tagName === 'canvas' ||
                    tagName === 'button' ||
                    element.getAttribute('role') === 'button' ||
                    element.getAttribute('data-clickable') !== null;

                const isBrandElement =
                    element.hasAttribute('data-brand') ||
                    element.classList.contains('brand');

                setIsClickable(isClickableElement);
            }
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
    }, [cursorX, cursorY, ringX, ringY]);

    const variants = {
        default: {
            height: 12,
            width: 12,
            backgroundColor: 'black',
            scale: mouseDown ? 0.6 : 1,
        },
        clickable: {
            height: 8,
            width: 8,
            top: 1.5,
            left: 1.5,
            backgroundColor: 'black',
            scale: mouseDown ? 0.6 : 1,
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

    const ringVariants = {
        default: {
            border: '2px solid black',
            backgroundColor: 'transparent',
        },
        clickable: {
            width: 44,
            height: 44,
            top: -17,
            left: -17,
            border: '2px solid black',
        },
        text: {
            backgroundColor: 'rgba(255, 255, 0, 0.3)',
            mixBlendMode: 'difference' as const,
            border: 'none',
        },
        brand: {
            display: 'none',
        },
    };

    return (
        <>
            <motion.div
                className='cursor'
                style={{ x: cursorX, y: cursorY }}
                animate={isClickable ? 'clickable' : cursorType}
                variants={variants}
                transition={{ type: 'spring', stiffness: 600, damping: 30 }}
            >
                {cursorType === "brand" && (
                    <motion.p className="text-sm font-medium">
                        {brandName}
                    </motion.p>
                )}
            </motion.div>
            <motion.div
                className="size-8 pointer-events-none z-[998] fixed -top-[10px] -left-[10px] rounded-full"
                style={{ x: springX, y: springY }}
                animate={isClickable ? 'clickable' : cursorType}
                variants={ringVariants}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
        </>
    );
}
