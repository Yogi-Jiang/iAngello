/**
 * Created by wanjie on 2015/11/27.
 */
angular.module("Angello.User")
    .controller("UserCtrl", function ($routeParams, user, stories) {
        var myUser = this;
        myUser.userId = $routeParams["userId"];
        myUser.user = user;
    });