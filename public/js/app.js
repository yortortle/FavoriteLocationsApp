const app = angular.module("locationsApp", []);

app.controller("MyController", ["$http", function($http){
  this.test="test";
  const controller = this;

  //partials include and function to change partials
  this.includePath = "partials/display.html"
  this.changeInclude = (path) => {
  	this.includePath = 'partials/'+ path +'.html';
  }

  //get route
  this.getLocations = function(){
      this.includePath = "partials/display.html"
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

  this.showOne = function(id){
      $http({
          method:'GET',
          url:'/locations/'+ id,
      }).then(function(response){
          controller.oneLocation = response.data
          console.log(response);
      }, function(err){
          console.log(err);
      })
  }

  //delete route
  this.deleteLocation = function(id){
    $http({
      method: "DELETE",
      url: "/locations/" + id
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
  this.editLocation = function(id){
    $http({
      method: "PUT",
      url: "/locations/" + id,
      data: {
        name: this.oneLocation.name,
        image: this.oneLocation.image,
        description: this.oneLocation.description,
        likes: this.oneLocation.likes
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
          controller.name = ""
          controller.image = ""
          controller.description = ""
          controller.likes = ""
          // document.getElementById("createForm").reset();
      }, function(){
          console.log('error');
      });
  }

}]);



