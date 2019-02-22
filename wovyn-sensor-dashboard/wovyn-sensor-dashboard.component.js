// Configure the component
angular.module('wovynSensorDashboard').component('wovynSensorDashboard', {
	templateUrl: 'wovyn-sensor-dashboard/wovyn-sensor-dashboard.component.html',
	controller: ['$http', function WovynSensorDashboardController($http){
		// Configure the ECI channel
		this.eci = "5vuhyTK9LZNBXcR6t5nMJA";

		// Setup data members
		this.profile = {
			name: "Wovyn TS",
			location: "Provo",
			number: "+13192109565",
			threshold: 75
		};

		// Get a reference to the component
		var _cmpnt = this;
		
		// Define API URLs
		var host = "http://localhost:8080/";
		var profileUrl = host + "sky/cloud/" + this.eci + "/sensor_profile/query?"
		var saveUpdatesUrl = host + "sky/event/"+this.eci+"/27/sensor/profile_updated";

		this.updateProfile = function(){
			var data = JSON.stringify(_cmpnt.profile);
			console.log(data);
			$http.post(saveUpdatesUrl, data, {headers: {'Content-Type': 'application/json'}}).then(
				function success(response){
					alert("Update success!");
				},
				function error(response){
					alert("Update failure");
				});
		}

		this.initializeProfile = function(){
			$http.get(profileUrl).then(function success(response){
				_cmpnt.profile = response.data;
			},
			function error(response){
				alert("failed to retrieve profile info");
			});
		}

		this.initializeProfile();

	}]
});