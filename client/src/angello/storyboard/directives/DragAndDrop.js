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
    .directive("dropContainer", function ($document, $parse) {
        return {
            restrict: "A",
            controller: "DropContainerController",
            controllerAs: "dropContainer",
            link: function ($scope, $element, $attrs, dropContainer) {
                var bindTo = function (event) {
                    return function (e) {
                        return $scope.$apply(function () {
                            return dropContainer["handle" + event](e);
                        });
                    };
                };
                var dragEnd = dropContainer.handleDragEnd.bind(dropContainer);
                var handleDragEnter = bindTo("DragEnter");
                var handleDragOver = bindTo("DragOver");
                var handleDragLeave = bindTo("DragLeave");
                var handleDrop = bindTo("Drop");

                //$parse出来的到底是什么鬼
                dropContainer.init($element, $scope, {
                    onDragEnter: $parse($attrs.onDragEnter),
                    onDragOver: $parse($attrs.onDragOver),
                    onDragLeave: $parse($attrs.onDragLeave),
                    onDrop: $parse($attrs.onDrop)
                });

                //接收拖拽的对象也有dragenter等事件？
                /*
                * 解答：
                * drag、dragstart、dragend 是被拖拽的对象身上触发的事件
                * dragenter、dragleave、dragover、drop是接收拖拽的对象身上的事件
                *
                * */
                $element.on("dragenter", handleDragEnter);
                $element.on("dragover", handleDragOver);
                $element.on("dragleave", handleDragLeave);
                $element.on("drop", handleDrop);

                $scope.$watch($attrs.accepts, dropContainer.updateMimeTypes.bind(dropContainer));
                $document.on("dragend", dragEnd);

                $scope.on("$destroy", function () {
                    $document.off("dragend", dragEnd);
                });
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
    .controller("DropContainerController", function ($dragging) {
        var dropContainer = this;
        var targets = {};
        //这是什么鬼
        var validAnchors = "center top top-right right bottom-right bottom bottom-left left top-left".split(" ");
        dropContainer.init = function (el, scope, callbacks) {
            dropContainer.el = el;
            dropContainer.scope = scope;
            dropContainer.callbacks = callbacks;
            dropContainer.accepts = ["text/x-drag-and-drop"];
            dropContainer.el.addClass("drop-container");
        };

        dropContainer.addDropTarget = function (anchor, dropTarget) {
            if (validAnchors.indexOf(anchor) < 0) {
                throw new Error("Invalid anchor point " + anchor);
            }
            if (targets[anchor]) {
                throw new Error("Duplicate drop targets for the anchor " + anchor);
            }
            targets[anchor] = dropTarget;
        };

        dropContainer.removeDropTarget = function (anchor) {
            //targets[anchor] === anchor??
            if (targets[anchor] && targets[anchor] === anchor) {
                dropContainer.activeTarget = null;
            }
            delete targets[anchor];
        };

        dropContainer.updateMimeTypes = function (mimeTypes) {
            if (!mimeTypes) mimeTypes = ["text/x-drag-and-drop"];
            if (!angular.isArray(mimeTypes)) mimeTypes = [mimeTypes];
            dropContainer.accepts = mimeTypes;
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