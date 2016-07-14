// Controleur de la page login



angular.module('routerApp').controller('userlogin_Ctrl', ['$scope','$http',
    function ($scope,$http){


       // connexionEtDeconnexionOnLoad2($scope,$http);

        formData = {username:'',
            password:''
        };


        //userlogin={'username':'vide'};
        // on recoit un array avec tous les users et loggin
        $http.get('/api/userlogins')
            .success(function(data) {
                $scope.userlogins = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });



        // pour créer un user et password  n'est plus fonctionnel
      //  createUserlogin = function(user,pass) {


            // ici on recupere les données du texareara tinyMCE
            /* tinymce.activeEditor.on('GetContent', function(e) {
             alert(e.content);
             });*/
            // alert(tinyMCE.activeEditor.getContent());
            //$scope.formData.description=tinymce.get('descriptiondata').getContent();
            // encrypt
         /*   var plaintext = 'pssst ... đon’t tell anyøne!';

            var passwordcrypt = 'L0ck it up saf3 Giuh YUGYTFbv. *//*^;^;kjgf';

            var cipheruser = Aes.Ctr.encrypt(user,passwordcrypt , 256);
            var cipherpass = Aes.Ctr.encrypt(pass, passwordcrypt, 256);
            // decrypt
            var origuser = Aes.Ctr.decrypt(cipheruser, passwordcrypt, 256);
            var origpass = Aes.Ctr.decrypt(cipherpass, passwordcrypt, 256);

            //alert(cipheruser);
            // alert(origuser);
            formData.username=cipheruser;
            formData.password=cipherpass;
            console.log(user,pass);


            $http.post('/api/userlogins', formData)
                .success(function(data) {
                    formData = {}; // clear the form so our user is ready to enter another
                    formData = data;
                    console.log(data);
                    alert('enregistrement ajouté');
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });

        };

        user="epmin";
        pass="2852";*/

        //pour créer un nouvelutilisateur
        // createUserlogin(user,pass);


        $scope.validateLogin = function (){


            // test pour password
            $scope.userPass={'username':$scope.username,
                            'password':$scope.password};

            $http.post('/api/password',$scope.userPass).
            success(function(data) {
                console.log("posted successfully");
                //console.log(data);
                //var testreception=JSON.parse(data);
                //alert(data);
            }).error(function(data) {
                console.error("error in posting");
            });


            $http.get('/api/password').
            success(function(data1) {
                console.log("getted successfully");
                console.log(data1);

                if(data1=='est connecté                        .'){
                  //  $('#pasconnecte').hide();
                //$('#vousetesconnecte').show();
                }
                else
                {
                   // $('#pasconnecte').show();
                   // $('#vousetesconnecte').hide();
                    alert("Nom d'utilisateur ou Mot de passe érroné");

                }

                location.reload();

            }).error(function(data1) {
                console.error("error in getting connection");
            });
/*
            console.log("" );

            /*for (member in $scope.userlogins) {
             console.log("user"+member.username + member.password );
             }*/

           // angular.forEach($scope.userlogins,function(value,index){
                //  ****attention la commande ci-dessous  montre tous les user pass de la db*****
                //  console.log(value.username + value.password );
                // here we decrypt user and password before checking value
               // var passwordcrypt = 'L0ck it up saf3 Giuh YUGYTFbv. */^;^;kjgf';
               // var originaluser = Aes.Ctr.decrypt(value.username, passwordcrypt, 256);
               // var originalpass = Aes.Ctr.decrypt(value.password, passwordcrypt, 256);

                /*alert(originaluser);
                 if(originaluser==$scope.username)
                 alert("userok");*/
               /* if(originaluser==$scope.username && originalpass==$scope.password){
                    localStorage.setItem("leclientAdminZestConnecteeesimilikrypt_token_asodhu643uy43bfjh","cccc78654630opfds");
                    console.log("connexion");
                    //routerApp.value('clientId', 'a12345654321x');
                    //$(".sectionAdmin").show();
                    location.reload();
                }
                else
                    alert("Nom d'utilisateur ou Mot de passe érroné");
            })*/
        };


        $(document).ready(function() {

            connexionEtDeconnexionOnLoad2($scope,$http);

            /*
            // affiche connecté ou pas
            connectionmembre=localStorage.getItem("leclientAdminZestConnecteeesimilikrypt_token_asodhu643uy43bfjh");
            if(connectionmembre=="cccc78654630opfds")
            {
                $('#pasconnecte').hide();
                $('#vousetesconnecte').show();
            }
            else
            {
                $('#pasconnecte').show();
                $('#vousetesconnecte').hide();

            }*/


        });





        /* ancienne section qui était au depart HTML
         <ul class="nav navbar-nav ">

         <li><a ui-sref="timelineadminihdhufasad87763">Gérer les époque</a></li>
         <li><a ui-sref="notecardadmindsjurew7820a">Gérer les évenement</a></li>

         </ul>
         */



    }
]);

