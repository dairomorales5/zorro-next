'use server'
import { sql } from "@vercel/postgres";
import { parseRowOpciones } from "../lib/functions";

export async function getOpciones() {
  const profesores_materias = await sql`
SELECT
    p.nombre_profesor,
    m.nombre_materia
FROM
    profesores_materias pm
JOIN
    profesores p ON pm.profesores_idprofesores = p.idprofesores
JOIN
    materias m ON pm.materias_idmaterias = m.idmaterias;
  `;
  const opciones_row = profesores_materias.rows;
  return parseRowOpciones(opciones_row);
}

export async function getConversation(profesor, materia){
  const mensajes = await sql`
SELECT m.mensaje_txt, m.idconversacion FROM
mensajes m JOIN conversaciones c ON m.idconversacion = c.idconversacion
WHERE c.idprofesor IN (SELECT idprofesores FROM profesores WHERE nombre_profesor = ${profesor})
AND c.idmateria IN (SELECT idmaterias FROM materias WHERE nombre_materia = ${materia})`
return mensajes.rows;
}