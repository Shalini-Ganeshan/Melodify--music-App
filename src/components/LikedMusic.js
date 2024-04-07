import React, { useContext, useEffect } from "react";
import Card from "./Card";
import { MusicContext } from "../Context";

function LikedMusic() {
  const { likedMusic, setLikedMusic } = useContext(MusicContext);

  useEffect(() => {
    const localLikedMusic = JSON.parse(localStorage.getItem("likedMusic"));
    if (localLikedMusic) {
      setLikedMusic(localLikedMusic);
    } else {
      setLikedMusic([]); // Initialize with an empty array if local storage is null
    }
  }, [setLikedMusic]);

  return (
    <div className="max-w-screen-lg mx-auto">
      {likedMusic && likedMusic.length === 0 ? (
        <div className="text-center">
          <h3 className="py-5 text-lg font-poppins">You don't have any liked music yet!</h3>
          <div className="text-center">
            <i className="bi bi-emoji-frown fs-1"></i>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-danger text-center font-poppins py-3">
            Your Liked Music <i className="bi bi-heart-fill text-danger"></i>
          </h1>
        </div>
      )}

      <div className="grid grid-cols-2 ">
        {likedMusic && likedMusic.map((element) => {
          return <Card key={element.id} element={element} />;
        })}
      </div>
    </div>
  );
}

export default LikedMusic;

