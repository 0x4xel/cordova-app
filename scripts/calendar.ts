
// import { Calendar } from '@fullcalendar/core';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import listPlugin from '@fullcalendar/list';



// require('ComunicacionAjax');






$(function () {
  
	void cargaInicial();
	inicializarOnClicks();
});




async function cargaInicial() {

  const user_id = String(localStorage.getItem("user_id"));
  // void getAsignaturasHoraUsuario(user_id);
  console.log("A?");
  $('.fc-toolbar').remove();
}

function inicializarOnClicks() {

}
// import { ComunicacionAjax } from "./ComunicacionAjax";
// import { Constantes } from "./constantes";
// async function getAsignaturasHoraUsuario(id: string): Promise<void> {

//   //limpi los eventos del calendario

//   let url = "/user/asignatura/hora/" + id;
//   let data = {};

//   let response = await ComunicacionAjax.sendAjaxRequest("GET", Constantes.URL_API + url, data);

//   if (response.status == "success") {
//     // response.data.alumnos.forEach(console.log(2));
//   } else {
//   }
// }


