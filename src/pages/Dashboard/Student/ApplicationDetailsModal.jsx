import React from "react";
import { FiX, FiCheck, FiXCircle } from "react-icons/fi";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ApplicationDetailsModal = ({
  isOpen,
  closeModal,
  application,
  refetch,
}) => {
  const axiosSecure = useAxiosSecure();

  const { mutateAsync: updateStatus, isPending } = useMutation({
    mutationFn: async (status) => {
      const { data } = await axiosSecure.patch(
        `/application/status/${application._id}`,
        { status }
      );
      return data;
    },
    onSuccess: (data, status) => {
      if (status === "approved") {
        toast.success("Tutor Hired! Payment Recorded.");
      } else {
        toast.error("Application Rejected.");
      }
      refetch();
      closeModal();
    },
    onError: () => toast.error("Failed to update status"),
  });

  if (!isOpen || !application) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-base-100 w-full max-w-lg rounded-2xl shadow-2xl relative animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-base-200">
          <h3 className="text-xl font-bold text-primary">
            Application Details
          </h3>
          <button
            onClick={closeModal}
            className="btn btn-sm btn-circle btn-ghost"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {/* Tutor Profile */}
          <div className="flex items-center gap-4 mb-6">
            <div className="avatar">
              <div className="w-16 h-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={
                    application.tutorImage ||
                    "https://i.ibb.co/MgsTCcv/avater.jpg"
                  }
                  alt="Avatar"
                />
              </div>
            </div>
            <div>
              <h2 className="text-lg font-bold">{application.tutorName}</h2>
              <p className="text-sm text-base-content/60">
                {application.tutorEmail}
              </p>
              <div className="badge badge-secondary badge-outline mt-1 text-xs">
                Applied for: {application.subject}
              </div>
            </div>
          </div>

          {/* Data Grid */}
          <div className="space-y-4">
            <div className="p-4 bg-base-200/50 rounded-xl">
              <h4 className="text-xs font-bold text-base-content/50 uppercase mb-1">
                Expected Salary
              </h4>
              <p className="text-2xl font-bold text-primary">
                {application.expectedSalary} Tk
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold text-base-content/50 uppercase mb-2">
                Qualifications
              </h4>
              <div className="p-3 bg-base-100 border border-base-200 rounded-lg">
                <p className="text-base-content font-medium">
                  {application.qualifications}
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-base-content/50 uppercase mb-2">
                Experience
              </h4>
              <div className="p-3 bg-base-100 border border-base-200 rounded-lg min-h-[80px]">
                <p className="text-base-content whitespace-pre-wrap">
                  {application.experience}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-base-200 flex justify-end gap-3 bg-base-100 rounded-b-2xl">
          {application.status === "pending" ? (
            <>
              <button
                onClick={() => updateStatus("rejected")}
                disabled={isPending}
                className="btn btn-error btn-outline hover:text-white"
              >
                <FiXCircle /> Reject
              </button>
              <button
                onClick={() => updateStatus("approved")}
                disabled={isPending}
                className="btn btn-success text-white"
              >
                <FiCheck /> Hire Tutor
              </button>
            </>
          ) : (
            <div className="w-full text-center">
              <span
                className={`font-bold uppercase text-lg ${
                  application.status === "approved"
                    ? "text-success"
                    : "text-error"
                }`}
              >
                {application.status}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetailsModal;