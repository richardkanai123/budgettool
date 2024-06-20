import { UserType } from "@/lib/types";
import mongoose, { Schema } from "mongoose";

const UserSchema: Schema<UserType> = new Schema(
	{
		username: {
			type: String,
			required: [true, "Username is required"],
			unique: true,
			minlength: [5, "Must be at least 5 characters"],
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
			match: [/\S+@\S+\.\S+/, "Must be a valid email"],
		},
		password: {
			type: String,
			required: [true, "Password is required"],
			minlength: [6, "Password must be at least 6 characters"],
			match: [
				/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
				"Password must be at least 6 characters long and contain at least one letter, one number, and one special character",
			],
		},
	},
	{ timestamps: true },
);

const UserModel = mongoose.models.Users || mongoose.model("Users", UserSchema);

export default UserModel;
