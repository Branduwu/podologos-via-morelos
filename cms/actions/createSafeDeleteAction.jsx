import React, {useState} from "react";
import {useClient, useDocumentOperation} from "sanity";
import {Box, Card, Stack, Text} from "@sanity/ui";

const API_VERSION = "2025-01-01";

export function createSafeDeleteAction(config) {
  const {
    label = "Borrar documento",
    blockedTitle = "No se puede borrar este documento",
    confirmMessage = "Se borrara este documento de forma permanente. Esta accion no se puede deshacer. Deseas continuar?",
    guideLine = "Si persiste, contacta al desarrollador de este sistema ABJV.",
  } = config || {};

  return function SafeDeleteAction(props) {
    const client = useClient({apiVersion: API_VERSION});
    const {delete: deleteOp} = useDocumentOperation(props.id, props.type);
    const [isChecking, setIsChecking] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [blockedRefs, setBlockedRefs] = useState([]);

    const checkReferences = async () => {
      const refs = await client.fetch(
        `*[_id != $id && references($id)][0...20]{
          _id,
          _type,
          "label": coalesce(title, name, question, "Sin titulo")
        }`,
        {id: props.id}
      );
      return Array.isArray(refs) ? refs : [];
    };

    const handleStartDelete = async () => {
      setIsChecking(true);
      try {
        const refs = await checkReferences();
        if (refs.length > 0) {
          setBlockedRefs(refs);
        } else {
          setConfirmOpen(true);
        }
      } finally {
        setIsChecking(false);
      }
    };

    const handleConfirmDelete = () => {
      deleteOp.execute();
      props.onComplete();
    };

    const closeDialogs = () => {
      setConfirmOpen(false);
      setBlockedRefs([]);
      props.onComplete();
    };

    return {
      label: isChecking ? "Validando referencias..." : label,
      tone: "critical",
      disabled: deleteOp.disabled || isChecking,
      title:
        "Antes de borrar, se valida si hay referencias en otros documentos. Si hay referencias, primero quitalas.",
      onHandle: handleStartDelete,
      dialog: blockedRefs.length
        ? {
            type: "dialog",
            header: blockedTitle,
            onClose: closeDialogs,
            content: (
              <Box padding={4}>
                <Stack space={4}>
                  <Card tone="caution" padding={3} radius={2}>
                    <Stack space={2}>
                      <Text size={1}>Este documento esta relacionado con otros documentos.</Text>
                      <Text size={1}>Primero elimina la referencia y vuelve a intentar.</Text>
                    </Stack>
                  </Card>
                  <Stack space={2}>
                    {blockedRefs.map((ref) => (
                      <Text key={ref._id} size={1}>
                        - {ref._type}: {ref.label} ({ref._id})
                      </Text>
                    ))}
                  </Stack>
                  <Card padding={3} radius={2} tone="primary">
                    <Stack space={2}>
                      <Text size={1}>Si aparece este error:</Text>
                      <Text size={1}>1) Revisa la guia del CMS.</Text>
                      <Text size={1}>2) {guideLine}</Text>
                    </Stack>
                  </Card>
                </Stack>
              </Box>
            ),
          }
        : confirmOpen
          ? {
              type: "confirm",
              tone: "critical",
              message: confirmMessage,
              onCancel: closeDialogs,
              onConfirm: handleConfirmDelete,
            }
          : null,
    };
  };
}
