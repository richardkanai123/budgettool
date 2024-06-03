// connecting to Mongodb
import mongoose from "mongoose";

const databaseUrl = process.env.NEXT_MONGODB;

if (!databaseUrl) {
	throw new Error("Database is not defined");
}

const ConnectDb = async () => {
	try {
		const res = await mongoose.connect(databaseUrl);
		return res;
	} catch (error: any) {
		console.log(error);
		throw new Error(`Failed to connect database + ${error?.message as string}`);
	}
};

export default ConnectDb;
