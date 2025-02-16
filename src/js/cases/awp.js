const items2 = {
	item0: {
		weapon: "AWP",
		name: "AWP Gungnir",
		skin: "Gungnir",
		color: "red",
		imgDist: "../dist/img/weapons/rifles/awp/gungnir.jpg",
		price: 11709.26,
		id: 27,
		dropPercent: 0.1,
	},
	item1: {
		weapon: "AWP",
		name: "AWP Dragon Lore",
		skin: "Dragon Lore",
		color: "red",
		imgDist: "../dist/img/weapons/rifles/awp/dragon-lore.jpg",
		price: 11025.82,
		id: 28,
		dropPercent: 0.1,
	},
	item2: {
		weapon: "AWP",
		name: "AWP Medusa",
		skin: "Medusa",
		color: "red",
		imgDist: "../dist/img/weapons/rifles/awp/medusa.jpg",
		price: 4328.88,
		id: 29,
		dropPercent: 0.5,
	},
	item3: {
		weapon: "AWP",
		name: "AWP The Prince",
		skin: "The Prince",
		color: "red",
		imgDist: "../dist/img/weapons/rifles/awp/the-prince.jpg",
		price: 3207.63,
		id: 30,
		dropPercent: 0.7,
	},
	item4: {
		weapon: "AWP",
		name: "AWP Desert Hydra",
		skin: "Desert Hydra",
		color: "red",
		imgDist: "../dist/img/weapons/rifles/awp/desert-hydra.jpg",
		price: 2327.58,
		id: 26,
		dropPercent: 1,
	},
	item5: {
		weapon: "AWP",
		name: "AWP Fade",
		skin: "Fade",
		color: "red",
		imgDist: "../dist/img/weapons/rifles/awp/fade.jpg",
		price: 922.32,
		id: 81,
		dropPercent: 2,
	},
	item6: {
		weapon: "AWP",
		name: "AWP Lightning Strike",
		skin: "Lightning Strike",
		color: "red",
		imgDist: "../dist/img/weapons/rifles/awp/lightning-strike.jpg",
		price: 495.95,
		id: 82,
		dropPercent: 3,
	},
	item7: {
		weapon: "AWP",
		name: "AWP Oni Taiji",
		skin: "Oni Taiji",
		color: "red",
		imgDist: "../dist/img/weapons/rifles/awp/oni-taiji.jpg",
		price: 403.88,
		id: 83,
		dropPercent: 3,
	},
	item8: {
		weapon: "AWP",
		name: "AWP Containment Breach",
		skin: "Containment Breach",
		color: "red",
		imgDist: "../dist/img/weapons/rifles/awp/containment-breach.jpg",
		price: 298.01,
		id: 84,
		dropPercent: 3,
	},
	item9: {
		weapon: "AWP",
		name: "AWP BOOM",
		skin: "BOOM",
		color: "pink",
		imgDist: "../dist/img/weapons/rifles/awp/boom.jpg",
		price: 278.02,
		id: 85,
		dropPercent: 4,
	},
	item10: {
		weapon: "AWP",
		name: "AWP Asiimov",
		skin: "Asiimov",
		color: "red",
		imgDist: "../dist/img/weapons/rifles/awp/asiimov.jpg",
		price: 121.47,
		id: 86,
		dropPercent: 10,
	},
	item11: {
		weapon: "AWP",
		name: "AWP Sun in Leo",
		skin: "Sun in Leo",
		color: "light-blue",
		imgDist: "../dist/img/weapons/rifles/awp/sun-in-leo.jpg",
		price: 31.71,
		id: 66,
		dropPercent: 15,
	},
	item12: {
		weapon: "AWP",
		name: "AWP Neo-Noir",
		skin: "Neo-Noir",
		color: "red",
		imgDist: "../dist/img/weapons/rifles/awp/neo-noir.jpg",
		price: 28.92,
		id: 14,
		dropPercent: 20,
	},
	item13: {
		weapon: "AWP",
		name: "AWP Atheris",
		skin: "Atheris",
		color: "purple",
		imgDist: "../dist/img/weapons/rifles/awp/atheris.jpg",
		price: 10.9,
		id: 87,
		dropPercent: 25,
	},
	item14: {
		weapon: "AWP",
		name: "AWP Safari Mesh",
		skin: "Safari Mesh",
		color: "light-blue",
		imgDist: "../dist/img/weapons/rifles/awp/safari-mesh.jpg",
		price: 2.09,
		id: 5,
		dropPercent: 12.6,
	},
};

