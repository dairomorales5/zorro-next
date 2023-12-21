// Componente para hacer el header del aplicativo, basándonse en el
// componente Navbar de NextUI

import logo_Zorro from '../img/logo_Zorro.jpeg'
import {Avatar, Navbar, NavbarBrand} from "@nextui-org/react";

import SeleccionarProfesor from './SeleccionarProfesor';
import { getOpciones, getConversation } from "../lib/data";
import Link from 'next/link';

export default async function Header({ profesor, materia }) {
  const opciones = await getOpciones();
  const conversaciones = await getConversation(profesor, materia);
  console.log(conversaciones);
    return (
    <Navbar>
      <Link href="/">
      <NavbarBrand>
      <Avatar src={logo_Zorro.src} className="w-10 h-10 text-large" />
        <p className="font-bold text-inherit">ZoRRO</p>
      </NavbarBrand>
      </Link>
        <SeleccionarProfesor opciones={opciones} />
    </Navbar>
    );
}