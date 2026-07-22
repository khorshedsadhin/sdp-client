import React from "react";
import { FiCheck } from "react-icons/fi";
import Button from "../../Shared/Button/Button";
import { formatCurrency } from "../../../utils/currency";

const PlanCard = ({ plan, isCurrent, onSelect }) => {
  return (
    <div
      className={`bg-base-100 border rounded-2xl p-6 shadow-md flex flex-col ${
        isCurrent ? "border-primary ring-2 ring-primary/30" : "border-base-200"
      }`}
    >
      {isCurrent && <span className="badge badge-primary badge-sm self-start mb-2">Current Plan</span>}
      <h3 className="text-lg font-bold text-primary">{plan.name}</h3>
      <p className="text-sm text-base-content/60 mb-4">
        {plan.duration} Month{plan.duration > 1 ? "s" : ""}
      </p>
      <p className="text-3xl font-bold mb-6">{formatCurrency(plan.price)}</p>
      <ul className="space-y-2 mb-6 flex-1">
        <li className="flex items-center gap-2 text-sm text-base-content/80">
          <FiCheck className="text-success" /> Unlocks all premium features
        </li>
        <li className="flex items-center gap-2 text-sm text-base-content/80">
          <FiCheck className="text-success" /> Valid for {plan.duration} month{plan.duration > 1 ? "s" : ""}
        </li>
      </ul>
      <Button label="Choose Plan" fullWidth onClick={() => onSelect(plan)} />
    </div>
  );
};

export default PlanCard;
