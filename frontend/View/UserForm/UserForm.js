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


$(document).ready(function () {
    $(".container-form")
    .find("input, textarea")
    .on("keyup blur focus", function (e) {
        var $this = $(this),
        label = $this.prev("label");
        if (e.type === "keyup") {
        if ($this.val() === "") {
          label.removeClass("active highlight");
        } else {
          label.addClass("active highlight");
        }
      } else if (e.type === "blur") {
        if ($this.val() === "") {
          label.removeClass("active highlight");
        } else {
          label.removeClass("highlight");
        }
      } else if (e.type === "focus") {
        if ($this.val() === "") {
          label.removeClass("highlight");
        } else if ($this.val() !== "") {
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

function showSection (sectionId) {
     // Oculta todas las secciones
    document.getElementById("createUser").style.display = "none";
    document.getElementById("showUsers").style.display = "none";
    // Muestra la sección seleccionada
    if (sectionId == "showUsers") {
        document.getElementById(sectionId).style.display = "block";
        DesplegarTabla();
    } else {
        document.getElementById(sectionId).style.display = "block";
    }
}

function getJwtToken() {
    return localStorage.getItem('jwtToken');
}

function deleteUSer(){
    var id = document.getElementById("id").value;
    $.ajax({
      type: "DELETE",
      url: "http://localhost:8080/admin/users/" + id,
      headers: {
        "Authorization": "Bearer " + getJwtToken()
      },
      success: function (response) {
        alert("User deleted successfully");
      },
      error: function (error) {
        alert("Error deleting user");
        console.error("Error:", error);
      },
    });
    UnfoldTable();
}

function searchUser(){
    var id = document.getElementById("id").value;
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/admin/users/" + id,
        headers: {
        "Authorization": "Bearer " + getJwtToken()
        },
        success: function (item){
        var row =
            "<tr>" +
            "<td>" +
            item.id +
            "</td>" +
            "<td>" +
            item.username +
            "</td>" +
            "<td>" +
            item.password +
            "</td>" +
            "<td>" +
            item.name +
            "</td>" +
            "<td>" +
            item.surname +
            "</td>" +
            "<td>" +
            item.country +
            "</td>" +
            "<td>" +
            item.role +
            "</td>" +
            "</tr>";
        $("#showDataUsers > tbody").append(row);
        }, 
        error: function (error) {
        alert("Error searching user");
        console.error("Error:", error);
        } 
    });  
}

$("#User").on("submit", function (event) {
    event.preventDefault();
    var username = $("#username").val();
    var password = $("#password").val();
    var name = $("#name").val();
    var surname = $("#surname").val();
    var country = $("#country").val();
    var role = $("#role").val();
  
    $.ajax({
      type: "POST",
      url: "http://localhost:8080/admin/users",
      contentType: "application/json",
      headers: {
        "Authorization": "Bearer " + getJwtToken()
      },
      data: JSON.stringify({
        username: username,
        password: password,
        name: name,
        surname: surname,
        country: country,
        role: role
      }),
      success: function (response) {
        alert("User created successfully");
        $("#User")[0].reset();
      },
      error: function (error) {
        alert("Error creating user");
        console.error("Error:", error);
      },
    });
  });

function UnfoldTable(){
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/admin/users",
        dataType: "json",
        headers: {
            "Authorization": "Bearer " + getJwtToken()
        },
        success: function (data) {
        $("#showDataUsers > tbody").empty();
            $.each(data, function (i, item) {
                var row =
                    "<tr>" +
                    "<td>" +
                    item.id +
                    "</td>" +
                    "<td>" +
                    item.username +
                    "</td>" +
                    "<td>" +
                    item.password +
                    "</td>" +
                    "<td>" +
                    item.name +
                    "</td>" +
                    "<td>" +
                    item.surname +
                    "</td>" +
                    "<td>" +
                    item.country +
                    "</td>" +
                    "<td>" +
                    item.role +
                    "</td>" +
                    "</tr>";
            $("#showDataUsers > tbody").append(row);
            });
        },
        error: function (error) {
            console.error("Error loading users: ", error);
        },
    });
}