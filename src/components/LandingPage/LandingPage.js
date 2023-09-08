import React from "react";
import FeaturedListing from "../FeaturedListing/FeaturedListing";
import Header from "../Header/Header";
import HeroSection from "../HeroSection/HeroSection";
import "./LandingPage.css";
import Footer from "../Footer/Footer";

export default function LandingPage() {
  return (
    <div>
      <Header onPage="home" />
      <HeroSection />
      <div className="card-container">
        <h1 className="featured-listings-titile">
          Here are some of our featured listings:
        </h1>
        <FeaturedListing />
      </div>
      <Footer />
    </div>
  );
}
