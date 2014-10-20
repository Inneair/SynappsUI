Ext.define('SynappsPackage.controller.SupervisorController', {
    extend: 'Ext.app.Controller',

    requires: [
        'SynappsPackage.Configuration',
        'SynappsPackage.service.AuthenticationManager',
        'SynappsPackage.service.AccountManager'
    ],

    uses: [
        'SynappsPackage.model.Credentials'
    ],

    /*models: [
        'Credentials'
    ],*/
    views: [
        'auth.Login'
    ],

    /**
     * @property {Ext.data.Session}
     * Shared session used by stores.
     */
    session: null,
    /**
     * @property {SynappsPackage.service.AuthenticationManager}
     * Authentication manager.
     */
    authenticationManager: null,
    /**
     * @property {SynappsPackage.service.AccountManager}
     * Account manager.
     */
    accountManager: null,
    /**
     * @property {SynappsPackage.view.Login}
     * Login window.
     */
    loginView: null,
    /**
     * @property {Object}
     * Original request options {@see Ext.Ajax.request() parameter}.
     */
    originalRequestOptions: null,
    /**
     * @property {String}
     * Message to display on login failure.
     */
    loginFailureMessage: 'Invalid username or password',

    /**
     * Listener when controller is instanciated. Create {Ext.data.Session} to share data between stores, instanciate
     * Authentication Manager and Account Manager and getcurrent account.
     */
    onLaunch: function() {
        /*Ext.Error.handle = function(err) {
            if (err.someProperty == 'NotReallyAnError') {
                // maybe log something to the application here if applicable
                return true;
            }
            // any non-true return value (including none) will cause the error to be thrown
        };*/

        this.session = Ext.create('Ext.data.Session', {
            autoDestroy: false
        });

        this.authenticationManager = Ext.create('SynappsPackage.service.AuthenticationManager', {
            urlLogin: SynappsPackage.Configuration.getUrlLogin(),
            urlLogout: SynappsPackage.Configuration.getUrlLogout()
        });
        this.authenticationManager.addListener({
            scope: this,
            unauthorized: this.onUnauthorized,
            loginsuccess: this.onLoginSuccess,
            logoutsuccess: this.onLogoutSuccess,
            loginfailure: this.onLoginFailure
        });

        this.accountManager = Ext.create('SynappsPackage.service.AccountManager', {
            urlGetAccount: SynappsPackage.Configuration.getUrlGetAccount()
        });
        this.accountManager.getCurrent(this.showUI, this);
    },

    /**
     * Listener on 'unauthorized' event fired by {SynappsPackage.service.AuthenticationManager}.
     * If no authentication process is already running, we create login window and display it. That login window take an
     * empty {SynappsPackage.model.Credentials} instance.
     *
     * @param {SynappsPackage.service.AuthenticationManager} authenticationManager
     * @param {Object} originalRequestOptions
     */
    onUnauthorized: function(authenticationManager, originalRequestOptions) {
        var me = this,
            credentials;

        if (me.loginView) {
            return;
        }

        this.originalRequestOptions = originalRequestOptions;
        credentials = Ext.create('SynappsPackage.model.Credentials');

        this.loginView = Ext.create('SynappsPackage.view.auth.Login');
        this.loginView.addListener({
            scope: me,
            login: me.onLogin
        });
        this.loginView.getController().setRecord(credentials);
        this.loginView.show();
    },

    /**
     * Listener on 'login' event fired by {SynappsPackage.view.auth.LoginController}.
     * Check credentials validity and {SynappsPackage.service.AuthenticationManager} to send credentials to server to
     * identify account. If credentials are invalid, we mark form as invalid.
     *
     * @param {SynappsPackage.model.Credentials} credentials
     */
    onLogin: function(credentials){
        this.authenticationManager.login(credentials, this.originalRequestOptions);
    },

    /**
     * Listener on 'loginsuccess' event fired by {SynappsPackage.service.AuthenticationManager}.
     * Destroy login window.
     */
    onLoginSuccess: function(){
        // TODO manually delete credentials ?
        this.loginView.close();
        delete this.loginView;
        this.loginView = null;
        delete this.originalRequestOptions;
        this.originalRequestOptions = null;
    },

    /**
     * Listener on 'loginfailure' event fired by {SynappsPackage.service.AuthenticationManager}.
     * Set a global error message in login window.
     */
    onLoginFailure: function(){
        this.loginView.getController().setErrors([this.loginFailureMessage]);
    },

    /**
     * Listener on 'logoutsuccess' event fired by {SynappsPackage.service.AuthenticationManager}.
     * Reload page.
     */
    onLogoutSuccess: function(){
        window.location.reload();
    },

    /**
     * @method
     * @template
     * Called automatically when getting account succeeded.
     */
    showUI: Ext.emptyFn
});
