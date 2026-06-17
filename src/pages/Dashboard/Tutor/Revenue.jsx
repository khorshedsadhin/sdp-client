import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FiDollarSign, FiTrendingUp, FiCalendar, FiUser } from "react-icons/fi";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import FadeIn from "../../../components/Shared/FadeIn";

const Revenue = () => {
	const { user } = useAuth();
	const axiosSecure = useAxiosSecure();

	const { data: payments = [], isLoading } = useQuery({
		queryKey: ["tutor-revenue", user?.email],
		queryFn: async () => {
			const { data } = await axiosSecure.get(`/tutor/revenue/${user.email}`);
			return data;
		},
	});

	const totalRevenue = payments.reduce((acc, curr) => acc + curr.amount, 0);

	if (isLoading) return <LoadingSpinner />;

	return (
		<div className="w-full">
			<FadeIn>
				<div className="flex items-center justify-between mb-8">
					<h2 className="text-2xl font-bold text-primary">My Revenue</h2>
				</div>
			</FadeIn>

			{/* Stats Card */}
			<FadeIn delay={0.1}>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
					<div className="stats shadow bg-primary text-primary-content">
						<div className="stat">
							<div className="stat-figure text-primary-content">
								<FiDollarSign size={32} />
							</div>
							<div className="stat-title text-primary-content/80">
								Total Earnings
							</div>
							<div className="stat-value text-4xl">
								{totalRevenue.toLocaleString()} Tk
							</div>
							<div className="stat-desc text-primary-content/70">
								Lifetime revenue
							</div>
						</div>
					</div>

					<div className="stats shadow bg-base-100 border border-base-200">
						<div className="stat">
							<div className="stat-figure text-secondary">
								<FiTrendingUp size={32} />
							</div>
							<div className="stat-title">Successful Tuitions</div>
							<div className="stat-value text-secondary">{payments.length}</div>
							<div className="stat-desc">Total paid sessions</div>
						</div>
					</div>
				</div>
			</FadeIn>

			{/* Transaction Table */}
			<FadeIn delay={0.2}>
				<div className="bg-base-100 rounded-xl shadow-lg border border-base-200 overflow-hidden">
					<div className="p-4 border-b border-base-200 bg-base-50">
						<h3 className="font-bold text-lg">Transaction History</h3>
					</div>

					<div className="overflow-x-auto">
						<table className="table w-full">
							<thead className="bg-base-200/50">
								<tr>
									<th>Student Info</th>
									<th>Tuition Subject</th>
									<th>Date</th>
									<th>Transaction ID</th>
									<th className="text-right">Amount</th>
								</tr>
							</thead>
							<tbody>
								{payments.length === 0 ? (
									<tr>
										<td colSpan="5" className="text-center py-10">
											<div className="flex flex-col items-center justify-center text-gray-500">
												<span className="text-4xl mb-2">💰</span>
												<p>No revenue records found yet.</p>
											</div>
										</td>
									</tr>
								) : (
									payments.map((payment) => (
										<tr
											key={payment._id}
											className="hover:bg-base-200/20 transition-colors"
										>
											<td>
												<div className="flex items-center gap-3">
													<div className="p-2 bg-primary/10 rounded-full text-primary">
														<FiUser />
													</div>
													<div>
														<div className="font-bold">
															{payment.studentName || "Student"}
														</div>
														<div className="text-xs opacity-50">
															{payment.studentEmail}
														</div>
													</div>
												</div>
											</td>
											<td className="font-medium">{payment.subject}</td>
											<td>
												<div className="flex items-center gap-2 text-sm text-base-content/70">
													<FiCalendar />
													{new Date(payment.date).toLocaleDateString()}
												</div>
											</td>
											<td>
												<span className="badge badge-ghost font-mono text-xs">
													{payment.transactionId
														? payment.transactionId.slice(-8).toUpperCase()
														: "N/A"}
												</span>
											</td>
											<td className="text-right">
												<div className="font-bold text-success text-lg">
													+{payment.amount} Tk
												</div>
											</td>
										</tr>
									))
								)}
							</tbody>
						</table>
					</div>
				</div>
			</FadeIn>
		</div>
	);
};

export default Revenue;
