
import React, { useContext, useEffect } from "react";
import { MusicContext } from "../Context";

function Card({ element }) {
  const musicContext = useContext(MusicContext);
  const likedMusic = musicContext.likedMusic || []; // Handle null case
  const setlikedMusic = musicContext.setLikedMusic;
  const pinnedMusic = musicContext.pinnedMusic || []; // Handle null case
  const setpinnedMusic = musicContext.setPinnedMusic;

  const handlePin = () => {
    let pinnedMusic = localStorage.getItem("pinnedMusic");
    pinnedMusic = JSON.parse(pinnedMusic) || []; // Handle null case
    let updatedPinnedMusic = [];
    if (pinnedMusic.some((item) => item.id === element.id)) {
      updatedPinnedMusic = pinnedMusic.filter((item) => item.id !== element.id);
      setpinnedMusic(updatedPinnedMusic);
      localStorage.setItem("pinnedMusic", JSON.stringify(updatedPinnedMusic));
    } else {
      if (pinnedMusic.length >= 4) {
        // Handle your logic for maximum pinned music limit here
      }
      updatedPinnedMusic = pinnedMusic;
      updatedPinnedMusic.push(element);
      setpinnedMusic(updatedPinnedMusic);
      localStorage.setItem("pinnedMusic", JSON.stringify(updatedPinnedMusic));
    }
  };

  const handleLike = () => {
    let likedMusic = localStorage.getItem("likedMusic");
    likedMusic = JSON.parse(likedMusic) || []; // Handle null case
    let updatedLikedMusic = [];
    if (likedMusic.some((item) => item.id === element.id)) {
      updatedLikedMusic = likedMusic.filter((item) => item.id !== element.id);
      setlikedMusic(updatedLikedMusic);
      localStorage.setItem("likedMusic", JSON.stringify(updatedLikedMusic));
    } else {
      updatedLikedMusic = likedMusic;
      updatedLikedMusic.push(element);
      setlikedMusic(updatedLikedMusic);
      localStorage.setItem("likedMusic", JSON.stringify(updatedLikedMusic));
    }
  };

  useEffect(() => {
    const localLikedMusic = JSON.parse(localStorage.getItem("likedMusic")) || [];
    setlikedMusic(localLikedMusic);
  }, [setlikedMusic]);

  return (

    <div className="lg:w-full h-full md:w-1/2 w-full p-2 flex flex-col">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden h-full hover:scale-95 transition-transform duration-300 border-2 border-red-500">
        <div className="aspect-w-16 aspect-h-8">
          <img
            src={element.album.images[0].url}
            className="object-cover object-center w-full h-full"
            alt="Album Cover"
          />
        </div>

        <div className="p-4 flex-grow">
          <h5 className="text-sm   h-4 overflow-hidden font-poppins mb-1">{element.name}</h5>
          <div className="flex flex-row">
        <p className="text-black font-bold text-sm mr-2">Artist:</p><p className="text-xs text-gray-600"> {element.album.artists[0].name}</p>    
        </div>  
        <div className="flex flex-row">  
          <p className="text-black font-bold text-sm ">Release date:</p> <p className="text-xs text-gray-600"> {element.album.release_date}</p>
          </div>  
          <audio src={element.preview_url} controls className="w-full border-2 border-black rounded-full "></audio>
        </div>
        <div className="flex justify-center items-center">
          <div className="flex items-center">
            {pinnedMusic.some((item) => item.id === element.id) ? (
              <button onClick={handlePin} className="text-gray-500">
                <i className="bi bi-pin-angle-fill ml-4 border-2 border-red-500 p-2 shadow-xl rounded-full text-base"></i>
              </button>
            ) : (
              <button onClick={handlePin} className="text-gray-500">
                <i className="bi bi-pin-angle border-2 ml-4 border-red-500 p-2 shadow-xl rounded-full text-base"></i>
              </button>
            )}
            {likedMusic.some((item) => item.id === element.id) ? (
              <button onClick={handleLike} className="ml-2 text-gray-500">
                <i className="bi bi-heart-fill border-2 ml-4 border-red-500 shadow-xl rounded-full p-2 text-danger text-base"></i>
              </button>
            ) : (
              <button onClick={handleLike} className="ml-2 text-gray-500">
                <i className="bi bi-heart border-2 ml-4 border-red-500 shadow-xl bg-red-500 text-black rounded-full p-2 text-base"></i>
              </button>
            )}
          </div>
        </div>
      </div>
     </div>
  

  );
}

export default Card;


