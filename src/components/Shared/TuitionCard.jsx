import React from "react";
import { Link } from "react-router";
import { FiMapPin, FiTag, FiUsers } from "react-icons/fi";
import Button from "./Button/Button";
import { formatCurrency } from "../../utils/currency";
import { tutorGenderPreferenceLabel } from "../../utils/gender";

// Shared tuition post card, used by the Home page "Latest Tuitions" section and
// the Browse Tuitions page so both stay in sync. `showNewBadge` is the only
// difference between the two original copies of this markup.
const TuitionCard = ({ tuition, showNewBadge = false }) => (
	<div className="group flex flex-col bg-base-200 hover:shadow-md border rounded-2xl p-6 border-primary/20 transition-all duration-300">
		{/* Card Header */}
		<div className="flex justify-between items-start mb-4">
			<div className="badge badge-secondary badge-outline font-medium">
				{tuition.class}
			</div>
			{showNewBadge && (
				<span className="text-xs font-semibold text-base-content/50 bg-base-200 px-2 py-1 rounded">
					New
				</span>
			)}
		</div>

		{/* Card Content */}
		<h3 className="text-xl font-bold text-base-content group-hover:text-primary transition-colors mb-2">
			{tuition.subject}
		</h3>

		<div className="space-y-3 mb-6 mt-auto">
			<div className="flex items-center gap-3 text-base-content/70">
				<FiMapPin className="text-primary shrink-0" />
				<span className="truncate text-sm">{tuition.location}</span>
			</div>
			<div className="flex items-center gap-3 text-base-content/70">
				<FiUsers className="text-primary shrink-0" />
				<span className="truncate text-sm">
					Preferred Tutor:{" "}
					<span className="font-medium text-base-content">
						{tutorGenderPreferenceLabel(tuition.preferredTutorGender)}
					</span>
				</span>
			</div>
			<div className="flex items-center gap-3 text-base-content font-semibold">
				<FiTag className="text-primary shrink-0" />
				<span>
					{formatCurrency(tuition.salary)}
					<span className="text-sm font-normal text-base-content/60">
						/month
					</span>
				</span>
			</div>
		</div>

		{/* Card Action */}
		<Link to={`/tuition/${tuition._id}`} className="w-full">
			<Button label="View Details" fullWidth small variant="primary" />
		</Link>
	</div>
);

export default TuitionCard;
