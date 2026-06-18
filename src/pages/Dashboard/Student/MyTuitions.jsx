import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { FiTrash2, FiEdit } from "react-icons/fi";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import FadeIn from "../../../components/Shared/FadeIn";
import UpdateTuitionModal from "../../../components/Dashboard/Student/UpdateTuitionModal";

const MyTuitions = () => {
	const { user } = useAuth();
	const axiosSecure = useAxiosSecure();

	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [selectedTuition, setSelectedTuition] = useState(null);

	const {
		data: tuitions = [],
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["my-tuitions", user?.email],
		enabled: !!user?.email,
		queryFn: async () => {
			const result = await axiosSecure.get("/my-tuitions");
			return result.data;
		},
	});

	const { mutateAsync: deleteTuition } = useMutation({
		mutationFn: async (id) => {
			const { data } = await axiosSecure.delete(`/tuition/${id}`);
			return data;
		},
		onSuccess: (data) => {
			if (data.deletedCount > 0) {
				toast.success("Tuition deleted successfully!");
				refetch();
			}
		},
		onError: (err) => {
			console.error(err);
			toast.error("Failed to delete tuition.");
		},
	});

	const handleDelete = async (id) => {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#2F9E44",
			cancelButtonColor: "#D62828",
			confirmButtonText: "Yes, delete it!",
		}).then(async (result) => {
			if (result.isConfirmed) {
				await deleteTuition(id);
			}
		});
	};

	const handleEdit = (tuition) => {
		setSelectedTuition(tuition);
		setIsEditModalOpen(true);
	};

	if (isLoading) return <LoadingSpinner />;

	return (
		<div className="w-full">
			<FadeIn>
				<div className="flex justify-between items-center mb-6">
					<div>
						<h2 className="text-2xl font-bold text-primary">
							My Posted Tuitions
						</h2>
						<p className="text-sm text-base-content/70">
							Manage your tuition requests
						</p>
					</div>
					<div className="badge badge-primary badge-outline font-bold p-3">
						Total: {tuitions.length}
					</div>
				</div>
			</FadeIn>

			<FadeIn delay={0.2}>
				{tuitions.length === 0 ? (
					<div className="flex flex-col items-center justify-center py-20 bg-base-100 rounded-xl border border-dashed border-base-300">
						<div className="text-6xl mb-4">📝</div>
						<p className="text-lg font-medium text-base-content/60">
							You haven't posted any tuitions yet.
						</p>
						<p className="text-sm text-base-content/40">
							Create a post to start finding tutors.
						</p>
					</div>
				) : (
					<div className="overflow-x-auto bg-base-100 rounded-xl shadow-sm border border-base-200">
						<table className="table w-full">
							{/* Table Head */}
							<thead className="bg-base-200/50 text-base-content/70">
								<tr>
									<th>Subject Info</th>
									<th>Class</th>
									<th>Salary</th>
									<th>Location</th>
									<th>Status</th>
									<th className="text-right">Actions</th>
								</tr>
							</thead>
							{/* Table Body */}
							<tbody>
								{tuitions.map((item) => (
									<tr
										key={item._id}
										className="hover:bg-base-200/20 transition-colors"
									>
										<td>
											<div className="font-bold text-primary">
												{item.subject}
											</div>
											<div className="text-xs text-base-content/50">
												{item.days} days/week
											</div>
										</td>
										<td className="font-medium">{item.class}</td>
										<td className="font-bold">
											{item.salary}{" "}
											<span className="text-xs font-normal">Tk</span>
										</td>
										<td>
											<div
												className="max-w-[150px] truncate text-sm"
												title={item.location}
											>
												{item.location}
											</div>
										</td>
										<td>
											<span
												className={`badge ${
													item.status === "approved"
														? "badge-success text-white"
														: item.status === "rejected"
														? "badge-error text-white"
														: "badge-warning text-white"
												} text-xs uppercase font-bold tracking-wider`}
											>
												{item.status}
											</span>
										</td>
										<td className="text-right">
											<div className="flex justify-end gap-2">
												<button
													onClick={() => handleEdit(item)}
													className="btn btn-ghost btn-sm text-info hover:bg-info/10 tooltip tooltip-left"
												>
													<FiEdit size={18} />
												</button>

												<button
													onClick={() => handleDelete(item._id)}
													className="btn btn-ghost btn-sm text-error hover:bg-error/10 tooltip tooltip-left"
												>
													<FiTrash2 size={18} />
												</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</FadeIn>

			<UpdateTuitionModal
				isOpen={isEditModalOpen}
				closeModal={() => setIsEditModalOpen(false)}
				tuition={selectedTuition}
				refetch={refetch}
			/>
		</div>
	);
};

export default MyTuitions;
