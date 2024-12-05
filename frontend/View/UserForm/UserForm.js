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

$(document).ready(function() {
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

    var target = $(this).attr("href");
    $(".container-tab > div").not(target).hide();
    $(target).fadeIn(600);
  });
});

function showSection(sectionId) {
  document.getElementById("createUser").style.display = "none";
  document.getElementById("showUsers").style.display = "none";
  if (sectionId == "showUsers") {
    document.getElementById(sectionId).style.display = "block";
    loadTable();
  } else {
    document.getElementById(sectionId).style.display = "block";
  }
}

function getJwtToken() {
  return localStorage.getItem("jwtToken");
}

function deleteUser() {
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
      alert("Error deleting the user");
      console.error("Error:", error);
    },
  });
  displayTable();
}

function findUser() {
  var id = document.getElementById("id").value;
  $.ajax({
    type: "GET",
    url: "http://localhost:8080/admin/users/" + id,
    headers: {
      "Authorization": "Bearer " + getJwtToken()
    },
    success: function (item) {
      $("#UsersDisplayData > tbody").empty();
      var row =
        "<tr>" +
        "<td>" + item.id + "</td>" +
        "<td>" + item.username + "</td>" +
        "<td>" + item.password + "</td>" +
        "<td>" + item.firstname + "</td>" +
        "<td>" + item.lastname + "</td>" +
        "<td>" + item.country + "</td>" +
        "<td>" + item.role + "</td>" +
        "</tr>";
      $("#UsersDisplayData > tbody").append(row);
    },
    error: function (error) {
      alert("Error finding the user");
      console.error("Error:", error);
    },
  });
}

$("#User").on("submit", function (event) {
  event.preventDefault();
  var username = $("#username").val();
  var password = $("#password").val();
  var firstname = $("#name").val();
  var lastname = $("#last").val();
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
      firstname: firstname,
      lastname: lastname,
      country: country,
      role: role
    }),
    success: function (response) {
      alert("User added successfully");
      $("#User")[0].reset();
    },
    error: function (error) {
      alert("Error adding the user");
      console.error("Error:", error);
    },
  });
});

function displayTable() {
  $.ajax({
    type: "GET",
    url: "http://localhost:8080/admin/users",
    headers: {
      "Authorization": "Bearer " + getJwtToken()
    },
    dataType: "json",
    success: function(data) {
      $("#UsersDisplayData > tbody").empty();
      $.each(data, function(i, item) {
        var row =
          "<tr>" +
          "<td>" + item.id + "</td>" +
          "<td>" + item.username + "</td>" +
          "<td>" + item.password + "</td>" +
          "<td>" + item.firstname + "</td>" +
          "<td>" + item.lastname + "</td>" +
          "<td>" + item.country + "</td>" +
          "<td>" + item.role + "</td>" +
          "</tr>";
        $("#UsersDisplayData > tbody").append(row);
      });
    },
    error: function(error) {
      console.error("Error loading users:", error);
    }
  });
}
