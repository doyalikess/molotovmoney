const rouletteBox = document.querySelector(".roulette__items");
const lastDropsBox = document.querySelector(".roulette__lastdrops-box");
const timerLine = document.querySelector(".roulette__timerbox-line");
const timerText = document.querySelector(".roulette__timerbox-time");
const inputBtn = document.querySelectorAll(".gamemode__btn");
const input = document.querySelector(".gamemode__input");
const betBtn = document.querySelectorAll(".roulette__bet-top-btn");
const betsRed = document.querySelector(".roulette__bet-bottom--red");
const betsBlack = document.querySelector(".roulette__bet-bottom--black");
const betsGreen = document.querySelector(".roulette__bet-bottom--green");
const timeForStart = 15000; // after how much time roulette start spinning
const timeForRestart = 14950; // restarting roulette
let dropOrder = -1; // order for last drop
let timer = 15000; // timer to count time down from
let lastBetAmount = 0;
let maxBetAmount = parseFloat(localStorage.getItem("Balance")).toFixed(2);
let didBetRed = false;
let didBetBlack = false;
let didBetGreen = false;
let howMuchBetRed = 0;
let howMuchBetBlack = 0;
let howMuchBetGreen = 0;
let spinning = false;
let timerInterval;
let playerInterval;
let totalRedValue = 0;
let totalBlackValue = 0;
let totalGreenValue = 0;
let previousItem = null;

// This function is for timer to count down
const startTimer = () => {
	let seconds = Math.floor(timer / 1000);
	let milliseconds = (timer % 1000) / 10;
	milliseconds = milliseconds.toString().padStart(2, "0");

	timerText.textContent = `${seconds}:${milliseconds}s`;

	if (timer > 0) {
		timer -= 10;
	} else {
		clearInterval(timerInterval);
		timerText.textContent = "0:00s"; // Reset text after counting
		return;
	}
};

timerInterval = setInterval(startTimer, 10); // start clock

// adds anim to timer line
const addLineAnim = () => {
	timerLine.classList.add("roulette-timer");
};

// This function start roulette and get winning item
const startRoulette = () => {
	// Random strength of spin
	const howStrongSpin = Math.floor(Math.random() * 7400 - 14800);

	// Sets spin strength and animation
	rouletteBox.style.transition = "left 5s cubic-bezier(0,1,0.5,1)";
	rouletteBox.style.left = `${howStrongSpin}px`;

	timerLine.classList.remove("roulette-timer");

	// Set spinning to true
	spinning = true;

	// Stop creaing new random players
	clearInterval(playerInterval);

	// Set closest item number to be bigger. Its visual clue whats winning item
	const intervalId = setInterval(() => {
		const redLineX = document
			.querySelector(".roulette__middle-point")
			.getBoundingClientRect().x;

		function updateClosestItemScale() {
			const items = document.querySelectorAll(".roulette__item");
			let closestItem = null;
			let closestDistance = Infinity;

			items.forEach((item) => {
				item.style.fontSize = "2rem";
			});

			items.forEach((item) => {
				const itemCenterX =
					item.getBoundingClientRect().x + item.offsetWidth / 2;
				const distance = Math.abs(itemCenterX - redLineX);

				if (distance < closestDistance) {
					closestDistance = distance;
					closestItem = item;
				}
			});

			if (closestItem) {
				closestItem.style.fontSize = "2.4rem";
			}

			if (previousItem !== closestItem) {
				previousItem = closestItem;
			}
		}

		updateClosestItemScale();
	}, 30);

	setTimeout(() => {
		clearInterval(intervalId); // Stops dynamic scaling after animation end
		const redLineX = document
			.querySelector(".roulette__middle-point")
			.getBoundingClientRect().x;

		function getWinningItem() {
			const items = document.querySelectorAll(".roulette__item");
			let closestItem = null;
			let closestDistance = Infinity;

			items.forEach((item) => {
				const itemCenterX =
					item.getBoundingClientRect().x + item.offsetWidth / 2;
				const distance = Math.abs(itemCenterX - redLineX);

				if (distance < closestDistance) {
					closestDistance = distance;
					closestItem = item;
				}
			});

			return closestItem;
		}

		const winningItem = getWinningItem();
		if (winningItem) {
			// If player did bet on anything then call next function
			if (
				didBetBlack !== false ||
				didBetRed !== false ||
				didBetGreen !== false
			) {
				checkIfPlayerWon(winningItem);
			}

			resetVariables();
			createItemToLastDrops(winningItem);
			startCountingToNewStart();
			addLineAnim();

			playerInterval = setInterval(() => {
				createRandomPlayers();
			}, 1000);

			clearInterval(timerInterval);
			timer = 15000;
			timerInterval = setInterval(startTimer, 10);
		}
	}, 5000);
};

