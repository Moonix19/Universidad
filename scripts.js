const data = {
  "Primer semestre": [/* ... misma estructura ... */],
  // (el resto de la malla igual que antes, por brevedad no repito todo aquí)
};

// Carga dinámica de la malla
const container = document.getElementById("semestres");

for (const [semestre, ramos] of Object.entries(data)) {
  const col = document.createElement("div");
  col.classList.add("semestre");
  const h2 = document.createElement("h2");
  h2.textContent = semestre;
  col.appendChild(h2);

  ramos.forEach(([codigo, nombre, creditos, prerequisitos]) => {
    const div = document.createElement("div");
    div.classList.add("ramo");
    div.dataset.codigo = codigo.toUpperCase();
    div.dataset.nombre = nombre.toLowerCase();
    div.dataset.prerequisitos = prerequisitos.map(p => p.toUpperCase()).join(",");

    div.innerHTML = `
      <span class="codigo">${codigo}</span>
      <span class="nombre">${nombre} (${creditos} créditos)</span>
      <div class="prerrequisitos">Prerrequisitos: ${prerequisitos.length ? prerequisitos.join(", ") : "ninguno"}</div>
    `;

    div.addEventListener("click", () => {
      document.querySelectorAll(".ramo").forEach(r => r.classList.remove("resaltado"));
      prerequisitos.forEach(pr => {
        const target = document.querySelector(`.ramo[data-codigo="${pr.toUpperCase()}"]`);
        if (target) target.classList.add("resaltado");
      });
      div.classList.add("resaltado");
    });

    col.appendChild(div);
  });

  container.appendChild(col);
}

// Buscador
document.getElementById("buscador").addEventListener("input", e => {
  const query = e.target.value.toLowerCase();
  document.querySelectorAll(".ramo").forEach(ramo => {
    const nombre = ramo.dataset.nombre;
    const codigo = ramo.dataset.codigo.toLowerCase();
    const visible = nombre.includes(query) || codigo.includes(query);
    ramo.style.display = visible ? "block" : "none";
  });
});
