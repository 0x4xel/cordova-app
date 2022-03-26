export class Constantes {
	static get VERSION_APP() {
		return "1.0.0";
	}

	static get MODO_LOCAL() {
		return true;
	}
	static get MODO_PRE() {
		return false;
	}
	
	static get URL_API() {
		if (Constantes.MODO_LOCAL)
			return "http://192.168.0.18:3000/v1";
		else if (Constantes.MODO_PRE)
			return "";
		else
			return "";
	}

	static get STORE_CONSOLE() {
		return false;
	}

	static get STORE_DEBUG() {
		return false;
	}
	


}
