export const MOCKUP_dropdownData = [
  {
    title: "Categorias",
    defaultOpen: true,
    items: [
      {
        name: "Ação",
        effect: {
          agent: "Categorias",
          finder: "Ação",
          mode: "includes",
        },
      },
      {
        name: "Drama",
        effect: {
          agent: "Categorias",
          finder: "Drama",
          mode: "includes",
        },
      },
      {
        name: "Gestão",
        effect: {
          agent: "Categorias",
          finder: "Gestão",
          mode: "includes",
        },
      },
      {
        name: "Sci-Fi",
        effect: {
          agent: "Categorias",
          finder: "Sci-Fi",
          mode: "includes",
        },
      },
      {
        name: "Violência",
        effect: {
          agent: "Categorias",
          finder: "Violência",
          mode: "includes",
        },
      },
    ],
  },
  {
    title: "Tipos & Locais",
    defaultOpen: true,
    items: [
      {
        name: "Series",
        effect: {
          agent: "Tipo",
          finder: "SERIE",
          mode: "equal",
        },
      },
      {
        name: "Solos",
        effect: {
          agent: "Tipo",
          finder: "SOLO",
          mode: "equal",
        },
      },
      {
        name: "Universal",
        effect: {
          agent: "Local",
          finder: "UNIVERSAL",
          mode: "equal",
        },
      },
      {
        name: "Terra",
        effect: {
          agent: "Local",
          finder: "TERRA",
          mode: "equal",
        },
      },
    ],
  },
];
