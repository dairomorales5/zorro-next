'use client'
// Componente para la creación de la caja de texto de entrada del usuario
// Será un textarea que se expandirá automáticamente a medida que el usuario escriba
import { useState, useContext, useEffect } from "react";
import {Textarea, Button} from "@nextui-org/react";
import { ContextoConversacion } from '../context/context';
import { useSearchParams } from 'next/navigation';
import { JSONUpdate, fetchOpenAIStream, streamReader } from './js/openai';

const useConversacion = () => {
  return useContext(ContextoConversacion);
}


const CajaTexto = () => {
  const {mensajes,setMensajes, createSystemMessage, agregarMensaje, json,setJson,typing, setTyping} = useConversacion();
  const searchParams = useSearchParams();
  const profesor = searchParams.get('profesor');
  const materia = searchParams.get('materia');
  const [mensaje, setMensaje] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isGenerating, setIsGenerating] = useState(null);
  const handleTyping = (e) => {
    let actual = e.target.value;
    setMensaje(actual);
    setTyping(actual.length > 0);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    // Limpia el textarea
    e.target.reset();
    setTyping(false);
    setIsSending(true);
  };
  useEffect(()=>{
    if(isSending){
      setMensajes([...mensajes,{
        'usuario':'Usuario',
        'mensaje': mensaje,
        'imagen':''
      }]);
      setMensajes((prevMensajes)=>{
        return [...prevMensajes, createSystemMessage('')];
      });
      setIsSending(false);
      setIsGenerating(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isSending]);
  useEffect(() => {
    if (isGenerating===true) {
      (async () => {
        let res = await fetchOpenAIStream(mensajes, json, profesor, materia);
        let mensaje = '';
        for await (const chunk of streamReader(res)) {
          mensaje += chunk;
          agregarMensaje(mensaje);
        }
      })();
      setIsGenerating(false);
    } else if(isGenerating===false) {
      JSONUpdate(mensajes).then((jsonData) => {
        setJson(jsonData);
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGenerating]);
    return (
      <form onSubmit={handleSubmit} className="w-full flex flex-row items-center">
        <Textarea
          label="Mensaje"
          placeholder="Describe tu experiencia con el profesor"
          onChange={handleTyping}
        />
        {typing && <Button type="submit" className='flex items-center justify-center w-20 h-20 bg-transparent'>Enviar</Button>}
      </form>
    );
}

export default CajaTexto;