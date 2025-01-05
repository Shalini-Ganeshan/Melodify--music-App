import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MusicContext } from "../Context";
import PinnedMusic from "./PinnedMusic";
import LikedMusic from "./LikedMusic";
import musicnote from './assets/music-note.png'
import search from './assets/magnifying-glass.png';

const Navbar = ({ keyword, handleKeyPress, setKeyword, fetchMusicData }) => {
  const musicContext = useContext(MusicContext);
  const setResultOffset = musicContext.setResultOffset;

  const handleClosePinnedMusic = () => {
    document.getElementById("exampleModal").classList.remove("block");
  };

  const handleCloseLikedMusic = () => {
    document.getElementById("likedMusicModal").classList.remove("block");
  };

  return (
    <>
      <nav className="bg-red-500 shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center flex-wrap">
          <Link className="text-white text-lg font-semibold flex items-center space-x-2" to="/">
            <img src={musicnote} alt="music note icon" className="w-10 h-10 mr-2" />
            <span className="font-dancing text-2xl">Melodify</span>
          </Link>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <button
              type="button"
              onClick={() => {
                document.getElementById("exampleModal").classList.add("block");
              }}
              className="btn-navbar border-2 border-black p-1 rounded full bg-black text-white shadow-2xl"
            >
              <i className="bi bi-pin-angle-fill"></i>
              <span className="hidden sm:inline ml-1 ">Pinned Tunes</span>
            </button>
            <button
              type="button"
              onClick={() => {
                document.getElementById("likedMusicModal").classList.add("block");
              }}
              className="btn-navbar border-2 border-black p-1 rounded full  bg-black text-white shadow-2xl"
            >
              <i className="bi bi-heart-fill"></i>
              <span className="hidden sm:inline ml-1 ">Liked Tunes</span>
            </button>
            <button
              type="button"
              onClick={() => {
                window.location.reload();
              }}
              className="btn-navbar"
            >
              <img src="https://static.thenounproject.com/png/901844-200.png" alt="home icon" className="w-12 h-12" />
            </button>
          </div>
        </div>
        <div className="container mx-auto px-4">
          <div className="flex justify-center md:text-sm">
            <input
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              onKeyDown={handleKeyPress}
              className="border border-gray-600 text-sm px-4 py-2 w-3/4 font-poppins rounded-lg shadow-xl"
              type="search"
              placeholder="What do you want to play?"
              aria-label="Search"
            />
            <button
              onClick={() => {
                setResultOffset(0);
                fetchMusicData();
              }}
              className="bg-red-500 rounded-lg p-2 ml-2"
            >
              <img src={search} alt="search" className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      <div
        className="modal"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title text-lg font-semibold" id="exampleModalLabel">
                Pinned Music
              </h1>
              <button
                type="button"
                onClick={handleClosePinnedMusic}
                className="close"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <PinnedMusic />
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal"
        id="likedMusicModal"
        tabIndex={-1}
        aria-labelledby="likedMusicModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title text-lg font-semibold" id="likedMusicModalLabel">
                Liked Music
              </h1>
              <button
                type="button"
                onClick={handleCloseLikedMusic}
                className="close"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <LikedMusic />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;


