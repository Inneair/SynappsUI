/**
 * Catch ajax request exceptions and fire event if an unauthorized code status is send (401).
 */
Ext.define('SynappsPackage.service.AuthenticationManager', {
    mixins: {
        observable: 'Ext.util.Observable'
    },

    /**
     * @event unauthorized
     * Fires after an ajax exception has been thrown with {@link #HTTP_STATUS_CODE_UNAUTHORIZED}.
     * @param {SynappsPackage.service.AuthenticationManager} this
     * @param {Object} original request options {@see Ext.Ajax.request() parameter}
     */

    /**
     * @event loginsuccess
     * Fires after login request success.
     * @param {SynappsPackage.service.AuthenticationManager} this
     */

    /**
     * @event loginfailure
     * Fires after login request failure.
     * @param {SynappsPackage.service.AuthenticationManager} this
     * @param {Object} request options {@see Ext.Ajax.request() parameter} with original request options that fire
     * 'unauthorized' event, set as 'originalRequestOptions' property.
     * @param {Object} response {@see Ext.Ajax.request() parameter}
     */

    /**
     * @event logoutsuccess
     * Fires after logout request success.
     * @param {SynappsPackage.service.AuthenticationManager} this
     */

    config: {
        /**
         * @cfg {string} loginPath
         * URL to check credential login. Must send HTTP_STATUS_CODE_UNAUTHORIZED if failure,
         * HTTP_STATUS_CODE_NO_CONTENT in success
         */
        loginPath: null,

        /**
         * @cfg {string} logoutPath
         * URL to logout. Must send HTTP_STATUS_CODE_NO_CONTENT in success (operation success, already logout,
         * connection not found, etc.)
         */
        logoutPath: null
    },

    HTTP_STATUS_CODE_NO_CONTENT: 204,
    HTTP_STATUS_CODE_UNAUTHORIZED: 401,

    constructor: function (config) {
        this.initConfig(config);
        this.mixins.observable.constructor.call(this, config);

        Ext.Ajax.on('requestexception', this.onAjaxRequestException, this);
    },

    /**
     * Listener on error HTTP status returned from the server. This event may also
     * be listened to in the event that a request has timed out or has been aborted.
     * See [HTTP Status Code Definitions](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html)
     * for details of HTTP status codes.
     *
     * @param {Ext.data.Connection} connection This Connection object.
     * @param {Object} response The XHR object containing the response data.
     * See [The XMLHttpRequest Object](http://www.w3.org/TR/XMLHttpRequest/) for details.
     * @param {Object} options The options config object passed to the {@link #request} method.
     */
    onAjaxRequestException: function(connection, response, options){
        var me = this,
            status = response.status;

        // [HTTP Status Code Definitions 401](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.2)
        // TODO need to intercept or store chalenge to compare ?
        if ((status == me.HTTP_STATUS_CODE_UNAUTHORIZED) && (options.url != me.getLoginPath())) {
            me.fireEvent('unauthorized', me, options);
            // TODO cancel further Ajax requests ? need to know then protected urls ? remove this on login success ?
        }
    },

    /**
     * Send credentials data to {@link #loginPath} to log in user.
     *
     * @param {SynappsPackage.model.Credentials} credentials
     * @param {Object} originalRequestOptions The options config object passed to the original {@link #request} method,
     * that raised the 'unauthorized' exception.
     */
    login: function(credentials, originalRequestOptions){
        var data = credentials.data;
        delete data.id;

        // [HTTP Status Code Definitions 401](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.2)
        // TODO send cendentials with Authorization header field ?
        Ext.Ajax.request({
            url: this.getLoginPath(),
            params: data,
            scope: this,
            callback: this.onLoginReturn,
            originalRequestOptions: originalRequestOptions
        });
    },

    /**
     * @private
     * Callback handler for the login function. If the login succeeded (204 status code response),
     * the original request is run again, and the 'loginsuccess' event is fire. In case of failure
     * (401 status code response), the 'loginfailure' event is fire. In any other case, an error is raised.
     *
     * @param {Object} options The parameter to the request call.
     * @param {Boolean} success True if the request succeeded.
     * @param {Object} response The XMLHttpRequest object containing the response data.
     * See [www.w3.org/TR/XMLHttpRequest/](http://www.w3.org/TR/XMLHttpRequest/) for details about
     * accessing elements of the response.
     */
    onLoginReturn: function(options, success, response) {
        var me = this,
            status = response.status;

        if (status == me.HTTP_STATUS_CODE_NO_CONTENT) {
            me.fireEvent('loginsuccess', me);
            Ext.Ajax.request(options.originalRequestOptions);
            return;
        }

        if (status == me.HTTP_STATUS_CODE_UNAUTHORIZED) {
            me.fireEvent('loginfailure', me, options, response);
            return;
        }

        Ext.Error.raise({
            msg: 'Invalid response status get back from ' + me.getLoginPath() + ' when login.',
            reponse: response
        });
    },

    /**
     * Call {@link #logoutPath} to log out user.
     */
    logout: function(){
        Ext.Ajax.request({
            url: this.getLogoutPath(),
            method: 'GET',
            scope: this,
            callback: this.onLogoutReturn
        });
    },

    /**
     * @private
     * Callback handler for the login function. If the login succeeded (204 status code response),
     * the original request is run again, and the 'loginsuccess' event is fire. In case of failure
     * (401 status code response), the 'loginfailure' event is fire. In any other case, an error is raised.
     *
     * @param {Object} options The parameter to the request call.
     * @param {Boolean} success True if the request succeeded.
     * @param {Object} response The XMLHttpRequest object containing the response data.
     * See [www.w3.org/TR/XMLHttpRequest/](http://www.w3.org/TR/XMLHttpRequest/) for details about
     * accessing elements of the response.
     */
    onLogoutReturn: function(options, success, response) {
        var me = this;

        if (success) {
            me.fireEvent('logoutsuccess', me);
            Ext.Ajax.request(options.original);
            return;
        }

        Ext.Error.raise({
            msg: 'Invalid response get back from ' + me.getLogoutPath() + ' when logout.',
            reponse: response
        });
    }
});
