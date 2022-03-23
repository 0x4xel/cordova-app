import { Constantes } from "./constantes";

export class ComunicacionAjax {

	/**
	 * Envia una petición AJAX con los datos especificados y ejecuta la funcionCompletado. Si falla prueba renovando el token.
	 *
	 */
	static async sendAjaxRequest(type: string, url: string, data: any,) {

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
			console.error(err.responseJSON);
			return err.responseJSON;
		}
	}
}