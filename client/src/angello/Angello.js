/**
 * Created by wanjie on 2015/11/17.
 */
var myModule = angular.module("Angello",
    [
        "ngRoute",
        //"ngAnimate",
        //"firebase",
        //"ngMessages",
        //"Angello.Common",
        //"Angello.Dashboard",
        //"Angello.Login",
        //"Angello.Storyboard",
        //"Angello.User",
        //"auth0",
        //"angular-jwt",
        //"angular-storage"
    ]);

//myModule.config(function ($routeProvider) {
//    $routeProvider
//        .when("/", {
//        templateUrl: "src/angello/storyboard/tmpl/storyboard.html",
//        controller: "StoryboardCtrl",
//        controllerAs: "storyboard"
//        })
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
//        .otherwise({ redirectTo: "/"});
//});

myModule.controller("MainCtrl", function () {});