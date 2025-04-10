import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import DetailModal from "./DetailModal";

const truncateByChars = (text, limit) => {
  if (!text) return "";
  return text.length > limit ? text.slice(0, limit) + "..." : text;
};


const ReportCard = ({ title, description, image, onClick }) => {
  return (
    <div id="news-slider" className="owl-carousel" onClick={onClick} style={{ cursor: "pointer" }}>
      <div className="post-slide">
        <div className="post-img">
          <img src={image} className="card-img-to" alt={title} />
        </div>
        <div className="post-content">
          <h2 className="post-title">{truncateByChars(title, 50)}</h2>
          <p className="post-description">{truncateByChars(description, 150)}</p>
        </div>
      </div>
    </div>
  );
};


const Report = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedReport, setSelectedReport] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = (report) => {
    setSelectedReport(report);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedReport(null);
  };

  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/blogs`;
  const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/`;

  useEffect(() => {
    const fetchPublishedReports = async () => {
      try {
        const response = await axios.get(API_URL);
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
                  onClick={() =>
                    handleOpenModal({
                      title: report.title,
                      description: report.description,
                      image: `${BASE_URL}${report.image.startsWith("/") ? "" : "/"}${report.image}`,
                    })
                  }
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <DetailModal
            show={showModal}
            handleClose={handleCloseModal}
            item={selectedReport}
          />
        </div>
      </section>
      <div className="commonmenusty"></div>
    </>
  );
};

export default Report;
