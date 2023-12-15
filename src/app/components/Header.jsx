'use client'
// Componente para hacer el header del aplicativo, basándonse en el
// componente Navbar de NextUI
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

import logo_Zorro from '../img/logo_Zorro.jpeg'
import {Avatar, Navbar, NavbarBrand, NavbarContent, NavbarItem,
  Button, Select, SelectItem} from "@nextui-org/react";

import { useContext, useEffect, useState } from 'react';
import { ContextoConversacion } from '../context/context';
import Link from 'next/link';

const useConversacion = () => {
  return useContext(ContextoConversacion);
}

const Header = () => {
  const searchParams = useSearchParams();
  const {agregarMensaje} = useConversacion();
  const [profesor, setProfesor] = useState(searchParams.get('profesor'));
  const [materia, setMateria] = useState(searchParams.get('materia'));
  const pathname = usePathname();
  const {replace} = useRouter();
  const params = new URLSearchParams(searchParams);
  const handleProfesor = (e) => {
    let [profe] = [...e];
    setProfesor(profe);
  }
  const handleMateria = (e) => {
    let [mate] = [...e];
    setMateria(mate);
  }
  useEffect(() => {
    agregarMensaje(`¡Hola! Soy ZORRO. Un chatbot especializado en obtener la percepción de estudiantes universitarios sobre sus profesores.
    Me gustaría conocer tu opinión sobre el profesor ${profesor} en la materia ${materia}.
    Siéntete libre de poner aquí tu opinión.`);
    params.set('profesor',profesor);
    params.set('materia',materia);
    console.warn(pathname+'?'+params.toString());
    replace(pathname+'?'+params.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profesor,materia]);
    return (
      <Navbar>
      <NavbarBrand>
      <Avatar src={logo_Zorro.src} className="w-10 h-10 text-large" />
        <p className="font-bold text-inherit">ZoRRO</p>
      </NavbarBrand>
      <NavbarContent className="gap-4 flex-grow" justify="center">
        <NavbarItem className="w-full">
          <Select label="Profesor" placeholder="Seleccione un profesor" className='w-full'
          onSelectionChange={handleProfesor} defaultSelectedKeys={[profesor]}>
            <SelectItem value={"Pedro Caro"} key={"Pedro Caro"}>Pedro Caro</SelectItem>
            <SelectItem value={"María Acosta"} key={"María Acosta"}>María Acosta</SelectItem>
          </Select>
        </NavbarItem>
        <NavbarItem className="w-full">
          <Select label="Materia" placeholder="Seleccione un materia" className='w-full'
          onSelectionChange={handleMateria} defaultSelectedKeys={[materia]}>
            <SelectItem value={"Matemáticas"} key={"Matemáticas"}>Matemáticas</SelectItem>
            <SelectItem value={"Lenguaje"} key={"Lenguaje"}>Lenguaje</SelectItem>
          </Select>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button color="primary" href="#" variant="flat">
            <Link href="/">Inicio</Link>
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
    );
}

export default Header;