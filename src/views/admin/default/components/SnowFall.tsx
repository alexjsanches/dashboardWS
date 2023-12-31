import { useEffect } from 'react';

const Snowfall: React.FC = () => {
  useEffect(() => {
    const script: HTMLScriptElement = document.createElement('script');
   
    script.src = '';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Limpar o script ao desmontar o componente, se necessário
      document.body.removeChild(script);
    };
  }, []);

  return null; // O componente não renderiza nada
};

export default Snowfall;
