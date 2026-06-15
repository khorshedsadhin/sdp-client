import React, { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { motion } from "framer-motion";
import { FaGoogle } from "react-icons/fa";
import Button from "../../components/Shared/Button/Button";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { imageUpload, saveOrUpdateUser } from "../../utils";
import { toast } from 'react-hot-toast'
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const Register = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading, setLoading, user } = useAuth();
	const [showPassword, setShowPassword] = useState(false);
	const [role, setRole] = useState("student");

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

	const onSubmit = async (data) => {
    const { name, image, email, password } = data;
    const imageFile = image[0];

    try {
      const imageURL = await imageUpload(imageFile);
      
      //1. User Registration
      const result = await createUser(email, password);
      await saveOrUpdateUser({ name, email, image: imageURL, role });

      //3. Save username & profile photo
      await updateUserProfile(
        name,
        imageURL
      )

      navigate(from, { replace: true })
      toast.success('Signup Successful')
    }

    catch(err) {
      toast.error(err?.message);
      setLoading(false);
    }
	};

	const handleGoogleRegister = async() => {
		try {
      const defaultRole = "student";

      const { user } = await signInWithGoogle()
      await saveOrUpdateUser({ name: user?.displayName, email: user?.email, image: user?.photoURL, role: defaultRole });

      navigate(from, { replace: true })
      toast.success('Signup Successful')
    } catch (err) {
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
						<h3 className="text-primary font-bold">Join eTuitionBD</h3>
					</div>

					{/* form */}
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
						{/* Role Selection */}
						<div className="form-control">
							<label className="label">
								<span className="label-text font-medium">
									I want to join as
								</span>
							</label>
							<div className="grid grid-cols-2 gap-4">
								{/* Student Option */}
								<div
									onClick={() => setRole("student")}
									className={`cursor-pointer rounded-lg border p-3 text-center transition-all ${
										role === "student"
											? "register-role"
											: "border-base-300 hover:border-base-content/30"
									}`}
								>
									Student
								</div>

								{/* Tutor Option */}
								<div
									onClick={() => setRole("tutor")}
									className={`cursor-pointer rounded-lg border p-3 text-center transition-all ${
										role === "tutor"
											? "register-role"
											: "border-base-300 hover:border-base-content/30"
									}`}
								>
									Tutor
								</div>
							</div>
						</div>

						{/* Name */}
						<div className="form-control">
							<label className="label">
								<span className="label-text font-medium">Full Name</span>
							</label>
							<input
								type="text"
								placeholder="Your Name"
								className="input input-bordered w-full rounded-lg focus:border-primary focus:outline-none"
								{...register("name", { required: "Name is required" })}
							/>
							{errors.name && (
								<span className="mt-1 text-xs text-error">
									{errors.name.message}
								</span>
							)}
						</div>

						{/* Email */}
						<div className="form-control">
							<label className="label">
								<span className="label-text font-medium">Email Address</span>
							</label>
							<input
								type="email"
								placeholder="you@example.com"
								className="input input-bordered w-full rounded-lg focus:border-primary focus:outline-none"
								{...register("email", { required: "Email is required" })}
							/>
							{errors.email && (
								<span className="mt-1 text-xs text-error">
									{errors.email.message}
								</span>
							)}
						</div>

            {/* Phone Number */}
            {/* <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Phone Number</span>
              </label>
              <input
                type="tel"
                placeholder="01234567890"
                className="input input-bordered w-full rounded-lg focus:border-primary focus:outline-none"
                {...register("phone", { required: "Phone number is required" })}
              />
              {errors.phone && (
                <span className="mt-1 text-xs text-error">
                  {errors.phone.message}
                </span>
              )}
            </div> */}

						{/* Image Upload */}
						<div className="form-control">
							<label htmlFor="image" className="label">
								<span className="label-text font-medium">Profile Image</span>
							</label>
							<input
								name="image"
								type="file"
								id="image"
								accept="image/*"
								className="
      file:mr-4 file:py-2 file:px-4
      file:rounded-lg file:border-0
      file:text-sm file:font-semibold
      file:bg-primary/10 file:text-primary
      hover:file:bg-primary/20
      block w-full text-sm text-base-content/70
      rounded-lg border border-gray-300
      cursor-pointer bg-base-100
      focus:outline-none focus:border-primary
    "
								{...register("image", { required: "Image is required" })}
							/>
							<div className="mt-1 text-xs text-gray-400">
								PNG, JPG or JPEG (max 2MB)
								{errors.image && (
									<div className="mt-1 text-xs text-error">
										{errors.image.message}
									</div>
								)}
							</div>
						</div>

						{/* Password */}
						<div className="form-control">
							<label className="label">
								<span className="label-text font-medium">Password</span>
							</label>
							<div className="relative">
								<input
									type={showPassword ? "text" : "password"}
									placeholder="Create a password"
									className="input input-bordered w-full rounded-lg pr-10 focus:border-primary focus:outline-none"
									{...register("password", {
										required: "Password is required",
										minLength: {
											value: 6,
											message: "Password must be at least 6 characters.",
										},
									})}
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute inset-y-0 right-0 flex items-center pr-3 text-base-content/50 hover:text-primary cursor-pointer"
								>
									{showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
								</button>
							</div>
							{errors.password && (
								<span className="mt-1 text-xs text-error">
									{errors.password.message}
								</span>
							)}
						</div>

						{/* Submit */}
						<div className="pt-2">
							<Button label="Register" type="submit" fullWidth />
						</div>
					</form>

					{/* Social Divider */}
					<div className="divider text-xs text-base-content/50">OR</div>

					<Button
						onClick={handleGoogleRegister}
						label="Continue with Google"
						variant="blackOutline"
						icon={FaGoogle}
						fullWidth
					/>

					{/* Footer Link */}
					<p className="mt-6 text-center text-sm text-base-content/70">
						Already have an account?{" "}
						<Link
							to="/login"
							className="font-semibold text-primary hover:underline"
						>
							Login here
						</Link>
					</p>
				</div>
			</motion.div>
		</div>
	);
};

export default Register;
