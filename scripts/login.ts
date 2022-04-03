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

}


function inicializarOnClicks() {

	$(document).on("click", "#btnLogin", function () {
		void login();
	});

}

async function login(): Promise<void> {

	let url = "/users/login";
	let data = {
		"email": $("#email").val(),
		"password": $("#password").val(),

	};

	let response = await ComunicacionAjax.sendAjaxRequest("POST", Constantes.URL_API + url, data);
	console.log(response);

	if (response.status == "success") {
		localStorage.setItem("user_id", response.data.user.id);
		localStorage.setItem("token", response.data.token);
		window.location.href = "index.html";
	} else {
		$("#txtErrorLogin").show();
		$("#txtErrorLogin").addClass("d-flex");
		$("#respuestaLogin").text("Email y/o contraseña incorrecto");
	}
}



