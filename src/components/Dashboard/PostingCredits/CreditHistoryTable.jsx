import React from "react";
import { formatCurrency } from "../../../utils/currency";

const CreditHistoryTable = ({ history = [] }) => {
  if (history.length === 0) {
    return (
      <div className="text-center py-10 text-base-content/60 bg-base-200/50 rounded-xl">
        No credit purchases yet.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-base-100 border border-base-200 rounded-2xl">
      <table className="table">
        <thead>
          <tr>
            <th>Amount</th>
            <th>Method</th>
            <th>Transaction ID</th>
            <th>Purchased On</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {history
            .slice()
            .reverse()
            .map((txn) => (
              <tr key={txn.transactionId}>
                <td className="font-medium">{formatCurrency(txn.amount)}</td>
                <td className="capitalize">{txn.paymentMethod}</td>
                <td className="font-mono text-xs">{txn.transactionId}</td>
                <td>{new Date(txn.purchaseDate).toLocaleDateString()}</td>
                <td>
                  <span className="badge badge-success badge-sm font-bold text-white">
                    {txn.paymentStatus}
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default CreditHistoryTable;
