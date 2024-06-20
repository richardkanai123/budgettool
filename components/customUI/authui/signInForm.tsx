"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { signIn } from "next-auth/react";

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
const formSchema = z.object({
	email: z
		.string({
			required_error: "Email is required",
		})
		.email("Must be a valid email"),

	password: z
		.string({
			required_error: "Password is required",
			invalid_type_error: "Password must be a string",
		})
		.min(6, "Password must be atleast 6 characters"),
});
const SignInForm = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	}); // Router
	const Router = useRouter();

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(async (data) => {
					try {
						const res = await signIn("credentials", {
							email: data.email,
							password: data.password,
							redirect: false,
						});
						if (!res?.ok || res.error) {
							// error toast
							toast({
								title: "Sign in Failed",
								description: `${res?.error as string}`,
							});
						}
						console.log(res);
						if (res?.ok) {
							Router.replace("/");
						}
					} catch (error: any) {
						if (error) {
							// error toast
							toast({
								title: "Sign in Failed",
								description: `${error.message as string}`,
							});
						}
					}
				})}
				className='mx-auto space-y-4 w-full p-2 max-w-[500px]'>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									className='w-full'
									placeholder='your email'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									className='w-full'
									placeholder='Enter password here'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					disabled={form.formState.isSubmitting || form.formState.isValidating}
					type='submit'>
					Submit
				</Button>

				<div className='mt-4 text-sm w-full text-center transition-all ease-linear delay-400'>
					<p className=''>New User?</p>
					<Link
						className='text-purple-500 underline hover:uppercase'
						href={"/sign-up"}>
						Create Account
					</Link>
				</div>
			</form>
		</Form>
	);
};

export default SignInForm;
