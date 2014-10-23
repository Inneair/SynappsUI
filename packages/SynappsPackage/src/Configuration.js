Ext.define('SynappsPackage.Configuration', {

    config: {
        /**
         * @property {String}
         * Application base path.
         */
        basePath: '',
        /**
         * @property {String}
         * Path to get an account.
         */
        getAccountPath: '/admin/account',
        /**
         * @property {String}
         * Path to login a user.
         */
        loginPath: '/admin/login_check',
        /**
         * @property {String}
         * Path to logout a user.
         */
        logoutPath: '/admin/logout'
    },

    /**
     * Builds configuration for the package. If there is a 'meta' element in the document having the name
     * 'synapps-base', it will be used to prefix all generated paths.
     */
    constructor: function(config) {
        var baseElements = document.getElementsByName('synapps-base');
        if ((baseElements.length === 1) && (baseElements[0].tagName === 'META')) {
            if (typeof config !== 'object') {
                config = {};
            }
            config.basePath = baseElements[0].content;
        }
        this.initConfig(config);
        return this;
    },

    /**
     * Prepends the application base path to the updated path to get an account.
     * @return {String} Path.
     */
    applyGetAccountPath: function(getAccountPath) {
        return this.getBasePath() + getAccountPath;
    },

    /**
     * Prepends the application base path to the updated path to login.
     * @return {String} Path.
     */
    applyLoginPath: function(loginPath) {
        return this.getBasePath() + loginPath;
    },

    /**
     * Prepends the application base path to the updated path to logout.
     * @return {String} Path.
     */
    applyLogoutPath: function(logoutPath) {
        return this.getBasePath() + logoutPath;
    }
});
