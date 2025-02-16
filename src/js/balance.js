const balanceAmount = document.querySelector(".user__balance--amount");
const balanceAmountMobile = document.querySelector(
	".user-mobile__balance--amount"
);

const setBalance = () => {
	// if balance doesnt exist create it and add it to localStorage 
	// and if it exist add its value to nav and mobile nav
	if (
		localStorage.getItem("Balance") === null ||
		localStorage.getItem("Balance") === NaN
	) {
		localStorage.setItem("Balance", `00.00$`);
	} else {
		balanceAmount.textContent =
			parseFloat(localStorage.getItem("Balance")).toFixed(2) + "$";
		balanceAmountMobile.textContent =
			parseFloat(localStorage.getItem("Balance")).toFixed(2) + "$";
	}
};

setBalance();
