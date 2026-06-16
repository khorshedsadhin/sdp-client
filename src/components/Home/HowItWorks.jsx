import React from "react";
import { FiSearch, FiUserCheck, FiBookOpen } from "react-icons/fi";
import FadeIn from "../Shared/FadeIn";

const HowItWorks = () => {
	const steps = [
		{
			icon: FiSearch,
			title: "1. Post a Requirement",
			desc: "Students post their tuition needs including subject, class, and budget details.",
			color: "text-primary",
			bg: "bg-primary/10",
		},
		{
			icon: FiUserCheck,
			title: "2. Connect with Tutors",
			desc: "Qualified tutors apply to your post. Review their profiles and select the best match.",
			color: "text-secondary",
			bg: "bg-secondary/10",
		},
		{
			icon: FiBookOpen,
			title: "3. Start Learning",
			desc: "Confirm the tutor and begin your learning journey securely.",
			color: "text-accent",
			bg: "bg-accent/10",
		},
	];

	return (
		<section className="py-16 bg-base-100 font-manrope">
			<div className="container mx-auto px-4">
				{/* 1 */}
        <FadeIn>

				<div className="text-center mb-16 max-w-2xl mx-auto">
					<h2 className="text-base-content">How It Works</h2>
					<p className="text-base-content/70 mt-4 text-lg">
						Get started with eTuitionBD in 3 simple steps
					</p>
				</div>
        </FadeIn>

				{/* 2 */}
        <FadeIn delay={0.2}>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
					<div className="hidden md:block absolute top-10 left-[16%] right-[16%] h-0.5 bg-base-200 -z-10"></div>

					{steps.map((step, idx) => (
						<div
							key={idx}
							className="flex flex-col items-center text-center bg-base-100"
						>
							{/* Icon */}
							<div
								className={`w-20 h-20 rounded-2xl ${step.bg} ${step.color} flex items-center justify-center mb-6`}
							>
								<step.icon size={32} />
							</div>

							{/* Content */}
							<h3 className="text-xl font-bold mb-3 text-base-content">
								{step.title}
							</h3>
							<p className="text-base-content/70 leading-relaxed max-w-xs">
								{step.desc}
							</p>
						</div>
					))}
				</div>
        </FadeIn>
			</div>
		</section>
	);
};

export default HowItWorks;
