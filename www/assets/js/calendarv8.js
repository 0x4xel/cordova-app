
"use strict";

// Setup the calendar with the current date
$(document).ready(async function () {
    var date = new Date();
    var today = date.getDate();
    // Set click handlers for DOM elements
    $(".right-button").click({date: date}, next_year);
    $(".left-button").click({date: date}, prev_year);
    
    $(document).on("click", ".seleccionarNota", function () {
        const id = $(this).attr("data-id");
        $("#txtNota").val("");
        console.log(eventsDisplay[id]);
        $("#txtNota").val(eventsDisplay[id]);
        $("#guardarNota").attr("data-id", id);
    });

    $(document).on("click", "#guardarNota", function () {
        const id = $(this).attr("data-id");
        const texto = $("#txtNota").val();
        guardarNota(id, texto);
    });

    
    await getEventosSemanaDocente();

    $(".months-row").children().eq(date.getMonth()).addClass("active-month");
    init_calendar(date);
    var events = check_events(today, date.getMonth() + 1, date.getFullYear());
    show_events(events, months[date.getMonth()], today);
});

// Initialize the calendar by appending the HTML dates
function init_calendar(date) {
    $(".tbody").empty();
    $(".events-container").empty();
    var calendar_days = $(".tbody");
    var month = date.getMonth();
    var year = date.getFullYear();
    var day_count = days_in_month(month, year);
    var row = $("<tr class='table-row'></tr>");
    var today = date.getDate();
    // Set date to 1 to find the first day of the month
    date.setDate(1);
    var first_day = date.getDay();
    // 35+firstDay is the number of date elements to be added to the dates table
    // 35 is from (7 days in a week) * (up to 5 rows of dates in a month)
    for (var i = 0; i < 35 + first_day; i++) {
        // Since some of the elements will be blank, 
        // need to calculate actual date from index
        var day = i - first_day + 1;
        // If it is a sunday, make a new row
        if (i % 7 === 0) {
            calendar_days.append(row);
            row = $("<tr class='table-row'></tr>");
        }
        // if current index isn't a day in this month, make it blank
        if (i < first_day || day > day_count) {
            var curr_date = $("<td class='table-date nil'>" + "</td>");
            row.append(curr_date);
        }
        else {
            var curr_date = $("<td class='table-date'>" + day + "</td>");
            var events = check_events(day, month + 1, year);
            if (today === day && $(".active-date").length === 0) {
                curr_date.addClass("active-date");
                show_events(events, months[month], day);
            }
            // If this date has any events, style it with .event-date
            if (events.length !== 0) {
                curr_date.addClass("event-date");
            }
            // Set onClick handler for clicking a date
            curr_date.click({ events: events, month: months[month], day: day }, date_click);
            row.append(curr_date);
        }
    }
    // Append the last row and set the current year
    calendar_days.append(row);
    $(".year").text(months[month] + " - " + year);
}

// Get the number of days in a given month/year
function days_in_month(month, year) {
    var monthStart = new Date(year, month, 1);
    var monthEnd = new Date(year, month + 1, 1);
    return (monthEnd - monthStart) / (1000 * 60 * 60 * 24);
}

// Event handler for when a date is clicked
function date_click(event) {
    $(".events-container").show(250);
    $("#dialog").hide(250);
    $(".active-date").removeClass("active-date");
    $(this).addClass("active-date");
    show_events(event.data.events, event.data.month, event.data.day);
};

// Event handler for when a month is clicked
function month_click(event) {
    $(".events-container").show(250);
    $("#dialog").hide(250);
    var date = event.data.date;
    $(".active-month").removeClass("active-month");
    $(this).addClass("active-month");
    var new_month = $(".month").index(this);
    date.setMonth(new_month);
    init_calendar(date);
}

// // Event handler for when the year right-button is clicked
function next_year(event) {
    // $("#dialog").hide(250);
    // var date = event.data.date;
    // var new_year = date.getFullYear()+1;
    // $("year").html(new_year);
    // date.setFullYear(new_year);
    // init_calendar(date);


    $(".events-container").show(250);
    $("#dialog").hide(250);
    var date = event.data.date;
    // $(".active-month").removeClass("active-month");
    // $(this).addClass("active-month");
    var new_month = date.getMonth() + 1 ;
    date.setMonth(new_month);
    init_calendar(date);
}

// Event handler for when the year left-button is clicked
function prev_year(event) {
    $(".events-container").show(250);
    $("#dialog").hide(250);
    var date = event.data.date;
    var new_month = date.getMonth() - 1 ;
    date.setMonth(new_month);
    init_calendar(date);
}

