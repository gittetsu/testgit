document.addEventListener("DOMContentLoaded", (e) => {
  let doccnt = 0;
  const includeHTML = async (el, url) => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const html = await response.text();
        el.outerHTML = html;
        doccnt++;
        if (doc.length == doccnt) {
          commonload();
        }
      } else {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      let message = error.message || "Error loading the file, verify that you are making the request by http or https";
      el.outerHTML = `<div><p>${message}</p></div>`;
    }
  };
  let doc = document.querySelectorAll("[data-include]");
  doc.forEach(async (el) => {
    await includeHTML(el, el.getAttribute("data-include"));
    const openSideBar = el.getAttribute("data-open");
    if (openSideBar) {
      const sideBarItem = document.querySelectorAll(".sidebar-list .sidebar-item")[openSideBar - 1];
      const accordion = sideBarItem.querySelector(".accordion");
      accordion.classList.replace("close", "open");
    }
  });
});
