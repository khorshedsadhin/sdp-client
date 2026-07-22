import React from "react";
import { FiCheck } from "react-icons/fi";
import Button from "../../Shared/Button/Button";
import { formatCurrency } from "../../../utils/currency";

const CreditBundleCard = ({ quantity, feePerCredit, onSelect }) => {
  const total = feePerCredit * quantity;

  return (
    <div className="group bg-base-100 border border-base-200 rounded-2xl p-6 shadow-md flex flex-col transition-all duration-300 hover:border-primary/40 hover:shadow-lg">
      {/* Header */}
      <h3 className="text-lg font-bold text-primary">
        {quantity} Credit{quantity > 1 ? "s" : ""}
      </h3>
      <p className="text-sm text-base-content/60">{formatCurrency(feePerCredit)} per credit</p>

      {/* Price */}
      <p className="text-3xl font-bold text-base-content mt-4 mb-6">{formatCurrency(total)}</p>

      {/* Features */}
      <ul className="space-y-2.5 mb-6 flex-1">
        <li className="flex items-center gap-2 text-sm text-base-content/80">
          <FiCheck className="text-success shrink-0" /> Post {quantity} tuition{quantity > 1 ? "s" : ""}
        </li>
        <li className="flex items-center gap-2 text-sm text-base-content/80">
          <FiCheck className="text-success shrink-0" /> Credits never expire
        </li>
      </ul>

      <Button
        label={`Buy ${quantity} Credit${quantity > 1 ? "s" : ""}`}
        fullWidth
        onClick={() => onSelect(quantity)}
      />
    </div>
  );
};

export default CreditBundleCard;
