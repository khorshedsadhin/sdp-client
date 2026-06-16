import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router';
import { FiMapPin, FiDollarSign, FiArrowRight } from 'react-icons/fi';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import Button from '../../components/Shared/Button/Button';
import FadeIn from '../Shared/FadeIn';

const LatestTuitions = () => {
  const { data: latestTuitions = [], isLoading } = useQuery({
    queryKey: ["home-tuitions"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/home/tuitions`
      );
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <section className="py-16 bg-base-100">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h2 className="font-bold text-base-content">
            Latest Tuitions
          </h2>
          <p className="mt-4 text-lg text-base-content/70">
            Explore the most recent tuition jobs posted by students.
          </p>
        </div>
        
        <div className="hidden md:block">
            <Link to="/tuitions">
                <Button label="View All" variant="ghost" icon={FiArrowRight} />
            </Link>
        </div>
      </div>

      {/* Grid Section */}
      <FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {latestTuitions.map((item) => (
          <div
            key={item._id}
            className="group flex flex-col bg-base-200 hover:shadow-md border rounded-2xl p-6 border-primary/20 transition-all duration-300"
          >
            {/* Card Header */}
            <div className="flex justify-between items-start mb-4">
                <div className="badge badge-secondary badge-outline font-medium">
                  {item.class}
                </div>
                <span className="text-xs font-semibold text-base-content/50 bg-base-200 px-2 py-1 rounded">
                    New
                </span>
            </div>

            {/* Card Content */}
            <h3 className="text-xl font-bold text-base-content group-hover:text-primary transition-colors mb-2">
              {item.subject}
            </h3>
            
            <div className="space-y-3 mb-6 mt-auto">
                <div className="flex items-center gap-3 text-base-content/70">
                  <FiMapPin className="text-primary shrink-0" /> 
                  <span className="truncate text-sm">{item.location}</span>
                </div>
                <div className="flex items-center gap-3 text-base-content font-semibold">
                  <FiDollarSign className="text-primary shrink-0" /> 
                  <span>{item.salary} <span className="text-sm font-normal text-base-content/60">Tk/month</span></span>
                </div>
            </div>

            {/* Card Action */}
            <Link to={`/tuition/${item._id}`} className="w-full">
                <Button label="View Details" fullWidth small variant="primary" />
            </Link>
          </div>
        ))}
      </div>
      </FadeIn>

      {/* View All Button */}
      <div className="mt-10 flex justify-center md:hidden">
        <Link to="/tuitions">
             <Button label="View All Tuitions" variant="ghost" icon={FiArrowRight} />
        </Link>
      </div>
      
    </section>
  );
};

export default LatestTuitions;