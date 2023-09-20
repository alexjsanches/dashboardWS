import React, { useCallback, useRef } from "react";
import { useToast, Box, Button } from "@chakra-ui/react";
import ReactCanvasConfetti from "react-canvas-confetti";

const canvasStyles = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  zIndex: 20,
};

export default function CustomToastWithConfetti() {
  const toast = useToast();
  const refAnimationInstance = useRef(null);

  const getInstance = useCallback((instance) => {
    refAnimationInstance.current = instance;
  }, []);

  const makeShot = useCallback(
    (particleRatio, opts) => {
      refAnimationInstance.current &&
        refAnimationInstance.current({
          ...opts,
          origin: { y: 0.7 },
          particleCount: Math.floor(50 * particleRatio),
        });
    },
    [refAnimationInstance]
  );

  const playMusic = () => {
    const audio = new Audio("/sounds/jingle.mp3"); // Use o caminho correto para o arquivo MP3
    audio.play(); // Reproduza a música
  };

  const showToast = () => {
    toast({
      position: "top",
      render: () => (
        <Box
          width="600px" // Aumente a largura conforme necessário
          bg="#46A46C"
          color="white"
          p={4}
          borderRadius="md"
          fontSize="22px" // Aumente o tamanho da fonte conforme necessário
        >
          <div>
            <strong>Novo pedido faturado</strong>
          </div>
          <div>
            <strong>Cliente:</strong> Fulano de tal
            <br />
            <strong>Valor:</strong> R$ 15.000,00
            <br />
            <strong>Vendedor:</strong> Alexandre Sanches
            <br />
            <strong>Nota Fiscal:</strong> 854972
          </div>
        </Box>
      ),
    });
  
    makeShot(1, {
      spread: 50,
      startVelocity: 50,
    });

    // Reproduza a música quando o botão for clicado
    playMusic();
  };

  return (
    <>
      <Button onClick={showToast}>Mostrar Toast</Button>
      <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
    </>
  );
}
