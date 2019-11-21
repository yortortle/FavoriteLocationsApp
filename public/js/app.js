const app = angular.module("locationsApp", []);

app.controller("MyController", ["$http", function($http){
  this.test="test";
  const controller = this;

  //partials include and function to change partials
  this.includePath = "partials/new.html"
  this.changeInclude = (path) => {
  	this.includePath = 'partials/'+ path +'.html';
  }

  //get route
  this.getLocations = function(){
    $http({
        method:'GET',
        url: '/locations/'
    }).then(function(response){
        console.log(response);
        controller.location = response.data;
        console.log(controller.bookmarkArray);
    }, function(){
        console.log('error');
    });
  };

  this.getLocations();

  //delete route
  this.deleteLocation = function(bookmark){
    $http({
      method: "DELETE",
      url: "/locations/" + bookmark._id
    }).then(
      function(response){
        console.log(response);
        controller.getLocations();
      },
      function(error){
        console.log("error");
      }
    );
  }

  //edit route
  this.editLocation = function(bookmark){
    $http({
      method: "PUT",
      url: "/locations/" + bookmark._id,
      data: {
        name: this.updatedName,
        image: this.updatedImage,
        description: this.updatedDescription,
        likes: this.updatedLikes
      }
    }).then(
      function(response){
        controller.getLocations()
        // document.getElementById("editform").reset();
        // controller.url = null;
      },
      function error() {
        console.log("error");
      }
    )
  }

  this.createLocation = function(){
      $http({
          method:'POST',
          url: '/locations',
          data: {
              name: this.name,
              image: this.image,
              description: this.description,
              likes: this.likes
          }
      }).then(function(response){
          controller.getLocations();
          // document.getElementById("createForm").reset();
      }, function(){
          console.log('error');
      });
  }

}]);



