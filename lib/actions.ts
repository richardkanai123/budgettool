const BaseURL = process.env.NEXT_PUBLIC_BASEURL;

export const CreateNewUser = async (data: {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
}) => {
	console.log(BaseURL);

	if (!BaseURL) {
		throw new Error("URL Error");
	}

	const targetUrl = `${BaseURL}/api/auth/users`;
	console.log(targetUrl);

	const res = fetch(targetUrl, {
		method: "POST",
		headers: {
			"Content-type": "application/json",
		},
		body: JSON.stringify(data),
	});

	return res;
};
