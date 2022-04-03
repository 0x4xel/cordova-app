import { Constantes } from "./constantes";

export class ComunicacionAjax {

	/**
	 * Envia una petición AJAX con los datos especificados y ejecuta la funcionCompletado. Si falla prueba renovando el token.
	 *
	 */
	static async sendAjaxRequest(type: string, url: string, data: any) {

		let token = localStorage.getItem("token");
		console.log(token);
		const opciones = {
			url: url,
			type: type,
			dataType: "json",
			headers: { 'X-Auth-Token': token },
			data: JSON.stringify(data),
			contentType: 'application/json',
		};
	
		const promiseReq = $.ajax(opciones);

		try {
			const response = await promiseReq;
			console.log(response);
			return response;
		} catch (err) {
			console.error(err.responseJSON);
			return err.responseJSON;
		}
	}
}

