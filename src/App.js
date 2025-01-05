import React, { useContext, useEffect, useState } from "react";
import Card from "./components/Card";
import Navbar from "./components/Navbar";
import { MusicContext } from "./Context";
import music from './components/assets/music.png';

function App() {
  const [keyword, setKeyword] = useState("");
  const [message, setMessage] = useState("");
  const [tracks, setTracks] = useState([]);
  const [token, setToken] = useState(null);

  const musicContext = useContext(MusicContext);
  const isLoading = musicContext.isLoading;
  const setIsLoading = musicContext.setIsLoading;
  const setLikedMusic = musicContext.setLikedMusic;
  const setPinnedMusic = musicContext.setPinnedMusic;
  const resultOffset = musicContext.resultOffset;
  const setResultOffset = musicContext.setResultOffset;

  const fetchMusicData = async () => {
    setTracks([]);
    window.scrollTo(0, 0);
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${keyword}&type=track&offset=${resultOffset}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch tunes");
      }

      const jsonData = await response.json();

      setTracks(jsonData.tracks.items);
    } catch (error) {
      setMessage(error.message);
      setTimeout(() => setMessage(""), 3000); // Set timeout to clear the message after 3 seconds
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setResultOffset(0);
      fetchMusicData();
    }
  };

  useEffect(() => {
    

    // current client credentials will be deleted in few days
    const fetchToken = async () => {
      try {
        const response = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: "grant_type=client_credentials&client_id=a77073181b7d48eb90003e3bb94ff88a&client_secret=68790982a0554d1a83427e061e371507",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch token");
        }

        const jsonData = await response.json();
        setToken(jsonData.access_token);
      } catch (error) {
        setMessage(error.message);
        setTimeout(() => setMessage(""), 3000); // Set timeout to clear the message after 3 seconds
      } finally {
        setIsLoading(false);
      }
    };
    fetchToken();
    setLikedMusic(JSON.parse(localStorage.getItem("likedMusic")));
    setPinnedMusic(JSON.parse(localStorage.getItem("pinnedMusic")));
  }, [setIsLoading, setLikedMusic, setPinnedMusic]);

  return (
    <>
      <Navbar
        keyword={keyword}
        setKeyword={setKeyword}
        handleKeyPress={handleKeyPress}
        fetchMusicData={fetchMusicData}
        className="bg-red-500" 
      />

      <div className="container">
        <div className={`flex justify-center items-center h-screen ${isLoading ? "" : "hidden"}`}>
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {tracks.map((element) => {
            return <Card key={element.id} element={element} />;
          })}
        </div>
        <div className="grid grid-cols-2">
          <button
            onClick={() => {
              setResultOffset((previous) => previous - 20);
              fetchMusicData();
            }}
            className={`w-full mt-4 font-poppins border-3 border-red-500 rounded-full ${resultOffset === 0 ? "hidden" : ""}`}
          >
            Go to Previous Page: {resultOffset / 20}
          </button>
          <button
            onClick={() => {
              setResultOffset((previous) => previous + 20);
              fetchMusicData();
            }}
            className={`w-full font-poppins border-3 mt-4 mx-4 border-red-500 rounded-full ${tracks.length === 0 || isLoading ? "hidden" : ""}`}
          >
            Next Page: {resultOffset / 20 + 2}
          </button>
        </div>
        {message && (
          <div>
            <h4 className="text-center font-poppins text-danger py-2">{message}</h4>
          </div>
        )}
        <div className="flex justify-center items-center flex-col py-5">
          <h1 className="text-4xl font-dancing mb-5">Melodify..</h1>
          <img src={music} alt='headphones img' className="h-40 w-40 mb-24 justify-center"/>
          <h3 className="text-red-500 font-poppins font-semibold lg:text-2xl md:text-2xl sm:text-sm border-2 border-black p-4 rounded-full whitespace-nowrap ">Discover, Play and Repeat</h3>
        </div>
      </div>
      <div
        className="modal fade position-absolute"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        
      </div>
      <div className="bottom-0 left-0 w-full text-center text-gray-500">
        <p>Copyrights 2026 © Melodify.com</p>
      </div>


    </>
  );
}

export default App;