// Event handler for clicking the new event button
function new_event(event) {
    // if a date isn't selected then do nothing
    if ($(".active-date").length === 0)
        return;
    // remove red error input on click
    $("input").click(function () {
        $(this).removeClass("error-input");
    })
    // empty inputs and hide events
    $("#dialog input[type=text]").val('');
    $("#dialog input[type=number]").val('');
    $(".events-container").hide(250);
    $("#dialog").show(250);
    // Event handler for cancel button
    // $("#cancel-button").click(function() {
    //     $("#name").removeClass("error-input");
    //     $("#count").removeClass("error-input");
    //     $("#dialog").hide(250);
    //     $(".events-container").show(250);
    // });
    // // Event handler for ok button
    // $("#ok-button").unbind().click({date: event.data.date}, function() {
    //     var date = event.data.date;
    //     var name = $("#name").val().trim();
    //     var count = parseInt($("#count").val().trim());
    //     var day = parseInt($(".active-date").html());
    //     // Basic form validation
    //     if(name.length === 0) {
    //         $("#name").addClass("error-input");
    //     }
    //     else if(isNaN(count)) {
    //         $("#count").addClass("error-input");
    //     }
    //     else {
    //         $("#dialog").hide(250);
    //         console.log("new event");
    //         new_event_json(name, count, date, day);
    //         date.setDate(day);
    //         init_calendar(date);
    //     }
    // });
}

function getMonday() {
    let d = new Date(); var day = d.getDay(), diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday 
    return new Date(d.setDate(diff));
}

function getDiaSemanaActual(numero) {
    let myDate = getMonday();   // inicializo a lunes

    if (numero < 0 || numero > 6) {
        return 0;
    }
    while (myDate.getDay() != numero) {
        myDate.setDate(myDate.getDate() + 1);
    }
    return myDate;
}



function addEventos(linea) {
    console.log(linea);
    let date  = getDiaSemanaActual(traducirHoras[linea.Hora.dia]);
    var event = {
        "id": linea.id,
        "asignatura": linea.Asignatura.nombre,
        "year": date.getFullYear(),
        "month": date.getMonth() + 1,
        "day": date.getDate(),
        "hora_inicio": linea.Hora.hora_inicio,
        "hora_fin": linea.Hora.hora_fin,
        "notas": linea.notas,
    };
    event_data["events"].push(event);
}

// Display all events of the selected date in card views
function show_events(events, month, day) {
    // Clear the dates container
    eventsDisplay = {};
    $(".events-container").empty();
    $(".events-container").show(250);
    console.log(event_data["events"]);
    // If there are no events for this date, notify the user
    if (events.length === 0) {
        var event_card = $("<div class='event-card'></div>");
        var event_name = $("<div class='event-name'>No existen eventos para " + month + " " + day + ".</div>");
        $(event_card).css({ "border-left": "10px solid #FF1744" });
        $(event_card).append(event_name);
        $(".events-container").append(event_card);
    }
    else {
        // Go through and add each event as a card to the events container
        for (var i = 0; i < events.length; i++) {

          
            var event_card = $("<div class='event-card seleccionarNota' data-id = '" + events[i]["id"] + "'  data-bs-toggle='modal' data-bs-target='#modalEditarCalendario' ></div>");
            var event_name = $("<div class='event-name'>" + events[i]["asignatura"] + "</div>");
            var event_count = $("<div class='event-count'><div>" + events[i]["hora_inicio"].slice(0,-3) + "</div> <div>" + events[i]["hora_fin"].slice(0,-3) + "<dvi></div>");
            eventsDisplay[events[i]["id"]] = events[i]["notas"];


            $(event_card).append(event_count).append(event_name);
            $(".events-container").append(event_card);
        }
    }
}

// Checks if a specific date has any events
function check_events(day, month, year) {
    var events = [];
    for (var i = 0; i < event_data["events"].length; i++) {
        var event = event_data["events"][i];
        if (event["day"] === day &&
            event["month"] === month &&
            event["year"] === year) {
            events.push(event);
        }
    }
    return events;
}




async function getEventosSemanaDocente() {

    let id = localStorage.getItem("user_id");

    event_data["events"] = [];

    let url = "/asignaturaHora";
    let data = {};

    let response = await sendAjaxRequest("GET", url, data);

    
    if (response.status == "success") {
        response.data.asignaturasHoras.forEach(addEventos);
    } else {
    }
}
// Given data for events in JSON format
var event_data = {
    "events": []
};

var eventsDisplay = [];

const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
];

const traducirHoras = {
    "Domingo": 0,
    "Lunes": 1,
    "Martes": 2,
    "Miercoles": 3,
    "Jueves": 4,
    "Viernes": 5,
    "Sabado": 6
};

async function guardarNota(idnota, texto) {
    let id = localStorage.getItem("user_id");

    event_data["events"] = [];

    let url = "/asignaturaHora/modifica/nota/" + idnota;
    let data = {notas:texto};

    let response = await sendAjaxRequest("PUT", url, data);

    if (response.status == "success") {
       eventsDisplay[idnota] = texto;
    } else {
    }
}



async function sendAjaxRequest(type,url, data) {
  
    let token = localStorage.getItem("token");
    console.log(token);
    const opciones = {
        url: 'http://192.168.0.18:3000/v1' + url,
        type: type,
        dataType: "json",
        headers: { 'X-Auth-Token': token },
        data: JSON.stringify(data),
        contentType: 'application/json',
    };

    const promiseReq = $.ajax(opciones);

    try {
        const response = await promiseReq;
        console.log(response);
        return response;
    } catch (err) {
        console.error(err.responseJSON);
        return err.responseJSON;
    }
}