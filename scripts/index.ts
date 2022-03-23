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

});

async function cargaInicial() {
	General.inicializarMenus();
}


