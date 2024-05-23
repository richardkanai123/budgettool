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
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { SelectItem } from "@radix-ui/react-select";
import Link from "next/link";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
	expenses,
	incomes,
	investment,
	savings,
} from "@/lib/transactionsGrouping";

const validCategories = {
	expense: expenses,
	income: incomes,
	saving: savings,
	investment: investment,
};

// Schema definition
const formSchema = z
	.object({
		transactionNote: z.string().min(5, {
			message: "Note must be at least 5 characters.",
		}),
		transactionDate: z
			.date({
				required_error: "A date of transaction is required.",
			})
			.max(new Date(), {
				message: "Transaction date must be in the past.",
			}),
		transactionAmount: z.number().min(1, {
			message: "Amount must be greater than 0.",
		}),
		transactionType: z.enum(["expense", "income", "saving", "investment"], {
			required_error: "Transaction type is required.",
			message:
				"Transaction type must be either expense, income, saving, or investment.",
		}),
		transactionCategory: z.string(),
	})
	.refine(
		(data) => {
			const validCategoriesForType = validCategories[data.transactionType];
			return validCategoriesForType.includes(data.transactionCategory);
		},
		{
			message: "Invalid category for the selected transaction type.",
			path: ["transactionCategory"],
		},
	);

export function NewTransactionForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			transactionNote: "",
			transactionAmount: 0,
			transactionDate: new Date(),
			transactionType: "expense",
		},
	});

	const transactionTypeOptions = [
		{ value: "expense", label: "Expense" },
		{ value: "income", label: "Income" },
		{ value: "saving", label: "Savings" },
		{ value: "investment", label: "Investment" },
	];
	function AddTransaction(values: z.infer<typeof formSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(AddTransaction)}
				className='space-y-6 mx-auto overflow-hidden '>
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
							<FormDescription>Amount of the transaction.</FormDescription>
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
					name='transactionType'
					render={({ field }) => (
						<FormItem className='space-y-3'>
							<FormLabel>Select transaction type</FormLabel>
							<FormControl>
								<RadioGroup
									onValueChange={field.onChange}
									defaultValue={field.value}
									className='flex flex-col space-y-1'>
									<FormItem className='flex items-center space-x-3 space-y-0'>
										<FormControl>
											<RadioGroupItem value='income' />
										</FormControl>
										<FormLabel className='font-normal'>Income</FormLabel>
									</FormItem>
									<FormItem className='flex items-center space-x-3 space-y-0'>
										<FormControl>
											<RadioGroupItem value='expense' />
										</FormControl>
										<FormLabel className='font-normal'>Expense</FormLabel>
									</FormItem>
									<FormItem className='flex items-center space-x-3 space-y-0'>
										<FormControl>
											<RadioGroupItem value='saving' />
										</FormControl>
										<FormLabel className='font-normal'>Savings</FormLabel>
									</FormItem>
									<FormItem className='flex items-center space-x-3 space-y-0'>
										<FormControl>
											<RadioGroupItem value='investment' />
										</FormControl>
										<FormLabel className='font-normal'>Investment</FormLabel>
									</FormItem>
								</RadioGroup>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* category depending on transaction type */}
				<FormField
					control={form.control}
					name='transactionCategory'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Category</FormLabel>
							<FormDescription>
								Select a category based on the transaction type.
							</FormDescription>
							<FormControl>
								<RadioGroup
									onValueChange={field.onChange}
									defaultValue={field.value}
									className='flex flex-col space-y-1'>
									{validCategories[form.watch("transactionType")].map(
										(category) => (
											<FormItem
												key={category}
												className='flex items-center space-x-3 space-y-0'>
												<FormControl>
													<RadioGroupItem value={category} />
												</FormControl>
												<FormLabel className='font-normal'>
													{category}
												</FormLabel>
											</FormItem>
										),
									)}
								</RadioGroup>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

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

				<Button type='submit'>Submit</Button>
			</form>
		</Form>
	);
}
