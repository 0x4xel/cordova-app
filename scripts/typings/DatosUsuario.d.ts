interface Usuario {
    tipo: "usuario",
	id: string,
	email: string,
	nombre: string,
	apellidos: string,
	tokenReset: TokenReset | undefined | null,
	tokennotificaciones: string | null,
}
interface TokenReset {
    token: string;
    caducaEn: number;
}

