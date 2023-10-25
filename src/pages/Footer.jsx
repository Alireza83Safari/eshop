import React from "react";

const Footer = () => {
  return (
    <footer className="min-w-full">
      <div className="bg-white-300 dark:bg-black-900 text-black-900 z-20 dark:text-white-100">
        <div className="xl:container mx-auto py-8 px-4">
          <div className="grid grid-cols-1 md:flex md:justify-between gap-4">
            <div className="footer-section ">
              <p className="text-sm">Subscribe to our news:</p>
              <form className="mt-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-600 sm:text-base text-sm" 
                />
                <button
                  type="submit"
                  className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-700 text-white-100 sm:text-base text-sm"
                >
                  Subscribe
                </button>
              </form>
            </div>
            <div className="footer-section">
              <h3 className="text-base font-semibold mb-4">About Us</h3>
              <p className="text-sm w-72">
                Insert a brief description of your website or company here. You
                can also include your mission statement or values.
              </p>
            </div>
            <div className="footer-section">
              <h3 className="text-base font-semibold mb-4">Quick Links</h3>
              <ul className="text-gray-300 hover:text-white text-sm">
                <li>
                  <a href="#" className="">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 w-20 hover:text-white">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Products
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-section">
              <h3 className="text-base font-semibold mb-4">Contact Us</h3>
              <p className="text-sm">
                Email: info@example.com
                <br />
                Phone: +1 (123) 456-7890
                <br />
                Address: 1234 Street, City, Country
              </p>
              <div className="mt-4">
                <p className="text-sm">For inquiries, please email us at:</p>
                <a
                  href="mailto:info@example.com"
                  className="text-blue-600 hover:text-blue-800"
                >
                  info@example.com
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="py-4">
          <div className="container mx-auto text-center text-gray-800 sm:text-base text-sm">
            <p>&copy; {new Date().getFullYear()} Eshop. All rights reserved.</p>
            <p>Designed and developed by Alireza Safari.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
