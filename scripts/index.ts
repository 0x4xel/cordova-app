"use strict";
import { General } from "./funciones";
import { Constantes } from "./constantes";
import { ComunicacionAjax } from "./ComunicacionAjax";

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
	console.log("hola");
	alert("hola")
});

async function cargaInicial() {
	General.inicializarMenus();


	$(".sliding").on("click", function (event) {
		console.log("AAAAAAAAAAAA");
		console.log(Constantes.MODO_LOCAL);
		void getAlumnos();
	});

}

async function getAlumnos(): Promise<void> {

	let url = "/alumno/crear";
	let data = {
		"nombre": "Axel",
		"primerApellido": "aaa",
		"segundoApellido": "bbb"
	};

	let response = await ComunicacionAjax.sendAjaxRequest("POST", Constantes.URL_API + url, data);

	console.log(response);


}

