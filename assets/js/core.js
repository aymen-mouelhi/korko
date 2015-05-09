/**
 * Created by I060307 on 08/05/2015.
 */
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