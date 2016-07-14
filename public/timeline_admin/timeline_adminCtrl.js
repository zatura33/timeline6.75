

// controleur de la page timeline admin---------------------------------------------
angular.module('routerApp').controller('timeline_adminCtrl', ['$scope', '$http','$interval',


    function ($scope, $http,$interval){


        $(document).ready(function() {
            // connect deconnect user
            connexionEtDeconnexionOnLoad2($scope,$http);
            
        });



        $scope.returnHtml = function(theString) {
            return $sce.trustAsHtml(theString);
        };

        // TINYMCE WIDGET ----------------------------------------------------------------
        // $scope.tinyMCE.remove();
        $(function() {

            // pour tinymce refreshpage
            //tinymce.remove();

            tinymce.EditorManager.editors = [];

            // tinyMCe formulaire d'ajout
            // pour tinymce initalisation
            tinymce.init({

                selector: ".mytextarea",
                skin: "custom" , // ici custom est them charcoal skin tinymce
                plugins:
                    ['advlist autolink lists link image charmap print preview hr anchor pagebreak',
                        'searchreplace wordcount visualblocks visualchars code fullscreen',
                        'insertdatetime media nonbreaking save table contextmenu directionality',
                        'emoticons template paste textcolor colorpicker textpattern imagetools'
                    ],
                toolbar1: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
                toolbar2: 'print preview media | forecolor backcolor emoticons',
                /* plugins: "media",
                 menubar: "insert",
                 toolbar: "media"*/
            });








        });

        //------------------------------tinymce fin


        $scope.formData = {title:'',
            date_debut:'',
            description:'',
            date_fin:'',
            theme:''};



        // reception des infos de la database
        $scope.refreshPage = function() {
            $http.get('/api/timelines')
                .success(function (data) {
                    $scope.timelines = data;
                    console.log(data);
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
        };

        $scope.refreshPage();



        /*  A   VOIR ************* fait planté les modification de timneline pour l'instant
         function pageload(){
         $http.get('/api/timelines')
         .success(function (data) {
         $scope.timelines = data;
         console.log(data);
         })
         .error(function (data) {
         console.log('Error: ' + data);
         });
         };
         // at startup
         pageload();
         //refresh every 3 sec  ---- faut cheker avec push et socket.io
         $interval(function() {
         pageload();
         console.log(' timelinesupdate with 5 seconds timeout fired')
         }, 5000);*/



        // --------------------------------------------------------------------------------
        //-----------------------------ici les fonctions principale des boutons --------

        // when submitting the add form, send the text to the node API

        $scope.createTimeline = function() {


            // ici on recupere les données du texareara tinyMCE
            /* tinymce.activeEditor.on('GetContent', function(e) {
             alert(e.content);
             });*/
            // alert(tinyMCE.activeEditor.getContent());
            //$scope.formData.description=tinymce.get('descriptiondata').getContent();
            $scope.formData.description=tinyMCE.activeEditor.getContent();


            $http.post('/api/timelines', $scope.formData)
                .success(function(data) {
                    $scope.formData = {}; // clear the form so our user is ready to enter another
                    $scope.timelines = data;
                    console.log(data);
                    alert('enregistrement ajouté');
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
            // clean  tinymce editor
            tinyMCE.activeEditor.setContent('');
        };







        // Sélectionne une timeline et remplis les champ de la boite de modification
        $scope.selectionnerTimeline = function(timeline) {
            $('#sectionmodifiertimeline').show();

            console.log(timeline.date_debut);

            var start = new Date( timeline.date_debut);
            var fin = new Date( timeline.date_fin);


            console.log(start.getFullYear()+"-"+start.getMonth()+"-"+start.getDay());

            $scope.modifierformData ={title:timeline.title,
                theme:timeline.theme,
                // date_debut:timeline.date_debut,
                // date_fin:timeline.date_fin,
                //description dans tinymce

            };

            // on met les dates
            $('#modifdatedebut').val(start.getFullYear()+"-"+('0'+(start.getMonth()+1)).slice(-2)+"-"+('0'+(start.getDate()+1)).slice(-2));
            $('#modifdatefin').val(fin.getFullYear()+"-"+('0'+(fin.getMonth()+1)).slice(-2)+"-"+('0'+(fin.getDate()+1)).slice(-2));

            $scope.modifierformData.date_debut=$('#modifdatedebut').val();
            $scope.modifierformData.date_fin=$('#modifdatefin').val();


            // on met le id dans le bouton modifier pour update
            // $("#modifiersubmitbutton").attr("ng-click","modifierTimeline("+timeline._id+")");
            $scope.id_modifSoppression=timeline._id;

            $("#tinymodifform").html(timeline.description);

            //tinymce.EditorManager.editors = [];
            // formulaire modification
            // *****attendtion il faut initialisé le formulaire apres avoir mis le texte plus haut
            tinymce.init({
                selector: "#modifdescriptiondata",
                skin: "custom", // ici custom est them charcoal skin tinymce
                plugins:
                    ['advlist autolink lists link image charmap print preview hr anchor pagebreak',
                        'searchreplace wordcount visualblocks visualchars code fullscreen',
                        'insertdatetime media nonbreaking save table contextmenu directionality',
                        'emoticons template paste textcolor colorpicker textpattern imagetools'
                    ],
                toolbar1: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
                toolbar2: 'print preview media | forecolor backcolor emoticons',
            });

            tinyMCE.activeEditor.setContent(timeline.description);

        };






        // fait le update des modification dans la base de donné
        $scope.modifierTimeline = function() {

            var id=$scope.id_modifSoppression;
            $scope.modifierformData.description=tinyMCE.activeEditor.getContent();

            // alert($scope.modifierformData.description);


            // crée la nouvelle entrée
            $http.post('/api/timelines', $scope.modifierformData)
                .success(function(data) {
                    $scope.modifierformData = {}; // clear the form so our user is ready to enter another
                    $scope.timelines = data;
                    console.log(data);

                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });

            // supprime l'ancienne
            $http.delete('/api/timelines/' + id)
                .success(function(data) {
                    $scope.timelines = data;
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
            // clean  tinymce editor
            tinyMCE.activeEditor.setContent('');

            //location.reload();
            alert('Modifications réussie');
            $scope.refreshPage();
        };





        // delete a timeline after checking it
        $scope.deleteTimeline = function(id) {
            $http.delete('/api/timelines/' + id)
                .success(function(data) {
                    $scope.timelines = data;
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        };
    }

]);



