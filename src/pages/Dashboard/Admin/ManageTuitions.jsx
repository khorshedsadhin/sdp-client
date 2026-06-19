import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { FiTrash2, FiCheck, FiX } from "react-icons/fi";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import FadeIn from "../../../components/Shared/FadeIn";

const ManageTuitions = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: allTuitions = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["admin-all-tuitions"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/tuitions/all");
      return data;
    },
  });

  const { mutateAsync: updateStatus } = useMutation({
    mutationFn: async ({ id, status }) => {
      const { data } = await axiosSecure.patch(`/tuition/status/${id}`, { status });
      return data;
    },
    onSuccess: (data, variables) => {
      if (data.modifiedCount > 0) {
        toast.success(`Tuition marked as ${variables.status}`);
        refetch();
      }
    },
    onError: () => toast.error("Failed to update status."),
  });

  const { mutateAsync: deleteTuition } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/tuition/${id}`);
      return data;
    },
    onSuccess: (data) => {
      if (data.deletedCount > 0) {
        toast.success("Tuition removed successfully.");
        refetch();
      }
    },
    onError: () => toast.error("Failed to delete tuition."),
  });

  const handleStatusChange = async (id, newStatus) => {
    if (newStatus === 'rejected') {
        const result = await Swal.fire({
            title: "Reject this tuition?",
            text: "It will be hidden from the public list.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Yes, Reject"
        });
        if (!result.isConfirmed) return;
    }
    
    await updateStatus({ id, status: newStatus });
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteTuition(id);
      }
    });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="w-full">
      <FadeIn>
        <h2 className="text-2xl font-bold mb-6 text-primary">Manage Tuitions</h2>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="overflow-x-auto bg-base-100 rounded-xl shadow-lg border border-base-200">
          <table className="table w-full">
            <thead className="bg-base-200/50">
              <tr>
                <th>Subject</th>
                <th>Posted By</th>
                <th>Location</th>
                <th>Status</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {allTuitions.map((item) => (
                <tr key={item._id} className="hover:bg-base-200/20">
                  <td className="font-bold">{item.subject}</td>
                  <td>
                    <div className="flex flex-col">
                        <span>{item.studentEmail}</span>
                        <span className="text-xs opacity-50">{new Date(item.postedAt).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td>{item.location}</td>
                  <td>
                    <span className={`badge ${
                        item.status === 'approved' ? 'badge-success text-white' : 
                        item.status === 'rejected' ? 'badge-error text-white' : 'badge-warning text-white'
                    } badge-sm capitalize`}>
                      {item.status || "pending"}
                    </span>
                  </td>
                  <td className="text-right">
                    <div className="flex justify-end gap-2">
                        {(item.status === 'pending' || !item.status) && (
                            <>
                                <button
                                    onClick={() => handleStatusChange(item._id, 'approved')}
                                    className="btn btn-success btn-xs text-white"
                                    title="Approve"
                                >
                                    <FiCheck />
                                </button>
                                <button
                                    onClick={() => handleStatusChange(item._id, 'rejected')}
                                    className="btn btn-error btn-xs text-white"
                                    title="Reject"
                                >
                                    <FiX />
                                </button>
                            </>
                        )}

                        <button
                            onClick={() => handleDelete(item._id)}
                            className="btn btn-ghost btn-xs text-error hover:bg-error/10"
                            title="Delete Permanently"
                        >
                            <FiTrash2 size={16} />
                        </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </FadeIn>
    </div>
  );
};

export default ManageTuitions;