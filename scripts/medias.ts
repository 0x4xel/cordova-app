"use strict";
import { General } from "./funciones";
import { Constantes } from "./constantes";
import { ComunicacionAjax } from "./ComunicacionAjax";


let hashExamenes: any[] = [];
function receivedEvent(id: string) {
	const parentElement = document.getElementById(id);
	if (parentElement != null) {
		const listeningElement = parentElement.querySelector(".listening");
		const receivedElement = parentElement.querySelector(".received");

		listeningElement?.setAttribute("style", "display:none;");
		receivedElement?.setAttribute("style", "display:block;");

		console.log("Received Event: " + id);
	}
}

document.addEventListener("deviceready", async function () {
	receivedEvent("deviceready");

}, false);




$(function () {
	void cargaInicial();

	inicializarOnClicks();
	void getAsignaturasDocente();
});

function inicializarOnClicks() {
	$(document).on("change", "#comboAsignaturas", function (this: HTMLElement) {
		const asignatura_id = String($(this).children(":selected").val());
		$("#divExamenes").show();

		void getExamenesAsignatura(asignatura_id);
	});

}


async function cargaInicial() {
	//Solo para moviles (Probar)
	window.screen.orientation
		.lock("landscape")
		.then(
			success => console.log(success),
			failure => console.log(failure)
		)
}


async function getAsignaturasDocente(): Promise<void> {

	let id = localStorage.getItem("user_id");


	let url = "/userAsignaturas/" + id;
	let data = {};

	let response = await ComunicacionAjax.sendAjaxRequest("GET", Constantes.URL_API + url, data);
	console.log(response);


	if (response.status == "success") {
		response.data.asignaturas.forEach(addComboAsignaturas);
	} else {

	}
}


function addComboAsignaturas(linea: any) {	// todo cambiar
	$("#comboAsignaturas").append(`<option value="${linea.id}">${linea.nombre}</option>`);
}


async function getExamenesAsignatura(asignatura_id: string) {

	$("#comboExamenesAsignatura").html(`<option value="">Selecciona un examen</option>`);

	if (asignatura_id == "") return;


	let url = `/asignatura/buscar/${asignatura_id}`;
	let data = {};

	let response = await ComunicacionAjax.sendAjaxRequest("GET", Constantes.URL_API + url, data);

	if (response.status == "success") {
		const asignatura = response.data.asignatura[0];
		if (asignatura.Examens.length <= 0) {
			$("#divExamenes").hide();
			console.log("no hay examenes");
			return;
		}
		$("#txtNombreAsignatura").text(asignatura.nombre);
		$(".columnasExamenes").html(`<td>Alumno</td>`);

		const hashAlumnos = asignatura.Alumnos.map(function (alumno: any) {
			return alumno.id;
		});

		asignatura.Examens.forEach(addColumnaTablaExamenes);
		$(".columnasExamenes").append(`<td>Media</td>`);
		console.log(hashAlumnos);
		hashExamenes = asignatura.Examens.map(function (examen: any) {
			return examen.id;
		});

		hashAlumnos.forEach(getNotasAsignaturaAlumno);



	}
}

async function addColumnaTablaExamenes(linea: any) {

	$(".columnasExamenes").append(`<td>${linea.descripcion} (${linea.porcentaje}%)</td>`);
}

//TODO ACABAR DE HACERLO
async function getNotasAsignaturaAlumno(alumno_id: string) {
	const asignatura_id = String($("#comboAsignaturas").children(":selected").val());
	let url = `/examenAlumno/${asignatura_id}/${alumno_id}`;
	let data = {};
	$("#bodyAlumnos").html("");
	let response = await ComunicacionAjax.sendAjaxRequest("GET", Constantes.URL_API + url, data);
	if (response.status == "success") {
		const notas = response.data.examenes;
		if (notas.length <= 0) {
			// addNotaAlumno({nota: "-"});
			return;
		}
		let alumno = notas[0];
		let alumno_id = alumno.Alumno.id;
		$("#bodyAlumnos").append(`<tr id ="${alumno_id}">`);
		$("tr#" + alumno_id).append(`<td>${alumno.Alumno.nombre}  ${alumno.Alumno.primerApellido}  ${alumno.Alumno.segundoApellido}</td>`);
		// $("#bodyAlumnos").append(`<td><img src="${linea.Alumno.picture}"></img>${linea.Alumno.nombre}  ${linea.Alumno.primerApellido}  ${linea.Alumno.segundoApellido}</td>`);
		$("tr#" + alumno_id).append(`</td>`);
		hashExamenes.forEach(examen_id => addNotaExamen(examen_id, notas));

		//  linea.examenes.forEach(addNotaExamen);
		$("tr#" + alumno_id).append(`<td>TODO</td>`);
	} else {
		console.log("error");
	}

}


function addNotaExamen(examen_id: any, examenesAlumno: any) {
	console.log(examenesAlumno);
	console.log(examen_id);
	//busca la nota que coincide con examenesAlumno
	const nota: any = examenesAlumno.find(function (nota: any) {
		return nota.examen_id == examen_id;
	});
	let alumno_id = examenesAlumno[0].Alumno.id;
	//pinto la nota en bodyalumnos
	$("tr#" + alumno_id).append(`<td>${nota.nota}</td>`);
}



