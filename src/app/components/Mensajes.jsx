'use client'
// Componente para renderizar los mensajes tanto del usuario como del sistema

import React, {useContext, useEffect} from 'react';
import { ContextoConversacion } from '../context/context';

import {Card, CardHeader, CardBody, Image, Divider} from "@nextui-org/react";

const useConversacion = () => {
    return useContext(ContextoConversacion);
}
const Mensaje = ({ mensajes_server }) => {
  const {mensajes,setMensajes} = useConversacion();
  
  useEffect(() => {
    setMensajes(mensajes_server);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mensajes_server]);
  return (
      <>
        {mensajes.map((mensaje, index) => {
          return (
            <div key={index}>
            <Card shadow className={`max-w-xl ${mensaje.usuario===process.env.NEXT_PUBLIC_ASSISTANT_NAME ? 'float-left self-start bg-blue-400' : 'float-right self-end bg-green-400'}`}>
              <CardHeader className="flex gap-3">
                {mensaje.imagen && <Image src={mensaje.imagen.logo_Zorro.src} width={40} height={40} alt='' />}
                <div className='flex flex-col'>
                  <strong>{mensaje.usuario}</strong>
                </div>
              </CardHeader>
              <CardBody>
                {mensaje.mensaje}
              </CardBody>
            </Card>
            <Divider className='h-0'/>
            </div>
          );
        })}
      </>
  );
}

export default Mensaje;