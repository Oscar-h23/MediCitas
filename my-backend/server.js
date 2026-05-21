/* ======================================================
   IMPORTACIONES
====================================================== */

// Framework principal para crear el servidor
const express = require('express');

// Permite conexión entre Angular y el backend
const cors = require('cors');


/* ======================================================
   CONFIGURACIÓN DEL SERVIDOR
====================================================== */

const app = express();

// Habilitar CORS
app.use(cors());

// Permitir recibir JSON
app.use(express.json());

/* ======================================================
   DATOS DE PRUEBA
====================================================== */

// Usuarios registrados
let usuarios = [
  {
    id: 1,
    name: 'admin',
    email: 'admin@test.com',
    password: '123456',
    rol: 'admin'
  },
  {
    id: 2,
    name: 'Oscar Herrera',
    email: 'cliente@test.com',
    password: '123456',
    rol: 'cliente'
  },
  {
    id: 3,
    name: 'María López',
    email: 'maria@test.com',
    password: '123456',
    rol: 'cliente'
  },
  {
    id: 4,
    name: 'Carlos Ramírez',
    email: 'carlos@test.com',
    password: '123456',
    rol: 'cliente'
  },
  {
    id: 5,
    name: 'Lucía Fernández',
    email: 'lucia@test.com',
    password: '123456',
    rol: 'cliente'
  },
  {
    id: 6,
    name: 'José Castillo',
    email: 'jose@test.com',
    password: '123456',
    rol: 'cliente'
  }
];


// Lista de doctores
const doctores = [
  {
    id: 1,
    foto: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7',
    nombre: 'Dr. Juan Pérez',
    especialidad: 'Cardiología',
    horarios: ['09:00', '10:00', '11:00', '12:00'],
    precioConsulta: 50
  },
  {
    id: 2,
    foto: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2',
    nombre: 'Dra. Ana Gómez',
    especialidad: 'Dermatología',
    horarios: ['14:00', '15:00', '16:00'],
    precioConsulta: 40
  },
  {
    id: 3,
    foto: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d',
    nombre: 'Dr. Luis Torres',
    especialidad: 'Pediatría',
    horarios: ['08:00', '09:00', '10:00'],
    precioConsulta: 45
  },
  {
    id: 4,
    foto: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f',
    nombre: 'Dra. Sofía Martínez',
    especialidad: 'Neurología',
    horarios: ['13:00', '14:00', '15:00'],
    precioConsulta: 70
  },
  {
    id: 5,
    foto: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d',
    nombre: 'Dr. Ricardo Salas',
    especialidad: 'Traumatología',
    horarios: ['10:00', '11:00', '12:00'],
    precioConsulta: 60
  },
  {
    id: 6,
    foto: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f',
    nombre: 'Dra. Camila Rojas',
    especialidad: 'Ginecología',
    horarios: ['16:00', '17:00', '18:00'],
    precioConsulta: 55
  },
  {
    id: 7,
    foto: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54',
    nombre: 'Dr. Miguel Herrera',
    especialidad: 'Oftalmología',
    horarios: ['08:00', '09:00', '11:00'],
    precioConsulta: 65
  },
  {
    id: 8,
    foto: 'https://www.shutterstock.com/image-photo/portrait-young-confident-smiling-woman-600nw-2745619673.jpg',
    nombre: 'Dra. Patricia Núñez',
    especialidad: 'Psiquiatría',
    horarios: ['15:00', '16:00', '17:00'],
    precioConsulta: 80
  }
];


