import React from "react";
import { Card } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "@/lib/utils";
import TransactionLink from "./TransactionLink";
import { Separator } from "../ui/separator";
import { transactions } from "@/app/(dummydata)";
const RecentTransactionsLister = () => {
	if (transactions.length === 0) {
		return <p>No recent transactions</p>;
	}

	// take 10 most recent transactions
	const recentTransactions = transactions.slice(0, 9);

	return (
		<ScrollArea
			className={cn("mx-auto w-full flex flex-col gap-6 px-2 max-h-[400px]")}>
			{
				// loop through transactions
				recentTransactions.map((transaction) => (
					<>
						<TransactionLink
							transaction={transaction}
							key={transaction.id}
						/>

						<Separator className='my-1 dark:bg-transparent' />
					</>
				))
			}
		</ScrollArea>
	);
};

export default RecentTransactionsLister;
