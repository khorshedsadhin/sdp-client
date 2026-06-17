import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FiMail, FiUserCheck } from "react-icons/fi";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const Tutors = () => {
	const { data: tutors = [], isLoading } = useQuery({
		queryKey: ["tutors"],
		queryFn: async () => {
			const { data } = await axios.get(
				`${import.meta.env.VITE_API_URL}/tutors`
			);
			return data;
		},
	});

	if (isLoading) return <LoadingSpinner />;

	return (
		<div className="bg-base-100 min-h-screen py-12 px-4">
			<div className="container mx-auto">
				{/* Header */}
				<div className="text-center mb-12">
					<h2 className="text-3xl font-bold text-primary">Our Tutors</h2>
					<p className="text-base-content/70 mt-2">
						Connect with expert tutors ready to help you succeed.
					</p>
				</div>

				{/* Content */}
				{tutors.length === 0 ? (
					<div className="text-center py-20 bg-base-200/50 rounded-xl">
						<p className="text-xl text-base-content/60 font-medium">
							No tutors registered yet.
						</p>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{tutors.map((tutor) => (
							<div
								key={tutor._id}
								className="card bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition-all duration-300"
							>
								<figure className="px-6 pt-6">
									<div className="avatar">
										<div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
											<img
												src={
													tutor.image || "https://i.ibb.co/MgsTCcv/avater.jpg"
												}
												alt={tutor.name}
												className="object-cover"
											/>
										</div>
									</div>
								</figure>
								<div className="card-body items-center text-center">
									<h2 className="card-title text-primary">{tutor.name}</h2>
									<p className="text-sm text-base-content/60 flex items-center gap-1">
										<FiUserCheck className="text-success" /> Verified Tutor
									</p>

									<div className="divider my-2"></div>

									<div className="w-full">
										<a
											href={`#`}
											className="btn btn-outline btn-primary btn-sm w-full gap-2"
										>
											<FiMail /> Contact
										</a>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Tutors;
