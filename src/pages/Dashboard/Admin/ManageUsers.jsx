import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { FiEdit, FiTrash2, FiSettings, FiSearch } from "react-icons/fi";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import FadeIn from "../../../components/Shared/FadeIn";
import UserRoleModal from "../../../components/Dashboard/Admin/UserRoleModal";
import UpdateUserModal from "../../../components/Dashboard/Admin/UpdateUserModal";

const ManageUsers = () => {
  const { user: loggedInUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  
  const [search, setSearch] = useState("");
  const [roleModalUser, setRoleModalUser] = useState(null);
  const [editModalUser, setEditModalUser] = useState(null);

  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/users");
      return data;
    },
  });

  const { mutateAsync: deleteUser } = useMutation({
    mutationFn: async (id) => {
        const { data } = await axiosSecure.delete(`/users/${id}`);
        return data;
    },
    onSuccess: (data) => {
        if(data.deletedCount > 0){
            toast.success("User account deleted.");
            refetch();
        }
    }
  });

  const handleDelete = (id) => {
    Swal.fire({
        title: "Delete Account?",
        text: "This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
        if (result.isConfirmed) {
            await deleteUser(id);
        }
    });
  };

  const filteredUsers = users.filter(u => 
      u.email !== loggedInUser?.email && 
      (u.name.toLowerCase().includes(search.toLowerCase()) || 
       u.email.toLowerCase().includes(search.toLowerCase()))
  );

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="w-full">
      <FadeIn>
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div>
                <h2 className="text-2xl font-bold text-primary">User Management</h2>
                <p className="text-sm text-base-content/60">Manage roles, update info, or remove accounts</p>
            </div>
            
            {/* Search Bar */}
            <div className="relative w-full md:w-64">
                <input 
                    type="text" 
                    placeholder="Search users..." 
                    className="input input-bordered w-full pl-10"
                    onChange={(e) => setSearch(e.target.value)}
                />
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="overflow-x-auto bg-base-100 rounded-xl shadow-lg border border-base-200">
          <table className="table w-full align-middle">
            <thead className="bg-base-200/50">
              <tr>
                <th>Profile</th>
                <th>Contact Info</th>
                <th>Role</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                 <tr><td colSpan="4" className="text-center py-8 text-gray-500">No users found.</td></tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-base-200/20">
                    <td>
                        <div className="flex items-center gap-3">
                            <div className="avatar">
                                <div className="mask mask-squircle w-10 h-10">
                                    <img src={user.image || "https://i.ibb.co/MgsTCcv/avater.jpg"} alt={user.name} />
                                </div>
                            </div>
                            <div>
                                <div className="font-bold">{user.name}</div>
                                <div className="text-xs opacity-50">Joined: {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}</div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <span className="text-sm">{user.email}</span>
                    </td>
                    <td>
                      <span className={`badge ${
                        user.role === "admin" ? "badge-error text-white" : 
                        user.role === "tutor" ? "badge-secondary text-white" : "badge-primary badge-outline"
                      } badge-sm font-bold uppercase`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                            onClick={() => setEditModalUser(user)}
                            className="btn btn-ghost btn-xs tooltip tooltip-left"
                            data-tip="Edit Info"
                        >
                            <FiEdit size={16} />
                        </button>
                        <button 
                            onClick={() => setRoleModalUser(user)}
                            className="btn btn-ghost btn-xs text-warning tooltip tooltip-left"
                            data-tip="Change Role"
                        >
                            <FiSettings size={16} />
                        </button>

                        <button 
                            onClick={() => handleDelete(user._id)}
                            className="btn btn-ghost btn-xs text-error tooltip tooltip-left"
                            data-tip="Delete Account"
                        >
                            <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </FadeIn>

      {roleModalUser && (
        <UserRoleModal 
            user={roleModalUser} 
            onClose={() => setRoleModalUser(null)} 
            refetch={refetch} 
        />
      )}

      {editModalUser && (
        <UpdateUserModal 
            user={editModalUser} 
            onClose={() => setEditModalUser(null)} 
            refetch={refetch} 
        />
      )}
    </div>
  );
};

export default ManageUsers;