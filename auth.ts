import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import ConnectDb from "./lib/Database/Mongo";
import UserModel from "./lib/Database/models/UserModel";
import bcrypt from "bcrypt";
import { UserType } from "./lib/types";
export const { handlers, signIn, signOut, auth } = NextAuth({
	secret: process.env.NEXTAUTH_SECRET,
	basePath: "/api/auth",
	providers: [
		Credentials({
			name: "credentials",
			credentials: {
				email: {},
				password: {},
			},
			authorize: async (credentials): Promise<User | null> => {
				let user = null;

				await ConnectDb();

				const existingUser: UserType | null = await UserModel.findOne({
					email: credentials?.email,
				}).lean<UserType>();

				if (!existingUser) {
					console.error("No user found with the email: ", credentials?.email);
					throw new Error("User does not exist");
				}

				const isValidPassword = await bcrypt.compare(
					credentials?.password as string,
					existingUser.password as string,
				);

				if (!isValidPassword) {
					console.error("Invalid password for user: ", credentials?.email);
					throw new Error("Invalid password");
				}

				console.log("user found");

				// Remove the password field before returning the user object
				const { password, ...userWithoutPassword } = existingUser;

				return {
					...userWithoutPassword,
					id: userWithoutPassword._id.toString(),
				};
			},
		}),
	],

	// pages: {
	// 	signIn: "/sign-in",
	// },
});
