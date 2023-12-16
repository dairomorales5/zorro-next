// Función para convertir el array en un objeto
export function parseRowOpciones(array) {
  const objetoResultante = {};

  array.forEach(item => {
    const nombreProfesor = item.nombre_profesor;
    const nombreMateria = item.nombre_materia;

    if (!objetoResultante[nombreProfesor]) {
      // Si el profesor no está en el objeto, se agrega con un array que contiene la materia actual
      objetoResultante[nombreProfesor] = [nombreMateria];
    } else {
      // Si el profesor ya está en el objeto, se agrega la materia al array existente
      objetoResultante[nombreProfesor].push(nombreMateria);
    }
  });

  return objetoResultante;
}