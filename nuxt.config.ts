export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  
  // Módulo TailwindCSS
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/tailwind.css','vuetify/styles'],
  
  // Plugins do Vuetify
  plugins: ['~/plugins/vuetify.js'],
  build: {
    transpile: ['vuetify'],
  },
  app: {
    head: {
      title: 'Agende Seu Corte - Barbearia Online',
      meta: [
        {
          name: 'description',
          content: 'Agende seus cortes e serviços de barbearia de forma rápida e fácil, com a conveniência de marcar horários diretamente pelo nosso site.'
        },
        {
          name: 'robots',
          content: 'index, follow'
        },
        {
          property: 'og:title',
          content: 'Agende Seu Corte - Barbearia Online'
        },
        {
          property: 'og:description',
          content: 'Agende seus cortes e serviços de barbearia de forma rápida e fácil, com a conveniência de marcar horários diretamente pelo nosso site.'
        },
        {
          property: 'og:image',
          content: 'URL-da-imagem-de-preview.jpg' 
        },
        {
          property: 'og:url',
          content: 'https://www.sua-barbearia-online.com'
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image'
        },
        {
          name: 'twitter:title',
          content: 'Agende Seu Corte - Barbearia Online'
        },
        {
          name: 'twitter:description',
          content: 'Agende seus cortes e serviços de barbearia de forma rápida e fácil, com a conveniência de marcar horários diretamente pelo nosso site.'
        },
        {
          name: 'twitter:image',
          content: 'URL-da-imagem-de-preview.jpg' 
        }
      ],
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
      ]
    }
  }
})
