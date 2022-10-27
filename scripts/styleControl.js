let topnav = document.querySelector(".header");
let sidenav = document.querySelector("#side-nav");
let sidenavHide = document.querySelector(".side-nav-hide");
let sidenavToggle = document.querySelectorAll(".sidemenu-menu-icon");
let after = document.querySelectorAll("#after");
let sidenavFull = document.querySelector(".sidemenu-full");
let sidenavSetting = document.querySelector(".side-nav-setting");
let sidenavFooter = document.querySelector(".side-nav-footer");
let contentContainer = document.querySelector("#main-container");
// !========================Extend========================
const sideMenuExtend = () => {
	sidenavToggle.forEach((el) => {
		el.classList.toggle("sidemenu-toggle");
	});
	after.forEach((el) => {
		el.classList.toggle("after");
	});
	overlay.style.display = "block";
	sidenavFull.style.width = "17vw";
	sidenav.style.zIndex = "1200";
	sidenav.style.background = "#202020";
	sidenav.style.width = "17vw";
	topnav.style.display = "flex";
	topnav.style.left = "0";
	sidenavHide.style.display = "block";
	sidenavSetting.style.display = "block";
	sidenavFooter.style.display = "block";
	contentContainer.style.left = "17vw";
	contentContainer.style.width = "81.5vw";
	console.log("extend");
};

// !========================Shrink========================

const sideMenuShrink = () => {
	sidenavToggle.forEach((el) => {
		el.classList.toggle("sidemenu-toggle");
	});
	after.forEach((el) => {
		el.classList.toggle("after");
	});
	overlay.style.display = "none";
	sidenavFull.style.width = "100%";
	sidenav.style.zIndex = "600";
	sidenav.style.background = "#202020";
	sidenav.style.width = "5%";
	topnav.style.display = "none";
	topnav.style.left = "-100%";
	sidenavHide.style.display = "none";
	sidenavSetting.style.display = "none";
	sidenavFooter.style.display = "none";
	contentContainer.style.left = "5%";
	contentContainer.style.width = "95%";
	console.log("shrink");
};

const menunav = document.querySelector(".hamberger");
menunav.addEventListener("click", sideMenuExtend);
const sideMenuNav = document.querySelector(".header .hamberger");
sideMenuNav.addEventListener("click", sideMenuShrink);
const overlay = document.querySelector(".overlay");
overlay.addEventListener("click", sideMenuShrink);
