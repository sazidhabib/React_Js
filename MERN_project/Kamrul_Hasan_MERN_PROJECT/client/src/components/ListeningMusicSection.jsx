import React, { useState, useRef, useEffect } from 'react';
import 'animate.css';
import { FaPlayCircle, FaPauseCircle } from 'react-icons/fa';

const ListeningMusicSection = () => {
  const songs = [
    { title: 'আবার এল যে সন্ধ্যা...', src: '/audios/Abar_Elo_Je_Shondha.mp3' },
    { title: 'কথা দেও আবার আসবে...', src: '/audios/Katha_Dao_Aabar_Asbe_Song.mp3' },
    { title: 'ক ফোটা চোখের জল ফেলেছো...', src: '/audios/Ka_Phonta_Chokher_Jal_Phelechho.mp3' },
    { title: 'সবাই তো ভালো বাসা চায়....', src: '/audios/Sobaito_Bhalobasa_chai.mp3' },
    { title: 'বোজে না সে বোজে না...', src: '/audios/Bojhena_Shey_Bojhena.mp3' },
    { title: 'সে প্রথম প্রেম আমার নীলাঞ্জনা...', src: '/audios/Se_Prothom_Prem_Amar_Nilanjona.mp3' },
    { title: 'তোমায় দেখলে মনে হয়...', src: '/audios/Tomay_Dekhle_Mone_Hoy.mp3' },
    { title: 'রিম ঝিম এ ধারাতে চায় মন হারাতে...', src: '/audios/Rimjhim_E_Dhara_Te.mp3' },
  ];

  const audioRef = useRef(new Audio());
  const [currentSong, setCurrentSong] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const playSong = (src) => {
    if (currentSong === src) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    } else {
      audioRef.current.src = src;
      audioRef.current.play();
      setCurrentSong(src);
      setIsPlaying(true);
      setProgress(0);
    }
  };

  const handleSongEnd = () => {
    const currentIndex = songs.findIndex((song) => song.src === currentSong);
    const nextIndex = currentIndex + 1;

    if (nextIndex < songs.length) {
      const nextSong = songs[nextIndex];
      audioRef.current.src = nextSong.src;
      audioRef.current.play();
      setCurrentSong(nextSong.src);
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
      setCurrentSong('');
      setProgress(0);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    audio.addEventListener('ended', handleSongEnd);

    const updateProgress = () => {
      if (audio.duration > 0) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    audio.addEventListener('timeupdate', updateProgress);

    return () => {
      audio.removeEventListener('ended', handleSongEnd);
      audio.removeEventListener('timeupdate', updateProgress);
    };
  }, [currentSong]);

  const handleSeek = (e, songSrc) => {
    if (songSrc !== currentSong) return; // Only allow seeking on current song
    const audio = audioRef.current;
    const rect = e.target.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const newTime = (offsetX / rect.width) * audio.duration;
    audio.currentTime = newTime;
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
                {songs.map((song, index) => (
                  <div
                    key={index}
                    className={`d-flex flex-column p-2 mb-3 rounded ${currentSong === song.src ? 'bg-primary text-white' : 'bg-light'
                      }`}
                    style={{
                      transition: '0.3s',
                      cursor: 'pointer',
                      position: 'relative',
                    }}
                    onClick={() => playSong(song.src)}
                  >
                    <div className="d-flex align-items-center">
                      {currentSong === song.src && isPlaying ? (
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

                    {/* Progress bar ONLY for playing song */}
                    {currentSong === song.src && (
                      <div
                        className="progress-container mt-2"
                        onClick={(e) => handleSeek(e, song.src)}
                        style={{
                          width: '100%',
                          height: '6px',
                          backgroundColor: 'rgba(255,255,255,0.4)',
                          borderRadius: '5px',
                          cursor: 'pointer',
                          overflow: 'hidden',
                        }}
                      >
                        <div
                          className="progress-bar"
                          style={{
                            width: `${progress}%`,
                            height: '100%',
                            backgroundColor: '#ffffff',
                            transition: 'width 0.2s linear',
                          }}
                        ></div>
                      </div>
                    )}
                  </div>
                ))}
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

      {/* Hidden audio player */}
      <audio ref={audioRef} />
    </section>
  );
};

export default ListeningMusicSection;
