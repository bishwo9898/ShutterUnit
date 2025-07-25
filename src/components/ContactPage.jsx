import React, { useRef, useState } from "react";
import Navbar from "./Navbar";
import emailjs from "@emailjs/browser";

function ContactPage() {
  const form = useRef();
  const [status, setStatus] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("sending");

    emailjs
      .sendForm(
        "service_c00qc38",      // Your Service ID
        "template_9wywbu6",     // Your Template ID
        form.current,
        "3NscLatFm5Wsdzb6m"    // Your Public Key
      )
      .then(
        () => {
          setStatus("sent");
          form.current.reset();
        },
        (error) => {
          console.error("EmailJS error:", error.text || error);
          setStatus("error");
        }
      );
  };

  return (
    <div className="w-screen min-h-[100dvh] flex flex-col">
      <Navbar />

      {/* Background and Overlay */}
      <div className="relative flex-grow w-full">
        <img
          src="/contact.png"
          alt="Photography Portfolio Hero"
          className="w-full h-[40vh] sm:h-[60vh] md:h-[80vh] object-cover object-center"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-[rgba(32,32,32,0.26)] pointer-events-none"></div>

        {/* Title */}
        <div className="absolute top-1/3 left-0 w-full z-20 flex justify-center px-4 sm:px-10">
          <h1
            className="text-white text-2xl sm:text-3xl md:text-4xl font-serif text-center"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {/* text goes here if needed */}
          </h1>
        </div>

        {/* Description Paragraph with background bar */}
        <div className="relative w-full flex justify-center px-2 sm:px-6 md:px-12 mt-4 sm:mt-8">
          <div className="bg-[rgba(0,0,0,0.5)] backdrop-blur-md px-4 sm:px-8 py-4 sm:py-6 rounded-md shadow-lg w-full max-w-2xl md:max-w-4xl">
            <p
              className="text-white text-center text-sm sm:text-base md:text-lg leading-relaxed tracking-wide font-normal"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Ready to capture your story? Fill out the form below and expect a personal response within 24 hours. Our wedding photography sessions span the entire day—from the quiet anticipation in the morning to the final dance under the stars. Luxury collections also feature handcrafted albums, pre-wedding shoots, and tailored enhancements to make your memories timeless.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="relative w-full flex flex-col items-center justify-center px-2 sm:px-6 md:px-12 mt-4 sm:mt-8 mb-8">
          <form
            ref={form}
            onSubmit={sendEmail}
            className="bg-gray bg-opacity-5 backdrop-blur-lg p-4 sm:p-5 rounded-md w-full max-w-2xl md:max-w-4xl shadow-xl space-y-4 sm:space-y-5 text-sm"
          >
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <input
                type="text"
                name="first_name"
                placeholder="First Name"
                className="flex-1 border border-gray-300 px-3 py-2 rounded bg-white/80"
                required
              />
              <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                className="flex-1 border border-gray-300 px-3 py-2 rounded bg-white/80"
                required
              />
            </div>

            <input
              type="email"
              name="user_email"
              placeholder="Email"
              className="w-full border border-gray-300 px-3 py-2 rounded bg-white/80"
              required
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              className="w-full border border-gray-300 px-3 py-2 rounded bg-white/80"
              required
            />

            <select
              name="inquiry"
              className="w-full border border-gray-300 px-3 py-2 rounded bg-white/80"
              required
            >
              <option value="">Type of Inquiry</option>
              <option value="Portraits">Portraits</option>
              <option value="Wedding">Wedding</option>
              <option value="Engagement">Engagement</option>
              <option value="Other">Other</option>
            </select>

            <textarea
              name="message"
              placeholder="Additional remarks (optional)"
              className="w-full border border-gray-300 px-3 py-2 rounded h-24 resize-none bg-white/80"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-black text-white uppercase tracking-widest py-3 rounded hover:bg-gray-800 transition"
            >
              Submit
            </button>

            {status === "sending" && (
              <p className="text-gray-600 text-center">Sending message...</p>
            )}
            {status === "sent" && (
              <p className="text-green-600 text-center">Thanks! We'll get back to you soon.</p>
            )}
            {status === "error" && (
              <p className="text-red-600 text-center">Something went wrong. Please try again.</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
