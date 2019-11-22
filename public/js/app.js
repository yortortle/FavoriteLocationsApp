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

  //new location
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

  //new user
  this.createUser = function(){
    $http({
      method: "POST",
      url: "/users",
      data: {
        username: this.username,
        password: this.password
      }
    }).then(response => {
      console.log(response);
      console.log("hi");
      controller.changeInclude('display')
      controller.username = null;
      controller.password = null;
    }, function(){
      console.log("error");
    })
  }

  //log in to user
  this.logIn = function(){
      $http({
          method:'POST',
          url: '/sessions',
          data: {
              username: this.username,
              password: this.password
          }
      }).then(function(response){
          console.log(response);
          controller.displayApp();
          controller.changeInclude('display')
          controller.username = null;
          controller.password = null;
      }, function(){
          console.log('error');
      });
  }

  //display user
  this.displayApp = function(){
      $http({
          method:'GET',
          url: '/sessionUser'
      }).then(function(response){
          controller.loggedInUsername = response.data.username;
          console.log(response);
      }, function(){
          console.log('error');
      });
  }

  //log out
  this.logOut = function(){
    $http({
      method: "DELETE",
      url:"/sessions"
    }).then(function(response){
      console.log(response);
      controller.loggedInUsername = null;
    }, function(error){
      console.log(error);
    })
  }


}]);



