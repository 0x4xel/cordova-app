"use strict";
import { General } from "./funciones";
import { Constantes } from "./constantes";
import { ComunicacionAjax } from "./ComunicacionAjax";

$(function () {

	void cargaInicial();
	inicializarOnClicks();
});

async function cargaInicial() {
	const asignatura_id = String(localStorage.getItem("asignatura_id"));
	$("body").attr("data-id", asignatura_id);
	void getDatosAsignatura(asignatura_id);

	//localStorage.setItem("asignatura_id", "");
}


function inicializarOnClicks() {

	$(document).on("click", ".seleccionarAlumno", function (this : HTMLElement) {
		const id = String($(this).attr("data-id"));
		localStorage.setItem("alumno_id", id);
		window.location.href = "alumno_profile.html";
	});
	
}

async function getDatosAsignatura(asignatura_id: string): Promise<void> {

	let id = localStorage.getItem("user_id");

	limpiarDatosAsignatura();
	$("#divAlumnos").html();

	let url = "/asignatura/buscar/" + asignatura_id;
	let data = {};

	let response = await ComunicacionAjax.sendAjaxRequest("GET", Constantes.URL_API + url, data);
	console.log(response);


	if (response.status == "success") {
		const asignatura = response.data.asignatura[0];
		$("#txtPrimeraLetraNombreAsignatura").text(asignatura.nombre.charAt(0).toUpperCase());
		$("#nombreAsignatura").text(asignatura.nombre);
		$("#descripcionAsignatura").text("");
		$("#txtValorAsignatura").text(asignatura.id);
		$("#txtHorasSemanales").text(asignatura.horas_semana);
		$("#txtAlumnosInscritos").text(asignatura.Alumnos.length);
		$("#txtNombreCurso").text(asignatura.Curso.nombre);
		$("#txtGrado").text(asignatura.Curso.Carrera.nombre);
		$("#Alumnos").text("Alumnos (" + asignatura.Alumnos.length + ")");
		$("#Evaluacion").text("Examen (" + asignatura.Examens.length + ")");


		if (asignatura.Alumnos.length > 0) asignatura.Alumnos.forEach(addLineaAlumno);
		if (asignatura.Examens.length > 0) asignatura.Examens.forEach(addLineaExamen);
	

		
		// response.data.asignaturas.forEach(addTarjetaAsignatura);
		// window.location.href = "index.html";
	} else {
		// $("#txtErrorLogin").show();
		// $("#txtErrorLogin").addClass("d-flex");
		// $("#respuestaLogin").text(response.message);
	}
}


function limpiarDatosAsignatura() {

}

function addLineaAlumno(linea: any) {
	const tarjeta = $("#plantillaAlumno").clone();
	tarjeta.addClass("seleccionarAlumno");
	tarjeta.attr("data-id", linea.id);

	tarjeta.removeAttr("id");
	tarjeta.find("#nombreAlumno").text(linea.nombre);
	tarjeta.find("#nombreAlumno").text(linea.nombre);
	tarjeta.find("#nombreAlumno").text(linea.nombre + " " + linea.primerApellido + " " + linea.segundoApellido);

	$("#divAlumnos").append(tarjeta);
}

function addLineaExamen(linea: any) {
	const tarjeta = $("#plantillaEvaluacion").clone();
	tarjeta.addClass("seleccionarExamen");
	tarjeta.attr("data-id", linea.id);
	tarjeta.removeAttr("id");

	tarjeta.find("#txtnombreExamen").text(linea.descripcion);
	tarjeta.find("#txtTipoEvaluacion").text(linea.Evaluacion.nombre);
	tarjeta.find("#txtFechaExamen").text(linea.fecha);

	$("#divEvaluaciones").append(tarjeta);
}
