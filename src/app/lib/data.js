import { sql } from "@vercel/postgres";

export async function getOpciones() {
  const profesores_materias = await sql`
  SELECT
      p.nombre_profesor,
      m.nombre_materia
  FROM
      profesores_materias pm
  JOIN
      profesores p ON pm.id_profesor = p.id_profesor
  JOIN
      materias m ON pm.id_materia = m.id_materia;
  `;
  return profesores_materias.rows;
}