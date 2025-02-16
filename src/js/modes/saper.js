const allBoxes = document.querySelectorAll(".mines__item");
const allCheckboxes = document.querySelectorAll(".battles__options-checkbox");
const fieldBg = document.querySelector(".mines__field-bg");
const allUnderBox = document.querySelectorAll(".mines__item-under");
const allUnderBoxArray = Array.from(allUnderBox);
const startBtn = document.querySelector("#start");
const withdrawBtn = document.querySelector("#withdraw");
const winAmount = document.querySelector("#winamount");
const betInput = document.querySelector(".gamemode__input");
const betBtn = document.querySelectorAll(".gamemode__btn");
let createdField = false;
let canClick = true;
let currentAmountOfWin = 0;
let betAmount = 0;
let pickedCorrect = 0;
let minesAmount = 3;

function swapUp() {
	if ((canClick = true)) {
		canClick = false;
		this.classList.remove("mines-canhover");
		this.classList.add("flip-down");
		this.children[0].classList.add("hidden");

		setTimeout(() => {
			this.children[1].classList.remove("hidden");
			this.classList.add("flip-up");
			canClick = true;

			if (
				this.children[1].firstElementChild.classList.contains(
					"mines__item-img"
				) === true
			) {
				playerLost();
				return;
			}

			pickedCorrect++;
			getAmountOfTotal();
		}, 100);
	}
}

const getRandomBoxNumber = () => {
	const randomBox = Math.floor(Math.random() * 25);

	return randomBox;
};

const createAmountOfMines = () => {
	if (allUnderBoxArray[0].firstElementChild !== null) {
		allUnderBoxArray.forEach((box) => {
			box.firstElementChild.remove();
		});

		allUnderBoxArray.forEach((box) => {
			box.parentElement.classList.add("mines-canhover");
			box.parentElement.firstElementChild.classList.remove("hidden");
			box.parentElement.lastElementChild.classList.add("hidden");
			box.parentElement.classList.remove("flip-up");
			box.parentElement.classList.remove("flip-down");
		});
	}

	if (
		createdField === false &&
		betInput.value > 0 &&
		betInput.value <= parseFloat(localStorage.getItem("Balance"))
	) {
		fieldBg.classList.add("hidden");
		betAmount = parseFloat(betInput.value);
		currentAmountOfWin = parseFloat(betAmount);
		startBtn.classList.add("hidden");
		withdrawBtn.classList.remove("hidden");
		winAmount.textContent = parseFloat(betAmount).toFixed(2) + "$";

		const amountToTakeFromBalance =
			parseFloat(localStorage.getItem("Balance")) - parseFloat(betAmount);
		localStorage.setItem(
			"Balance",
			parseFloat(amountToTakeFromBalance).toFixed(2) + "$"
		);

		allCheckboxes.forEach((item) => {
			if (item.checked === true) {
				minesAmount = item.id;
			}
		});

		for (i = 0; i < minesAmount; i++) {
			const mineImg = document.createElement("img");
			mineImg.classList.add("mines__item-img");
			mineImg.setAttribute("src", "../dist/img/mine_no_bg.png");
			mineImg.setAttribute("alt", "Mine icon");

			let randomBoxIndex = getRandomBoxNumber();
			while (allUnderBoxArray[randomBoxIndex].children.length > 0) {
				randomBoxIndex = getRandomBoxNumber(); // Jeśli ma dziecko, losuj ponownie
			}

			// Dodaj minę do pustego pola
			allUnderBoxArray[randomBoxIndex].append(mineImg);
		}

		setBalance();
		createAllCheckMarks();
		createdField = true;
	}
};

const createAllCheckMarks = () => {
	allUnderBoxArray.forEach((item) => {
		if (item.childElementCount === 0) {
			const icon = document.createElement("i");
			icon.classList.add(
				"fa-solid",
				"fa-check",
				"mines__item-icon",
				"mines__item-icon--green"
			);

			item.append(icon);
		}
	});
};

