import { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../index.css";

const Header = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMediumOrSmaller, setIsMediumOrSmaller] = useState(window.innerWidth < 992);

  // Track screen size on resize
  useEffect(() => {
    const handleResize = () => {
      setIsMediumOrSmaller(window.innerWidth < 992);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    if (isMediumOrSmaller) {
      setShowSidebar(prev => !prev);
    }
  };

  return (
    <header>
      {/* Top Bar */}
      <div className="mobile-topbar d-flex justify-content-between align-items-center px-3 py-2">
        <div className="hamburger" onClick={toggleSidebar}>
          <i className="fas fa-bars text-white fs-4"></i>
        </div>
        <div className="social-iconst">
          <a href="#" className="text-white me-2">
            <i className="fa-brands fa-linkedin-in"></i>
          </a>
          <a href="#" className="text-white me-2">
            <i className="fa-brands fa-x-twitter"></i>
          </a>
          <a href="#" className="text-white me-2">
            <i className="fa-brands fa-facebook-f"></i>
          </a>
          <a href="#" className="text-white">
            <i className="fa-brands fa-instagram"></i>
          </a>
        </div>
      </div>

      <section className="header">
        <div className="container-fluid">
          <div className="row">
            {/* Sidebar */}
            <div
              id="menubar"
              className={`leftsidebar col-md-2 col-12 text-left flex-column justify-content-center align-items-center ${showSidebar ? "d-flex" : "d-none d-md-flex"
                }`}
            >
              {/* Sidebar Content */}
              <ul className="navh font-weight-bold flex-column">
                <li className="nav-item">
                  <a href="#home" className="nav-link font-weight-bold">
                    হোম
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#about-us" className="nav-link">
                    আমার আমি
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#asarernoy" className="nav-link">
                    আষাঢ়ে নয়
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#publishedreport" className="nav-link">
                    প্রকাশিত রিপোর্ট
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#jetukuboliniaga" className="nav-link">
                    যেটুকু বলিনি আগে
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#bookreading" className="nav-link">
                    বইপড়া
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#listeningmusic" className="nav-link">
                    গান শোনা
                  </a>
                </li>
              </ul>

              {/* Social Icons */}
              <div className="social-icons mt-4">
                <a href="#" className="text-white me-1">
                  <i className="fa-brands fa-linkedin-in"></i>
                </a>
                <a href="#" className="text-white me-1">
                  <i className="fa-brands fa-x-twitter"></i>
                </a>
                <a href="#" className="text-white me-1">
                  <i className="fa-brands fa-facebook-f"></i>
                </a>
                <a href="#" className="text-white">
                  <i className="fa-brands fa-instagram"></i>
                </a>
              </div>
            </div>

            {/* Middle Content */}
            <div
              className={`col-12 ${isMediumOrSmaller ? (showSidebar ? "col-md-4" : "col-md-6") : "col-md-4"
                } middelsidebar text-center d-flex flex-column justify-content-center align-items-center p-4`}
            >
              <p className="helloi">হ্যালো, আমি</p>
              <h2 className="name">কামরুল হাসান</h2>
              <p className="desination">গণমাধ্যম কর্মী (সাংবাদিক)</p>
            </div>

            {/* Right Content */}
            <div className="col-md-6 col-12 rightsidebar text-center d-flex flex-column justify-content-center align-items-center p-4">
              <div className="image-wrapper mt-4">
                <img
                  src="/images/kamrulhasan.jpg"
                  alt="kamrulhasan"
                  className="img-fluid profile-image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </header>
  );
};

export default Header;
