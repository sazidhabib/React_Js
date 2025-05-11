import React, { useState, useEffect, useRef } from 'react';
import YouTube from 'react-youtube';
import { FaPlayCircle, FaPauseCircle } from 'react-icons/fa';
import 'animate.css';
import axios from 'axios';

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

  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/songs`;

  // Fetch songs from backend
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get(API_URL); // Replace with your actual API
        setSongs(response.data);
      } catch (error) {
        console.error('Failed to fetch songs:', error);
      }
    };

    fetchSongs();
  }, []);

  const handlePlayPause = (index) => {
    if (currentIndex === index) {
      if (isPlaying) {
        playerRef.current?.internalPlayer.pauseVideo();
        setIsPlaying(false);
      } else {
        playerRef.current?.internalPlayer.playVideo();
        setIsPlaying(true);
      }
    } else {
      setCurrentIndex(index);
      setIsPlaying(true);
    }
  };

  const handleEnd = () => {
    if (currentIndex !== null && currentIndex + 1 < songs.length) {
      setCurrentIndex(currentIndex + 1);
      setIsPlaying(true);
    } else {
      setCurrentIndex(null);
      setIsPlaying(false);
    }
  };

  return (
    <section className="gansona" id="listeningmusic">
      <div className="container">
        <h3 className="subheading">গান শোনা</h3>
        <h2 className="mainheading">আজ রাতে কোনো রূপকথা নেই</h2>
        <div className="row">
          <div className="col-lg-6">
            <div className="icon-content">
              <div className="icon mb-3">
                <img src="/images/Song_Icon.png" alt="Song Icon" />
              </div>
              <div className="kobite-text">
                {songs.map((song, index) => {
                  const isCurrent = index === currentIndex;
                  return (
                    <div
                      key={index}
                      className={`d-flex flex-column p-2 mb-3 rounded ${isCurrent ? 'bg-primary text-white' : 'bg-light'}`}
                      style={{ cursor: 'pointer', transition: '0.3s' }}
                      onClick={() => handlePlayPause(index)}
                    >
                      <div className="d-flex align-items-center">
                        {isCurrent && isPlaying ? (
                          <FaPauseCircle className="me-2 animate__animated animate__pulse animate__infinite" style={{ fontSize: '26px', color: '#ffffff' }} />
                        ) : (
                          <FaPlayCircle className="me-2" style={{ fontSize: '26px', color: '#87c26b' }} />
                        )}
                        <p style={{ margin: 0 }}>{song.title}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
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
          onReady={(e) => {
            playerRef.current = e.target;
            e.target.playVideo();
          }}
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
