import React from "react";
import { FiX, FiUser, FiBookOpen, FiShield } from "react-icons/fi";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UserRoleModal = ({ user, onClose, refetch }) => {
	const axiosSecure = useAxiosSecure();

	const { mutateAsync: updateRole, isPending } = useMutation({
		mutationFn: async (role) => {
			const { data } = await axiosSecure.patch(`/users/role/${user._id}`, {
				role,
			});
			return data;
		},
		onSuccess: (data) => {
			if (data.modifiedCount > 0) {
				toast.success("User role updated successfully!");
				refetch();
				onClose();
			}
		},
		onError: () => toast.error("Failed to update role."),
	});

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
			<div className="w-full max-w-sm rounded-2xl bg-base-100 p-6 shadow-2xl relative">
				{/* Header */}
				<div className="flex items-center justify-between mb-6">
					<div>
						<h3 className="text-lg font-bold">Update Role</h3>
						<p className="text-xs text-base-content/60">User: {user.name}</p>
					</div>
					<button onClick={onClose} className="btn btn-ghost btn-circle btn-sm">
						<FiX size={20} />
					</button>
				</div>

				<div className="space-y-3">
					<RoleButton
						role="student"
						currentRole={user.role}
						icon={FiUser}
						label="Student"
						desc="Standard user access"
						onClick={() => updateRole("student")}
						loading={isPending}
					/>
					<RoleButton
						role="tutor"
						currentRole={user.role}
						icon={FiBookOpen}
						label="Tutor"
						desc="Can accept tuitions"
						onClick={() => updateRole("tutor")}
						loading={isPending}
					/>
					<RoleButton
						role="admin"
						currentRole={user.role}
						icon={FiShield}
						label="Admin"
						desc="Full system access"
						onClick={() => updateRole("admin")}
						loading={isPending}
					/>
				</div>
			</div>
		</div>
	);
};

const RoleButton = ({
	role,
	currentRole,
	icon: Icon,
	label,
	desc,
	onClick,
	loading,
}) => {
	const isActive = currentRole === role;
	const activeClass =
		role === "admin"
			? "border-error bg-error/10 text-error"
			: role === "tutor"
			? "border-secondary bg-secondary/10 text-secondary"
			: "border-primary bg-primary/10 text-primary";

	return (
		<button
			onClick={onClick}
			disabled={loading}
			className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
				isActive ? activeClass : "border-base-200 hover:border-base-content/20"
			}`}
		>
			<div
				className={`p-2 rounded-lg ${isActive ? "bg-base-100" : "bg-base-200"}`}
			>
				<Icon size={20} />
			</div>
			<div>
				<p className="font-bold text-sm">{label}</p>
				<p className="text-xs opacity-70">{desc}</p>
			</div>
		</button>
	);
};

export default UserRoleModal;
