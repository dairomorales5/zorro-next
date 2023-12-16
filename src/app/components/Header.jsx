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

const Header = ({opciones}) => {
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
  const handleSubmit = (e) => {
    e.preventDefault();
    const [profe, mate] = e.currentTarget.querySelectorAll("input[type='text']");
    setProfesor(profe.value);
    setMateria(mate.value);
    params.set('profesor',profe.value);
    params.set('materia',mate.value);
    replace(pathname+'?'+params.toString());
  }
  useEffect(() => {
    agregarMensaje(`¡Hola! Soy ZORRO. Un chatbot especializado en obtener la percepción de estudiantes universitarios sobre sus profesores.
    Me gustaría conocer tu opinión sobre el profesor ${profesor} en la materia ${materia}.
    Siéntete libre de poner aquí tu opinión.`);
    // Verificar 'profesor' y 'materia' de 'opciones'
    if(!Object.keys(opciones).includes(profesor) || !opciones[profesor].includes(materia)){
      console.error('Profesor o materia no encontrados');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
    return (
      <Navbar>
      <NavbarBrand>
      <Avatar src={logo_Zorro.src} className="w-10 h-10 text-large" />
        <p className="font-bold text-inherit">ZoRRO</p>
      </NavbarBrand>
      <form onSubmit={handleSubmit} className="gap-4 flex-grow">
      <NavbarContent justify="center">
        <NavbarItem className="w-full">
          <Select label="Profesor" placeholder="Seleccione un profesor"
          defaultSelectedKeys={[profesor]} onSelectionChange={handleProfesor}>
            {Object.keys(opciones).map((opcion) => {
                return <SelectItem value={opcion} key={opcion} className='dark'>{opcion}</SelectItem>
              })
            }
          </Select>
        </NavbarItem>
        <NavbarItem className="w-full min-w-unit-24">
          <Select label="Materia" placeholder="Seleccione un materia"
          defaultSelectedKeys={[materia]}>
            {opciones[profesor]?.map((opcion) => {
                return <SelectItem value={opcion} key={opcion} className='dark'>{opcion}</SelectItem>
              })
            }
          </Select>
        </NavbarItem>
        <NavbarItem className="w-full min-w-unit-24">
          <Button type="submit" color="primary" variant="flat">Calificar</Button>
        </NavbarItem>
      </NavbarContent>
      </form>
    </Navbar>
    );
}

export default Header;