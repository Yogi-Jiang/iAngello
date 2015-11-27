/**
 * Created by wanjie on 2015/11/17.
 */
angular.module("Angello.Common")
    .service("StoriesModel", function ($http) {//, EndpointConfigService, UtilsService
        var service = this;
        var MODEL = "/stories/";

        //service.all = function () {
        //    return $http.get(EndpointConfigService.getUrl(
        //        MODEL + EndpointConfigService.getCurrentFormat()
        //    )).then(function (result) {
        //        return UtilsService.objectToArray(result);
        //    });
        //};
        //
        //service.fetch = function (story_id) {
        //    return $http.get(EndpointConfigService.getUrlForId(MODEL, story_id))
        //        .then(function (result) {
        //            return result;
        //        });
        //};
        //
        //service.create = function (story) {
        //    return $http.post(EndpointConfigService.getUrl(MODEL + EndpointConfigService.getCurrentFormat()), story);
        //};
        //
        //service.update = function (story_id, story) {
        //    return $http.put(EndpointConfigService.getUrlForId(MODEL, story_id), story);
        //};
        //
        //service.destroy = function (story_id) {
        //    return $http.delete(EndpointConfigService.getUrlForId(MODEL, story_id));
        //};

        service.stories = [
            {
                "assignee": "1",
                "criteria": "It tests!",
                "description": "This is a test",
                "id": "1",
                "reporter": "2",
                "status": "To Do",
                "title": "First Story",
                "type": "Spike"
            },
            {
                "assignee": "2",
                "criteria": "It works!",
                "description": "testing something",
                "id": "2",
                "reporter": "1",
                "status": "In Progress",
                "title": "Second Story",
                "type": "Enhancement"
            },
            {
                "assignee": "3",
                "criteria": "It works!",
                "description": "testing something",
                "id": "3",
                "reporter": "3",
                "status": "In Progress",
                "title": "Third Story",
                "type": "Enhancement"
            }
        ];
    });