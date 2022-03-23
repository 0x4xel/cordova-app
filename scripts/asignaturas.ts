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

	$(document).on("click", ".seleccionarAsignatura", function (this : HTMLElement) {
		const id = String($(this).attr("data-id"));
		localStorage.setItem("asignatura_id", id);
		window.location.href = "asignatura_profile.html";
	});
}

async function getAsignaturasDocente(): Promise<void> {

	let id = localStorage.getItem("user_id");

	$("#divTarjetas").html("");

	let url = "/userAsignaturas/" + id;
	let data = {};

	let response = await ComunicacionAjax.sendAjaxRequest("GET", Constantes.URL_API + url, data);
	console.log(response);


	if (response.status == "success") {
		console.table(response.data.asignaturas);
		response.data.asignaturas.forEach(addTarjetaAsignatura);
		// window.location.href = "index.html";
	} else {
		// $("#txtErrorLogin").show();
		// $("#txtErrorLogin").addClass("d-flex");
		// $("#respuestaLogin").text(response.message);
	}
}

function addTarjetaAsignatura(linea: any) {	// todo cambiar
	const tarjeta = $("#plantillaTarjeta").clone();

	tarjeta.removeAttr("id");
	tarjeta.find("#txtPrimeraLetraNombreAsignatura").text(linea.nombre.charAt(0).toUpperCase());
	tarjeta.find("#txtNombreAsignatura").text(linea.nombre);
	tarjeta.find(".seleccionarAsignatura").attr("data-id", linea.id);


	$("#divTarjetas").append(tarjeta);


}

