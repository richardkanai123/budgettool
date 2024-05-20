import BalanceCard from "@/components/customUI/BalanceCard";
import MainMenu from "@/components/customUI/MainMenu";
import RecentTransactionsLister from "@/components/customUI/RecentTransactionsLister";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowBigRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
	return (
		<div className='mx-auto min-h-screen flex flex-col px-4 transition-all ease-linear '>
			{/* Current balance Card with total expenses and income */}
			<BalanceCard />

			<MainMenu />
			{/* Recent Transactions */}
			<div className='border-t shadow-sm mt-4'>
				<div className='flex items-center justify-between mb-3 p-4'>
					<h1 className='text-xl text-lime-600 font-semibold'>Transactions</h1>
					{/*Add Income or Expense Link*/}
					<Link
						href='/transactions'
						className='flex items-center content-center rounded-md text-lime-700 hover:text-lime-500 text-right transition-all duration-2000 font-semibold ease-linear animate-pulse delay-3000  hover:animate-none hover:bg-lime-500 hover:bg-opacity-10 hover:px-3 '>
						See all
						<ArrowBigRight />
					</Link>
				</div>

				<RecentTransactionsLister />
			</div>
		</div>
	);
}
