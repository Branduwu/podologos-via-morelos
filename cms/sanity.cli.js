import {defineCliConfig} from 'sanity/cli'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || process.env.SANITY_PROJECT_ID || 'yb71w9t5'
const dataset = process.env.SANITY_STUDIO_DATASET || process.env.SANITY_DATASET || 'production'

// hostname sin https:// y sin .sanity.studio
const studioHost = process.env.SANITY_STUDIO_HOSTNAME || 'podologosviamorelos'
const studioAppId = process.env.SANITY_STUDIO_APP_ID || 'mk5vjuk3tbfh6y28q840mrml'

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
