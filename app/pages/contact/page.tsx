"use client"

import type React from "react"

import { useState } from "react"
import { PageLayout } from "@/components/page-layout"
import { MapPin, Phone, Mail, Loader2 } from "lucide-react"
import { GoogleMap } from "@/components/google-map"

export default function ContactPage() {
  const [isContactSubmitting, setIsContactSubmitting] = useState(false)
  const [isNewsletterSubmitting, setIsNewsletterSubmitting] = useState(false)

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Don't prevent default - let the form submit naturally
    setIsContactSubmitting(true)
    // FormSubmit will handle the redirect
  }

  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Don't prevent default - let the form submit naturally
    setIsNewsletterSubmitting(true)
    // FormSubmit will handle the redirect
  }

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Main heading */}
        <h1 className="text-3xl md:text-4xl text-black font-bold text-center mb-8">Contact Us</h1>

        {/* Description paragraph */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <p className="text-gray-700">
            We Value Your Interest And Involvement In The Cultured Man Community. Whether You Have Questions, Need
            Support, Or Want To Get More Involved, We're Here To Help. Below Are The Ways You Can Reach Out To Us
            Directly Or Stay Connected Through Our Updates.
          </p>
        </div>

        {/* Contact info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12 max-w-6xl mx-auto px-4 overflow-hidden">
          <div className="flex justify-center sm:justify-start sm:items-center">
            <h2 className="text-2xl text-black text-center font-bold">
              Get In
              <br />
              Touch
            </h2>
          </div>
          <a href="#" className="group">
            <div className="bg-black text-white p-4 py-6 rounded-2xl shadow-md flex items-center justify-center group-hover:bg-neutral-800 h-full">
              <MapPin className="h-8 w-8 mr-4 flex-shrink-0" />
              <span className="text-sm">The Cultured Man</span>
            </div>
          </a>
          <a href="tel:0533078542" className="group">
            <div className="bg-black text-white p-4 py-6 rounded-2xl shadow-md flex items-center justify-center group-hover:bg-neutral-800 h-full">
              <Phone className="h-8 w-8 mr-4 flex-shrink-0" />
              <span className="text-sm">+233 533078542</span>
            </div>
          </a>
          <a href="mailto:info-theculturedman@gmail.com" className="group sm:col-span-2 lg:col-span-1">
            <div className="bg-black text-white p-4 py-6 rounded-2xl shadow-md flex items-center justify-center group-hover:bg-neutral-800 h-full">
              <Mail className="h-8 w-8 mr-4 flex-shrink-0" />
              <span className="text-sm truncate">info.theculturedman@gmail.com</span>
            </div>
          </a>
        </div>

        {/* Contact form and map */}
        <div className="bg-white rounded-lg shadow-md md:p-8 p-2 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact form */}
            <div>
              <form
                action="https://formsubmit.co/2cd8fe56d03bf1dc7c4460dfcde9a017"
                method="POST"
                className="space-y-4 text-black"
                onSubmit={handleContactSubmit}
              >
                {/* FormSubmit configuration */}
                <input type="hidden" name="_subject" value="New Culturedman Contact Form Submission" />
                {/* <input type="hidden" name="_next" value="/pages/thank-you" /> */}
                <input type="hidden" name="_captcha" value="false" />
                <input type="text" name="_honey" style={{ display: "none" }} />

                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    className="w-full p-4 text-black bg-gray-100 border-none rounded-md"
                    required
                    // disabled={isContactSubmitting}
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    className="w-full p-4 text-black bg-gray-100 border-none rounded-md"
                    required
                    // disabled={isContactSubmitting}
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    rows={5}
                    className="w-full p-4 text-black bg-gray-100 border-none rounded-md"
                    required
                    // disabled={isContactSubmitting}
                  ></textarea>
                </div>
                <div className="flex items-center justify-center text-center">
                  <button
                    type="submit"
                    className="bg-black group text-white w-80 py-3 px-6 rounded-full flex items-center justify-center text-center"
                    onClick={()=> isContactSubmitting}
                    disabled={isContactSubmitting}
                  >
                    {isContactSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        <span>SENDING...</span>
                      </>
                    ) : (
                      <>
                        <span className="mr-2">SEND</span>
                        <span className="arrow-line"></span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Google Maps embed */}
            <GoogleMap height="100%" className="min-h-[400px]" />
          </div>
        </div>

        {/* Newsletter section */}
        <div className="relative rounded-lg overflow-hidden mb-12">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <div
            className="w-full h-[400px] bg-cover bg-center pt-10 bg-fixed"
            style={{
              backgroundImage: "url('/images/contact-bg.png')",
            }}
          >
            <div className="relative z-20 p-8 my-auto md:p-12 text-white text-center">
              <h2 className="text-2xl md:text-3xl font-bold my-4">Subscribe To Our News Letter</h2>
              <p className="mb-6">
                Become a part of the cultured man of the near future, leave us your email and we will be in touch..
              </p>
              <form
                action="https://formsubmit.co/2cd8fe56d03bf1dc7c4460dfcde9a017"
                method="POST"
                className="flex flex-col md:flex-row max-w-xl mx-auto"
                onSubmit={handleNewsletterSubmit}
              >
                {/* FormSubmit configuration */}
                <input type="hidden" name="_subject" value="New Culturedman Newsletter Subscription" />
                {/* <input type="hidden" name="_next" value="/pages/thank-you" /> */}
                <input type="hidden" name="_captcha" value="false" />
                <input type="text" name="_honey" style={{ display: "none" }} />

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="flex-grow p-4 bg-black text-white border-none rounded-l-md mb-2 md:mb-0"
                  required
                  onClick={()=> isNewsletterSubmitting}
                  // disabled={isNewsletterSubmitting}
                />
                <button
                  type="submit"
                  className="bg-white text-black px-8 py-4 rounded-r-md flex items-center justify-center"
                  disabled={isNewsletterSubmitting}
                >
                  {isNewsletterSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Subscribe"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
