import { useState, useEffect, useRef } from "react";
import { BsFillPlayFill } from "react-icons/bs";
import SoundReactor from "../Classes/SoundReactor";
import { addEffect } from "@react-three/fiber";

const PlayButton = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const spanRefs = useRef<Array<HTMLSpanElement | null>>([]);

  const offsetMusic = 15;

  const playMusic = () => {
    if (!SoundReactor.isInitialized) {
      SoundReactor.init();
    }
    SoundReactor.play();
    setIsPlaying(true);
  };

  const pauseMusic = () => {
    SoundReactor.pause();
    setIsPlaying(false);
  };

  const onClickButtonHandler = () => {
    if (SoundReactor.playFlag) {
      pauseMusic();
    } else {
      playMusic();
    }
  };

  useEffect(() => {
    const unsubscribeEffect = addEffect(() => {
      spanRefs.current.forEach((span, index) => {
        if (span != null && SoundReactor.fdata != null) {
          span.style.transform = `scaleY(${
            SoundReactor.fdata[index * offsetMusic] / 255 + 0.1
          })`;
        }
      });
    });

    return () => {
      unsubscribeEffect();
    };
  }, []);

  return (
    <button className="btn-play" onClick={onClickButtonHandler}>
      Play <BsFillPlayFill className="btn-icon" size="1.75rem" />
      <div className={`sound-wave-container ${isPlaying ? "" : "hide"}`}>
        <span ref={(element) => (spanRefs.current[0] = element)}></span>
        <span ref={(element) => (spanRefs.current[1] = element)}></span>
        <span ref={(element) => (spanRefs.current[2] = element)}></span>
        <span ref={(element) => (spanRefs.current[3] = element)}></span>
        <span ref={(element) => (spanRefs.current[4] = element)}></span>
        <span ref={(element) => (spanRefs.current[5] = element)}></span>
        <span ref={(element) => (spanRefs.current[6] = element)}></span>
        <span ref={(element) => (spanRefs.current[7] = element)}></span>
        <span ref={(element) => (spanRefs.current[8] = element)}></span>
        <span ref={(element) => (spanRefs.current[9] = element)}></span>
        <span ref={(element) => (spanRefs.current[10] = element)}></span>
      </div>
    </button>
  );
};

export default PlayButton;
