import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import BookReadingModal from './BookReadingModal'; // import the modal component
import { useMenu } from '../store/MenuContext';
import axios from 'axios';

const BookReadingSection = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [bookSections, setBookSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/sections/bookreading`;

  const { getMenuByOrder } = useMenu();
  const bookMenu = getMenuByOrder(6); // Assuming 'Book Reading' is the sixth menu item

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await axios.get(`${API_URL}?t=${Date.now()}`);
        setBookSections(response.data);
      } catch (err) {
        console.error("Error fetching book data:", err);
        setError("Failed to load book section content");
      } finally {
        setLoading(false);
      }
    };

    fetchBookData();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center">
        {error}
      </div>
    );
  }

  if (bookSections.length === 0) {
    return null;
  }

  const handleOpenModal = (data) => {
    setSelectedBook({
      title: data?.title || "জাপান কাহিনি",
      description: data?.description || ""
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
    setShowModal(false);
  };

  return (
    <section className="boipora" id={bookMenu?.path || "bookreading"}>
      <div className="container">
        <h3 className="subheading">{bookMenu?.name || "বই পড়া"}</h3>
        
        {bookSections.map((bookData, index) => (
          <div key={bookData._id || index} className="mb-5">
            <h2 className="mainheading">{bookData?.title || "জাপান  কাহিনি"}</h2>
            <div className="row">
              <div className="col-lg-6">
                <div className="icon-content">
                  <div className="icon">
                    <img src="/images/Book_Icon.JPG" alt="Book Icon" />
                  </div>
                  <div className="main-text">
                    <p
                      onClick={() => handleOpenModal(bookData)}
                      style={{ cursor: "pointer" }}
                      title="সম্পূর্ণ লেখাটি পড়তে ক্লিক করুন"
                    >
                      {bookData?.description
                        ? (bookData.description.length > 600
                          ? `${bookData.description.slice(0, 600)}...`
                          : bookData.description)
                        : "কন্টেন্ট লোড হচ্ছে..."}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="jetuku-img">
                  <img src={bookData?.imageUrl
                    ? `${import.meta.env.VITE_API_BASE_URL}/uploads/${bookData.imageUrl.replace(/^\/+/, "")}`
                    : "/images/Book.JPG"} alt="Book" className="img-fluid" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <BookReadingModal
        show={showModal}
        handleClose={handleCloseModal}
        item={selectedBook}
      />
    </section>
  );
};

export default BookReadingSection;
