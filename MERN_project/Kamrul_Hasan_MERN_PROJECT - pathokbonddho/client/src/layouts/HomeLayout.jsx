import React, { useEffect, useRef, useState, Suspense, lazy } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollToSection from "../components/ScrollToSection";
import PageRenderer from "../components/PageRenderer";

const HomeLayout = () => {

  return (
    <>
      <ScrollToSection />


      <main className="main-content">
        {/* Render the dynamic 'Home' page layout */}
        <PageRenderer slug="home" />
      </main>

      <Footer />
    </>
  );
};

export default HomeLayout;
