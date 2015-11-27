/**
 * Created by wanjie on 2015/11/27.
 */
angular.module("Angello.Common")
    .service("UsersModel", function () {
        var users = this;
        users.users = [
            {
                id: "1",
                name: "yogi.jiang"
            },
            {
                id: "2",
                name: "someone"
            }
        ];

        users.fetch = function (userId) {
            for (var i = 0, len = users.users.length; i < len; i++) {
                var user = users.users[i];
                if (user.id == userId) return user;
            }
            return null;
        };
    });