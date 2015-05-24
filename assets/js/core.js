/**
 * Created by Aymen Mouelhi (aymen.mouelhi@gmail.com) on 08/05/2015.
 */
/*
 $(document).ready(function(){
 // login
 $("#login").click(function(){
 $("#login-dialog").addClass("show");
 $("#signup-dialog").addClass("hide");
 });
 // Sign Up
 $("#sign_up").click(function(){
 $("#login-dialog").addClass("hide");
 $("#signup-dialog").addClass("show");
 });
 });
 */

requirejs.config({
    paths: {
        'react': '/bower_components/react/react-with-addons',
        'react-autosize': '/bower_components/react-input-autosize/dist/react-input-autosize.min',
        'classes': '/bower_components/classnames/index.js'
    }
});

requirejs(["react", "classes", "react-autosize"], function (React, classNames, AutosizeInput) {
    //This function is called when scripts/helper/util.js is loaded.
    //If util.js calls define(), then this function is not fired until
    //util's dependencies have loaded, and the util argument will hold
    //the module value for "helper/util".
    // Store Global Variable React
    window.React = React;
    window.AutosizeInput = AutosizeInput;
    window.classNames = classNames;
});