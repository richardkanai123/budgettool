import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/customUI/Header";
import { ThemeProvider } from "@/components/customUI/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Budgeting App",
	description: " A budgeting app for tracking expenses and income.",
	authors: [
		{ name: "richard kanai", url: "https://github.com/richardkanai123" },
	],
	keywords: [
		"budget",
		"expense",
		"income",
		"tracker",
		"finance",
		"website",
		"nextjs",
	],
	creator: "richardkanai",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang='en'
			suppressHydrationWarning>
			<body className='bg-gray-200 dark:bg-slate-900'>
				<div className='relative w-screen h-full  data-[text-primary] dark:data-[text-sky-900] max-w-screen-md mx-auto overflow-x-hidden'>
					<ThemeProvider
						attribute='class'
						defaultTheme='light'
						enableSystem
						disableTransitionOnChange>
						<div className='z-10 sticky top-0 bottom-0 left-0 right-0 w-full max-w-screen-md mx-auto flex flex-col px-1 py-0 border-b border-gray-300 dark:border-slate-700 bg-blend-overlay backdrop-blur-xl  '>
							<Header />
						</div>
						<main className='min-h-screen pt-4 my-0 mx-auto'>{children}</main>
					</ThemeProvider>
				</div>
			</body>
		</html>
	);
}
