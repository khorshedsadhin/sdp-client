import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router';
import { FiArrowRight } from 'react-icons/fi';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import Button from '../../components/Shared/Button/Button';
import FadeIn from '../Shared/FadeIn';
import TuitionCard from '../Shared/TuitionCard';
import useAuth from '../../hooks/useAuth';
import { authHeader } from '../../utils';

const LatestTuitions = () => {
  const { user, loading: isAuthLoading } = useAuth();

  // Sending the token lets the backend narrow this section by gender preference
  // when the visitor is a tutor, so they can't click through to a post they'd be
  // blocked from. Anonymous visitors still get every approved post.
  const { data: latestTuitions = [], isLoading } = useQuery({
    enabled: !isAuthLoading,
    queryKey: ["home-tuitions", user?.email ?? "anonymous"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/home/tuitions`,
        authHeader(user)
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
          <TuitionCard key={item._id} tuition={item} showNewBadge />
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