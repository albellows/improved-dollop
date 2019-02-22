// Define the temperature component
angular.module('temperatureList').component('temperatureList', {
	templateUrl: 'temperature-list/temperature-list.component.html',
	controller: ['$http', '$interval', function TemperatureListController($http, $interval) {
		this.eci = "5vuhyTK9LZNBXcR6t5nMJA";
		this.temperatures = [];

		// These are the API URLs we need for this component
		var _this = this;
		var host = "http://localhost:8080/";
		var url = host + "sky/cloud/"+this.eci+"/temperature_store/temperatures?";

		// Setup an interval function
		var liveTemperatures;
		this.getLiveTemperatures = function(){
				$http.get(url).then(
					function success(response){
						console.log(url);
						_this.temperatures = [];
						for(i = 1; i < 10; i++){
							if(response.data.length - i < 0) break;
							_this.temperatures.push(response.data[response.data.length - i])
						}
					},
					function error(response){
						_this.temperatures = [];
						_this.temperatures.push({timestamp: "Fail", temperature: "Fail"})
				});		
		};

		liveTemperatures = $interval(this.getLiveTemperatures, 3000);

		this.$onDestroy = function(){
			if(angular.isDefined(liveTemperatures)){
				$interval.cancel(liveTemperatures);
				liveTemperatures = undefined;
			}
		};

		// Initialize
		this.getLiveTemperatures();
	}]
});