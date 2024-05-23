"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
	username: z.string({
		required_error: "Username is required",
		invalid_type_error: "Username must be a string",
	}),

	password: z
		.string({
			required_error: "Password is required",
			invalid_type_error: "Password must be a string",
		})
		.min(8, "Password must be atleast 8 characters"),
});
const SignInForm = () => {
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
		<form
			onSubmit={handleSubmit((data) => {
				console.log(data);
			})}
			className='w-full max-w-[500px] bg-white dark:bg-slate-950 shadow-sm rounded border-t-4 border-primary p-4 mx-auto space-y-6  '
			autoComplete='false'>
			<h1 className='text-xl text-center mb-4 font-semibold'>Sign in </h1>
			<div className='w-full flex flex-col gap-1 transition-all ease-linear delay-75 '>
				<label
					className='w-full md:w-3/4 mx-auto font-semibold text-lg'
					htmlFor='user-name'>
					Username
				</label>
				<input
					{...register("username")}
					type='text'
					placeholder='Enter username'
					className={InputStyles}
				/>
				{errors.username && (
					<p className='text-red-500 text-center'>{errors.username.message}</p>
				)}
			</div>

			<div className='w-full flex flex-col gap-2 transition-all ease-linear delay-75'>
				<label
					className='w-full md:w-3/4 mx-auto font-semibold text-lg'
					htmlFor='user-password'>
					Password
				</label>
				<input
					{...register("password")}
					type='password'
					placeholder='Enter your password'
					className={InputStyles}
				/>
				{errors.password && (
					<p className='text-red-500 text-center'>{errors.password.message}</p>
				)}
			</div>

			<div className='w-full'>
				{isSubmitSuccessful && (
					<p className='text-green-500 text-center'>
						Successfully signed as user
					</p>
				)}
			</div>

			<div className='w-full flex items-center justify-end gap-4 '>
				<p className='text-xs'>Forgot Password?</p>
				<Link
					className='text-cyan-700 hover:text-cyan-300 underline'
					href='/reset-password'>
					Reset Password
				</Link>
			</div>

			<div className='w-full flex flex-col gap-1 transition-all ease-linear delay-75 '>
				<Button
					disabled={isSubmitting}
					className={cn(
						"w-3/4 self-center hover:bg-sky-900 transition-all ease-linear delay-100",
					)}
					variant='default'
					type='submit'>
					{isSubmitting ? "Signing in..." : "Sign in"}
				</Button>

				<div className='w-full flex items-center justify-center gap-4 text-sm mt-4 '>
					<p className='opacity-75'>New user?</p>
					<Link
						className='text-cyan-700 hover:text-cyan-300 underline'
						href='/sign-up'>
						Create Account
					</Link>
				</div>
			</div>
		</form>
	);
};

export default SignInForm;