const spinBtn = document.querySelector(".spin");
const caseItemsBox = document.querySelectorAll(".case__items");
const countItemsAmount = Object.keys(items2).length;
const winPupup = document.querySelector(".win-popup");
const sellBtn = document.querySelector(".win-popup__btn--sell");
const takeBtn = document.querySelector(".win-popup__btn--take");
const winningItemImg = document.querySelector(".win-popup__img");
const winningItemName = document.querySelector(".win-popup__item-name");
const winningItemPrice = document.querySelector(".win-popup__item-price");
const winningItemBox = document.querySelector(".win-popup__container");
const balanceAmount = document.querySelector(".user__balance--amount");
const balanceAmountMobile = document.querySelector(
	".user-mobile__balance--amount"
);
const caseAmountBtns = document.querySelectorAll(".case__button-amount");
const backBtn = document.querySelector(".case__btn--back");
const muteBtn = document.querySelector(".case__btn--mute");
const allCases = document.querySelector(".case__allcases");
const casePrice = 200.0; // price of case
let currentWinningItem; // current item that won
let casesAmount = 1; // how many cases user will open
let winningItems = []; // all winning items of current spin

const casesOpenedText = document.querySelector("#casesopened");
const battlesCreatedText = document.querySelector("#battlescreated");
const upgradesText = document.querySelector("#upgrades");
const jackpotsWonText = document.querySelector("#jackpotswon");

const firebaseConfig = {
	apiKey: "AIzaSyD3gW_LmVUQcbT2oFKyvpIb2V0q4V7kfRA",
	authDomain: "ezskins-bcb15.firebaseapp.com",
	projectId: "ezskins-bcb15",
	databaseURL:
		"https://ezskins-bcb15-default-rtdb.europe-west1.firebasedatabase.app",
	storageBucket: "ezskins-bcb15.appspot.com",
	messagingSenderId: "523489662504",
	appId: "1:523489662504:web:6c32e739858d90f66e871d",
};

const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const casesRef = database.ref("caseopened");
const battlesRef = database.ref("battlecreated");
const upgraderRef = database.ref("upgrades");
const jackpotRef = database.ref("jackpotwon");

casesRef.on("value", (snapshot) => {
	const casesData = snapshot.val();

	casesOpenedText.textContent = casesData;
});

battlesRef.on("value", (snapshot) => {
	const battlesData = snapshot.val();

	battlesCreatedText.textContent = battlesData;
});

upgraderRef.on("value", (snapshot) => {
	const upgradesData = snapshot.val();

	upgradesText.textContent = upgradesData;
});

jackpotRef.on("value", (snapshot) => {
	const jackpotData = snapshot.val();

	jackpotsWonText.textContent = jackpotData;
});

function incrementCases() {
	casesRef.once("value", (snapshot) => {
		const currentValue = snapshot.val();

		// Increment the current value
		const newValue = currentValue + casesAmount;

		// Update the new value back to the database
		casesRef.set(newValue).catch((error) => {
			console.error("Error updating value:", error);
		});
	});
}

