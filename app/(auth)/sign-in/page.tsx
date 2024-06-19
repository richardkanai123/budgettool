import React from "react";
import SignInForm from "@/components/customUI/authui/signInForm";
import Link from "next/link";

const SignInPage = () => {
	return (
		<div className='w-full px-4 gap-4 mx-auto h-screen flex flex-col items-center justify-center'>
			<SignInForm />

			<div className='w-full p-4 text-center'>
				<p>New User?</p>
				<Link
					className='text-sky-500  underline'
					href={"/sign-up"}>
					Create Account here
				</Link>
			</div>
		</div>
	);
};

export default SignInPage;
