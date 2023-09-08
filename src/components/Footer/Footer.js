import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="first-col">
        <h1 className="company-name">QEsate Homes</h1>
        <div className="company-description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati,
          rerum perferendis adipisci harum, quam accusantium rem quas quae
          laudantium dolores maxime! Officiis esse ducimus quibusdam repellat,
          delectus commodi doloribus dolores!
        </div>
      </div>
      <div className="second-col">
        <h1 className="link-header">Contacts</h1>
        <ul className="link-lists">
          <li>Bengaluru, India</li>
          <li>qestate@gmail.com</li>
          <li>+91900000112</li>
          <li>+021 93489223</li>
        </ul>
      </div>
    </div>
  );
}
