import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FiSmartphone, FiLock } from "react-icons/fi";
import { FaCcVisa, FaCcMastercard } from "react-icons/fa";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Button from "../../../../components/Shared/Button/Button";
import { formatCurrency } from "../../../../utils/currency";

const paymentMethods = [
  { id: "bKash", label: "bKash", type: "mobile", color: "bg-pink-600" },
  { id: "Nagad", label: "Nagad", type: "mobile", color: "bg-orange-600" },
  { id: "Rocket", label: "Rocket", type: "mobile", color: "bg-purple-700" },
  { id: "Visa", label: "Visa", type: "card", icon: FaCcVisa },
  { id: "Mastercard", label: "Mastercard", type: "card", icon: FaCcMastercard },
];

const MockCreditPaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const quantity = location.state?.quantity;
  const feePerCredit = location.state?.feePerCredit;

  const [method, setMethod] = useState(paymentMethods[0]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutateAsync: pay, isPending } = useMutation({
    mutationFn: async () => {
      const { data } = await axiosSecure.post("/credits/purchase", {
        quantity,
        paymentMethod: method.id,
      });
      return data;
    },
    onSuccess: (data) => {
      toast.success("Payment successful! Posting credits added.");
      navigate("/dashboard/student/posting-credits/success", { state: { credits: data } });
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Payment failed. Please try again.");
    },
  });

  if (!quantity) {
    navigate("/dashboard/student/posting-credits", { replace: true });
    return null;
  }

  const onSubmit = async () => {
    await pay();
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-base-100 border border-base-200 rounded-2xl shadow-xl p-6 md:p-8">
        <div className="flex items-center gap-2 text-primary mb-1">
          <FiLock />
          <span className="text-xs font-semibold uppercase tracking-wide">Secure Mock Checkout</span>
        </div>
        <h2 className="text-2xl font-bold mb-1">Complete Your Payment</h2>
        <p className="text-sm text-base-content/60 mb-6">
          {quantity} Posting Credit{quantity > 1 ? "s" : ""} &middot;{" "}
          <span className="font-bold text-primary">{formatCurrency(feePerCredit * quantity)}</span>
        </p>

        {/* Payment method selector */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {paymentMethods.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMethod(m)}
              className={`flex flex-col items-center justify-center gap-1 rounded-xl border-2 p-3 transition-all ${
                method.id === m.id ? "border-primary bg-primary/5" : "border-base-200"
              }`}
            >
              {m.type === "mobile" ? (
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${m.color}`}>
                  <FiSmartphone size={16} />
                </span>
              ) : (
                <m.icon size={32} />
              )}
              <span className="text-xs font-semibold">{m.label}</span>
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {method.type === "mobile" ? (
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">{method.label} Mobile Number</span>
              </label>
              <input
                {...register("mobileNumber", { required: "Mobile number is required" })}
                type="text"
                placeholder="01XXXXXXXXX"
                className="input input-bordered w-full"
              />
              {errors.mobileNumber && (
                <span className="text-error text-xs mt-1">{errors.mobileNumber.message}</span>
              )}
            </div>
          ) : (
            <>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Card Number</span>
                </label>
                <input
                  {...register("cardNumber", { required: "Card number is required" })}
                  type="text"
                  placeholder="4242 4242 4242 4242"
                  className="input input-bordered w-full"
                />
                {errors.cardNumber && (
                  <span className="text-error text-xs mt-1">{errors.cardNumber.message}</span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Expiry Date</span>
                  </label>
                  <input
                    {...register("expiryDate", { required: "Required" })}
                    type="text"
                    placeholder="MM/YY"
                    className="input input-bordered w-full"
                  />
                  {errors.expiryDate && (
                    <span className="text-error text-xs mt-1">{errors.expiryDate.message}</span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">CVV</span>
                  </label>
                  <input
                    {...register("cvv", { required: "Required" })}
                    type="text"
                    placeholder="123"
                    className="input input-bordered w-full"
                  />
                  {errors.cvv && <span className="text-error text-xs mt-1">{errors.cvv.message}</span>}
                </div>
              </div>
            </>
          )}

          <p className="text-xs text-base-content/50">
            This is a simulated payment for demo purposes. No real transaction will occur - any values
            work.
          </p>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => navigate(-1)} className="btn btn-ghost">
              Cancel
            </button>
            <Button label="Pay Now" loading={isPending} fullWidth />
          </div>
        </form>
      </div>
    </div>
  );
};

export default MockCreditPaymentPage;
