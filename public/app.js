
//var routerApp = angular.module('routerApp', []);



var routerApp = angular.module('routerApp', ['ui.router','ngStorage',
    function (){



        //history.pushState(null,null,'#hashexample');

        $(document).on('click', '.nav a', function(event) {
            event.preventDefault();
            history.pushState({}, '', this.href);
        });
        $(document).ready(function() {


             // recupere la derniere position de menu pour refresh page
            if(localStorage.getItem("topmenuposition"))
            {
                lastposition=localStorage.getItem("topmenuposition");
                lastwidth=localStorage.getItem("topmenuwidth");
                activetopmenuid=localStorage.getItem("topmenuid");
                $('#choixselection').css({'left':lastposition,'width':lastwidth});
                $(".nav").removeClass("active",500);
                $("#"+activetopmenuid).addClass("active",500);

            }





            // Controlleur pour la petite animation quand on clique sur un lien
            $(".nav").click(function() {

                var choice=this;
                left = $(choice).offset().left -10;
                console.log(choice.id);

                $(".nav").removeClass("active",500);
                $(choice).addClass("active",500);

                newwidth = $(choice).width() + 35 ;
                localStorage.setItem("topmenuposition",left);
                localStorage.setItem("topmenuwidth",newwidth);
                localStorage.setItem("topmenuid",choice.id);

                position_difference=$('#choixselection').offset().left-left;

                // si la boite se deplace de droite a gauche
                if(position_difference>0)
                {

                    $('#choixselection').animate({'left':left+50,
                        'height': 10,
                        'top':20,
                   // 'background-color':'#FF810F'
                        },150,function(){

                        $('#choixselection').animate({'left':left,
                            'width': newwidth,
                            height: 40,
                            top:3,
                           // 'background-color':'#ac1416'
                        },150);
                    });

                }

                // si la boite se deplace de gauche a droite
                else {


                    $('#choixselection').animate({
                        'left': left-50,
                        'height': 10,
                        'top': 20,
                       // 'background-color':'#FF810F'
                    }, 150, function () {

                        $('#choixselection').animate({
                            'left': left,
                            'width': newwidth,
                            height: 40,
                            top: 3,
                         //   'background-color':'#ac1416'
                        }, 150);
                    });

                }




            });




        });

    }]);









routerApp.config(function($stateProvider, $urlRouterProvider,$locationProvider) {


    $urlRouterProvider.otherwise('/home');
    $locationProvider.html5Mode(true);

    $stateProvider


    // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl:  '/partialhome/partial-home.html',
            controller: 'partialhome_Ctrl'
        })

        .state('accueil', {
            url: 'partialhome//home',
            templateUrl: 'partial-home.html',
            controller: 'partialhome_Ctrl'
        })

        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('timelineadmin', {

            url: '/timelineadmin',
            templateUrl:'timeline_admin/timeline_admin.html',
            controller: "timeline_adminCtrl",

        })

        .state('notecardadmin', {
            url: '/timenoteadmin',
            templateUrl: 'timenote_admin/timenote_admin.html',
            controller: 'timenote_adminCtrl',

        })

        .state('userlogin', {
            url: '/logins',
            templateUrl: 'login/user_login.html',
            controller: 'userlogin_Ctrl',

        })

        .state('vuesimple', {
            url: '/vuesimples',
            templateUrl: '/vuesimple/vuesimple.html',
            controller: 'vuesimple_Ctrl',
        })


        .state('vueavancee', {
            url: '/vueavancees',
            templateUrl: '/vueAvancee/vueavancee.html',
            controller: 'vueavancee_Ctrl',
        });

});



// ---------------------------Ici tous les controleurs des pages-----------------------------


// Charge les menu d'administration si ADMIN est connecté
function connexionEtDeconnexionOnLoad2($scope,$http){








    // affiche les menu si client connecté sinon change l'url et le menu

    $http.get('/api/password').
    success(function(data1) {
        console.log("getted successfully");
        console.log(data1);

        if(sessionStorage.getItem("state")=="connected"){
            $('#loginpasconnecte').hide();
            $('#vousetesconnecte').show();
            $('.menuconnecte').show();

            $("#connectButton").html("Déconnecter");

            // event deconnexion on change la valeur token
            document.getElementById("connectButton").addEventListener("click", function(){
                sessionStorage.setItem("state", "disconnected");

                var vide={"rien":"levide"};
                //envoie un mot de pass vide pour deconnexion
                $http.post('/api/password',vide).
                success(function(data) {
                    console.log("deconnect successfully");

                }).error(function(data) {
                    console.error("error in disconnect");
                });



                console.log("deconnecte");
                //connectionmembre = localStorage.setItem("leclientAdminZestConnecteeesimilikrypt_token_asodhu643uy43bfjh","ggg");
                document.location.href = "/logins"
            });

        }
        else
        {



            console.log("do nothing not connected");
            $('#loginpasconnecte').show();
            $('#vousetesconnecte').hide();
            $('.menuconnecte').hide();


            // ici on renvoie les utilisateur non autorisé sur les page d'admin
            // vers la page de connexion
            if(lastsegment=="timelineadmin" || lastsegment=="notecardadmin" || lastsegment=="timenoteadmin")
                location.href="/logins";
            // alert(lastsegment);
        }




    }).error(function(data1) {
        console.error("error in getting");
    });




}






