import React from "react";
import { useForm } from "react-hook-form";
import { FiX } from "react-icons/fi";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PlanFormModal = ({ plan, onClose, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const isEditing = !!plan;

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: plan?.name || "",
      duration: plan?.duration || 1,
      price: plan?.price || "",
    },
  });

  const { mutateAsync: savePlan, isPending } = useMutation({
    mutationFn: async (formData) => {
      // Student subscriptions were replaced by posting credits - this modal only
      // ever manages tutor plans now, so the role is fixed rather than user-picked.
      const data = { ...formData, role: "tutor" };
      if (isEditing) {
        const res = await axiosSecure.patch(`/admin/subscription-plans/${plan._id}`, data);
        return res.data;
      }
      const res = await axiosSecure.post("/admin/subscription-plans", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success(isEditing ? "Plan updated!" : "Plan created!");
      refetch();
      onClose();
    },
    onError: () => toast.error("Failed to save plan"),
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="w-full max-w-md rounded-2xl bg-base-100 p-6 shadow-2xl relative">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">{isEditing ? "Edit Plan" : "Create Plan"}</h3>
          <button onClick={onClose} className="btn btn-ghost btn-sm btn-circle">
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(savePlan)} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Plan Name</span>
            </label>
            <input
              {...register("name", { required: true })}
              placeholder="e.g. Basic"
              className="input input-bordered w-full"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Duration (Months)</span>
              </label>
              <input
                {...register("duration", { required: true, valueAsNumber: true })}
                type="number"
                min="1"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Price (৳)</span>
              </label>
              <input
                {...register("price", { required: true, valueAsNumber: true })}
                type="number"
                min="0"
                className="input input-bordered w-full"
              />
            </div>
          </div>
          <button type="submit" disabled={isPending} className="btn btn-primary w-full mt-4 text-white">
            {isPending ? "Saving..." : "Save Plan"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlanFormModal;
