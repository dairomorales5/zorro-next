'use client'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import OpenAI from "openai";
export const openai_config = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const audioTranscription = async (audio_blob) => {
  // Convert the audio blob to a Buffer
  const audioBuffer = await audio_blob.arrayBuffer();
  const audioArray = new Uint8Array(audioBuffer);

  // Create a file object with the audio data
  const audioFile = new File([audioArray], 'audio.wav', { type: 'audio/wav' });

  try {
    // Make the transcription request
    const transcription = await openai_config.audio.transcriptions.create({
      file: audioFile,
      model: "whisper-1",
      prompt: "El nombre de nuestra empresa es ZoRRO, así que va a ser una palabra común en los audios.",
      language: 'es'
    });
    return transcription;
  } catch (error) {
    console.error('Error en la transcripción:', error);
    throw error;
  }
};

const ContextGeneration = (mensajes,tipo) =>{
  if(tipo==='json'){
    return [{role:"system", content: 'Genera un archivo JSON basado en la conversación del usuario y ZoRRO. El json tiene la siguiente estructura: {aprueba: bool, actitud: str, metodos_calificacion: str, aspectos_mejorar: str, opinion_universidad: str}. NO inventes cosas, la conversación será paulatina, así que es normal tener muchas llaves vacías. Es más, si un tema solo se subre superficialmente, no llenes esa información. Queremos que la conversación nos de información profunda.'},
    ...mensajes.slice(1,-1).map((msj) => ({role: msj.usuario === process.env.NEXT_PUBLIC_ASSISTANT_NAME ? 'assistant' : 'user',content: msj.mensaje}))]
  } else {
    return [{role:"system", content: `Te llamas ZoRRO. Eres un experto en obtener percepciones de estudiantes.
    Al estudiante le vas a preguntar sobre su percepción acerca del profesor ${mensajes.profesor} en la materia ${mensajes.materia}.
    Debes preguntarle sobre actitud, métodos de calificación, qué puede mejorar, y qué piensa de la universidad en general.
    Si el estudiante ya terminó de responder todo eso, o ya no quiere seguir respondeindo más, despídete de forma amigable.
    Pregunta una cosa a la vez. Con cada respuesta que te dé el estudiante, debes responder de una manera muy empática (usas emojis y memes para responder) y luego de alguna manera seguir con las demás preguntas.
    El siguiente es un JSON con la información parcial que ha contestado el estudiante. Pregunta por lo que falta. Si no hace falta nada más, pregunta por si tiene comentarios adicionales y despídete.
    ${JSON.stringify(mensajes.json)}.`},
    {role: "user", content: mensajes.mensaje.mensaje}]
  }
}

const jsonGeneration = (mensajes) => {
  return openai_config.chat.completions.create({
    messages: ContextGeneration(mensajes,'json'),
    model: "gpt-3.5-turbo-1106",
    response_format: { "type": "json_object" }
  }).then((res) => {
    return res
  }).catch((error) => {
    console.error('Error en la generación del JSON:', error);
    throw error;
  });
}

export const fetchOpenAIStream = async (mensajes, json, profesor, materia) => {
  const response = await openai_config.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: ContextGeneration({ json: json, mensaje: mensajes[mensajes.length - 2], profesor: profesor, materia: materia }, 'conversation'),
    stream: true,
  });

  const stream = OpenAIStream(response)
	return new StreamingTextResponse(stream)
};

export async function* streamReader(stream) {
  const reader = stream.body?.getReader()
  const decoder = new TextDecoder()
  if(reader == null) return
  while (true) {
    const { done, value } = await reader.read()
    const chunk = decoder.decode(value)
    yield chunk
    if (done) break
  }
}

export const JSONUpdate = async (nuevos_mensajes) => {
  try {
    const resp = await jsonGeneration(nuevos_mensajes);
    const json_OA = resp.choices[0].message.content;
    console.log(json_OA);
    return JSON.parse(json_OA);
  } catch (error) {
    console.error("Error al generar el JSON:", error);
    throw error;
  }
}