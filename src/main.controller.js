(function() {
  angular
    .module("wnHttp")
    .config([
      "wnHttpServiceProvider",
      function(wnHttpServiceProvider) {
        wnHttpServiceProvider.setApiBaseUrl("http://example.com/");
        wnHttpServiceProvider.setExceptionType("System.Exception");
      }
    ])
    .factory("testService", [
      "wnHttpService",
      function(wnHttpService) {
        return wnHttpService.getInstance("Tests");
      }
    ]);
  angular.module("wnHttp").controller("mainController", [
    "wnHttpService",
    "testService",
    function(wnHttpService, testService) {
      var vm = this;
      vm.apiBaseUrl = wnHttpService.apiBaseUrl;
      vm.exceptionType = wnHttpService.exceptionType;
      wnHttpService.displaySuccess("Yay!");
      testService.search("r", ["a", "b"], { x: "x", y: "y" });
    }
  ]);
})();
