import {defineCliConfig} from 'sanity/cli'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || process.env.SANITY_PROJECT_ID || 'yb71w9t5'
const dataset = process.env.SANITY_STUDIO_DATASET || process.env.SANITY_DATASET || 'production'

// hostname sin https:// y sin .sanity.studio
// IMPORTANTE: Cambia este valor al hostname real del nuevo estudio de fumigacion en .env
const studioHost = process.env.SANITY_STUDIO_HOSTNAME || 'fumipronc'
const studioAppId = process.env.SANITY_STUDIO_APP_ID || 'REEMPLAZA_CON_NUEVO_APP_ID'

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  studioHost,
  deployment: {
    appId: studioAppId,
    autoUpdates: true,
  },
})
