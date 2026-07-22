import React, { useState } from "react";
import { FiEye, FiEyeOff, FiLock } from "react-icons/fi";

const PasswordField = ({
  label,
  placeholder,
  registration,
  error,
  autoComplete = "new-password",
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text font-medium flex items-center gap-2">
          <FiLock /> {label}
        </span>
      </label>
      <div className="relative">
        <input
          {...registration}
          type={visible ? "text" : "password"}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="input input-bordered w-full rounded-lg focus:border-primary focus:outline-none pr-10"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          tabIndex={-1}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute z-10 right-3 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-base-content"
        >
          {visible ? <FiEyeOff /> : <FiEye />}
        </button>
      </div>
      {error && <span className="text-error text-xs mt-1">{error}</span>}
    </div>
  );
};

export default PasswordField;
