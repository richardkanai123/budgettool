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
			authorize: async (credentials) => {
				const BaseUrl = process.env.NEXT_PUBLIC_BASEURL;

				try {
					const Res = await fetch(`${BaseUrl}/api/users/login`, {
						cache: "no-cache",
						body: JSON.stringify({
							email: credentials.email,
							password: credentials.password,
						}),
						method: "POST",
					});
					const errorMessage = await Res.json();
					// wrong credentials case / no user case
					if (Res.status === 403 || Res.status === 417 || Res.status === 400) {
						return null;
					}

					// user and credentials match case
					if (Res.status === 200) {
						const FoundUser = await Res.json();
						console.log(FoundUser);
						return FoundUser;
					}
				} catch (error: any) {
					throw new Error(error?.message as string);
					return null;
				}
			},
		}),
	],

	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				// token.id = user.id;
				token.email = user.email;
			}
			return token;
		},

		async session({ session, token }) {
			if (session.user) {
				// session.user.id = token.id as string;
				session.user.email = token.email as string;
			}
			return session;
		},
	},
	pages: {
		signIn: "/sign-in",
	},
});
