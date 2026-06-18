import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FiX } from "react-icons/fi";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UpdateTuitionModal = ({ isOpen, closeModal, tuition, refetch }) => {
	const axiosSecure = useAxiosSecure();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	useEffect(() => {
		if (tuition) {
			reset({
				subject: tuition.subject,
				class: tuition.class, 
				salary: tuition.salary,
				days: tuition.days,
				location: tuition.location,
				description: tuition.description,
			});
		}
	}, [tuition, reset]);

	const { mutateAsync: updateTuition, isPending } = useMutation({
		mutationFn: async (updatedData) => {
			const { data } = await axiosSecure.patch(
				`/tuition/${tuition._id}`,
				updatedData
			);
			return data;
		},
		onSuccess: (data) => {
			if (data.modifiedCount > 0) {
				toast.success("Tuition updated successfully!");
				refetch();
				closeModal();
			} else {
				toast("No changes made.");
			}
		},
		onError: () => {
			toast.error("Failed to update tuition.");
		},
	});

	const onSubmit = async (data) => {
		const formattedData = { ...data, salary: Number(data.salary) };
		await updateTuition(formattedData);
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
			<div className="bg-base-100 w-full max-w-2xl rounded-2xl shadow-2xl p-6 m-4 relative animate-in fade-in zoom-in duration-200">
				{/* Header */}
				<div className="flex justify-between items-center mb-6 border-b pb-4 border-base-200">
					<h3 className="text-xl font-bold text-primary">
						Update Tuition Post
					</h3>
					<button
						onClick={closeModal}
						className="btn btn-sm btn-circle btn-ghost"
					>
						<FiX size={20} />
					</button>
				</div>

				{/* Form */}
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="form-control">
							<label className="label">
								<span className="label-text font-semibold">Subject</span>
							</label>
							<input
								{...register("subject", { required: true })}
								type="text"
								className="input input-bordered w-full"
							/>
							{errors.subject && (
								<span className="text-error text-xs mt-1">
									Subject is required
								</span>
							)}
						</div>

						<div className="form-control">
							<label className="label">
								<span className="label-text font-semibold">Class/Grade</span>
							</label>
							<select
								{...register("class", { required: true })}
								className="select select-bordered w-full"
							>
								<option disabled value="">
									Select Class
								</option>
								<option value="Class 1-5">Class 1-5</option>
								<option value="Class 6-8">Class 6-8</option>
								<option value="SSC">SSC</option>
								<option value="HSC">HSC</option>
							</select>
							{errors.class && (
								<span className="text-error text-xs mt-1">
									Class is required
								</span>
							)}
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="form-control">
							<label className="label">
								<span className="label-text font-semibold">Salary (Tk)</span>
							</label>
							<input
								{...register("salary", { required: true })}
								type="number"
								className="input input-bordered w-full"
							/>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text font-semibold">Days/Week</span>
							</label>
							<select
								{...register("days", { required: true })}
								className="select select-bordered w-full"
							>
								<option value="1">1 Day</option>
								<option value="2">2 Days</option>
								<option value="3">3 Days</option>
								<option value="4">4 Days</option>
								<option value="5">5 Days</option>
								<option value="6">6 Days</option>
							</select>
						</div>
					</div>

					<div className="form-control">
						<label className="label">
							<span className="label-text font-semibold">Location</span>
						</label>
						<input
							{...register("location", { required: true })}
							type="text"
							className="input input-bordered w-full"
						/>
					</div>

					<div className="form-control">
						<label className="label">
							<span className="label-text font-semibold">Description</span>
						</label>
						<textarea
							{...register("description")}
							className="textarea textarea-bordered h-24"
							placeholder="Add any specific requirements..."
						></textarea>
					</div>

					<div className="modal-action mt-6">
						<button
							type="button"
							onClick={closeModal}
							className="btn btn-ghost"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="btn btn-primary text-white"
							disabled={isPending}
						>
							{isPending ? (
								<span className="loading loading-spinner"></span>
							) : (
								"Update Changes"
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default UpdateTuitionModal;
