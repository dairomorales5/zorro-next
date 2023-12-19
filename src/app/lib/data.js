'use server'
import { sql } from "@vercel/postgres";
import { parseRowOpciones } from "../lib/functions";

export async function getOpciones() {
  console.log({
    POSTGRES_URL: process.env.POSTGRES_URL,
    POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING
  });
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