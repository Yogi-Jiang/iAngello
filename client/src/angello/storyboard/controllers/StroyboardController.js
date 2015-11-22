/**
 * Created by wanjie on 2015/11/17.
 */
angular.module("Angello.Storyboard")
    .controller("StoryboardCtrl", function (STORY_TYPES) {//, StoriesModel, $log
        var storyboard = this;

        storyboard.currentStory = null;
        storyboard.editedStory = {};

        //storyboard.getStories = function () {
        //    StoriesModel.all()
        //        .then(function (result) {
        //            storyboard.stories = (result !== "null") ? result : {};
        //            $log.debug("RESULT", result);
        //        }, function (reason) {
        //            $log.debug("REASON", reason);
        //        });
        //};

        storyboard.deleteStory = function (storyId) {
            var arr = storyboard.stories;
            for (var i = 0, len = arr.length; i < len; i++) {
                if (arr[i].id == storyId) {
                    arr.splice(i, 1);
                }
            }
            storyboard.resetForm();
        };

        function ID() {
            return "_" + Math.random.toString().substring(2,9);
        }

        storyboard.createStory = function () {
            var newStory = angular.copy(storyboard.editedStory);
            newStory.id = ID();
            storyboard.stories.push(newStory);
            storyboard.resetForm();
        };

        storyboard.setCurrentStory = function (story) {
            storyboard.currentStory = story;
            storyboard.editedStory = angular.copy(storyboard.currentStory);
        };

        storyboard.updateStory = function () {
            var fields = ["title", "description", "criteria", "status", "type", "reporter", "assignee"];
            fields.forEach(function(field) {
                storyboard.currentStory[field] = storyboard.editedStory[field];
            });
            storyboard.resetForm();
        };

        storyboard.updateCancel = function () {
            storyboard.resetForm();
        };

        storyboard.resetForm = function () {
            storyboard.currentStory = null;
            storyboard.editedStory = {};

            storyboard.detailsForm.$setPristine();
            storyboard.detailsForm.$setUntouched();
        };

        storyboard.stories = [
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
            }
        ];

        storyboard.statuses = [
            {name: 'To Do'},
            {name: 'In Progress'},
            {name: 'Code Review'},
            {name: 'QA Review'},
            {name: 'Verified'}
        ];

        storyboard.types = STORY_TYPES;

        storyboard.users = [
            {
                id: "1",
                name: "yogi.jiang"
            },
            {
                id: "2",
                name: "someone"
            }
        ];
    });