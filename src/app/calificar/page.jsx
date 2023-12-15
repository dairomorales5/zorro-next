'use client'
import Header from "../components/Header"
import Progreso from "../components/Progreso"
import Mensajes from '../components/Mensajes';
import CajaTexto from "../components/CajaTexto";
import AudioRecorder from "../components/AudioRecorder";

import { ScrollShadow } from "@nextui-org/react"
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";


export default function Calificar() {
  return <>
  <Header />
  
  <section className="flex flex-row flex-1 overflow-auto p-4 w-screen">
    <Progreso className="w-1/4" />
    <ScrollShadow hideScrollBar size={100} className="flex-1">
      <Mensajes />
    </ScrollShadow>
  </section>

  <section className="flex flex-row w-screen">
    <CajaTexto />
    <Suspense fallback={<div>Loading...</div>}>
    <AudioRecorder />
    </Suspense>
  </section>
  </>
}