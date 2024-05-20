"use client";

import { TransactionType } from "@/lib/types";
import TransactionLink from "./TransactionLink";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
const TransactionsLister = ({ data }: { data: TransactionType[] }) => {
	// filter state from url
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const filterparam = searchParams.get("filter");
	const typeparam = searchParams.get("type");
	const amountsort = searchParams.get("sortedamount");
	const categoryParam = searchParams.get("category");

	const { replace } = useRouter();
	// usememo to filter data by type or amount or date as acquired from the url searchparams

	// : check if any of the search params are present in the url

	// updates params
	function handleSearchParams(paramItem: string | null, paramValue: string) {
		const params = new URLSearchParams(searchParams);
		if (paramItem)
			// {
			params.set(paramItem, paramValue);
		// } else {
		// params.delete(paramItem);
		// }

		replace(`${pathname}?${params.toString()}`);
	}

	return (
		<div className='w-full mx-auto flex flex-col gap-4'>
			<div className='w-full mx-auto px-2 flex items-center'>
				<ScrollArea className='w-full whitespace-nowrap rounded-md border spacing-x-4 mx-auto'>
					<div className='mx-auto flex w-max space-x-4 p-3 text-white dark:text-cyan-400'>
						<Badge onClick={() => handleSearchParams("type", "expenses")}>
							Expenses
						</Badge>
						<Badge onClick={() => handleSearchParams("type", "savings")}>
							Savings
						</Badge>
						<Badge onClick={() => handleSearchParams("type", "investment")}>
							Investments
						</Badge>
						<Badge onClick={() => handleSearchParams("type", "transfer")}>
							Transfer
						</Badge>
						<Badge onClick={() => handleSearchParams("type", "debt")}>
							Debt
						</Badge>
					</div>
					<ScrollBar orientation='horizontal' />
				</ScrollArea>
			</div>

			<ScrollArea
				className={cn("mx-auto w-full flex flex-col gap-6 px-2 max-h-[600px]")}>
				{
					// loop through transactions
					data.map((transaction) => (
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
		</div>
	);
};

export default TransactionsLister;
