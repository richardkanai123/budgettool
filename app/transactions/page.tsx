import React, { Suspense } from "react";
import { transactions } from "../(dummydata)";
import TransactionsLister from "@/components/customUI/TransactionsLister";
import { TransactionType } from "@/lib/types";
import TransactionsListerLoading from "@/components/customUI/loadingUi/LoadingTrList";

const fetchTransactions = async (): Promise<TransactionType[]> => {
	return new Promise((resolve) => {
		console.log("fetching transactions");
		setTimeout(() => {
			resolve(transactions);
		}, 2000);
	});
};
const AllTransactionsPage = async () => {
	const transactionsData = await fetchTransactions();

	return (
		<div className='w-full'>
			<h1 className='text-center text-xl font-semibold leading-4 tracking-wider mb-4'>
				All Transactions
			</h1>

			<Suspense fallback={<TransactionsListerLoading />}>
				<TransactionsLister data={transactionsData} />
			</Suspense>
		</div>
	);
};

export default AllTransactionsPage;
