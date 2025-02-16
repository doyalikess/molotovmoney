const navItem = document.querySelectorAll(".nav__item");
const mobileNavBtn = document.querySelector(".nav__hamb");
const mobileNav = document.querySelector(".nav-mobile");
const loginPopup = document.querySelector(".login-popup");
const navMenu = document.querySelector(".nav__menu");
const navMenuBtn = document.querySelector(".nav__link--btn");

const setActiveSite = () => {
	// checks at which site we are and add style to nav
	if (document.body.id === "upgrader") {
		// check file name
		navItem.forEach((item) => {
			item.classList.remove("active-site"); // remove acitve-site
			item.firstElementChild.classList.add("hidden"); // hiding gradient background

			if (item.id.includes("upgrader")) {
				item.classList.add("active-site"); // add active-site class after checking name site
				item.firstElementChild.classList.remove("hidden"); // showing gradient background
			}
		});
	} else if (document.body.id === "battles") {
		navItem.forEach((item) => {
			item.classList.remove("active-site");
			item.firstElementChild.classList.add("hidden");

			if (item.id.includes("battles")) {
				item.classList.add("active-site");
				item.firstElementChild.classList.remove("hidden");
			}
		});
	} else if (document.body.id === "roulette") {
		navItem.forEach((item) => {
			item.classList.remove("active-site");
			item.firstElementChild.classList.add("hidden");

			if (item.id.includes("roulette")) {
				item.classList.add("active-site");
				item.firstElementChild.classList.remove("hidden");
			}
		});
	} else if (document.body.id === "crash") {
		navItem.forEach((item) => {
			item.classList.remove("active-site");
			item.firstElementChild.classList.add("hidden");

			if (item.id.includes("crash")) {
				item.classList.add("active-site");
				item.firstElementChild.classList.remove("hidden");
			}
		});
	} else {
		navItem.forEach((item) => {
			item.classList.remove("active-site");
			item.firstElementChild.classList.add("hidden");

			if (item.id.includes("cases")) {
				item.classList.add("active-site");
				item.firstElementChild.classList.remove("hidden");
			}
		});
	}
};

const addListeners = () => {
	mobileNavBtn.addEventListener("click", toggleMobileNav);
	navMenuBtn.addEventListener("click", toggleNavMenu);
};

const toggleMobileNav = () => {
	if (!mobileNav.classList.contains("hidden")) {
		// after clicking on hamburger button check if mobileNav is not hidden
		mobileNav.classList.add("hide-nav"); // add hide animation
		mobileNavBtn.classList.toggle("is-active"); // toggle button animation
		document.body.classList.toggle("body-scroll"); // toggle body scroll
		setTimeout(() => {
			// after 0.5s remove animation from nav and add display hidden to it
			mobileNav.classList.remove("hide-nav");
			mobileNav.classList.toggle("hidden");
		}, 500);
	} else {
		// if mobileNav is hidden, make sure that hide nav animation is no added and show mobileNav
		mobileNavBtn.classList.toggle("is-active");
		mobileNav.classList.toggle("hidden");
		document.body.classList.toggle("body-scroll");
		mobileNav.classList.remove("hide-nav");
	}
};

const toggleNavMenu = () => {
	if (!navMenu.classList.contains("hidden")) {
		// if menu with links is not hidden
		navMenu.classList.add("hide-nav-menu"); //  add hide animation to it
		setTimeout(() => {
			// after 0.5s hide it for good
			navMenu.classList.remove("hide-nav-menu");
			navMenu.classList.toggle("hidden");
		}, 500);
	} else {
		// if its hidden then show it and add show anim to it
		navMenu.classList.toggle("hidden");
		navMenu.classList.add("show-nav-menu");
	}
};


addListeners();
setActiveSite();
