// Datos en memoria: se pierden al reiniciar el servicio (RNF5).

const espacios = [
  {
    id: 1,
    nombre: 'Auditorio',
    ubicacion: 'Bloque B, piso 1',
    capacidad: 200,
    tipo: 'Eventos / reuniones',
    descripcion:
      'Espacio destinado a conferencias, eventos académicos, reuniones institucionales, exposiciones y actividades de gran afluencia.',
    imagen:
      'https://iescinoc.edu.co/wp-content/uploads/DSC0736-ARW-1-1024x683.webp',
  },
  {
    id: 2,
    nombre: 'Salón Multipropósito',
    ubicacion: 'Bloque B, piso 1',
    capacidad: 90,
    tipo: 'Reuniones / actividades',
    descripcion:
      'Espacio flexible para reuniones, talleres, capacitaciones, actividades académicas y eventos que requieren una distribución adaptable.',
    imagen:
      'https://archivo.lapatria.com/sites/default/files/fotosencontenido/2022/Marzo/845042-1516091.jpg',
  },
  {
    id: 3,
    nombre: 'Biblioteca',
    ubicacion: 'Bloque A, piso 1',
    capacidad: 40,
    tipo: 'Estudio / consulta',
    descripcion:
      'Espacio destinado a la consulta de material bibliográfico, lectura, investigación, estudio individual y actividades académicas.',
    imagen:
      'https://iescinoc.edu.co/wp-content/uploads/Editorial-IES-CINOC-.jpeg',
  },
  {
    id: 4,
    nombre: 'LUBIT',
    ubicacion: 'Bloque A, piso 1',
    capacidad: 90,
    tipo: 'Formación / tecnología',
    descripcion:
      'Espacio destinado al desarrollo de actividades académicas, tecnológicas y de formación que requieren recursos informáticos y audiovisuales.',
    imagen: 'https://iescinoc.edu.co/wp-content/uploads/LuBIT-1170x500.jpeg',
  },
  {
    id: 5,
    nombre: 'Sala de Sistemas 2-1',
    ubicacion: 'Bloque A, piso 2',
    capacidad: 30,
    tipo: 'Informática / formación',
    descripcion:
      'Sala equipada para clases, prácticas y actividades académicas relacionadas con informática, software, programación y herramientas digitales.',
    imagen: 'https://www.uac.edu.co/wp-content/uploads/2022/12/sala-mac1.jpg',
  },
  {
    id: 6,
    nombre: 'Laboratorio de Electrónica',
    ubicacion: 'Bloque A, piso 4',
    capacidad: 30,
    tipo: 'Prácticas',
    descripcion:
      'Espacio destinado a prácticas académicas relacionadas con electrónica, circuitos, componentes y sistemas electrónicos.',
    imagen:
      'https://delorenzoglobal.com/wp-content/uploads/2024/04/DL-PELTOT-scaled.jpg',
  },
  {
    id: 7,
    nombre: 'Laboratorio de Redes',
    ubicacion: 'Bloque A, piso 4',
    capacidad: 30,
    tipo: 'Prácticas',
    descripcion:
      'Laboratorio destinado a prácticas de redes de computadores, configuración de equipos, conectividad, cableado y administración de redes.',
    imagen:
      'https://departamento-ingenieria.pucp.edu.pe/wp-content/uploads/2022/09/laboratorios_Laboratorio-De-Conmutacion-Y-Redes-871x600.jpg',
  },
  {
    id: 8,
    nombre: 'Laboratorio de Hardware',
    ubicacion: 'Bloque A, piso 4',
    capacidad: 30,
    tipo: 'Prácticas',
    descripcion:
      'Espacio destinado a prácticas de mantenimiento, diagnóstico, ensamblaje y configuración de computadores y componentes de hardware.',
    imagen:
      'https://www.ung.br/sites/ung.br/files/styles/galleria_zoom/public/galeria/estruturaFisica/098e3b82fa7c2bd508dfb551de9f8173/lab_hardware_e_rede_-_1.jpg?itok=DVoTrbcS',
  },
  {
    id: 9,
    nombre: 'Laboratorio SIG',
    ubicacion: 'Bloque A, piso 4',
    capacidad: 30,
    tipo: 'Geomática / SIG',
    descripcion:
      'Espacio destinado al aprendizaje y desarrollo de actividades relacionadas con Sistemas de Información Geográfica, cartografía, análisis espacial y geomática.',
    imagen: 'https://wwflac.awsassets.panda.org/img/original/dscn9762.jpg',
  },
];

const reservas = [];

// Contadores para autogenerar los id
const contadores = {
  espacio: espacios.length + 1,
  reserva: 1,
};

module.exports = { espacios, reservas, contadores };
