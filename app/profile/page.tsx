import ActionButton from "@/components/customUI/ActionButton";
import React from "react";

const ProfilePage = () => {
	async function Clicked() {
		"use server";
		console.log("waag");
	}

	return (
		<div className='container text-lg tracking-wider font-semibold flex flex-col mx-auto gap-4'>
			<p>Username: username</p>
			<p>email: username@email.com</p>
			<div className='w-[400px]'>
				<ActionButton
					isLoadingAction={true}
					text='Create'
					type='button'
					ClickEvent={Clicked}
				/>
			</div>
		</div>
	);
};

export default ProfilePage;
