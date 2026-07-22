import React from "react";
import { useLocation, useNavigate } from "react-router";
import { FiCheckCircle } from "react-icons/fi";
import useSubscription from "../../../../hooks/useSubscription";
import LoadingSpinner from "../../../../components/Shared/LoadingSpinner";
import Button from "../../../../components/Shared/Button/Button";
import { formatCurrency } from "../../../../utils/currency";

const PaymentSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { subscription: fetchedSubscription, isLoading } = useSubscription();

  const subscription = location.state?.subscription || fetchedSubscription;

  if (!subscription && isLoading) return <LoadingSpinner />;

  if (!subscription) {
    navigate("/dashboard/subscription", { replace: true });
    return null;
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-base-100 border border-base-200 rounded-2xl shadow-xl p-8 text-center">
        <FiCheckCircle className="mx-auto text-success mb-4" size={56} />
        <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
        <p className="text-sm text-base-content/60 mb-6">
          Your {subscription.planName} plan is now active.
        </p>

        <div className="text-left space-y-3 bg-base-200/50 rounded-xl p-4 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-base-content/60">Transaction ID</span>
            <span className="font-mono font-semibold">{subscription.transactionId}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-base-content/60">Plan</span>
            <span className="font-semibold">{subscription.planName}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-base-content/60">Amount Paid</span>
            <span className="font-semibold">{formatCurrency(subscription.price)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-base-content/60">Payment Method</span>
            <span className="font-semibold">{subscription.paymentMethod}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-base-content/60">Valid Until</span>
            <span className="font-semibold">{new Date(subscription.endDate).toLocaleDateString()}</span>
          </div>
        </div>

        <Button label="Go to Dashboard" fullWidth onClick={() => navigate("/dashboard/subscription")} />
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
