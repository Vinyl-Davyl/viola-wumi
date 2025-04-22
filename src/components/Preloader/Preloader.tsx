import S from "./Preloader.module.scss";
import Alphabets from "../Alphabets/Alphabets";
import React, { useEffect, useRef, useState } from "react";
import useRefArray from "../../hooks/useRefArray";
import FadeOutAnimation from "../../animations/fade-out";
import AlphabetsAnimation from "../../animations/alphabets";
import PreloaderAnimation from "../../animations/preloader";
import gsap from "gsap";

type PreloaderProps = {
  windowWidth: number;
  setPreloaded: React.Dispatch<React.SetStateAction<boolean>>;
};

const DECORATION_COUNT = 8;
const SPIKE_COUNT = 200;

const Preloader: React.FC<PreloaderProps> = ({ windowWidth, setPreloaded }) => {
  const wordRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRefArray<HTMLDivElement>(9);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const preloaderContainerRef = useRef<HTMLElement>(null);
  const magneticFluidRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const letterGlowRefs = useRefArray<HTMLDivElement>(9);
  const spikeRefs = useRefArray<HTMLDivElement>(SPIKE_COUNT);
  const decorationRefs = useRefArray<HTMLDivElement>(DECORATION_COUNT);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const animationFrameRef = useRef<number>(0);

  const decorations = Array.from({ length: DECORATION_COUNT }).map((_, index) => {
    const isCircle = index % 2 === 0;
    const size = isCircle ? Math.random() * 80 + 20 : Math.random() * 100 + 50;
    const posX = Math.random() * 80 + 10;
    const posY = Math.random() * 80 + 10;

    return (
      <div
        key={`decoration-${index}`}
        ref={decorationRefs[index]}
        className={isCircle ? S.decorationCircle : S.decorationLine}
        style={{
          width: isCircle ? size : size,
          height: isCircle ? size : "1px",
          left: `${posX}%`,
          top: `${posY}%`,
          opacity: Math.random() * 0.5 + 0.1,
        }}
      />
    );
  });

  const fluidSpikes = Array.from({ length: SPIKE_COUNT }).map((_, index) => {
    const width = Math.random() * 10 + 5;
    const height = Math.random() * 40 + 20;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;

    return (
      <div
        key={`spike-${index}`}
        ref={spikeRefs[index]}
        className={S.fluidSpike}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          left: `${posX}%`,
          top: `${posY}%`,
        }}
      />
    );
  });

  useEffect(() => {
    if (!canvasRef.current || !preloaderRef.current) return;

    const updateCanvasSize = () => {
      if (!canvasRef.current || !preloaderRef.current) return;

      const canvas = canvasRef.current;
      const container = preloaderRef.current as HTMLElement;

      const width = container.clientWidth;
      const height = container.clientHeight;

      canvas.width = width;
      canvas.height = height;

      setCanvasSize({ width, height });
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (letterRefs.length === 0) return;

    decorationRefs.forEach((ref, index) => {
      if (!ref.current) return;

      const isCircle = index % 2 === 0;
      const delay = Math.random() * 0.5;
      const duration = Math.random() * 0.5 + 0.5;

      gsap.to(ref.current, {
        delay,
        duration,
        transform: isCircle ? "scale(1)" : "scaleX(1)",
        ease: "power2.out",
      });
    });

    gsap.to(canvasRef.current, {
      opacity: 1,
      duration: 1,
      delay: 1,
    });

    const preload = () => {
      const preloaderDuration = PreloaderAnimation([preloaderRef.current, wordRef.current]);

      gsap.to(`.${S.and}`, {
        rotate: 360,
        duration: 8,
        repeat: -1,
        ease: "linear",
      });

      const tl = gsap.timeline({
        delay: preloaderDuration + 0.5,
      });

      letterGlowRefs.forEach((ref, index) => {
        if (!ref.current) return;

        tl.to(
          ref.current,
          {
            opacity: 0.8,
            duration: 0.5,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1,
            repeatDelay: Math.random() * 0.5,
          },
          preloaderDuration + 0.5 + index * 0.1
        );
      });

      const animateSpikes = () => {
        if (!letterRefs || letterRefs.length === 0) return;

        spikeRefs.forEach((spikeRef, index) => {
          if (!spikeRef.current) return;

          const randomLetterIndex = Math.floor(Math.random() * letterRefs.length);
          const letterElement = letterRefs[randomLetterIndex].current;

          if (!letterElement) return;

          const letterRect = letterElement.getBoundingClientRect();
          const preloaderRect = preloaderRef.current
            ? (preloaderRef.current as HTMLElement).getBoundingClientRect()
            : null;

          if (!preloaderRect) return;

          const relX = letterRect.left - preloaderRect.left + letterRect.width / 2;
          const relY = letterRect.top - preloaderRect.top + letterRect.height / 2;

          const spikeElement = spikeRef.current;
          const angle = Math.atan2(
            relY - parseFloat(spikeElement.style.top),
            relX - parseFloat(spikeElement.style.left)
          );

          gsap.to(spikeElement, {
            x: relX - parseFloat(spikeElement.style.left),
            y: relY - parseFloat(spikeElement.style.top),
            scaleY: 1,
            duration: Math.random() * 1 + 0.5,
            ease: "elastic.out(1, 0.3)",
            rotation: angle * (180 / Math.PI),
            delay: Math.random() * 0.3,
            onComplete: () => {
              gsap.to(spikeElement, {
                scaleY: 0,
                duration: Math.random() * 0.5 + 0.2,
                ease: "power2.in",
                onComplete: () => {
                  const newPosX = Math.random() * 100;
                  const newPosY = Math.random() * 100;
                  gsap.set(spikeElement, {
                    left: `${newPosX}%`,
                    top: `${newPosY}%`,
                    x: 0,
                    y: 0,
                    rotation: 0,
                  });
                },
              });
            },
          });
        });
      };

      setTimeout(() => {
        animateSpikes();
        setInterval(animateSpikes, 2000);
      }, preloaderDuration * 1000 + 1000);

      let alphabetsDuration: number | undefined;
      letterRefs &&
        letterRefs.forEach((ref) => {
          alphabetsDuration = AlphabetsAnimation(
            preloaderDuration,
            ref.current,
            ref.current.getAttribute("data-letter")!,
            ref.current.getAttribute("data-index")!,
            windowWidth
          );
        });

      if (!!alphabetsDuration) {
        FadeOutAnimation(alphabetsDuration + preloaderDuration, preloaderContainerRef.current, () =>
          setPreloaded(true)
        );
      }
    };

    setTimeout(() => {
      preload();
    }, 1500);
  }, [letterRefs, windowWidth]);

  return (
    <section ref={preloaderContainerRef} className={S.preloaderContainer}>
      {decorations}
      <div ref={preloaderRef} className={S.preloader}>
        <div className={S.magneticFluidContainer}>
          <div ref={magneticFluidRef} className={S.magneticFluid}></div>
          {fluidSpikes}
          <canvas ref={canvasRef} className={S.magneticFluidCanvas} />
        </div>

        <div ref={wordRef} className={S.word}>
          <div className={S.viola}>
            <div className={S.letter}>
              <div ref={letterGlowRefs[0]} className={S.letterGlow}></div>
              <Alphabets dataIndex={1} letterIndex={22} ref={letterRefs[0]} />
            </div>
            <div className={S.letter}>
              <div ref={letterGlowRefs[1]} className={S.letterGlow}></div>
              <Alphabets dataIndex={2} letterIndex={9} ref={letterRefs[1]} />
            </div>
            <div className={S.letter}>
              <div ref={letterGlowRefs[2]} className={S.letterGlow}></div>
              <Alphabets dataIndex={3} letterIndex={15} ref={letterRefs[2]} />
            </div>
            <div className={S.letter}>
              <div ref={letterGlowRefs[3]} className={S.letterGlow}></div>
              <Alphabets dataIndex={4} letterIndex={12} ref={letterRefs[3]} />
            </div>
            <div className={S.letter}>
              <div ref={letterGlowRefs[4]} className={S.letterGlow}></div>
              <Alphabets dataIndex={5} letterIndex={1} ref={letterRefs[4]} />
            </div>
          </div>
          <p className={S.and}>✿</p>
          <div className={S.wumi}>
            <div className={S.letter}>
              <div ref={letterGlowRefs[5]} className={S.letterGlow}></div>
              <Alphabets dataIndex={6} letterIndex={23} ref={letterRefs[5]} />
            </div>
            <div className={S.letter}>
              <div ref={letterGlowRefs[6]} className={S.letterGlow}></div>
              <Alphabets dataIndex={7} letterIndex={21} ref={letterRefs[6]} />
            </div>
            <div className={S.letter}>
              <div ref={letterGlowRefs[7]} className={S.letterGlow}></div>
              <Alphabets dataIndex={8} letterIndex={13} ref={letterRefs[7]} />
            </div>
            <div className={S.letter}>
              <div ref={letterGlowRefs[8]} className={S.letterGlow}></div>
              <Alphabets dataIndex={9} letterIndex={9} ref={letterRefs[8]} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Preloader;
