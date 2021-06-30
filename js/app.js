if ("serviceWorker" in navigator) {
	navigator.serviceWorker
		.register("https://" + document.location.hostname + "/serviceworker.js", {
			scope: "https://" + document.location.hostname + "/",
		})
		.then((registration) => {
			console.log("Service worker registered", registration.scope);
		});
}
