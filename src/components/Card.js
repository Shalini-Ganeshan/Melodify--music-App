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
    <div className="lg:w-1/3 md:w-1/2 sm:w-full p-4 flex flex-col">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden h-full flex flex-col">
        <div className="relative w-full h-48">
          <img
            src={element.album.images[0].url}
            className="object-cover w-full h-full rounded-t-lg"
            alt="Album Cover"
          />
        </div>

        <div className="flex-grow p-4">
          <h5 className="text-lg font-poppins font-semibold text-gray-800 truncate">
            {element.name}
          </h5>

          <div className="flex flex-row mt-2">
            <p className="text-black font-bold text-sm mr-2">Artist:</p>
            <p className="text-xs text-gray-600">{element.album.artists[0].name}</p>
          </div>

          <div className="flex flex-row mt-1">
            <p className="text-black font-bold text-sm mr-2">Release date:</p>
            <p className="text-xs text-gray-600">{element.album.release_date}</p>
          </div>

          <audio src={element.preview_url} controls className="w-full mt-2 border-2 border-gray-300 rounded-lg" />
        </div>

        <div className="flex justify-between items-center p-4 border-t-2 border-gray-200">
          <div className="flex items-center">
            {pinnedMusic.some((item) => item.id === element.id) ? (
              <button onClick={handlePin} className="text-gray-500">
                <i className="bi bi-pin-angle-fill text-xl border-2 border-red-500 p-2 rounded-full shadow-lg"></i>
              </button>
            ) : (
              <button onClick={handlePin} className="text-gray-500">
                <i className="bi bi-pin-angle text-xl border-2 ml-2 border-red-500 p-2 rounded-full shadow-lg"></i>
              </button>
            )}
            {likedMusic.some((item) => item.id === element.id) ? (
              <button onClick={handleLike} className="ml-2 text-gray-500">
                <i className="bi bi-heart-fill text-xl border-2 border-red-500 p-2 rounded-full shadow-lg text-danger"></i>
              </button>
            ) : (
              <button onClick={handleLike} className="ml-2 text-gray-500">
                <i className="bi bi-heart text-xl border-2 border-red-500 p-2 rounded-full shadow-lg bg-red-500 text-black"></i>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
