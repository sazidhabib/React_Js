import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  meta,
  starbucks,
  tesla,
  shopify,
  snapshop,
  kamrulhasan,
  pharmasphere,
  movie,
  threejs,
  shopCard,
  FoodOrder,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "project",
    title: "Project",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Web Developer",
    icon: web,
  },
  {
    title: "React Developer",
    icon: mobile,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "Game Developer",
    icon: creator,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
];

const experiences = [
  {
    title: "Junior Web Developer",
    company_name: "Ajker Patrika",
    icon: starbucks,
    iconBg: "#383E56",
    date: "Mar 2025 - Present",
    points: [
      "Developed and maintained several in-house projects including dynamic event pages and feature-rich sections.",
      "Utilized React, Node.js, Express.js, MongoDB, MySQL, and Laravel for full-stack development.",
      "Implemented customized web pages ensuring seamless integration and optimized performance across the platform.",
    ],
  },
  {
    title: "Frontend Developer Intern",
    company_name: "Brain Station 23",
    icon: tesla,
    iconBg: "#E6DEDD",
    date: "Sep 2024 - Feb 2025",
    points: [
      "Developed 'PharmaSphere,' a pharmacy-based e-commerce site using the MERN stack.",
      "Built responsive web platforms with React, TypeScript, Tailwind CSS, REST APIs, Context API, and Redux.",
      "Focused on secure payment integrations, efficient database structures, and user-friendly interfaces.",
    ],
  },
  {
    title: "Junior Unity Developer",
    company_name: "Imaginary Workstation",
    icon: shopify,
    iconBg: "#383E56",
    date: "Aug 2023 - Oct 2024",
    points: [
      "Developed 2D and 3D games for Android at a software company specializing in mixed-reality games.",
      "Created particle systems, shaders, textures, and animations for natural and magical phenomena.",
      "Started independently and later joined a team of 5 colleagues in key company roles.",
    ],
  },
  {
    title: "Joint Treasurer",
    company_name: "Green University Computer Club",
    icon: meta,
    iconBg: "#E6DEDD",
    date: "June 2020 - Jun 2022",
    points: [
      "Organized various university events including Programming Contests, 3-Minute Presentations, and Gaming Contests.",
      "Coordinated Webinars and Workshops for the Computer Science department.",
      "Served in a leadership role managing club activities and events.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "Sazid delivered an outstanding portfolio website that perfectly captured my vision. His attention to detail and modern design approach made the collaboration seamless.",
    name: "Kamrul Hasan",
    designation: "Journalist",
    company: "Ajker Patrika",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    testimonial:
      "Working with Sazid on PharmaSphere was a great experience. His MERN stack expertise and commitment to clean code made our e-commerce platform robust and scalable.",
    name: "Shafquatul Bari",
    designation: "Team Lead",
    company: "Brain Station 23",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    testimonial:
      "Sazid's ability to quickly learn and implement new technologies is impressive. His contributions to our game development projects showed real creativity and technical skill.",
    name: "Tanvir Ahmed",
    designation: "Project Manager",
    company: "Imaginary Workstation",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
  },
];

const projects = [
  {
    name: "kamrulhasan",
    description:
      "This project is a dynamic personal website developed for journalist Kamrul Hasan. It serves as an interactive platform to showcase his writings, reflections, experiences, and published reports, offering readers valuable insights into various topics. The website is primarily in Bengali, targeting Bengali-speaking audiences, and is designed with a focus on readability, user engagement, and content accessibility. From top to bottom, every section of the website is fully dynamic and customizable through its powerful admin panel, allowing seamless management of content, including articles, reports, multimedia, and even the website’s menu structure.",
    tags: [
      {
        name: "React",
        color: "blue-text-gradient",
      },
      {
        name: "JavaScript",
        color: "green-text-gradient",
      },
      {
        name: "Tailwind",
        color: "pink-text-gradient",
      },
      {
        name: "MERN",
        color: "blue-text-gradient",
      },
      {
        name: "e-commerce",
        color: "pink-text-gradient",
      },
    ],
    image: kamrulhasan,
    source_code_link: "https://github.com/sazidhabib/React_Js/tree/main/MERN_project",
  },
  {
    name: "PharmaSphere",
    description:
      "A pharmacy-based e-commerce platform offering a seamless shopping experience for medicines and healthcare products. Built using the MERN stack, PharmaSphere features a secure payment system with Stripe, a dynamic admin panel for inventory management, and a user-friendly interface with advanced search and sorting capabilities",
    tags: [
      {
        name: "React",
        color: "blue-text-gradient",
      },
      {
        name: "JavaScript",
        color: "green-text-gradient",
      },
      {
        name: "Tailwind",
        color: "pink-text-gradient",
      },
      {
        name: "MERN",
        color: "blue-text-gradient",
      },
      {
        name: "e-commerce",
        color: "pink-text-gradient",
      },
    ],
    image: pharmasphere,
    source_code_link: "https://github.com/shafquatulbari/mern-e-commerce",
  },
  {
    name: "SnapShop",
    description:
      "This is a responsive e-commerce platform built with TypeScript, React, and Tailwind CSS. It features product management, user authentication, user information and user-specific functionalities such as a wishlist and shopping cart.",
    tags: [
      {
        name: "React",
        color: "blue-text-gradient",
      },
      {
        name: "TypeScript",
        color: "green-text-gradient",
      },
      {
        name: "REST APIs",
        color: "pink-text-gradient",
      },
      {
        name: "e-commerce",
        color: "green-text-gradient",
      },
    ],
    image: snapshop,
    source_code_link: "https://github.com/sazidhabib/SnapShop_e-commerce",
  },
  {
    name: "Movie List Website",
    description:
      "A simple and user-friendly website to explore movies and TV shows, built using React and styled with styled-components or Tailwind CSS. This project allows users to keep track of their favorite movies and provides features for managing a personal watchlist.",
    tags: [
      {
        name: "React",
        color: "blue-text-gradient",
      },
      {
        name: "JavaScript",
        color: "green-text-gradient",
      },
      {
        name: "useContext",
        color: "pink-text-gradient",
      },
    ],
    image: movie,
    source_code_link: "https://github.com/sazidhabib/MovieListingWebsite",
  },
  {
    name: "Product Detail & Add to Cart",
    description:
      "This project is a responsive product detail page built with React, JavaScript, and useContext. The page allows users to select product options such as color, size, and quantity while dynamically updating the product image, price, and cart details.",
    tags: [
      {
        name: "React",
        color: "blue-text-gradient",
      },
      {
        name: "JavaScript",
        color: "green-text-gradient",
      },
      {
        name: "UseContext",
        color: "pink-text-gradient",
      },
    ],
    image: shopCard,
    source_code_link: "https://github.com/sazidhabib/shopcardreact/tree/master",
  },
  {
    name: "Food Ordering App",
    description:
      "This project is a responsive product detail page built with React, JavaScript, and useContext. The page allows users to select product options such as color, size, and quantity while dynamically updating the product image, price, and cart details.",
    tags: [
      {
        name: "React",
        color: "blue-text-gradient",
      },
      {
        name: "JavaScript",
        color: "green-text-gradient",
      },
      {
        name: "Redux",
        color: "pink-text-gradient",
      },
      {
        name: "Router",
        color: "green-text-gradient",
      },
    ],
    image: FoodOrder,
    source_code_link: "https://github.com/sazidhabib/FoodCardApp_React_Redux",
  },
];

export { services, technologies, experiences, testimonials, projects };
