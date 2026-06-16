import React from "react";
import { FiMapPin, FiMail, FiPhone, FiClock } from "react-icons/fi";
import FadeIn from "../../components/Shared/FadeIn";

const Contact = () => {
  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-base-100 px-4 py-12">
      
      <div className="w-full max-w-6xl">
        {/* Section Title */}
        <FadeIn>
        <div className="mb-16 text-center">
          <p className="mb-2 text-sm font-bold uppercase tracking-widest text-secondary">
            Get in Touch
          </p>
          <h1 className="text-primary">
            Contact Information
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-base-content/70">
            Reach out to our team for any inquiries regarding tuitions.
          </p>
        </div>

        </FadeIn>

        {/* Contact Information Grid - Static Cards */}
        <FadeIn delay={0.2}>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Card 1: Office Address */}
          <div className="rounded-2xl border border-base-300 bg-base-200 p-8 text-center">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <FiMapPin size={24} />
            </div>
            <h3 className="mb-3 text-lg font-bold text-base-content">Our Office</h3>
            <p className="text-sm leading-relaxed text-base-content/70">
              123 Education Street,<br />
              Dhanmondi, Dhaka - 1209
            </p>
          </div>

          {/* Card 2: Phone Number */}
          <div className="rounded-2xl border border-base-300 bg-base-200 p-8 text-center">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-secondary/10 text-secondary">
              <FiPhone size={24} />
            </div>
            <h3 className="mb-3 text-lg font-bold text-base-content">Phone</h3>
            <p className="text-sm leading-relaxed text-base-content/70">
              <span className="block mb-1">+880 1234 567 890</span>
              <span className="block text-xs opacity-80">(Mon-Fri, 9am-6pm)</span>
            </p>
          </div>

          {/* Card 3: Email Address */}
          <div className="rounded-2xl border border-base-300 bg-base-200 p-8 text-center">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
              <FiMail size={24} />
            </div>
            <h3 className="mb-3 text-lg font-bold text-base-content">Email</h3>
            <p className="text-sm leading-relaxed text-base-content/70">
              support@etuitionbd.com<br />
              info@etuitionbd.com
            </p>
          </div>

          {/* Card 4: Business Hours */}
          <div className="rounded-2xl border border-base-300 bg-base-200 p-8 text-center">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <FiClock size={24} />
            </div>
            <h3 className="mb-3 text-lg font-bold text-base-content">Working Hours</h3>
            <p className="text-sm leading-relaxed text-base-content/70">
              Mon - Fri: 9:00 AM - 6:00 PM<br />
              Sat - Sun: Closed
            </p>
          </div>

        </div>

        </FadeIn>
      </div>
    </div>
  );
};

export default Contact;