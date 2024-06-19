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
		.min(8, "Password must be atleast 8 characters"),
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
					await signIn("credentials", {
						email: data.email,
						password: data.password,
					});
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
			</form>
		</Form>
	);
};

export default SignInForm;
