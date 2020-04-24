$(document).ready(function () {

    var sH = $(window).height() - 20;
    console.log(sH);
    $('.container').css('min-height', sH + 'px');
    // $('<body>').css('min-height', sH + 'px');
    $('.footer').css('margin-top', sH / 2)


    // Ecoute du clique souris
    // On écoute les cliques souris de la page pour récupérer les classe de l'élément
    $(document.body).on('click', function (e) {
        e.stopPropagation();
        // e.preventDefault();
        console.log(event.target.classList);
        if (event.target.classList.contains("shutDownDiv")) {
            $mouseOut = false;
        } else {
            $mouseOut = true;
        }

        // on ferme la div d'information
        if ($mouseOut == false) {
            $('#infoDiv').empty();
            $('#infoDiv').fadeOut(500);
        }

    })




    // EVENT de la recherche
    $('#searchBtn').on('click', function (e) {
        e.stopPropagation();
        e.preventDefault();

        if ($('#inputSearch').val() == "") {
            infoDivMessage("Veuillez renseigner au moins un mot clef.");

        } else {

            $.ajax({
                url: "https://imdb-api.com/API/Search/k_2Yrf2vqz/" + $('#inputSearch').val() ,

                success: function (result) {
                    console.log(result);
                    getResult(result);
                }
            })

        }

    })

    // Récupération des images/miniatures/infos du film et création du DOM
    function getResult(data) {
        if (data['results'].length == 0 || data['results'] == 'null') {
            $('.noResultDiv').remove();
            var noResultDiv = $('<div></div>').attr({
                class: 'col-md-12 mt-5 mb-5 noResultDiv'
            }).appendTo($('#resultSearch'));
            $('<h3></h3>').html('Aucun résultat :-/').appendTo($(noResultDiv));
        } else {

            $('.noResultDiv').remove();
            $('.resultDiv').remove();
            $('#theDiv').remove();

            $('<div></div>').attr({
                class: 'col-md-12',
                id: 'theDiv'
            }).appendTo($('#resultSearch'));
            $('<h3></h3>').html('Résultat(s) : ').appendTo($('#theDiv'));

            // Boucle de récupération et d'affichage des infos dans les div
            for (var i = 0; i < data['results'].length; i++) {
                var currentDiv = $('<div></div>').attr({
                    class: 'col-md-6 col-sm-12 mb-2 mt-1 resultDiv'
                }).appendTo($('#resultSearch'));

                // récupération des infos du film
                var movieId = data['results'][i]['id'];
                var movieTitle = data['results'][i]['title'];
                var movieDesc = data['results'][i]['description'];
                var movieImg = data['results'][i]['image'];
                // récupération id de l'image
                var imageId = data['results'][i]['image'].split('/');
                var caseCible = imageId.length - 1;

                if(imageId[caseCible].indexOf("nopicture") === -1){

                    var miniVisioImg = "https://imdb-api.com/Images/192x264/" + imageId[caseCible];
                }else{
                    var miniVisioImg = "images/nopic.jpg";
                }



                // Mise en forme et affichage
                // $('<p></p>').html("id IMDB : " + movieId).appendTo($(currentDiv));
                $('<img></img>').attr({
                    title: movieTitle,
                    alt: movieTitle,
                    src: "images/line.jpg"
                }).appendTo($(currentDiv));

                $('<p></p>').attr('class','pDom').html("Titre : " + movieTitle).appendTo($(currentDiv));
                $('<p></p>').html(movieDesc).appendTo($(currentDiv));
                
                var theImgLink = $('<a></a>').attr({
                    href: "https://imdb-api.com/Images/" + imageId[caseCible],
                    target: "_blank"
                }).appendTo($(currentDiv));
                $('<img></img>').attr({
                    title: movieTitle,
                    alt: movieTitle,
                    src: miniVisioImg
                }).appendTo($(theImgLink));
                
                $('<br>').appendTo($(currentDiv));
                
                $('<button></button>').attr({
                    class: 'btn btn-outline-success',
                    id: movieId
                }).html('Chercher d\'autres affiches').appendTo($(currentDiv));
                $('<br>').appendTo($(currentDiv));

                $('<small></small>').html('en développement... =)').appendTo($(currentDiv));
                
                $('<br>').appendTo($(currentDiv));




            }
        }
    }

    // fonction d'Affichage et remplissage de la div d'information
    // fonction d'Affichage et remplissage de la div d'information
    // fonction d'Affichage et remplissage de la div d'information
    function infoDivMessage(message) {
        $('<img></img>').attr({
            title: 'information',
            src: 'images/loupe.png'
        }).appendTo($('#infoDiv'));

        $('<br>').appendTo($('#infoDiv'));


        $('<h4></h4>').html('Information : ').appendTo($('#infoDiv'));
        var theP = $('<p></p>').appendTo($('#infoDiv'));
        $(theP).html(message);

        var theButton = $('<button></button>').attr({
            class: 'btn btn-success shutDownDiv',
            id: 'validateInfoBtn'
        }).html('OK !').appendTo($('#infoDiv'));

        $('#infoDiv').fadeIn(500);

    }







})