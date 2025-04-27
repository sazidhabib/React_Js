import React, { useState, useRef } from 'react';
import { FaPlayCircle } from 'react-icons/fa';

const ListeningMusicSection = () => {
  const songs = [
    { title: 'আবার এল যে সন্ধ্যা...', src: '/audios/Abar_Elo_Je_Shondha.mp3' },
    { title: 'কথা দেও আবার আসবে...', src: '/audios/song2.mp3' },
    { title: 'ক ফোটা চোখের জল ফেলেছো...', src: '/audios/song3.mp3' },
    { title: 'সবাই তো ভালো বাসা চায়....', src: '/audios/song4.mp3' },
    { title: 'বোজে না সে বোজে না...', src: '/audios/song5.mp3' },
    { title: 'সে প্রথম প্রেম আমার নীলাঞ্জনা...', src: '/audios/song6.mp3' },
    { title: 'তোমায় দেখলে মনে হয়...', src: '/audios/song7.mp3' },
    { title: 'রিম ঝিম এ ধারাতে চায় মন হারাতে...', src: '/audios/song8.mp3' },
  ];

  const audioRef = useRef(new Audio());
  const [currentSong, setCurrentSong] = useState('');

  const playSong = (src) => {
    if (currentSong !== src) {
      audioRef.current.src = src;
      audioRef.current.play();
      setCurrentSong(src);
    } else {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
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
              <div className="icon">
                <img src="/images/Song_Icon.png" alt="Song Icon" />
              </div>
              <div className="kobite-text">
                {songs.map((song, index) => (
                  <div
                    key={index}
                    className={`d-flex align-items-center p-2 mb-2 rounded ${currentSong === song.src ? 'bg-primary text-white' : 'bg-light'
                      }`}
                    style={{
                      transition: '0.3s',
                      cursor: 'pointer',
                    }}
                    onClick={() => playSong(song.src)}
                  >
                    <FaPlayCircle className='me-2' style={{ marginRight: '8px', color: '#87c26b', fontSize: '26px' }} />
                    <p style={{ margin: 0 }}>{song.title}</p>
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
