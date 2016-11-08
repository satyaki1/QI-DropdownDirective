angular.module('dropdownApp')
    .directive('dropdown', [function() {
    var templateString =
        '<div class="input-dropdown">' +
        '<input type="text"' +
        'name="{{inputName}}"' +
        'placeholder="{{inputPlaceholder}}"' +
        'ng-model="inputValue"' +
        'ng-change="inputChange()"' +
        'ng-focus="inputFocus()"' +
        'ng-blur="inputBlur($event)" class="dropdown" readonly>' +
        '<input ng-show="showSearchBar" type="text"' +
        'name="searchText"' +
        'ng-focus="focusSearch()"' +
        'placeholder="Search"' +
        'ng-model="searchInputValue"' +
        'ng-change="inputChange()" class="search">' +
        '<ul ng-show="dropdownVisible">' +
        '<li ng-repeat="item in dropdownItems"' +
        'ng-click="selectItem(item)"' +
        'ng-mouseenter="setActive($index)"' +
        'ng-mousedown="dropdownPressed()"' +
        'ng-class="{\'active\': activeItemIndex === $index}"' +
        '>' +
        '<span ng-if="item.driver"> {{item.driver}} / </span>' +
        '<span ng-if="!item.driver"> - / </span>' +
        '<span ng-if="item.car"> {{item.car}}  </span>' +
        '<span ng-if="!item.car"> -  </span>' +
        '</li>' +
        '</ul>' +
        '<div class="arrow_box" ng-show="showTooltip" id="detailsBox">'+
        '<div ng-if="showCarDetails">Vehicle : <img src="../Assets/car.jpg" class="img-style"><div>{{carName}} - {{carReg}}</div></div>'+
        '<br/><div ng-if="showDriverDetails">Driver : <img src="../Assets/driver.jpg" class="img-style"><div>{{driverName}} - {{driverContact}}</div></div>'+
        '</div>' +
        '</div>';


    return {
        restrict: 'E',
        scope: {
            defaultDropdownItems: '=',
            defaultCar: '=',
            defaultDriver: '=',
            selectedItem: '=',
            inputName: '@',
            inputPlaceholder: '@',
            filterListMethod: '&'
        },
        template: templateString,
        controller: function($scope) {
            this.getSelectedItem = function() {
                return $scope.selectedItem;
            };
            this.isRequired = function() {
                return $scope.inputRequired;
            };
        },
        link: function(scope, element) {
            var pressedDropdown = false;
            var inputScope = element.find('input').isolateScope();

            scope.activeItemIndex = 0;
            scope.inputValue = '';
            scope.dropdownVisible = false;
            scope.showTooltip = false;
            scope.carName = '';
            scope.carReg = '';
            scope.driverName = '';
            scope.driverContact = '';
            scope.showSearchBar = false;
            scope.dropdownItems = scope.defaultDropdownItems || [];

            scope.$watch('selectedItem', function(newValue, oldValue) {

                if (!angular.equals(newValue, oldValue)) {
                    if (newValue) {
                        console.log("selected item"+ JSON.stringify(newValue));
                        scope.showSearchBar = false;
                        if (typeof newValue === 'string') {
                            scope.inputValue = newValue.driver;
                        }
                        else {
                            var driverValue = newValue.driver == undefined ? '-' : newValue.driver;
                            var carValue = newValue.car == undefined ? '-' : newValue.car;
                            scope.inputValue = driverValue +' / '+ carValue;
                        }
                    }
                    else {
                        // Uncomment to clear input field when editing it after making a selection
                        // scope.inputValue = '';
                    }
                }
            });

            scope.setActive = function(itemIndex) {
                console.log('Active Index Changed' + itemIndex)
                scope.activeItemIndex = itemIndex;
                scope.showTooltip=true;
                var obj = scope.dropdownItems[itemIndex];
                // For Car Details On Hover
                if(obj.car)
                {
                    scope.showCarDetails = true;
                    for(var car in scope.defaultCar){
                    if(obj.car == scope.defaultCar[car].id){
                        console.log("Car Matched");
                        scope.carName = scope.defaultCar[car].name;
                        scope.carReg = scope.defaultCar[car].regNo;
                        break;
                    }
                    }
                }
                else{
                    //hide details of car
                    scope.showCarDetails = false;
                }

                //For Driver Details on Hover
                if(obj.driver)
                {
                    scope.showDriverDetails = true;
                    for(var driver in scope.defaultDriver){
                        if(obj.driver == scope.defaultDriver[driver].name){
                            console.log("Driver Matched");
                            scope.driverName = scope.defaultDriver[driver].name;
                            scope.driverContact = scope.defaultDriver[driver].contact;
                            break;
                        }
                    }
                }
                else{
                    //hide details of car
                    scope.showDriverDetails = false;
                }

                //var x = element.clientX,y = element.clientY;
                //angular.element('#detailsBox').css('top',(y + 20) + 'px');
                //angular.element('#detailsBox').css('left',(x + 20) + 'px');

            };

            scope.inputChange = function() {
                scope.selectedItem = null;
                showDropdown();
                scope.dropdownItems = scope.defaultDropdownItems || [];
                //filtering out the input text content
                if (scope.filterListMethod) {
                    var promise = scope.filterListMethod({userInput: scope.searchInputValue});
                    if (promise) {
                        promise.then(function(dropdownItems) {
                            scope.dropdownItems = dropdownItems;
                        });
                    }
                }

            };

            scope.inputFocus = function() {
                scope.setActive(0);
                showDropdown();
                scope.showSearchBar = true;
            };

            scope.focusSearch = function(){
                showDropdown();
            }

            scope.inputBlur = function(event) {
                console.log("Input Blurred! scope.inputValue = "+scope.inputValue);
                if (pressedDropdown) {
                    // Blur event is triggered before click event, which means a click on a dropdown item wont be triggered if we hide the dropdown list here.
                    pressedDropdown = false;
                    return;
                }
                hideDropdown();
                scope.showSearchBar = true;

            };

            scope.dropdownPressed = function() {
                pressedDropdown = true;
            }

            scope.selectItem = function(item) {
                scope.selectedItem = item;
                hideDropdown();
            };

            var showDropdown = function () {
                console.log("Show Dropdown");
                scope.dropdownVisible = true;
            };
            var hideDropdown = function() {
                scope.dropdownVisible = false;
                scope.showTooltip=false;
            }

            var selectPreviousItem = function() {
                var prevIndex = scope.activeItemIndex - 1;
                if (prevIndex >= 0) {
                    scope.setActive(prevIndex);
                }
            };

            var selectNextItem = function() {
                var nextIndex = scope.activeItemIndex + 1;
                if (nextIndex < scope.dropdownItems.length) {
                    scope.setActive(nextIndex);
                }
            };

            var selectActiveItem = function()  {
                if (scope.activeItemIndex >= 0 && scope.activeItemIndex < scope.dropdownItems.length) {
                    scope.selectItem(scope.dropdownItems[scope.activeItemIndex]);
                }
            };
            //dropdown up and down action via keyboard only
            element.bind("keydown keypress", function (event) {
                switch (event.which) {
                    case 38: //up
                        scope.$apply(selectPreviousItem);
                        break;
                    case 40: //down
                        scope.$apply(selectNextItem);
                        break;
                    case 13: // return
                        if (scope.dropdownVisible && scope.dropdownItems && scope.dropdownItems.length > 0) {
                            // only preventDefault when there is a list so that we can submit form with return key after a selection is made
                            event.preventDefault();
                            scope.$apply(selectActiveItem);
                        }
                        break;
                }
            });
        }
    }
}]);
