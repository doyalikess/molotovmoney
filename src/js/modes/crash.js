const crashBox= document.querySelector(".crash__box");
const crashTop = document.querySelector(".crash__top");
const crashBottom = document.querySelector(".crash__bottom");
const crashBg = document.querySelector(".crash__bg");
const multiplier = document.querySelector("#multi");
const startBtn = document.querySelector("#start");
const withdrawBtn = document.querySelector("#withdraw");
const amountOfWin = document.querySelector("#amount");
const nameOfItem = document.querySelector(".crash__item-name");
const colorOfItem = document.querySelector(".crash__item-color");
const itemsBox = document.querySelector(".profile__items-box");
const userItemsPagePrevious = document.querySelector(
	".upgrader__list-btn--left"
);
const userItemsPageNext = document.querySelector(".upgrader__list-btn--right");
const currentPageText = document.querySelector("#page-current");
const totalPageText = document.querySelector("#page-total");
const noItemsText = document.querySelector(".noitems-text");
let currentPage = 1; // current page of user items
const itemsPerPage = 14; // max items per page

let startingPrice;
let currentItem;
let nextItem;
let multiplierAmount = 1.0; // Początkowy mnożnik
let isItemChanging = false; // Guard flag to prevent multiple triggers
let crashGoing = false;
let choosedItem = false;
let didWithdraw = false;
let pickedItemId = "";

// Funkcja dodająca obrazy przedmiotów do UI
const addCreateBet = () => {
    crashTop.innerHTML = "";
    crashBottom.innerHTML = "";
    crashBox.classList.value = "";
    crashBox.classList.add("crash__box");

    const imgTop = document.createElement("img");
    const imgBottom = document.createElement("img");
    imgTop.classList.add("crash__img", "crash__img--main");
    imgBottom.classList.add("crash__img", "crash__img--next", "add-next-item");

    crashBox.classList.add(items[`id${currentItem}`].color + "-crash-box");

    colorOfItem.classList.value = "";
    nameOfItem.textContent = items[`id${currentItem}`].name;
    colorOfItem.classList.add(
        items[`id${currentItem}`].color + "-crash",
        "crash__item-color"
    );

    const currentItemPrice = items[`id${currentItem}`].price;

    // Find the next item that is more expensive
    nextItem = undefined; // Reset nextItem to avoid issues with previous values
    for (i = 0; i < countItemsAmount1; i++) {
        if (sortedItems[`id${i}`].price > currentItemPrice) {
            nextItem = sortedItems[`id${i}`].id;
            break;
        }
    }

    // Set the image for the current item
    imgTop.setAttribute("src", "." + items[`id${currentItem}`].imgDist);
    imgTop.setAttribute("alt", items[`id${currentItem}`].name);
    crashTop.append(imgTop);

    // Only set the next item image if there is a next item
    if (nextItem !== undefined) {
        imgBottom.setAttribute("src", "." + items[`id${nextItem}`].imgDist);
        imgBottom.setAttribute("alt", items[`id${nextItem}`].name);
        crashBottom.append(imgBottom);
    } else {
        // If there is no next item, ensure the crashBottom is empty
        crashBottom.innerHTML = "";
    }
};


// Funkcja ustawiająca mnożnik i sprawdzająca warunki
const setMultiplier = () => {
    multiplier.textContent = parseFloat(multiplierAmount).toFixed(2);

    const multipliedPrice = parseFloat(
        (startingPrice * multiplierAmount).toFixed(2)
    );

    if (!didWithdraw) {
        // Only attempt to change items if there is a next item
        if (nextItem !== undefined && multipliedPrice > items[`id${nextItem}`].price && !isItemChanging) {
            isItemChanging = true; // Set flag to prevent multiple triggers
            currentItem = nextItem; // Update the current item to the next one
            currentPrice = items[`id${currentItem}`].price; // Update the current price to the new item

            const imgTop = document.querySelector(".crash__img--main");
            const imgNext = document.querySelector(".crash__img--next");

            imgNext.classList.remove("add-next-item");
            imgTop.classList.add("hide-main-item");
            imgNext.classList.add("show-next-item");

            setTimeout(() => {
                addCreateBet();
                isItemChanging = false; // Reset flag after UI update
            }, 250);
        }
    }
};


