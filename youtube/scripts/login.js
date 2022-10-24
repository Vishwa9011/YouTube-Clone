console.log("Welcome");

class User {
	constructor() {}

	validate(username, password) {
		return username == "" || password == "" || password.length < 8
			? false
			: true;
	}

	async signup(name, email, username, password, mobile, description) {
		console.log("SignUp Start...");

		if (this.validate(username, password)) {
			// TODO:=> If validation success then add in obj
			this.name = name;
			this.email = email;
			this.username = username;
			this.password = password;
			this.mobile = mobile;
			this.description = description;

			const reg_api = `https://masai-api-mocker.herokuapp.com/auth/register`;
			const response = await fetch(reg_api, {
				method: "POST",
				body: JSON.stringify(this),
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await response.json();

			// ! Error Checking
			if (data.error) {
				alert(data.message);
			} else {
				// ! If No error than show loader and go to login page
				alert("Registeration successful");
				showPageDirect.gotoLogInPage(2000);
			}
			console.log("data: ", data);
		} else {
			alert("Please enter the valid credentials");
		}
		console.log("SignUp End");
	}

	async login(username, password) {
		if (username == "") {
			alert("Please enter valid credentials");
			return;
		}
		try {
			console.log("login Start...");
			const login_detail = {
				username: username,
				password: password,
			};
			const login_api = `https://masai-api-mocker.herokuapp.com/auth/login`;
			const response = await fetch(login_api, {
				method: "POST",
				body: JSON.stringify(login_detail),
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await response.json();
			console.log("data: ", data);
			if (data.error) {
				alert(data.message);
			}
			console.log("login End");
			return data;
		} catch (error) {
			console.log("error: ", error);
		}
	}
}

const user = new User();
console.log("user: ", user);

const Register = () => {
	const form = document.querySelector("#form");
	const name = form.name.value;
	const email = form.email.value;
	const username = form.username.value;
	const password = form.password.value;
	const mobile = form.mobile.value;
	const description = form.description.value;
	user.signup(name, email, username, password, mobile, description);
	console.log(user);
};

const Login = async () => {
	const form = document.querySelector("#formLogin");
	const username = form.login_username.value;
	const password = form.login_password.value;
	const { token } = await user.login(username, password);
	getProfile(username, token);
};

const getProfile = async (username, token) => {
	try {
		console.log("Getting the profile...");
		const api_link = `https://masai-api-mocker.herokuapp.com/user/${username}`;
		const response = await fetch(api_link, {
			headers: {
				Authorization: "Bearer " + token,
				"Content-Type": "application/json",
			},
		});
		const data = await response.json();
		localStorage.setItem("userProfile", JSON.stringify(data));
		if (!data.message) {
			showPageDirect.gotoHomePage();
		}
		console.log("data: ", data);
		console.log("Got the UserProfile");
	} catch (err) {
		console.log("Error: ", err);
	}
};

class showPage {
	constructor() {}

	gotoLogInPage(val) {
		showPageDirect.showLoader();
		setTimeout(() => {
			document.querySelector("#register-form").style.display = "none";
			document.querySelector("#login-form").style.display = "block";
			document.querySelector("#loader").style.display = "none";
		}, 1000);
	}
	gotoSignUpPage(val) {
		showPageDirect.showLoader();
		setTimeout(() => {
			document.querySelector("#register-form").style.display = "block";
			document.querySelector("#login-form").style.display = "none";
			document.querySelector("#loader").style.display = "none";
		}, 1000);
	}

	gotoHomePage() {
		showPageDirect.showLoader();
		setTimeout(() => {
			window.location.href = "index.html";
		}, 1000);
	}
	showLoader() {
		document.querySelector("#register-form").style.display = "none";
		document.querySelector("#login-form").style.display = "none";
		document.querySelector("#loader").style.display = "block";
	}
}

const showPageDirect = new showPage();

document
	.querySelector(".login-btn")
	.addEventListener("click", showPageDirect.gotoLogInPage);
document
	.querySelector(".signUp-btn")
	.addEventListener("click", showPageDirect.gotoSignUpPage);
