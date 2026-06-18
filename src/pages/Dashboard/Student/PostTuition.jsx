import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Button from '../../../components/Shared/Button/Button';
import FadeIn from '../../../components/Shared/FadeIn';

const PostTuition = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (tuitionData) => {
            const { data } = await axiosSecure.post('/tuitions', tuitionData);
            return data;
        },
        onSuccess: () => {
            toast.success('Tuition posted successfully!');
            reset();
            navigate('/dashboard/student/my-tuitions');
        },
        onError: (err) => {
            toast.error('Failed to post tuition');
        }
    });

    const onSubmit = async (data) => {
        const tuitionData = {
            ...data,
            salary: Number(data.salary),
        };
        await mutateAsync(tuitionData);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh]">
            <FadeIn>
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-primary">Post a New Tuition</h2>
                <p className="text-base-content/70">Fill in the details to find the perfect tutor.</p>
            </div>

            </FadeIn>
            
            <FadeIn delay={0.2}>

            <div className="bg-base-100 p-8 rounded-2xl shadow-lg border border-base-200">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Subject */}
                        <div className="form-control">
                            <label className="label"><span className="label-text font-medium">Subject(s)</span></label>
                            <input 
                                {...register("subject", { required: "Subject is required" })} 
                                type="text" 
                                placeholder="e.g. Math, Physics" 
                                className={`input input-bordered w-full rounded-lg focus:border-primary focus:outline-none ${errors.subject ? "input-error" : ""}`} 
                            />
                            {errors.subject && <span className="mt-1 text-xs text-error">{errors.subject.message}</span>}
                        </div>

                        {/* Class/Grade */}
                        <div className="form-control">
                            <label className="label"><span className="label-text font-medium">Class/Grade</span></label>
                            <select 
                                {...register("class", { required: "Class is required" })} 
                                className={`select select-bordered w-full rounded-lg focus:border-primary focus:outline-none ${errors.class ? "select-error" : ""}`}
                                defaultValue=""
                            >
                                <option disabled value="">Select Class</option>
                                <option value="Class 1-5">Class 1-5</option>
                                <option value="Class 6-8">Class 6-8</option>
                                <option value="SSC">SSC</option>
                                <option value="HSC">HSC</option>
                            </select>
                            {errors.class && <span className="mt-1 text-xs text-error">{errors.class.message}</span>}
                        </div>

                        {/* Days per week */}
                        <div className="form-control">
                            <label className="label"><span className="label-text font-medium">Days / Week</span></label>
                            <input 
                                {...register("days", { required: "Days per week is required" })} 
                                type="number" 
                                placeholder="e.g. 3" 
                                className={`input input-bordered w-full rounded-lg focus:border-primary focus:outline-none ${errors.days ? "input-error" : ""}`} 
                            />
                            {errors.days && <span className="mt-1 text-xs text-error">{errors.days.message}</span>}
                        </div>

                        {/* Salary */}
                        <div className="form-control">
                            <label className="label"><span className="label-text font-medium">Salary (Tk)</span></label>
                            <input 
                                {...register("salary", { required: "Salary is required" })} 
                                type="number" 
                                placeholder="e.g. 5000" 
                                className={`input input-bordered w-full rounded-lg focus:border-primary focus:outline-none ${errors.salary ? "input-error" : ""}`} 
                            />
                            {errors.salary && <span className="mt-1 text-xs text-error">{errors.salary.message}</span>}
                        </div>

                        {/* Location */}
                        <div className="form-control md:col-span-2">
                            <label className="label"><span className="label-text font-medium">Location</span></label>
                            <input 
                                {...register("location", { required: "Location is required" })} 
                                type="text" 
                                placeholder="e.g. Dhanmondi, Dhaka" 
                                className={`input input-bordered w-full rounded-lg focus:border-primary focus:outline-none ${errors.location ? "input-error" : ""}`} 
                            />
                            {errors.location && <span className="mt-1 text-xs text-error">{errors.location.message}</span>}
                        </div>

                        {/* Description */}
                        <div className="form-control md:col-span-2">
                            <label className="label"><span className="label-text font-medium">Details/Requirements</span></label>
                            <textarea 
                                {...register("description")} 
                                className="textarea textarea-bordered h-24 rounded-lg focus:border-primary focus:outline-none" 
                                placeholder="Mention preferred medium, gender, or specific requirements..."
                            ></textarea>
                        </div>
                    </div>

                    <div className="mt-4 flex justify-end">
                        <div className="w-full md:w-auto">
                            <Button 
                                label="Post Tuition" 
                                type="submit" 
                                loading={isPending} 
                                fullWidth 
                            />
                        </div>
                    </div>
                </form>
            </div>
            </FadeIn>
        </div>
    );
};

export default PostTuition;