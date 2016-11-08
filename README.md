# QI-DropdownDirective
AngularJS Application Test Document . Create a custom directive to include a dropdown in a page.

## How to run this project
1. Clone this repo in your machine
2. Install Brackets. (Link : http://brackets.io/)
3. Goto File -> Open Folder and choose the location of repo and 'Select Folder'
4. Brackets IDE will show the files associated with this project
5. Select the index.html and click on tilted sign (~) on right panel of bracket IDE
6. Default Chrome browser will open and you can see the result.

## Documentation
This repository contains the angularjs assignment on writing a custom directive to create a dropdown related to car and driver details. The dropdown will have search option and it can show extra details of an object on hover on the dropdown list. This project is written in pure AngularJS, no 3rd party library has been used.
To use this directive maintain the following structure and include in your web app -

<dropdown default-dropdown-items="defaultDropdownStrings" default-car="carDetails" default-driver="driverDetails" filter-list-method="filterDropdownList(userInput)" input-placeholder="Select Driver To Pair" input-name="Dropdown Demo" selected-item="dummyData"></dropdown>

Following are the main points -
- <dropdown> is the name of our directive. It has following attributes :
- default-dropdown-items : It contains the default list of items which we need to show on the dropdown
- default-car : It contains the default car object that needs to be referred to show the extra details pop up on hover
- default-driver : As same as default-car attribute this is also used for driver details pop up on hover
- filter-list-method : It is used for filtering or search capability on the dropdown list of items
- input-placeholder : It is used to show the default placeholder
- input-name : It is used for naming the input tag
- selected-item : Used to store the final selected item (Optional Attribute)

This custom directive is using isolated scope concept of angularJs.So, we can use it as many times we want in a page.

