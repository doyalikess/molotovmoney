const depositInput = document.querySelector("#deposit-amount");
const emailInput = document.querySelector("#email-input");
const clearBtns = document.querySelectorAll(".deposit__clear-btn");
const valueButtons = document.querySelectorAll(".deposit__btn");
const submitBtn = document.querySelector(".deposit__submit-btn");

function setValueOfDepositBasedOnBtnValue() {
	depositInput.value = this.id; // sets deposit value based on btn id
}

function clearInputOnBtn() {
	this.previousElementSibling.value = ""; // clear input
}

function formatCurrency(input) {
	// Zapisanie pozycji kursora
	let position = input.selectionStart;

	// Usuń symbol dolara i wszelkie niecyfrowe znaki (oprócz kropki dla dziesiętnej)
	let value = input.value.replace(/[^0-9.]/g, "");

	// Sprawdź, czy wartość jest liczbą i nie ma więcej niż jednej kropki
	if (value.includes(".")) {
		let parts = value.split(".");
		value = parts[0] + "." + parts[1].slice(0, 2); // Zachowaj tylko dwa miejsca po przecinku
	}

	// Dodaj symbol dolara na końcu
	input.value = value ? parseFloat(value).toFixed(2) + "$" : "";

	// Przywrócenie pozycji kursora (z pominięciem dodanego symbolu dolara)
	input.setSelectionRange(position, position);
}

const addValueToBalance = () => {
	// adds value players want to deposit to balance
	if (depositInput.value !== "" && emailInput.value !== "") {
		const currentBalanceOfAcount = parseFloat(
			localStorage.getItem("Balance").slice(0, -1)
		);
		const amountToAddToBalance =
			parseFloat(depositInput.value) + currentBalanceOfAcount;

		localStorage.setItem("Balance", amountToAddToBalance + "$");
		setBalance();
	} else if (depositInput.value === "" && emailInput.value === "") {
		depositInput.parentElement.classList.add("error-input");
		emailInput.parentElement.classList.add("error-input");
	} else if (depositInput.value === "") {
		depositInput.parentElement.classList.add("error-input");
	} else if (emailInput.value === "") {
		emailInput.parentElement.classList.add("error-input");
	}
};

function removeError() {
	this.parentElement.classList.remove("error-input");
}

const addListeners = () => {
	valueButtons.forEach((btn) => {
		btn.addEventListener("click", setValueOfDepositBasedOnBtnValue);
	});

	clearBtns.forEach((btn) => {
		btn.addEventListener("click", clearInputOnBtn);
	});

	submitBtn.addEventListener("click", addValueToBalance);
	depositInput.addEventListener("click", removeError);
	emailInput.addEventListener("click", removeError);
};

addListeners();
