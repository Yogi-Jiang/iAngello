/**
 * Created by wanjie on 2015/11/21.
 */
angular.module("Angello.Common")
    .service("LoadingService",function ($rootScope) {
        var service = this;

        service.setLoading = function (loading) {
            $rootScope.loadingView = loading;
        };
    });
