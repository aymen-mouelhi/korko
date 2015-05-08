requirejs.config({
    paths: {
      'jsx': '/bower_components/requirejsx/jsx', //needed if jsx not compiled on server
      'JSXTransformer': '/bower_components/react/JSXTransformer',
      'react': '/bower_components/react/react.min',
      'jquery': '/bower_components/jquery/dist/jquery',
      'jquery.timeago': '/bower_components/jquery-timeago/jquery.timeago',  
      'showdown': '/bower_components/showdown/compressed/showdown',  
      'bootstrap': '/bower_components/bootstrap/dist/js/bootstrap',
      'app': '/linker/js'
    },

    shim: {
        'JSXTransformer': {
            exports: "JSXTransformer"
        }, 
        'jquery.timeago': ["jquery"]
    }
});


require(['jquery', 'react', 'app/CommentForm', 'app/CommentList'], 
  function ($, React, CommentForm, CommentList) {


  $(function whenDomIsReady() {

      React.renderComponent(
        CommentForm({url: '/comment'}),
        document.getElementById('commentForm')
      );

      // as soon as this file is loaded, connect automatically, 
      var socket = io.connect();
      
      console.log('Connecting to Sails.js...');

      socket.on('connect', function socketConnected() {

        // Subscribe to updates (a sails get or post will auto subscribe to updates)
        socket.get('/comment', function (message) {
          console.log('Listening...');

          // initialize the view with the data property
          React.renderComponent(
            CommentList({url: '/comment', data:message}),
            document.getElementById('commentList')
          );

        });

      });

      // Expose connected `socket` instance globally so that it's easy
      // to experiment with from the browser console while prototyping.
      window.socket = socket;

  });
  

});