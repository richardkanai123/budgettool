import { cn } from "@/lib/utils";
const TransactionsListerLoading = () => {
	// initiate an array of length 10
	const data = Array(10).fill(0);
	return (
		<div className='w-full mx-auto flex flex-col gap-4'>
			<div className='w-full mx-auto px-2 flex items-center'>
				<p className='text-xl w-full p-3 bg-slate-300 animate-pulse delay-0 duration-5000'></p>
			</div>

			<div
				className={cn(
					"mx-auto w-full flex flex-col gap-6 px-2 max-h-[600px] ",
				)}>
				{data.map((item, index) => (
					<div
						key={index}
						className=' w-full shadow-sm rounded-md flex justify-between items-center gap-2 py-2 px-4 hover:shadow-lg hover:bg-slate-300 dark:hover:bg-slate-700 transition-all ease-linear cursor-pointer'>
						<div className='w-full flex gap-4 items-center transition-all ease-linear'>
							<div className='w-fit flex items-center justify-between rounded-full bg-slate-300 dark:bg-sky-950 p-2'></div>

							<div className='w-full mx-auto px-2 flex items-center'>
								<p className='text-xl w-full p-3 bg-slate-300 animate-pulse delay-0 duration-5000'></p>
							</div>
						</div>
						<div className='flex flex-col animate-pulse delay-150'>
							<p className='text-xl w-full p-1 bg-slate-600 animate-pulse delay-0 duration-5000'></p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default TransactionsListerLoading;
