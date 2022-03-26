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
	void getTiposEvaluacion();

	//localStorage.setItem("asignatura_id", "");
}


function inicializarOnClicks() {

	$(document).on("click", ".seleccionarAlumno", function (this: HTMLElement) {
		const id = String($(this).attr("data-id"));
		localStorage.setItem("alumno_id", id);
		window.location.href = "alumno_profile.html";
	});


	$(document).on("click", ".eventoEvaluacion", function (this: HTMLElement) {
		const id = String($(this).attr("data-id"));
		$("#txtNombreModalExamen").text("Editar Examen");
		$("#guardarExamen").attr("data-tipo", "modficar");
		$("#borrarExamen").show();
		void getDatosExamen(id);
		
	});

	$(document).on("click", ".crearExamen", function (this: HTMLElement) {
		limpiarModalEditarExamen();
		$("#borrarExamen").hide();
		$("#txtNombreModalExamen").text("Crear Examen");
		$("#guardarExamen").attr("data-tipo", "crear");
	});

	$(document).on("click", "#guardarExamen", function (this: HTMLElement) {

		const id = String($(this).attr("data-id"));
		const tipo = String($(this).attr("data-tipo"));
		const evaluacion_id = String($("#comboEvaluaciones").val());
		const descripcion = String($("#txtDescripcionExamen").val());
		const fecha = String($("#txtfechaExamen").val());
		const porcentaje = parseFloat(String($("#txtPorcentajeExamen").val()));
		const asignatura_id = String($("body").attr("data-id"));
		if (tipo == "crear") {
			void crearExamen(asignatura_id, evaluacion_id, descripcion, porcentaje, fecha);
		} else {
			void guardarExamen(id, asignatura_id,evaluacion_id, descripcion, porcentaje, fecha);
		}
	});

	$(document).on("click", "#borrarExamen", function (this: HTMLElement) {
		const asignatura_id = String($("body").attr("data-id"));
		const id = String($(this).attr("data-id"));
		void borrarExamen(id,asignatura_id );
	
	});


	

}

async function getDatosAsignatura(asignatura_id: string): Promise<void> {

	limpiarDatosAsignatura();
	$("#divAlumnos").html("");
	$("#divEvaluaciones").html("");
	let url = `/asignatura/buscar/${asignatura_id}`;
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



async function getDatosExamen(examen_id: string) {

	limpiarModalEditarExamen();

	let url = `/examen/buscar/${examen_id}`;
	let data = {};

	let response = await ComunicacionAjax.sendAjaxRequest("GET", Constantes.URL_API + url, data);
	const examen = response.data.examen[0];

	$("#guardarExamen").attr("data-id", examen_id);
	$("#borrarExamen").attr("data-id", examen_id);
	$("#comboEvaluaciones").val(examen.Evaluacion.id);
	$("#txtDescripcionExamen").val(examen.descripcion);
	$("#txtfechaExamen").val(String(examen.fecha.replace('Z', '')));
	$("#txtPorcentajeExamen").val(examen.porcentaje);

}


function limpiarModalEditarExamen() {
	$("#txtDescripcionExamen").val("");
	$("#txtfechaExamen").val("");
	$("#txtPorcentajeExamen").val("");
}

async function getTiposEvaluacion() {

	let url = "/evaluacion";
	let data = {};

	let response = await ComunicacionAjax.sendAjaxRequest("GET", Constantes.URL_API + url, data);
	console.log(response);
	if (response.data.evaluaciones.length > 0) response.data.evaluaciones.forEach(addLineaEvaluacion);
}

function addLineaEvaluacion(linea: any): void {
	$("#comboEvaluaciones").append(
		`<option value="${linea.id}">${linea.nombre}</option>`
	);

}



//TODO 
async function guardarExamen(id: string, asignatura_id: string, evaluacion_id: string, descripcion: string, porcentaje: number, fecha: string): Promise<void> {
	// validaciones descripcion vacio, porcenajte > 0 y < 100 

	let url = `/examen/modificar/${id}`;
	let data = {
		id: id,
		asignatura_id: asignatura_id,
		evaluacion_id: evaluacion_id,
		descripcion: descripcion,
		porcentaje: porcentaje,
		fecha: fecha

	};

	let response = await ComunicacionAjax.sendAjaxRequest("PUT", Constantes.URL_API + url, data);
	console.log(response);

	if (response.status == "success") {
		await getDatosAsignatura(asignatura_id);
	} 
}



async function crearExamen(asignatura_id: string, evaluacion_id: string, descripcion: string, porcentaje: number, fecha: string): Promise<void> {

	let url = `/examen/crear/`;
	let data = {
		asignatura_id: asignatura_id,
		evaluacion_id: evaluacion_id,
		descripcion: descripcion,
		porcentaje: porcentaje,
		fecha: fecha
	};

	let response = await ComunicacionAjax.sendAjaxRequest("POST", Constantes.URL_API + url, data);
	if (response.status == "success") {
		await getDatosAsignatura(asignatura_id);
	} 
}

async function borrarExamen(id : string, asignatura_id : string) {

	let url = `/examen/eliminar/${id}`;
	let data = {};

	let response = await ComunicacionAjax.sendAjaxRequest("DELETE", Constantes.URL_API + url, data);
	if (response.status == "success") {
		await getDatosAsignatura(asignatura_id);
	} 
}