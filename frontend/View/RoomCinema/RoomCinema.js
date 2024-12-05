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

        $(".container-tab > div").not(target).hide();

        $(target).fadeIn(600);

    });
    
});

function showSection(sectionId) {

    document.getElementById('createRoom').style.display = 'none';
    document.getElementById('showRoom').style.display = 'none';
    // Muestra la sección seleccionada
    if(sectionId=="showRoom"){
        document.getElementById(sectionId).style.display = 'block';
        DesplegarTabla();
    }else{
        document.getElementById(sectionId).style.display = 'block';
    }
}


var jwtToken = localStorage.getItem("jwtToken");

function deleteRoom() {
    var id = document.getElementById('id').value;
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/admin/room/" + id,
        headers: {
            "Authorization": "Bearer " + jwtToken
        },
        success: function(response) {
            alert("Room deleted successfully");
            DesplegarTabla();
        },
        error: function(error) {
            alert("Error deleting room");
            console.error("Error:", error);
        }
    });
    displayTable();
}

function searchRoom() {
    var id = document.getElementById('id').value;
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/admin/room/" + id,
        headers: {
            "Authorization": "Bearer " + jwtToken
        },
        success: function(item) {
            $("#showRoom > tbody").empty();
            var row =
                "<tr>" +
                "<td>" + item.id + "</td>" +
                "<td>" + item.nombre + "</td>" +
                "<td>" + item.capacidad + "</td>" +
                "</tr>";
            $("#showRoom > tbody").append(row);
        },
        error: function(error) {
            alert("Error al buscar la sala");
            console.error("Error:", error);
        }
    });
}

$("#HallCinema").on("submit", function(event) {
    event.preventDefault();
    var nombre = $("#nombre").val();
    var capacidad = $("#capacidad").val();

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/admin/room",
        headers: {
            "Authorization": "Bearer " + jwtToken
        },
        contentType: "application/json",
        data: JSON.stringify({
            nombre: nombre,
            capacidad: capacidad
        }),
        success: function(response) {
            alert("Room added successfully");
            $("#HallCinema")[0].reset();
        },
        error: function(error) {
            alert("Error adding room");
            console.error("Error:", error);
        }
    });
});

function displayTable() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/admin/room",
        headers: {
            "Authorization": "Bearer " + jwtToken
        },
        dataType: "json",
        success: function(data) {
            $("#showDataRoom > tbody").empty();
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
                $("#showDataRoom > tbody").append(row);
            });
        },
        error: function(error) {
            console.error("Error loading the movie:", error);
        }
    });
}