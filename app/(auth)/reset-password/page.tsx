"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z
	.object({
		email: z
			.string({ required_error: "Email is required" })
			.email("Must be a valid email"),

		// strong password
		password: z
			.string({ required_error: "Password is required" })
			.min(8, "Password must be atleast 8 characters")
			.regex(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
				"Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character",
			),
		confirmPassword: z
			.string({
				required_error: "Confirm Password is required",
				invalid_type_error: "Confirm Password must be a string",
			})
			.min(8, "Confirm Password must be at least 8 characters"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"], // Set the path of the error
	});

const ResetPasswordPage = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting, isSubmitSuccessful },
	} = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	const InputStyles = `w-full md:w-3/4 mx-auto bg-gray-200 dark:bg-slate-700 p-2 text-lg font-semibold text-lime-950 dark:text-white ring-0 outline-none border-0 focus:border-b-2 border-blue-500 rounded-sm placeholder:text-sm placeholder:font-light invalid:border-b-red`;
	return (
		<div className='w-full px-4 mx-auto h-screen flex items-center justify-center'>
			<form
				onSubmit={handleSubmit((data) => {
					console.log(data);
				})}
				className='w-full max-w-[500px] bg-white dark:bg-slate-950 shadow-sm rounded border-t-4 border-yellow-400 p-4 mx-auto space-y-6'>
				<h1 className='text-xl text-center mb-4 font-semibold'>
					Reset Password
				</h1>
				<div className='w-full flex flex-col gap-1 transition-all ease-linear delay-75 '>
					<label
						className='w-full md:w-3/4 mx-auto font-semibold text-lg'
						htmlFor='user-name'>
						Your email
					</label>
					<input
						{...register("email")}
						type='text'
						placeholder='Enter email'
						className={InputStyles}
					/>
					{errors.email && (
						<p className='text-red-500 text-center'>{errors.email.message}</p>
					)}
				</div>

				<div className='w-full flex flex-col gap-1 transition-all ease-linear delay-75 '>
					<label
						className='w-full md:w-3/4 mx-auto font-semibold text-lg'
						htmlFor='user-name'>
						New password
					</label>
					<input
						{...register("password")}
						type='password'
						placeholder='Enter new password'
						className={InputStyles}
					/>
					{errors.password && (
						<p className='text-red-500 text-center'>
							{errors.password.message}
						</p>
					)}
				</div>

				<div className='w-full flex flex-col gap-2 transition-all ease-linear delay-75'>
					<label
						className='w-full md:w-3/4 mx-auto font-semibold text-lg'
						htmlFor='user-confirmPassword'>
						Confirm Password
					</label>
					<input
						{...register("confirmPassword")}
						type='Password'
						placeholder='Enter your confirmPassword'
						className={InputStyles}
					/>
					{errors.confirmPassword && (
						<p className='text-red-500 text-center'>
							{errors.confirmPassword.message}
						</p>
					)}
				</div>

				<div className='w-full flex flex-col gap-1 transition-all ease-linear delay-75 '>
					<Button
						disabled={isSubmitting}
						className={cn(
							"w-3/4 self-center hover:bg-sky-900 transition-all ease-linear delay-100",
						)}
						variant='default'
						type='submit'>
						{isSubmitting ? "Updating..." : "Reset"}
					</Button>
				</div>

				<div className='w-full flex items-center justify-end gap-4 px-4'>
					<p className='text-xs'>Existing User?</p>
					<Link
						className='text-cyan-700 hover:text-cyan-300 underline'
						href='/sign-in'>
						Sign In
					</Link>
				</div>
			</form>
		</div>
	);
};

export default ResetPasswordPage;
