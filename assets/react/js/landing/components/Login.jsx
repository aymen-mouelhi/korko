/**
 * Created by Aymen Mouelhi (aymen.mouelhi@gmail.com) on 17/07/2015.
 */
/**
 * @jsx React.DOM
 */
/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */
/*global React */

var React = require('react');

var Login = React.createClass({

    render: function () {
        return (
            <div className="modal show" role="dialog" aria-hidden="false" aria-labelledby="login-modal-content"
                 aria-describedby="login-modal-content">
                <div className="modal-table">
                    <div className="modal-cell">
                        <div className="modal-content signup" id="login-modal-content">
                            <div className="modal-header panel-header show-sm">
                                Log In
                                <a href="#" className="modal-close" data-behavior="modal-close"></a>
                            </div>

                            <div className="alert alert-with-icon alert-error alert-header panel-header hidden-element"
                                 id="notice">
                                <i className="icon alert-icon icon-alert-alt"></i>
                            </div>

                            <div className="panel-padding panel-body">

                                <a href="/auth/facebook"
                                   className="fb-button fb-blue btn icon-btn btn-block btn-large row-space-1 btn-facebook"
                                   data-populate_uri="">
                                        <span className="icon-container">
                                            <i className="icon icon-facebook"></i>
                                        </span>
                                        <span className="text-container">
                                            Log in with Facebook
                                        </span>
                                </a>


                                <a href="/auth/google"
                                   className="btn icon-btn btn-block btn-large row-space-1 btn-google">
                                        <span className="icon-container">
                                            <i className="icon icon-google-plus"></i>
                                        </span>
                                        <span className="text-container">
                                            Log in with Google
                                        </span>
                                </a>


                                <div className="signup-or-separator">
                                    <h6 className="text signup-or-separator--text">or</h6>
                                    <hr/>
                                </div>

                                <form accept-charset="UTF-8" action="/auth/local" className="signin-form login-form"
                                      data-action="Signin" method="post">

                                    <input id="from" name="from" type="hidden" value="email_login"/>


                                    <div className="control-group row-space-1">
                                        <input className="decorative-input inspectletIgnore" id="signin_email"
                                               name="identifier" placeholder="Email Address" type="email"/>
                                    </div>
                                    <div className="control-group row-space-2">
                                        <input className="decorative-input inspectletIgnore" id="signin_password"
                                               name="password" placeholder="Password" type="password"/>
                                    </div>

                                    <div className="clearfix row-space-2">
                                        <label for="remember" className="checkbox remember-me">
                                            <input type="checkbox" name="remember" id="remember" value="true"
                                                   className="remember_me"/>
                                            Remember me
                                        </label>
                                        <a href="/reset" className="forgot-password pull-right">Forgot password?</a>
                                    </div>

                                    <button type="submit" className="btn btn-block btn-primary btn-large"
                                            id="user-login-btn">
                                        Log In
                                    </button>
                                </form>
                                <hr/>
                                <div className="text-left">
                                    Don't have an account?
                                    <a href="/signup_login" className="modal-link link-to-signup-in-login"
                                       data-modal-href="/signup_modal" data-modal-type="signup">
                                        Sign up
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Login;