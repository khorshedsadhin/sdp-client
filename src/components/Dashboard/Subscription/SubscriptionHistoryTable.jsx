import React from "react";
import { formatCurrency } from "../../../utils/currency";

const statusBadgeClass = (status) => {
  if (status === "Active") return "badge-success text-white";
  if (status === "Expired") return "badge-error text-white";
  return "badge-neutral text-black";
};

const SubscriptionHistoryTable = ({ history = [] }) => {
  if (history.length === 0) {
    return (
      <div className="text-center py-10 text-base-content/60 bg-base-200/50 rounded-xl">
        No subscription history yet.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-base-100 border border-base-200 rounded-2xl">
      <table className="table">
        <thead>
          <tr>
            <th>Plan</th>
            <th>Duration</th>
            <th>Price</th>
            <th>Method</th>
            <th>Transaction ID</th>
            <th>Purchased On</th>
            <th>Expires On</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {history.map((sub) => (
            <tr key={sub._id}>
              <td className="font-medium">{sub.planName}</td>
              <td>
                {sub.duration} Month{sub.duration > 1 ? "s" : ""}
              </td>
              <td>{formatCurrency(sub.price)}</td>
              <td className="capitalize">{sub.paymentMethod}</td>
              <td className="font-mono text-xs">{sub.transactionId}</td>
              <td>{new Date(sub.createdAt).toLocaleDateString()}</td>
              <td>{new Date(sub.endDate).toLocaleDateString()}</td>
              <td>
                <span className={`badge ${statusBadgeClass(sub.status)} badge-sm font-bold`}>{sub.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubscriptionHistoryTable;
