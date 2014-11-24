"use strict";

angular.module('inneair.origami.editor').factory(
    'Page',
    function PageFactory() {
        function Page(data) {
            this.id = null;
            this.name = null;
            this.online = false;

            for (var property in this) {
                if (data.hasOwnProperty(property)) {
                    this[property] = data[property];
                }
            }
        }

        Page.prototype.trace = function() {
            return 'Page {id=' + this.id + ', name=' + this.name + ', online=' + this.online + '}';
        };

        return Page;
    }
);
