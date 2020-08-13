$(document).ready(function () {


    var sH = $(window).height() - 20;
    console.log(sH);
    $('.container').css('min-height', sH + 'px');
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

        // on lance la fonction de récupération des autres affiches pour ce film
        if (event.target.classList.contains("otherPosterClick")) {
            var idCliqued = event.target.id;
            getOtherPosters(idCliqued);
        }

        // Fonction de recherche
        if (event.target.classList.contains("searchBtnClass")) {
            searchGoFunction();
        }
    })



    // FONCTION DE LA RECHERCHE
    function searchGoFunction() {

        // pour les petits malins qui recherche du vent
        if ($('#inputSearch').val() == "") {
            infoDivMessage("Veuillez renseigner au moins un mot clef.");

        } else {
            // le loading gentillet
            $('#theLoading').css({
                'display': 'initial',
                'z-index': '999'
            });
            $('.container').css({
                filter: 'blur(2px)',
            })

            $.ajax({
                url: "https://imdb-api.com/API/Search/k_2Yrf2vqz/" + $('#inputSearch').val(),

                success: function (result) {
                    console.log(result);
                    getResult(result);
                }
            })


        }
    }

    // Récupération des images/miniatures/infos du film et création du DOM
    // Récupération des images/miniatures/infos du film et création du DOM
    function getResult(data) {
        // si il n'y a pas de résultats
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

                if (imageId[caseCible].indexOf("nopicture") === -1) {

                    var miniVisioImg = "https://imdb-api.com/Images/192x264/" + imageId[caseCible];
                } else {
                    var miniVisioImg = "images/nopic.jpg";
                }



                // Mise en forme et affichage
                // $('<p></p>').html("id IMDB : " + movieId).appendTo($(currentDiv));
                // $('<img></img>').attr({
                //     title: movieTitle,
                //     alt: movieTitle,
                //     src: "images/line.jpg"
                // }).appendTo($(currentDiv));

                $('<p></p>').attr('class', 'pDom').html("Titre : " + movieTitle).appendTo($(currentDiv));
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
                    class: 'btn btn-outline-success otherPosterClick',
                    id: movieId
                }).html('Chercher d\'autres affiches').appendTo($(currentDiv));
                $('<br>').appendTo($(currentDiv));

                // $('<small></small>').html('en développement... =)').appendTo($(currentDiv));

                $('<br>').appendTo($(currentDiv));

                // fin du loading gentillet
                $('.container').css('filter', 'none');
                $('#theLoading').css({
                    display: 'none'
                });

            }
        }
    }


    // FONCTION POUR OBTENIR D'AUTRE AFFICHES DU FILM SELECTIONNÉ
    function getOtherPosters(filmId) {
        console.log('id de l\'élément cliqué : ' + filmId)
        $('.noResultDiv').remove();
        $('.resultDiv').remove();
        $('#theDiv').remove();

        // le loading gentillet
        $('#theLoading').css({
            'display': 'initial',
            'z-index': '999'
        });
        $('.container').css({
            filter: 'blur(2px)',
        })

        $.ajax({
            url: "https://imdb-api.com/API/Images/k_2Yrf2vqz/" + filmId + "/short",

            success: function (result) {
                console.log(result);
                getResultOneFilm(result);
            }
        })
    }

    // Fonction de traitement des nouvelles images du film choisi
    function getResultOneFilm(data) {
        if (data['items'].length == 0 || data['items'] == 'null') {
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

            // Affichage du film concerné
            $('<p></p>').html('Film : ' + data['fullTitle']).appendTo($('#theDiv'));

            for (var i = 0; i < data['items'].length; i++) {
                // La div courrante
                var currentDiv = $('<div></div>').attr({
                    class: 'col-md-6 col-sm-12 mb-2 mt-1 resultDiv'
                }).appendTo($('#resultSearch'));
                // Image séparatrice
                $('<img></img>').attr({
                    src: "images/line.jpg"
                }).appendTo($(currentDiv));

                // Récupération des infos de l'affiche
                var posterTitle = data['items'][i]['title'];
                var lienImage = data['items'][i]['image'];
                // Récupération de l'id de l'image
                var imageTab = data['items'][i]['image'].split('/');
                console.log(imageTab);
                console.log(imageTab[imageTab.length - 1]);
                var idImg = imageTab[imageTab.length - 1 ];
                // Adresse à afficher dans le code HTML
                var imgAdressToShow = "https://imdb-api.com/Images/192x264/" + idImg;

                // Affichage des infos et images
                $('<p></p>').attr('class','pDom').html(posterTitle).appendTo($(currentDiv));
                var imageLink = $('<a></a>').attr({
                    href: lienImage,
                    target: '_blank'
                }).appendTo($(currentDiv));
                $('<img></img>').attr({
                    title: posterTitle,
                    alt: posterTitle,
                    src: imgAdressToShow
                }).appendTo($(imageLink));


                // Fin du loading
                $('.container').css('filter', 'none');
                $('#theLoading').css({
                    display: 'none'
                });
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