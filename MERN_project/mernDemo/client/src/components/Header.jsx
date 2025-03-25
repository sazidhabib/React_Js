
import "@fortawesome/fontawesome-free/css/all.min.css";
import '../index.css';

const Header = () => {
  return (
    <header>
      <section className="header">
        <div className="container-fluid">
          <div className="row">
            {/* Left Sidebar */}
            <div
              id="menubar"
              className="col-md-2 col-12 leftsidebar text-left d-flex flex-column justify-content-center align-items-center"
            >
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
            <div className="col-md-4 col-12 middelsidebar text-center d-flex flex-column justify-content-center align-items-center p-4">
              <p className="helloi">হ্যালো, আমি</p>
              <h2 className="name">কামরুল হাসান</h2>

              <p className="desination">গণমাধ্যম কর্মী (সাংবাদিক)</p>
            </div>

            {/* Right Sidebar (Image) */}
            <div className="col-md-6 col-12 rightsidebar text-center d-flex flex-column justify-content-center align-items-center p-4">
              <div className="image-wrapper mt-4">
                <img
                  src="/images/কামরুল হাসান .jpg"
                  alt="কামরুল হাসান"
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
