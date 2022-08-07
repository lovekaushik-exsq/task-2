import { getTemplate } from "./userTemplate.js";

// export function renderData(user, selector) {
//   let ul = document.createElement("ul");
//   let li = document.createElement("li");
//   if (!document.querySelector(selector).getElementsByTagName("ul")[0]) {
//     ul.setAttribute("id", `${selector.slice(1)}-ul`);
//     document.querySelector(selector).appendChild(ul);
//   }
//   let template = getTemplate(user);
//   li.setAttribute("class", `${selector.slice(1)}-li`);
//   li.innerHTML = template;
//   document.querySelector(`${selector}-ul`).appendChild(li);
// }

export function renderData(users, selector) {
  let html = "";
  users.map((user) => {
    let template = getTemplate(user);
    html += template;
  });
  document.querySelector(selector).innerHTML = html;
}
