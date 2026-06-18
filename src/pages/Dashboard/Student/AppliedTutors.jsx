import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FiEye } from "react-icons/fi";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import FadeIn from "../../../components/Shared/FadeIn";
import ApplicationDetailsModal from "./ApplicationDetailsModal";

const AppliedTutors = () => {
	const { user } = useAuth();
	const axiosSecure = useAxiosSecure();
	const [selectedApp, setSelectedApp] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	// Fetch applications
	const {
		data: applications = [],
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["applications-received", user?.email],
		queryFn: async () => {
			const { data } = await axiosSecure.get("/applications/received");
			return data;
		},
	});

	const handleViewDetails = (app) => {
		setSelectedApp(app);
		setIsModalOpen(true);
	};

	if (isLoading) return <LoadingSpinner />;

	return (
		<div className="w-full">
			<FadeIn>
				<div className="flex items-center justify-between mb-6">
					<h2 className="text-2xl font-bold text-primary">Applied Tutors</h2>
					<div className="badge badge-primary badge-outline p-3 font-bold">
						Requests: {applications.length}
					</div>
				</div>
			</FadeIn>

			<FadeIn delay={0.2}>
				{applications.length === 0 ? (
					<div className="text-center py-20 bg-base-100 rounded-xl border border-dashed border-base-300">
						<p className="text-gray-500">No applications received yet.</p>
					</div>
				) : (
					<div className="overflow-x-auto bg-base-100 rounded-xl shadow-lg border border-base-200">
						<table className="table w-full">
							<thead className="bg-base-200/50">
								<tr>
									<th>Tutor Profile</th>
									<th>Tuition Subject</th>
									<th>Expected Salary</th>
									<th>Status</th>
									<th className="text-right">Action</th>
								</tr>
							</thead>
							<tbody>
								{applications.map((app) => (
									<tr
										key={app._id}
										className="hover:bg-base-200/20 transition-colors"
									>
										<td>
											<div className="flex items-center gap-3">
												<div className="avatar">
													<div className="mask mask-squircle w-10 h-10">
														<img
															src={
																app.tutorImage ||
																"https://i.ibb.co/MgsTCcv/avater.jpg"
															}
															alt="Tutor"
														/>
													</div>
												</div>
												<div>
													<div className="font-bold">{app.tutorName}</div>
													<div className="text-xs opacity-50">
														{app.tutorEmail}
													</div>
												</div>
											</div>
										</td>
										<td className="font-medium text-primary">{app.subject}</td>
										<td className="font-bold">{app.expectedSalary} Tk</td>
										<td>
											<span
												className={`badge ${
													app.status === "accepted"
														? "badge-success text-white"
														: app.status === "rejected"
														? "badge-error text-white"
														: "badge-warning text-white"
												} uppercase text-xs font-bold`}
											>
												{app.status}
											</span>
										</td>
										<td className="text-right">
											<button
												onClick={() => handleViewDetails(app)}
												className="btn btn-sm btn-ghost text-primary border border-primary/20 hover:bg-primary hover:text-white gap-2"
											>
												<FiEye /> View Details
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</FadeIn>

			{/* Details Modal */}
			<ApplicationDetailsModal
				isOpen={isModalOpen}
				closeModal={() => setIsModalOpen(false)}
				application={selectedApp}
				refetch={refetch}
			/>
		</div>
	);
};

export default AppliedTutors;
