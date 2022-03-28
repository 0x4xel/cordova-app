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

	void getAsignaturasDocente();

}


function inicializarOnClicks() {

	$(document).on("click", ".seleccionarAlumno", function (this: HTMLElement) {
		const id = String($(this).attr("data-id"));
		localStorage.setItem("alumno_id", id);
		window.location.href = "alumno_profile.html";
	});


	$(document).on("change", "#comboAsignaturas", function (this: HTMLElement) {
		const asignatura_id = String($(this).children(":selected").val());
		void getExamenesAsignatura(asignatura_id);
	});

	$(document).on("change", "#comboExamenesAsignatura", function (this: HTMLElement) {
		const asignatura_id = String($("#comboAsignaturas").children(":selected").val());
		const examen_id = String($(this).children(":selected").val());
		void getNotasAsignaturaExamen(asignatura_id, examen_id);
	});

	$(document).on("change", ".txtNotaAlumno", function (this: HTMLElement) {
		let nota = parseFloat(String($(this).val()));
		let valorGuardado = parseFloat(String($(this).attr("valorNota")));

		if (nota < 0 || nota > 10) {
			$(this).val(valorGuardado);
			$(this).css("background", "#e6e6e6");
			$(this).css("color", "#666666");
			return;
		}

		if (nota != valorGuardado) {
			if (nota < 5) {
				$(this).css("background-color", "red");
			} else {
				$(this).css("background-color", "green");
			}
			$(this).css("color", "white");
		} else {	// si la nota es igual a la guardada, se pone la color por defecto
			$(this).css("background", "#e6e6e6");
			$(this).css("color", "#666666");

		}


	});

	$(document).on("click", "#btnGuardarNotas", function (this: HTMLElement) {
		console.log("guardar notas");
		let asignatura_id = String($("#comboAsignaturas").children(":selected").val());
		let examen_id = String($("#comboExamenesAsignatura").children(":selected").val());


		let notas: Nota[] = [];
		$(".txtNotaAlumno").each(function (this: HTMLElement) {
			let id = String($(this).attr("data-id"));
			let alumno_id = String($(this).attr("data-alumno-id"));
		
			let nota = parseFloat(String($(this).val()));
			let valorGuardado = parseFloat(String($(this).attr("valorNota")));
		
			if (valorGuardado != nota) {
				notas.push({ id: id, alumno_id: alumno_id, nota: nota });
			}
		}
		);
		void guardarNotas(asignatura_id, examen_id, notas);
	});
}

interface Nota {
	id: string;
	alumno_id: string;
	nota: number;
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


async function getExamenesAsignatura(asignatura_id: string) {

	$("#comboExamenesAsignatura").html(`<option value="">Selecciona un examen</option>`);

	if (asignatura_id == "") return;


	let url = `/asignatura/buscar/${asignatura_id}`;
	let data = {};

	let response = await ComunicacionAjax.sendAjaxRequest("GET", Constantes.URL_API + url, data);

	if (response.status == "success") {
		const asignatura = response.data.asignatura[0];
		if (asignatura.Examens.length > 0) asignatura.Examens.forEach(addComboExamenes);
	} else {

	}
}

function addComboAsignaturas(linea: any) {	// todo cambiar
	$("#comboAsignaturas").append(`<option value="${linea.id}">${linea.nombre}</option>`);
}

function addComboExamenes(linea: any) {	// todo cambiar
	$("#comboExamenesAsignatura").append(`<option value="${linea.id}">${linea.descripcion}</option>`);
}



function addLineaAlumno(linea: any, index: number) {	// todo cambiar
	const tarjeta = $("#plantillaExamenAlumno").clone();

	tarjeta.removeAttr("id");

	tarjeta.find("#txtNombreAlumno").text(`${linea.nombre} ${linea.primerApellido} ${linea.segundoApellido}`);
	tarjeta.find("input").addClass("txtNotaAlumno");
	if (linea.nota == null) linea.nota = "";
	if (linea.id == null) linea.id = "";
	tarjeta.find(".txtNotaAlumno").val(linea.nota);
	tarjeta.find(".txtNotaAlumno").attr("valorNota", linea.nota);
	tarjeta.find(".txtNotaAlumno").attr("data-id", linea.id);
	tarjeta.find(".txtNotaAlumno").attr("data-alumno-id", linea.alumno_id);
	tarjeta.find(".txtNotaAlumno").attr("tabindex", index);


	$("#divTarjetas").append(tarjeta);


}

function getNotasAsignaturaExamen(asignatura_id: string, examen_id: string) {

	$("#divTarjetas").html("");
	if (asignatura_id == "") {
		return;
	}

	let url = "/examenAlumno/asignatura/" + asignatura_id + "/" + examen_id;
	let data = {};
	ComunicacionAjax.sendAjaxRequest("GET", Constantes.URL_API + url, data).then(function (response) {
		console.log(response);
		if (response.status == "success") {
			console.table(response.data.notas);
			response.data.notas.forEach(addLineaAlumno);
		} else {

		}
	}).catch(function (error) {
		console.log(error);
	});
}

async function guardarNotas(asignatura_id: string, examen_id: string, notas: Nota[]) {
	let url = "/examenAlumno/modificarMasivo/" + asignatura_id + "/" + examen_id;
	let data = { notas: notas };
	let response = await ComunicacionAjax.sendAjaxRequest("PUT", Constantes.URL_API + url, data);
	if (response.status == "success") {
		getNotasAsignaturaExamen(asignatura_id, examen_id);
	} else {
		console.log("error al guardar notas");
	}
}