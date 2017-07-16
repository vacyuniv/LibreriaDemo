/**
* Directive to set the arrows-up-down based on orderField and orderArray.
* Set to "up" when orderArray[orderField] == true, to "down" when orderArray[orderField] or grey out when undefined.
*/
function SortIcon(){

  return {
    restrict: "E",
    replace: true,
    scope: {
      orderField: "@",
      orderArray: "@"
    },
    templateUrl:"components/catalog/directives/sortIcon-view.html",
    link: function(scope, element, attrs){

      /**
      *  Add the class to the "up", and set the other as greyed.
      */
      function sortUp(){
        $(element).find('.fa-caret-up').addClass('sorted');
        $(element).find('.fa-caret-down').removeClass('sorted');
      }

      /**
      *  Add the class to the "down", and set the other as greyed.
      */
      function sortDown(){
        $(element).find('.fa-caret-up').removeClass('sorted');
        $(element).find('.fa-caret-down').addClass('sorted');
      }

      /**
      *  Remove the sorting from all, returning to the initial state
      */
      function removeSort(){
        $(element).find('.fa-caret-up').removeClass('sorted');
        $(element).find('.fa-caret-down').removeClass('sorted');
      }

      scope.$watch('orderArray', function(newValue, oldValue, scope){
        newValue = JSON.parse(newValue);
        var newValue_val = newValue[scope.orderField];
        if (newValue_val == true){
          sortDown();
        } else if (newValue_val == false){
          sortUp();
        } else {
          removeSort();
        }

      });
    }
  }
}

angular.module('catalogModule').directive('sortIcon', SortIcon);