const createInfoAboutItemsInChest = () => {
	// function to create info about all items in case
	const dropBox = document.querySelector(".case__drop-box"); // container for info about all items in case

	for (i = 0; i < countItemsAmount; i++) {
		// create all items
		const dropItem = document.createElement("div"); // item elements
		const dropItemPercent = document.createElement("p");
		const dropItemImg = document.createElement("img");
		const dropItemTextBox = document.createElement("div");
		const dropItemTextBoxLeft = document.createElement("div");
		const dropItemName = document.createElement("p");
		const dropItemSkin = document.createElement("p");
		const dropItemPrice = document.createElement("p");

		dropItem.classList.add("case__drop"); // set their classes
		dropItem.classList.add(items2[`item${i}`].color + "-drop2");
		dropItem.style.order = "-" + items2[`item${i}`].price.toFixed(0);
		dropItemPercent.classList.add("case__drop-percent");
		dropItemImg.classList.add("case__drop-img");
		dropItemTextBox.classList.add("case__drop-textbox");
		dropItemTextBoxLeft.classList.add("case__drop-textbox-left");
		dropItemName.classList.add("case__drop-item");
		dropItemSkin.classList.add("case__drop-skin");
		dropItemSkin.classList.add(items2[`item${i}`].color + "-text");
		dropItemPrice.classList.add("case__drop-price");

		dropItemImg.setAttribute("src", items2[`item${i}`].imgDist); // set attributes
		dropItemImg.setAttribute("alt", items2[`item${i}`].name);

		dropItemPercent.textContent = items2[`item${i}`].dropPercent + "%"; // set textcontent
		dropItemName.textContent = items2[`item${i}`].weapon;
		dropItemSkin.textContent = items2[`item${i}`].skin;
		dropItemPrice.textContent = items2[`item${i}`].price + "$";

		dropItemTextBoxLeft.append(dropItemName, dropItemSkin); // append them in correct order
		dropItemTextBox.append(dropItemTextBoxLeft, dropItemPrice);
		dropItem.append(dropItemPercent, dropItemImg, dropItemTextBox);
		dropBox.append(dropItem); // append item to container
	}
};

const createItemsInChest = () => {
	// function to create random items in case
	const caseItemsBox = document.querySelectorAll(".case__items"); // get every case

	caseItemsBox.forEach((box) => {
		// for each case, add items to it
		for (i = 0; i < 100; i++) {
			const randomNumber = Math.floor(Math.random() * 10000); // get random number
			let randomItem; // variable to store item number

			// based on random number set random item id
			if (randomNumber <= 9) {
				randomItem = 0;
			} else if (randomNumber <= 19) {
				randomItem = 1;
			} else if (randomNumber <= 69) {
				randomItem = 2;
			} else if (randomNumber <= 139) {
				randomItem = 3;
			} else if (randomNumber <= 239) {
				randomItem = 4;
			} else if (randomNumber <= 439) {
				randomItem = 5;
			} else if (randomNumber <= 739) {
				randomItem = 6;
			} else if (randomNumber <= 1039) {
				randomItem = 7;
			} else if (randomNumber <= 1339) {
				randomItem = 8;
			} else if (randomNumber <= 1739) {
				randomItem = 9;
			} else if (randomNumber <= 2739) {
				randomItem = 10;
			} else if (randomNumber <= 4239) {
				randomItem = 11;
			} else if (randomNumber <= 6239) {
				randomItem = 12;
			} else if (randomNumber <= 8739) {
				randomItem = 13;
			} else {
				randomItem = 14;
			}

			const item = document.createElement("div"); // item elements
			const itemImg = document.createElement("img");
			const itemItemName = document.createElement("p");
			const itemSkinName = document.createElement("p");

			item.classList.add("case__item", `case__item${box.id}`); // item classes
			item.classList.add(items2[`item${randomItem}`].color + "-drop");
			item.style.border = "none";
			item.id = `item${randomItem}`;
			itemImg.classList.add("case__img");
			itemItemName.classList.add("case__item-name");
			itemSkinName.classList.add("case__skin-name");
			itemSkinName.classList.add(items2[`item${randomItem}`].color + "-text");

			itemImg.setAttribute("src", items2[`item${randomItem}`].imgDist); // item attributes and text content
			itemImg.setAttribute("alt", items2[`item${randomItem}`].name);
			itemItemName.textContent = items2[`item${randomItem}`].weapon;
			itemSkinName.textContent = items2[`item${randomItem}`].skin;

			item.append(itemImg, itemItemName, itemSkinName); // append item elements in order
			box.append(item); // append item to case
		}
	});
};

const setBtnText = () => {
	// function to set button text content
	if (
		parseFloat(localStorage.getItem("Balance").slice(0, -1)) >=
		casePrice * casesAmount
	) {
		spinBtn.textContent = `open ${casePrice * casesAmount}.00$`; // if user have enought balance set button to show how much it cost
	} else {
		spinBtn.textContent = "add balance"; // if not set it to "add balance"
	}
};

