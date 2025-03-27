import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const ReportCard = ({ title, description, image }) => {
  return (
    <div className="col-md-4">
      <div id="news-slider" className="owl-carousel">
        <div className="post-slide">
          <div className="post-img">
            <a href="#">
              <img src={image} alt={title} />
            </a>
          </div>
          <div className="post-content">
            <h3 className="post-title">
              <a href="#">{title}</a>
            </h3>
            <p className="post-description">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Report = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPublishedReports = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/blogs");
        // Filter reports where status is true
        const publishedReports = response.data.filter(report => report.status === true);
        setReports(publishedReports);
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
      <section className="publishedreport" id="publishedreport">
        <div className="container">
          <h2 className="publishedreport-sty">প্রকাশিত রিপোর্ট</h2>
          <div className="row">
            {reports.map((report) => (
              <ReportCard
                key={report._id}
                title={report.title}
                description={report.description}
                image={`http://localhost:5000/${report.image}`}
              />
            ))}
          </div>
        </div>
      </section>
      <div className="commonmenusty"></div>
    </>
  );
};

export default Report;