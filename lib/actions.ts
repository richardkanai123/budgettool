const BaseURL = process.env.NEXT_PUBLIC_BASEURL;

export const CreateNewUser = async (data: {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
}) => {
	if (!BaseURL) {
		throw new Error("URL Error");
	}

	const targetUrl = `${BaseURL}/api/users`;

	const res = fetch(targetUrl, {
		method: "POST",
		headers: {
			"Content-type": "application/json",
		},
		body: JSON.stringify(data),
	});

	return res;
};
