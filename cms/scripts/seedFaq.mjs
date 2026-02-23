import {readFile} from 'node:fs/promises'
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2025-01-01'})

async function main() {
  const raw = await readFile(new URL('../faq.seed.json', import.meta.url), 'utf8')
  const docs = JSON.parse(raw.replace(/^\uFEFF/, ''))

  if (!Array.isArray(docs) || docs.length === 0) {
    throw new Error('faq.seed.json no contiene un arreglo de documentos')
  }

  let tx = client.transaction()
  let count = 0

  for (const doc of docs) {
    if (!doc?._id || !doc?._type) continue
    tx = tx.createOrReplace(doc)
    count += 1

    if (count % 50 === 0) {
      await tx.commit()
      tx = client.transaction()
    }
  }

  await tx.commit()
  console.log(`FAQ cargadas: ${count}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
