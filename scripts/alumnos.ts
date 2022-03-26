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

	void getAlumnosDocente();

}


function inicializarOnClicks() {

	$(document).on("click", ".seleccionarAlumno", function (this : HTMLElement) {
		const id = String($(this).attr("data-id"));
		localStorage.setItem("alumno_id", id);
		window.location.href = "alumno_profile.html";
	});
}

async function getAlumnosDocente(): Promise<void> {

	let id = localStorage.getItem("user_id");

	$("#divTarjetas").html("");

	let url = "/userAlumnos/" + id;
	let data = {};

	let response = await ComunicacionAjax.sendAjaxRequest("GET", Constantes.URL_API + url, data);


	if (response.status == "success") {
		response.data.alumnos.forEach(addTarjetaAlumno);
	} else {
	}
}

function addTarjetaAlumno(linea: any) {	// todo cambiar
	const tarjeta = $("#plantillaTarjeta").clone();

	tarjeta.removeAttr("id");
	tarjeta.find("#txtPrimeraLetraNombreAlumno").text(linea.nombre.charAt(0).toUpperCase());
	tarjeta.find("#txtNombreAlumno").text(`${linea.nombre}`);
	tarjeta.find("#txtApellidoAlumno").text(`${linea.primerApellido} ${linea.segundoApellido}`);
	tarjeta.find(".seleccionarAlumno").attr("data-id", linea.id);


	$("#divTarjetas").append(tarjeta);


}

