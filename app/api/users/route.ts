import ConnectDb from "@/lib/Database/Mongo";
import UserModel from "@/lib/Database/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

// Creates a new user from the given data on sign up
export async function POST(req: NextRequest) {
	try {
		// Read data from json body
		const { username, email, password, confirmPassword } = await req.json();

		// Validate data
		if (!username || !email || !password || !confirmPassword) {
			return NextResponse.json({ message: "Missing data" }, { status: 400 });
		}

		// Compare passwords
		if (password !== confirmPassword) {
			return NextResponse.json(
				{ message: "Password and confirmPassword do not match" },
				{ status: 400 },
			);
		}

		// Connect to db
		await ConnectDb();

		// Check in Users model if email already exists
		const existingUser = await UserModel.findOne({ email });

		if (existingUser) {
			return NextResponse.json(
				{ message: "Email already exists" },
				{ status: 400 },
			);
		}

		// Salt
		const rounds = process.env.NEXT_SALTROUND;
		if (!rounds) {
			throw new Error("Salt rounds are not defined");
		}

		const saltRounds = parseInt(rounds, 10);
		const salt = await bcrypt.genSalt(saltRounds);

		// Hash password
		const hashedPassword = await bcrypt.hash(password, salt);

		// Create a user
		const newUser = await UserModel.create({
			username,
			email,
			password: hashedPassword,
		});

		return NextResponse.json(
			{ message: "User created successfully", user: newUser },
			{ status: 201 },
		);
	} catch (error: any) {
		console.error(error);
		return NextResponse.json(
			{ message: error.message || error._message },
			{ status: 500 },
		);
	}
}

// Get request
export async function GET(req: NextRequest) {
	try {
		// Connect to db
		await ConnectDb();
		const ExistingUser = await UserModel.findOne({
			email: "testemailrkn@gmail.com",
		})
			.lean()
			.exec();

		if (!ExistingUser) {
			return NextResponse.json({ message: "User not found" }, { status: 404 });
		}

		console.log(ExistingUser);
		return NextResponse.json(
			{ message: "User found", ExistingUser },
			{ status: 200 },
		);
	} catch (error: any) {
		console.error(error);
		return NextResponse.json(
			{ message: "Failed to get users", error: error?.message },
			{ status: 500 },
		);
	}
}
