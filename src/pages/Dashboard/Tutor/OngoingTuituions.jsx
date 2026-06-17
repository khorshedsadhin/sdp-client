import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FiCheckCircle, FiClock, FiMapPin } from "react-icons/fi";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import FadeIn from "../../../components/Shared/FadeIn";

const OngoingTuitions = () => {
	const { user } = useAuth();
	const axiosSecure = useAxiosSecure();

	const { data: ongoing = [], isLoading } = useQuery({
		queryKey: ["ongoing-tuitions", user?.email],
		queryFn: async () => {
			const { data } = await axiosSecure.get("/tutor/ongoing-tuitions");
			return data;
		},
	});

	if (isLoading) return <LoadingSpinner />;

	return (
		<div className="w-full">
			<FadeIn>
				<div className="flex items-center justify-between mb-6">
					<h2 className="text-2xl font-bold text-primary">Ongoing Tuitions</h2>
					<div className="badge badge-secondary badge-outline font-bold p-3">
						Active: {ongoing.length}
					</div>
				</div>
			</FadeIn>

			<FadeIn delay={0.2}>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{ongoing.length === 0 ? (
						<div className="col-span-full text-center py-20 bg-base-100 rounded-xl border border-dashed border-base-300">
							<div className="flex flex-col items-center justify-center text-gray-500">
								<span className="text-4xl mb-2">📚</span>
								<p>No active tuitions right now.</p>
							</div>
						</div>
					) : (
						ongoing.map((item) => (
							<div
								key={item._id}
								className="card bg-base-100 shadow-lg border border-base-200 hover:shadow-xl transition-all"
							>
								<div className="card-body">
									<div className="flex justify-between items-start mb-2">
										<div>
											<h3 className="card-title text-primary text-xl">
												{item.subject}
											</h3>
											<div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
												<span className="font-semibold text-base-content/70">
													Student:
												</span>
												{item.studentEmail}
											</div>
										</div>
										<div className="badge badge-success text-white gap-1 py-3 px-4 font-bold">
											<FiCheckCircle /> Active
										</div>
									</div>

									<div className="divider my-2"></div>

									<div className="grid grid-cols-2 gap-4 text-sm text-base-content/70">
										<div className="flex items-center gap-2">
											<FiClock className="text-primary" />
											<span>3 Days/Week</span>
										</div>
										<div className="flex items-center gap-2">
											<FiMapPin className="text-primary" />
											<span>Online/Home</span>
										</div>
									</div>
								</div>
							</div>
						))
					)}
				</div>
			</FadeIn>
		</div>
	);
};

export default OngoingTuitions;
