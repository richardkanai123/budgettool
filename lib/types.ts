import { Document } from "mongoose";

export type TransactionType = {
	id: string;
	date: string;
	amount: number;
	type: string;
	category: string;
	description: string;
};

export interface UserType extends Document {
	_id: string;
	username: string;
	email: string;
	password?: string; // Optional because it will be excluded in some operations
	createdAt: string;
	updatedAt: string;
}
