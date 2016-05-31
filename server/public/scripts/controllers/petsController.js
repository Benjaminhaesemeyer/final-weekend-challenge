myApp.controller('PetsController', ['$scope', '$http', function($scope, $http){

  // API
  var key = 'b7043fb54d43d1e41362b9c0ce7079a3';
  var baseURL = 'http://api.petfinder.com/';

  // Populate Drop-down
  $scope.types = [
    {type: "barnyard", label: "Farm Animals" },
    {type: "bird", label: "Birds" },
    {type: "cat", label: "Cats" },
    {type: "dog", label: "Dogs" },
    {type: "horse", label: "Horses" },
    {type: "pig", label: "Pigs" },
    {type: "reptile", label: "Reptile" },
    {type: "smallfurry", label: "Small & Furry" }
  ];
  $scope.favorites = [];
  var currentPet = {};

  getFavorites();


  function Cntrl ($scope,$location) {
        $scope.changeView = function(view){
            $location.path(faves);
        }
    }

  $scope.deleteFavorite = function (id) {
    if (confirm("Are you sure you don't want to give this animal a new home?")){
      $http.delete('/pets/' + id)
        .then(function (response) {
          getFavorites();
        });
    }
  };

  function getFavorites() {
    $http.get('/pets')
      .then(function (response) {
        response.data.forEach(function (pet) {
        });
         $scope.favorites = response.data;
         $scope.favoriteCount = $scope.favorites.length;
      });
  }

  $scope.addFavorite = function () {
    currentPet.petID = $scope.animal.id.$t;
    currentPet.petName = $scope.animal.name.$t;
    currentPet.imageURL = $scope.animal.media.photos.photo[3].$t;
    currentPet.description = $scope.animal.description.$t.substring(0, 100);

    console.log(currentPet);

    $http.post('/pets', currentPet)
      .then(function () {
        console.log('POST /pets');
        getFavorites();
      });
 };

  // Get pet information from Petfinder API
  $scope.getRandomPet = function() {
    var query = 'pet.getRandom';
    query += '?key=' + key;
    query += '&animal=' + $scope.selectedType.type;
    query += '&output=basic';
    query += '&format=json';

    var request = baseURL + encodeURI(query) + '&callback=JSON_CALLBACK';
    console.log(request);

    $http.jsonp(request).then(
      function(response) {
        $scope.animal = response.data.petfinder.pet;
      }
    )
  }


  $scope.getStartingPet = function() {
    var query = 'pet.getRandom';
    query += '?key=' + key;
    //query += '&animal=' + $scope.selectedType;
    query += '&output=basic';
    query += '&format=json';

    var request = baseURL + encodeURI(query) + '&callback=JSON_CALLBACK';
    console.log(request);

    $http.jsonp(request).then(
      function(response) {
        $scope.animal = response.data.petfinder.pet;
      }
    )
  }


}]);
