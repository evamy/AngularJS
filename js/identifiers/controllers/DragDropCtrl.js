var app = angular.module('dragDrop', []);

app.directive('draggable', function() {
  return function(scope, element) {
    // this gives us the native JS object
    var el = element[0];
    
    el.draggable = true;
    
    el.addEventListener(
      'dragstart',
      function(e) {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('Text', this.id);
        this.classList.add('drag');
        return false;
      },
      false
    );
    
    el.addEventListener(
      'dragend',
      function(e) {
        this.classList.remove('drag');
        var item = document.getElementById(e.dataTransfer.getData('Text'));
        this.removeChild(item);
        return false;
      },
      false
    );
  }
});

app.directive('droppable', function() {
  return {
    scope: {
      drop: '&' // parent
    },
    link: function(scope, element) {
      // again we need the native object
      var el = element[0];
      
      el.addEventListener(
        'dragover',
        function(e) {
          e.dataTransfer.dropEffect = 'move';
          // allows us to drop
          if (e.preventDefault) e.preventDefault();
          this.classList.add('over');
          return false;
        },
        false
      );
      
      el.addEventListener(
        'dragenter',
        function(e) {
          this.classList.add('over');
          return false;
        },
        false
      );
      
      el.addEventListener(
        'dragleave',
        function(e) {
          this.classList.remove('over');
          return false;
        },
        false
      );
      
      el.addEventListener(
        'drop',
        function(e) {
          // Stops some browsers from redirecting.
          if (e.stopPropagation) e.stopPropagation();
          
          this.classList.remove('over');
          
          var item = document.getElementById(e.dataTransfer.getData('Text'));
          this.appendChild(item);
          //item.style.width = 20px;

          // call the drop passed drop function
          scope.$apply('drop()');
          
          return false;
        },
        false
      );
    }
  }
});

app.directive('changes', function(){
  return{
    scope: {
      drop: '&' // parent
    },
    link: function(scope, element) {
      var el = element[0];
    }
  }
});

app.controller('DragDropCtrl', function($scope) {
  $scope.handleDrop = function() {
      //document.getElementById(e.dataTransfer.getData('Text')).style.width = 70px;
      
  }
});