// Counting to reset and start
const startCountingToNewStart = () => {
	setTimeout(() => {
		resetRoulette();
	}, timeForRestart);

	setTimeout(() => {
		startRoulette();
	}, timeForStart);
};

// reset everything
const resetVariables = () => {
	spinning = false;
	howMuchBetRed = 0;
	howMuchBetBlack = 0;
	howMuchBetGreen = 0;
	didBetRed = false;
	didBetBlack = false;
	didBetGreen = false;
	betsBlack.innerHTML = "";
	betsGreen.innerHTML = "";
	betsRed.innerHTML = "";
	totalRedValue = 0;
	totalBlackValue = 0;
	totalGreenValue = 0;
	maxBetAmount = parseFloat(localStorage.getItem("Balance")).toFixed(2);
	setTotal();
};

// reset "anim"
const resetRoulette = () => {
	rouletteBox.style.transition = "0.1s";
	rouletteBox.style.left = "0px";
};

// create item to last drops based on drop
const createItemToLastDrops = (winningItem) => {
	const dropItem = document.createElement("p");
	dropItem.classList.add("roulette__lastdrops-item");

	if (winningItem.classList.contains("roulette__item--green")) {
		dropItem.classList.add("roulette__lastdrops-item--green");
	} else if (winningItem.classList.contains("roulette__item--red")) {
		dropItem.classList.add("roulette__lastdrops-item--red");
	} else if (winningItem.classList.contains("roulette__item--black")) {
		dropItem.classList.add("roulette__lastdrops-item--black");
	}

	dropItem.textContent = winningItem.textContent;
	dropItem.style.order = dropOrder;
	dropOrder--;
	lastDropsBox.append(dropItem);
};

// get btns value and put it to input
function useInputBtn() {
	switch (this.id) {
		case "clear":
			input.value = "0";
			break;
		case "last":
			input.value = lastBetAmount;
			break;
		case "+1":
			input.value = parseFloat(input.value) + 1;
			break;
		case "+10":
			input.value = parseFloat(input.value) + 10;
			break;
		case "+100":
			input.value = parseFloat(input.value) + 100;
			break;
		case "+1000":
			input.value = parseFloat(input.value) + 1000;
			break;
		case "1/2":
			input.value = parseFloat(input.value) / 2;
			break;
		case "x2":
			input.value = parseFloat(input.value) * 2;
			break;
		case "max":
			input.value = maxBetAmount;
			break;
	}
}

// if player won add amount to balance
const checkIfPlayerWon = (winningItem) => {
	const winAudio = new Audio("../dist/audio/upgrader-win.wav");
	// const lostAudio = new Audio("../dist/audio/upgrader-lost.wav");

	if (
		didBetBlack === true &&
		winningItem.classList.contains("roulette__item--black")
	) {
		const howMuchToAddBlack =
			parseFloat(localStorage.getItem("Balance")) + howMuchBetBlack * 2;
		localStorage.setItem("Balance", howMuchToAddBlack.toFixed(2) + "$");

		const rouletteWonToAddBlack =
			parseInt(localStorage.getItem("rouletteWon")) + 1;
		localStorage.setItem("rouletteWon", rouletteWonToAddBlack);

		winAudio.play();

		setBalance();
	}

	if (
		didBetRed === true &&
		winningItem.classList.contains("roulette__item--red")
	) {
		const howMuchToAddRed =
			parseFloat(localStorage.getItem("Balance")) + howMuchBetRed * 2;
		localStorage.setItem("Balance", howMuchToAddRed.toFixed(2) + "$");

		const rouletteWonToAddRed =
			parseInt(localStorage.getItem("rouletteWon")) + 1;
		localStorage.setItem("rouletteWon", rouletteWonToAddRed);

		winAudio.play();

		setBalance();
	}

	if (
		didBetGreen === true &&
		winningItem.classList.contains("roulette__item--green")
	) {
		const howMuchToAddGreen =
			parseFloat(localStorage.getItem("Balance")) + howMuchBetGreen * 14;
		localStorage.setItem("Balance", howMuchToAddGreen.toFixed(2) + "$");

		const rouletteWonToAddGreen =
			parseInt(localStorage.getItem("rouletteWon")) + 1;
		localStorage.setItem("rouletteWon", rouletteWonToAddGreen);

		winAudio.play();

		setBalance();
	}
};

