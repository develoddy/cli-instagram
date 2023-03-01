(function ($) {

    
    var token = localStorage.getItem("usertoken");
    

    if ( token ) {

    } else {
        console.log("No hay token");
        $('#hideHeader').hide();
        $('#sidebarWrapper').hide();
        $('#containerFluid').hide();
        
        
    }


    // USERS
    $( "#users" ).click( function() { 
        $(location).attr('href', 'http://localhost:4200/users');
    }); 

    // SOCIAL APP
    $( "#social-app" ).click( function() { 
        $(location).attr('href', 'http://localhost:4200/social-app');
    }); 

    // LOG OUT
    $( "#logout").click( function() { 
        localStorage.clear();
        $(location).attr('href', '/');
    });

})(jQuery);