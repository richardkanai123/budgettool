"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CreateNewUser } from "@/lib/actions";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { LoaderIcon } from "lucide-react";
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
	username: z
		.string({
			required_error: "Username is required",
			invalid_type_error: "Username must be a string",
		})
		.min(5, "Username must be atleast 6 characters"),
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
		.min(6, "Password must be at least 6 characters"),
	// .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, {
	// 	message:
	// 		"Password must be at least 6 characters long and contain at least one letter, one number, and one special character",
	// }),
	confirmPassword: z
		.string({
			required_error: "Confirm Password is required",
			invalid_type_error: "Confirm Password must be a string",
		})
		.min(6, "Confirm Password must be at least 6 characters"),
});
// .refine((data) => data.password === data.confirmPassword, {
// 	message: "Passwords do not match",
// 	path: ["confirmPassword"], // Set the path of the error
// });
const SignUpForm = () => {
	const { toast } = useToast();
	const Router = useRouter();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		mode: "onTouched",
		reValidateMode: "onBlur",
	});

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(async (data) => {
					console.log(data);
					try {
						const res = await CreateNewUser(data);
						if (res.status === 400 || res.status != 201) {
							const data = await res.json();
							toast({
								title: "⚠ Caution ⚠.",
								description: data.message as string,
								action: (
									<ToastAction
										onClick={() => Router.refresh()}
										altText='Refresh'>
										Refresh
									</ToastAction>
								),
							});
							return false;
						} else {
							toast({
								title: " Success ✅.",
								description: "Registered new user.",
								action: (
									<ToastAction
										onClick={() => Router.push("/sign-in")}
										altText='Sign in'>
										Sign in now
									</ToastAction>
								),
							});
							form.reset();
						}
					} catch (error: any) {
						console.log(error);
						toast({
							title: "⚠ Error ⚠.",
							description: error?.message as string,
							action: (
								<ToastAction
									onClick={() => Router.refresh()}
									altText='Refresh'>
									Refresh
								</ToastAction>
							),
						});
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
					name='username'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input
									type='text'
									className='w-full'
									placeholder='your username'
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
									type='password'
									className='w-full'
									placeholder='Enter password here'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='confirmPassword'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm Password</FormLabel>
							<FormControl>
								<Input
									type='password'
									className='w-full'
									placeholder='Confirm Password here'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					size='lg'
					className='text-white font-semibold hover:bg-sky-800'
					disabled={form.formState.isSubmitting || form.formState.isValidating}
					type='submit'>
					Create
				</Button>
			</form>
		</Form>
	);
};

export default SignUpForm;
