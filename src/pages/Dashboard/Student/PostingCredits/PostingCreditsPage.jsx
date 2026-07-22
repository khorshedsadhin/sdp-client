import React from "react";
import { useNavigate } from "react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import useCredits from "../../../../hooks/useCredits";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../../components/Shared/LoadingSpinner";
import CreditsStatusCard from "../../../../components/Dashboard/PostingCredits/CreditsStatusCard";
import CreditBundleCard from "../../../../components/Dashboard/PostingCredits/CreditBundleCard";
import CreditHistoryTable from "../../../../components/Dashboard/PostingCredits/CreditHistoryTable";

const PostingCreditsPage = () => {
  const navigate = useNavigate();
  const { loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    credits,
    availableCredits,
    purchasedCredits,
    usedCredits,
    isLoading: isCreditsLoading,
    refetch: refetchCredits,
  } = useCredits();

  const { data: feeConfig, isLoading: isFeeLoading } = useQuery({
    queryKey: ["posting-fee"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/posting-fee");
      return data;
    },
  });

  const { data: history = [], isLoading: isHistoryLoading } = useQuery({
    enabled: !authLoading,
    queryKey: ["credit-history"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/credits/history");
      return data;
    },
  });

  const { mutateAsync: cancelCredit, isPending: isCancelling } = useMutation({
    mutationFn: async () => {
      const { data } = await axiosSecure.patch("/credits/cancel");
      return data;
    },
  });

  // Mandatory confirmation before removing an unused credit. Request runs inside
  // preConfirm so the modal shows a loader and stays open (with the backend's
  // "already used" message) on failure; on success it closes and we toast.
  const handleCancelCredit = () => {
    Swal.fire({
      title: "Cancel Posting Credit?",
      html: `Are you sure you want to cancel this unused posting credit?<br/><br/>
        This action will <b>permanently remove one unused posting credit</b> from your account.<br/><br/>
        This action cannot be undone.<br/><br/>
        No refund will be provided.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Cancel Credit",
      cancelButtonText: "No, Keep Credit",
      confirmButtonColor: "#D62828",
      cancelButtonColor: "#2F9E44",
      reverseButtons: true,
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading(),
      preConfirm: async () => {
        try {
          return await cancelCredit();
        } catch (err) {
          Swal.showValidationMessage(
            err.response?.data?.message || "Cancellation failed. Please try again."
          );
          throw err;
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        refetchCredits();
        toast.success(
          "Your unused posting credit has been cancelled successfully. No refund has been issued."
        );
      }
    });
  };

  if (authLoading || isCreditsLoading || isFeeLoading || isHistoryLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <div>
        <h2 className="text-2xl font-bold text-primary mb-1">Posting Credits</h2>
        <p className="text-sm text-base-content/60">
          Each tuition post requires one posting credit. Buy credits below to keep posting.
        </p>
      </div>

      <CreditsStatusCard
        availableCredits={availableCredits}
        purchasedCredits={purchasedCredits}
        usedCredits={usedCredits}
        cancelledCredits={credits?.cancelledCredits || 0}
        totalAmountPaid={credits?.totalAmountPaid}
        onCancelCredit={handleCancelCredit}
        isCancelling={isCancelling}
      />

      <div id="credit-bundles">
        <h3 className="text-lg font-bold mb-4">Buy Posting Credits</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(feeConfig?.bundleOptions || []).map((quantity) => (
            <CreditBundleCard
              key={quantity}
              quantity={quantity}
              feePerCredit={feeConfig.feePerCredit}
              onSelect={(qty) =>
                navigate("/dashboard/student/posting-credits/payment", {
                  state: { quantity: qty, feePerCredit: feeConfig.feePerCredit },
                })
              }
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-4">Purchase History</h3>
        <CreditHistoryTable history={history} />
      </div>
    </div>
  );
};

export default PostingCreditsPage;
