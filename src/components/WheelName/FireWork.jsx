import React, { useEffect } from "react";
import clapMP3 from "../../assets/audio/clap.mp3";
import {
  FireWorkStyle,
  FireWorkNameSelect,
  ButtonCloseFireWork,
} from "./FireWork.style";
const clapAudio = new Audio(clapMP3);
clapAudio.loop = false;

const FireWork = ({ nameSelect, setNameSelect, wheelAudio }) => {
  useEffect(() => {
    clapAudio.currentTime = 0;
    clapAudio.play();
    wheelAudio.pause();
    return () => {
      clapAudio.pause();
    };
  }, [wheelAudio]);

  return (
    <FireWorkStyle>
      <FireWorkNameSelect>
        <span>{nameSelect}</span>
        <ButtonCloseFireWork
          onClick={() => {
            setNameSelect(null);
            clapAudio.pause();
          }}
        >
          Close
        </ButtonCloseFireWork>
      </FireWorkNameSelect>
      <div className="pyro">
        <div className="before"></div>
        <div className="after"></div>
      </div>
    </FireWorkStyle>
  );
};

export default FireWork;
