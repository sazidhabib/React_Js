import { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../index.css";
import { HashLink } from "react-router-hash-link";

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
      <div className="mobile-topbar d-flex justify-content-between align-items-center px-3 py-2 bg-dark">
        <div className="hamburger" onClick={toggleSidebar}>
          <i className="fas fa-bars text-white fs-4"></i>
        </div>
        <div className="social-iconst">
          <a href="#" className="text-white me-2"><i className="fa-brands fa-linkedin-in"></i></a>
          <a href="#" className="text-white me-2"><i className="fa-brands fa-x-twitter"></i></a>
          <a href="#" className="text-white me-2"><i className="fa-brands fa-facebook-f"></i></a>
          <a href="#" className="text-white"><i className="fa-brands fa-instagram"></i></a>
        </div>
      </div>

      {/* Bootstrap Modal Sidebar for Small/Medium Devices */}
      {isMediumOrSmaller && showSidebar && (
        <div className="modal d-block bg-dark bg-opacity-75" tabIndex="-1" onClick={toggleSidebar}>
          <div className="modal-dialog" style={{ maxWidth: "300px", margin: "0" }} onClick={e => e.stopPropagation()}>
            <div className="modal-content bg-dark text-white">
              <div className="modal-header border-0">
                <h5 className="modal-title">মেনু</h5>
                <button type="button" className="btn-close btn-close-white" onClick={toggleSidebar}></button>
              </div>
              <div className="modal-body d-flex flex-column align-items-start">
                <ul className="nav flex-column w-100">
                  <li className="nav-item"><HashLink smooth to="#home" className="nav-link text-white">হোম</HashLink></li>
                  <li className="nav-item"><HashLink smooth to="#about-us" className="nav-link text-white">আমার আমি</HashLink></li>
                  <li className="nav-item"><HashLink smooth to="#asarernoy" className="nav-link text-white">আষাঢ়ে নয়</HashLink></li>
                  <li className="nav-item"><HashLink smooth to="#publishedreport" className="nav-link text-white">প্রকাশিত রিপোর্ট</HashLink></li>
                  <li className="nav-item"><HashLink smooth to="#jetukuboliniaga" className="nav-link text-white">যেটুকু বলিনি আগে</HashLink></li>
                  <li className="nav-item"><HashLink smooth to="#bookreading" className="nav-link text-white">বইপড়া</HashLink></li>
                  <li className="nav-item"><HashLink smooth to="#listeningmusic" className="nav-link text-white">গান শোনা</HashLink></li>
                </ul>

                <div className="social-icons mt-3">
                  <a href="#" className="text-white me-2"><i className="fa-brands fa-linkedin-in"></i></a>
                  <a href="#" className="text-white me-2"><i className="fa-brands fa-x-twitter"></i></a>
                  <a href="#" className="text-white me-2"><i className="fa-brands fa-facebook-f"></i></a>
                  <a href="#" className="text-white"><i className="fa-brands fa-instagram"></i></a>
                </div>
              </div>
            </div>
          </div>
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
                  <li className="nav-item"><HashLink smooth to="#home" className="nav-link font-weight-bold">হোম</HashLink></li>
                  <li className="nav-item"><HashLink smooth to="#about-us" className="nav-link">আমার আমি</HashLink></li>
                  <li className="nav-item"><HashLink smooth to="#asarernoy" className="nav-link">আষাঢ়ে নয়</HashLink></li>
                  <li className="nav-item"><HashLink smooth to="#publishedreport" className="nav-link">প্রকাশিত রিপোর্ট</HashLink></li>
                  <li className="nav-item"><HashLink smooth to="#jetukuboliniaga" className="nav-link">যেটুকু বলিনি আগে</HashLink></li>
                  <li className="nav-item"><HashLink smooth to="#bookreading" className="nav-link">বইপড়া</HashLink></li>
                  <li className="nav-item"><HashLink smooth to="#listeningmusic" className="nav-link">গান শোনা</HashLink></li>
                </ul>
                <div className="social-icons mt-4">
                  <a href="#" className="text-white me-1"><i className="fa-brands fa-linkedin-in"></i></a>
                  <a href="#" className="text-white me-1"><i className="fa-brands fa-x-twitter"></i></a>
                  <a href="#" className="text-white me-1"><i className="fa-brands fa-facebook-f"></i></a>
                  <a href="#" className="text-white"><i className="fa-brands fa-instagram"></i></a>
                </div>
              </div>
            )}

            {/* Middle Content */}
            <div
              className={`col-12 ${isMediumOrSmaller ? "col-md-6" : "col-md-4"
                } middelsidebar text-center d-flex flex-column justify-content-center align-items-center p-4`}
            >
              <p className="helloi">হ্যালো, আমি</p>
              <h2 className="name">কামরুল হাসান</h2>
              <p className="desination">গণমাধ্যম কর্মী (সাংবাদিক)</p>
            </div>

            {/* Right Content */}
            <div className="col-md-6 col-12 rightsidebar text-center d-flex flex-column justify-content-center align-items-center p-4">
              <div className="image-wrapper mt-4">
                <img src="/images/kamrulhasan.jpg" alt="kamrulhasan" className="img-fluid profile-image" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </header>
  );

};

export default Header;
