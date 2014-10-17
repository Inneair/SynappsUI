/**
 * Manage connected account.
 */
Ext.define('SynappsPackage.service.AccountManager', {
    mixins: {
        observable: 'Ext.util.Observable'
    },

    uses: [
        'SynappsPackage.model.Account'
    ],

    /**
     * @event unauthorized
     * Fires after the window has been visually activated via {@link #setActive}.
     * @param {SynappsPackage.service.AccountManager} this
     */

    config: {
        /**
         * @cfg {string} urlLogin
         * URL to check credential login. Must send HTTP_STATUS_CODE_UNAUTHORIZED if failure,
         * HTTP_STATUS_CODE_NO_CONTENT in success
         */
        urlGetAccount: null
    },

    /**
     * @property {SynappsPackage.model.Account}
     * Current connected account.
     */
    account: null,

    constructor: function (config) {
        this.initConfig(config);
        this.mixins.observable.constructor.call(this, config);
    },

    /**
     * Get current connected account from {@link #urlGetAccount} url.
     *
     * @param callback
     * @param scope
     */
    getCurrent: function(callback, scope){
        var me = this;
        Ext.Ajax.request({
            url: this.getUrlGetAccount(),
            method: 'GET',
            scope: scope,
            success: function(response, options){
                me.onAccount.apply(me, arguments);
                callback.call(scope);
            }
        });
    },

    /**
     * Listener on success operation when request current connected account.
     *
     * @param {Object} response The XMLHttpRequest object containing the response data.
     */
    onAccount: function(response) {
        var account = Ext.decode(response.responseText);
        this.setAccount(account);
    },

    /**
     * Instantiate Account model with given data object and store it as AccountManager property.
     *
     * @param {Object} account
     */
    setAccount: function(account) {
        this.account = Ext.create('SynappsPackage.model.Account', account);
    }
});
