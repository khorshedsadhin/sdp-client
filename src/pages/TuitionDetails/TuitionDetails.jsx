import React, { useState } from "react";
import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import {
	FiMapPin,
	FiCalendar,
	FiClock,
	FiCheckCircle,
	FiTag,
	FiUsers,
} from "react-icons/fi";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import useSubscription from "../../hooks/useSubscription";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import Button from "../../components/Shared/Button/Button";
import LockedFeatureButton from "../../components/Dashboard/Subscription/LockedFeatureButton";
import ApplyModal from "../Tutors/ApplyModal";
import { formatCurrency } from "../../utils/currency";
import { tutorGenderPreferenceLabel } from "../../utils/gender";
import { authHeader } from "../../utils";

const TuitionDetails = () => {
	const { id } = useParams();
	const { user } = useAuth();
	const [role] = useRole();
	const { isActive: hasActiveSubscription } = useSubscription();
	const axiosSecure = useAxiosSecure();
	const [isModalOpen, setIsModalOpen] = useState(false);

	// The token is passed so the backend can reject this post for a tutor whose
	// gender doesn't match the student's preference - the block is enforced there,
	// not by hiding UI here. Plain axios (not useAxiosSecure) because that hook's
	// interceptor would log the tutor out on the rejection.
	const {
		data: tuition,
		isLoading,
		error,
	} = useQuery({
		retry: false,
		queryKey: ["tuition", id, user?.email ?? "anonymous"],
		queryFn: async () => {
			const { data } = await axios.get(
				`${import.meta.env.VITE_API_URL}/tuition/${id}`,
				authHeader(user)
			);
			return data;
		},
	});

	const isGenderRestricted =
		error?.response?.data?.reason === "gender_mismatch";

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

	// Covers both a post that no longer exists (stale link, returned as null) and
	// one the backend refused to serve this tutor on gender grounds.
	if (!tuition?._id)
		return (
			<section className="bg-base-100 min-h-screen py-12 px-4 font-manrope">
				<div className="max-w-4xl mx-auto text-center py-24 bg-base-200/30 rounded-xl border border-dashed border-base-300">
					<p className="text-xl text-base-content/60 font-medium">
						{isGenderRestricted
							? error.response.data.message
							: "This tuition post is no longer available."}
					</p>
					<Link to="/tuitions" className="btn btn-link text-primary mt-2">
						Browse available tuitions
					</Link>
				</div>
			</section>
		);

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
									{formatCurrency(tuition.salary)}
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
							<FiTag className="w-6 h-6 mx-auto mb-2 text-primary" />
							<p className="text-sm text-base-content/60">Salary</p>
							<p className="font-bold">{formatCurrency(tuition.salary)}</p>
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
						<div className="flex items-center gap-2 mb-4 text-sm">
							<FiUsers className="text-primary" />
							<span className="text-base-content/60">Preferred Tutor:</span>
							<span className="font-semibold">
								{tutorGenderPreferenceLabel(tuition.preferredTutorGender)}
							</span>
						</div>
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
							) : hasActiveSubscription ? (
								<Button
									label="Apply Now"
									onClick={() => setIsModalOpen(true)}
									fullWidth
								/>
							) : (
								<LockedFeatureButton label="Subscribe to Apply" fullWidth />
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
