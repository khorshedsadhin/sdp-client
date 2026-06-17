import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import FadeIn from "../../../components/Shared/FadeIn";

const MyApplications = () => {
	const { user } = useAuth();
	const axiosSecure = useAxiosSecure();

	const { data: applications = [], isLoading } = useQuery({
		queryKey: ["my-applications", user?.email],
		queryFn: async () => {
			const { data } = await axiosSecure.get("/tutor/applications");
			return data;
		},
	});

	if (isLoading) return <LoadingSpinner />;

	return (
		<div className="w-full">
			<FadeIn>
				<div className="flex items-center justify-between mb-6">
					<h2 className="text-2xl font-bold text-primary">My Applications</h2>
					<div className="badge badge-primary badge-outline font-bold p-3">
						Total: {applications.length}
					</div>
				</div>
			</FadeIn>

			<FadeIn delay={0.2}>
				<div className="overflow-x-auto bg-base-100 rounded-xl shadow-lg border border-base-200">
					<table className="table w-full">
						<thead className="bg-base-200/50">
							<tr>
								<th>Subject</th>
								<th>Student Email</th>
								<th>Applied Date</th>
								<th>Status</th>
							</tr>
						</thead>
						<tbody>
							{applications.length === 0 ? (
								<tr>
									<td colSpan="4" className="text-center py-10">
										<div className="flex flex-col items-center justify-center text-gray-500">
											<span className="text-4xl mb-2">📂</span>
											You haven't applied to any tuitions yet.
										</div>
									</td>
								</tr>
							) : (
								applications.map((app) => (
									<tr
										key={app._id}
										className="hover:bg-base-200/20 transition-colors"
									>
										<td className="font-bold text-primary">
											{app.subject}
										</td>
										<td className="text-base-content/70">{app.studentEmail}</td>
										<td className="text-sm">
											{new Date(app.appliedAt).toLocaleDateString()}
										</td>
										<td>
											<span
												className={`badge ${
													app.status === "approved"
														? "badge-success text-white"
														: app.status === "rejected"
														? "badge-error text-white"
														: "badge-warning text-white"
												} uppercase text-xs font-bold tracking-wider`}
											>
												{app.status}
											</span>
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>
			</FadeIn>
		</div>
	);
};

export default MyApplications;
