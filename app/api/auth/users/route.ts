import ConnectDb from "@/lib/Database/Mongo";
import UserModel from "@/lib/Database/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
// creates a new user from the given data on sign up

export async function POST(req: Request) {
	// read data from json body
	const { username, email, password, confirmPassword } = await req.json();
	// validate data
	if (!username || !email || !password || !confirmPassword) {
		return NextResponse.json({ message: "Missing data" }, { status: 400 });
	}
	//compare passwords
	if (password !== confirmPassword) {
		return NextResponse.json(
			{ message: "Passwords do not match" },
			{ status: 400 },
		);
	}
	// connect to db
	try {
		await ConnectDb();

		//Check in Users model if email already exists
		const ExistingUser = await UserModel.findOne({ email });

		if (ExistingUser) {
			return NextResponse.json(
				{ message: "Email already exists" },
				{ status: 400 },
			);
		}

		// salt
		const Rounds = process.env.NEXT_SALTROUND;
		if (!Rounds) {
			throw new Error("Salt rounds is not defined");
		}

		const SaltRounds = parseInt(Rounds);
		const salt = await bcrypt.genSalt(SaltRounds);
		// hash password
		const hashedPassword = await bcrypt.hash(password, salt);
		//Create a user
		const NewUser = await UserModel.create({
			username,
			email,
			password: hashedPassword,
		});

		return NextResponse.json(
			{
				message: "User created successfully",
				user: NewUser,
			},
			{ status: 201 },
		);
	} catch (error: any) {
		return NextResponse.json({
			message: "Failed to create user",
			error: error.message as string,
		});
	}
}

// get request
export async function GET(req: Request) {
	// connect to db
	try {
		await ConnectDb();
		return NextResponse.json({ message: "Hello world" });
	} catch (error: any) {
		console.log(error);
		return NextResponse.json(
			{
				message: "Failed to get users",
				error: error?.message as string,
			},
			{ status: 500 },
		);
	}
}
