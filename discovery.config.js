
module.exports = {
  seo: {
  "title": "Lar Plásticos",
  "description": "",
  "titleTemplate": "%s | Loja",
  "author": "Lar Plásticos",
},

  // Theming
  theme: 'custom-theme',

  // Ecommerce Platform
  platform: 'vtex',

  // Platform specific configs for API
  api: {
    storeId: process.env.NEXT_PUBLIC_STORE_ID || "larplasticos",
    workspace: 'master',
    environment: 'vtexcommercestable',
    hideUnavailableItems: true,
    incrementAddress: false,
  },

  // Default session
  session: {
    currency: {
      code: "BRL",
      symbol: "R$",
    },
    locale: "pt-BR",
    channel: '{"salesChannel":1,"regionId":""}',
    country: "BRA",
    deliveryMode: null,
    addressType: null,
    postalCode: null,
    geoCoordinates: null,
    person: null,
  },

  cart: {
    id: '',
    items: [],
    messages: [],
    shouldSplitItem: true,
  },

  // Production URLs
  storeUrl: "https://larplasticos.vtex.app",
  secureSubdomain: "https://secure.vtexfaststore.com/",
  checkoutUrl: "https://larplasticos.vtexcommercestable.com.br/checkout",
  loginUrl: "https://larplasticos.vtexcommercestable.com.br/api/io/login",
  accountUrl: "https://larplasticos.vtexcommercestable.com.br/api/io/account",

  previewRedirects: {
    home: '/',
    plp: "/caixas%20pl%C3%A1sticas",
    search: "/s?q=Lar%20Pl%C3%A1sticos",
    pdp: "/caixa-alc-6437-65-litros-preto-lar-plasticos/p",
  },

  // Lighthouse CI
  lighthouse: {
    server: process.env.BASE_SITE_URL || 'http://localhost:3000',
    pages: {
      home: '/',
      pdp: "/caixa-alc-6437-65-litros-preto-lar-plasticos/p",
      collection: "/caixas%20pl%C3%A1sticas",
    },
  },

  // E2E CI
  cypress: {
    pages: {
      home: '/',
      pdp: "/caixa-alc-6437-65-litros-preto-lar-plasticos/p",
      collection: "/caixas%20pl%C3%A1sticas",
      collection_filtered: "/caixas%20pl%C3%A1sticas/?category-1=caixas%20pl%C3%A1sticas&brand=Lar%20Pl%C3%A1sticos&facets=category-1%2Cbrand%27",
      search: "/s?q=Lar%20Pl%C3%A1sticos",
    },
    browser: 'electron',
  },

  analytics: {
    // https://developers.google.com/tag-platform/tag-manager/web#standard_web_page_installation,
    gtmContainerId: "",
  },

  experimental: {
    nodeVersion: 18,
    cypressVersion: 12,
  },

  contentSource: {
    type: 'CP',
    project: "larplasticosfs",
  }
}
