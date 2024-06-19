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
			minlength: [8, "Password must be at least 8 characters"],
			match: [
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
				"Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character",
			],
		},
	},
	{ timestamps: true },
);

const UserModel = mongoose.models.Users || mongoose.model("Users", UserSchema);

export default UserModel;
