import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FaGoogle } from "react-icons/fa";
import Button from "../../components/Shared/Button/Button";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import toast from "react-hot-toast";
import { saveOrUpdateUser } from "../../utils";

const Login = () => {
  const { signIn, signInWithGoogle, loading, user, setLoading } = useAuth();
	const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || '/';

	const {
  register,
  handleSubmit,
		formState: { errors },
	} = useForm();

  if(loading) return <LoadingSpinner />
  if(user) return <Navigate to={from} replace={true} />
    
	const onSubmit = async(data) => {
    try {
      await signIn(data.email, data.password);
      toast.success("Login Successful!");
      navigate(from, {replace: true});
    }
    catch(err) {
      toast.error(err?.message);
      setLoading(false);
    }
	};

	const handleGoogleLogin = async() => {
    try {
      const defaultRole = "student";

      const { user } = await signInWithGoogle();
      await saveOrUpdateUser({ name: user?.displayName, email: user?.email, image: user?.photoURL, role: defaultRole });

      toast.success("Login Successful!");
      navigate(from, {replace: true});
    }
    catch(err) {
      toast.error(err?.message);
      setLoading(false);
    }
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-base-100 px-4 py-10">
			<motion.div
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.3, ease: "easeOut" }}
				className="w-full max-w-md overflow-hidden rounded-2xl bg-base-200 shadow-xl"
			>
				<div className="p-8">
					<div className="text-center">
						<h3 className="text-primary font-bold">Welcome Back</h3>
					</div>

					{/* form */}
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
						{/* email */}
						<div className="form-control">
							<label className="label">
								<span className="label-text font-medium">Email Address</span>
							</label>

							<input
								type="email"
								placeholder="you@example.com"
								className={`input input-bordered w-full rounded-lg focus:border-primary focus:outline-none ${
									errors.email ? "input-error" : ""
								}`}
								{...register("email", { required: "Email is required" })}
							/>
							{errors.email && (
								<span className="mt-1 text-xs text-error">
									{errors.email.message}
								</span>
							)}
						</div>

						{/* password */}
						<div className="form-control">
							<label className="label">
								<span className="label-text font-medium">Password</span>
							</label>

							<div className="relative">
								<input
									type={showPassword ? "text" : "password"}
									placeholder="Enter your password"
									className={`input input-bordered w-full rounded-lg focus:border-primary focus:outline-none ${
										errors.password ? "input-error" : ""
									}`}
									{...register("password", {
										required: "Password is required",
										minLength: {
											value: 6,
											message: "Password must be at least 6 characters",
										},
									})}
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute inset-y-0 right-0 flex items-center pr-3 text-base-content/50 hover:text-primary"
								>
									{showPassword ? <FiEyeOff /> : <FiEye />}
								</button>
							</div>
							{errors.password && (
								<span className="mt-1 text-xs text-error">
									{errors.password.message}
								</span>
							)}
							<br></br>

							{/* <label className="label">
								<Link
									to={"#"}
									className="label-text-alt link link-hover text-primary"
								>
									Forgot password?
								</Link>
							</label> */}
						</div>

						{/* submit */}
						<Button label="Login" type="submit" fullWidth />
					</form>

					<div className="divider text-xs text-base-content/50">OR</div>
					<Button
						onClick={handleGoogleLogin}
						label="Continue with Google"
						variant="blackOutline"
						icon={FaGoogle}
						fullWidth
					/>

					{/* Footer */}
					<p className="mt-6 text-center text-sm text-base-content/70">
						Don't have an account?{" "}
						<Link
							to="/register"
							className="font-semibold text-primary hover:underline"
						>
							Create Account
						</Link>
					</p>
				</div>
			</motion.div>
		</div>
	);
};

export default Login;
