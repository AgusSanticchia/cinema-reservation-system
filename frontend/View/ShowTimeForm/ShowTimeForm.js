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

updateHour();
setInterval(updateHour, 1000);



$(document).ready(function(){
    
    $(".form-container").find("input, textarea").on("keyup blur focus", function (e) {

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

        $(".tab-content > div").not(target).hide();

        $(target).fadeIn(600);

    });
    
});


function getJwtToken() {
    return localStorage.getItem("jwtToken");
}

function showSection(sectionId) {
    // Hide all sections
    document.getElementById('createShowTime').style.display = 'none';
    document.getElementById('showTimes').style.display = 'none';
    // Show the selected section
    if(sectionId == "showTimes"){
        document.getElementById(sectionId).style.display = 'block';
        displayTable();
    }else{
        document.getElementById(sectionId).style.display = 'block';
    }
}
// Function to delete a showtime
function deleteShowTime() {
    var id = document.getElementById('id').value;
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/admin/showtime/" + id,
        headers: {
            "Authorization": "Bearer " + getJwtToken() 
        },
        success: function(response) {
            alert("Showtime deleted successfully");
            displayTable();
        },
        error: function(error) {
            alert("Error deleting showtime");
            console.error("Error:", error);
        }
    });
}

// Function to search for a showtime
function searchShowTime() {
    var id = document.getElementById('id').value;
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/admin/showtime/" + id,
        headers: {
            "Authorization": "Bearer " + getJwtToken() 
        },
        success: function(item) {
            $("#showTimesData > tbody").empty();
            var row =
                "<tr>" +
                "<td>" + item.id + "</td>" +
                "<td>" + item.movie.id + "</td>" +
                "<td>" + item.room.id + "</td>" +
                "<td>" + item.year + "</td>" +
                "<td>" + item.month + "</td>" +
                "<td>" + item.day + "</td>" +
                "<td>" + item.hour + "</td>" +
                "<td>" + item.minutes + "</td>" +
                "</tr>";
            $("#showTimesData > tbody").append(row);
        },
        error: function(error) {
            alert("Error searching for showtime");
            console.error("Error:", error);
        }
    });
}

// Function to add a new showtime
$("#showTimeCinema").on("submit", function(event) {
    event.preventDefault();

    // Get form field values
    var movieId = $("#movieId").val();
    var roomId = $("#roomId").val();
    var year = $("#year").val();
    var month = $("#month").val();
    var day = $("#day").val();
    var hour = $("#hour").val();
    var minutes = $("#minutes").val();

    function getDetails() {
        return $.when(
            $.ajax({
                type: "GET",
                url: "http://localhost:8080/admin/movie/" + movieId,
                contentType: "application/json",
                headers: {
                    "Authorization": "Bearer " + getJwtToken() 
                }

            }),
            $.ajax({
                type: "GET",
                url: "http://localhost:8080/admin/room/" + roomId,
                contentType: "application/json",
                headers: {
                    "Authorization": "Bearer " + getJwtToken() // Include the JWT token in the header
                }
            })
        ).done(function(movieResponse, roomResponse) {
            var movie = movieResponse[0]; 
            var room = roomResponse[0];  

            $.ajax({
                type: "POST",
                url: "http://localhost:8080/admin/showtime",
                contentType: "application/json",
                headers: {
                    "Authorization": "Bearer " + getJwtToken() // Include the JWT token in the header
                },
                data: JSON.stringify({
                    movie_id: movie,
                    room_id: room,
                    year: year,
                    month: month,
                    day: day,
                    hour: hour,
                    minutes: minutes
                }),
                success: function(response) {
                    alert("Showtime added successfully");
                    $("#showTimeCinema")[0].reset();
                },
                error: function(error) {
                    alert("Error adding showtime");
                    console.error("Error:", error);
                }
            });
        }).fail(function(xhr, status, error) {
            alert("Error getting details");
            console.error("Error getting details:", status, error);
        });
    }
    getDetails();
});

// Function to display the showtimes table
function displayTable() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/admin/showtime",
        dataType: "json",
        headers: {
            "Authorization": "Bearer " + getJwtToken() // Include the JWT token in the header
        },
        success: function(data) {
            $("#showTimesData > tbody").empty();
            $.each(data, function(i, item) {
                var row =
                    "<tr>" +
                    "<td>" + item.id + "</td>" +
                    "<td>" + item.movie_id.id + "</td>" +
                    "<td>" + item.room_id.id + "</td>" +
                    "<td>" + item.year + "</td>" +
                    "<td>" + item.month + "</td>" +
                    "<td>" + item.day + "</td>" +
                    "<td>" + item.hour + "</td>" +
                    "<td>" + item.minutes + "</td>" +
                    "</tr>";
                $("#showTimesData > tbody").append(row);
            });
        },
        error: function(error) {
            console.error("Error loading showtimes:", error);
        }
    });
}

function generateReservations() {
    var token = localStorage.getItem("jwtToken"); 
    
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/admin/reservations/generate",
        headers: {
            "Authorization": "Bearer " + token
        },
        success: function(response) {
            alert("Reservations generated successfully");
        },
        error: function(error) {
            alert("Error generating reservations");
            console.error("Error:", error);
        }
    });
}
