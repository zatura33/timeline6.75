
//var routerApp = angular.module('routerApp', []);
var routerApp = angular.module('routerApp', ['ui.router']);

/*  TOUT PRES D'Y ARRIVÉÉÉÉ ****** connection ng IF
routerApp.controller('routerApp'['clientId', function($scope) {

    $scope.etablieConnexion=function(){
        if (clientId =="a12345654321x")
            return true;
        else
            return false;
    }

    }
]);*/









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























// --------------------------------LES FONCTIONS ---------------------------------------------
// Charge les menu d'administration si ADMIN est connecté
function connexionEtDeconnexionOnLoad($scope){

    // affiche les menu si client connecté sinon change l'url
    connectionmembre=localStorage.getItem("leclientAdminZestConnecteeesimilikrypt_token_asodhu643uy43bfjh");


    // section d'administration si client connecte créer en js dans le DOM
    // link =  timelineadmin
    $scope.link = document.createElement('a');
    $scope.link.textContent = 'Gérer les époque';
    $scope.link.href = 'timelineadmin';

    //link2=timenoteadmin
    $scope.link2 = document.createElement('a');
    $scope.link2.textContent = 'Gérer les évenement';
    $scope.link2.href = 'timenoteadmin';

    // bouton de déconnexion
    $scope.disconnectbutton = document.createElement("button");        // Create a <button> element
    $scope.disconnectbutton.textContent="Se déconnecter";
    $scope.disconnectbutton.className= "buttonSoft";
    $scope.disconnectbutton.id="deconnectionButton";// Create  text


    //$scope.disconnectbutton.setAttribute("id", "deconnectionButton");
    // $scope.disconnectbutton.id = deconnectionButton;
    if(connectionmembre=="cccc78654630opfds")
    {

        document.getElementById('litimelineadmin').innerHTML="";
        document.getElementById('litimelineadmin').appendChild($scope.link);

        document.getElementById('litimenoteadmin').innerHTML="";
        document.getElementById('litimenoteadmin').appendChild($scope.link2);

        document.getElementById('loginsection').innerHTML="";
        document.getElementById('loginsection').appendChild($scope.disconnectbutton);

        // event deconnexion on change la valeur token
        document.getElementById("deconnectionButton").addEventListener("click", function(){
            console.log("deconnecte");
            connectionmembre = localStorage.setItem("leclientAdminZestConnecteeesimilikrypt_token_asodhu643uy43bfjh","ggg");
            document.location.href = "/home"
        });

    }
    else
    {
        console.log("do nothing");
    }


}


// Charge les menu d'administration si ADMIN est connecté
function connexionEtDeconnexionOnLoad2($scope,$http){

    // affiche les menu si client connecté sinon change l'url et le menu

    $http.get('/api/password').
    success(function(data1) {
        console.log("getted successfully");
        console.log(data1);

        if(data1=='est connecté                        .'){
            $('#pasconnecte').hide();
            $('#vousetesconnecte').show();


            // section d'administration si client connecte créer en js dans le DOM
            // link =  timelineadmin
            $scope.link = document.createElement('a');
            $scope.link.textContent = 'Gérer les époque';
            $scope.link.href = 'timelineadmin';

            //link2=timenoteadmin
            $scope.link2 = document.createElement('a');
            $scope.link2.textContent = 'Gérer les évenement';
            $scope.link2.href = 'timenoteadmin';

            // bouton de déconnexion
            $scope.disconnectbutton = document.createElement("button");        // Create a <button> element
            $scope.disconnectbutton.textContent="Se déconnecter";
            $scope.disconnectbutton.className= "buttonSoft";
            $scope.disconnectbutton.id="deconnectionButton";// Create  text


            //$scope.disconnectbutton.setAttribute("id", "deconnectionButton");
            // $scope.disconnectbutton.id = deconnectionButton;



            document.getElementById('litimelineadmin').innerHTML="";
            document.getElementById('litimelineadmin').appendChild($scope.link);

            document.getElementById('litimenoteadmin').innerHTML="";
            document.getElementById('litimenoteadmin').appendChild($scope.link2);

            document.getElementById('loginsection').innerHTML="";
            document.getElementById('loginsection').appendChild($scope.disconnectbutton);

            // event deconnexion on change la valeur token
            document.getElementById("deconnectionButton").addEventListener("click", function(){

                var vide={"rien":"levide"};
                //envoie un mot de pass vide pour deconnexion
                $http.post('/api/password',vide).
                success(function(data) {
                    console.log("deconnect successfully");

                }).error(function(data) {
                    console.error("error in disconnect");
                });



                console.log("deconnecte");
                connectionmembre = localStorage.setItem("leclientAdminZestConnecteeesimilikrypt_token_asodhu643uy43bfjh","ggg");
                document.location.href = "/logins"
            });

        }
        else
        {

            var url = location.href;
            var array = url.split('/');

            var lastsegment = array[array.length-1];

            console.log("do nothing not connected");
            $('#pasconnecte').show();
            $('#vousetesconnecte').hide();


            // ici on renvoie les utilisateur non autorisé sur les page d'admin
            // vers la page de connexion
            if(lastsegment=="timelineadmin" || lastsegment=="notecardadmin")
                location.href="/logins";
            // alert(lastsegment);
        }




    }).error(function(data1) {
        console.error("error in getting");
    });




}






