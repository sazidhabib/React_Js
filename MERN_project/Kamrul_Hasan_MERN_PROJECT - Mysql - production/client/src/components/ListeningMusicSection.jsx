import React, { useState, useEffect, useRef } from 'react';
import { Spinner } from "react-bootstrap";
import YouTube from 'react-youtube';
import { FaPlayCircle, FaPauseCircle } from 'react-icons/fa';
import 'animate.css';
import axios from 'axios';
import { useMenu } from '../store/MenuContext';
import ResponsivePagination from './ResponsivePagination';

const extractVideoId = (url) => {
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

const ListeningMusicSection = () => {
  const playerRef = useRef(null);
  const [songs, setSongs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const songsPerPage = 8;
  const { getMenuByOrder } = useMenu();
  const listeningMusicMenu = getMenuByOrder(8); // Assuming 'Listening Music' is the third menu item

  const [musicSections, setMusicSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_MUSIC_URL = `${import.meta.env.VITE_API_BASE_URL}/api/sections/music`;
  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/songs`;


  useEffect(() => {
    const fetchMusicData = async () => {
      try {
        const response = await axios.get(`${API_MUSIC_URL}?t=${Date.now()}`);
        setMusicSections(response.data);
      } catch (err) {
        console.error("Error fetching music data:", err);
        setError("Failed to load music section content");
      } finally {
        setLoading(false);
      }
    };

    fetchMusicData();
  }, []);

  // Fetch songs
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get(API_URL);
        setSongs(response.data);
      } catch (error) {
        console.error('Failed to fetch songs:', error);
      }
    };
    fetchSongs();
  }, []);



  // Update progress
  useEffect(() => {
    let interval;
    if (isPlaying && playerRef.current) {
      interval = setInterval(() => {
        const player = playerRef.current;
        if (player && player.getCurrentTime && player.getDuration) {
          const currentTime = player.getCurrentTime();
          const duration = player.getDuration();
          if (duration > 0) {
            setProgress((currentTime / duration) * 100);
          }
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center">
        {error}
      </div>
    );
  }

  if (musicSections.length === 0) {
    return null;
  }

  const indexOfLastSong = currentPage * songsPerPage;
  const indexOfFirstSong = indexOfLastSong - songsPerPage;
  const currentSongs = songs.slice(indexOfFirstSong, indexOfLastSong);
  const totalPages = Math.ceil(songs.length / songsPerPage);


  const handlePlayPause = async (index) => {
    if (currentIndex === index) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
      } else {
        playerRef.current.playVideo();
        setIsPlaying(true);
      }
    } else {
      setCurrentIndex(index);
      setProgress(0);
    }
  };

  const handlePlayerReady = (event) => {
    playerRef.current = event.target;
    playerRef.current.playVideo();
    setIsPlaying(true);
    setProgress(0);
  };

  const handleEnd = () => {
    if (currentIndex + 1 < songs.length) {
      setCurrentIndex(currentIndex + 1);
      setProgress(0);
    } else {
      setCurrentIndex(null);
      setIsPlaying(false);
    }
  };

  const handleSeek = (e) => {
    const bar = e.currentTarget;
    const rect = bar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = clickX / width;

    const player = playerRef.current;
    if (player && player.getDuration) {
      const duration = player.getDuration();
      const seekTime = duration * percentage;
      player.seekTo(seekTime, true);
      setProgress(percentage * 100);
    }
  };

  return (
    <section className="gansona" id={listeningMusicMenu?.path || "listeningmusic"}>
      <div className="container">
        <h3 className="subheading">{listeningMusicMenu?.name || "গান শোনা"}</h3>
        
        {musicSections.map((musicData, index) => (
          <div key={musicData._id || index} className="mb-4">
            <h2 className="lisenmainheading">{musicData?.title}</h2>
            <h2 className="lisenmainheading" style={{ fontSize: '1.5rem', fontWeight: 'normal' }}>{musicData?.description}</h2>
          </div>
        ))}

        <div className="row mt-4">
          <div className="col-lg-6">
            <div className="icon-content">
              <div className="icon mb-3">
                <img src="/images/Song_Icon.png" alt="Song Icon" />
              </div>
              <div className="kobite-text">
                {currentSongs.map((song, index) => {
                  const actualIndex = indexOfFirstSong + index;
                  const isCurrent = currentIndex === actualIndex;

                  return (
                    <div
                      key={index}
                      className={`d-flex flex-column p-2 mb-3 rounded ${isCurrent ? 'music-bg text-white' : 'bg-light'}`}
                      style={{ cursor: 'pointer', transition: '0.3s' }}
                      onClick={() => handlePlayPause(actualIndex)}
                    >
                      <div className="d-flex align-items-center music">
                        {isCurrent && isPlaying ? (
                          <FaPauseCircle
                            className="me-2 animate__animated animate__pulse animate__infinite"
                            style={{ fontSize: '26px', color: '#ffffff' }}
                          />
                        ) : (
                          <FaPlayCircle
                            className="me-2"
                            style={{ fontSize: '26px', color: '#87c26b' }}
                          />
                        )}
                        <p style={{ margin: 0 }}>{song.title}</p>
                      </div>

                      {isCurrent && (
                        <div
                          className="progress mt-2"
                          style={{ height: '6px', cursor: 'pointer' }}
                          onClick={handleSeek}
                        >
                          <div
                            className="progress-bar bg-green"
                            role="progressbar"
                            style={{ width: `${progress}%` }}
                            aria-valuenow={progress}
                            aria-valuemin="0"
                            aria-valuemax="100"
                          />
                        </div>
                      )}
                    </div>
                  );
                })}

              </div>


            </div>
            <div className="d-flex justify-content-center mt-4">
              <ResponsivePagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                maxVisible={3}
              />
            </div>
          </div>

          <div className="col-lg-6">
            <div className="jetuku-img">
              <img src="/images/music_1.png" alt="Music" className="img-fluid" />
            </div>
          </div>
        </div>
      </div>

      {/* Hidden YouTube player */}
      {currentIndex !== null && songs[currentIndex] && (
        <YouTube
          videoId={extractVideoId(songs[currentIndex].youtubeUrl)}
          onReady={handlePlayerReady}
          onEnd={handleEnd}
          opts={{
            height: '0',
            width: '0',
            playerVars: {
              autoplay: 1,
              controls: 0,
              modestbranding: 1,
              rel: 0,
            },
          }}
          style={{ display: 'none' }}
        />
      )}
    </section>
  );
};

export default ListeningMusicSection;
