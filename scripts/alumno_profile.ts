"use strict";
import { General } from "./funciones";
import { Constantes } from "./constantes";
import { ComunicacionAjax } from "./ComunicacionAjax";

$(function () {

	void cargaInicial();
	inicializarOnClicks();
});

async function cargaInicial() {

	$("#txtErrorLogin").hide();
	$("#txtErrorLogin").removeClass("d-flex");

	const alumno_id = String(localStorage.getItem("alumno_id"));
	$("body").attr("data-id", alumno_id);

	await getDatosAlumno(alumno_id);

	const asignatura_id = String($("#comboFiltroAsignaturas").val());
	if (asignatura_id != "") {
		void getNotasAsignaturaExamen(alumno_id,asignatura_id );
	}

	// localStorage.setItem("alumno_id", "");
}


function inicializarOnClicks() {

	$(document).on("click", ".eventoAsignatura", function (this: HTMLElement) {
		const id = String($(this).attr("data-id"));
		localStorage.setItem("asignatura_id", id);
		window.location.href = "asignatura_profile.html";
	});


	$(document).on("change", "#comboFiltroAsignaturas", function (this: HTMLElement) {
		const seleccionado = String($(this).children(":selected").val());
		const alumno_id = String($("body").attr("data-id"));
		
		void getNotasAsignaturaExamen(alumno_id,seleccionado)
	});



	$(document).on("click", ".getDatosNota", function (this: HTMLElement) {
		const id = String($(this).attr("data-id"));
		$("#txtNombreModalExamen").text("Editar Nota");
		$("#guardarNota").attr("data-tipo", "modficar");
	
		$("#comboAsignaturas").hide();
		void getDatosNota(id);
		
	});

	// $(document).on("click", ".crearNota", function (this: HTMLElement) {
	// 	limpiarModalEditarNota();
	// 	$("#borrarNota").hide();
	// 	$("#comboAsignaturas").show();
	// 	$("#txtNombreModalExamen").text("Crear Nota");
	// 	$("#guardarNota").attr("data-tipo", "crear");
	// });

	$(document).on("click", "#guardarNota", function (this: HTMLElement) {

		const id = String($(this).attr("data-id"));
		const nota = parseFloat(String($("#txtNota").val()));
		console.log(nota);
		void guardarNota(id, nota);
	});


}

async function getDatosAlumno(id: string): Promise<void> {

	$("#divAsignaturas").html("");

	let url = `/alumno/buscar/${id}`;
	let data = {};

	let response = await ComunicacionAjax.sendAjaxRequest("GET", Constantes.URL_API + url, data);

	if (response.status != "success") return;
	const alumno = response.data.alumno[0];
	$("#txtFotoAlumno").attr("src", alumno.picture);

	$("#nombreAlumno").text(alumno.nombre);
	$("#descripcionAlumno").text(alumno.primerApellido + " " + alumno.segundoApellido);
	$("#txtValorAlumno").text(alumno.id);
	$("#txtNombreAlumno").text(alumno.nombre);
	$("#txtPrimerApellido").text(alumno.primerApellido);
	$("#txtSegundoApellido").text(alumno.segundoApellido);
	$("#txtGrado").text(alumno.Carrera.nombre);

	$("#Asignaturas").text("Asignaturas (" + alumno.Asignaturas.length + ")");
	$("#Notas").text("Notas (" + alumno.ExamenAlumnos.length + ")");

	alumno.Asignaturas.forEach(addTarjetaAsignatura);
	//alumno.ExamenAlumnos.forEach(addTarjetaNota);


}

function addTarjetaAsignatura(linea: any) {	//TODO definir tipo linea
	const tarjeta = $("#plantillaAsignatura").clone();

	tarjeta.removeAttr("id");
	tarjeta.attr("data-id", linea.id)
	tarjeta.find("#txtNombreAsignatura").text(linea.nombre);
	tarjeta.find("#txtNombreCurso").text(linea.Curso.nombre);

	$("#divAsignaturas").append(tarjeta);


	// add combo asignaturas
	$("#comboFiltroAsignaturas").append(
		`<option value="${linea.id}">${linea.nombre}</option>`
	);

	// $("#comboAsignaturas").append(
	// 	`<option value="${linea.id}">${linea.nombre}</option>`
	// );

}

async function getNotasAsignaturaExamen(alumno_id:string,asignatura_id: string): Promise<void> {
	let url = `/examenAlumno/${asignatura_id}/${alumno_id}`;
	let data = {};
	$("#divNotas").html("");
	let response = await ComunicacionAjax.sendAjaxRequest("GET", Constantes.URL_API + url, data);
	if (response.status != "success") return;

	response.data.examenes.forEach(addTarjetaNota);
}

function addTarjetaNota(linea: any) { //TODO definir tipo linea

	const tarjeta = $("#plantillaExamen").clone();

	tarjeta.removeAttr("id");
	tarjeta.find("a").attr("data-id", linea.id)
	tarjeta.find(".descripcionExamen").text(linea.Examen.descripcion);
	tarjeta.find(".notaExamen").hide();
	tarjeta.find(".fechaExamen").text(linea.Examen.fecha.replace("Z", "").replace("T", " "));
	tarjeta.find(".tipoEvaluacion").text(linea.Examen.Evaluacion.nombre);
	tarjeta.find(".resultadoExamen").text(linea.nota);
	if (linea.nota >= 5) {
		tarjeta.find(".resultadoExamen").addClass("badge-success");
	} else {
		tarjeta.find(".resultadoExamen").addClass("badge-danger");
	}

	$("#divNotas").append(tarjeta);
}



async function getDatosNota(id: string) {

	let url = `/examenAlumno/buscar/${id}`;
	let data = {};

	limpiarModalEditarNota();

	let response = await ComunicacionAjax.sendAjaxRequest("GET", Constantes.URL_API + url, data);
	if (response.status != "success") return;
	const examen = response.data.res[0];
	$("#guardarNota").attr("data-id", examen.id);
	$("#txtNombreAsignaturaExamen").val(examen.Examen.descripcion);
	$("#txtNota").val(examen.nota);
}


function limpiarModalEditarNota() {
	$("#txtNombreAsignaturaExamen").val("");
	$("#txtNota").val("");
}

async function guardarNota(id:string, nota:number) {
	let url = `/examenAlumno/modificar/${id}`;
	let data = {
		nota:nota
	};

	limpiarModalEditarNota();

	let response = await ComunicacionAjax.sendAjaxRequest("PUT", Constantes.URL_API + url, data);
	if (response.status != "success") return;


	const alumno_id = String($("body").attr("data-id"));
	const asignatura_id = String($("#comboFiltroAsignaturas").val());
	

	console.log("a");
	if (asignatura_id != "") {
		console.log("a");
		await getNotasAsignaturaExamen(alumno_id,asignatura_id);
	}

}
