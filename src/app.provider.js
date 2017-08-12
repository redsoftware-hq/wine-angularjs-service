(function() {
  angular.module("wnHttp").provider("wnHttpService", wnHttpServiceProvider);

  function wnHttpServiceProvider() {
    var _apiBaseUrl;
    var _exceptionType;

    this.setApiBaseUrl = function(apiBaseUrl) {
      _apiBaseUrl = apiBaseUrl;
    };

    this.setExceptionType = function(exceptionType) {
      _exceptionType = exceptionType;
    };

    this.$get = [
      "Notification",
      "$q",
      "$http",
      function wnHttpService(Notification, $q, $http) {
        var Service = function(controllerName) {
          var instance = this;
          instance.apiBaseUrl = _apiBaseUrl;
          instance.exceptionType = _exceptionType;
          instance.apiController = controllerName;

          instance.get = function(queryParamsObject) {
            var deferred = $q.defer();

            $http({
              method: "GET",
              url:
                instance.apiBaseUrl +
                instance.apiController +
                instance.getQueryString(queryParamsObject),
              dataType: "JSON"
            }).then(
              function(success) {
                deferred.resolve(success.data);
              },
              function(error) {
                deferred.reject(error.statusText);
                instance.displayError(error, error.statusText);
              }
            );

            return deferred.promise;
          };

          instance.getById = function(id, queryParamsObject) {
            var deferred = $q.defer();

            $http({
              method: "GET",
              url:
                instance.apiBaseUrl +
                instance.apiController +
                "/Get/" +
                id +
                instance.getQueryString(queryParamsObject),
              dataType: "JSON"
            }).then(
              function(success) {
                deferred.resolve(success.data);
              },
              function(error) {
                deferred.reject(error.statusText);
                instance.displayError(error, error.statusText);
              }
            );

            return deferred.promise;
          };

          instance.create = function(data, queryParamsObject) {
            var deferred = $q.defer();

            $http({
              method: "POST",
              data: data,
              url:
                instance.apiBaseUrl +
                instance.apiController +
                instance.getQueryString(queryParamsObject),
              dataType: "JSON"
            }).then(
              function(success) {
                deferred.resolve(success.data);
              },
              function(error) {
                deferred.reject(error.statusText);
                instance.displayError(error, error.statusText);
              }
            );

            return deferred.promise;
          };

          instance.update = function(data, queryParamsObject) {
            var deferred = $q.defer();

            $http({
              method: "PUT",
              data: data,
              url:
                instance.apiBaseUrl +
                instance.apiController +
                "/Put/" +
                data.Id +
                instance.getQueryString(queryParamsObject),
              dataType: "JSON"
            }).then(
              function(success) {
                deferred.resolve(success.data);
              },
              function(error) {
                deferred.reject(error.statusText);
                instance.displayError(error, error.statusText);
              }
            );

            return deferred.promise;
          };

          instance.delete = function(id, queryParamsObject) {
            var deferred = $q.defer();

            $http({
              method: "DELETE",
              url:
                instance.apiBaseUrl +
                instance.apiController +
                "/Delete/" +
                id +
                instance.getQueryString(queryParamsObject),
              dataType: "JSON"
            }).then(
              function(success) {
                deferred.resolve(success.data);
              },
              function(error) {
                deferred.reject(error.statusText);
                instance.displayError(error, error.statusText);
              }
            );

            return deferred.promise;
          };

          instance.search = function(key, includeFields) {
            var deferred = $q.defer();
            var includeString = "";

            includeFields.forEach(function(field) {
              includeString += "&include=" + field;
            });

            $http({
              method: "GET",
              url:
                instance.apiBaseUrl +
                instance.apiController +
                "/Search?query=" +
                key +
                includeString,
              dataType: "JSON"
            }).then(
              function(success) {
                deferred.resolve(success.data);
              },
              function(error) {
                deferred.reject(error.statusText);
                instance.displayError(error, error.statusText);
              }
            );

            return deferred.promise;
          };

          instance.getQueryString = function(queryParamsObject) {
            var queryParamsString;

            _.each(_.keys(queryParamsObject), function(key) {
              if (queryParamsString) {
                queryParamsString += "&" + key + "=" + queryParamsObject[key];
              } else {
                queryParamsString = "?" + key + "=" + queryParamsObject[key];
              }
            });

            return queryParamsString || "";
          };

          instance.displaySuccess = function(message) {
            Notification.success(message);
          };

          instance.displayError = function(error, defaultMessage) {
            console.log(error);
            if (
              error.status === 500 &&
              error.data.ExceptionType === instance.exceptionType
            ) {
              Notification.error(error.data.ExceptionMessage);
            } else {
              Notification.error(defaultMessage);
            }
          };
        };

        var serviceStub = new Service();

        return {
          getInstance: function(controllerName) {
            return new Service(controllerName);
          },
          apiBaseUrl: serviceStub.apiBaseUrl,
          displayError: serviceStub.displayError,
          displaySuccess: serviceStub.displaySuccess
        };
      }
    ];
  }
})();
