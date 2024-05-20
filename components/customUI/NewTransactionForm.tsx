"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Textarea } from "../ui/textarea";
const formSchema = z.object({
	transactionNote: z.string().min(5, {
		message: "Note must be at least 5 characters.",
	}),
	transactionDate: z
		.date({
			required_error: "A date of birth is required.",
		})
		.max(new Date(), {
			message: "Date of birth must be in the past.",
		}),
	transactionAmount: z.number().min(1, {
		message: "Amount must be greater than 0.",
	}),

	// list of transaction
});

export function NewTransactionForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			transactionNote: "",
			transactionDate: new Date(),
		},
	});

	function AddTransaction(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(AddTransaction)}
				className='space-y-4 mx-auto '>
				<FormField
					control={form.control}
					name='transactionNote'
					render={({ field }) => (
						<FormItem>
							<FormLabel className={cn("text-lg")}>Note</FormLabel>
							<FormControl>
								<Textarea
									placeholder='Transaction note eg. "Paycheck, loan payment, etc."'
									{...field}
								/>
							</FormControl>
							<FormDescription>
								This is a brief statement about the transaction.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='transactionDate'
					render={({ field }) => (
						<FormItem className='flex flex-col'>
							<FormLabel>Transaction Date</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant={"outline"}
											className={cn(
												"w-[240px] pl-3 text-left font-normal",
												!field.value && "text-muted-foreground",
											)}>
											{field.value ? (
												format(field.value, "PPP")
											) : (
												<span>Pick a date</span>
											)}
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent
									className='w-auto p-0'
									align='start'>
									<Calendar
										mode='single'
										selected={field.value}
										onSelect={field.onChange}
										disabled={(date) =>
											date > new Date() || date < new Date("1900-01-01")
										}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
							<FormDescription>Date of the transaction.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='transactionAmount'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Amount</FormLabel>
							<FormControl>
								<Input
									type='number'
									{...field}
									onChange={(event) => field.onChange(+event.target.value)}
								/>
							</FormControl>
							<FormDescription>
								This is a brief statement about the transaction.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type='submit'>Submit</Button>
			</form>
		</Form>
	);
}
