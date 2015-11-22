/**
 * Created by wanjie on 2015/11/22.
 */
angular.module("Angello.Storyboard")
    .directive("dragContainer", function () {
        return {
            restrict: "A",
            controller: "DragContainerController",
            controllerAs: "dragContainer",
            link: function ($scope, $element, $attrs, dragContainer) {
                dragContainer.init($element);

                $element.on("dragstart", dragContainer.handleDragStart.bind(dragContainer));
                $element.on("dragend", dragContainer.handleDragEnd.bind(dragContainer));

                $scope.$watch("$attrs.dragContainer", dragContainer.updateDragData.bind(dragContainer));
                $attrs.$observe("mimeType", dragContainer.updateDragType.bind(dragContainer));
                $attrs.$set("draggable", true);
            }
        };
    })
    .controller("DragContainerController", function ($dragging) {
        var dragContainer = this;

        dragContainer.init = function (el) {
            dragContainer.el = el;
        };

        dragContainer.handleDragStart = function (e) {
            if (e.originalEvent) e = e.originalEvent;

            e.dataTransfer.dropEffect = "move";
            e.dataTransfer.effectAllowed = "move";

            dragContainer.el.addClass("drag-container-active");
            dragContainer.dragging = true;

            $dragging.setData(dragContainer.data);
            $dragging.setType(dragContainer.type);
        };

        dragContainer.handleDragEnd = function (e) {
            if (e.originalEvent) e = e.originalEvent;

            angular.element(e.target).removeClass("drag-active");
            dragContainer.el.removeClass("drag-container-active");
            dragContainer.dragging = false;

            $dragging.setData(null);
            $dragging.setType(null);
        };

        dragContainer.updateDragData = function (data) {
            dragContainer.data = data;

            if (dragContainer.dragging) {
                $dragging.setData(dragContainer.data);
            }
        };

        dragContainer.updateDragType = function (type) {
            dragContainer.type = type || "text/x-drag-and-drop";

            if (dragContainer.dragging) {
                $dragging.setType(dragContainer.type);
            }
        };
    })
    .factory("$dragging", function () {
        var data = null;
        var type = null;

        return {
            getData: function () {
                return data;
            },
            getType: function () {
                return type;
            },
            setData: function (data) {
                data = data;
                return data;
            },
            setType: function (type) {
                type = type;
                return type;
            }
        };
    });