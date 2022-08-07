export function getTemplate(user) {
  let content = `
    <div style="display:flex;gap:5px;margin-bottom:5px;">
    <img  src="${user.picture.thumbnail}" /> 
    <div>
      <span>${user.name.title} </span>
      <span>${user.name.first} </span>
      <span>${user.name.last} </span>
    </div>
  </div>
    `;
  return content;
}
