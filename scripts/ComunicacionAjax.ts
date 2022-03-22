import { Constantes } from "./constantes";

export class ComunicacionAjax {

	/**
	 * Envia una petición AJAX con los datos especificados y ejecuta la funcionCompletado. Si falla prueba renovando el token.
	 *
	 */
	static async sendAjaxRequest(type: string, url: string, data: any, yaHaRenovado = false) {

		const opciones = {
			url: url,
			type: type,
			dataType: "json",
			data: data,
		};

		const promiseReq = $.ajax(opciones);

		try {
			const response = await promiseReq;
			return response;
		} catch (err) {
			switch (err.status) {
				case 0: {
					console.assert(false, "No conexion?");
					if (!window.location.pathname.endsWith("acercaDe.html")) {
						alert("Hay un problema con su conexion a internet");
					}
					return;
				}
				case 200: {
					if (err.getResponseHeader("content-type") == "text/html; charset=UTF-8") {
						console.log(err);

						alert("Session Expired. Return to login");
						//	window.location = "/cerrarsesion";
						return null;
					}
					return null;

				}
				case 404: {
					console.warn("He recibido un 404, la API no esta actualizada?...");

					alert("Ha habido un problema con la API, volviendo al menu anterior");
					//cerrarSesion();
					//window.history.back();
					return null;
				}
				case 401: {
					if (yaHaRenovado) {
						//El token que ha devuelto el refresh sigue fallando
						alert("Hay un problema con los tokens, volviendo al menu inicial");
						return null;
					} else {
						console.log("Error usando el token, probando a renovar");
						break;
					}
				}
				case 501: {
					alert("Funcion no implementada, se muestran datos de prueba");
					return err.responseJSON;
				}
				case 554: {
					console.assert(false, "Error, no se ha desconectado al usuario.");

					return null;
				}
				default: {
					console.assert(false, "Error inesperado");
					console.error(err);
					alert("Error inesperado");
					//	cerrarSesion();
					return null;
				}
			}
		}
	}
}