$(document).ready(function() {
    
    $('#deconnectionButton').click(function() {

    // affiche les menu si client connecté sinon change l'url
    connectionmembre = localStorage.setItem("leclientAdminZestConnecteeesimilikrypt_token_asodhu643uy43bfjh","ggg");


        document.location.href = "/home"

        // chargement des menus ADMIN si connexion
        
    })
});

function changepage(pageid){
    //alert(pageid.id);
    $(".divswap").hide();
    $("#section"+pageid.id).show();


}


// div draggable
// target elements with the "draggable" class
interact('.draggable')
    .draggable({
        // enable inertial throwing
        inertia: true,
        // keep the element within the area of it's parent
        restrict: {
            restriction: "parent",
            endOnly: true,
            elementRect: { top: 0.5, left: 0.5, bottom: 0, right: 0.5 }
        },
        // enable autoScroll
        autoScroll: true,

        // call this function on every dragmove event
        onmove: dragMoveListener,
        // call this function on every dragend event
        onend: function (event) {
            /*
            var textEl = event.target.querySelector('p');

            textEl && (textEl.textContent =
                'moved a distance of '
                + (Math.sqrt(event.dx * event.dx +
                    event.dy * event.dy)|0) + 'px');*/
        }
    });

function dragMoveListener (event) {
    var target = event.target,
    // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
        target.style.transform =
            'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}



// this is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;
