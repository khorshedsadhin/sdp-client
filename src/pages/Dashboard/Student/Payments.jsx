import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FiDollarSign, FiCalendar, FiHash } from "react-icons/fi";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import FadeIn from "../../../components/Shared/FadeIn";

const Payments = () => {
	const { user } = useAuth();
	const axiosSecure = useAxiosSecure();

	const { data: payments = [], isLoading } = useQuery({
		queryKey: ["payments", user?.email],
		enabled: !!user?.email,
		queryFn: async () => {
			const { data } = await axiosSecure.get(`/payments/${user.email}`);
			return data;
		},
	});

	if (isLoading) return <LoadingSpinner />;

	return (
		<div className="w-full">
			<FadeIn>
				<div className="flex items-center justify-between mb-6">
					<h2 className="text-2xl font-bold text-primary">Payment History</h2>
					<div className="badge badge-primary badge-outline font-bold p-3">
						Total Spent: {payments.reduce((acc, curr) => acc + curr.amount, 0)}{" "}
						Tk
					</div>
				</div>
			</FadeIn>

			<FadeIn delay={0.2}>
				{payments.length === 0 ? (
					<div className="text-center py-20 bg-base-100 rounded-xl border border-dashed border-base-300">
						<div className="flex flex-col items-center justify-center text-gray-500">
							<span className="text-4xl mb-2">💳</span>
							<p>No payment history found.</p>
						</div>
					</div>
				) : (
					<div className="overflow-x-auto bg-base-100 rounded-xl shadow-lg border border-base-200">
						<table className="table w-full">
							{/* Table Head */}
							<thead className="bg-base-200/50">
								<tr>
									<th>Tutor Info</th>
									<th>Tuition Subject</th>
									<th>Transaction ID</th>
									<th>Date</th>
									<th className="text-right">Amount</th>
								</tr>
							</thead>
							{/* Table Body */}
							<tbody>
								{payments.map((payment) => (
									<tr
										key={payment._id}
										className="hover:bg-base-200/20 transition-colors"
									>
										<td>
											<div className="font-bold text-primary">
												{payment.tutorName}
											</div>
											<div className="text-xs opacity-50">
												{payment.tutorEmail}
											</div>
										</td>
										<td className="font-medium">{payment.subject}</td>
										<td>
											<div className="flex items-center gap-1 text-xs font-mono bg-base-200 px-2 py-1 rounded w-fit">
												<FiHash className="text-base-content/50" />
												{payment.transactionId}
											</div>
										</td>
										<td>
											<div className="flex items-center gap-2 text-sm text-base-content/70">
												<FiCalendar />
												{new Date(payment.date).toLocaleDateString()}
											</div>
										</td>
										<td className="text-right">
											<div className="flex items-center justify-end gap-1 font-bold text-success">
												<FiDollarSign />
												{payment.amount} Tk
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</FadeIn>
		</div>
	);
};

export default Payments;
