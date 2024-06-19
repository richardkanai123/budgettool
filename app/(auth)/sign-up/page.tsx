import SignUpForm from "@/components/customUI/authui/signUpForm";
import Link from "next/link";

const SignUpPage = () => {
	return (
		<div className='w-full px-4 mx-auto h-screen flex flex-col items-center justify-center'>
			<h3 className='text-center text-lg font-bold'>Create Account</h3>
			<SignUpForm />

			<div className='mx-auto w-full md:w-[70%] p-4 text-center flex justify-between'>
				<Link
					className='text-sky-500 text-sm font-thin underline'
					href='/sign-in'>
					Sign in here
				</Link>
				<Link
					className='text-sky-500 text-sm font-thin underline'
					href='/forgot-password'>
					Forgot password?
				</Link>
			</div>
		</div>
	);
};

export default SignUpPage;