// Lista de citas médicas
let citas = [
  {
    id: 1,
    doctorId: 1,
    doctor: 'Dr. Juan Pérez',
    especialidad: 'Cardiología',
    precioConsulta: 50,
    paciente: 'Oscar Herrera',
    fecha: '2026-05-20',
    hora: '10:00'
  },
  {
    id: 2,
    doctorId: 2,
    doctor: 'Dra. Ana Gómez',
    especialidad: 'Dermatología',
    precioConsulta: 40,
    paciente: 'María López',
    fecha: '2026-05-22',
    hora: '14:00'
  },
  {
    id: 3,
    doctorId: 3,
    doctor: 'Dr. Luis Torres',
    especialidad: 'Pediatría',
    precioConsulta: 45,
    paciente: 'Carlos Ramírez',
    fecha: '2026-05-23',
    hora: '09:00'
  },
  {
    id: 4,
    doctorId: 4,
    doctor: 'Dra. Sofía Martínez',
    especialidad: 'Neurología',
    precioConsulta: 70,
    paciente: 'Lucía Fernández',
    fecha: '2026-05-24',
    hora: '14:00'
  },
  {
    id: 5,
    doctorId: 5,
    doctor: 'Dr. Ricardo Salas',
    especialidad: 'Traumatología',
    precioConsulta: 60,
    paciente: 'José Castillo',
    fecha: '2026-05-25',
    hora: '11:00'
  },
  {
    id: 6,
    doctorId: 6,
    doctor: 'Dra. Camila Rojas',
    especialidad: 'Ginecología',
    precioConsulta: 55,
    paciente: 'María López',
    fecha: '2026-05-26',
    hora: '17:00'
  },
  {
    id: 7,
    doctorId: 7,
    doctor: 'Dr. Miguel Herrera',
    especialidad: 'Oftalmología',
    precioConsulta: 65,
    paciente: 'Oscar Herrera',
    fecha: '2026-05-27',
    hora: '08:00'
  },
  {
    id: 8,
    doctorId: 8,
    doctor: 'Dra. Patricia Núñez',
    especialidad: 'Psiquiatría',
    precioConsulta: 80,
    paciente: 'Carlos Ramírez',
    fecha: '2026-05-28',
    hora: '16:00'
  }
];


/* ======================================================
   REGISTRO DE CLIENTES
====================================================== */

app.post('/register-cliente', (req, res) => {

  // Obtener datos enviados desde Angular
  const { name, email, password } = req.body;

  // Validar campos obligatorios
  if (!name || !email || !password) {
    return res.status(400).json({
      mensaje: 'Nombre, email y contraseña son requeridos'
    });
  }

  // Verificar si el email ya existe
  if (usuarios.find(u => u.email === email)) {
    return res.status(400).json({
      mensaje: 'Email ya registrado'
    });
  }

  // Crear nuevo usuario
  const nuevoUsuario = {
    id: usuarios.length + 1,
    name,
    email,
    password,
    rol: 'cliente'
  };

  // Guardar usuario en memoria
  usuarios.push(nuevoUsuario);

  // Ocultar contraseña
  const { password: _, ...usuarioSinPassword } = nuevoUsuario;

  // Respuesta
  res.status(201).json({
    mensaje: 'Usuario registrado',
    usuario: usuarioSinPassword
  });
});


/* ======================================================
   LOGIN
====================================================== */

app.post('/login', (req, res) => {

  // Obtener credenciales
  const { email, password } = req.body;

  // Validar campos
  if (!email || !password) {
    return res.status(400).json({
      mensaje: 'Email y contraseña son requeridos'
    });
  }

  // Buscar usuario
  const usuario = usuarios.find(
    u => u.email === email && u.password === password
  );

  // Validar usuario
  if (!usuario) {
    return res.status(401).json({
      mensaje: 'Credenciales incorrectas'
    });
  }

  // Ocultar contraseña
  const { password: _, ...usuarioSinPassword } = usuario;

  // Respuesta exitosa
  res.json({
    token: 'token-prueba',
    usuario: usuarioSinPassword
  });
});


/* ======================================================
   OBTENER USUARIOS
====================================================== */

app.get('/usuarios', (req, res) => {

  // Eliminar contraseñas antes de enviar
  const usuariosSeguros = usuarios.map(({ password, ...u }) => u);

  // Respuesta
  res.json(usuariosSeguros);
});


/* ======================================================
   OBTENER DOCTORES
====================================================== */

app.get('/doctores', (req, res) => {

  // Devolver lista completa
  res.json(doctores);
});


/* ======================================================
   OBTENER HORARIOS DISPONIBLES
====================================================== */

app.get('/horarios-disponibles', (req, res) => {

  // Obtener parámetros de la URL
  const { doctorId, fecha } = req.query;

  // Validar parámetros
  if (!doctorId || !fecha) {
    return res.status(400).json({
      mensaje: 'doctorId y fecha son requeridos'
    });
  }

  // Buscar doctor
  const doctor = doctores.find(d => d.id == doctorId);

  // Validar doctor
  if (!doctor) {
    return res.status(404).json({
      mensaje: 'Doctor no encontrado'
    });
  }

  // Fecha y hora actual
  const ahora    = new Date();
  const horaHoy  = ahora.getHours();
  const minHoy   = ahora.getMinutes();
  const fechaHoy = ahora.toISOString().split('T')[0];

  // Obtener horas ocupadas
    const horasOcupadas = citas
    .filter(c => c.doctorId == doctorId && c.fecha === fecha)
    .map(c => c.hora);

  // Filtrar horarios disponibles
  const horariosDisponibles = doctor.horarios.filter(h => {

    // Quitar horas ocupadas
    if (horasOcupadas.includes(h)) return false;

    // Si la fecha es hoy, quitar horas que ya pasaron
    if (fecha === fechaHoy) {
      const [hHora, hMin] = h.split(':').map(Number);

      // Quitar si la hora ya pasó o es la hora actual pero ya pasaron los minutos
      if (hHora < horaHoy) return false;
      if (hHora === horaHoy && hMin <= minHoy) return false;
    }

    return true;
  });

  res.json(horariosDisponibles);
});


