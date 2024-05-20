import React from "react";
import { NewTransactionForm } from "@/components/customUI/NewTransactionForm";
const NewTransactionPage = () => {
	return (
		<div className='mx-auto w-full p-4 flex flex-col'>
			{/* add new transaction form */}
			<h1 className='text-center text-2xl mb-4 leading-4 tracking-wider '>
				Add New Transaction
			</h1>

			<NewTransactionForm />
		</div>
	);
};

export default NewTransactionPage;
