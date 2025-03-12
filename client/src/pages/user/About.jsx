import React from "react";

const About = ({ content}) => {
  return (
    <div className="container sitemap mt-5">
      <p>
        <a href="/" className="text-decoration-none dim link">
          Home /
        </a>
        <a href="/about" className="text-decoration-none dim link">
          About /
        </a>
      </p>
      <div className="about row justify-content-center">
        <div className="col-lg-12">
            <h2 className="mb-4">About Us</h2>
            <p>
                Welcome to <strong>PureBite</strong>, your trusted destination for high-quality and 
                pure vegetarian products. We are committed to providing you with the best selection 
                of organic and fresh ingredients, ensuring that every bite is pure, healthy, and delicious.
            </p>
            <p>
                Our mission is to promote a healthier lifestyle by offering products that are free from 
                artificial preservatives and harmful additives. Whether you’re looking for fresh produce, 
                grocery essentials, or specialty vegetarian items, we’ve got you covered.
            </p>
            <p>
                At <strong>PureBite</strong>, customer satisfaction is our priority. We take pride in sourcing 
                products from trusted suppliers and ensuring that every item meets the highest standards of quality.
            </p>
            <p>
                Thank you for choosing <strong>PureBite</strong>. We look forward to serving you with the best 
                vegetarian products available!
            </p>
        </div>
      </div>
    </div>
  );
};

export default About;