const startCrash = () => {
	amountOfWin.textContent = (startingPrice * multiplierAmount).toFixed(2);
	crashGoing = true;
	multiplierAmount = 1.0; // Reset multiplier to initial value
	addCreateBet();

	let intervalTime = 200; // Start interval time (200ms for slower start)
	const maxSpeed = 50; // Minimum interval (maximum speed)

	// Funkcja generująca losowy mnożnik crasha
	const generateRandomCrashMultiplier = () => {
		const lambda = 0.8; // Zmieniony parametr, niższe wartości dla rzadszych wyższych wyników
		let randomMultiplier = Math.pow(Math.random(), -1 / lambda);
		return Math.max(1.01, randomMultiplier);
	};

	// Generujemy losowy mnożnik crasha przy rozpoczęciu
	const crashAtMultiplier = generateRandomCrashMultiplier();

	const increaseMultiplier = () => {
		multiplierAmount += 0.01; // Increase multiplier
		amountOfWin.textContent = (startingPrice * multiplierAmount).toFixed(2);
		setMultiplier();

		if (multiplierAmount >= crashAtMultiplier) {
			// Crash następuje, gdy osiągniemy losowy mnożnik
			clearInterval(crashInterval);
			endGame();
		} else {
			// Clear the old interval and start a new, slightly faster one
			clearInterval(crashInterval);

			// Reduce interval more gently and not too quickly, ensuring smooth acceleration
			intervalTime = Math.max(maxSpeed, 200 / Math.sqrt(multiplierAmount));

			crashInterval = setInterval(increaseMultiplier, intervalTime);
		}
	};

	// Start the first interval
	let crashInterval = setInterval(increaseMultiplier, intervalTime);
};

const endGame = () => {
	crashBg.classList.remove("hidden");
	withdrawBtn.classList.add("hidden");
	startBtn.classList.remove("hidden");
	colorOfItem.classList.value = "";
	nameOfItem.textContent = "";
	crashBg.textContent =
		"Crashed at: " + parseFloat(multiplierAmount).toFixed(2) + "x";
	crashGoing = false;
	choosedItem = false;
};

const resetCrash = () => {
	crashBg.classList.add("hidden");
	withdrawBtn.classList.add("hidden");
	startBtn.classList.remove("hidden");
	didWithdraw = false;
};

function addPlayerBet() {
	withdrawBtn.classList.remove("hidden");
	startBtn.classList.add("hidden");
	currentItem = items[`id${pickedItemId}`].id;
	startingPrice = items[`id${currentItem}`].price;

	const newItemAmount = localStorage.getItem(`id${pickedItemId}`) - 1;
	localStorage.setItem(`id${pickedItemId}`, parseInt(newItemAmount));

	pickedItemId = "";
	itemsBox.innerHTML = "";
	addAllUserItems();
	setItemsOrder();
	renderItems();
}

const withdrawFromCrash = () => {
    didWithdraw = true;
    withdrawBtn.classList.add("hidden");

    if (crashBottom.firstElementChild) {
        crashBottom.firstElementChild.remove(); // Remove only if exists
    }

    if (
        localStorage.getItem(`id${currentItem}`) === null ||
        isNaN(localStorage.getItem(`id${currentItem}`))
    ) {
        localStorage.setItem(`id${currentItem}`, 1);
    } else {
        const itemToAdd = parseInt(localStorage.getItem(`id${currentItem}`)) + 1;
        localStorage.setItem(`id${currentItem}`, itemToAdd);
    }

    const moneyToAdd =
        startingPrice * multiplierAmount -
        items[`id${currentItem}`].price +
        parseFloat(localStorage.getItem("Balance"));
    localStorage.setItem("Balance", parseFloat(moneyToAdd).toFixed(2) + "$");

    const crashToAdd = parseInt(localStorage.getItem("crashWon")) + 1;
    localStorage.setItem("crashWon", crashToAdd);

    itemsBox.innerHTML = "";
    addAllUserItems();
    setItemsOrder();
    renderItems();
    setBalance();
};


