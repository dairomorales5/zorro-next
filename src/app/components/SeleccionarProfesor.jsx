'use client'
import {NavbarContent, NavbarItem, Button, Select, SelectItem} from "@nextui-org/react";

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SeleccionarProfesor({ opciones }) {
  const searchParams = useSearchParams();
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

  return <>
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
  </>
}