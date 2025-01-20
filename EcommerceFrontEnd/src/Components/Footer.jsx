import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-white py-10">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand and Social Links */}
          <div>
            <h2 className="text-2xl font-bold mb-4">WEARHUB</h2>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-400">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="hover:text-gray-400">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="hover:text-gray-400">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="hover:text-gray-400">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold mb-4">SERVICES</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-gray-400">
                  Web Development
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Client Portal
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Resources
                </a>
              </li>
            </ul>
          </div>

          {/* Platforms */}
          <div>
            <h3 className="font-bold mb-4">PLATFORMS</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-gray-400">
                  Hubspot
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Integration Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Marketing Glossar
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  UIPath
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold mb-4">COMPANY</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-gray-400">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Events
                </a>
              </li>
            </ul>
          </div>

          {/* Additional */}
          <div>
            <h3 className="font-bold mb-4">ADDITIONAL</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-gray-400">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Partners
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Sitemap
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  News
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8 border-gray-700" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between text-sm text-gray-400">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="#" className="hover:text-gray-200">
              Terms of Service
            </a>
            <a href="#" className="hover:text-gray-200">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-200">
              Security
            </a>
          </div>
          <p>Copyright © 2024 Wearhub. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
