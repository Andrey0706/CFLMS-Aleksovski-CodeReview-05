
var movies = JSON.parse(movies);
console.log(movies[3]);

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
		let TheArray = [];
		let likesArray = document.getElementsByClassName("likeCounter");

		console.log(likesArray);
		for(let i=0; i<likesArray.length;i++){
			TheArray.push(parseInt(likesArray[i].innerHTML));
		}
		console.log(TheArray);

//clean the main area
		$("#main").html("");

//sort by find the most liked one and append it 
		for(let i=0; i<movies.length;i++){
			let indexOfTheBiggest=0;
			let theBiggest=TheArray[0];

			for(let j=0; j<TheArray.length; j++){
			if(TheArray[j]>theBiggest){
				theBiggest = TheArray[j]
				indexOfTheBiggest = j;
				console.log(indexOfTheBiggest);
			}
		}

		$("#main").append(movieNodeTemplate(movies[indexOfTheBiggest].img,
											movies[indexOfTheBiggest].title, 
											movies[indexOfTheBiggest].description, 
											indexOfTheBiggest, theBiggest))
		
		TheArray[indexOfTheBiggest] = -1;
		console.log(TheArray);
		}

$(".thumbsUp").on("click", increment)

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
	<div class="wrapper">
		<div class="movie">
			<div class="leftPart"><img src="${img}" alt=""></div>
			<div class="rightPart">
				<p class="title">${title}</p>
				<p class="description">${desription}</p>
				<div class="like">
					<p>Like</p>
					<div class="thumbsUp" id="${id}"><img src="img/thumbsUp.png" alt=""></div>
					<div class="likeCounter" id="like${id}">${theBiggest}</div>
				</div>
			</div>
		</div>
	</div>
	`;

	return currentMovie;
}

});