// adds player bet
function addBet() {
	// if value of bet is not 0 and roulette is spinning and if user actually have money that he wants to bet
	if (
		input.value > 0 &&
		spinning === false &&
		input.value <= parseFloat(localStorage.getItem("Balance"))
	) {
		switch (this.id) {
			case "redBtn":
				didBetRed = true;
				howMuchBetRed += parseFloat(input.value);
				lastBetAmount = parseFloat(input.value);

				const itemBoxRed = document.createElement("div");
				const itemImgRed = document.createElement("img");
				const itemNameRed = document.createElement("p");
				const itemAmountRed = document.createElement("p");

				itemBoxRed.classList.add("roulette__bet-item");
				itemBoxRed.classList.add("roulette__bet-item--red");
				itemImgRed.classList.add("roulette__bet-avatar");
				itemNameRed.classList.add("roulette__bet-nickname");
				itemAmountRed.classList.add("roulette__bet-amount");

				itemImgRed.setAttribute("alt", "Player Avatar");
				itemImgRed.setAttribute("src", localStorage.getItem("avatar"));
				itemNameRed.textContent = localStorage.getItem("nickname");
				itemAmountRed.textContent = parseFloat(input.value).toFixed(2) + "$";

				itemBoxRed.append(itemImgRed, itemNameRed, itemAmountRed);
				betsRed.append(itemBoxRed);

				const howMuchToTakeRed =
					parseFloat(localStorage.getItem("Balance")) - parseFloat(input.value);
				localStorage.setItem("Balance", howMuchToTakeRed.toFixed(2) + "$");
				setBalance();
				sortBetsByAmount();
				maxBetAmount = parseFloat(localStorage.getItem("Balance")).toFixed(2);
				break;
			case "blackBtn":
				didBetBlack = true;
				howMuchBetBlack += parseFloat(input.value);
				lastBetAmount = parseFloat(input.value);

				const itemBoxBlack = document.createElement("div");
				const itemImgBlack = document.createElement("img");
				const itemNameBlack = document.createElement("p");
				const itemAmountBlack = document.createElement("p");

				itemBoxBlack.classList.add("roulette__bet-item");
				itemBoxBlack.classList.add("roulette__bet-item--black");
				itemImgBlack.classList.add("roulette__bet-avatar");
				itemNameBlack.classList.add("roulette__bet-nickname");
				itemAmountBlack.classList.add("roulette__bet-amount");

				itemImgBlack.setAttribute("alt", "Player Avatar");
				itemImgBlack.setAttribute("src", localStorage.getItem("avatar"));
				itemNameBlack.textContent = localStorage.getItem("nickname");
				itemAmountBlack.textContent = parseFloat(input.value).toFixed(2) + "$";

				itemBoxBlack.append(itemImgBlack, itemNameBlack, itemAmountBlack);
				betsBlack.append(itemBoxBlack);

				const howMuchToTakeBlack =
					parseFloat(localStorage.getItem("Balance")) - parseFloat(input.value);
				localStorage.setItem("Balance", howMuchToTakeBlack.toFixed(2) + "$");
				setBalance();
				sortBetsByAmount();
				maxBetAmount = parseFloat(localStorage.getItem("Balance")).toFixed(2);
				break;
			case "greenBtn":
				didBetGreen = true;
				howMuchBetGreen += parseFloat(input.value);
				lastBetAmount = parseFloat(input.value);

				const itemBoxGreen = document.createElement("div");
				const itemImgGreen = document.createElement("img");
				const itemNameGreen = document.createElement("p");
				const itemAmountGreen = document.createElement("p");

				itemBoxGreen.classList.add("roulette__bet-item");
				itemBoxGreen.classList.add("roulette__bet-item--green");
				itemImgGreen.classList.add("roulette__bet-avatar");
				itemNameGreen.classList.add("roulette__bet-nickname");
				itemAmountGreen.classList.add("roulette__bet-amount");

				itemImgGreen.setAttribute("alt", "Player Avatar");
				itemImgGreen.setAttribute("src", localStorage.getItem("avatar"));
				itemNameGreen.textContent = localStorage.getItem("nickname");
				itemAmountGreen.textContent = parseFloat(input.value).toFixed(2) + "$";

				itemBoxGreen.append(itemImgGreen, itemNameGreen, itemAmountGreen);
				betsGreen.append(itemBoxGreen);

				const howMuchToTakeGreen =
					parseFloat(localStorage.getItem("Balance")) - parseFloat(input.value);
				localStorage.setItem("Balance", howMuchToTakeGreen.toFixed(2) + "$");
				setBalance();
				sortBetsByAmount();
				maxBetAmount = parseFloat(localStorage.getItem("Balance")).toFixed(2);
				break;
		}
		setTotal();
	}
}

