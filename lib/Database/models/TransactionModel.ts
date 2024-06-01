import mongoose, { Schema } from "mongoose";
import { z } from "zod";
// user model
import UserModel from "@/lib/Database/models/UserModel";
// Define the valid categories
const validCategories = {
	expense: ["food", "travel", "entertainment", "utilities", "health"],
	income: ["salary", "bonus", "interest"],
	saving: ["emergency fund", "retirement", "investment"],
	investment: ["stocks", "bonds", "real estate", "mutual funds"],
};

const mongooseTransactionSchema = new Schema(
	{
		// userid to relate to the db UsersModel
		userid: {
			type: Schema.Types.ObjectId,
			ref: UserModel,
		},
		transactionNote: {
			type: String,
			required: [true, "Note is required"],
			minlength: [5, "Note must be at least 5 characters"],
		},
		transactionDate: {
			type: Date,
			required: [true, "Date of transaction is required"],
			max: [new Date(), "Transaction date must be in the past"],
		},
		transactionAmount: {
			type: Number,
			required: [true, "Amount is required"],
			min: [1, "Amount must be greater than 0"],
		},
		transactionType: {
			type: String,
			required: [true, "Transaction type is required"],
			enum: ["expense", "income", "saving", "investment", "transfer"],
		},
		transactionCategory: {
			type: String,
			required: [true, "Category is required"],
		},
	},
	{ timestamps: true },
);

// Create the Mongoose model
const TransactionModel =
	mongoose.models.Transactions ||
	mongoose.model("Transactions", mongooseTransactionSchema);

export default TransactionModel;
