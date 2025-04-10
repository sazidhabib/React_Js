import React from 'react';

const ListeningMusicSection = () => {
  return (
    <section className="gansona" id="listeningmusic">
      <div className="container">
        <h3 className="subheading">গান শোনা</h3>
        <h2 className="mainheading">আজ রাতে কোনো রূপকথা নেই</h2>
        <div className="row">
          <div className="col-md-6">
            <div className="icon-content">
              <div className="icon">
                <img src="/images/Song_Icon.png" alt="Song Icon" />
              </div>
              <div className="kobite-text">
                <p>আবার এল যে সন্ধ্যা...</p>
                <p>কথা দেও আবার আসবে...</p>
                <p>ক ফোটা চোখের জল ফেলেছো...</p>
                <p>সবাই তো ভালো বাসা চায়....</p>
                <p>বোজে না সে বোজে না...</p>
                <p>সে প্রথম প্রেম আমার নীলাঞ্জনা...</p>
                <p>তোমায় দেখলে মনে হয়...</p>
                <p>রিম ঝিম এ ধারাতে চায় মন হারাতে...</p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="jetuku-img">
              <img src="/images/music_1.png" alt="Music" className="img-fluid" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListeningMusicSection;