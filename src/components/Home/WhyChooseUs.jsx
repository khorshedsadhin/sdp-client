import React from 'react';
import { Link } from 'react-router';
import { FiShield, FiDollarSign, FiCheckCircle, FiUserCheck } from 'react-icons/fi';
import Button from "../Shared/Button/Button";
import FadeIn from "../Shared/FadeIn";

const WhyChooseUs = () => {
  const features = [
    { 
      title: "Verified Tutors", 
      desc: "Every tutor passes a strict background check for safety.", 
      icon: FiShield 
    },
    { 
      title: "Secure Payment", 
      desc: "Transactions are safe, transparent, and fully tracked.", 
      icon: FiDollarSign 
    },
    { 
      title: "Dedicated Support", 
      desc: "Our support team is available 24/7 to assist you.", 
      icon: FiCheckCircle 
    },
    { 
      title: "Real Reviews", 
      desc: "100% genuine feedback from verified students.", 
      icon: FiUserCheck 
    },
  ];

  return (
    <section className="py-20 bg-base-100">
      <div className="container mx-auto px-4">
        
        {/* 1 */}
        
        <FadeIn>

        <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block rounded-full bg-primary/10 px-5 py-2 text-sm font-bold text-primary mb-4 uppercase tracking-wide">
              Why Choose Us
            </div>
            
            <h2 className="text-base-content mb-4">
              We Are The Best Tuition Platform
            </h2>
            
            <p className="text-base-content/70 text-lg leading-relaxed">
              We focus on quality, security, and your academic success. Experience a seamless connection between qualified students and expert tutors.
            </p>
        </div>
        </FadeIn>

        {/* 2 */}
        <FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div 
                key={idx} 
                className="card bg-base-100 border border-base-200 shadow-md transition-all duration-300  text-center"
            >
              <div className="card-body items-center p-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/5 text-primary flex items-center justify-center mb-4">
                    <feature.icon size={32} />
                </div>
                
                <h4 className="card-title text-lg font-bold text-base-content mb-2">
                    {feature.title}
                </h4>
                
                <p className="text-base-content/70 text-sm">
                    {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        </FadeIn>

        {/* 3 */}
        <div className="text-center mt-12">
            <Link to="/register">
              <Button variant='primary' label={'Get Started Today'}></Button>
            </Link>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;