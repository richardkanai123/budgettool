import ConnectDb from "@/lib/Database/Mongo";
import UserModel from "@/lib/Database/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { UserType } from "@/lib/types";

const rounds = process.env.NEXT_SALTROUND;
// get user by username
export async function POST(req: NextRequest) {
	const { email, password } = await req.json();

	console.log(email, password);
	try {
		await ConnectDb();
		const AvailableUser: UserType | null = await UserModel.findOne({
			email: email as string,
		});

		console.log(AvailableUser);

		if (!AvailableUser) {
			console.log("no user");
			return NextResponse.json(
				{ message: "Email does not! exist" },
				{ status: 400 },
			);
		}

		// compare passwords
		const isValidPassword = await bcrypt.compare(
			password,
			AvailableUser.password as string,
		);

		if (!isValidPassword) {
			console.log("invalid password");
			return NextResponse.json(
				{ message: "Wrong Credentials" },
				{ status: 403 },
			);
		}

		console.log(AvailableUser);
		return NextResponse.json({ AvailableUser }, { status: 200 });
	} catch (error: any) {
		return NextResponse.json(
			{ Error: error.message as string },
			{ status: 417 },
		);
	}
}
