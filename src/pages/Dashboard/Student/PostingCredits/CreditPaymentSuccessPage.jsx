import React from "react";
import { useLocation, useNavigate } from "react-router";
import { FiCheckCircle } from "react-icons/fi";
import useCredits from "../../../../hooks/useCredits";
import LoadingSpinner from "../../../../components/Shared/LoadingSpinner";
import Button from "../../../../components/Shared/Button/Button";
import { formatCurrency } from "../../../../utils/currency";

const CreditPaymentSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { credits: fetchedCredits, isLoading } = useCredits();

  const result = location.state?.credits;
  const availableCredits = result?.availableCredits ?? fetchedCredits?.availableCredits;
  const transaction = result?.transaction;

  if (!result && isLoading) return <LoadingSpinner />;

  if (!result && !fetchedCredits) {
    navigate("/dashboard/student/posting-credits", { replace: true });
    return null;
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-base-100 border border-base-200 rounded-2xl shadow-xl p-8 text-center">
        <FiCheckCircle className="mx-auto text-success mb-4" size={56} />
        <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
        <p className="text-sm text-base-content/60 mb-6">
          You now have {availableCredits} posting credit{availableCredits !== 1 ? "s" : ""} available.
        </p>

        {transaction && (
          <div className="text-left space-y-3 bg-base-200/50 rounded-xl p-4 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-base-content/60">Transaction ID</span>
              <span className="font-mono font-semibold">{transaction.transactionId}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-base-content/60">Amount Paid</span>
              <span className="font-semibold">{formatCurrency(transaction.amount)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-base-content/60">Payment Method</span>
              <span className="font-semibold">{transaction.paymentMethod}</span>
            </div>
          </div>
        )}

        <Button
          label="Go to Dashboard"
          fullWidth
          onClick={() => navigate("/dashboard/student/posting-credits")}
        />
      </div>
    </div>
  );
};

export default CreditPaymentSuccessPage;
