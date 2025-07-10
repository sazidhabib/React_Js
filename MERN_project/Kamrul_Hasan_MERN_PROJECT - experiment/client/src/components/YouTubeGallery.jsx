import React, { useState, useEffect } from 'react';


const YouTubeGallery = () => {
    // Video data included within the component
    const videos = [
        {
            id: 1,
            title: "Amazing Nature",
            description: "Beautiful nature scenes from around the world",
            src: "https://www.youtube.com/watch?v=LXb3EKWsInQ"
        },
        {
            id: 2,
            title: "City Time-lapse",
            description: "Amazing cityscapes in time-lapse",
            src: "https://www.youtube.com/watch?v=7ZmJtYaUTa0"
        },
        {
            id: 3,
            title: "Space Exploration",
            description: "Journey through the cosmos",
            src: "https://www.youtube.com/watch?v=libKVRa01L8"
        }
    ];

    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [player, setPlayer] = useState(null);

    // Extract YouTube ID from URL
    const getYouTubeId = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    // Initialize YouTube player
    useEffect(() => {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        window.onYouTubeIframeAPIReady = () => {
            const newPlayer = new window.YT.Player('youtube-player', {
                videoId: getYouTubeId(videos[currentVideoIndex].src),
                playerVars: {
                    autoplay: 0,
                    controls: 1,
                    modestbranding: 1,
                    rel: 0
                },
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });
            setPlayer(newPlayer);
        };

        return () => {
            if (player) {
                player.destroy();
            }
        };
    }, []);

    // Update player when video changes
    useEffect(() => {
        if (player && player.loadVideoById) {
            player.loadVideoById(getYouTubeId(videos[currentVideoIndex].src));
        }
    }, [currentVideoIndex]);

    const onPlayerReady = (event) => {
        // Player is ready
    };

    const onPlayerStateChange = (event) => {
        // Handle player state changes
    };

    const selectVideo = (index) => {
        setCurrentVideoIndex(index);
    };

    const currentVideo = videos[currentVideoIndex] || {};

    return (
        <div className="youtube-gallery py-5 px-2">
            <h2>Video Gallery</h2>
            <div className="main-video-container">
                <div id="youtube-player"></div>
                <div className="video-info">
                    <h3>{currentVideo.title}</h3>
                    <p>{currentVideo.description}</p>
                </div>
            </div>

            <div className="thumbnail-grid">
                {videos.map((video, index) => {
                    const videoId = getYouTubeId(video.src);
                    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;

                    return (
                        <div
                            key={video.id}
                            className={`thumbnail ${index === currentVideoIndex ? 'active' : ''}`}
                            onClick={() => selectVideo(index)}
                        >
                            <img src={thumbnailUrl} alt={video.title} />
                            <div className="thumbnail-overlay">
                                <span>{video.title}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default YouTubeGallery;