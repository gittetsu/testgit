document.addEventListener("DOMContentLoaded", (e) => {
	const includeHTML = (el, url) => {
	  fetch(url)
		.then((response) => {
		  if (response.ok) {
			return response.text();
		  } else {
			throw new Error(`Error ${response.status}: ${response.statusText}`);
		  }
		})
		.then((html) => {
		  el.outerHTML = html;
		})
		.catch((error) => {
		  let message = error.message || "Error loading the file, verify that you are making the request by http or https";
		  el.outerHTML = `<div><p>${message}</p></div>`;
		});
	};
  
	document
	  .querySelectorAll("[data-include]")
	  .forEach((el) => includeHTML(el, el.getAttribute("data-include")));
  });
