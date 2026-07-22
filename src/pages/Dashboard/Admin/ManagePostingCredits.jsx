import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FiSearch, FiUsers, FiUserX } from "react-icons/fi";
import { FaMoneyBillWave } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import FadeIn from "../../../components/Shared/FadeIn";
import Button from "../../../components/Shared/Button/Button";
import { formatCurrency } from "../../../utils/currency";

const ManagePostingCredits = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [feeInput, setFeeInput] = useState("");

  const { data: stats, isLoading: isStatsLoading } = useQuery({
    queryKey: ["admin-posting-credit-stats"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/admin/posting-credits/stats");
      return data;
    },
  });

  const { data: feeConfig, isLoading: isFeeLoading } = useQuery({
    queryKey: ["posting-fee"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/posting-fee");
      return data;
    },
  });

  const { data: credits = [], isLoading } = useQuery({
    queryKey: ["admin-posting-credits", search],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      const { data } = await axiosSecure.get(`/admin/posting-credits?${params.toString()}`);
      return data;
    },
  });

  const { mutateAsync: updateFee, isPending: isUpdatingFee } = useMutation({
    mutationFn: async (feePerCredit) => {
      const { data } = await axiosSecure.patch("/admin/posting-fee", { feePerCredit });
      return data;
    },
    onSuccess: () => {
      toast.success("Posting fee updated.");
      queryClient.invalidateQueries({ queryKey: ["posting-fee"] });
      setFeeInput("");
    },
    onError: () => toast.error("Failed to update posting fee"),
  });

  if (isLoading || isStatsLoading || isFeeLoading) return <LoadingSpinner />;

  return (
    <div className="w-full">
      <FadeIn>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-primary">Posting Credits</h2>
          <p className="text-sm text-base-content/60">
            Manage the student pay-per-post fee and monitor credit purchases
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-base-100 border border-base-200 rounded-xl p-5 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-primary/10 text-primary">
              <FaMoneyBillWave size={22} />
            </div>
            <div>
              <p className="text-xs text-base-content/60">Total Revenue</p>
              <p className="text-xl font-bold">{formatCurrency(stats?.totalRevenue)}</p>
            </div>
          </div>
          <div className="bg-base-100 border border-base-200 rounded-xl p-5 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-secondary/10 text-secondary">
              <FiUsers size={22} />
            </div>
            <div>
              <p className="text-xs text-base-content/60">Students With Credits</p>
              <p className="text-xl font-bold">{stats?.studentsWithCredits || 0}</p>
            </div>
          </div>
          <div className="bg-base-100 border border-base-200 rounded-xl p-5 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-error/10 text-error">
              <FiUserX size={22} />
            </div>
            <div>
              <p className="text-xs text-base-content/60">Students With Zero Credits</p>
              <p className="text-xl font-bold">{stats?.studentsWithZeroCredits || 0}</p>
            </div>
          </div>
          <div className="bg-base-100 border border-base-200 rounded-xl p-5 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-success/10 text-success">
              <FaMoneyBillWave size={22} />
            </div>
            <div>
              <p className="text-xs text-base-content/60">Sold / Used / Cancelled</p>
              <p className="text-xl font-bold">
                {stats?.totalCreditsSold || 0} / {stats?.totalCreditsUsed || 0} /{" "}
                {stats?.totalCreditsCancelled || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-base-100 border border-base-200 rounded-xl p-5 mb-6 flex flex-col md:flex-row md:items-center gap-4">
          <div>
            <p className="text-xs text-base-content/60">Current Posting Fee</p>
            <p className="text-xl font-bold">{formatCurrency(feeConfig?.feePerCredit)} / credit</p>
          </div>
          <div className="flex-1 flex gap-3 md:justify-end">
            <input
              type="number"
              min="1"
              placeholder="New fee amount"
              className="input input-bordered w-full md:w-48"
              value={feeInput}
              onChange={(e) => setFeeInput(e.target.value)}
            />
            <Button
              label="Update Fee"
              loading={isUpdatingFee}
              disabled={!feeInput}
              onClick={() => updateFee(feeInput)}
            />
          </div>
        </div>

        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search by email..."
            className="input input-bordered w-full pl-10"
            onChange={(e) => setSearch(e.target.value)}
          />
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="overflow-x-auto bg-base-100 rounded-xl shadow-lg border border-base-200">
          <table className="table w-full align-middle">
            <thead className="bg-base-200/50">
              <tr>
                <th>Email</th>
                <th>Purchased</th>
                <th>Available</th>
                <th>Used</th>
                <th>Cancelled</th>
                <th>Total Paid</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {credits.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-gray-500">
                    No posting credit purchases found.
                  </td>
                </tr>
              ) : (
                credits.map((c) => (
                  <tr key={c._id} className="hover:bg-base-200/20">
                    <td className="text-sm">{c.email}</td>
                    <td>{c.purchasedCredits}</td>
                    <td>
                      <span className={`badge badge-sm font-bold ${c.availableCredits > 0 ? "badge-success" : "badge-error"} text-white`}>
                        {c.availableCredits}
                      </span>
                    </td>
                    <td>{c.usedCredits}</td>
                    <td>{c.cancelledCredits || 0}</td>
                    <td>{formatCurrency(c.totalAmountPaid)}</td>
                    <td>{c.updatedAt ? new Date(c.updatedAt).toLocaleDateString() : "-"}</td>
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

export default ManagePostingCredits;
