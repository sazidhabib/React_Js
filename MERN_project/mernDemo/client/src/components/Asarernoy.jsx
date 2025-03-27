import React, { useState, useEffect } from "react";
import axios from "axios";

const Story = ({ title, description }) => {
  return (
    <div className="common-story">
      <div className="row">
        <div className="col-4">
          <div className="news-item p-3 mb-4">
            <h4 className="news-title">{title}</h4>
          </div>
        </div>
        <div className="col-8">
          <p className="news-description">{description}</p>
        </div>
      </div>
    </div>
  );
};

const Asarernoy = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch published articles (status: true)
  useEffect(() => {
    const fetchPublishedArticles = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/articles");
        // Filter articles where status is true
        const publishedArticles = response.data.filter(article => article.status === true);
        setArticles(publishedArticles);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPublishedArticles();
  }, []);

  if (loading) return <div>Loading articles...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <section className="asarernoy" id="asarernoy">
        <div className="container d-flex align-items-center justify-content-center">
          <div className="row w-100 mx-3">
            <div className="col-4">
              <div className="col-12 text-center">
                <img
                  className="asarernoy-img img-fluid header-image"
                  src="/images/আষাঢ়ে নয়.jpg"
                  alt="Header Image"
                />
              </div>
            </div>
            <div>
              {articles.map((article) => (
                <Story
                  key={article._id}
                  title={article.title}
                  description={article.description}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      <div className="commonmenusty"></div>
    </>
  );
};

export default Asarernoy;