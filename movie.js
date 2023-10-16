const apiKey = '536b0f53';
function searchMovie() {
    $('#movie-list').html('');

    let inputSearch = $(".input-search").val();
    let load = document.querySelector("#load");
    load.classList.add("loader-show");

    setTimeout(() => {
        $.ajax({
            url: `https://www.omdbapi.com/?apikey=${apiKey}&s=${inputSearch}`,
            type: 'GET',
            dataType: 'json',
            success: function (result) {
                if (result.Response == "True") {
                    load.classList.remove("loader-show");
                    load.classList.add("loader-hide");
                    let movies = result.Search;
                    $.each(movies, function (i, data) {
                        $('#movie-list').append(`
                        <div class="card ms-1 me-4 mb-3  " style="width: 20rem;">
                            <img src="`+ data.Poster + `" class="card-img-top mt-3" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">`+ data.Title + `</h5>
                                <p class="card-text">`+ data.Year + `</p>
                                <a href="#" class="text-decoration-none see-detail"  data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="`+ data.imdbID + `">See Detail</a>
                            </div>
                        </div>
                        `)
                    })
                } else {
                    load.classList.remove("loader-show");
                    load.classList.add("loader-hide");
                    $('#movie-list').html('<h1>Movie Not Found</h1>');
                }
            }
        });
    }, 500);
}

$('#keyword').on('click', function () {
    searchMovie();
});
$('.input-search').on('keyup', function (e) {
    if (e.keyCode === 13) {
        searchMovie();
    }
});
$('#movie-list').on('click', '.see-detail', function () {
    $.ajax({
        url: `https://www.omdbapi.com/?apikey=${apiKey}&i=` + $(this).data("id"),
        type: 'GET',
        dataType: 'json',
        success: function (movie) {
            if (movie.Response == "True") {
                $('.modal-body').html(`
                    <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-4">
                            <img src="`+ movie.Poster + `" class="img-fluid">
                        </div>
                        <div class="col-md-8">
                            <ul class="list-group">
                                <li class="list-group-item"> Title : `+ movie.Title + `</li>
                                <li class="list-group-item"> Year : `+ movie.Year + `</li>
                                <li class="list-group-item"> Director : `+ movie.Director + `</li>
                                <li class="list-group-item"> Actors : `+ movie.Actors + `</li>
                            </ul>
                        </div>
                    </div>
                </div>
               `)
            }
        }
    });
});
