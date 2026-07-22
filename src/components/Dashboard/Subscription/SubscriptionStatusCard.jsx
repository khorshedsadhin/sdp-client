import React from "react";
import { FiAward, FiCalendar, FiClock, FiRefreshCw, FiXCircle } from "react-icons/fi";
import Button from "../../Shared/Button/Button";
import { formatCurrency } from "../../../utils/currency";

const statusBadgeClass = (status) => {
  if (status === "Active") return "badge-success text-white";
  if (status === "Expired") return "badge-error text-white";
  return "badge-neutral text-black";
};

const SubscriptionStatusCard = ({ subscription, isActive, daysRemaining, onCancel, isCancelling }) => {
  if (!subscription) {
    return (
      <div className="bg-base-100 border border-base-200 rounded-2xl p-8 text-center shadow-md">
        <h3 className="text-lg font-bold text-base-content mb-2">No Subscription Yet</h3>
        <p className="text-sm text-base-content/60">
          Choose a plan below to unlock premium features.
        </p>
      </div>
    );
  }

  const effectiveStatus = isActive
    ? "Active"
    : subscription.status === "Cancelled"
    ? "Cancelled"
    : "Expired";

  return (
    <div className="bg-base-100 border border-base-200 rounded-2xl p-6 md:p-8 shadow-md">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-primary/10 text-primary">
            <FiAward size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-primary">{subscription.planName} Plan</h3>
            <p className="text-sm text-base-content/60 capitalize">{subscription.role} subscription</p>
          </div>
        </div>
        <span className={`badge ${statusBadgeClass(effectiveStatus)} badge-lg font-bold`}>
          {effectiveStatus}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-base-200/50 rounded-xl">
          <p className="text-xs text-base-content/60 flex items-center gap-1 mb-1">
            <FiCalendar /> Start Date
          </p>
          <p className="font-bold text-sm">{new Date(subscription.startDate).toLocaleDateString()}</p>
        </div>
        <div className="p-4 bg-base-200/50 rounded-xl">
          <p className="text-xs text-base-content/60 flex items-center gap-1 mb-1">
            <FiCalendar /> Expires On
          </p>
          <p className="font-bold text-sm">{new Date(subscription.endDate).toLocaleDateString()}</p>
        </div>
        <div className="p-4 bg-base-200/50 rounded-xl">
          <p className="text-xs text-base-content/60 flex items-center gap-1 mb-1">
            <FiClock /> Days Remaining
          </p>
          <p className={`font-bold text-sm ${isActive && daysRemaining <= 7 ? "text-warning" : ""}`}>
            {isActive ? daysRemaining : 0}
          </p>
        </div>
        <div className="p-4 bg-base-200/50 rounded-xl">
          <p className="text-xs text-base-content/60 mb-1">Price Paid</p>
          <p className="font-bold text-sm">{formatCurrency(subscription.price)}</p>
        </div>
      </div>

      {isActive && daysRemaining <= 7 && (
        <div className="text-sm font-medium text-warning bg-warning/10 px-4 py-3 rounded-lg mb-4">
          Your subscription expires in {daysRemaining} day{daysRemaining !== 1 ? "s" : ""}. Renew soon to
          avoid losing access.
        </div>
      )}

      {!isActive && effectiveStatus === "Cancelled" && (
        <div className="text-sm font-medium text-error bg-error/10 px-4 py-3 rounded-lg mb-4">
          Your subscription was cancelled
          {subscription.cancelledAt
            ? ` on ${new Date(subscription.cancelledAt).toLocaleDateString()}`
            : ""}
          . Premium features are disabled. Subscribe again to regain access.
        </div>
      )}

      {!isActive && effectiveStatus === "Expired" && (
        <div className="text-sm font-medium text-error bg-error/10 px-4 py-3 rounded-lg mb-4">
          Your subscription has expired. Renew to regain access to premium features.
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        {isActive ? (
          <>
            <Button
              label="Renew Subscription"
              icon={FiRefreshCw}
              onClick={() =>
                document.getElementById("subscription-plans")?.scrollIntoView({ behavior: "smooth" })
              }
            />
            <Button
              label="Cancel Subscription"
              icon={FiXCircle}
              variant="softError"
              loading={isCancelling}
              onClick={onCancel}
            />
          </>
        ) : (
          <Button
            label={effectiveStatus === "Cancelled" ? "Subscribe Again" : "Subscribe Now"}
            icon={FiRefreshCw}
            onClick={() =>
              document.getElementById("subscription-plans")?.scrollIntoView({ behavior: "smooth" })
            }
          />
        )}
      </div>
    </div>
  );
};

export default SubscriptionStatusCard;
