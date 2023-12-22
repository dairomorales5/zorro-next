import { getConversation } from "../lib/data";
import Mensajes from '../components/Mensajes';
import logo_Zorro from '../img/logo_Zorro.jpeg'

import { ScrollShadow } from "@nextui-org/react"

export default async function ServerConversacion({profesor,materia}){
  const mensajes_raw = await getConversation(profesor,materia);
  const mensajes = [{
    usuario: process.env.NEXT_PUBLIC_ASSISTANT_NAME,
    mensaje: `¡Hola! Soy ZORRO. Un chatbot especializado en obtener la percepción de estudiantes universitarios sobre sus profesores.
    Me gustaría conocer tu opinión sobre el profesor ${profesor} en la materia ${materia}.
    Siéntete libre de poner aquí tu opinión.`,
    imagen: {logo_Zorro}
  },
  ...mensajes_raw.map((mensaje) => {
    return {usuario: 'Usuario', mensaje: mensaje.mensaje_txt, imagen: null}
  })]
  return <>
    <ScrollShadow hideScrollBar size={100} className="flex-1">
      <Mensajes mensajes_server={mensajes} />
    </ScrollShadow>
  </>
}