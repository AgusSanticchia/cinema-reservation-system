function updateHour() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var dayWeek = date.getDay();
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    
    var nameOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    var nameOfMonth = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    // Add leading zeros
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    document.getElementById("hour").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
    document.getElementById("ampm").textContent = ampm;
    document.getElementById("dayWeek").textContent = nameOfWeek[dayWeek];
    document.getElementById("day").textContent = day;
    document.getElementById("month").textContent = nameOfMonth[month];
    document.getElementById("year").textContent = year;
}

// Initial call to display time immediately
updateHour();

// Update every second
setInterval(updateHour, 1000);


$(document).ready(function(){
    
    $(".container-form").find("input, textarea").on("keyup blur focus", function (e) {

        var $this = $(this),
          label = $this.prev("label");

        if (e.type === "keyup") {
            if ($this.val() === "") {
                label.removeClass("active highlight");
            } else {
                label.addClass("active highlight");
            }
        } else if (e.type === "blur") {
            if($this.val() === "") {
                label.removeClass("active highlight"); 
                } else {
                label.removeClass("highlight");   
                }   
        } else if (e.type === "focus") {
            if($this.val() === "") {
                label.removeClass("highlight"); 
            } 
            else if($this.val() !== "") {
                label.addClass("highlight");
            }
        }

    });

    $(".tab a").on("click", function (e) {

        e.preventDefault();

        $(this).parent().addClass("active");
        $(this).parent().siblings().removeClass("active");

        target = $(this).attr("href");

        $(".contenido-tab > div").not(target).hide();

        $(target).fadeIn(600);

    });
    
});

function showSection(sectionId) {
    // Oculta todas las secciones
    document.getElementById('createMovies').style.display = 'none';
    document.getElementById('showMovies').style.display = 'none';
    // Muestra la sección seleccionada
    if(sectionId=="showMovies"){
        document.getElementById(sectionId).style.display = 'block';
        UnfoldTable();
    }else{
        document.getElementById(sectionId).style.display = 'block';
    }
}

// Obtén el token JWT del almacenamiento local
var jwtToken = localStorage.getItem("jwtToken");

function DeleteMovie() {
    var id = document.getElementById('id').value;
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/admin/movie/" + id,
        headers: {
            "Authorization": "Bearer " + jwtToken
        },
        success: function(response) {
            alert("Moviee deleted successfully");;
            UnfoldTable();
        },
        error: function(error) {
            alert("Error deleting movie");
            console.error("Error:", error);
        }
    });
}

function SearchMovie() {
    var id = document.getElementById('id').value;
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/admin/movie/" + id,
        headers: {
            "Authorization": "Bearer " + jwtToken
        },
        success: function(item) {
            $("#showDataMovies > tbody").empty();
            var row =
                "<tr>" +
                "<td>" + item.id + "</td>" +
                "<td>" + item.title + "</td>" +
                "<td>" + item.description + "</td>" +
                "<td>" + item.posterImage + "</td>" +
                "<td>" + item.genre + "</td>" +
                "<td>" + item.duration + "</td>" +
                "</tr>";
            $("#showDataMovies > tbody").append(row);
        },
        error: function(error) {
            alert("Error searching movie");
            console.error("Error:", error);
        }
    });
}

$("#Movie").on("submit", function(event) {
    event.preventDefault();
    var title = $("#title").val();
    var description = $("#description").val();
    var posterImage = $("#posterImage").val();
    var genre = $("#genre").val();
    var duration = $("#duration").val();

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/admin/movie",
        headers: {
            "Authorization": "Bearer " + jwtToken
        },
        contentType: "application/json",
        data: JSON.stringify({
            title: title,
            description: description,
            posterImage: posterImage,
            genre: genre,
            duration: duration
        }),
        success: function(response) {
            alert("Movie added successfully");
            $("#Movie")[0].reset();
        },
        error: function(error) {
            alert("Error adding movie");
            console.error("Error:", error);
        }
    });
});

function UnfoldTable() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/admin/movie",
        headers: {
            "Authorization": "Bearer " + jwtToken
        },
        dataType: "json",
        success: function(data) {
            $("#showDataMovies > tbody").empty();
            $.each(data, function(i, item) {
                var row =
                    "<tr>" +
                    "<td>" + item.id + "</td>" +
                    "<td>" + item.title + "</td>" +
                    "<td>" + item.description + "</td>" +
                    "<td>" + item.posterImage + "</td>" +
                    "<td>" + item.genre + "</td>" +
                    "<td>" + item.duration + "</td>" +
                    "</tr>";
                $("#showDataMovies > tbody").append(row);
            });
        },
        error: function(error) {
            console.error("Error loading the movie:", error);
        }
    });
}

