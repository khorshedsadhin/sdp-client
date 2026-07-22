import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import FadeIn from "../../../components/Shared/FadeIn";
import PlanFormModal from "../../../components/Dashboard/Admin/PlanFormModal";
import { formatCurrency } from "../../../utils/currency";

const ManageSubscriptionPlans = () => {
  const axiosSecure = useAxiosSecure();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);

  // Student subscriptions were replaced by posting credits, so this screen only
  // manages tutor plans now. Legacy student plan documents are left alone in the
  // database (historical/read-only) - they're just filtered out of this view.
  const { data: plans = [], isLoading, refetch } = useQuery({
    queryKey: ["admin-subscription-plans", "tutor"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/admin/subscription-plans?role=tutor");
      return data;
    },
  });

  const { mutateAsync: deletePlan } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/admin/subscription-plans/${id}`);
      return data;
    },
    onSuccess: (data) => {
      if (data.deletedCount > 0) {
        toast.success("Plan deleted.");
        refetch();
      }
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Plan?",
      text: "Existing subscribers keep their access; this only removes the plan from future purchases.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) await deletePlan(id);
    });
  };

  const openCreateModal = () => {
    setEditingPlan(null);
    setModalOpen(true);
  };

  const openEditModal = (plan) => {
    setEditingPlan(plan);
    setModalOpen(true);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="w-full">
      <FadeIn>
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-primary">Subscription Plans</h2>
            <p className="text-sm text-base-content/60">Create and manage tutor plans</p>
          </div>
          <button onClick={openCreateModal} className="btn btn-primary text-white gap-2">
            <FiPlus /> Add Plan
          </button>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="overflow-x-auto bg-base-100 rounded-xl shadow-lg border border-base-200">
          <table className="table w-full align-middle">
            <thead className="bg-base-200/50">
              <tr>
                <th>Role</th>
                <th>Plan</th>
                <th>Duration</th>
                <th>Price</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {plans.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-gray-500">
                    No plans created yet.
                  </td>
                </tr>
              ) : (
                plans.map((plan) => (
                  <tr key={plan._id} className="hover:bg-base-200/20">
                    <td>
                      <span
                        className={`badge ${
                          plan.role === "tutor" ? "badge-secondary text-white" : "badge-primary badge-outline"
                        } badge-sm font-bold uppercase`}
                      >
                        {plan.role}
                      </span>
                    </td>
                    <td className="font-bold">{plan.name}</td>
                    <td>
                      {plan.duration} Month{plan.duration > 1 ? "s" : ""}
                    </td>
                    <td>{formatCurrency(plan.price)}</td>
                    <td className="text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openEditModal(plan)}
                          className="btn btn-ghost btn-xs tooltip tooltip-left"
                          data-tip="Edit Plan"
                        >
                          <FiEdit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(plan._id)}
                          className="btn btn-ghost btn-xs text-error tooltip tooltip-left"
                          data-tip="Delete Plan"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </FadeIn>

      {modalOpen && (
        <PlanFormModal plan={editingPlan} onClose={() => setModalOpen(false)} refetch={refetch} />
      )}
    </div>
  );
};

export default ManageSubscriptionPlans;
