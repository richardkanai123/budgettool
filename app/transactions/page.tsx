import React from "react";
import { transactions } from "../(dummydata)";
import TransactionsLister from "@/components/customUI/TransactionsLister";
const AllTransactionsPage = () => {
	return (
		<div className='w-full'>
			<h1 className='text-center text-xl font-semibold leading-4 tracking-wider mb-4'>
				All Transactions
			</h1>

			<TransactionsLister data={transactions} />
		</div>
	);
};

export default AllTransactionsPage;
