Ext.define('SynappsPackage.Configuration', {
    singleton: true,

    config: {
        /**
         * @property {String}
         * Message to display on login failure.
         */
        urlLogin: '/admin/login_check',
        /**
         * @property {String}
         * Message to display on login failure.
         */
        urlLogout: '/admin/logout',
        /**
         * @property {String}
         * Message to display on login failure.
         */
        urlGetAccount: '/admin/account'
    },

    constructor: function(config) {
        this.initConfig(config);

        return this;
    }
});
