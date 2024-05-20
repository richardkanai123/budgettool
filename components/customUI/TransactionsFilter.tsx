"use client";

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
import { ArrowDown, ArrowUp } from "lucide-react";

export const TransactionsFilter = () => {
	// filter state from url
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const typeparams = searchParams.get("type");
	const amountsortparams = searchParams.get("amount");
	const categoryParams = searchParams.get("category");

	const { replace } = useRouter();
	// usememo to filter data by type or amount or date as acquired from the url searchparams

	// : check if any of the search params are present in the url
	function paramFilterbyItem(item: String) {
		if (item === "type") {
			return typeparams;
		} else if (item === "category") {
			return categoryParams;
		} else if (item === "amount") {
			return amountsortparams;
		}
	}
	// updates params
	function handleSearchParams(paramItem: string, paramValue: string) {
		const params = new URLSearchParams(searchParams);

		const passedParamFilter = paramFilterbyItem(paramItem);

		if (!passedParamFilter) {
			// does exist at all
			params.set(paramItem, paramValue);
		} else if (paramValue === passedParamFilter) {
			// passed param is the same as the one in the url
			params.delete(paramItem);
		} else {
			// passed param is different from the one in the url buy of same item so replace
			params.set(paramItem, paramValue);
		}

		replace(`${pathname}?${params.toString()}`);
	}

	return (
		<ScrollArea className='w-full whitespace-nowrap rounded-md border spacing-x-4 mx-auto'>
			<div className='mx-auto flex w-max space-x-4 p-3 text-white dark:text-cyan-400'>
				<Badge
					className={cn(" cursor-pointer  ")}
					onClick={() => handleSearchParams("type", "expense")}>
					Expenses
				</Badge>
				<Badge
					className={cn(" cursor-pointer ")}
					onClick={() => handleSearchParams("type", "saving")}>
					Savings
				</Badge>
				<Badge
					className={cn(" cursor-pointer ")}
					onClick={() => handleSearchParams("type", "income")}>
					Incomes
				</Badge>
				<Badge
					className={cn(" cursor-pointer ")}
					onClick={() => handleSearchParams("type", "transfer")}>
					Transfer
				</Badge>
				<Badge
					className={cn(" cursor-pointer ")}
					onClick={() => handleSearchParams("category", "salary")}>
					Salaries
				</Badge>
				<Badge
					className={cn(" cursor-pointer ")}
					onClick={() => handleSearchParams("category", "freelance")}>
					Gigs
				</Badge>
				<Badge
					className={cn(" cursor-pointer ")}
					onClick={() => handleSearchParams("type", "investment")}>
					Invests
				</Badge>
				<Badge
					className={cn(" cursor-pointer ")}
					onClick={() => handleSearchParams("amount", "asc")}>
					Amount <ArrowUp className='text-base' />
				</Badge>
				<Badge
					className={cn(" cursor-pointer ")}
					onClick={() => handleSearchParams("amount", "desc")}>
					Amount <ArrowDown className='text-base' />
				</Badge>
			</div>
			<ScrollBar orientation='horizontal' />
		</ScrollArea>
	);
};
