import React, { useState } from "react";
import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import {
	FiMapPin,
	FiCalendar,
	FiClock,
	FiCheckCircle,
	FiDollarSign,
} from "react-icons/fi";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import Button from "../../components/Shared/Button/Button";
import ApplyModal from "../Tutors/ApplyModal";

const TuitionDetails = () => {
	const { id } = useParams();
	const { user } = useAuth();
	const [role] = useRole();
	const axiosSecure = useAxiosSecure();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const { data: tuition, isLoading } = useQuery({
		queryKey: ["tuition", id],
		queryFn: async () => {
			const { data } = await axios.get(
				`${import.meta.env.VITE_API_URL}/tuition/${id}`
			);
			return data;
		},
	});

	const { data: hasApplied } = useQuery({
		queryKey: ["application-check", id, user?.email],
		enabled: !!user?.email && role === "tutor",
		queryFn: async () => {
			const { data } = await axiosSecure.get(
				`/application/check/${id}/${user.email}`
			);
			return data.applied;
		},
	});

	if (isLoading) return <LoadingSpinner />;

	return (
		<section className="bg-base-100 min-h-screen py-12 px-4 font-manrope">
			<div className="max-w-4xl mx-auto">
				{/* Header Card */}
				<div className="bg-base-100 border border-base-200 shadow-xl rounded-2xl overflow-hidden mb-8">
					<div className="bg-primary/5 p-8 border-b border-base-200">
						<div className="flex flex-col md:flex-row justify-between items-start gap-4">
							<div>
								<div className="flex items-center gap-3 mb-2">
									<span className="badge badge-secondary badge-outline font-bold">
										{tuition.class}
									</span>
									<span className="text-xs font-semibold text-base-content/60 uppercase tracking-wide">
										Posted {new Date(tuition.postedAt).toLocaleDateString()}
									</span>
								</div>
								<h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
									{tuition.subject}
								</h1>
								<div className="flex items-center gap-2 text-base-content/70">
									<FiMapPin /> {tuition.location}
								</div>
							</div>

							<div className="text-right hidden md:block">
								<p className="text-sm text-base-content/60 mb-1">
									Salary offered
								</p>
								<h3 className="text-2xl font-bold text-primary">
									{tuition.salary} Tk
									<span className="text-sm font-normal text-base-content/60">
										/month
									</span>
								</h3>
							</div>
						</div>
					</div>

					{/* Stats Grid */}
					<div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-base-200 border-b border-base-200">
						<div className="p-6 text-center">
							<FiCalendar className="w-6 h-6 mx-auto mb-2 text-primary" />
							<p className="text-sm text-base-content/60">Days/Week</p>
							<p className="font-bold">{tuition.days} Days</p>
						</div>
						<div className="p-6 text-center">
							<FiClock className="w-6 h-6 mx-auto mb-2 text-primary" />
							<p className="text-sm text-base-content/60">Duration</p>
							<p className="font-bold">Daily 1-1.5 Hrs</p>
						</div>
						<div className="p-6 text-center md:hidden">
							<FiDollarSign className="w-6 h-6 mx-auto mb-2 text-primary" />
							<p className="text-sm text-base-content/60">Salary</p>
							<p className="font-bold">{tuition.salary} Tk</p>
						</div>
						<div className="p-6 text-center hidden md:block">
							<FiCheckCircle className="w-6 h-6 mx-auto mb-2 text-primary" />
							<p className="text-sm text-base-content/60">Status</p>
							<p className="font-bold capitalize">
								{tuition.status || "Active"}
							</p>
						</div>
					</div>

					{/* Description */}
					<div className="p-8">
						<h3 className="text-xl font-bold mb-4 border-b pb-2 inline-block border-primary/20">
							Requirements & Details
						</h3>
						<p className="text-base-content/80 leading-relaxed whitespace-pre-line">
							{tuition.description || "No additional description provided."}
						</p>
					</div>
				</div>

				{/* Action Section */}
				<div className="bg-base-200/50 rounded-2xl p-6 border border-base-200 flex flex-col md:flex-row justify-between items-center gap-4">
					<div>
						<h4 className="font-bold text-lg">Interested in this tuition?</h4>
						<p className="text-sm text-base-content/60">
							Make sure you meet the requirements before applying.
						</p>
					</div>

					{role === "tutor" ? (
						<div className="w-full md:w-auto">
							{hasApplied ? (
								<button className="btn btn-disabled w-full md:w-auto">
									Already Applied
								</button>
							) : (
								<Button
									label="Apply Now"
									onClick={() => setIsModalOpen(true)}
									fullWidth
								/>
							)}
						</div>
					) : role === "student" || role === "admin" ? (
						<div className="text-sm font-medium text-warning bg-warning/10 px-4 py-2 rounded-lg">
							Login as a Tutor to apply
						</div>
					) : (
						<Link to="/login" className="btn btn-primary btn-outline">
							Login to Apply
						</Link>
					)}
				</div>

				<ApplyModal
					isOpen={isModalOpen}
					closeModal={() => setIsModalOpen(false)}
					tuitionInfo={tuition}
				/>
			</div>
		</section>
	);
};

export default TuitionDetails;