const getAmountOfTotal = () => {
	switch (minesAmount) {
		case "3":
			switch (pickedCorrect) {
				case 1:
					currentAmountOfWin =
						currentAmountOfWin + parseFloat(betAmount) * 0.15;
					break;
				case 2:
					currentAmountOfWin =
						currentAmountOfWin + parseFloat(betAmount) * 0.25;
					break;
				case 3:
					currentAmountOfWin = currentAmountOfWin + parseFloat(betAmount) * 0.4;
					break;
				case 4:
					currentAmountOfWin = currentAmountOfWin + parseFloat(betAmount) * 0.6;
					break;
				case 5:
					currentAmountOfWin = currentAmountOfWin + parseFloat(betAmount) * 0.8;
					break;
				case 6:
					currentAmountOfWin = currentAmountOfWin + parseFloat(betAmount) * 1.1;
					break;
				case 7:
					currentAmountOfWin = currentAmountOfWin + parseFloat(betAmount) * 1.5;
					break;
				case 8:
					currentAmountOfWin = currentAmountOfWin + parseFloat(betAmount) * 2;
					break;
				case 9:
					currentAmountOfWin = currentAmountOfWin + parseFloat(betAmount) * 2.5;
					break;
				case 10:
					currentAmountOfWin = currentAmountOfWin + parseFloat(betAmount) * 3;
					break;
				case 11:
					currentAmountOfWin = currentAmountOfWin + parseFloat(betAmount) * 3.8;
					break;
				case 12:
					currentAmountOfWin = currentAmountOfWin + parseFloat(betAmount) * 4.7;
					break;
				case 13:
					currentAmountOfWin = currentAmountOfWin + parseFloat(betAmount) * 5.7;
					break;
				case 14:
					currentAmountOfWin = currentAmountOfWin + parseFloat(betAmount) * 7;
					break;
				case 15:
					currentAmountOfWin = currentAmountOfWin + parseFloat(betAmount) * 8.5;
					break;
				case 16:
					currentAmountOfWin =
						currentAmountOfWin + parseFloat(betAmount) * 10.5;
					break;
				case 17:
					currentAmountOfWin =
						currentAmountOfWin + parseFloat(betAmount) * 12.8;
					break;
				case 18:
					currentAmountOfWin =
						currentAmountOfWin + parseFloat(betAmount) * 15.3;
					break;
				case 19:
					currentAmountOfWin =
						currentAmountOfWin + parseFloat(betAmount) * 18.5;
					break;
				case 20:
					currentAmountOfWin = currentAmountOfWin + parseFloat(betAmount) * 22;
					break;
				case 21:
					currentAmountOfWin = currentAmountOfWin + parseFloat(betAmount) * 27;
					break;
				case 22:
					currentAmountOfWin = currentAmountOfWin + parseFloat(betAmount) * 35;
					playerCheckAll();
					break;
			}
			break;
		case "6":
			switch (pickedCorrect) {
				case 1:
					currentAmountOfWin = currentAmountOfWin + parseFloat(betAmount) * 0.2;
					break;
				case 2:
					currentAmountOfWin =
						currentAmountOfWin + parseFloat(betAmount) * 0.35;
					break;
				case 3:
					currentAmountOfWin = currentAmountOfWin + parseFloat(betAmount) * 0.6;
					break;
				case 4:
					currentAmountOfWin =
						currentAmountOfWin + parseFloat(betAmount) * 0.85;
					break;
				case 5:
					currentAmountOfWin = currentAmountOfWin + parseFloat(betAmount) * 1.2;
					break;
				case 6:
					currentAmountOfWin = currentAmountOfWin + parseFloat(betAmount) * 1.6;
					break;
				case 7:
					currentAmountOfWin = currentAmountOfWin + parseFloat(betAmount) * 2.1;
					break;
				case 8:
					currentAmountOfWin = currentAmountOfWin + parseFloat(betAmount) * 2.8;
					break;
				case 9:
					currentAmountOfWin = currentAmountOfWin + parseFloat(betAmount) * 3.5;
					break;
				case 10:
					currentAmountOfWin = currentAmountOfWin + parseFloat(betAmount) * 4.3;
					break;
				case 11:
					currentAmountOfWin = currentAmountOfWin + parseFloat(betAmount) * 5.5;
					break;
				case 12:
					currentAmountOfWin = currentAmountOfWin + parseFloat(betAmount) * 7;
					break;
				case 13:
					currentAmountOfWin = currentAmountOfWin + parseFloat(betAmount) * 9;
					break;
				case 14:
					currentAmountOfWin =
						currentAmountOfWin + parseFloat(betAmount) * 11.5;
					break;
				case 15:
					currentAmountOfWin =
						currentAmountOfWin + parseFloat(betAmount) * 14.5;
					break;
				case 16:
					currentAmountOfWin = currentAmountOfWin + parseFloat(betAmount) * 18;
					break;
				case 17:
					currentAmountOfWin =
						currentAmountOfWin + parseFloat(betAmount) * 22.5;
					break;
				case 18:
					currentAmountOfWin = currentAmountOfWin + parseFloat(betAmount) * 28;
					break;
				case 19:
					currentAmountOfWin = currentAmountOfWin + parseFloat(betAmount) * 35;
					playerCheckAll();
					break;
			}
			break;
		case "12":
			switch (pickedCorrect) {
				case 1:
					currentAmountOfWin = currentAmountOfWin + parseFloat(betAmount) * 0.3;
					break;
				case 2:
					currentAmountOfWin =
						currentAmountOfWin + parseFloat(betAmount) * 0.55;
					break;
				case 3:
					currentAmountOfWin =
						currentAmountOfWin + parseFloat(betAmount) * 0.85;
					break;
				case 4:
					currentAmountOfWin =
						currentAmountOfWin + parseFloat(betAmount) * 1.25;
					break;
				case 5:
					currentAmountOfWin = currentAmountOfWin + parseFloat(betAmount) * 1.8;
					break;
				case 6:
					currentAmountOfWin = currentAmountOfWin + parseFloat(betAmount) * 2.4;
					break;
				case 7:
					currentAmountOfWin = currentAmountOfWin + parseFloat(betAmount) * 3.2;
					break;
				case 8:
					currentAmountOfWin = currentAmountOfWin + parseFloat(betAmount) * 4.2;
					break;
				case 9:
					currentAmountOfWin = currentAmountOfWin + parseFloat(betAmount) * 5.5;
					break;
				case 10:
					currentAmountOfWin = currentAmountOfWin + parseFloat(betAmount) * 7.2;
					break;
				case 11:
					currentAmountOfWin = currentAmountOfWin + parseFloat(betAmount) * 9.5;
					break;
				case 12:
					currentAmountOfWin =
						currentAmountOfWin + parseFloat(betAmount) * 12.5;
					break;
				case 13:
					currentAmountOfWin = currentAmountOfWin + parseFloat(betAmount) * 17;
					playerCheckAll();
					break;
			}
			break;
		case "24":
			switch (pickedCorrect) {
				case 1:
					currentAmountOfWin = currentAmountOfWin + parseFloat(betAmount) * 25;
					playerCheckAll();
					break;
			}
			break;
	}

	winAmount.textContent = parseFloat(currentAmountOfWin).toFixed(2) + "$";
};

