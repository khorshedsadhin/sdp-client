import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FiDollarSign, FiCalendar, FiCreditCard } from "react-icons/fi";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import FadeIn from "../../../components/Shared/FadeIn";

const Reports = () => {
	const axiosSecure = useAxiosSecure();
	const { data: stats = {}, isLoading: statsLoading } = useQuery({
		queryKey: ["admin-stats"],
		queryFn: async () => {
			const { data } = await axiosSecure.get("/admin/stats");
			return data;
		},
	});

	const { data: payments = [], isLoading: paymentsLoading } = useQuery({
		queryKey: ["admin-payments"],
		queryFn: async () => {
			const { data } = await axiosSecure.get("/admin/payments");
			return data;
		},
	});

	if (statsLoading || paymentsLoading) return <LoadingSpinner />;

	return (
		<div className="w-full">
			<FadeIn>
				<div className="flex justify-between items-center mb-8">
					<div>
						<h2 className="text-2xl font-bold text-primary">
							Reports & Analytics
						</h2>
						<p className="text-sm text-base-content/60">
							Monitor financial and operational performance
						</p>
					</div>
				</div>
			</FadeIn>

			{/* 1. Total Earnings Section */}
			<FadeIn delay={0.1}>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
					<div className="stats shadow-lg bg-primary text-primary-content">
						<div className="stat">
							<div className="stat-figure text-primary-content/80">
								<FiDollarSign size={36} />
							</div>
							<div className="stat-title text-primary-content/80 font-medium">
								Total Platform Earnings
							</div>
							<div className="stat-value text-4xl">
								৳ {stats.totalRevenue?.toLocaleString()}
							</div>
							<div className="stat-desc text-primary-content/70">
								Lifetime gross revenue
							</div>
						</div>
					</div>
				</div>
			</FadeIn>

			{/* 2. Transaction History Section */}
			<FadeIn delay={0.2}>
				<div className="bg-base-100 rounded-xl shadow-lg border border-base-200 overflow-hidden">
					<div className="p-6 border-b border-base-200 bg-base-50 flex justify-between items-center">
						<div className="flex items-center gap-2">
							<FiCreditCard className="text-primary" />
							<h3 className="font-bold text-lg">Transaction History</h3>
						</div>
						<span className="badge badge-ghost">
							{payments.length} Transactions
						</span>
					</div>

					<div className="overflow-x-auto">
						<table className="table w-full">
							<thead className="bg-base-200/50">
								<tr>
									<th>Date</th>
									<th>User (Payer)</th>
									<th>Payment Type</th>
									<th>Transaction ID</th>
									<th className="text-right">Amount</th>
								</tr>
							</thead>
							<tbody>
								{payments.length === 0 ? (
									<tr>
										<td colSpan="5" className="text-center py-12 text-gray-500">
											No transactions found.
										</td>
									</tr>
								) : (
									payments.map((payment) => (
										<tr
											key={payment._id}
											className="hover:bg-base-200/20 transition-colors"
										>
											<td>
												<div className="flex items-center gap-2 text-sm text-base-content/70">
													<FiCalendar />
													{new Date(payment.date).toLocaleDateString()}
												</div>
											</td>
											<td>
												<div className="font-bold">{payment.studentName}</div>
												<div className="text-xs opacity-50">
													{payment.studentEmail}
												</div>
											</td>
											<td>
												<span className="badge badge-ghost badge-sm font-medium">
													{payment.subject
														? `Tuition: ${payment.subject}`
														: "Tuition Posting Fee"}
												</span>
											</td>
											<td>
												<span className="font-mono text-xs text-base-content/50">
													{payment.transactionId}
												</span>
											</td>
											<td className="text-right">
												<span className="font-bold text-success text-lg">
													+ {payment.amount} Tk
												</span>
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

export default Reports;
