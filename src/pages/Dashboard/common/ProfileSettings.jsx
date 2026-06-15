import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiUser, FiMail, FiCamera, FiSave } from "react-icons/fi";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import { imageUpload } from "../../../utils";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Button from "../../../components/Shared/Button/Button";
import FadeIn from "../../../components/Shared/FadeIn";
import useRole from "../../../hooks/useRole";

const ProfileSettings = () => {
  const [role, isRoleLoading] = useRole();
	const { user, updateUserProfile, setLoading } = useAuth();
	const axiosSecure = useAxiosSecure();
	const [uploading, setUploading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: user?.displayName || "",
		},
	});

	const onSubmit = async (data) => {
		setUploading(true);
		try {
			let photoURL = user?.photoURL;

			if (data.image && data.image[0]) {
				photoURL = await imageUpload(data.image[0]);
			}
			await updateUserProfile(data.name, photoURL);

			const updateData = {
				name: data.name,
				photo: photoURL,
			};
			await axiosSecure.patch(`/users/${user?.email}`, updateData);

			toast.success("Profile updated successfully!");
			setLoading(false);
		} catch (error) {
			console.error(error);
			toast.error("Failed to update profile.");
		} finally {
			setUploading(false);
		}
	};

	return (
		<div className="flex  flex-col justify-center items-center min-h-[80vh]">
			<h2 className="text-2xl font-bold mb-6 text-primary">Profile Settings</h2>

      <FadeIn>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
				{/* Left: Profile Card */}
				<div className="col-span-1">
					<div className="bg-base-100 rounded-2xl shadow-lg border border-base-200 p-8 flex flex-col items-center text-center h-full">
						<div className="avatar mb-4">
							<div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
								<img
									src={user?.photoURL || "https://i.ibb.co/MgsTCcv/avater.jpg"}
									alt="Profile"
									referrerPolicy="no-referrer"
									className="object-cover w-full h-full"
								/>
							</div>
						</div>
						<h3 className="text-xl font-bold text-base-content">
							{user?.displayName}
						</h3>
						<p className="text-sm text-base-content/70 break-all">
							{user?.email}
						</p>

						<div className="mt-6 w-full">
							<div className="badge badge-primary badge-outline w-full py-3 capitalize">
								Role: {role}
							</div>
						</div>
					</div>
				</div>

				{/* Right: Edit Form */}
				<div className="col-span-1 md:col-span-2">
					<div className="bg-base-100 rounded-2xl shadow-lg border border-base-200 p-8">
						<h3 className="text-lg font-bold mb-6 border-b pb-2">
							Update Information
						</h3>

						<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
							<div className="form-control">
								<label className="label">
									<span className="label-text font-medium flex items-center gap-2">
										<FiUser /> Full Name
									</span>
								</label>
								<input
									{...register("name", { required: "Name is required" })}
									type="text"
									className="input input-bordered w-full rounded-lg focus:border-primary focus:outline-none"
								/>
								{errors.name && (
									<span className="text-error text-xs mt-1">
										{errors.name.message}
									</span>
								)}
							</div>

							<div className="form-control">
								<label className="label">
									<span className="label-text font-medium flex items-center gap-2">
										<FiMail /> Email Address
									</span>
								</label>
								<input
									type="email"
									value={user?.email || ""}
									disabled
									className="input input-bordered w-full rounded-lg bg-base-200/50 cursor-not-allowed"
								/>
								<span className="text-xs text-base-content/50 mt-1 ml-1">
									Email cannot be changed.
								</span>
							</div>

							<div className="form-control">
								<label className="label">
									<span className="label-text font-medium flex items-center gap-2">
										<FiCamera /> Profile Photo
									</span>
								</label>
								<input
									{...register("image")}
									type="file"
									accept="image/*"
									className="file-input file-input-bordered w-full rounded-lg focus:outline-none file:bg-primary/10 file:text-primary file:border-0 file:font-semibold"
								/>
								<span className="text-xs text-base-content/50 mt-1 ml-1">
									Leave empty to keep current photo.
								</span>
							</div>

							<div className="pt-4 flex justify-end">
								<div className="w-full md:w-auto">
									<Button
										label={uploading ? "Saving Changes..." : "Save Changes"}
										type="submit"
										icon={FiSave}
										loading={uploading}
										fullWidth
									/>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
      </FadeIn>

		</div>
	);
};

export default ProfileSettings;
