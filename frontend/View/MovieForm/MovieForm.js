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
