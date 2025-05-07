import { useState, useEffect, useRef } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../index.css";
import { Link, useLocation } from 'react-router-dom';


const Header = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMediumOrSmaller, setIsMediumOrSmaller] = useState(window.innerWidth < 992);

  const [initialLoad, setInitialLoad] = useState(true);



  const lastScrollY = useRef(window.scrollY);
  const [showScrollingNavbar, setShowScrollingNavbar] = useState(false);




  // Track screen size on resize
  useEffect(() => {
    const handleResize = () => {
      setIsMediumOrSmaller(window.innerWidth < 992);
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (showSidebar && currentScrollY > lastScrollY.current) {
        setShowSidebar(false);
      }

      if (currentScrollY < 400) {
        setShowScrollingNavbar(false);
      } else if (currentScrollY < lastScrollY.current) {
        // scrolling up
        setShowScrollingNavbar(true);
      } else {
        // scrolling down
        setShowScrollingNavbar(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [showSidebar]);


  const shouldShowMobileSidebar = isMediumOrSmaller && showSidebar;

  const toggleSidebar = () => {
    if (isMediumOrSmaller) {
      setShowSidebar(prev => !prev);
    }
  };

  return (
    <header className="header_contentent">

      {isMediumOrSmaller && (
        <div
          className="mobile-topbardef d-flex justify-content-between align-items-center px-3 py-2 bg-dark w-100"

        >
          <div className="hamburger" onClick={toggleSidebar}>
            <i className="fas fa-bars text-white fs-4"></i>
          </div>
          <div className="social-iconst">
            <a href="https://www.linkedin.com/in/kamrul-hasan-journalist/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="text-white me-2"><i className="fa-brands fa-linkedin-in"></i></a>
            <a href="#" className="text-white me-2"><i className="fa-brands fa-x-twitter"></i></a>
            <a href="https://www.facebook.com/kamrul.hasan.75286" target="_blank" rel="noopener noreferrer" className="text-white me-2"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="https://www.instagram.com/kamrul4112/?igsh=cGNhMnp6ZW9nNHFt&utm_source=qr#" target="_blank" rel="noopener noreferrer" className="text-white"><i className="fa-brands fa-instagram"></i></a>
          </div>
        </div>
      )}

      {/* Top Bar hidden */}
      {isMediumOrSmaller && (
        <div
          className="mobile-topbar d-flex justify-content-between align-items-center px-3 py-2 bg-dark position-fixed w-100"
          style={{
            top: showScrollingNavbar ? "0" : "-100px",
            transition: "top 0.3s ease-in-out",
            zIndex: 1050,
          }}
        >
          <div className="hamburger" onClick={toggleSidebar}>
            <i className="fas fa-bars text-white fs-4"></i>
          </div>
          <div className="social-iconst">
            <a href="https://www.linkedin.com/in/kamrul-hasan-journalist/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="text-white me-2"><i className="fa-brands fa-linkedin-in"></i></a>
            <a href="#" className="text-white me-2"><i className="fa-brands fa-x-twitter"></i></a>
            <a href="https://www.facebook.com/kamrul.hasan.75286" target="_blank" rel="noopener noreferrer" className="text-white me-2"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="https://www.instagram.com/kamrul4112/?igsh=cGNhMnp6ZW9nNHFt&utm_source=qr#" target="_blank" rel="noopener noreferrer" className="text-white"><i className="fa-brands fa-instagram"></i></a>
          </div>
        </div>
      )}


      {/* Bootstrap Modal Sidebar for Small/Medium Devices */}
      {shouldShowMobileSidebar && (
        <div
          className="modal d-block bg-dark bg-opacity-75"
          tabIndex="-1"
          onClick={toggleSidebar}
          style={{ top: showSidebar ? "0" : "-100px", transition: "top 0.3s, opacity 0.3s", opacity: showSidebar ? 1 : 0 }}
        >
          <div
            className="modal-dialog"
            style={{ maxWidth: "300px", margin: "0" }}
            onClick={e => e.stopPropagation()}
          >
            <div className="modal-content bg-dark text-white">
              <div className="modal-header border-0">
                <h5 className="modal-title">মেনু</h5>
                <button type="button" className="btn-close btn-close-white" onClick={toggleSidebar}></button>
              </div>
              <div className="modal-body d-flex flex-column align-items-start">
                <ul className="nav flex-column w-100">
                  <li className="nav-item"><Link to="/home" className="nav-link text-white" onClick={() => setShowSidebar(false)}>হোম</Link></li>
                  <li className="nav-item"><Link to="/about-us" className="nav-link text-white" onClick={() => setShowSidebar(false)}>আমার আমি</Link></li>
                  <li className="nav-item"><Link to="/asarernoy" className="nav-link text-white" onClick={() => setShowSidebar(false)}>আষাঢ়ে নয়</Link></li>
                  <li className="nav-item"><Link to="/publishedreport" className="nav-link text-white" onClick={() => setShowSidebar(false)}>প্রকাশিত রিপোর্ট</Link></li>
                  <li className="nav-item"><Link to="/jetukuboliniaga" className="nav-link text-white" onClick={() => setShowSidebar(false)}>যেটুকু বলিনি আগে</Link></li>
                  <li className="nav-item"><Link to="/bookreading" className="nav-link text-white" onClick={() => setShowSidebar(false)}>বইপড়া</Link></li>
                  <li className="nav-item"><Link to="/listeningmusic" className="nav-link text-white" onClick={() => setShowSidebar(false)}>গান শোনা</Link></li>
                </ul>

                <div className="social-icons mt-3">
                  <a href="https://www.linkedin.com/in/kamrul-hasan-journalist/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="text-white me-2"><i className="fa-brands fa-linkedin-in"></i></a>
                  <a href="#" className="text-white me-2"><i className="fa-brands fa-x-twitter"></i></a>
                  <a href="https://www.facebook.com/kamrul.hasan.75286" target="_blank" rel="noopener noreferrer" className="text-white me-2"><i className="fa-brands fa-facebook-f"></i></a>
                  <a href="https://www.instagram.com/kamrul4112/?igsh=cGNhMnp6ZW9nNHFt&utm_source=qr#" target="_blank" rel="noopener noreferrer" className="text-white"><i className="fa-brands fa-instagram"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {!isMediumOrSmaller && (
        <div
          className="fixed-toplarge bg-dark d-flex justify-content-center py-2 shadow z-3"
          style={{ top: showScrollingNavbar ? "0" : "-100px", opacity: showScrollingNavbar ? 1 : 0, position: "fixed", width: "100%", zIndex: 1050 }}
        >

          <ul className="nav text-white">
            <li className="nav-item"><Link to="/home" className="nav-link text-white">হোম</Link></li>
            <li className="nav-item"><Link to="/about-us" className="nav-link text-white">আমার আমি</Link></li>
            <li className="nav-item"><Link to="/asarernoy" className="nav-link text-white">আষাঢ়ে নয়</Link></li>
            <li className="nav-item"><Link to="/publishedreport" className="nav-link text-white">প্রকাশিত রিপোর্ট</Link></li>
            <li className="nav-item"><Link to="/jetukuboliniaga" className="nav-link text-white">যেটুকু বলিনি আগে</Link></li>
            <li className="nav-item"><Link to="/bookreading" className="nav-link text-white">বইপড়া</Link></li>
            <li className="nav-item"><Link to="/listeningmusic" className="nav-link text-white">গান শোনা</Link></li>
          </ul>
        </div>
      )}

      {/* Main Content */}
      <section className="header">
        <div className="container-fluid">
          <div className="row">
            {/* Sidebar for Large Screens */}
            {!isMediumOrSmaller && (
              <div className="leftsidebar col-md-2 d-flex flex-column justify-content-center align-items-center text-left">
                <ul className="navh font-weight-bold flex-column">
                  <li className="nav-item"><Link to="/home" className="nav-link font-weight-bold">হোম</Link></li>
                  <li className="nav-item"><Link to="/about-us" className="nav-link">আমার আমি</Link></li>
                  <li className="nav-item"><Link to="/asarernoy" className="nav-link">আষাঢ়ে নয়</Link></li>
                  <li className="nav-item"><Link to="/publishedreport" className="nav-link">প্রকাশিত রিপোর্ট</Link></li>
                  <li className="nav-item"><Link to="/jetukuboliniaga" className="nav-link">যেটুকু বলিনি আগে</Link></li>
                  <li className="nav-item"><Link to="/bookreading" className="nav-link">বইপড়া</Link></li>
                  <li className="nav-item"><Link to="/listeningmusic" className="nav-link">গান শোনা</Link></li>
                </ul>
                <div className="social-icons mt-4">
                  <a href="https://www.linkedin.com/in/kamrul-hasan-journalist/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="text-white me-1"><i className="fa-brands fa-linkedin-in"></i></a>
                  <a href="#" className="text-white me-1"><i className="fa-brands fa-x-twitter"></i></a>
                  <a href="https://www.facebook.com/kamrul.hasan.75286" target="_blank" rel="noopener noreferrer" className="text-white me-1"><i className="fa-brands fa-facebook-f"></i></a>
                  <a href="https://www.instagram.com/kamrul4112/?igsh=cGNhMnp6ZW9nNHFt&utm_source=qr#" target="_blank" rel="noopener noreferrer" className="text-white"><i className="fa-brands fa-instagram"></i></a>
                </div>
              </div>
            )}

            {/* Middle Content */}
            <div id="home"
              className={`col-12 ${isMediumOrSmaller ? "col-md-6" : "col-md-4"
                } middelsidebar text-center d-flex flex-column  justify-content-center`}
            >
              <div>

                <div className="text-container">
                  <div className="helloi">হ্যালো, আমি</div>
                  <div className="main-text">কামরুল হাসান</div>
                  <div className="sub-text">গণমাধ্যম কর্মী (সাংবাদিক)</div>
                </div>

              </div>

              {/* <p className="desination text-end">গণমাধ্যম কর্মী (সাংবাদিক)</p> */}
            </div>

            {/* Right Content */}
            <div className="col-md-6 col-12 rightsidebar text-center d-flex flex-column justify-content-center align-items-center">
              <div className="image-wrapper">
                <img src="/images/kamrulhasan.webp
                " alt="kamrulhasan" className="img-fluid profile-image" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </header>
  );

};

export default Header;