// create random players
const createRandomPlayers = () => {
	const doOrNot = Math.floor(Math.random() * 4);

	if (doOrNot === 0) {
		const howManyBotsRed = Math.floor(Math.random() * 4);
		const howManyBotsBlack = Math.floor(Math.random() * 4);
		const howManyBotsGreen = Math.floor(Math.random() * 4);

		for (i = 0; i < howManyBotsRed; i++) {
			const itemBox = document.createElement("div");
			const itemImg = document.createElement("img");
			const itemName = document.createElement("p");
			const itemAmount = document.createElement("p");

			const randomAmount = Math.floor(Math.random() * 2000);

			itemBox.classList.add("roulette__bet-item");
			itemBox.classList.add("roulette__bet-item--red");
			itemImg.classList.add("roulette__bet-avatar");
			itemName.classList.add("roulette__bet-nickname");
			itemAmount.classList.add("roulette__bet-amount");

			itemImg.setAttribute("alt", "Player Avatar");
			itemImg.setAttribute("src", `../dist/img/avatars/avatar${i + 1}.jpg`);
			itemAmount.textContent = randomAmount.toFixed(2) + "$";

			if (i === 0) {
				itemName.textContent = "Cat";
			} else if (i === 1) {
				itemName.textContent = "Hamster";
			} else {
				itemName.textContent = "Rat";
			}

			itemBox.append(itemImg, itemName, itemAmount);
			betsRed.append(itemBox);
		}

		for (i = 0; i < howManyBotsBlack; i++) {
			const itemBox = document.createElement("div");
			const itemImg = document.createElement("img");
			const itemName = document.createElement("p");
			const itemAmount = document.createElement("p");

			const randomAmount = Math.floor(Math.random() * 2000);

			itemBox.classList.add("roulette__bet-item");
			itemBox.classList.add("roulette__bet-item--black");
			itemImg.classList.add("roulette__bet-avatar");
			itemName.classList.add("roulette__bet-nickname");
			itemAmount.classList.add("roulette__bet-amount");

			itemImg.setAttribute("alt", "Player Avatar");
			itemImg.setAttribute("src", `../dist/img/avatars/avatar${i + 1}.jpg`);
			itemAmount.textContent = randomAmount.toFixed(2) + "$";

			if (i === 0) {
				itemName.textContent = "Cat";
			} else if (i === 1) {
				itemName.textContent = "Hamster";
			} else {
				itemName.textContent = "Rat";
			}

			itemBox.append(itemImg, itemName, itemAmount);
			betsBlack.append(itemBox);
		}

		for (i = 0; i < howManyBotsGreen; i++) {
			const itemBox = document.createElement("div");
			const itemImg = document.createElement("img");
			const itemName = document.createElement("p");
			const itemAmount = document.createElement("p");

			const randomAmount = Math.floor(Math.random() * 600);

			itemBox.classList.add("roulette__bet-item");
			itemBox.classList.add("roulette__bet-item--green");
			itemImg.classList.add("roulette__bet-avatar");
			itemName.classList.add("roulette__bet-nickname");
			itemAmount.classList.add("roulette__bet-amount");

			itemImg.setAttribute("alt", "Player Avatar");
			itemImg.setAttribute("src", `../dist/img/avatars/avatar${i + 1}.jpg`);
			itemAmount.textContent = randomAmount.toFixed(2) + "$";

			if (i === 0) {
				itemName.textContent = "Cat";
			} else if (i === 1) {
				itemName.textContent = "Hamster";
			} else {
				itemName.textContent = "Rat";
			}

			itemBox.append(itemImg, itemName, itemAmount);
			betsGreen.append(itemBox);
		}

		sortBetsByAmount();
	}
};

