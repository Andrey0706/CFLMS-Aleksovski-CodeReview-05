
var movies = JSON.parse(movies);
console.log(movies);

$(document).ready(function(){

let currentMovie = "";
for(let i=0; i<movies.length; i++){
	currentMovie = movieNodeTemplate(movies[i].img, movies[i].title, movies[i].description, i, 0);
	theBiggest = 0;
	$("#main").append(currentMovie);
}

//increment number of likes
	$(".thumbsUp").on("click", increment)

//sort by likes
	$("#sortByLikes").on("click", function(){

//find the total num of movies because of the remove not liked function
		let numOfMovies = (document.getElementsByClassName("wrapper")).length;
		console.log(numOfMovies);

		let TheArray = [];
		let likesArray = document.getElementsByClassName("likeCounter");
		for(let i=0; i<likesArray.length;i++){
			TheArray.push(parseInt(likesArray[i].innerHTML));
		}

		console.log(TheArray);

//make an array of the indexes of the most like ascending
	let toOrder = [];
		for(let i=0; i<TheArray.length;i++){
			let indexOfTheBiggest=0;
			let theBiggest=TheArray[0];

			for(let j=0; j<TheArray.length; j++){
				if(TheArray[j]>theBiggest){
					theBiggest = TheArray[j]
					indexOfTheBiggest = j;
				}
		}
		TheArray[indexOfTheBiggest] = -1;
		toOrder.push(indexOfTheBiggest);
	}

//order with flex order
		let decresing = -5;
		for(let i=0; i<toOrder.length;i++){
			$(`#wrapper${toOrder[i]}`).css("order", `${decresing}`);
			decresing++;
		}
	});

	$("#RemoveUnliked").on("click", function(){
		for(let i=0; i<movies.length;i++){
			let nOfl = $(`#like${i}`).html();
			if(nOfl==0){
				$(`#wrapper${i}`).remove();
			}
		}
	});

	function increment(){
		var theId = (this).getAttribute("id");
		var nOfLikes = parseInt($(`#like${theId}`).html());
		nOfLikes++;
		$(`#like${theId}`).html(nOfLikes);
		$(`#like${theId}`).addClass("animation");
		setTimeout(function(){
			$(`#like${theId}`).removeClass("animation");
		}, 200)
	}

	function movieNodeTemplate(img, title, desription, id, theBiggest){
	let currentMovie = `
	<div class="wrapper" id="wrapper${id}">
		<div class="movie">
			<div class="leftPart"><img src="${img}" alt=""></div>
			<div class="rightPart">
				<p class="title">${title}</p>
				<p class="description">${desription}</p>
				<div class="like">
					<div class="likeText">
						<p>Like</p>
						<div class="thumbsUp" id="${id}"><img src="img/thumbsUp.png" alt=""></div>
					</div>
					<div class="likeCounter" id="like${id}">${theBiggest}</div>
				</div>
			</div>
		</div>
	</div>
	`;

	return currentMovie;
}

});