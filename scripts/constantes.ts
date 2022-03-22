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
			return "http://localhost:3000/v1";
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
	static get MENU_ROL() {

		return {

			1: {
				textomenu: "Horario",
				iconomenu: "fa fa-sun-o",
				roles: ["carretillero", "operario"],
				href: "gestionHorario.html",
				id: "",
			},

			2: {
				textomenu: "Inventario",
				iconomenu: "fa fa-map-pin",
				roles: ["carretillero"],
				href: "listadoUbicaciones.html",
				id: "",
			},



			3: {
				textomenu: "Artículo",
				iconomenu: "fa fa-cart-arrow-down",
				roles: ["carretillero"],
				id: "",
				href: "",
				submenu: [
					{
						hrefSubmenu: "gestorProducto.html",
						textosubmenu: "Ubicación Artículo"
					},

					{
						hrefSubmenu: "entradaProducto.html?tipo=entrada",
						textosubmenu: "Entrada Artículo"
					},
					{
						hrefSubmenu: "gestorSalidaArticulo.html",
						textosubmenu: "Salida Artículo"
					},

				]
			},

			4: {
				textomenu: "Contenedor",
				iconomenu: "fa fa-clone",
				roles: ["carretillero"],
				id: "",
				href: "",
				submenu: [
					{
						hrefSubmenu: "entradaContenedor.html",
						textosubmenu: "Entrada Contenedor"
					}, {
						hrefSubmenu: "gestorContenedor.html",
						textosubmenu: "Gestión Contenedor"
					},
				]
			},

			5: {
				textomenu: "Recepción pedido",
				iconomenu: "fa fa-product-hunt",
				roles: ["carretillero"],
				id: "",
				href: "listadoPedidos.html",
			},


			6: {
				textomenu: "OPE",
				iconomenu: "fa fe:truck",
				roles: ["carretillero"],
				id: "",
				href: "gestorOrdenFabricacionPuesto.html?puesto=2",
			},


			7: {
				textomenu: "Puesto",
				iconomenu: "fa fa-wrench",
				roles: ["carretillero", "operario"],
				id: "",
				href: "gestorOrdenFabricacionPuesto.html",
			},


			8: {
				textomenu: "Picking",
				iconomenu: "fa fa-cube",
				roles: ["carretillero"],
				id: "",
				href: "",
				submenu: [
					{
						hrefSubmenu: "pickingPedido.html",
						textosubmenu: "Pedidos picking"
					},

					{
						hrefSubmenu: "gestorUbicacion.html",
						textosubmenu: "Recargar picking"
					},
				]
			},

			9: {
				textomenu: "Cerrar Sesión",
				iconomenu: "fa fa-times",
				roles: ["carretillero", "operario"],
				id: "botonMenuIncludeCerrar",
				href: "login.html",
			},
		};
	}





}