/* ======================================================
   CREAR CITA
====================================================== */

app.post('/citas', (req, res) => {

  // Obtener datos enviados
  const { doctorId, paciente, fecha, hora } = req.body;

  // Validar campos
  if (!doctorId || !paciente || !fecha || !hora) {
    return res.status(400).json({
      mensaje: 'doctorId, paciente, fecha y hora son requeridos'
    });
  }

  // Verificar doctor
  const doctor = doctores.find(d => d.id == doctorId);

  if (!doctor) {
    return res.status(404).json({
      mensaje: 'Doctor no encontrado'
    });
  }

  // Verificar que la hora exista
  if (!doctor.horarios.includes(hora)) {
    return res.status(400).json({
      mensaje: 'Hora no válida para este doctor'
    });
  }

  // Validar si el horario ya está ocupado
  const existeCita = citas.find(
    c => c.doctorId == doctorId &&
         c.fecha === fecha &&
         c.hora === hora
  );

  if (existeCita) {
    return res.status(400).json({
      mensaje: 'Horario ocupado'
    });
  }

  // Crear nueva cita
  const nuevaCita = {
    id: citas.length + 1,
    doctorId: Number(doctorId),
    doctor: doctor.nombre,           
    especialidad: doctor.especialidad,
    precioConsulta: doctor.precioConsulta,
    paciente,
    fecha,
    hora
  };

  // Guardar cita
  citas.push(nuevaCita);

  // Respuesta
  res.status(201).json({
    mensaje: 'Cita registrada',
    cita: nuevaCita
  });
});


/* ======================================================
   OBTENER CITAS
====================================================== */

app.get('/citas', (req, res) => {

  // Obtener filtros opcionales
  const { paciente, doctorId } = req.query;

  let resultado = citas;

  // Filtrar por paciente
  if (paciente) {
    resultado = resultado.filter(
      c => c.paciente === paciente
    );
  }

  // Filtrar por doctor
  if (doctorId) {
    resultado = resultado.filter(
      c => c.doctorId == doctorId
    );
  }

  // Respuesta
  res.json(resultado);
});


/* ======================================================
   CANCELAR CITA
====================================================== */

app.delete('/citas/:id', (req, res) => {

  // Obtener id desde la URL
  const id = Number(req.params.id);

  // Buscar índice
  const index = citas.findIndex(c => c.id === id);

  // Validar existencia
  if (index === -1) {
    return res.status(404).json({
      mensaje: 'Cita no encontrada'
    });
  }

  // Eliminar cita
  citas.splice(index, 1);

  // Respuesta
  res.json({
    mensaje: 'Cita cancelada'
  });
});


/* ======================================================
   EDITAR DOCTOR
====================================================== */

app.put('/doctores/:id', (req, res) => {

  // Obtener id
  const id = Number(req.params.id);

  // Buscar doctor
  const index = doctores.findIndex(d => d.id === id);

  // Validar existencia
  if (index === -1) {
    return res.status(404).json({
      mensaje: 'Doctor no encontrado'
    });
  }

  // Actualizar doctor
  doctores[index] = {
    id,
    ...req.body
  };

  // Respuesta
  res.json(doctores[index]);
});


/* ======================================================
   AGREGAR DOCTOR
====================================================== */

app.post('/doctores', (req, res) => {

  // Obtener datos
  const {
    nombre,
    especialidad,
    foto,
    horarios,
    precioConsulta
      
  } = req.body;

  // Validar campos
  if (!nombre || !especialidad) {
    return res.status(400).json({
      mensaje: 'Nombre y especialidad requeridos'
    });
  }

  // Crear doctor
  const nuevo = {
    id: doctores.length + 1,
    nombre,
    especialidad,
    foto: foto || '',
    horarios: horarios || [],
    precioConsulta: precioConsulta || 0
  };

  // Guardar doctor
  doctores.push(nuevo);

  // Respuesta
  res.status(201).json(nuevo);
});


/* ======================================================
   INICIAR SERVIDOR
====================================================== */

app.listen(3000, () => {
  console.log('Servidor corriendo en puerto 3000');
});