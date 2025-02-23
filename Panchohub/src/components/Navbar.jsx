import { useState, useEffect } from "react";

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={` fixed top-0 left-0 w-full z-50 ${
        scrolled ? "bg-sky-" : "bg-transparent"
      }`}
    >
      <a href="index.html" className="text-white">
        <img src="image/PonchoHub.jpg" height="30" width="147" alt="logo" />
      </a>
      <nav className="container mx-auto flex items-center justify-between py-4 px-4 md:px-8 lg:px-16">
        {/* Logo */}
        {/* <a href="index.html" className="text-white">
          <img src="image/PonchoHub.jpg" height="30" width="147" alt="logo" />
        </a> */}

        {/* Navbar toggler */}
        <button
          className="block lg:hidden text-black focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <svg
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5h14a1 1 0 110 2H3a1 1 0 110-2zm0 4h14a1 1 0 110 2H3a1 1 0 110-2zm0 4h14a1 1 0 110 2H3a1 1 0 110-2z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>

        {/* Menu */}
        <ul
          className={`absolute top-full left-0 w-full bg-gray-900 text-black lg:static lg:flex lg:bg-transparent lg:space-x-8 lg:w-auto ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <li className="py-2 px-4 lg:py-0">
            <a href="" className="hover:text-gray-300">
              Home
            </a>
          </li>
          <li className="py-2 px-4 lg:py-0">
            <a href="about.html" className="hover:text-gray-300">
              About
            </a>
          </li>
          <li className="py-2 px-4 lg:py-0">
            <a href="blog.html" className="hover:text-gray-300">
              Blog
            </a>
          </li>
          <li className="py-2 px-4 lg:py-0">
            <a href="features.html" className="hover:text-gray-300">
              Features
            </a>
          </li>
          <li className="py-2 px-4 lg:py-0">
            <a href="how-it-works.html" className="hover:text-gray-300">
              How It Works
            </a>
          </li>
          <li className="py-2 px-4 lg:py-0 relative group">
            <span className="inline-flex items-center cursor-pointer hover:text-gray-300">
              Pages
              <svg
                className="ml-1 h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5.293 9.707a1 1 0 011.414 0L10 12.586l3.293-2.879a1 1 0 111.414 1.414l-4 3.5a1 1 0 01-1.414 0l-4-3.5a1 1 0 010-1.414z" />
              </svg>
            </span>
            <ul className="absolute left-0 mt-2 hidden w-40 bg-gray-800 text-white group-hover:block lg:mt-0">
              <li>
                <a
                  href="career.html"
                  className="block px-4 py-2 hover:bg-gray-700"
                >
                  Career
                </a>
              </li>
              <li>
                <a
                  href="career-single.html"
                  className="block px-4 py-2 hover:bg-gray-700"
                >
                  Career Single
                </a>
              </li>
              <li>
                <a
                  href="integrations.html"
                  className="block px-4 py-2 hover:bg-gray-700"
                >
                  Integrations
                </a>
              </li>
              <li>
                <a
                  href="pricing.html"
                  className="block px-4 py-2 hover:bg-gray-700"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="terms-conditions.html"
                  className="block px-4 py-2 hover:bg-gray-700"
                >
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </li>
          <li className="py-2 px-4 lg:py-0">
            <a href="contact.html" className="hover:text-gray-300">
              Contact
            </a>
          </li>
        </ul>

        {/* Sign-up button */}
        <div className="hidden lg:block">
          <a
            href="signin.html"
            className="btn btn-white btn-sm bg-transparent border border-slate-700 text-black hover:bg-white hover:text-gray-300"
          >
            Sign Up Now
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
