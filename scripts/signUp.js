//============ Checking============
console.log("SignUp Page");

//================== == Login Page ================== class User
class User {
	constructor() {}

	// Validate username and pass
	validateUsername(username) {
		return username == "" && username.includes("@") ? false : true;
	}

	// validatePasswored
	validatePassword(password) {
		return password == "" || password.length < 8 ? false : true;
	}

	// Methode signup
	async signup(name, email, username, pass, mobile, desc) {
		console.log("signup start");
		const isValidated =
			this.validatePassword(pass) && this.validateUsername(username);

		if (isValidated) {
			// Good to go to store the data
			this.name = name;
			this.email = email;
			this.username = username;
			this.pass = pass;
			this.mobile = mobile;
			this.desc = desc;
		}
		const registerApi =
			"https://masai-api-mocker.herokuapp.com/auth/register";

		//  Default value of fethc is GET
		const response = await fetch(registerApi, {
			method: "POST",
			body: JSON.stringify(this),
			headers: {
				"Conten-Type": "application/json",
			},
		});

		const data = await response.json();
		console.log("data: ", data);
		console.log("signup");
	}

	async Login(username, password) {
		console.log("loginstart");
		const login_data = {
			username: username,
			password: password,
		};

		const loginApi = `https://masai-api-mocker.herokuapp.com/auth/login`;
		const response = await fetch(loginApi, {
			method: "POST",
			body: JSON.stringify(login_data),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await response.json();
		console.log("data: ", data);
		return data;
	}
}

// methode login
const user = new User();

const Register = () => {
	const form = document.querySelector("#form");
	const name = form.name.value;
	const email = form.email.value;
	const username = form.username.value;
	const password = form.password.value;
	const mobile = form.mobile.value;
	const description = form.description.value;

	user.signup(name, email, username, password, mobile, description);
};

const Login = async () => {
	const form = document.querySelector("#form");
	const username = form.username.value;
	const password = form.password.value;
	const { token } = await user.Login(username, password);
	getProfile(username, token);
};

const getProfile = async (username, token) => {
	let api_link = `https://masai-api-mocker.herokuapp.com/user/${username}`;

	const response = await fetch(api_link, {
		headers: {
			Authorization: "Bearer " + token,
			"Content-Type": "application/json",
		},
	});
	const data = await response.json();
	console.log("data: ", data);
};
