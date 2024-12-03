var hourId = 4;
let sideColumn = 4;
let centerColumn = 16;
let row = 6;
const letter = ['A', 'B', 'C', 'D', 'E', 'F'];
const groups = [
    {selector: '.side-seats:first-child table', columns: sideColumn},
    {selector: '.center-seats table', columns: centerColumn},
    {selector: '.row-seats:last-child table', columns: sideColumn},
];

let seatNumber = 1;

groups.forEach((group) =>{
    const thead = document.querySelector(`${group.selector} thead`);
    const tbody = document.querySelector(`${group.selector} tbody`);

    let rowThread = thread.insertRow();
    rowThread.insertCell();
    for (let i = 0; i < group.columns; i++) {
        rowThread.insertCell().innnerHTML = seatNumber;
        seatNumber++;
    }
   
    seatNumber -= group.columns;

    for(let i = 0; i < row; i++) {
        let rowTbody = tbody.insertRow();
        rowThread.insertCell().innnerHTML = letter[i];
        for (let j = 0; j < group.columns; j++) {
            let cell = rowTbody.insertCell();
            let button = document.createElement('button');
            button.className = 'seat-btn no-selected';
            button.dataset.seat = `${letter[i]}${seatNumber}`;
            button.innerHTML = `<i class= "material-icons" >event_seat</i><br>${letras[i]}${seatNumber}`;
            cell.appendChild(button);

            button.addEventListener('click', () => {
                if(!button.classList.contains('selected')){
                    button.classList.toggle('selected');
                    button.classList.toggle('no-selected');
                }
            });

            seatNumber++;
        }

        seatNumber -= group.columns;
    }

    seatNumber += group.columns;
});

getOccupiedSeats(showtimeId);

function markAsOccupied(seatId) {

    const seatButton = document.querySelector(`button[data-seat="${seatNumber}"]`);
    
    if(seat){
        seat.classList.add('occupied');
        seat.classList.remove('select', 'no-selected');
        seat.disable = true;
    }else{
        console.log('Seat not found', seatId);
    }
}

document.querySelector('#show-seats').addEventListener('click', () => {
    let seatsSelecteds = [];
    document.querySelectorAll('.selected').forEach((seat) => {
        seatsSelecteds.push(btn.dataset.seat);
    });
    console.log('Seats selected', seatsSelecteds);
});
let priceBySeat = 10;
document.querySelector('#show-seats').addEventListener('click', () => {
    let seatsSelecteds = [];
    document.querySelectorAll('.selected').forEach((seat) => {
        seatsSelecteds.push(btn.dataset.seat);
    });
    let total = seatsSelecteds.length * priceBySeat;
    document.getElementById('seats-selected').textContent = `Seats selected: ${seatsSelecteds.join(', ')}`;
    document.getElementById('total-price').textContent = `Total: $${total.toFixed(2)}`;
    document.getElementById('reserve-btn').style.display = 'inline-block'; 
});

let seatsSelecteds = [];

document.querySelectorAll('#reserve-btn').addEventListener('click', () => {
    let seatsSelecteds = [];
    document.querySelectorAll('.selected').forEach(btn => {
        seatsSelecteds.push(btn.dataset.seat);
        btn.classList.add('occoupied');
        btn.classList.remove('selected');
        btn.disabled = true;
    });

    alert (`Reserve done for seats: ${seatsSelecteds.join(', ')}`);
    document.getElementById('seats-selected').textContent = '';
    document.getElementById('total-price').textContent = '';
    document.getElementById('reserve-btn').style.display = 'none';

    sendSeatsSelected(showtimeId);
});

function showReservations(reservations) {
    const reservationsList = document.getElementById('reservations-list');
    reservationsList.innerHTML = '';
    reservations.forEach(reservation => {
        reservationsList.innerHTML += `<p>Reservation ID: ${reservation.id}, Showtime ID: ${reservation.showtimeId}</p>`;
    });
}

async function sendSeatsSelected(hourId) {
    const jwtToken = localStorage.getItem("jwtToken");
  
    if (seatsSelecteds.length === 0) {
        alert('You have not selected a seat.');
        return;
    }
  
    try {
        const response = await fetch(`http://localhost:8080/user/reservation/${hourId}/add-seats`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            },
            body: JSON.stringify(seatsSelecteds)
        });
  
        if (!response.ok) {
            throw new Error('Error sending seats.');
        }
  
        const result = await response.json();
  
        if (result.message) {
            alert(result.message);
  
            seatsSelecteds.forEach(seat => {
                markAsOccupied(seat);
            });
  
  
            await getSeatsOccoupied(hourId);
        } else {
            alert('There was a problem booking the seats.');
        }
  
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while reserving the seats.');
    }
}

async function getOccupiedSeats(hourId) {
    const jwtToken = localStorage.getItem("jwtToken");
  
    try {
        const response = await fetch(`http://localhost:8080/user/reservation/${hourId}/occupied-seats`, {
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        });
  
        if (!response.ok) {
            throw new Error('Error in obtaining the seats occupied.');
        }
  
        const seatsOccoupied = await response.json();
  
        seatsOccoupied.forEach(seat => {
            markAsOccupied(seat);
        });
  
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred when obtaining the seats occupied.');
    }
}