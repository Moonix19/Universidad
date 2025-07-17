const data = {
  "Primer semestre": [
    ["CIII15", "Herramientas computacionales", 3, []],
    ["CIII16", "Administración industrial", 6, []],
    ["INII13", "Introducción a la ingeniería", 6, []],
    ["INII14", "Dibujo de ingeniería", 3, []],
    ["INMT11", "Introducción al cálculo", 6, []],
    ["INMT12", "Introducción al álgebra", 7, []]
  ],
  "Segundo semestre": [
    ["CIII25", "Ingeniería industrial", 7, ["INII13"]],
    ["CIII26", "Introducción a la optimización", 4, []],
    ["INII23", "Programación", 4, ["CIII15"]],
    ["INII24", "Economía general", 3, []],
    ["INMT21", "Cálculo I", 5, ["INMT11"]],
    ["INMT22", "Álgebra I", 6, ["INMT12"]]
  ],
  "Tercer semestre": [
    ["CIMT35", "Probabilidad y estadística", 6, ["INMT12"]],
    ["INFS32", "Física I", 6, ["INMT11"]],
    ["INII34", "Taller de proyecto", 3, ["INII24"]],
    ["INII36", "Emprendimiento I", 3, ["CIII25"]],
    ["INMT31", "Cálculo II", 6, ["INMT21"]],
    ["INQU33", "Química general", 6, []]
  ],
  "Cuarto semestre": [
    ["CIII24", "Termodinámica", 6, ["INMT11", "INMT12"]],
    ["CIII43", "Contabilidad", 6, ["INII34"]],
    ["CIII44", "Investigación operativa I", 5, ["CIII26"]],
    ["CIII46", "Proyecto I", 4, ["INII34"]],
    ["INCI45", "Inglés I", 4, []],
    ["INFS41", "Física II", 6, ["INFS32"]]
  ],
  "Quinto semestre": [
    ["CIII53", "Investigación operativa II", 6, ["CIII44"]],
    ["CIII54", "Dirección financiera", 6, ["CIII43"]],
    ["CIII56", "Taller de evaluación I", 3, ["4° aprobado"]],
    ["CIME51", "Mecánica", 5, ["CIII24"]],
    ["INCI55", "Inglés II", 4, ["INCI45"]],
    ["INMT52", "Ecuaciones diferenciales", 6, ["INMT11", "INMT12"]]
  ],
  "Sexto semestre": [
    ["CIIE62", "Electrotecnia", 3, ["INFS41"]],
    ["CIII63", "Operaciones unitarias", 5, ["CIII24"]],
    ["CIII64", "Capital humano", 4, ["CIII16"]],
    ["CIII65", "Sistema de información administrativo I", 6, ["INII23", "CIII46"]],
    ["CIII66", "Gestión de operaciones", 6, ["INII34"]],
    ["INMT61", "Métodos numéricos", 6, ["INMT31"]]
  ],
  "Séptimo semestre": [
    ["CIII72", "Calidad y medio ambiente", 6, ["CIII25"]],
    ["CIII73", "Proyecto II", 6, ["CIII46"]],
    ["CIII74", "Legislación industrial", 3, ["CIII64"]],
    ["CIII75", "Gestión estratégicas", 6, ["CIII54"]],
    ["CIMT71", "Aplicaciones estadísticas a la industria", 6, ["CIMT35", "INMT61"]],
    ["INII76", "Emprendimiento II", 3, ["INII36"]]
  ],
  "Octavo semestre": [
    ["CIFP86", "Formación profesional I", 4, ["CIII25"]],
    ["CIII81", "Simulación", 6, ["CIII53", "CIMT71"]],
    ["CIII82", "Sistema de información administrativo II", 6, ["CIII65"]],
    ["CIII83", "Gestión de activos", 5, ["CIII73"]],
    ["CIII84", "Programación y control de gestión", 6, ["CIII73", "CIII75"]],
    ["CIII85", "Cadena de suministros", 3, ["CIII66"]]
  ],
  "Noveno semestre": [
    ["CIFP95", "Formación profesional II", 5, ["CIII25"]],
    ["CIII91", "Gestión de sistemas operacionales", 6, ["CIII81", "CIII83", "CIII85"]],
    ["CIII92", "Taller de investigación operativa", 6, ["CIII53"]],
    ["CIII93", "Diseño de negocios", 6, ["CIII43"]],
    ["CIII94", "Gestión de proyectos", 4, ["CIII84"]],
    ["CIII96", "Taller de evaluación II", 3, ["CIII56"]]
  ],
  "Décimo semestre": [
    ["CIIIA1", "Práctica profesional I", 6, ["4° aprobado"]],
    ["CIIIA2", "Práctica profesional II", 6, ["6° aprobado"]],
    ["CIIIA3", "Proyecto final", 18, ["Todo aprobado"]]
  ]
};

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

