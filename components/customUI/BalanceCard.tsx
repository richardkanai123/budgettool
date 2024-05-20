import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { Progress } from "../ui/progress";
import { cn } from "@/lib/utils";

const BalanceCard = () => {
	return (
		<Card
			className={cn(
				"w-full max-w-[400px] mx-auto ring-0 outline-none border-0",
			)}
			x-chunk='balance-card'>
			<CardHeader className='pb-2'>
				<CardDescription>Monthly Highlight</CardDescription>
				<CardTitle className='text-4xl'>KSH. 10,329</CardTitle>
			</CardHeader>
			<CardContent className={cn("flex flex-col")}>
				<p className='text-base text-muted-foreground text-green-500'>
					Expense: 3000
				</p>
				<p className='text-base text-muted-foreground text-yellow-300'>
					Income: 5000
				</p>
			</CardContent>
			<CardFooter>
				<Progress
					value={25}
					aria-label='25% increase'
				/>
			</CardFooter>
		</Card>
	);
};

export default BalanceCard;
