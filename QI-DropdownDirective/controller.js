angular.module('dropdownApp')
    .controller('InputDropdownController', ['$scope','$q',function($scope,$q) {
        var self = this;

        //holds selected value
        self.usage1 = null;
        self.usage2 = null;

        // Dummy values for Dropdowns
        self.defaultDropdownStrings = [
            {driver:'Surendra',car:'100'},
            {driver:'Akash',car:'120'},
            {driver:'Srutika'},
            {driver:'Rupesh',car:'140'},
            {driver:'Arvind',car:'160'},
            {driver:'Tuhin',car:'180'},
            {driver:'Sabir',car:'200'},

        ];

        self.carDetails = [
            {id:'100',name:'Maruti Zen',regNo:'MH40 A3780'},
            {id:'120',name:'Maruti Estillo',regNo:'WB21 VD780'},
            {id:'140',name:'Maruti Omni',regNo:'MH20 AR723'},
            {id:'160',name:'Tata Nano',regNo:'WB20 BR723'},
            {id:'180',name:'Tata Indica',regNo:'WB20 1233'},
            {id:'200',name:'Honda City',regNo:'MH70 DS731'}
        ];

        self.driverDetails = [
            {name:'Surendra',contact:'+91 1234567890'},
            {name:'Akash',contact:'+91 1234567890'},
            {name:'Srutika',contact:'+91 1234567890'},
            {name:'Rupesh',contact:'+91 1234567890'},
            {name:'Arvind',contact:'+91 1234567890'},
            {name:'Tuhin',contact:'+91 1234567890'},
            {name:'Sabir',contact:'+91 1234567890'},
        ];

        // Filter method is passed with attribute 'filter-list-method="method(userInput)"'.
        // Called on the onchange event from the input field. Should return a promise resolving with an array of items to show in the dropdown.
        self.filterDropdownList = function(userInput) {
            var filter = $q.defer();
            var normalisedInput = userInput.toLowerCase();
            var matchDriverName = '';
            var matchCarCode = '';
            var filteredArray = self.defaultDropdownStrings.filter(function(searchText) {
                console.log("SearchText"+JSON.stringify(searchText));
                if(searchText.driver)
                    matchDriverName = searchText.driver.toLowerCase().indexOf(normalisedInput) === 0;
                if(searchText.car)
                    matchCarCode = searchText.car.indexOf(normalisedInput) === 0;
                return matchDriverName || matchCarCode;
            });

            filter.resolve(filteredArray);
            return filter.promise;
        };
    }
]);
