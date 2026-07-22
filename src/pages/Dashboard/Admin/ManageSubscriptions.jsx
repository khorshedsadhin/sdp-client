import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FiSearch, FiUsers, FiTrendingUp, FiXCircle } from "react-icons/fi";
import { FaMoneyBillWave } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import FadeIn from "../../../components/Shared/FadeIn";
import { formatCurrency } from "../../../utils/currency";

const statusBadgeClass = (status) => {
  if (status === "Active") return "badge-success text-white";
  if (status === "Expired") return "badge-error text-white";
  return "badge-neutral";
};

const ManageSubscriptions = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");

  const { data: stats, isLoading: isStatsLoading } = useQuery({
    queryKey: ["admin-subscription-stats"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/admin/subscriptions/stats");
      return data;
    },
  });

  const { data: subscriptions = [], isLoading } = useQuery({
    queryKey: ["admin-subscriptions", search, role, status],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (role) params.set("role", role);
      if (status) params.set("status", status);
      const { data } = await axiosSecure.get(`/admin/subscriptions?${params.toString()}`);
      return data;
    },
  });

  if (isLoading || isStatsLoading) return <LoadingSpinner />;

  return (
    <div className="w-full">
      <FadeIn>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-primary">Subscriptions</h2>
          <p className="text-sm text-base-content/60">Monitor subscriber activity and revenue</p>
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
              <p className="text-xs text-base-content/60">Total Subscribers</p>
              <p className="text-xl font-bold">{stats?.totalSubscribers || 0}</p>
            </div>
          </div>
          <div className="bg-base-100 border border-base-200 rounded-xl p-5 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-success/10 text-success">
              <FiTrendingUp size={22} />
            </div>
            <div>
              <p className="text-xs text-base-content/60">Currently Active</p>
              <p className="text-xl font-bold">{stats?.activeCount || 0}</p>
            </div>
          </div>
          <div className="bg-base-100 border border-base-200 rounded-xl p-5 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-error/10 text-error">
              <FiXCircle size={22} />
            </div>
            <div>
              <p className="text-xs text-base-content/60">Cancelled</p>
              <p className="text-xl font-bold">{stats?.cancelledCount || 0}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search by email..."
              className="input input-bordered w-full pl-10"
              onChange={(e) => setSearch(e.target.value)}
            />
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <select className="select select-bordered" onChange={(e) => setRole(e.target.value)}>
            <option value="">All Roles</option>
            <option value="student">Student</option>
            <option value="tutor">Tutor</option>
          </select>
          <select className="select select-bordered" onChange={(e) => setStatus(e.target.value)}>
            <option value="">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Expired">Expired</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="overflow-x-auto bg-base-100 rounded-xl shadow-lg border border-base-200">
          <table className="table w-full align-middle">
            <thead className="bg-base-200/50">
              <tr>
                <th>Email</th>
                <th>Role</th>
                <th>Plan</th>
                <th>Price</th>
                <th>Expires On</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-gray-500">
                    No subscriptions found.
                  </td>
                </tr>
              ) : (
                subscriptions.map((sub) => (
                  <tr key={sub._id} className="hover:bg-base-200/20">
                    <td className="text-sm">{sub.email}</td>
                    <td className="capitalize">{sub.role}</td>
                    <td className="font-bold">{sub.planName}</td>
                    <td>{formatCurrency(sub.price)}</td>
                    <td>{new Date(sub.endDate).toLocaleDateString()}</td>
                    <td>
                      <span className={`badge ${statusBadgeClass(sub.status)} badge-sm font-bold`}>
                        {sub.status}
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

export default ManageSubscriptions;
