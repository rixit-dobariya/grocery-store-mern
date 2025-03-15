import React from "react";
import { Link } from "react-router-dom";

const About = ({ content}) => {
  return (
    <div className="container sitemap mt-5">
      <p>
        <Link
            to="/"
            className="text-decoration-none dim link"
        >
            Home /
        </Link>{" "}
        About
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
            <p>
                Our journey started with a simple vision – to make high-quality, vegetarian food accessible 
                to everyone. Over the years, we have built strong relationships with farmers and suppliers 
                who share our values of sustainability and ethical sourcing.
            </p>
            <p>
                We continuously strive to expand our product range, bringing you new and exciting vegetarian 
                options. From farm-fresh vegetables to ready-to-eat healthy meals, we are here to cater to all 
                your dietary needs.
            </p>
            <p>
                Connect with us on social media to stay updated with our latest products, offers, and healthy 
                eating tips. We love hearing from our customers and are always happy to assist you with any queries.
            </p>
        </div>
      </div>
    </div>
  );
};

export default About;
