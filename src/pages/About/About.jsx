import React from "react";
import { motion } from "framer-motion";
import { FiUsers, FiAward, FiBookOpen } from "react-icons/fi";
import FadeIn from "../../components/Shared/FadeIn";

const About = () => {
	return (
		<div className="min-h-screen bg-base-100 text-base-content">
			<FadeIn>
				<section className="px-6 py-20 text-center">
					<div className="mx-auto max-w-3xl">
						<h4 className="mb-4 font-bold uppercase tracking-widest text-secondary text-sm">
							About eTuitionBD
						</h4>
						<h1 className="leading-tight text-primary">
							Making Quality Education <br className="hidden md:block" />
							Accessible to Everyone.
						</h1>
						<p className="mt-6 text-lg text-base-content/60 leading-relaxed">
							We are on a mission to bridge the gap between students seeking
							knowledge and tutors ready to share it. A simple, secure
							connection for a brighter future.
						</p>
					</div>
				</section>
			</FadeIn>

			<FadeIn delay={0.3}>
				<section className="px-6 pb-20">
					<div className="mx-auto max-w-6xl">
						<div className="overflow-hidden rounded-3xl bg-base-200">
							<div className="grid md:grid-cols-2">
								{/* Image Side */}
								<div className="h-64 md:h-auto">
									<img
										src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
										alt="Team working"
										className="h-full w-full object-cover"
									/>
								</div>

								{/* Content Side */}
								<div className="flex flex-col justify-center p-8 md:p-16">
									<h3 className="mb-4 text-2xl font-bold text-primary">
										Who We Are
									</h3>
									<p className="mb-6 text-base-content/70 leading-relaxed">
										eTuitionBD was built to solve a real problem: the hassle of
										finding verified tutors nearby. We believe that learning
										shouldn't be complicated.
									</p>
									<p className="mb-8 text-base-content/70 leading-relaxed">
										Our platform creates a safe environment where students can
										post requirements and tutors can find opportunities that
										match their skills—all with transparent communication and
										secure payments.
									</p>

									{/* Simple Stats Grid */}
									<div className="grid grid-cols-2 gap-6">
										<div>
											<h4 className="text-3xl font-bold text-secondary">
												500+
											</h4>
											<p className="text-sm text-base-content/60">
												Active Tutors
											</p>
										</div>
										<div>
											<h4 className="text-3xl font-bold text-secondary">
												1.2k
											</h4>
											<p className="text-sm text-base-content/60">
												Students Helped
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</FadeIn>

			<FadeIn>
				<section className="bg-base-200/50 py-20 px-6">
					<div className="mx-auto max-w-6xl">
						<div className="grid gap-10 md:grid-cols-3 text-center">
							{/* Value 1 */}
							<div className="flex flex-col items-center">
								<div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
									<FiUsers size={28} />
								</div>
								<h3 className="mb-2 text-lg font-bold text-primary">
									Community First
								</h3>
								<p className="max-w-xs text-sm text-base-content/70">
									We prioritize the safety and success of our community above
									all else.
								</p>
							</div>

							{/* Value 2 */}
							<div className="flex flex-col items-center">
								<div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10 text-secondary">
									<FiAward size={28} />
								</div>
								<h3 className="mb-2 text-lg font-bold text-primary">
									Quality Verified
								</h3>
								<p className="max-w-xs text-sm text-base-content/70">
									Every tutor is verified to ensure students get the best
									guidance possible.
								</p>
							</div>

							{/* Value 3 */}
							<div className="flex flex-col items-center">
								<div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
									<FiBookOpen size={28} />
								</div>
								<h3 className="mb-2 text-lg font-bold text-primary">
									Lifelong Learning
								</h3>
								<p className="max-w-xs text-sm text-base-content/70">
									We encourage continuous growth for both our students and our
									tutors.
								</p>
							</div>
						</div>
					</div>
				</section>
			</FadeIn>
		</div>
	);
};

export default About;
