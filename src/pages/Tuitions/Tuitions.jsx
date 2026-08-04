import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { FiSearch, FiFilter } from "react-icons/fi";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import TuitionCard from "../../components/Shared/TuitionCard";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Tuitions = () => {
	const [search, setSearch] = useState("");
	const [page, setPage] = useState(1);
	const [sortOrder, setSortOrder] = useState("");
	const [classFilter, setClassFilter] = useState("");

	const { user, loading: isAuthLoading } = useAuth();
	const [role, isRoleLoading] = useRole();
	const axiosSecure = useAxiosSecure();

	// Tutors read the gender-filtered listing so they only ever see posts they
	// qualify for; everyone else keeps the public unfiltered listing. The backend
	// filters either way - this just picks the right endpoint.
	const isTutor = role === "tutor";

	const { data, isLoading, refetch } = useQuery({
		// Wait for auth/role to settle, otherwise a tutor would briefly be served
		// the unfiltered public list.
		enabled: !isAuthLoading && !(user?.email && isRoleLoading),
		queryKey: ["tuitions", page, search, isTutor ? "tutor" : "public"],
		queryFn: async () => {
			const params = `page=${page}&limit=9&search=${search}`;

			if (isTutor) {
				const res = await axiosSecure.get(`/tuitions/available?${params}`);
				return res.data;
			}

			const res = await axios.get(
				`${import.meta.env.VITE_API_URL}/tuitions?${params}`
			);
			return res.data;
		},
	});

	const filteredTuitions = data?.tuitions
		?.filter((item) => {
			if (!classFilter) return true;
			return item.class === classFilter;
		})
		.sort((a, b) => {
			if (sortOrder === "asc") return a.salary - b.salary;
			if (sortOrder === "desc") return b.salary - a.salary;
			return 0;
		});

	const handleSearch = (e) => {
		e.preventDefault();
		setPage(1);
		refetch();
	};

	// Also spin while the viewer's role is still resolving, since the query is
	// disabled until then and would otherwise flash an empty grid.
	const isResolvingViewer = isAuthLoading || (!!user?.email && isRoleLoading);
	if (isLoading || isResolvingViewer) return <LoadingSpinner />;

	return (
		<section className="bg-base-100 min-h-screen py-12 px-4 font-manrope container mx-auto">
			{/* Header & Search Section */}
			<div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
				<div>
					<h2 className="text-primary">
						Available Tuitions
					</h2>
					<p className="text-base-content/70 mt-1">
						Find the perfect tuition job for you.
					</p>
				</div>

				<form
					onSubmit={handleSearch}
					className="join w-full md:w-auto shadow-sm"
				>
					<input
						type="text"
						className="input input-bordered join-item w-full md:w-72 focus:outline-none focus:border-primary"
						placeholder="Search subject or location..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
					<button className="btn btn-primary join-item text-white">
						<FiSearch size={18} />
					</button>
				</form>
			</div>

			{/* Filter Section */}
			<div className="flex flex-wrap items-center gap-3 mb-8 bg-base-200/50 p-4 rounded-xl border border-base-200">
				<div className="flex items-center gap-2 mr-2">
					<FiFilter className="text-primary" />
					<span className="font-semibold text-sm text-base-content">
						Filters:
					</span>
				</div>

				<select
					className="select select-bordered select-sm rounded-lg focus:outline-none focus:border-primary"
					onChange={(e) => setClassFilter(e.target.value)}
					value={classFilter}
				>
					<option value="">All Classes</option>
					<option value="Class 1-5">Class 1-5</option>
					<option value="Class 6-8">Class 6-8</option>
					<option value="SSC">SSC</option>
					<option value="HSC">HSC</option>
				</select>

				<select
					className="select select-bordered select-sm rounded-lg focus:outline-none focus:border-primary"
					onChange={(e) => setSortOrder(e.target.value)}
					value={sortOrder}
				>
					<option value="">Sort by Salary</option>
					<option value="asc">Low to High</option>
					<option value="desc">High to Low</option>
				</select>

				{(classFilter || sortOrder || search) && (
					<button
						onClick={() => {
							setClassFilter("");
							setSortOrder("");
							setSearch("");
						}}
						className="btn btn-sm btn-ghost text-error ml-auto"
					>
						Reset Filters
					</button>
				)}
			</div>

			{/* Content Grid */}
			{filteredTuitions?.length === 0 ? (
				<div className="text-center py-24 bg-base-200/30 rounded-xl border border-dashed border-base-300">
					<p className="text-xl text-base-content/60 font-medium">
						No tuitions found matching your criteria.
					</p>
					<button
						onClick={() => {
							setClassFilter("");
							setSortOrder("");
							setSearch("");
							refetch();
						}}
						className="btn btn-link text-primary mt-2"
					>
						Clear all filters
					</button>
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{filteredTuitions?.map((item) => (
						<TuitionCard key={item._id} tuition={item} />
					))}
				</div>
			)}

			{/* Pagination */}
			<div className="flex justify-center mt-16 gap-3">
				<button
					onClick={() => setPage((old) => Math.max(old - 1, 1))}
					disabled={page === 1}
					className="btn btn-sm btn-outline border-base-300 hover:border-primary hover:bg-primary hover:text-white"
				>
					Previous
				</button>
				<span className="flex items-center px-4 font-bold text-base-content bg-base-200 rounded-lg text-sm">
					Page {page} of {data?.totalPages || 1}
				</span>
				<button
					onClick={() =>
						setPage((old) =>
							data?.totalPages && old < data.totalPages ? old + 1 : old
						)
					}
					disabled={page === (data?.totalPages || 1)}
					className="btn btn-sm btn-outline border-base-300 hover:border-primary hover:bg-primary hover:text-white"
				>
					Next
				</button>
			</div>
		</section>
	);
};

export default Tuitions;
