"use client";
import React from "react";
import { Button } from "../ui/button";
import { LoaderIcon } from "lucide-react";

// button that shows loading status and texts that varies using props
const ActionButton = ({
	ClickEvent,
	text,
	isLoadingAction,
	type,
}: {
	ClickEvent: any;
	text: string;
	isLoadingAction: boolean;
	type: "button" | "submit" | "reset";
}) => {
	return (
		<Button
			className='w-full ring-0 mx-auto text-lg flex items-center gap-2 text-white disabled:bg-sky-300/40'
			variant='default'
			type={type}
			disabled={isLoadingAction}
			onClick={ClickEvent}>
			{isLoadingAction && <LoaderIcon className='w-8 h-6 animate-spin' />}
			{text}
		</Button>
	);
};

export default ActionButton;
