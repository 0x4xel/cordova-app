/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */


export { };



declare global {
	interface Window {
		plugins: Plugins;
		FCM: any;
		cordova: Cordova;
		FullCalendar:any;
		FullCalendarInteraction:any;
		FullCalendarDayGrid:any;
		FullCalendarTimeGrid:any;
	}
	interface Plugins {
		toast: {
			showLongCenter: Function,
		};
	
	}

}
