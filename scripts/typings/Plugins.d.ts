/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */


export { };



declare global {
	interface Window {
		plugins: Plugins;
		FCM: any;
		cordova: Cordova;
	}
	interface Plugins {
		toast: {
			showLongCenter: Function,
		};
	
	}

}
