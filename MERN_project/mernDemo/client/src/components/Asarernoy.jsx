import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported

const Story = ({ title, description }) => {
  return (
    <div className="common-story">
      <div className="row">
        <div className="col-md-4">
          <div className="news-item p-3 mb-4">
            <h4 className="news-title">{title}</h4>
          </div>
        </div>
        <div className="col-md-8">
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
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 3; // Show 3 articles per page

  useEffect(() => {
    const fetchPublishedArticles = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/articles");

        // Filter articles where status is true
        const publishedArticles = response.data.filter(article => article.status === true);

        // Sort articles in descending order based on date
        const sortedArticles = publishedArticles.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setArticles(sortedArticles);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPublishedArticles();
  }, []);

  if (loading) return <div className="text-center mt-4">Loading articles...</div>;
  if (error) return <div className="text-center text-danger mt-4">Error: {error}</div>;

  // Calculate total pages
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  // Get current articles for the page
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

  return (
    <section className="asarernoy" id="asarernoy">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12 text-left">
            <img className="asarernoy-img img-fluid header-image" src="/images/আষাঢ়ে নয়.jpg" alt="Header Image" />
          </div>
          <div className="col-md-12">
            {currentArticles.map((article) => (
              <Story key={article._id} title={article.title} description={article.description} />
            ))}

            {/* Bootstrap Pagination */}
            <nav aria-label="Article Pagination">
              <ul className="pagination justify-content-center mt-4">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
                </li>
                {[...Array(totalPages).keys()].map((page) => (
                  <li key={page} className={`page-item ${currentPage === page + 1 ? "active" : ""}`}>
                    <button className="page-link" onClick={() => setCurrentPage(page + 1)}>{page + 1}</button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Asarernoy;
