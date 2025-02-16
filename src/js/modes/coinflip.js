const startBtn = document.querySelectorAll(".coinflip__btn");
const betInput = document.querySelector(".gamemode__input");
const coin = document.getElementById("coin");
const inputBtn = document.querySelectorAll(".gamemode__btn");
const lastDropBox = document.querySelector(".coinflip__lastdropsbox");
const totalProfit = document.querySelector("#total");
let spinning = false;
let bet = "";
let betAmount = 0;
let lastBetAmount = 0;
let maxBetAmount = parseFloat(localStorage.getItem("Balance")).toFixed(2);
let totalAmount = 0;

const flipCoin = () => {
	spinning = true;
	const result = Math.random() < 0.5 ? "heads" : "tails"; // get win (CT = heads, T = tails)

	coin.style.transition = "transform 6s ease-in-out"; // add animation

	// add correct class based on result
	setTimeout(() => {
		coin.classList.add(result === "heads" ? "flip-heads" : "flip-tails");
	}, 100);

	// check if player won
	setTimeout(() => {
		checkIfPlayerWon(result);
		createDrop(result);
	}, 6000);

	// allow player to bet again
	setTimeout(() => {
		spinning = false;
	}, 6500);

	takeFromBalance();
};

function resetCoin() {
	if (
		spinning === false &&
		betInput.value > 0 &&
		betInput.value <= parseFloat(localStorage.getItem("Balance"))
	) {
		bet = "";
		betAmount = 0;
		coin.style.transition = "none";
		coin.classList.remove("flip-heads", "flip-tails");

		betAmount = betInput.value;

		// set at what coin player bet
		switch (this.id) {
			case "ct":
				bet = "ct";
				break;
			case "t":
				bet = "t";
				break;
		}

		setTimeout(() => {
			flipCoin();
		}, 10);
	}
}

// remove balance after bet
const takeFromBalance = () => {
	const balanceAfterBet =
		parseFloat(localStorage.getItem("Balance")) - betAmount;
	localStorage.setItem("Balance", balanceAfterBet.toFixed(2) + "$");

	lastBetAmount = betAmount;

	maxBetAmount = parseFloat(localStorage.getItem("Balance")).toFixed(2);
	setBalance();
};

const checkIfPlayerWon = (winCoin) => {
	if (winCoin === "heads" && bet === "ct") {
		const winToAdd =
			betAmount * 2 + parseFloat(localStorage.getItem("Balance"));
		localStorage.setItem("Balance", winToAdd.toFixed(2) + "$");

		const coinflipWonToAdd = parseInt(localStorage.getItem("coinflipWon")) + 1;
		localStorage.setItem("coinflipWon", coinflipWonToAdd); // Update stats
	} else if (winCoin === "tails" && bet === "t") {
		const winToAdd =
			betAmount * 2 + parseFloat(localStorage.getItem("Balance"));
		localStorage.setItem("Balance", winToAdd.toFixed(2) + "$");

		const coinflipWonToAdd = parseInt(localStorage.getItem("coinflipWon")) + 1;
		localStorage.setItem("coinflipWon", coinflipWonToAdd);
	}

	setBalance();
};

const createDrop = (winCoin) => {
	const itemBox = document.createElement("div");
	const itemPart1 = document.createElement("div");
	const itemPart2 = document.createElement("div");
	const itemText1 = document.createElement("p");
	const itemText2 = document.createElement("p");
	const itemImg1 = document.createElement("img");
	const itemImg2 = document.createElement("img");
	const itemAmount = document.createElement("p");

	itemBox.classList.add("coinflip__item");
	itemPart1.classList.add("coinflip__item-part");
	itemPart2.classList.add("coinflip__item-part");
	itemText1.classList.add("coinflip__item-text");
	itemText2.classList.add("coinflip__item-text");
	itemImg1.classList.add("coinflip__item-img");
	itemImg2.classList.add("coinflip__item-img");
	itemAmount.classList.add("coinflip__item-text");

	switch (bet) {
		case "t":
			itemImg1.setAttribute("src", "../dist/img/t-icon.jpg");
			itemImg1.setAttribute("alt", "t coin");
			break;
		case "ct":
			itemImg1.setAttribute("src", "../dist/img/ct-icon.jpg");
			itemImg1.setAttribute("alt", "ct coin");
			break;
	}

	switch (winCoin) {
		case "tails":
			itemImg2.setAttribute("src", "../dist/img/t-icon.jpg");
			itemImg2.setAttribute("alt", "t coin");
			break;
		case "heads":
			itemImg2.setAttribute("src", "../dist/img/ct-icon.jpg");
			itemImg2.setAttribute("alt", "ct coin");
			break;
	}

	itemText1.textContent = "Bet:";
	itemText2.textContent = "Drop:";

	if (
		(winCoin === "heads" && bet === "ct") ||
		(winCoin === "tails" && bet === "t")
	) {
		itemAmount.style.color = "rgb(113, 214, 77)";
		itemAmount.textContent = "+" + parseFloat(betAmount).toFixed(2) + "$";
	} else {
		itemAmount.style.color = "rgb(235, 75, 75)";
		itemAmount.textContent = "-" + parseFloat(betAmount).toFixed(2) + "$";
	}

	itemPart1.append(itemText1, itemImg1);
	itemPart2.append(itemText2, itemImg2);
	itemBox.append(itemPart1, itemPart2, itemAmount);
	lastDropBox.append(itemBox);

	countTotal();
};

const countTotal = () => {
	const allItems = document.querySelectorAll(".coinflip__item");
	totalAmount = 0;

	allItems.forEach((item) => {
		totalAmount =
			parseFloat(totalAmount) + parseFloat(item.children[2].textContent);
	});

	if (totalAmount < 0) {
		totalProfit.style.color = "rgb(235, 75, 75)";
		totalProfit.textContent = parseFloat(totalAmount).toFixed(2) + "$";
	} else {
		totalProfit.style.color = "rgb(113, 214, 77)";
		totalProfit.textContent = "+" + parseFloat(totalAmount).toFixed(2) + "$";
	}
};

function useInputBtn() {
	switch (this.id) {
		case "clear":
			betInput.value = "0";
			break;
		case "last":
			betInput.value = lastBetAmount;
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
		case "+1000":
			betInput.value = parseFloat(betInput.value) + 1000;
			break;
		case "1/2":
			betInput.value = parseFloat(betInput.value) / 2;
			break;
		case "x2":
			betInput.value = parseFloat(betInput.value) * 2;
			break;
		case "max":
			betInput.value = maxBetAmount;
			break;
	}
}

const addEventListeners = () => {
	startBtn.forEach((btn) => {
		btn.addEventListener("click", resetCoin);
	});

	inputBtn.forEach((btn) => {
		btn.addEventListener("click", useInputBtn);
	});
};

addEventListeners();
