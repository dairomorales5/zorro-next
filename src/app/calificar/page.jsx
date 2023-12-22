import Header from "../components/Header"
import Progreso from "../components/Progreso"
import CajaTexto from "../components/CajaTexto";
import AudioRecorder from "../components/AudioRecorder";
import ServerConversacion from "../components/ServerConversacion";

import { Suspense } from "react";


export default function Page({ searchParams }) {
  const { profesor, materia } = searchParams;
  return <>
  <Suspense fallback={<div>Loading...</div>}>
    <Header />
  </Suspense>
  <section className="flex flex-row flex-1 overflow-auto p-4 w-screen">
    <Progreso className="w-1/4" />
    <Suspense fallback={<div>Loading...</div>}>
      <ServerConversacion profesor={profesor} materia={materia} />
    </Suspense>
  </section>

  <section className="flex flex-row w-screen">
    <CajaTexto />
    <Suspense fallback={<div>Loading...</div>}>
      <AudioRecorder />
    </Suspense>
  </section>
  </>
}