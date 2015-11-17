/**
 * Created by wanjie on 2015/11/17.
 */
var myModule = angular.module("Angello",
    [
        "ngRoute",
        "ngAnimate",
        "firebase",
        "ngMessages",
        "Angello.Common",
        "Angello.Dashboard",
        "Angello.Login",
        "Angello.Storyboard",
        "Angello.User",
        "auth0",
        "angular-jwt",
        "angular-storage"
    ]);

myModule.config(function ($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "src/angello/storyboard/tmpl/storyboard.html",
        controller: "StoryboardCtrl",
        controllerAs: "storyboard"
    });
});