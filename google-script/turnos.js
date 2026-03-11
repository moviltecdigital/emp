// ============================================================
// MOVILTEC DIGITAL — Sistema de Turnos
// Pegar en: script.google.com → Nuevo proyecto
// Reemplazar SHEET_ID con el ID de tu Google Sheet
// Publicar como Web App: Ejecutar como "Yo", Acceso "Cualquiera"
// ============================================================

const SHEET_ID = 'REEMPLAZAR_CON_ID_DE_TU_SHEET';
const TIMEZONE = 'America/Argentina/Buenos_Aires';

// Horarios por dia de semana (1=Lunes ... 6=Sabado, 0=Domingo=cerrado)
const HORARIOS = {
  1: { inicio: '09:00', fin: '20:00' },
  2: { inicio: '09:00', fin: '20:00' },
  3: { inicio: '09:00', fin: '20:00' },
  4: { inicio: '09:00', fin: '20:00' },
  5: { inicio: '09:00', fin: '20:00' },
  6: { inicio: '09:00', fin: '17:00' },
};
const DURACION_MIN = 60; // duracion de cada turno en minutos

// ============================================================
// ENTRY POINT
// ============================================================
function doGet(e) {
  const action = e.parameter.action || '';
  let result;
  try {
    if      (action === 'getDays')  result = getDays(+e.parameter.year, +e.parameter.month);
    else if (action === 'getSlots') result = getSlots(e.parameter.date);
    else if (action === 'book')     result = bookSlot(e.parameter);
    else result = { error: 'Accion no valida' };
  } catch(err) {
    result = { error: err.message };
  }

  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

// ============================================================
// GET DAYS — devuelve disponibilidad del mes
// ============================================================
function getDays(year, month) {
  const ss       = SpreadsheetApp.openById(SHEET_ID);
  const shRes    = ss.getSheetByName('Reservas');
  const shBlk    = ss.getSheetByName('Bloqueos');
  const today    = new Date();
  today.setHours(0,0,0,0);

  // Fechas bloqueadas (feriados, vacaciones, etc)
  const bloqueadas = [];
  if (shBlk && shBlk.getLastRow() > 1) {
    shBlk.getRange(2, 1, shBlk.getLastRow()-1, 1).getValues()
      .forEach(r => { if(r[0]) bloqueadas.push(_fmt(new Date(r[0]))); });
  }

  // Contar reservas del mes
  const reservasMes = {};
  if (shRes && shRes.getLastRow() > 1) {
    const mesKey = `${year}-${String(month).padStart(2,'0')}`;
    shRes.getRange(2, 1, shRes.getLastRow()-1, 3).getValues().forEach(r => {
      if (r[1] && r[2]) {
        const f = _fmt(new Date(r[1]));
        if (f.startsWith(mesKey)) {
          reservasMes[f] = (reservasMes[f] || 0) + 1;
        }
      }
    });
  }

  // Construir array de dias
  const diasEnMes = new Date(year, month, 0).getDate();
  const days = [];

  for (let d = 1; d <= diasEnMes; d++) {
    const dt    = new Date(year, month-1, d);
    const str   = _fmt(dt);
    const dow   = dt.getDay();

    if (dt < today || !HORARIOS[dow] || bloqueadas.includes(str)) {
      days.push({ date: str, available: false, spots: 0 });
      continue;
    }

    const totalSlots = _calcSlots(HORARIOS[dow]);
    const ocupados   = reservasMes[str] || 0;
    const libres     = totalSlots - ocupados;
    days.push({ date: str, available: libres > 0, spots: libres > 0 ? libres : 0 });
  }

  return { days, year, month };
}

// ============================================================
// GET SLOTS — devuelve horarios libres de un dia
// ============================================================
function getSlots(dateStr) {
  const dt  = new Date(dateStr + 'T12:00:00');
  const dow = dt.getDay();
  if (!HORARIOS[dow]) return { slots: [], date: dateStr };

  const todos = _generateSlots(HORARIOS[dow]);

  // Obtener slots ocupados
  const ss    = SpreadsheetApp.openById(SHEET_ID);
  const shRes = ss.getSheetByName('Reservas');
  const ocupados = [];

  if (shRes && shRes.getLastRow() > 1) {
    shRes.getRange(2, 1, shRes.getLastRow()-1, 3).getValues().forEach(r => {
      if (r[1] && r[2]) {
        if (_fmt(new Date(r[1])) === dateStr) {
          ocupados.push(String(r[2]).substring(0,5));
        }
      }
    });
  }

  return { slots: todos.filter(s => !ocupados.includes(s)), date: dateStr };
}

// ============================================================
// BOOK SLOT — registra la reserva en la hoja
// ============================================================
function bookSlot(params) {
  const { date, time, name, phone, service } = params;

  // Verificar disponibilidad actual
  const disponibles = getSlots(date);
  if (!disponibles.slots.includes(time)) {
    return { success: false, error: 'El turno ya fue tomado. Por favor elegí otro horario.' };
  }

  const ss    = SpreadsheetApp.openById(SHEET_ID);
  const shRes = ss.getSheetByName('Reservas');
  const id    = 'T-' + Date.now();

  shRes.appendRow([
    id,
    date,
    time,
    name || '',
    phone || '',
    service || '',
    'Confirmada',
    new Date()
  ]);

  // Actualizar spots en hoja Disponibilidad (opcional, para dashboard)
  try { _updateDashboard(ss, date); } catch(e) {}

  return { success: true, id, date, time };
}

// ============================================================
// HELPERS
// ============================================================
function _fmt(dt) {
  return Utilities.formatDate(dt, TIMEZONE, 'yyyy-MM-dd');
}

function _calcSlots(h) {
  const [hi, mi] = h.inicio.split(':').map(Number);
  const [hf, mf] = h.fin.split(':').map(Number);
  return Math.floor(((hf*60+mf) - (hi*60+mi)) / DURACION_MIN);
}

function _generateSlots(h) {
  const [hi, mi] = h.inicio.split(':').map(Number);
  const [hf, mf] = h.fin.split(':').map(Number);
  const slots = [];
  let cur = hi*60 + mi;
  const end = hf*60 + mf;
  while (cur + DURACION_MIN <= end) {
    slots.push(`${String(Math.floor(cur/60)).padStart(2,'0')}:${String(cur%60).padStart(2,'0')}`);
    cur += DURACION_MIN;
  }
  return slots;
}

function _updateDashboard(ss, date) {
  let shDash = ss.getSheetByName('Dashboard');
  if (!shDash) return;
  // Buscar fila del dia y actualizar contador
  const data = shDash.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (_fmt(new Date(data[i][0])) === date) {
      shDash.getRange(i+1, 2).setValue((data[i][1]||0) + 1);
      return;
    }
  }
}
