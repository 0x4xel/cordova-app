import { Constantes } from "./constantes";

document.addEventListener("deviceready", function () {
	// define a new console
	if (Constantes.STORE_CONSOLE) {
		// eslint-disable-next-line no-global-assign
		window.console = (function (oldCons) {
			return {
				...console,
				debug: function (text: any) {
					oldCons.debug(text);
					if (Constantes.STORE_DEBUG)
						storeOutput("debug", text);
				},
				log: function (text: any) {
					oldCons.log(text);
					storeOutput("log", text);
				},
				info: function (text: any) {
					oldCons.info(text);
					storeOutput("info", text);
				},
				warn: function (text: any) {
					oldCons.warn(text);
					storeOutput("warn", text);
				},
				error: function (text: any) {
					oldCons.error(text);
					storeOutput("error", text);
				},
				assert: function (...args: any) {
					oldCons.assert(...args);
					storeOutput("assert", JSON.stringify(args));
				},
			};
		}(window.console));
	}
	//Then redefine the old console
	window.console = console;


}, false);

function storeOutput(typeOfCall: string, message: string) {
	let messages = localStorage.getItem("outputConsole");
	if (messages !== null)
		messages += `\n[${typeOfCall}][${new Date().toLocaleString("en-GB", { timeZone: "Europe/Madrid" })}][${window.location.pathname}] - ` + JSON.stringify(message);
	else
		messages = `[${typeOfCall}][${new Date().toLocaleString("en-GB", { timeZone: "Europe/Madrid" })}][${window.location.pathname}] - ` + JSON.stringify(message);
	localStorage.setItem("outputConsole", messages);
}
