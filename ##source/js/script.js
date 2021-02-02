const $input = $("[data-id=search-video]");
const $searchForm = $("#search-form");
const $slider = $(".slider");
const slickTrack = $(".slick-slide");

function playVid(vid) {
	vid.play();
}

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
		let vidCurr = document.querySelector(".slick-current ");
		playVid(vidCurr);
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
	$.get("//itunes.apple.com/search", {
		headers: {
			Authentication: '123'
		 },
		 mode: 'cors',
		// credentials: 'include',
		limit: 5,
		entity: "musicVideo",
		term: nameVideo,
	})
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


// // let arr1 = ["Голубая", "Горбатая", "Белуга", 3, 10, 15, 3];
// // let arr2 = [[7], [8], [9], [[10]], [11], [[12]]];
// // let arr3 = Array.from(arr1[0]);
// x = 42; // создает свойство x в глобальном объекте
// var y = 43; // объявляет новую переменную, y
// myobj = {
// 	test: "lol1",
// };
// myobj.h = 4; // создает свойство h в myobj
// myobj.k = 5; // создает свойство k в myobj

// delete x; // возвращает true  (x - свойство глобального объекта и может быть удалено)
// delete y; // возвращает false (delete не влияет на имена переменных)
// delete Math.PI; // возвращает false (delete не влияет на определенные встроенные свойства)
// delete myobj.test; // возвращает true  (свойства, определенные пользователем могут быть удалены)
// console.log(x);
// // console.log(arr3);
// // Сделать in искать свойтство в обьекте
