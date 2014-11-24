'use strict';

angular.module('inneair.origami.editor').provider(
    'PageStore',
    function PageStoreProvider() {
        this.resourceUrl = null;

        this.setResourceUrl = function(resourceUrl) {
            this.resourceUrl = resourceUrl;
        };

        this.$get = ['$resource', 'Page', function PageStoreFactory($resource, Page) {
            function PageStore(data) {
                this.resource = null;
                this.pages = [];
    
                if (data.hasOwnProperty('resource')) {
                    this.resource = data.resource;
                }
            }

            PageStore.prototype.reload = function() {
                var self = this;
                self.resource.query(function(pages) {
                    self.pages.clear();
                    for (var i = 0; i < pages.length; i++) {
                        self.pages.push(new Page(pages[i]));
                    }
                });
            };

            return new PageStore({resource: $resource(this.resourceUrl)});
        }];
    }
);
