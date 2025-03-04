import { createVuetify } from 'vuetify';
import 'vuetify/styles';

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    theme: {
      themes: {
        light: {
          primary: '#4b3fb8',  // Cor principal, que também pode ser aplicada nos ícones
        },
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
