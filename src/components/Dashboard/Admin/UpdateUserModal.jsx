import React from "react";
import { useForm } from "react-hook-form";
import { FiX } from "react-icons/fi";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UpdateUserModal = ({ user, onClose, refetch }) => {
	const axiosSecure = useAxiosSecure();
	const { register, handleSubmit } = useForm({
		defaultValues: {
			name: user?.name,
			photo: user?.image,
		},
	});

	const { mutateAsync: updateInfo, isPending } = useMutation({
		mutationFn: async (data) => {
			const res = await axiosSecure.patch(`/users/${user.email}`, data);
			return res.data;
		},
		onSuccess: (data) => {
			if (data.modifiedCount > 0) {
				toast.success("User info updated!");
				refetch();
				onClose();
			} else {
				toast("No changes made");
			}
		},
		onError: () => toast.error("Failed to update info"),
	});

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in">
			<div className="w-full max-w-md rounded-2xl bg-base-100 p-6 shadow-2xl relative">
				<div className="flex justify-between items-center mb-4">
					<h3 className="font-bold text-lg">Edit User Info</h3>
					<button onClick={onClose} className="btn btn-ghost btn-sm btn-circle">
						<FiX size={20} />
					</button>
				</div>

				<form onSubmit={handleSubmit(updateInfo)} className="space-y-4">
					<div className="form-control">
						<label className="label">
							<span className="label-text">Full Name</span>
						</label>
						<input
							{...register("name")}
							className="input input-bordered w-full"
						/>
					</div>
					<div className="form-control">
						<label className="label">
							<span className="label-text">Profile Image URL</span>
						</label>
						<input
							{...register("photo")}
							className="input input-bordered w-full"
						/>
					</div>
					<button
						type="submit"
						disabled={isPending}
						className="btn btn-primary w-full mt-4 text-white"
					>
						{isPending ? "Saving..." : "Save Changes"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default UpdateUserModal;
