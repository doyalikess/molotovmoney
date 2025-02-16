const loginBtn = document.querySelector("#login-btn");
const logoutBtn = document.querySelector("#logout-btn");
const loggedIn = document.querySelector(".user__logged-out");
const loggedOut = document.querySelector(".user__logged-in");
const loginBtnMobile = document.querySelector("#login-btn-mobile");
const logoutBtnMobile = document.querySelector("#logout-btn-mobile");
const loggedInMobile = document.querySelector(
	".user-mobile__logged-out-mobile"
);
const loggedOutMobile = document.querySelector(
	".user-mobile__logged-in-mobile"
);
const loginPopup = document.querySelector(".login-popup");
const loginPopupBackBtn = document.querySelector(".login-popup__icon");
const loginPopupImg = document.querySelector("#login-img");
const loginPopupNickname = document.querySelector("#login-nickname");
const loginPopupSubmitBtn = document.querySelector(".login-popup__btn");
const nickname = document.querySelector(".user__name");
const avatar = document.querySelector(".user__avatar");
const nicknameMobile = document.querySelector(".user-mobile__name");
const avatarMobile = document.querySelector(".user-mobile__avatar");
const profileMobile = document.querySelector(".user-mobile__top");

const addListeners = () => {
	loginBtn.addEventListener("click", loginToAccount);
	logoutBtn.addEventListener("click", logoutFromAccount);
	loginBtnMobile.addEventListener("click", loginToAccount);
	logoutBtnMobile.addEventListener("click", logoutFromAccount);
	loginPopupBackBtn.addEventListener("click", loginToAccount);
	loginPopupSubmitBtn.addEventListener("click", createAccount);
	profileMobile.addEventListener("click", changeSiteToProfile);
	loginPopupImg.addEventListener("click", removeError);
	loginPopupNickname.addEventListener("click", removeError);
};

function removeError() {
	this.classList.remove("error-input");
}

const checkIfUserCreatedAccount = () => {
	// check if user created account
	// if didnt then show up "sign up" box
	// if did create account then add values to profile
	if (
		localStorage.getItem("createdAccount") === null ||
		localStorage.getItem("createdAccount") === NaN
	) {
		loggedIn.classList.remove("hidden");
		loggedOut.classList.add("hidden");
		loggedInMobile.classList.remove("hidden");
		loggedOutMobile.classList.add("hidden");
	} else {
		loggedIn.classList.add("hidden");
		loggedOut.classList.remove("hidden");
		loggedInMobile.classList.add("hidden");
		loggedOutMobile.classList.remove("hidden");
		avatar.setAttribute("src", localStorage.getItem("avatar"));
		nickname.textContent = localStorage.getItem("nickname");
		avatarMobile.setAttribute("src", localStorage.getItem("avatar"));
		nicknameMobile.textContent = localStorage.getItem("nickname");
	}

	// if stats are not added but account is created then create them (fixes error that if someone crated account before stats were added it add him stats)
	if (localStorage.getItem("createdAccount") == 1) {
		if (
			localStorage.getItem("battlesWon") === null ||
			localStorage.getItem("battlesWon") === NaN
		) {
			{
				localStorage.setItem("battlesWon", 0);
			}
		}

		if (
			localStorage.getItem("casesOpened") === null ||
			localStorage.getItem("casesOpened") === NaN
		) {
			{
				localStorage.setItem("casesOpened", 0);
			}
		}

		if (
			localStorage.getItem("upgradesDone") === null ||
			localStorage.getItem("upgradesDone") === NaN
		) {
			{
				localStorage.setItem("upgradesDone", 0);
			}
		}

		if (
			localStorage.getItem("rouletteWon") === null ||
			localStorage.getItem("rouletteWon") === NaN
		) {
			{
				localStorage.setItem("rouletteWon", 0);
			}
		}

		if (
			localStorage.getItem("crashWon") === null ||
			localStorage.getItem("crashWon") === NaN
		) {
			{
				localStorage.setItem("crashWon", 0);
			}
		}

		if (
			localStorage.getItem("jackpotWon") === null ||
			localStorage.getItem("jackpotWon") === NaN
		) {
			{
				localStorage.setItem("jackpotWon", 0);
			}
		}

		if (
			localStorage.getItem("coinflipWon") === null ||
			localStorage.getItem("coinflipWon") === NaN
		) {
			{
				localStorage.setItem("coinflipWon", 0);
			}
		}

		if (
			localStorage.getItem("saperWon") === null ||
			localStorage.getItem("saperWon") === NaN
		) {
			{
				localStorage.setItem("saperWon", 0);
			}
		}

		if (
			localStorage.getItem("muted") === null ||
			localStorage.getItem("muted") === NaN
		) {
			{
				localStorage.setItem("muted", 0);
			}
		}
	}
};

const loginToAccount = () => {
	// login to account
	if (localStorage.getItem("createdAccount") === "1") {
		loginPopup.classList.add("hidden");
		logoutFromAccount();
	} else {
		if (!loginPopup.classList.contains("hidden")) {
			loginPopup.classList.add("hide-login");
			setTimeout(() => {
				loginPopup.classList.remove("hide-login");
				loginPopup.classList.toggle("hidden");
			}, 500);
		} else {
			loginPopup.classList.toggle("hidden");
			loginPopup.classList.remove("hide-login");
		}
	}
};

const logoutFromAccount = () => {
	// log user out
	loggedIn.classList.toggle("hidden");
	loggedOut.classList.toggle("hidden");
	loggedInMobile.classList.toggle("hidden");
	loggedOutMobile.classList.toggle("hidden");
};

const createAccount = () => {
	// creates account and stats
	if (loginPopupImg.value !== "" && loginPopupNickname.value !== "") {
		localStorage.setItem("createdAccount", 1);
		localStorage.setItem("avatar", `${loginPopupImg.value}`);
		localStorage.setItem("nickname", `${loginPopupNickname.value}`);
		localStorage.setItem("battlesWon", 0);
		localStorage.setItem("casesOpened", 0);
		localStorage.setItem("upgradesDone", 0);
		localStorage.setItem("rouletteWon", 0);
		localStorage.setItem("crashWon", 0);
		localStorage.setItem("jackpotWon", 0);
		localStorage.setItem("coinflipWon", 0);
		localStorage.setItem("saperWon", 0);
		localStorage.setItem("muted", 0);
		loginToAccount();
		checkIfUserCreatedAccount();
	} else if (loginPopupImg.value === "" && loginPopupNickname.value === "") {
		loginPopupImg.classList.add("error-input");
		loginPopupNickname.classList.add("error-input");
	} else if (loginPopupNickname.value === "") {
		loginPopupNickname.classList.add("error-input");
	} else if (loginPopupImg.value === "") {
		loginPopupImg.classList.add("error-input");
	}
};

const changeSiteToProfile = () => {
	// depending on where we are change link
	if (document.body.id === "index") {
		open("./diff/profile.html", "_self");
	} else {
		open("../diff/profile.html", "_self");
	}
};

addListeners();
checkIfUserCreatedAccount();
