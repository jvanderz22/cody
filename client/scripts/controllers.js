app.controller('HomeController', function($scope) {
	var fullImages = [];
	//add Home images to images var
	var images = ["HomeModel.jpg"];
	for (var i = 0; i < images.length; i++){
		var imageString = "/images/home/" + images[i];
		fullImages.push(imageString);

	}
	$scope.images = fullImages;
})




app.controller('ModelsController', function($scope) {
	var fullImages1 = [];
	var fullImages2 = [];
	var fullImages3 = [];
	var fullImages4 = [];
	//add 3D Model images to images var
	var images1 = ["image6.jpg", "image3.jpg", "image2.gif"];
	for (var i = 0; i < images1.length; i++){
		var imageString = "/images/models/NewWork/" + images1[i];
		fullImages1.push(imageString);

	}
	$scope.images1 = fullImages1;

	var images2 = [];
	for (var i = 0; i < images2.length; i++){
		var imageString = "/images/models/NewWork/" + images2[i];
		fullImages2.push(imageString);

	}
	$scope.images2 = fullImages2;

	var images3 = ["image8.jpg"];
	for (var i = 0; i < images3.length; i++){
		var imageString = "/images/models/NewWork/" + images3[i];
		fullImages3.push(imageString);

	}
	$scope.images3 = fullImages3;

	var images4 = [];
	for (var i = 0; i < images4.length; i++){
		var imageString = "/images/models/NewWork/" + images4[i];
		fullImages4.push(imageString);

	}
	$scope.images4 = fullImages4;

	var fullVideos1 = [];
	var videos1 = ["video4", "video5"];
	for (var i = 0; i < videos1.length; i++) {
		var videoString = "/images/models/NewWork/"
		var videoObject = {};
		videoObject.mp4 = videoString + videos1[i] + ".mp4";
		videoObject.ogg = videoString + videos1[i] + ".ogv";
		videoObject.webm = videoString + videos1[i] + ".webm";
		fullVideos1.push(videoObject);
	}
	$scope.videos1 = fullVideos1;


	var fullVideos2 = [];
	var videos2 = ["video7"];
	for (var i = 0; i < videos2.length; i++) {
		var videoString = "/images/models/NewWork/"
		var videoObject = {};
		videoObject.mp4 = videoString + videos2[i] + ".mp4";
		videoObject.ogg = videoString + videos2[i] + ".ogv";
		videoObject.webm = videoString + videos2[i] + ".webm";
		fullVideos2.push(videoObject);
	}
	$scope.videos2 = fullVideos2;


	

	var fullVideos3 = [];
	var videos3 = ["video10"];
	for (var i = 0; i < videos3.length; i++) {
		var videoString = "/images/models/NewWork/"
		var videoObject = {};
		videoObject.mp4 = videoString + videos3[i] + ".mp4";
		videoObject.ogg = videoString + videos3[i] + ".ogv";
		videoObject.webm = videoString + videos3[i] + ".webm";
		fullVideos3.push(videoObject);
	}
	$scope.videos3 = fullVideos3;



	$scope.stretchModes = [
        {label: "None", value: "none"},
        {label: "Fit", value: "fit"},
        {label: "Fill", value: "fill"}
    ];



   



});



app.controller('PhotographyController', function($scope) {
	var fullImages = [];
	//add Photography images to images var
	var images = [];
	for (var i = 1; i <= 39; i++) {
		var image = "photo" + i + ".jpg";
		console.log(image)
		images.push(image);
	}
	for (var i = 0; i < images.length; i++){
		var imageString = "/images/photos/" + images[i];
		fullImages.push(imageString);

	}
	$scope.images = fullImages;
})




app.controller('ArtController', function($scope) {
	var fullImages = [];
	//add art images to images var
	var images = [];
	for (var i = 0; i < images.length; i++){
		var imageString = "/images/art/" + images[i];
		fullImages.push(imageString);

	}
	$scope.images = fullImages;
})



app.controller('ResumeController', function($scope) {
	$scope.resume = "/images/resume/resume.pdf";

})


function DropdownCtrl($scope) {
  $scope.items = [
    "The first choice!",
    "And another choice for you.",
    "but wait! A third!"
  ];
}