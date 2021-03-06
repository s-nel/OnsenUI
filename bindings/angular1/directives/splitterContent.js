/**
 * @element ons-splitter-content
 */

/**
 * @attribute ons-destroy
 * @initonly
 * @type {Expression}
 * @description
 *  [en]Allows you to specify custom behavior when the "destroy" event is fired.[/en]
 *  [ja]"destroy"イベントが発火された時の挙動を独自に指定できます。[/ja]
 */
(function() {
  'use strict';

  var lastReady = window.ons.elements.SplitterContent.rewritables.ready;
  window.ons.elements.SplitterContent.rewritables.ready = ons._waitDiretiveInit('ons-splitter-content', lastReady);

  angular.module('onsen').directive('onsSplitterContent', function($compile, SplitterContent, $onsen) {
    return {
      restrict: 'E',

      compile: function(element, attrs) {

        return function(scope, element, attrs) {

          var view = new SplitterContent(scope, element, attrs);

          $onsen.declareVarAttribute(attrs, view);
          $onsen.registerEventHandlers(view, 'destroy');

          element.data('ons-splitter-content', view);

          element[0].pageLoader = $onsen.createPageLoader(view);

          scope.$on('$destroy', function() {
            view._events = undefined;
            element.data('ons-splitter-content', undefined);
          });

          $onsen.fireComponentEvent(element[0], 'init');
        };
      }
    };
  });
})();
