/**
 * Created by wanjie on 2015/11/17.
 */
var myModule = angular.module("Angello",
    [
        "ngRoute",
        //"ngAnimate",
        //"firebase",
        //"ngMessages",
        "Angello.Common",
        "Angello.Dashboard",
        //"Angello.Login",
        "Angello.Storyboard",
        "Angello.User",
        //"auth0",
        //"angular-jwt",
        //"angular-storage"
    ]);

myModule.config(function ($routeProvider, $httpProvider, $provide) {

    //decorators
    $provide.decorator("$log", function ($delegate) {
        function timeStamp() {
            var oNow = new Date();
            var date = [fillZero(oNow.getMonth() + 1), fillZero(oNow.getDate()), oNow.getFullYear()];
            var time = [fillZero(oNow.getHours()), fillZero(oNow.getMinutes()), fillZero(oNow.getSeconds())];
            var suffix = time[0] < 12 ? "AM" : "PM";
            time[0] > 12 ? time[0] - 12 : time[0];
            time[0] = time[0] || 12;
            return date.join("/") + " " + time.join(":") + " " + suffix;
        }

        function fillZero(n) {
            return n < 10 ? "0" + n : "" + n;
        }

        var debugFn = $delegate.debug;

        $delegate.debug = function () {
            arguments[0] = timeStamp() + " - " + arguments[0];
            debugFn.apply(null, arguments);
        };
        return $delegate;
    });
    //interceptors
    $httpProvider.interceptors.push("loadingInterceptor");
    //routes
    $routeProvider
        .when("/", {
        templateUrl: "src/angello/storyboard/tmpl/storyboard.html",
        controller: "StoryboardCtrl",
        controllerAs: "storyboard"
        })
//        .when("/dashboard", {
//            templateUrl: "src/angello/dashboard/tmpl/dashboard.html",
//            controller: "LoginCtrl",
//            controllerAs: "login"
//        })
//        .when("/users", {
//            templateUrl: "src/angello/user/tmpl/users.html",
//            controller: "UsersCtrl",
//            controllerAs: "users"
//        })
//        .when("/users/:userId", {
//            templateUrl: "src/angello/user/tmpl/user.html",
//            controller: "UserCtrl",
//            controllerAs: "myUser"
//        })
//        .when("/login", {
//            templateUrl: "src/angello/login/tmpl/login.html",
//            controller: "StoryboardCtrl",
//            controllerAs: "storyboard"
//        })
        .otherwise({ redirectTo: "/"});

});

myModule.controller("MainCtrl", function () {});

myModule.value("STORY_TYPES",[
    {name: "Feature"},
    {name: "Enhancement"},
    {name: "Bug"},
    {name: "Spike"}
]);

myModule.factory("loadingInterceptor", function (loadingService) {
    var loadingInterceptor = {
        request: function (config) {
            loadingService.setLoading(true);
            return config;
        },
        response: function (result) {
            loadingService.setLoading(false);
            return result;
        }
    };

    return loadingInterceptor;
});