const playerLost = () => {
	fieldBg.classList.remove("hidden");
	fieldBg.style.color = "rgb(235, 75, 75)";
	fieldBg.textContent = "You lost";
	withdrawBtn.classList.add("hidden");
	startBtn.classList.remove("hidden");

	winAmount.textContent = "0.00$";

	allUnderBoxArray.forEach((box) => {
		if (box.firstElementChild.classList.contains("mines__item-img")) {
			box.parentElement.classList.add("flip-down");
			box.parentElement.firstElementChild.classList.add("hidden");

			setTimeout(() => {
				box.parentElement.lastElementChild.classList.remove("hidden");
				box.parentElement.classList.add("flip-up");
			}, 100);
		}
	});

	resetVariables();
};

const playerCheckAll = () => {
	fieldBg.classList.remove("hidden");
	fieldBg.style.color = "rgb(113, 214, 77)";
	fieldBg.textContent =
		"You Won " + parseFloat(currentAmountOfWin).toFixed(2) + "$";
	withdrawBtn.classList.add("hidden");
	startBtn.classList.remove("hidden");

	winAmount.textContent = "0.00$";

	allUnderBoxArray.forEach((box) => {
		if (box.firstElementChild.classList.contains("mines__item-img")) {
			box.parentElement.classList.add("flip-down");
			box.parentElement.firstElementChild.classList.add("hidden");

			setTimeout(() => {
				box.parentElement.lastElementChild.classList.remove("hidden");
				box.parentElement.classList.add("flip-up");
			}, 100);
		}
	});

	const saperWonToAdd = parseInt(localStorage.getItem("saperWon")) + 1;
	localStorage.setItem("saperWon", saperWonToAdd); // Update stats

	resetVariables();
};

const withdraw = () => {
	if (createdField === true && parseFloat(currentAmountOfWin) > 0) {
		const amountToAddToBalance =
			parseFloat(localStorage.getItem("Balance")) +
			parseFloat(currentAmountOfWin);
		localStorage.setItem(
			"Balance",
			parseFloat(amountToAddToBalance).toFixed(2) + "$"
		);

		setBalance();
		playerCheckAll();
	}
};

const resetVariables = () => {
	createdField = false;
	currentAmountOfWin = 0;
	betAmount = 0;
	pickedCorrect = 0;
};

function setPlayersAmount() {
	allCheckboxes.forEach((item) => {
		item.checked = false;
	});

	this.checked = true;
}

function useInputBtn() {
	switch (this.id) {
		case "clear":
			betInput.value = "0";
			break;
		case "+1":
			betInput.value = parseFloat(betInput.value) + 1;
			break;
		case "+10":
			betInput.value = parseFloat(betInput.value) + 10;
			break;
		case "+100":
			betInput.value = parseFloat(betInput.value) + 100;
			break;
	}
}

const addEvenetListeners = () => {
	allBoxes.forEach((item) => {
		item.addEventListener("click", swapUp);
	});

	allCheckboxes.forEach((item) => {
		item.addEventListener("click", setPlayersAmount);
	});

	betBtn.forEach((btn) => {
		btn.addEventListener("click", useInputBtn);
	});

	startBtn.addEventListener("click", createAmountOfMines);
	withdrawBtn.addEventListener("click", withdraw);
};

addEvenetListeners();
