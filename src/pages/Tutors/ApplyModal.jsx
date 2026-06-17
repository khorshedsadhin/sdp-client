import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FiX } from "react-icons/fi";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const ApplyModal = ({ isOpen, closeModal, tuitionInfo }) => {
	const { user } = useAuth();
	const axiosSecure = useAxiosSecure();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: user?.displayName,
			email: user?.email,
			expectedSalary: tuitionInfo?.salary,
		},
	});

	const { mutateAsync: submitApplication, isPending } = useMutation({
		mutationFn: async (formData) => {
			const applicationData = {
				tuitionId: tuitionInfo._id,
				studentEmail: tuitionInfo.studentEmail,
				subject: tuitionInfo.subject,

				// Tutor Info
				tutorEmail: user?.email,
				tutorName: user?.displayName,
				tutorImage: user?.photoURL,

				// Form Data
				qualifications: formData.qualifications,
				experience: formData.experience,
				expectedSalary: Number(formData.expectedSalary),

				status: "pending",
				appliedAt: new Date(),
			};

			const { data } = await axiosSecure.post("/applications", applicationData);
			return data;
		},
		onSuccess: (data) => {
			if (data.insertedId) {
				toast.success("Application submitted successfully!");
				closeModal();
				window.location.reload();
			}
		},
		onError: (err) => {
			toast.error(
				err.response?.data?.message || "Failed to submit application"
			);
		},
	});

	const onSubmit = async (data) => {
		await submitApplication(data);
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
			<div className="bg-base-100 w-full max-w-lg rounded-2xl shadow-2xl p-6 m-4 relative animate-in fade-in zoom-in duration-200">
				{/* Header */}
				<div className="flex justify-between items-center mb-6 border-b pb-4 border-base-200">
					<div>
						<h3 className="text-xl font-bold text-primary">
							Apply for Tuition
						</h3>
						<p className="text-xs text-base-content/60 mt-1">
							Applying for: {tuitionInfo.subject}
						</p>
					</div>
					<button
						onClick={closeModal}
						className="btn btn-sm btn-circle btn-ghost"
					>
						<FiX size={20} />
					</button>
				</div>

				{/* Form */}
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					{/* Read-only Fields */}
					<div className="grid grid-cols-2 gap-4">
						<div className="form-control">
							<label className="label">
								<span className="label-text font-medium">Name</span>
							</label>
							<input
								{...register("name")}
								type="text"
								className="input input-bordered w-full bg-base-200"
								readOnly
							/>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text font-medium">Email</span>
							</label>
							<input
								{...register("email")}
								type="email"
								className="input input-bordered w-full bg-base-200"
								readOnly
							/>
						</div>
					</div>

					{/* Qualifications */}
					<div className="form-control">
						<label className="label">
							<span className="label-text font-medium">Qualifications</span>
						</label>
						<input
							{...register("qualifications", {
								required: "Qualifications are required",
							})}
							type="text"
							placeholder="e.g. BSc in CSE, Dhaka University"
							className="input input-bordered w-full"
						/>
						{errors.qualifications && (
							<span className="text-error text-xs mt-1">
								{errors.qualifications.message}
							</span>
						)}
					</div>

					{/* Experience */}
					<div className="form-control">
						<label className="label">
							<span className="label-text font-medium">Experience</span>
						</label>
						<textarea
							{...register("experience", {
								required: "Experience is required",
							})}
							className="textarea textarea-bordered h-20"
							placeholder="Briefly describe your tutoring experience..."
						></textarea>
						{errors.experience && (
							<span className="text-error text-xs mt-1">
								{errors.experience.message}
							</span>
						)}
					</div>

					{/* Expected Salary */}
					<div className="form-control">
						<label className="label">
							<span className="label-text font-medium">
								Expected Salary (Tk)
							</span>
						</label>
						<input
							{...register("expectedSalary", {
								required: "Salary is required",
							})}
							type="number"
							className="input input-bordered w-full"
						/>
						{errors.expectedSalary && (
							<span className="text-error text-xs mt-1">
								{errors.expectedSalary.message}
							</span>
						)}
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
								"Submit Application"
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ApplyModal;
