(function() {
  angular.module("wnHttp").config([
    "wnHttpServiceProvider",
    function(wnHttpServiceProvider) {
      wnHttpServiceProvider.setApiBaseUrl("http://localhost:51236/");
      wnHttpServiceProvider.setExceptionType("System.Exception");
    }
  ]);
  angular.module("wnHttp").controller("mainController", [
    "wnHttpService",
    function(wnHttpService) {
      var vm = this;
      vm.apiBaseUrl = wnHttpService.apiBaseUrl;
      vm.exceptionType = wnHttpService.exceptionType;
      wnHttpService.displaySuccess("Yay!");
    }
  ]);
})();
