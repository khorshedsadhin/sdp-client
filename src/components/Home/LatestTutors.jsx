import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import Button from '../../components/Shared/Button/Button';
import FadeIn from '../Shared/FadeIn';

const LatestTutors = () => {
  const { data: latestTutors = [], isLoading } = useQuery({
    queryKey: ["home-tutors"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/home/tutors`
      );
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <section className="py-16 bg-base-200/30">
        
        {/* Header */}
        <div className="text-center mb-12 max-w-2xl mx-auto px-4">
          <span className="inline-block rounded-full bg-primary/10 px-5 py-2 text-sm font-bold text-primary mb-4 uppercase tracking-wide">
            Expertise
          </span>
          <h2 className="font-bold text-base-content mt-2">
            Meet Our Top Tutors
          </h2>
          <p className="text-base-content/70 mt-4 text-lg">
             Connect with highly qualified instructors ready to help you achieve your goals.
          </p>
        </div>

        {/* Grid */}
        <FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {latestTutors.map((tutor) => (
            <div
              key={tutor._id}
              className="group bg-base-100 p-6 rounded-2xl border border-base-200 shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="avatar mb-4">
                <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
                  <img
                    src={tutor.image || "https://i.ibb.co/MgsTCcv/avater.jpg"}
                    alt={tutor.name}
                    className="object-cover w-full h-full transition-transform duration-500"
                  />
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-base-content group-hover:text-primary transition-colors">
                {tutor.name}
              </h3>
              
              <p className="text-sm font-medium text-secondary mt-1 uppercase tracking-wide">
                {"Tutor"}
              </p>
              
              <div className="divider my-4 w-1/2 mx-auto opacity-50"></div>
              
              <p className="text-xs text-base-content/60 mb-6 truncate w-full px-2">
                {tutor.email}
              </p>
              
              <Link to="/tutors" className="w-full mt-auto">
                 <Button label="View Profile" variant="primary" fullWidth small />
              </Link>
            </div>
          ))}
        </div>
        </FadeIn>
        
    </section>
  );
};

export default LatestTutors;