

const $input = $("[data-id=search-video]");
const $searchForm = $("#search-form");
const $slider = $(".slider");
const slickTrack = $(".slick-slide");

$searchForm.on("submit", (event) => {
	event.preventDefault();
	const text = $input.val().replace(/\s/g, "+");
	getVideos(text);
});

function createContent(data) {
	$("video").remove(); // Чистим список видео после каждого запроса

	for (let url of data.results) {
		let video = document.createElement("video");
		video.src = url.previewUrl;
		video.setAttribute("controls", "controls");
		$slider.slick("slickAdd", video);
	}

	$(".slick-arrow").on("click", (event) => {
		console.log(event);
	});

	$slider.on("beforeChange", function () {
		$("video").each(function () {
			$(this).get(0).pause();
		});
	});
}

// Запрос на сервер
const getVideos = (nameVideo) => {
	// fetch(
	// 	`http://itunes.apple.com/search?limit=5&entity=musicVideo&term=${nameVideo}`
	// )
	// 	.then((data) => data.json())
	// 	.then((data) => createContent(data))
	// 	.catch((error) => console.log(error));
	$.get("http://itunes.apple.com/search", { limit: 5, entity: "musicVideo", term: nameVideo })
		.then((response) => $.parseJSON(response)) // Пришлось в обьект перегнать
		.then((response) => createContent(response))
		.fail((error) => console.log("error", error));
};

// Slider Slick
$(document).ready(function () {
	$slider.slick({
		arrows: true,
		speed: 500,
		fade: true,
		adaptiveHeight: true,
	});
});