const spinCase = () => {
	// function for spinning case
	const caseItemsBox = document.querySelectorAll(".case__items"); // get all case boxes

	if (
		// if balance of player is higher than case cost and case is not spinning then continue
		parseFloat(localStorage.getItem("Balance").slice(0, -1)) >=
			casePrice * casesAmount &&
		spinBtn.textContent !== "spining"
	) {
		const caseOpeningSound = new Audio("../dist/audio/open.mp3"); // set open audio

		if (muteBtn.classList.contains("not-muted")) {
			// if sounds is not muted then play audio
			caseOpeningSound.play();
		}

		caseItemsBox.forEach((box) => {
			// for each case box

			const howStrongSpin = Math.floor(Math.random() * 5000 - 10000); // get random movement between -5000 to -1000 px;

			spinBtn.textContent = "spining"; // set button textContent to spinning

			const casesOpenedToAdd =
				parseInt(localStorage.getItem("casesOpened")) + 1;
			localStorage.setItem("casesOpened", casesOpenedToAdd); // amount of cases to added to stats on profile

			const balanceAfterOpening = (
				parseFloat(localStorage.getItem("Balance").slice(0, -1)) - casePrice
			).toFixed(2); // get balance after opening case

			localStorage.setItem("Balance", balanceAfterOpening + "$"); // set balance after opening case to localStorage
			setBalance(); // function from balance.js file (refreshing balance amount in text)

			box.style.left = howStrongSpin + "px"; // set how strong spin is
			box.style.transition = "left 5s cubic-bezier(0,1,0.5,1)"; // set its animation

			// after animation end, find winning item
			setTimeout(() => {
				function getWinningItem() {
					// get position of middle point
					const redLineX =
						box.parentElement.children[0].getBoundingClientRect().x;

					const items = box.querySelectorAll(".case__item"); // get all items of current case box
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

				// get wiining item and set it in win popup
				const winningItem = getWinningItem();
				if (winningItem) {
					winningItems.push(winningItem); // push items to winning items array
					winningItemBox.classList.value = "";
					winningItemBox.classList.add(
						"win-popup__container",
						`${items2[`${winningItem.id}`].color + "-win"}`
					);
					winningItemImg.setAttribute(
						"src",
						items2[`${winningItem.id}`].imgDist
					);
					winningItemImg.setAttribute("alt", items2[`${winningItem.id}`].name);
					winningItemName.textContent = items2[`${winningItem.id}`].name;
					winningItemPrice.textContent =
						items2[`${winningItem.id}`].price + "$";

					createDropFromCases(winningItem);
					hideWinPopup();
				}
			}, 5000); // start after end of anim (5s)
		});
	} else if (spinBtn.textContent !== "spining") {
		window.open("../diff/deposit.html", "_self"); // if user dont have enought balance then open deposit site
	}
};

const hideWinPopup = () => {
	if (casesAmount === 1) {
		// if user only open one case than show win popup
		winPupup.classList.toggle("hidden");
	} else {
		// if not automatically decide to take items, and not sell them
		setTimeout(() => {
			takeWinningItem();
			setBtnText();
		}, 2000); // do it after 2s after end of anim
	}
};

const sellWinningItem = () => {
	// function to sell items (works only if user open one case at once)
	const currentBalance = parseFloat(
		localStorage.getItem("Balance").slice(0, -1)
	); // get current balance
	const itemPrice = parseFloat(winningItemPrice.textContent); // get item price
	const howMuchToAddToBalance = (currentBalance + itemPrice).toFixed(2); // get how much balance player will have after selling item
	localStorage.setItem("Balance", howMuchToAddToBalance + "$"); // set new balance

	hideWinPopup();
	refreshBalance();
	resetBoxAnimation();
};

const takeWinningItem = () => {
	// funciton to add won items to inventory of user
	for (i = 0; i < winningItems.length; i++) {
		// do this for every won item
		// if user didnt had this item ever in inventory, then set it to 1
		// if player had that item then get its localStorage and add 1 to it
		if (
			localStorage.getItem("id" + items2[`${winningItems[i].id}`].id) ===
				null ||
			localStorage.getItem("id" + items2[`${winningItems[i].id}`].id) === NaN
		) {
			localStorage.setItem("id" + items2[`${winningItems[i].id}`].id, 1);
		} else {
			localStorage.setItem(
				"id" + items2[`${winningItems[i].id}`].id,
				parseInt(
					localStorage.getItem("id" + items2[`${winningItems[i].id}`].id)
				) + 1
			);
		}
	}

	if (casesAmount === 1) {
		hideWinPopup();
	}
	resetBoxAnimation();
};

const refreshBalance = () => {
	// function to refresh balance
	balanceAmount.textContent = localStorage.getItem("Balance");
	balanceAmountMobile.textContent = localStorage.getItem("Balance");
};

const resetBoxAnimation = () => {
	// function to reset case box animation
	const caseItemsBox = document.querySelectorAll(".case__items");
	caseItemsBox.forEach((box) => {
		box.innerHTML = "";
		box.style.transition = "0.01s";
		box.style.left = "0";
	});

	winningItems = [];
	setBtnText();
	createItemsInChest();
};

const goBackToMainSite = () => {
	// function to open main site
	window.open("../index.html", "_self");
};

const muteSound = () => {
	// function to mute case sound
	muteBtn.classList.toggle("not-muted"); // toggle mute

	if (localStorage.getItem("muted") == 0) {
		localStorage.setItem("muted", 1);
	} else {
		localStorage.setItem("muted", 0);
	}

	setMuteSound();
};

const setMuteSound = () => {
	if (localStorage.getItem("muted") == 0) {
		// if sound is not mutted, set correct icons
		muteBtn.lastElementChild.style.display = "none";
		muteBtn.firstElementChild.style.display = "block";
		muteBtn.classList.add("not-muted");
	} else {
		// if its muted, set correct icons
		muteBtn.lastElementChild.style.display = "block";
		muteBtn.firstElementChild.style.display = "none";
		muteBtn.classList.remove("not-muted");
	}
};

const createBoxes = () => {
	// function to create case boxes
	for (i = 0; i < casesAmount; i++) {
		// create boxes based on how many player choosed
		const caseItem = document.createElement("div");
		const casePoint = document.createElement("div");
		const caseTriangle = document.createElement("div");
		const caseTriangleBtm = document.createElement("div");
		const caseItems = document.createElement("div");

		if (
			casesAmount % 2 === 0 ||
			(casesAmount % 2 !== 0 && i < casesAmount - 1)
		) {
			caseItem.style.width = "calc(50% - 32px)";
		}

		caseItem.classList.add("case__container");
		caseItem.id = `caseBox${i}`;
		casePoint.classList.add("case__middle-point");
		caseTriangle.classList.add("case__middle-triangle");
		caseTriangleBtm.classList.add(
			"case__middle-triangle",
			"case__middle-triangle--bottom"
		);
		caseItems.classList.add("case__items");
		caseItems.classList.add("case__items" + [i]);
		caseItems.id = i;

		caseItem.append(casePoint, caseTriangle, caseTriangleBtm, caseItems);
		allCases.append(caseItem);
	}
	createItemsInChest();
};

function setCasesAmount() {
	// set cases amount to create
	if (spinBtn.textContent !== "spining") {
		// if case is not spinning
		allCases.innerHTML = ""; // clear cases

		switch (this.id) {
			case "1Case":
				casesAmount = 1; // set how many cases to create based on id of button
				break;
			case "2Case":
				casesAmount = 2;
				break;
			case "3Case":
				casesAmount = 3;
				break;
			case "4Case":
				casesAmount = 4;
				break;
			case "5Case":
				casesAmount = 5;
				break;
		}

		createBoxes();
		setBtnText();
	}
}

const addEventListeners = () => {
	spinBtn.addEventListener("click", spinCase);
	spinBtn.addEventListener("click", incrementCases);
	takeBtn.addEventListener("click", takeWinningItem);
	sellBtn.addEventListener("click", sellWinningItem);
	backBtn.addEventListener("click", goBackToMainSite);
	muteBtn.addEventListener("click", muteSound);

	caseAmountBtns.forEach((btn) => {
		btn.addEventListener("click", setCasesAmount);
	});
};

createItemsInChest();
setBtnText();
createInfoAboutItemsInChest();
addEventListeners();
setMuteSound();