const addAllUserItems = () => {
	// function that adds all player items
	for (i = 0; i < countItemsAmount1; i++) {
		// looping this for every item in data base
		const itemCount = parseInt(localStorage.getItem(`id${i}`)) || 0; // if player have that item save its value (amount of items)
		for (j = 0; j < itemCount; j++) {
			// create items based on how many player does have
			const itemBox = document.createElement("div"); // item elements
			const itemImg = document.createElement("img");
			const itemName = document.createElement("p");
			const itemSkin = document.createElement("p");
			const itemPrice = document.createElement("p");

			itemBox.classList.add("profile__item", "can-hover"); // item classes
			itemBox.classList.add(items[`id${i}`].color + "-drop2");
			itemImg.classList.add("profile__item-img");
			itemName.classList.add("profile__item-name");
			itemSkin.classList.add("profile__item-skin");
			itemSkin.classList.add(items[`id${i}`].color + "-text");
			itemPrice.classList.add("profile__item-price");

			itemBox.id = items[`id${i}`].id; // item attributes, textContents
			itemImg.setAttribute("src", "." + items[`id${i}`].imgDist);
			itemImg.setAttribute("alt", items[`id${i}`].name);
			itemName.textContent = items[`id${i}`].weapon;
			itemSkin.textContent = items[`id${i}`].skin;
			itemPrice.textContent = items[`id${i}`].price + "$";

			itemBox.append(itemImg, itemName, itemSkin, itemPrice); // append everything to item
			itemsBox.append(itemBox); // apeend item to items container
		}
	}

	const allItemsOfPlayer = document.querySelectorAll(".profile__item");
	allItemsOfPlayer.forEach((item) => {
		item.addEventListener("click", chooseItem);
	});
};

function chooseItem() {
	if (choosedItem === false) {
		this.classList.toggle("active-item-jackpot");
		choosedItem = true;
		pickedItemId = this.id;
	} else if (
		choosedItem === true &&
		this.classList.contains("active-item-jackpot")
	) {
		this.classList.toggle("active-item-jackpot");
		choosedItem = false;
		pickedItemId = "";
	}
}

const renderItems = () => {
	// set items on pages
	const allItemsOfUser = document.querySelectorAll(".profile__item"); // get all items of user
	const allItemsOfUserArray = Array.from(allItemsOfUser); // make array from all items

	const userStartIndex = (currentPage - 1) * itemsPerPage; // get index of array to start from based on current page
	const userEndIndex = userStartIndex + itemsPerPage; // get end index of array

	allItemsOfUserArray.forEach((item) => (item.style.display = "none")); // hide all items

	allItemsOfUserArray.slice(userStartIndex, userEndIndex).forEach((item) => {
		// for items from range of current page, make them visible
		item.style.display = "flex";
	});

	const allUserItemsPages = Math.ceil(
		allItemsOfUserArray.length / itemsPerPage
	); // get total amount of pages

	currentPageText.textContent = currentPage;
	totalPageText.textContent = allUserItemsPages;

	if (allUserItemsPages < 1) {
		currentPageText.textContent = 0;
		currentPageText.parentElement.classList.add("hidden");
		noItemsText.classList.remove("hidden");
	} else {
		currentPageText.parentElement.classList.remove("hidden");
		noItemsText.classList.add("hidden");
	}

	if (currentPage === 1) {
		userItemsPagePrevious.style.display = "none"; // if current page is page one hide previous page button
	} else {
		userItemsPagePrevious.style.display = "block"; // if its not page one show it
	}

	if (currentPage === allUserItemsPages) {
		userItemsPageNext.style.display = "none"; // if current page is last page hide next page button
	} else if (allItemsOfUserArray.length > 0) {
		userItemsPageNext.style.display = "block"; // if we have at least one page show next page button
	}
};

const changePage = (direction) => {
	// function to change page
	const allItemsOfUserCount =
		document.querySelectorAll(".profile__item").length; // get amount of user items
	const totalUserPages = Math.ceil(allItemsOfUserCount / itemsPerPage); // get total pages

	if (direction === -1 && currentPage > 1) {
		// change page based on button clicked
		currentPage--;
	} else if (direction === 1 && currentPage < totalUserPages) {
		currentPage++;
	}

	renderItems();
};

const setItemsOrder = () => {
	// function to set items order
	const userItems = document.querySelectorAll(".profile__item"); // take all player items
	const userItemsArray = Array.from(userItems); // do array from it

	userItemsArray.sort((a, b) => {
		// sort items from cheapest to most expensive
		return (
			parseFloat(a.children[3].textContent) -
			parseFloat(b.children[3].textContent)
		);
	});

	userItemsArray.forEach((item) => {
		// append sorted items
		itemsBox.appendChild(item);
	});
};

// Dodanie nasłuchiwaczy zdarzeń
const addListeners = () => {
	startBtn.addEventListener("click", () => {
		if (crashGoing === false && pickedItemId !== "") {
			resetCrash();
			addPlayerBet();
			startCrash();
		}
	});

	const allItemsOfPlayer = document.querySelectorAll(".profile__item");

	allItemsOfPlayer.forEach((item) => {
		item.addEventListener("click", chooseItem);
	});

	withdrawBtn.addEventListener("click", withdrawFromCrash);
};

addAllUserItems();
setItemsOrder();
renderItems();
addListeners();
