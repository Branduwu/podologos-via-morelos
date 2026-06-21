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
          2) <strong>Técnico destino (manual)</strong> (si tiene numero / if it has a number)
        </Text>
        <Text size={1}>
          3) <strong>WhatsApp general del negocio / Business general WhatsApp</strong>
        </Text>

        <Text size={1} muted>
          Si llenas numero/mensaje manual, ese valor tiene prioridad. / If you fill in a manual number/message, that value takes priority.
        </Text>
        <Text size={1} muted>
          En cotizacion con varios servicios y destinos distintos (tecnico/numero), el envio se unifica al WhatsApp general. / In quotes with multiple services and different destinations, the message is sent to the general WhatsApp.
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
