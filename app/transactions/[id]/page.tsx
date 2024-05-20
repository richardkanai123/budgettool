import { transactions } from "@/app/(dummydata)";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link2, Link2Icon } from "lucide-react";
import Link from "next/link";
import React from "react";

const TransactionDetailsPage = ({ params }: { params: { id: string } }) => {
	const specificTransaction = transactions.filter(
		(transaction) => transaction.id === params.id,
	)[0];

	const { amount, category, date, type, description } = specificTransaction;
	return (
		<div className='w-full flex flex-col px-4 gap-4'>
			{/* all details about a transaction */}
			<h1 className='text-3xl font-bold text-primary'>Transaction Details</h1>
			<p className='text-lg '>Type : {type}</p>
			<p className='text-lg '>Amount : {amount}</p>
			<p className='text-lg '>Category : {category}</p>
			<p className='text-lg '>Date : {date}</p>
			<p className='text-base '>Description : {description}</p>

			<Button
				variant='link'
				className={cn("max-w-fit ring-0 outline-none")}
				asChild>
				<Link
					href='/transactions'
					className='flex gap-2 items-center text-lg'>
					See other transactions <Link2 className='text-lg' />
				</Link>
			</Button>
		</div>
	);
};

export default TransactionDetailsPage;
