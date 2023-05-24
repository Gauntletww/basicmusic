import React, { useRef} from "react";
export default function Music({
  isplaying,
  setIsplaying,
  current,
  property,
  audioElement,
  songs,
  setCurrent
}) {
  const Cwidth = useRef();
  const play_pause = () => {
    setIsplaying(!isplaying);
  };
  const checkWidth = (event) => {
    const clientWidth = Cwidth.current.clientWidth;
    const offset = event.nativeEvent.offsetX;
    const divProgress = (offset / clientWidth) * 100;
    audioElement.current.currentTime =
      (divProgress / 100) * audioElement.current.duration;
    if (!isplaying) {
      setIsplaying(!isplaying);
    }
  };
  const playNext = ()=>{
    const index = songs.findIndex(x=> x.mp3 === current.mp3)
    console.log(index);
    if(index === (songs.length-1)){
      setCurrent(songs[0])
    }else{
      setCurrent(songs[index + 1])
    }
  
  }
  const playPrev = ()=>{
    const index = songs.findIndex(x=> x.mp3 === current.mp3)
    console.log(index);
    if(index === 0){
      setCurrent(songs[songs.length - 1])
    }else{
      setCurrent(songs[index - 1])
    }
  
  }

  return (
    <div className="music_bar">
      <div className="music_img">
        {<img src={current.img} alt="Music_image" />}
      </div>
      <div className="music_main">
        <div className="bar">
          <span id="elapsed_time">{property.ct}</span>
          <div className="music_progress" onClick={checkWidth} ref={Cwidth}>
            <div className="progress" style={{ width: property.width }}></div>
          </div>
          <span id="Total_duration">{property.duration==="0NaN:NaN"?"00:00":property.duration}</span>
        </div>
        <div className="music_control">
          <div className="prev" onClick={playPrev}>
            <i className="fa-solid fa-circle-left"></i>
          </div>
          <div className="pause_play" onClick={play_pause}>
            <i
              className={`fa-solid fa-circle-${isplaying ? "pause" : "play"}`}
            ></i>
          </div>
          <div className="next" onClick={playNext}>
            <i className="fa-solid fa-circle-right"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
