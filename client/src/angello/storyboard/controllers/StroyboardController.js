/**
 * Created by wanjie on 2015/11/17.
 */
angular.module("Angello.Storyboard")
    .controller("StoryboardCtrl", function () {
        var storyboard = this;

        storyboard.currentStory = null;
        storyboard.editedStory = {};
        storyboard.setCurrentStory = function (story) {
            storyboard.currentStory = story;
            storyboard.editedStory = angular.copy(storyboard.currentStory);
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

    });