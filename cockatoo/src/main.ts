import './assets/main.css'
import { createAuth0 } from '@auth0/auth0-vue'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

import { createApp } from 'vue'
import type { DefineComponent } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App as DefineComponent)

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
  },
  components,
  directives,
})

app.use(
  createAuth0({
    domain: 'dev-duimksifqjvokimg.us.auth0.com',
    clientId: 'QfbEi6Tsuuy2RLuacBEqeIFAItRlvvk3',
    useRefreshTokens: true,
    cacheLocation: 'localstorage',
    authorizationParams: {
      redirect_uri: window.location.origin,
      audience: 'https://localhost:5000',
    },
  }),
)

app.use(vuetify)

app.use(createPinia())

app.mount('#app')
