console.log("Welcome In Index.js");
// const apikey = "AIzaSyB_b8Br7u1mI3f3o_w7UIOAxUGGJIGx9-c";
const apikey = "AIzaSyAmhlT7sV-OBZvRBG8xjUGskT3esj0mc3k";

// !------------------Default Data-------------------
const defaultData = async () => {
	try {
		const response = await fetch(
			`https://youtube.googleapis.com/youtube/v3/videos?chart=mostPopular&part=snippet&maxResults=20&key=${apikey}&regionCode=IN`,
		);
		const data = await response.json();
		// console.log("data: ", data.items);
		appendData(data.items);
		// localStorage.setItem("defaultVideo", JSON.stringify(data.items));
		// localStorage.setItem("vedioData", JSON.stringify(data.items));

		console.log("Default Data");
	} catch (err) {
		console.log("err: ", err);
	}
};
defaultData();

//!------------------------ Search data ----------------------------
const searchData = (order) => {
	console.log("fetching the data");
	const fetchData = async () => {
		try {
			let searchVal = search.value;
			let response;
			if (order) {
				response = await fetch(
					`https://youtube.googleapis.com/youtube/v3/search?part=snippet&order=${order}&q=${searchVal}&key=${apikey}`,
					console.log(`according to ${order}`),
				);
			} else {
				response = await fetch(
					`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${searchVal}&key=${apikey}`,
				);
			}
			let data = await response.json();
			console.log("data: ", data.items);
			appendData(data.items);
			// localStorage.setItem("vedioData", JSON.stringify(data.items));
			console.log(await "fetched data");
		} catch (err) {
			console.log("err: ", err);
		}
	};
	fetchData();
};

const search = document.querySelector("#searchInput");
const searchicon = document.querySelector(".search-icon");
searchicon.addEventListener("click", searchData);
search.onkeypress = (event) => {
	if (event.key == "Enter") {
		searchData();
	}
};

// !---------------------ContentDetails--------------------
// TODO request to server with part ==> Statistic,contentDetails,snippet,id for specific vedio
let videoData = [];
const contentDetails = async (vedioId) => {
	try {
		const response = await fetch(
			`https://www.googleapis.com/youtube/v3/videos?id=${vedioId}&key=${apikey}&part=snippet,statistics,contentDetails&fields=items(id,snippet,statistics,contentDetails)`,
		);
		const data = await response.json();
		videoData.push(data.items[0]);
		localStorage.setItem(
			"videoDataForNextPage",
			JSON.stringify(videoData),
		);
		return data.items[0];
	} catch (err) {
		console.log("err: ", err);
	}
};

// !---------------------ChannelImages--------------------

const channelImage = async (channelId) => {
	try {
		const response = await fetch(
			`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${apikey}`,
		);
		const data = await response.json();
		// console.log("data: ", data.items[0]);
		return data.items[0];
	} catch (err) {
		console.log("err: ", err);
	}
};
// contentDetails("04r0cuysOhI");

