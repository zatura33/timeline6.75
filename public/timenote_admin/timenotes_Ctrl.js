

// controleur de la page timenote admin------------------------------------------------------------
angular.module('routerApp').controller('timenote_adminCtrl', ['$scope', '$http','$sce','$interval',
    function ($scope, $http,$sce,$interval) {


        $scope.selectedTimeline={"title":"AucuneEpoque"};


        // pour afficher la liste déroulante
        // when landing on the page, get all timelines and show them
        $scope.timelines={"vide":""};
        function loadDataBaseInfo (){
        $http.get('/api/timelines')
            .success(function (data) {
                $scope.timelines = data;
                //console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });

        // initialisation du premier choix d'époque
        //$scope.index_0=0;
        //$scope.selectedTimeline=$scope.timelines[$scope.index_0].title;

        // si aucune selection n'est faite on met la premiere par défaut
     //   if($scope.selectedTimeline == null)
        //    $scope.selectedTimeline=$scope.timelines[0].title;


                // when landing on the page, get all timenotes and show them
        $http.get('/api/timenotes')
            .success(function (data) {
                $scope.timenotes = data;
               // console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });

        }

        loadDataBaseInfo ();



        var dropdownlistChoice_token =localStorage.getItem("dropdownlistChoice_token");
        //on recupere le token au refresh page --choix de  menu deroulant
       /* $scope.getDropDownList=function(){
        dropdownlistChoice_token =localStorage.getItem("dropdownlistChoice_token");
        }*/


        $scope.SelectedEpoqueIndex=dropdownlistChoice_token;
        console.log("valeur du token: "+dropdownlistChoice_token);
        // fonction qui recharge le menu deroulant avec un token



        /*****A TRAVAILLLERRRRRRRRRRRRRRRRRRRRR***************/
        function loaddropdownlist(){
            //$scope.$apply(function() {
           // $scope.getDropDownList();
            timelineIndex=dropdownlistChoice_token;
            if(timelineIndex!=null){
            //$('#dropdownchoicenote').val(dropdownlistChoice_token).change();
            //$scope.formData.timelinename=dropdownlistChoice_token;
            // console.log("loading value :"+dropdownlistChoice_token);
            // console.log("loading value :"+$scope.timelines[timelineIndex].title);
            //if($scope.selectedTimeline!=null)
               $scope.selectedTimeline=$scope.timelines[timelineIndex];
           // $scope.$apply(function() {
             $('#dropdownchoicenote').val($scope.timelines[timelineIndex].title).change();
            $scope.$apply();
            }
            // });

        }


         $scope.loaddropdownlist2=function(){
             if(dropdownlistChoice_token){
                            $scope.valueinserted=false;
                            //$scope.$apply(function() {
                            var timelineIndex=dropdownlistChoice_token;
                            var test=0;
                            //$('#dropdownchoicenote').val(dropdownlistChoice_token).change();
                            //$scope.formData.timelinename=dropdownlistChoice_token;
                            // console.log("loading value :"+dropdownlistChoice_token);
                             console.log("loading value :"+$scope.timelines[test].title);
                            //if($scope.selectedTimeline!=null)
                              // $scope.selectedTimeline=$scope.timelines[timelineIndex].title;
                            // $scope.$apply(function() {
                            // $('#dropdownchoicenote').val($scope.timelines[timelineIndex].title).change();

                            // });

                            // setTimeout(function () {
                             //    $('#dropdownchoicenote').val($scope.timelines[timelineIndex].title).change();



                            // }, 151);
             }


        };


        $scope.dropDownList_update = function() {
             console.log( "Handler for .change() called." );
             dropdownlistChoice_token=$('#dropdownchoicenote').val();
             console.log("$scope.dropdownlistChoice value :"+dropdownlistChoice_token);
             localStorage.setItem("dropdownlistChoice_token",dropdownlistChoice_token);
            //if(dropdownlistChoice_token==null)
               // $scope.selectedTimeline={"title":"AucuneEpoque"};

            if(dropdownlistChoice_token == 0 || dropdownlistChoice_token ){
                localStorage.setItem("dropdownlistChoice_token",dropdownlistChoice_token);
                console.log("$svaleurentrée");
            $scope.valueinserted=true;

            }
            else
                $scope.date_debut="AucuneEpoque";

        };

        //loaddropdownlist();
        //$scope.loaddropdownlist2();


        $scope.noteformopen = false;
        // $scope.dropdownlistChoice='';

        $(document).ready(function () {

            // ne doit pas etre affiché au depart
            $("#aucune_epoque").hide();

           /* $( "#dropdownchoicenote" ).change(function() {
                console.log( "Handler for .change() called." );
                dropdownlistChoice_token=$('#dropdownchoicenote').val();
                console.log("$scope.dropdownlistChoice value :"+dropdownlistChoice_token);
                localStorage.setItem("dropdownlistChoice_token",dropdownlistChoice_token);
            });*/

            /*$scope.global_currentTimeline=getCurrentTimeline();

             // on doit faire un leger timeout car angular s'éxecute avant jquery
            //loaddropdownlist();*/
            setTimeout(function () {
                // recharge la derniere option du menu déroulant epoque
                loaddropdownlist();
                //$scope.global_currentTimeline=getCurrentTimeline();
                //$scope.global_currentTimeline=getCurrentTimeline();
                //console.log($scope.global_currentTimeline.date_debut);


            }, 151);

            // connect deconnect user
            connexionEtDeconnexionOnLoad2($scope, $http);
            // redirige le user si il n'est pas connecté








        });


        // fonction jquery qui montre le formulaire d'ajout
        //$("#newtimenoteshow").on("click", function () {
        $scope.afficheInsertForm=function (){

            if($scope.selectedTimeline.title=="AucuneEpoque" )
            {
                // affiche message pendant 1 sec
                $("#aucune_epoque").show(500);
                setTimeout(function () {
                    $("#aucune_epoque").hide(500)

                }, 2050);
                ;
            }
            else {



                if ($scope.noteformopen == false) {
                    $scope.noteformopen = true;
                    $("#ajoutnoteform").show();
                }
                else {
                    $scope.noteformopen = false;
                    $("#ajoutnoteform").hide();
                }
            }


        };


//  TINYMCE fonction pour convertir richtext en html
        $scope.returnHtml = function (theString) {
            return $sce.trustAsHtml(theString);
        };


        // TINYMCE WIDGET ----------------------------------------------------------------
        // $scope.tinyMCE.remove();
        $(function () {

            // pour tinymce refreshpage
            //tinymce.remove();
            tinymce.EditorManager.editors = [];

            // pour tinymce initalisation
            tinymce.init({
                selector: ".mytextarea",
                skin: "custom",  // ici cutom est them charcoal skin tinymce
                plugins: ['advlist autolink lists link image charmap print preview hr anchor pagebreak',
                    'searchreplace wordcount visualblocks visualchars code fullscreen',
                    'insertdatetime media nonbreaking save table contextmenu directionality',
                    'emoticons template paste textcolor colorpicker textpattern imagetools'
                ],
                toolbar1: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
                toolbar2: 'print preview media | forecolor backcolor emoticons ',
                /* toolbar2: 'print preview media | forecolor backcolor emoticons',
                 image_advtab: true,*/

            });
        });

        //------------------------------tinymce fin


        $scope.formData = {
            title: '',
            date: '',
            theme: '',
            description: ''
        };

        function getCurrentTimeline() {
            var currentTimeline;





                angular.forEach($scope.timelines, function (ficheiterator, index) {

                    if (ficheiterator.title == dropdownlistChoice_token) {
                        currentTimeline = ficheiterator;

                    }

                });

            if (currentTimeline == null){
                currentTimeline={"date_debut":"AucuneEpoque"};

            }


            return currentTimeline;

        }

        $scope.returnDate=function(date){

            var originaldate = new Date(date);
            formattedDate=""+ originaldate.getFullYear()+"-"+('0'+(originaldate.getMonth()+1)).slice(-2)+"-"+('0'+(originaldate.getDate()+1)).slice(-2);


            return  formattedDate;
        };

        function insertnotevalidation() {


            var inputarevalid=true;
            var validationstring="Votre insertion est invalide:\n";
           // var currentTimeline=getCurrentTimeline();

            console.log($scope.selectedTimeline.date_fin);
             //console.log($scope.formData.date_debut);

            // validation de l'époque et que la date debut est dans l'époque
            if($scope.date_debut=="AucuneEpoque"){
                validationstring+="-vous devez sélectionnez un époque dans le haut de la page\n";
                inputarevalid=false;
            }
            else
            {

                if($scope.formData.date_debut!=null && $scope.date_debut!="AucuneEpoque"){

                    //console.log(currentTimeline.date_debut);
                // console.log($scope.formData.date_debut);

                // validation date valide
                    if($scope.selectedTimeline.date_debut >= $scope.formData.date_debut || $scope.formData.date_debut >= $scope.selectedTimeline.date_fin ){
                        validationstring+="- La date de début doit être comprise\n entre les limites de cette époque.\n"
                            +"soit entre le "+$scope.returnDate($scope.selectedTimeline.date_debut)+" et le "+ $scope.returnDate($scope.selectedTimeline.date_fin);

                        inputarevalid=false;
                    }

                }
                else {
                    validationstring+="Vous devez entrer une date de début";
                    inputarevalid=false;
                }


            }




            // validation titre
            if($scope.formData.title == ""){
                validationstring+="- Veuillez mettre un titre\n";
                inputarevalid=false;
            }
            // validation theme
            if($scope.formData.theme == ""){
                validationstring+="- Veuillez mettre un thème\n";
                inputarevalid=false;
            }




            if(!inputarevalid)
                alert(validationstring);

            return inputarevalid;
        }


        // when submitting the add form, send the text to the node API
        $scope.createTimenote = function () {

            if (insertnotevalidation()) {

                //onrecupere la valeur tinymce
                $scope.formData.description = tinyMCE.activeEditor.getContent();
                $scope.formData.timelinename=$scope.selectedTimeline.title;

                $http.post('/api/timenotes', $scope.formData)
                    .success(function (data) {
                        $scope.formData = {}; // clear the form so our user is ready to enter another
                        $scope.timenotes = data;
                        console.log(data);
                        alert('enregistrement ajouté');
                    })
                    .error(function (data) {
                        console.log('Error: ' + data);
                    });


                setTimeout(function () {
                    //on recharge la liste déroulante et vide tinymce
                    loaddropdownlist();
                    tinyMCE.activeEditor.setContent('');

                    loadDataBaseInfo ();

                }, 500);



            }
        };


            // delete a timenote after checking it
            $scope.deleteTimenote = function (id) {
                $http.delete('/api/timenotes/' + id)
                    .success(function (data) {
                        $scope.timenotes = data;
                        console.log(data);
                    })
                    .error(function (data) {
                        console.log('Error: ' + data);
                    });
            };
    }




]);
