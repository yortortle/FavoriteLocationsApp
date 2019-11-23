const app = angular.module("locationsApp", []);

app.controller("MyController", ["$http", function($http){
  this.test="test";
  const controller = this;
  this.loggedInUsername = null;
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
        // console.log(response);
        controller.location = response.data;
        // console.log(controller.bookmarkArray);
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
        console.log(response.data)
          controller.oneLocation = response.data
          // console.log(response);
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
      // console.log("hi");
      controller.displayApp()
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

//Stay logged in on refresh.
  $http({
      method:'GET',
      url:'/sessions'
  }).then(function(response){
      if (response.data.currentUser) {
          controller.loggedInUsername = response.data.currentUser.username
          // console.log(controller.loggedInUsername);
      }

  })

  // this.likes = function(location){
  //     // console.log(location.likes);
  //     location.likes = Number(location.likes) + 1
  //
  //     $http({
  //         method:'PUT',
  //         url:'/locations/' + location._id,
  //         data: location
  //     }).then(function(response){
  //         controller.getLocations()
  //     })
  // }
//add likes to a location
this.likes = function(location, button){

    let userFound = false
    let liked = false
    let loved = false

    //if user clicks without logging in nothing will happen. This way we can keep the icon there to indicate these are the likes.
    if (this.loggedInUsername === null ) {

        return
    }
    if (location.likedAndLoved.length > 0) {
        const user = this.loggedInUsername;
        const likeLoveArray = location.likedAndLoved
        for(let i = 0; i < likeLoveArray.length; i++){
            // if user is found do the following
            if(location.likedAndLoved[i].username === user){
                const userLikeInfo = location.likedAndLoved[i]
                userFound = true;
                liked = userLikeInfo.liked
                loved = userLikeInfo.loved

                if (button === 'like') {
                    //if user has already liked this then clicking again subtracts their like.
                    if(liked === true){
                        location.likes = Number(location.likes) - 1
                        userLikeInfo.liked = false
                    }else{
                    //if user does not like the location then this will add a like .
                        location.likes = Number(location.likes) + 1
                        userLikeInfo.liked = true
                    }
                }else if (button === 'love') {
                    //the if statement probably isn't necessary, but I'm throwing it in for understanding why this part should run.
                    if(loved === true){
                        userLikeInfo.loved = false
                    }else{
                        userLikeInfo.loved = true
                    }
                }

                //stop the loop to prevent it from continuing through the loop now that we found what we wanted.
                break
            }
        }
    }


    //if user is not found then push the new user information to the location object.
    if (userFound === false) {
        if (button === 'like') {
            location.likes = Number(location.likes) + 1
            location.likedAndLoved.push({
                username:this.loggedInUsername,
                liked:true,
                loved: false
            })
        }else if (button === 'love') {
            location.likedAndLoved.push({
                username:this.loggedInUsername,
                liked:false,
                loved: true
            })
        }

    }
    //update with new like information
    $http({
        method:'PUT',
        url:'/locations/' + location._id,
        data: location
    }).then(function(response){
        controller.getLocations()
    })
}


}]);
