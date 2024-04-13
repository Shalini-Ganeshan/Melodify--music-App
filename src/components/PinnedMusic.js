import React, { useContext, useEffect } from "react";
import Card from "./Card";
import { MusicContext } from "../Context";

function PinnedMusic() {
  const { pinnedMusic, setPinnedMusic } = useContext(MusicContext);

  useEffect(() => {
    const localPinnedMusic = JSON.parse(localStorage.getItem("pinnedMusic"));
    if (localPinnedMusic) {
      setPinnedMusic(localPinnedMusic);
    } else {
      setPinnedMusic([]); // Initialize with an empty array if local storage is null
    }
  }, [setPinnedMusic]);

  // Check if pinnedMusic is null or undefined before mapping over it
  if (!pinnedMusic) {
    return (
      <div className="text-center">
        <h3 className="py-5 text-lg font-poppins">You don't have any pinned music yet!</h3>
      </div>
    );
  }

  // Check if pinnedMusic is an array before mapping over it
  if (!Array.isArray(pinnedMusic)) {
    return (
      <div className="text-center">
        <h3 className="py-5 text-lg font-poppins">Invalid pinned music data!</h3>
      </div>
    );
  }

  return (
    <div className="max-w-screen-lg mx-auto">
      {pinnedMusic.length === 0 ? (
        <div className="text-center">
          <h3 className="py-5 text-lg font-poppins">You don't have any pinned music yet!</h3>
          <div className="text-center">
            <i className="bi bi-emoji-frown fs-1"></i>{" "}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 ">
          {pinnedMusic.map((element) => {
            return <Card key={element.id} element={element} />;
          })}
        </div>
      )}
    </div>
  );
}

export default PinnedMusic;
