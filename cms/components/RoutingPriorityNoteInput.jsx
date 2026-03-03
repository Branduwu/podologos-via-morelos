import React from 'react'
import {Card, Stack, Text} from '@sanity/ui'

const getSourceLabel = (source) => {
  if (source === 'price') return 'precio'
  return 'servicio'
}

export default function RoutingPriorityNoteInput(props) {
  const source = props?.schemaType?.options?.source
  const sourceLabel = getSourceLabel(source)

  return (
    <Card padding={3} radius={2} border tone="primary">
      <Stack space={3}>
        <Text size={1} weight="semibold">
          Prioridad de enrutamiento (como se enviara el WhatsApp)
        </Text>

        <Text size={1}>
          1) <strong>WhatsApp destino (manual)</strong> del {sourceLabel}
        </Text>
        <Text size={1}>
          2) <strong>Especialista destino (manual)</strong> (si tiene numero)
        </Text>
        <Text size={1}>
          3) <strong>WhatsApp general del negocio</strong>
        </Text>

        <Text size={1} muted>
          Si llenas numero/mensaje manual, ese valor tiene prioridad.
        </Text>
        <Text size={1} muted>
          En cotizacion con varios servicios y destinos distintos (especialista/numero), el envio se unifica al WhatsApp general.
        </Text>
        <Text size={1} muted>
          En esos casos, en Agenda el campo Servicio se muestra como <strong>Variados</strong>.
        </Text>
        <Text size={1} muted>
          En Agenda tambien se muestra un indicador visible: <strong>Destino de envio</strong> para confirmar a que WhatsApp ira la solicitud.
        </Text>
      </Stack>
    </Card>
  )
}
