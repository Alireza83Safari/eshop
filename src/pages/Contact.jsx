import React from "react";
import Header from ".././pages/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
export default function Contact() {
  const usersData = [
    {
      id: 1,
      city: "NEW YORK, US",
      name: "Katherine",
      favorite: "Loves soup.",
      img: "/images/person-1.png",
      alt: "person-1",
    },
    {
      id: 2,
      city: "RIO DE JANEIRO, BRAZIL",
      name: "Rodrigo",
      favorite: "Listening to Kylie Minogue.",
      img: "/images/person-2.jpg",
      alt: "person-2",
    },
    {
      id: 3,
      city: "PENNSYLVANIA, US",
      name: "Chandler",
      favorite: "Professional visitor of beaches.",
      img: "/images/person-3.png",
      alt: "person-3",
    },
    {
      id: 4,
      city: "TEXAS, US",
      name: "Brittany",
      favorite: "#1 fan of golden retrievers.",
      img: "/images/person-4.png",
      alt: "person-4",
    },
  ];
  const supportData = [
    {
      id: 1,
      title: "Call support",
      text: "Our Support team is just a click away",
      btn: "Call now",
      to: "https://mail.google.com",
    },
    {
      id: 2,
      title: "Email support",
      text: "Prefer to email? Send us an email and well get back to you soon.",
      btn: "Send email",
      to: "https://mail.google.com",
    },
    {
      id: 3,
      title: "Help center",
      text: "Our self-server help center is open 24/7 with 150+ articles to help",
      btn: "Visit Help Center",
      to: "https://mail.google.com",
    },
  ];
  return (
    <>
      <Header />
      <Sidebar />
      <section
        className="py-16 mt-24
       relative m-auto min-h-screen xl:px-20 px-5 text-center"
      >
        <h1 className="text-4xl text-center font-semibold dark:text-white-100">
          Get in touch with our creator-frendly support team
        </h1>
        <p className="text-sm text-center my-16 dark:text-white-100">
          Out business are 9AM-6Pm ET Monday-Friday and 9AM-5PM ET on weekends
        </p>
        <div className="grid md:grid-cols-3 grid-cols-1">
          {supportData.map((item) => (
            <div
              className="bg-white-200 dark:bg-black-900 dark:text-white-100 py-5 md:mx-5 mx-2 px-3 rounded-lg md:my-0 my-4"
              key={item.id}
            >
              <h5 className="text-center text-lg font-semibold">
                {item.title}
              </h5>
              <p className="text-center text-sm my-5">{item.text}</p>
              <Link
                to={item.to}
                className="text-center flex justify-center items-center m-auto text-blue-600 font-bold"
              >
                {item.btn}
                <FontAwesomeIcon icon={faArrowRight} className="ml-1" />
              </Link>
            </div>
          ))}
        </div>
        <p className="text-sm mt-10 dark:text-white-100">our support team</p>
        <h2 className="text-3xl font-semibold my-4 dark:text-white-100">Talk to real people</h2>
        <p className="dark:text-white-100">
          Amazing customer support is the #1 reason our creators cite for
          choosing Podia. Our team knows that the enterpreneurial journey comes
          with challenges , and we are here to help you every step of the way.
        </p>
        <div className="grid sm:grid-cols-4 grid-cols-2 mt-14">
          {usersData.map((item) => (
            <div key={item.id} className="sm:mb-0 mb-4">
              <div className="w-24 h-24 flex justify-center m-auto">
                <img
                  src={item.img}
                  alt="person-1"
                  className="w-24 h-24 rounded-full"
                />
              </div>
              <p className="text-gray-800 mt-5 sm:text-base text-sm">
                {item.city}
              </p>
              <p className="my-1 sm:text-base text-sm dark:text-white-100">{item.name}</p>
              <p className="text-gray-800 sm:text-base text-sm">{item.name}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
