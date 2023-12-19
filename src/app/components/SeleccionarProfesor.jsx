import {NavbarContent, NavbarItem, Button, Select, SelectItem} from "@nextui-org/react";

export default function SeleccionarProfesor({handleSubmit, handleProfesor, profesor, materia, opciones}) {
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