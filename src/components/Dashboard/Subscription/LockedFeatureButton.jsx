import React from "react";
import { useNavigate } from "react-router";
import { FiLock } from "react-icons/fi";
import Button from "../../Shared/Button/Button";

// Drop-in replacement for a premium action button when the caller has no
// active subscription - routes to the Subscription page instead of the action.
const LockedFeatureButton = ({ label = "Subscribe to unlock", fullWidth, small }) => {
  const navigate = useNavigate();

  return (
    <Button
      label={label}
      icon={FiLock}
      variant="softError"
      fullWidth={fullWidth}
      small={small}
      onClick={() => navigate("/dashboard/subscription")}
    />
  );
};

export default LockedFeatureButton;
