const dataFromLS = JSON.parse(localStorage.getItem("vedio"));
// console.log(apikey)
console.log("dataFromLS: ", dataFromLS);

//! ------------------Channel Banner----------------
let ChannelBanner = async (channelId) => {
	try {
		const response = await fetch(
			`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${apikey}`,
		);
		const data = await response.json();
		// console.log("data: ", data.items[0]);
		return data.items[0];
	} catch (err) {
		console.log("err: ", err);
	}
};

// TODO Dom manupulation for likesCount, channel logo , Channel name,Subcriber count
const ShowDetailsOfChannel = async () => {
	const channelId = dataFromLS.snippet.channelId;
	const banner = await ChannelBanner(channelId);
	console.log("banner: ", banner);

	// TODO  Handling data to send in dom

	//? Taking Vlaue from Sources
	let subscriberCount = await banner.statistics.subscriberCount;
	subscriberCount = count(subscriberCount);
	const channelImageForVideo = await banner.snippet.thumbnails.high.url;
	const liked = count(dataFromLS.statistics.likeCount);
	const commentCount = count(dataFromLS.statistics.commentCount);
	const channelTitle = dataFromLS.snippet.channelTitle;

	//? Dom Manupulation
	document.querySelector("#liked").innerHTML = liked;
	document.querySelector(".channel-name").innerHTML = channelTitle;
	document.querySelector(
		".subscirber-count",
	).innerHTML = `${subscriberCount} subscribers`;
	document.querySelector(".channel-logo img").src = channelImageForVideo;
	document.querySelector(
		".comment-counter",
	).innerHTML = `${commentCount} Comments`;
};
ShowDetailsOfChannel();

//! ------------------counting Value in K,M ----------------
const count = (viewCount) => {
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
	return viewCount;
};

const vedioPlayer = ({ id, snippet, statistics }) => {
	const desc = snippet.description;
	let views = +statistics.viewCount;
	let published = snippet.publishedAt;
	published = published.slice(0, 10).split("-").reverse();
	console.log("published: ", published);

	// ? Handling published time
	let month = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];
	let publishedTime;
	for (let i = 0; i < month.length; i++) {
		if (+published[1] == i + 1) {
			publishedTime = `${published[0]} ${month[i]},${published[2]}`;
		}
	}
	console.log("publishedTime: ", publishedTime);

	// ? Handling views
	views = views.toLocaleString("en-IN");
	console.log("views: ", views);

	let showTemplate = `<iframe
                              width="100%"
                              height="440px"
                              src="https://www.youtube.com/embed/${id}?autoplay=1&mute=1"
                              title="YouTube video player"
                              frameborder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowfullscreen
                         ></iframe>
                         <div class="main-vedio-title">
                                   <h3>${desc.slice(0, 130)}...</h3>
                                   <div class ="views">
                                        ${views} views 
                                        <span>${publishedTime}</span>
                                   </div>
                                   <details>
                                        <summary>read more</summary>
                                        <p>${desc.slice(130)}</p>
                                   </details>
                         </div>`;
	document.querySelector(".vedio-player").innerHTML = showTemplate;
};

vedioPlayer(dataFromLS);

let data = JSON.parse(localStorage.getItem("videoDataForNextPage"));
const appendRecommendation = (data) => {
	document.querySelector(".recommendation").innerHTML = "";
	data.forEach(({ snippet, statistics }) => {
		let { viewCount } = statistics;
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

		let { thumbnails, title, channelTitle } = snippet;
		let showTemplate = `<div class="suggestion-container">
                                   <div class="suggestion-thumbnail">
                                        <img src="${
									thumbnails.high.url
								}" alt=""/>
                                   </div>
                                   <div class="details">
                                        <div class="detail-text">
                                             <h3>${title.slice(0, 60)}</h3>
                                             <div class="channel-name">
                                                  ${channelTitle}
                                             </div>
                                             <div class="views">${viewCount} views</div>
                                        </div>
                                   </div>
                              </div>`;
		document.querySelector(".recommendation").innerHTML += showTemplate;
	});
};
appendRecommendation(data);
