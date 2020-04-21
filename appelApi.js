$(document).ready(function () {


    $('#searchBtn').on('click', function () {



        $.ajax({
            url: "https://imdb-api.com/API/Search/k_2Yrf2vqz/" + $('#inputSearch').val(),

            success: function (result) {
                console.log(result);
                getResult(result);
            }
        })


    })

    // Récupération des images/miniatures/infos du film et création du DOM
    function getResult(data) {
        if(data['results'].length == 0){
            $('.noResultDiv').remove();
           var noResultDiv = $('<div></div>').attr({
               class: 'col-md-12 mt-5 mb-5 noResultDiv'
           }).appendTo($('#resultSearch'));
            $('<h3></h3>').html('Aucun résultat :-/').appendTo($(noResultDiv));
        }else{
            
            $('.noResultDiv').remove();
            $('.resultDiv').remove();
            $('#theDiv').remove();

$('<div></div>').attr({
    class: 'col-md-12',
    id: 'theDiv'
}).appendTo($('#resultSearch'));
            $('<h3></h3>').html('Résultat(s) : ').appendTo($('#theDiv'));

            for (var i = 0; i < data['results'].length; i++) {
                var currentDiv = $('<div></div>').attr({
                    class: 'col-md-6 col-sm-12 mb-1 mt-1 resultDiv'
                }).appendTo($('#resultSearch'));
                
                // récupération des infos du film
                var movieId = data['results'][i]['id'];
                var movieTitle = data['results'][i]['title'];
                var movieDesc = data['results'][i]['description'];
                var movieImg = data['results'][i]['image'];
                // récupération id de l'image
                var imageId = data['results'][i]['image'].split('/');
                var caseCible = imageId.length - 1;
                console.log(imageId[caseCible]);
                var miniVisioImg = "https://imdb-api.com/Images/192x264/" + imageId[caseCible];
                console.log(miniVisioImg);


                
                // Mise en forme et affichage
                $('<p></p>').html("id IMDB : " + movieId).appendTo($(currentDiv));
                $('<p></p>').html("Titre : " + movieTitle).appendTo($(currentDiv));
                $('<p></p>').html(movieDesc).appendTo($(currentDiv));
                $('<br>').appendTo($(currentDiv));
                $('<img></img>').attr({
                    title: movieTitle,
                    alt: movieTitle,
                    src: miniVisioImg
                }).appendTo($(currentDiv));

                
                
                
            }
        }
    }







})