// sorting bets from highest to lowest
const sortBetsByAmount = () => {
	const allBetsRed = document.querySelectorAll(".roulette__bet-item--red");
	const allBetsRedArray = Array.from(allBetsRed);

	allBetsRedArray.sort((a, b) => {
		return (
			parseFloat(b.lastElementChild.textContent) -
			parseFloat(a.lastElementChild.textContent)
		);
	});

	allBetsRedArray.forEach((item) => {
		betsRed.appendChild(item);
	});

	const allBetsBlack = document.querySelectorAll(".roulette__bet-item--black");
	const allBetsBlackArray = Array.from(allBetsBlack);

	allBetsBlackArray.sort((a, b) => {
		return (
			parseFloat(b.lastElementChild.textContent) -
			parseFloat(a.lastElementChild.textContent)
		);
	});

	allBetsBlackArray.forEach((item) => {
		betsBlack.appendChild(item);
	});

	const allBetsGreen = document.querySelectorAll(".roulette__bet-item--green");
	const allBetsGreenArray = Array.from(allBetsGreen);

	allBetsGreenArray.sort((a, b) => {
		return (
			parseFloat(b.lastElementChild.textContent) -
			parseFloat(a.lastElementChild.textContent)
		);
	});

	allBetsGreenArray.forEach((item) => {
		betsGreen.appendChild(item);
	});

	setTotal();
};

// set total value of bets of each colors
const setTotal = () => {
	const totalRed = document.querySelector(".roulette__bet-total--red");
	const totalBlack = document.querySelector(".roulette__bet-total--black");
	const totalGreen = document.querySelector(".roulette__bet-total--green");
	const betsRed = document.querySelectorAll(".roulette__bet-item--red");
	const betsBlack = document.querySelectorAll(".roulette__bet-item--black");
	const betsGreen = document.querySelectorAll(".roulette__bet-item--green");

	if (betsRed.length > 0) {
		betsRed.forEach((item) => {
			totalRedValue += parseFloat(item.lastElementChild.textContent);
		});
		totalRed.lastElementChild.textContent = totalRedValue.toFixed(2) + "$";
	} else {
		totalRed.lastElementChild.textContent = "00.00$";
	}

	if (betsBlack.length > 0) {
		betsBlack.forEach((item) => {
			totalBlackValue += parseFloat(item.lastElementChild.textContent);
		});
		totalBlack.lastElementChild.textContent = totalBlackValue.toFixed(2) + "$";
	} else {
		totalBlack.lastElementChild.textContent = "00.00$";
	}

	if (betsGreen.length > 0) {
		betsGreen.forEach((item) => {
			totalGreenValue += parseFloat(item.lastElementChild.textContent);
		});
		totalGreen.lastElementChild.textContent = totalGreenValue.toFixed(2) + "$";
	} else {
		totalGreen.lastElementChild.textContent = "00.00$";
	}

	totalRedValue = 0;
	totalBlackValue = 0;
	totalGreenValue = 0;
};
setTotal();

setTimeout(() => {
	startRoulette();
}, timeForStart);

const addEventListeners = () => {
	inputBtn.forEach((btn) => {
		btn.addEventListener("click", useInputBtn);
	});

	betBtn.forEach((btn) => {
		btn.addEventListener("click", addBet);
	});
};

addLineAnim();
addEventListeners();

playerInterval = setInterval(() => {
	createRandomPlayers();
}, 1000);
