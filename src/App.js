import "./App.css";
import React, { useEffect, useRef, useState } from "react";
import Music from "./component/Music";
import list from "./component/list.json";
import FormatTime from "./component/main/FormatTime";
function App() {
  const musicList = JSON.parse(list);
  const [songs, setSongs] = useState(musicList);
  const [isplaying, setIsplaying] = useState(false);
  const [current, setCurrent] = useState(musicList[0]);
  const [property, setProperty] = useState({
    width: "0%",
    ct: "00:00",
    duration: "00:00",
  });
  const audioElement = useRef();
  useEffect(() => {
    if (isplaying) {
      
        audioElement.current.play();
    } else {
      audioElement.current.pause();
    }
  }, [isplaying, current]);

  const timeUpdate = () => {
    const duration = audioElement.current.duration;
    const ct = audioElement.current.currentTime;
    setProperty({
      duration: FormatTime(duration),
      ct: FormatTime(ct),
      width: (ct / duration) * 100 + "%",
    });
  };
  const audioEnd = ()=>{
    const index = songs.findIndex(x=> x.mp3 === current.mp3)
 
    if(index === (songs.length-1)){
      setCurrent(songs[0])
    }else{
      setCurrent(songs[index + 1])
    }
  }
  return (
    <div className="App">
      <audio
        src={current.mp3}
        ref={audioElement}
        onTimeUpdate={timeUpdate}
        onEnded={audioEnd}
      ></audio>
      <Music
        songs={songs}
        setSongs={setSongs}
        isplaying={isplaying}
        setIsplaying={setIsplaying}
        audioElement={audioElement}
        current={current}
        property={property}
        setCurrent={setCurrent}
      />
    </div>
  );
}

export default App;
