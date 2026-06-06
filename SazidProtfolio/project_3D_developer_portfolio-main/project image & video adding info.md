Done. Here's what changed:
src/constants/index.js â Added a media array to each project:
media: [
  { type: "image", src: kamrulhasan },
  // Add more: { type: "image", src: otherScreenshot }
  // Add videos: { type: "video", src: "url.mp4", poster: posterImg }
],
src/components/ProjectDetails.jsx â Replaced the single <img> with a Swiper carousel:
- 16:9 container via aspect-video
- Navigation arrows (glassmorphism, appear on hover)
- Pagination dots (violet accent, active dot is wider pill)
- Auto-play with 5s delay when multiple slides exist
- Handles { type: "image" } and { type: "video" } slides
- Gradient overlay preserved (pointer-events-none so video controls still work)
To add more photos or a demo video, just append entries to any project's media array.