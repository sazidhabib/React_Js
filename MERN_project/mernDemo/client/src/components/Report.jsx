import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const ReportCard = ({ title, description, image }) => {
  return (
    <div id="news-slider" className=" owl-carousel">
      <div className="post-slide">
        <div className="post-img">
          <img src={image} className="card-img-to " alt={title} />
        </div>
        <div className=" post-content">
          <h3 className="post-title"><a href="#">{title}</a></h3>
          <p className="post-description">{description}</p>
        </div>
      </div>
    </div>
  );
};

const Report = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASE_URL = "http://localhost:5000";

  useEffect(() => {
    const fetchPublishedReports = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/blogs");
        const publishedReports = response.data.filter(report => report.status === true);
        const sortedReports = publishedReports.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setReports(sortedReports);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPublishedReports();
  }, []);

  if (loading) return <div className="text-center">Loading reports...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <>
      <section className="publishedreport py-4" id="publishedreport">
        <div className="container">
          <h2 className="publishedreport-sty mb-4">প্রকাশিত রিপোর্ট</h2>
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView={3}
            autoplay={{ delay: 3000 }}
            pagination={{ clickable: true }}
            loop={true}
            breakpoints={{
              0: { slidesPerView: 1 },
              576: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              992: { slidesPerView: 3 },
            }}
          >
            {reports.map((report) => (
              <SwiperSlide key={report._id}>
                <ReportCard
                  title={report.title}
                  description={report.description}
                  image={`${BASE_URL}${report.image.startsWith("/") ? "" : "/"}${report.image}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
      <div className="commonmenusty"></div>
    </>
  );
};

export default Report;
