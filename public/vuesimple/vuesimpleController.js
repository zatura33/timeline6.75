
// controleur de la page timenote admin------------------------------------------------------------
angular.module('routerApp').controller('vuesimple_Ctrl', ['$scope', '$http','$sce',
    function ($scope, $http,$sce){

        // chargement des menus ADMIN si connexion
        connexionEtDeconnexionOnLoad2($scope,$http);

        //on recupere le token au refresh page --choix de  menu deroulant
        var dropdownlistChoice_token=localStorage.getItem("dropdownlistChoice_token");

        $scope.fiche_evenement = {"title": "- aucun évenement diponible"};

        // pour afficher la liste déroulante
        // when landing on the page, get all timelines and show them
        $http.get('/api/timelines')
            .success(function(data) {
                $scope.timelines = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });



        // when landing on the page, get all timenotes and show them
        $http.get('/api/timenotes')
            .success(function(data) {
                $scope.timenotes = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });





        // fonction qui recharge le menu deroulant avec un token
        function loaddropdownlist(){
            //$scope.$apply(function() {
                $('#dropdownchoicenote').val(dropdownlistChoice_token).change();

               $scope.formData.timelinename=dropdownlistChoice_token;

            //alert($scope.formData.description);
               /* var titledescription=$scope.returnParentObject($scope.formData.timelinename);

                $('#descriptionwithtitle').html(titledescription.description);*/
            $scope.$apply();
            //});
        }


        //loaddropdownlist();




        //$scope.noteformopen=false;
        // $scope.dropdownlistChoice='';




        $(document).ready(function() {



            //var titledescription=$scope.returnParentObject($scope.formData.timelinename);

            //$('#descriptionwithtitle').html(titledescription);
            //returnHtml(returnParentObject($scope.formData.timelinename).description)

            $( "#dropdownchoicenote" ).change(function() {
                console.log( "Handler for .change() called." );
                dropdownlistChoice_token=$('#dropdownchoicenote').val();
                console.log("$scope.dropdownlistChoice value :"+dropdownlistChoice_token);
                localStorage.setItem("dropdownlistChoice_token",dropdownlistChoice_token);

                var ficheiterator;
                $scope.fiche_evenements=[];
                var i=0;
                //var $scope.fiche_evenementslenght=0;
                angular.forEach($scope.timenotes, function(ficheiterator,index){
                   if(ficheiterator.timeline_name == $('#dropdownchoicenote').val())
                   {
                      // $scope.fiche_evenement.title=ficheiterator.title;
                      // var currentList = $scope.fiche_evenements;
                       //var newList = currentList.concat(ficheiterator);
                      // $scope.fiche_evenements = newList;
                        $scope.fiche_evenements[i]=ficheiterator ;
                        i++;
                   }

                });

               // alert($scope.fiche_evenements[0].title+"test");


                //ici on affiche la premiere valeur de notre array d'évenement dans la fiche
                $scope.fiche_evenement.title=$scope.fiche_evenements[0].title;
                // on réinitialise lecompteur d'évenement pour navigation
                $scope.indexEvenement=0;

            });


            $scope.returnDate=function(date){

                var originaldate = new Date(date);
                 formattedDate=""+ originaldate.getFullYear()+"-"+('0'+(originaldate.getMonth()+1)).slice(-2)+"-"+('0'+(originaldate.getDate()+1)).slice(-2);


                return  formattedDate;
            };



            // fonction de selection dans la liste des evenement
            $scope.selectEventInList=function(timenote) {
                //alert(timenote.title);

                angular.forEach($scope.fiche_evenements, function(ficheiterator,index) {

                    if(ficheiterator.title == timenote.title)
                    {
                        $scope.indexEvenement=index;
                    }

                })

            };




            $scope.goToNextEvenement=function(){

                if($scope.indexEvenement == $scope.fiche_evenements.length-1)
                    $scope.indexEvenement=0;
                else
                    $scope.indexEvenement++;

            };

            $scope.goToPreviousEvenement=function(){

                if($scope.indexEvenement == 0)
                    $scope.indexEvenement=$scope.fiche_evenements.length-1;
                else
                    $scope.indexEvenement--;

            };



            setTimeout(function(){
                // recharge la derniere option du menu déroulant epoque
                loaddropdownlist();

            }, 500);
;


        });








        // fonction jquery qui montre le formulaire d'ajout
        $("#newtimenoteshow").on("click", function () {
            if($scope.noteformopen == false)
            {
                $scope.noteformopen=true;
                $("#ajoutnoteform").show();
            }
            else
            {
                $scope.noteformopen=false;
                $("#ajoutnoteform").hide();
            }

        });









//  TINYMCE fonction pour convertir richtext en html
        $scope.returnHtml = function(theString) {
            return $sce.trustAsHtml(theString);
        };


        $scope.returnParentObject = function(titlestring) {

            thetimeline="";
            angular.forEach($scope.timelines, function(ficheiterator,index){
                if(ficheiterator.title == titlestring)
                    thetimeline=ficheiterator;

            });


            return thetimeline;
        };


        // TINYMCE WIDGET ----------------------------------------------------------------
        // $scope.tinyMCE.remove();
        $(function() {

            // pour tinymce refreshpage
            //tinymce.remove();
            tinymce.EditorManager.editors = [];

            // pour tinymce initalisation
            tinymce.init({
                selector: ".mytextarea",
                skin: "custom",  // ici custom est them charcoal skin tinymce
                plugins: "textcolor",
                toolbar: "forecolor backcolor",
            });
        });

        //------------------------------tinymce fin







        $scope.formData = {title:'',
            date:'',
            theme:'',
            description:''};











    }




]);