// !================Appending the Data into DOM===================
const appendData = (data) => {
	document.querySelector("#content-container").innerHTML = "";
	data.forEach(async ({ snippet, id: videoId }, i) => {
		// console.log("videoId: ", videoId);
		// console.log("videoId: ", videoId.videoId);

		// ?Retriving the all the required data for the video
		const details = await contentDetails(videoId.videoId || videoId);
		console.log("details: ", details);

		// ?Retriving the thumbnail of the channel
		const channelId = details.snippet.channelId;
		const channelImgFunc = await channelImage(channelId);
		// console.log("channelImgFunc: ", channelImgFunc);

		// ? All the Required data for the video
		const channelImg = await channelImgFunc.snippet.thumbnails.high.url;
		const thumbnail = await details.snippet.thumbnails.high.url;
		let viewCount = await details.statistics.viewCount;
		let duration = await details.contentDetails.duration;
		let likeCount = await details.statistics.likeCount;

		// console.log({ channelImg, thumbnail, viewCount, duration,likeCount });

		//? ViewCount Fixing
		if (viewCount.length >= 7) {
			if (viewCount.length == 7) {
				viewCount = `${viewCount[0]}.${viewCount[1]}M`;
			} else {
				viewCount = `${viewCount.slice(0, viewCount.length - 6)}M`;
			}
		} else {
			if (viewCount.length >= 4) {
				viewCount = `${viewCount.slice(0, viewCount.length - 3)}K`;
			}
		}

		//? Duration Fixing
		let cduration = duration;
		let time = "";
		cduration = cduration.slice(2);
		if (cduration.length >= 4) {
			for (let i = 0; i < cduration.length; i++) {
				if (cduration[i] === "H" || cduration[i] === "M") {
					time += ":";
				} else if (cduration[i] === "S") {
					break;
				} else {
					time += cduration[i];
				}
			}
		} else {
			time = `00:${cduration.slice(0, cduration.length - 1)}`;
		}
		console.log(time);

		//?Appending Into the DOM
		let { channelTitle, title } = snippet;
		let showTemplate = `<div class="vedio-container" onclick="vedioDetail('${details.id}')">
							<div class="vedio-thumbnail">
								<img src="${thumbnail}" alt="oops" id="thumbnail-img"/>
								<div class="vedio-duration">${time}</div>
							</div>
							<div class="details">
								<div class="channel-img">
									<img src="${channelImg}" alt=""/>
								</div>
								<div class="detail-text">
									<h3>${title}</h3>
									<div class="channel-name">${channelTitle}</div>
									<div class="views">${viewCount} views</div>
								</div>
							</div>
						</div>`;
		document.querySelector("#content-container").innerHTML +=
			showTemplate;
	});
};

//!------------------ Sending Vedio detail tto LS for the vedio .html pge-0-----------
const vedioDetail = (id) => {
	console.log("id: ", id);
	let dataFromLS = JSON.parse(localStorage.getItem("videoDataForNextPage"));
	let temp = dataFromLS.find((el) => {
		return el.id === id || el.id.videoId === id;
	});
	localStorage.setItem("vedio", JSON.stringify(temp));
	window.location.href = "video.html";
};

const redirectToSignUp = () => {
	window.location.href = "signUp.html";
};
const signUp = document.querySelector(".user-logo");
signUp.addEventListener("click", redirectToSignUp);

// TODO Sorting according to the given parameters
//! class sort
class Sort {
	constructor() {}

	// methode sort according to view
	sortAccView() {
		console.log("sort view");
		searchData("viewCount");
	}

	// methode sort according to alphabetical order
	sortAccAlpha() {
		console.log("sort alpha");
		searchData("title");
	}

	// methode sort according to pupularity order
	sortAccPopu() {
		console.log("sort popularity");
		searchData("rating");
	}
}
const sort = new Sort();
const accView = document.querySelector("#accView");
const accAlpha = document.querySelector("#accAlpha");
const accPopu = document.querySelector("#accPopu");

accView.addEventListener("click", sort.sortAccView);
accAlpha.addEventListener("click", sort.sortAccAlpha);
accPopu.addEventListener("click", sort.sortAccPopu);

// TODO SHow the user name on the top right:

let profileData = JSON.parse(localStorage.getItem("userProfile"));
console.log("profileData: ", profileData);
if (!profileData.name) {
	document.querySelector(".user-logo img").style.width = "37px";
	document.querySelector(".user-logo img").style.height = "37px";
	document.querySelector(".nav-right").style.width = "11%";
	document.querySelector(".bell-icon span").style.marginLeft = "0";
	document.querySelector(".username").style.display = "none";
} else {
	let userName = profileData.name;
	console.log("userName: ", userName);
	document.querySelector(".nav-right").style.width = "13%";
	document.querySelector(".bell-icon span").style.marginLeft = "10px";
	document.querySelector(".user-logo").classList.add("toggle-logo-size");
	document.querySelector(".username").style.display = "block";
	document.querySelector(".username").innerHTML = userName;
}
