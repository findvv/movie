require('child_process').exec( 'phantomjs /root/f4/reptile/music.js' , function(err, stdout , stderr ) {
    console.log( err );
});