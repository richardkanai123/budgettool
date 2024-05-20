import Link from "next/link";
import React from "react";
import { UserIcon } from "lucide-react";
import ThemeToogle from "./ThemeToogle";
import Image from "next/image";
const Header = () => {
	// logo and theme toggler
	return (
		<div className='w-full py-2 flex items-center justify-between px-3 '>
			<Link
				className='text-lg font-bold text-primary hover:text-sky-700 hover:underline'
				href='/'>
				Budget
			</Link>

			<div className='flex align-middle gap-2 items-center min-w-fit'>
				<ThemeToogle />

				<Link
					href='/profile'
					className='p-1 relative object-cover'>
					<Image
						src='https://avatar.iran.liara.run/username?username=richardkanai123&size=40'
						quality={100}
						width={40}
						height={40}
						className='rounded-full object-cover flex-1 ring-0 outline-none hover:bg-transparent'
						alt='username'
					/>
				</Link>
			</div>
		</div>
	);
};

export default Header;
