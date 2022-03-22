/* eslint-disable @typescript-eslint/no-unused-vars */

interface Usuario {
	tipo: "usuario",
	id: string,
	email: string,
	contrasena: string,
	nombre: string,
	apellidos: string,
	tokenReset: TokenReset | undefined | null,
	tokennotificaciones: string | null,
}

interface TokenReset {
	token: string,
	caducaEn: number;
}


