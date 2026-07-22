import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FiLock, FiShield } from "react-icons/fi";
import useAuth from "../../../hooks/useAuth";
import Button from "../../../components/Shared/Button/Button";
import PasswordField from "../../../components/Shared/PasswordField";

const PASSWORD_RULES = {
  lower: /[a-z]/,
  special: /[^A-Za-z0-9]/,
};

const FIREBASE_ERROR_MESSAGES = {
  "auth/wrong-password": "Current password is incorrect.",
  "auth/invalid-credential": "Current password is incorrect.",
  "auth/too-many-requests": "Too many attempts. Please try again later.",
  "auth/requires-recent-login": "Please log out and log back in, then try again.",
  "auth/weak-password": "New password is too weak.",
};

const SecuritySettings = () => {
  const { user, changePassword } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const newPassword = watch("newPassword");

  const onSubmit = async ({ currentPassword, newPassword }) => {
    setSubmitting(true);
    try {
      await changePassword(currentPassword, newPassword);
      toast.success("Password updated successfully!");
      reset();
    } catch (error) {
      toast.error(
        FIREBASE_ERROR_MESSAGES[error.code] ||
          "Failed to update password. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-10 pt-8 border-t border-base-200">
      <h3 className="text-lg font-bold mb-6 border-b pb-2 flex items-center gap-2">
        <FiShield /> Security Settings
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Hidden username field so browsers don't confuse other fields in this
            form for a login username and autofill the wrong values into them. */}
        <input
          type="text"
          name="email"
          value={user?.email || ""}
          autoComplete="username"
          readOnly
          hidden
        />

        <PasswordField
          label="Current Password"
          placeholder="Enter your current password"
          autoComplete="current-password"
          registration={register("currentPassword", {
            required: "Current password is required",
            setValueAs: (v) => (v || "").trim(),
          })}
          error={errors.currentPassword?.message}
        />

        <PasswordField
          label="New Password"
          placeholder="Enter a new password"
          autoComplete="new-password"
          registration={register("newPassword", {
            required: "New password is required",
            setValueAs: (v) => (v || "").trim(),
            validate: {
              lower: (v) =>
                PASSWORD_RULES.lower.test(v) ||
                "Password must include a lowercase letter",
              special: (v) =>
                PASSWORD_RULES.special.test(v) ||
                "Password must include a special character",
              different: (v, formValues) =>
                v !== formValues.currentPassword ||
                "New password must be different from your current password",
            },
          })}
          error={errors.newPassword?.message}
        />

        <PasswordField
          label="Confirm New Password"
          placeholder="Re-enter your new password"
          autoComplete="new-password"
          registration={register("confirmPassword", {
            required: "Please confirm your new password",
            setValueAs: (v) => (v || "").trim(),
            validate: (v) => v === newPassword || "Passwords do not match",
          })}
          error={errors.confirmPassword?.message}
        />

        <div className="pt-2 flex justify-end">
          <div className="w-full md:w-auto">
            <Button
              label={submitting ? "Updating..." : "Update Password"}
              type="submit"
              icon={FiLock}
              loading={submitting}
              fullWidth
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SecuritySettings;
