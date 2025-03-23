import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const reports = [
  {
    id: 1,
    title: "অবশেষে মুচলেকায় মিলল মুক্তি",
    description:
      "নভেম্বরের ঠান্ডাটা তখনো জেঁকে বসেনি, কিছুটা তুলতুলে। গায়ে হালকা শীতের কাপড়। মোটরবাইক জোরে চালালেই ঠান্ডা লাগছে। বাইকের পেছনে সহকর্মী বন্ধু আহমেদ দীপু, পায়ের চিকিৎসা করিয়ে...",
    image: "/images/news.JPG",
  },
  {
    id: 2,
    title: "অবশেষে মুচলেকায় মিলল মুক্তি",
    description:
      "নভেম্বরের ঠান্ডাটা তখনো জেঁকে বসেনি, কিছুটা তুলতুলে। গায়ে হালকা শীতের কাপড়। মোটরবাইক জোরে চালালেই ঠান্ডা লাগছে। বাইকের পেছনে সহকর্মী বন্ধু আহমেদ দীপু, পায়ের চিকিৎসা করিয়ে...",
    image: "/images/news.JPG",
  },
  {
    id: 3,
    title: "অবশেষে মুচলেকায় মিলল মুক্তি",
    description:
      "নভেম্বরের ঠান্ডাটা তখনো জেঁকে বসেনি, কিছুটা তুলতুলে। গায়ে হালকা শীতের কাপড়। মোটরবাইক জোরে চালালেই ঠান্ডা লাগছে। বাইকের পেছনে সহকর্মী বন্ধু আহমেদ দীপু, পায়ের চিকিৎসা করিয়ে...",
    image: "/images/news.JPG",
  },
];

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
  return (
    <>
    <section className="publishedreport" id="publishedreport">
      <div className="container">
        <h2 className="publishedreport-sty">প্রকাশিত রিপোর্ট</h2>
        <div className="row">
          {reports.map((report) => (
            <ReportCard key={report.id} {...report} />
          ))}
        </div>
      </div>
    </section>
    <div className="commonmenusty">
    </div>
    </>
  );
};

export default Report;
