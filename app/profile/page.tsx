import { auth, signOut } from "@/auth";
import ActionButton from "@/components/customUI/ActionButton";
import SignInForm from "@/components/customUI/authui/signInForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
	const session = await auth();
	if (!session) {
		return (
			<div className='w-full mx-auto flex flex-col items-center justify-center gap-6'>
				<p className='text-xl font-semibold text-yellow-300'>Sign in</p>

				<SignInForm />
			</div>
		);
	}

	async function SignOutUser() {
		"use server";
		await signOut();
	}

	console.log(session);
	return (
		<div className='container text-lg tracking-wider font-semibold flex flex-col mx-auto gap-4'>
			<p>Username: {session.user?.name}</p>
			<p>email:{session.user?.email}</p>
			<div className='w-[400px]'>
				<form action={SignOutUser}>
					<Button
						variant='destructive'
						type='submit'>
						Sign Out
					</Button>
				</form>
			</div>
		</div>
	);
};

export default ProfilePage;
