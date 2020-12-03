import { createApp } from "vue"
import urql, { dedupExchange, fetchExchange } from "@urql/vue"
import { cacheExchange } from "@urql/exchange-graphcache"

import "tailwindcss/tailwind.css"
import "./index.css"

import App from "./App.vue"
import { config } from "./config"

const app = createApp(App)

app.use(urql, {
  url: config.graphqlUrl,
  exchanges: [dedupExchange, cacheExchange({}), fetchExchange],
})

app.mount("#app")
