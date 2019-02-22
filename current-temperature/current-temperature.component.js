// Define the temperature component
angular.module('currentTemperature').component('currentTemperature', {
	templateUrl: 'current-temperature/current-temperature.component.html',
	controller: ['$http', '$interval', function currentTemperatureController($http, $interval) {
		this.eci = "5vuhyTK9LZNBXcR6t5nMJA";
		this.temperature = 0;

		// These are the API URLs we need for this component
		var $cmpnt = this;
		var host = "https://localhost:8080/";
		var url = host + "sky/cloud/"+this.eci+"/temperature_store/temperatures?";

		// Setup an interval function
		this.getCurrentTemperature = function(){
				$http.get(url).then(
					function success(response){
						console.log(response.data.length);
						$cmpnt.temperature = response.data[response.data.length - 1].temperature;
					},
					function error(response){
						$cmpnt.temperature = -1;
				});		
		};

		var currentTemperature = $interval(this.getCurrentTemperature, 3000);

		this.$onDestroy = function(){
			if(angular.isDefined(currentTemperature)){
				$interval.cancel(currentTemperature);
				currentTemperature = undefined;
			}
		};

		// Initialize
		this.getCurrentTemperature();
	}]
});