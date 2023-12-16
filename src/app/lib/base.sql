CREATE TABLE IF NOT EXISTS profesores (
  idprofesores SERIAL PRIMARY KEY,
  nombre_profesor VARCHAR(45) NOT NULL
);

CREATE TABLE IF NOT EXISTS materias (
  idmaterias SERIAL PRIMARY KEY,
  nombre_materia VARCHAR(45) NOT NULL
);

CREATE TABLE IF NOT EXISTS profesores_materias (
  profesores_idprofesores INT REFERENCES profesores(idprofesores) ON DELETE NO ACTION ON UPDATE NO ACTION,
  materias_idmaterias INT REFERENCES materias(idmaterias) ON DELETE NO ACTION ON UPDATE NO ACTION,
  PRIMARY KEY (profesores_idprofesores, materias_idmaterias)
);

CREATE TABLE IF NOT EXISTS usuarios (
  idusuario SERIAL PRIMARY KEY,
  nombre_usuario VARCHAR(45) NOT NULL
);

CREATE TABLE IF NOT EXISTS usuarios_profesores_materias (
  idusuario INT REFERENCES usuarios(idusuario) ON DELETE NO ACTION ON UPDATE NO ACTION,
  idprofesor INT REFERENCES profesores(idprofesores) ON DELETE NO ACTION ON UPDATE NO ACTION,
  idmateria INT REFERENCES materias(idmaterias) ON DELETE NO ACTION ON UPDATE NO ACTION,
  PRIMARY KEY (idusuario, idprofesor, idmateria)
);

CREATE TABLE IF NOT EXISTS conversaciones (
  idconversacion SERIAL PRIMARY KEY,
  idusuario INT REFERENCES usuarios(idusuario) ON DELETE NO ACTION ON UPDATE NO ACTION,
  idprofesor INT REFERENCES profesores(idprofesores) ON DELETE NO ACTION ON UPDATE NO ACTION,
  idmateria INT REFERENCES materias(idmaterias) ON DELETE NO ACTION ON UPDATE NO ACTION,
  UNIQUE (idconversacion),
  FOREIGN KEY (idusuario, idprofesor, idmateria) REFERENCES usuarios_profesores_materias(idusuario, idprofesor, idmateria) ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS mensajes (
  idmensaje SERIAL PRIMARY KEY,
  idconversacion INT REFERENCES conversaciones(idconversacion) ON DELETE NO ACTION ON UPDATE NO ACTION,
  mensaje_txt VARCHAR(1000),
  asistente BOOLEAN NOT NULL,
  UNIQUE (idmensaje),
  FOREIGN KEY (idconversacion) REFERENCES conversaciones(idconversacion) ON DELETE NO ACTION ON UPDATE NO ACTION
);










---------------------------------------------
-- Inserciones para la tabla 'profesores'
-- Inserciones en la tabla de profesores
INSERT INTO profesores (nombre_profesor) VALUES
  ('María Acosta'),
  ('Pedro Caro'),
  ('Juan Pardo');

-- Inserciones en la tabla de materias
INSERT INTO materias (nombre_materia) VALUES
  ('Matemáticas'),
  ('Historia'),
  ('Ciencias');

  -- Inserciones en la tabla de profesores_materias
INSERT INTO profesores_materias (profesores_idprofesores, materias_idmaterias) VALUES
  (1, 1),
  (1, 2),
  (2, 2),
  (3, 3);

-- Inserciones en la tabla de usuarios_profesores_materias
INSERT INTO usuarios_profesores_materias (idusuario, idprofesor, idmateria) VALUES
  (1, 1, 1),
  (1, 1, 2),
  (1, 3, 3);

-- Inserciones en la tabla de conversaciones
INSERT INTO conversaciones (idusuario, idprofesor, idmateria) VALUES
  (1, 1, 1),
  (1, 1, 2),
  (1, 3, 3);

-- Inserciones en la tabla de mensajes
INSERT INTO mensajes (idconversacion, mensaje_txt, asistente) VALUES
  (1, 'Hola, ¿puedes ayudarme con una pregunta de matemáticas?', false),
  (1, '¡Claro que sí! ¡Cuéntame!', true),
  (1, '¿Es el cero un número natural?', false);