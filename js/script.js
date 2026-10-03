const store = {
  whatsapp: "5511920012281",
  instagram: "https://www.instagram.com/crislingerie",
};

const products = [
  {
    id: 1,
    name: "Conjunto feminino",
    category: "conjuntos",
    label: "Conjuntos",
    sizes: "M ao GG",
    price: "Consultar",
    image: "img/produtos/conjunto-feminino.png",
    description: "Opcao inicial para apresentar a linha de conjuntos com atendimento personalizado.",
    features: ["Atendimento direto", "Foto real na versao final"],
  },
  {
    id: 2,
    name: "Pijama feminino",
    category: "pijamas",
    label: "Pijamas",
    sizes: "M ao GG",
    price: "Consultar",
    image: "img/produtos/pijama-feminino.png",
    description: "Produto demonstrativo para divulgar pijamas femininos com visual delicado e acessivel.",
    features: ["Compra assistida", "Tamanhos informados"],
  },
];

const productGrid = document.querySelector("#productGrid");
const filterButtons = document.querySelectorAll(".filter-button");
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

function buildWhatsappLink(message) {
  return `https://wa.me/${store.whatsapp}?text=${encodeURIComponent(message)}`;
}

function renderProducts(filter = "todos") {
  const visibleProducts = products.filter((product) => {
    return filter === "todos" || product.category === filter;
  });

  productGrid.innerHTML = visibleProducts.map((product) => {
    const message = `Ola, Mercia! Vim pelo site da SOCRIS e tenho interesse em: ${product.name}. Tamanho: ${product.sizes}.`;

    return `
      <article class="product-card">
        <div class="product-media">
          <img src="${product.image}" alt="Imagem demonstrativa de ${product.name}">
        </div>
        <div class="product-body">
          <div class="product-topline">
            <span class="tag">${product.label}</span>
            <strong>${product.price}</strong>
          </div>
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <div class="product-meta">
            <span>Tamanhos ${product.sizes}</span>
            <span>Compra manual</span>
          </div>
          <ul class="product-features" aria-label="Detalhes do produto">
            ${product.features.map((feature) => `<li>${feature}</li>`).join("")}
          </ul>
          <a class="button primary" href="${buildWhatsappLink(message)}" target="_blank" rel="noopener">
            Consultar no WhatsApp
          </a>
        </div>
      </article>
    `;
  }).join("");
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderProducts(button.dataset.filter);
  });
});

document.querySelectorAll(".js-whatsapp").forEach((link) => {
  const message = link.dataset.message || "Ola! Gostaria de conhecer os produtos da SOCRIS.";
  link.href = buildWhatsappLink(message);
  link.target = "_blank";
  link.rel = "noopener";
});

menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

renderProducts();
