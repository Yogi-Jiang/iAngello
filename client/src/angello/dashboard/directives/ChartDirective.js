/**
 * Created by wanjie on 2015/11/25.
 */
angular.module("Angello.Dashboard")
    .directive("chart", function () {
        var parseDataForCharts = function (sourceArray, sourceProp, referenceArray, referenceProp) {
            var data = [];

            var json = {};
            for (var i = 0; i < referenceArray.length; i++) {
                for (var j = 0; j < sourceArray.length; j++) {
                    if (sourceArray[j][sourceProp] == referenceArray[i][referenceProp]) {
                        if (json[referenceArray[i][referenceProp]]) {
                            json[referenceArray[i][referenceProp]]++;
                        } else {
                            json[referenceArray[i][referenceProp]] = 1;
                        }
                    }
                }
                if (!json[referenceArray[i][referenceProp]]) json[referenceArray[i][referenceProp]] = 0;
                data.push([referenceArray[i][referenceProp],json[referenceArray[i][referenceProp]]]);
            }

            return data;
        };

        var linker = function (scope, element, attrs) {

        };
        var controller = function ($scope) {

        };
        return {
            restrict: "A",
            controller: controller,
            link: linker
        }
    });