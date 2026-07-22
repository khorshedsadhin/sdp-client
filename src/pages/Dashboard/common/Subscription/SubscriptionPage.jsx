import React from "react";
import { useNavigate } from "react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import useRole from "../../../../hooks/useRole";
import useSubscription from "../../../../hooks/useSubscription";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../../components/Shared/LoadingSpinner";
import SubscriptionStatusCard from "../../../../components/Dashboard/Subscription/SubscriptionStatusCard";
import PlanCard from "../../../../components/Dashboard/Subscription/PlanCard";
import SubscriptionHistoryTable from "../../../../components/Dashboard/Subscription/SubscriptionHistoryTable";

const SubscriptionPage = () => {
  const navigate = useNavigate();
  const { loading: authLoading } = useAuth();
  const [role, isRoleLoading] = useRole();
  const axiosSecure = useAxiosSecure();
  const { subscription, isActive, daysRemaining, isLoading: isSubLoading, refetch } = useSubscription();

  const { mutateAsync: cancelSubscription, isPending: isCancelling } = useMutation({
    mutationFn: async () => {
      const { data } = await axiosSecure.patch("/subscription/cancel");
      return data;
    },
  });

  // Mandatory confirmation before the destructive action (SweetAlert = existing
  // pattern). The request runs inside preConfirm so the modal shows a loader and
  // stays open on failure; on success it closes and we toast + refetch.
  const handleCancelSubscription = () => {
    Swal.fire({
      title: "Cancel Subscription?",
      html: `Are you sure you want to cancel your subscription?<br/><br/>
        Your subscription will be cancelled <b>immediately</b>, and you will instantly lose access to all premium tutor features.<br/><br/>
        After cancellation, you will no longer be able to:<br/>
        &bull; Apply for tuition posts<br/>
        &bull; Access subscription-only features<br/>
        &bull; Use premium tutor services<br/><br/>
        To regain these features, you must purchase a new subscription.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Cancel Subscription",
      cancelButtonText: "No, Keep Subscription",
      confirmButtonColor: "#D62828",
      cancelButtonColor: "#2F9E44",
      reverseButtons: true,
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading(),
      preConfirm: async () => {
        try {
          return await cancelSubscription();
        } catch (err) {
          Swal.showValidationMessage(
            err.response?.data?.message || "Cancellation failed. Please try again."
          );
          throw err;
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        refetch();
        toast.success(
          "Your subscription has been cancelled successfully. Premium features have been disabled. Subscribe again to continue applying for tuition posts."
        );
      }
    });
  };

  const { data: plans = [], isLoading: isPlansLoading } = useQuery({
    enabled: !isRoleLoading && !!role,
    queryKey: ["subscription-plans", role],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/subscription-plans?role=${role}`);
      return data;
    },
  });

  const { data: history = [], isLoading: isHistoryLoading } = useQuery({
    enabled: !authLoading,
    queryKey: ["subscription-history"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/subscription/history");
      return data;
    },
  });

  if (authLoading || isRoleLoading || isSubLoading || isPlansLoading || isHistoryLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <div>
        <h2 className="text-2xl font-bold text-primary mb-1">Subscription</h2>
        <p className="text-sm text-base-content/60">
          Manage your plan and unlock premium {role} features.
        </p>
      </div>

      <SubscriptionStatusCard
        subscription={subscription}
        isActive={isActive}
        daysRemaining={daysRemaining}
        onCancel={handleCancelSubscription}
        isCancelling={isCancelling}
      />

      <div id="subscription-plans">
        <h3 className="text-lg font-bold mb-4">Available Plans</h3>
        {plans.length === 0 ? (
          <div className="text-center py-10 text-base-content/60 bg-base-200/50 rounded-xl">
            No plans available right now. Please check back later.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <PlanCard
                key={plan._id}
                plan={plan}
                isCurrent={isActive && subscription?.planId === plan._id}
                onSelect={(selectedPlan) =>
                  navigate("/dashboard/subscription/payment", { state: { plan: selectedPlan } })
                }
              />
            ))}
          </div>
        )}
      </div>

      <div>
        <h3 className="text-lg font-bold mb-4">Subscription History</h3>
        <SubscriptionHistoryTable history={history} />
      </div>
    </div>
  );
};

export default SubscriptionPage;
