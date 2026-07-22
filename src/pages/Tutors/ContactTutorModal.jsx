import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FiX, FiMail, FiPhone } from "react-icons/fi";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ContactTutorModal = ({ tutorId, tutorName, closeModal }) => {
  const axiosSecure = useAxiosSecure();

  const { data: contact, isLoading } = useQuery({
    enabled: !!tutorId,
    queryKey: ["tutor-contact", tutorId],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/tutors/${tutorId}/contact`);
      return data;
    },
  });

  if (!tutorId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-base-100 w-full max-w-sm rounded-2xl shadow-2xl p-6 relative animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-primary">Contact {tutorName}</h3>
          <button onClick={closeModal} className="btn btn-sm btn-circle btn-ghost">
            <FiX size={20} />
          </button>
        </div>

        {isLoading ? (
          <div className="py-8 text-center">
            <span className="loading loading-spinner"></span>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-base-200/50 rounded-lg">
              <FiMail className="text-primary" />
              <span className="text-sm break-all">{contact?.email}</span>
            </div>
            {contact?.phone && (
              <div className="flex items-center gap-3 p-3 bg-base-200/50 rounded-lg">
                <FiPhone className="text-primary" />
                <span className="text-sm">{contact.phone}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactTutorModal;
