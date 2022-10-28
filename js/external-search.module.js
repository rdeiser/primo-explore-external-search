angular
.module('externalSearch', []).value('searchTargets', []).component('prmFacetAfterAppStoreGenerated', {
  bindings: { parentCtrl: '<' },
  //controller: ['externalSearchService', function (externalSearchService) {
  controller: ['externalSearchService', '$scope', function (externalSearchService, $scope) {
    this.$onInit = function () {
    externalSearchService.setController(this.parentCtrl);
    externalSearchService.addExtSearch();
    $scope.$watch('$ctrl.parentCtrl.facets', function(){
      externalSearch.addExtSearch()});
    }
  }]
}).component('prmPageNavMenuAfterAppStoreGenerated', {
  controller: ['externalSearchService', function (externalSearchService) {
    this.$onInit = function () {
    if (externalSearchService.getController()) externalSearchService.addExtSearch();
    }
  }]
}).component('prmFacetExactAfterAppStoreGenerated', {
  bindings: { parentCtrl: '<' },
  template: '\n      <div ng-if="name === \'External Search\'">\n          <div ng-hide="$ctrl.parentCtrl.facetGroup.facetGroupCollapsed">\n              <div class="section-content animate-max-height-variable">\n                  <div class="md-chips md-chips-wrap">\n                      <div ng-repeat="target in targets" aria-live="polite" class="md-chip animate-opacity-and-scale facet-element-marker-local4">\n                          <div class="md-chip-content layout-row" role="button" tabindex="0">\n                              <strong dir="auto" title="{{ target.name }}">\n                                  <a ng-href="{{ target.url + target.mapping(queries, filters) }}" target="_blank">\n                                      <img ng-src="{{ target.img }}" width="22" height="22" alt="{{ target.alt }}" style="vertical-align:middle;"> {{ target.name }}\n                                  </a>\n                              </strong>\n                          </div>\n                      </div>\n                  </div>\n              </div>\n          </div>\n      </div>',
  controller: ['$scope', '$location', 'searchTargets', function ($scope, $location, searchTargets) {
    this.$onInit = function () {
    $scope.name = this.parentCtrl.facetGroup.name;
    $scope.targets = searchTargets;
    var query = $location.search().query;
    var filter = $location.search().pfilter;
    //$scope.queries = Array.isArray(query) ? query : query ? [query] : false;
    //$scope.filters = Array.isArray(filter) ? filter : filter ? [filter] : false;
    $scope.queries = Object.prototype.toString.call(query) === '[object Array]' ? query : query ? [query] : false
    $scope.filters = Object.prototype.toString.call(filter) === '[object Array]' ? filter : filter ? [filter] : false
    }
  }]
}).factory('externalSearchService', function () {
  return {
    getController: function () {
      return this.prmFacetCtrl || false;
    },
    setController: function (controller) {
      this.prmFacetCtrl = controller;
    },
    addExtSearch: function addExtSearch() {
      var xx=this;
      var checkExist = setInterval(function () {

        if (xx.prmFacetCtrl.facetService.results[0] && xx.prmFacetCtrl.facetService.results[0].name !="External Search") {
          if (xx.prmFacetCtrl.facetService.results.name !== 'External Search') {
            xx.prmFacetCtrl.facetService.results.unshift({
              name: 'External Search',
              displayedType: 'exact',
              limitCount: 0,
              facetGroupCollapsed: false,
              values: undefined
            });
          }
          clearInterval(checkExist);
        }
      }, 100);
    }
  }
})