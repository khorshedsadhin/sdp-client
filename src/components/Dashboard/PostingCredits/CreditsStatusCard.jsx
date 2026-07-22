import React from "react";
import { FiPlusCircle, FiXCircle } from "react-icons/fi";
import { FaMoneyBillWave } from "react-icons/fa";
import Button from "../../Shared/Button/Button";
import { formatCurrency } from "../../../utils/currency";

const CreditsStatusCard = ({
  availableCredits,
  purchasedCredits,
  usedCredits,
  cancelledCredits,
  totalAmountPaid,
  onCancelCredit,
  isCancelling,
}) => {
  const stats = [
    { label: "Available Credits", value: availableCredits, accent: true },
    { label: "Used Credits", value: usedCredits },
    { label: "Cancelled Credits", value: cancelledCredits },
    { label: "Total Purchased", value: purchasedCredits },
    { label: "Total Paid", value: formatCurrency(totalAmountPaid) },
  ];

  return (
    <div className="bg-base-100 border border-base-200 rounded-2xl p-6 md:p-8 shadow-md">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-primary/10 text-primary">
          <FaMoneyBillWave size={24} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-primary">Posting Credits</h3>
          <p className="text-sm text-base-content/60">One credit lets you post one tuition.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        {stats.map(({ label, value, accent }) => (
          <div
            key={label}
            className={`rounded-xl p-4 flex flex-col justify-center ${
              accent ? "bg-primary/5 border-l-4 border-primary" : "bg-base-200/50"
            }`}
          >
            <span
              className={`text-xs mb-1 ${accent ? "font-medium text-primary/70" : "text-base-content/60"}`}
            >
              {label}
            </span>
            <span className={`text-2xl font-bold ${accent ? "text-primary" : "text-base-content"}`}>
              {value}
            </span>
          </div>
        ))}
      </div>

      {availableCredits === 0 && (
        <div className="text-sm font-medium text-red-400 bg-red-400/10 px-4 py-3 rounded-lg mb-4">
          You have no posting credits remaining. Purchase more to post a new tuition.
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-base-200">
        <Button
          label="Purchase More Credits"
          icon={FiPlusCircle}
          onClick={() =>
            document.getElementById("credit-bundles")?.scrollIntoView({ behavior: "smooth" })
          }
        />
        {availableCredits > 0 && (
          <Button
            label="Cancel Unused Credit"
            icon={FiXCircle}
            variant="softError"
            loading={isCancelling}
            onClick={onCancelCredit}
          />
        )}
      </div>
    </div>
  );
};

export default CreditsStatusCard;
