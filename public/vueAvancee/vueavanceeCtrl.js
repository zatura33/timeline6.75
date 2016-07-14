angular.module('routerApp').controller('vueavancee_Ctrl', ['$scope', '$http','$sce',
    function ($scope, $http,$sce) {


        
        /*
        $http.post('/api/password', $scope.essaiPass)
            .success(function(data) {
                alert(data);
                //$scope.formData = {}; // clear the form so our user is ready to enter another
               // $scope.timelines = data;
                //console.log(data);
                //alert('enregistrement ajouté');
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });*/

       // $scope.formData.timelinename="";

        $scope.currentEpoque = {title:'',
            date:'',
            theme:'',
            description:''};


        $(document).ready(function() {


                // action quand on selectionne une époque
            $( "#dropdownchoicenote" ).change(function() {
                console.log("Handler for .change() called.");

                $scope.currentEpoque={"title":"Sélection d'époque vide"};
                // on charge le choix en cache pour refresh page
                dropdownlistChoice_token = $('#dropdownchoicenote').val();
                console.log("$scope.dropdownlistChoice value :" + dropdownlistChoice_token);
                localStorage.setItem("dropdownlistChoice_token", dropdownlistChoice_token);

                //$scope.apply=function(){
                if($('#dropdownchoicenote').val()!=null){

                    $scope.currentEpoque=$scope.returnParentObject($('#dropdownchoicenote').val());
                    console.log(($scope.currentEpoque.date_debut));

                    items.clear();
                    items.update({
                        type:'background',
                        className:"epoqueChoisie",
                        id:"epoqueId",
                        start: new Date($scope.currentEpoque.date_debut),
                        end: new Date($scope.currentEpoque.date_fin),
                        max:new Date($scope.currentEpoque.date_fin),
                        content:$scope.currentEpoque.title});


                    //on focus sur l'époque que l'on vient d'afficher
                    visualTimeline.focus("epoqueId");
                }
                else
                    currentEpoque.title="Sélection d'époque vide";



                // on sort la liste des notes(Évenement) de l'époque en question

                var ficheiterator;
                $scope.fiche_evenements = [];
                var i = 0;
                //var $scope.fiche_evenementslenght=0;
                angular.forEach($scope.timenotes, function (ficheiterator, index) {
                    if (ficheiterator.timeline_name == $('#dropdownchoicenote').val()) {

                        //on instancie chaque évenement
                        $scope.fiche_evenements[i] = ficheiterator;

                        // on le met dans la ligne de temps
                        items.add({
                            className:"evenement",
                            id:""+i,
                            start: new Date($scope.fiche_evenements[i].date_debut),
                           /* end: new Date($scope.fiche_evenements[i].date_fin),*/
                            content:$scope.fiche_evenements[i].title,});

                        // evenement suivant ++
                        i++;
                    }

                });
            });
        });



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


        // chargement des menus ADMIN si connexion
        connexionEtDeconnexionOnLoad2($scope,$http);
        //alert("controller fonctionne");


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

        $scope.openEvenement=function(idEvenement) {
           // alert($scope.fiche_evenements[idEvenement].title);
            $scope.indexEvenement=idEvenement;
            $scope.$apply();

            $('.sectionfichevueavancee').show(500);

        };

        $scope.closeFiche=function() {
            $('.sectionfichevueavancee').hide(500);
            $("iframe").each(function() {
                var src= $(this).attr('src');
                $(this).attr('src',src);
            });
           // $('iframe').pause();


            //$('.fichedescription').html("");
            //$('.fichedescription').html($scope.returnHtml($scope.fiche_evenements[$scope.indexEvenement].description));
           /* $('.sectionfichevueavancee').html(`
            <div class="ficheDate">Date : <span ng-bind="`+$scope.returnDate($scope.fiche_evenements[indexEvenement].date_debut)+`"></span> - <span ng-bind="`+$scope.returnDate($scope.fiche_evenements[indexEvenement].date_fin)+`"></span></div>
        <button class="closeButtonFicheAvancee" ng-click="closeFiche()">X</button>
        <h3>Évenement`+ $scope.fiche_evenements[indexEvenement].title+ ` </h3>
        <div id="style-4scrollbar"  class="sectionfichevueavanceeInner">

            <div class="fichedescription"><h3 class="textleft topmarge">Description</h3><span ng-bind-html="`+$scope.returnHtml($scope.fiche_evenements[indexEvenement].description)+`"></span> </divclass>
       

            </div>

            <div class="ligneMauve"></div>
        </div>
            
            `);*/

           // $scope.$apply();
            

        };


        // $scope.epoqueselected=returnParentObject(formData.timelinename);


           // formatté la date
        $scope.returnDate=function(date){

            var originaldate = new Date(date);
            formattedDate=""+ originaldate.getFullYear()+"-"+('0'+(originaldate.getMonth()+1)).slice(-2)+"-"+('0'+(originaldate.getDate()+1)).slice(-2);


            return  formattedDate;
        };
       // ------------------CREATION DE LA TIMELINE  SELON LA SÉLECTION D'ÉPOQUE

        var container = document.getElementById('visualization');

        // Create a DataSet (allows two way data-binding)
         items = new vis.DataSet([
           /* {exempe d'un item
            start: new Date(2010, 7, 15),
            end: new Date(2015, 8, 2),
            max:new Date(2015, 8, 2),
                content:"Faire une selection" ,
                /*event:"check up"*/
            //content: 'Trajectory A'
            //Optional:
            //}*/
            /*,
            {id: 1, content: 'item 1', start: '2013-04-20'},
            {id: 4, content: 'item 4', start: '2013-04-16', end: '2013-04-19'},
            */
        ]);

        // Configuration for the Timeline
        var options = {

            locale: "fr-ca"
        };

        // Create a Timeline
        visualTimeline = new vis.Timeline(container, items, options);

        // quand on clique sur un item de la timeline
        visualTimeline.on('select', function (id) {
            //alert('selected items: ' + id.items) ;
           // alert($scope.fiche_evenements[id.items].title);
            $scope.openEvenement(id.items);
        });






    }
    ]);