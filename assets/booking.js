/* =====================================================
   MOVILTEC DIGITAL — Booking Widget v1.0
   Uso: new MoviltecBooking({ containerId, apiUrl, ... })
   ===================================================== */
(function(){

/* ---- CSS ---- */
const CSS = `
.mbw{font-family:'Inter',sans-serif;background:var(--mbw-card,#16161F);border:1px solid var(--mbw-border,#22222E);border-radius:20px;overflow:hidden;max-width:480px;margin:0 auto}
.mbw *{box-sizing:border-box}
.mbw-step{display:none;flex-direction:column;animation:mbw-in .25s ease}
.mbw-step.active{display:flex}
@keyframes mbw-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}

/* Header */
.mbw-cal-header{display:flex;align-items:center;justify-content:space-between;padding:20px 20px 14px;border-bottom:1px solid var(--mbw-border,#22222E)}
.mbw-nav-btn{background:var(--mbw-surface,#0F0F1A);border:1px solid var(--mbw-border,#22222E);color:#fff;width:34px;height:34px;border-radius:50%;cursor:pointer;font-size:1.1rem;display:flex;align-items:center;justify-content:center;transition:all .2s;flex-shrink:0}
.mbw-nav-btn:hover{border-color:var(--mbw-primary,#0EA5E9);color:var(--mbw-primary,#0EA5E9)}
.mbw-month-lbl{font-size:.95rem;font-weight:800;letter-spacing:-.3px;text-align:center;color:#fff}
.mbw-month-sub{font-size:.72rem;color:var(--mbw-gray,#94A3B8);margin-top:2px;text-align:center}

/* Calendar grid */
.mbw-weekdays{display:grid;grid-template-columns:repeat(7,1fr);padding:12px 16px 6px;gap:4px}
.mbw-weekday{text-align:center;font-size:.68rem;font-weight:700;color:var(--mbw-gray,#94A3B8);text-transform:uppercase;letter-spacing:.5px}
.mbw-days{display:grid;grid-template-columns:repeat(7,1fr);padding:0 16px 16px;gap:4px}
.mbw-day{aspect-ratio:1;display:flex;flex-direction:column;align-items:center;justify-content:center;border-radius:10px;font-size:.85rem;font-weight:600;cursor:default;transition:all .15s;position:relative;border:1.5px solid transparent}
.mbw-day.empty{background:none;border-color:transparent}
.mbw-day.past,.mbw-day.closed{color:rgba(255,255,255,.2);background:none}
.mbw-day.available{background:rgba(14,165,233,.12);border-color:rgba(14,165,233,.25);color:#fff;cursor:pointer}
.mbw-day.available:hover{background:rgba(14,165,233,.25);border-color:var(--mbw-primary,#0EA5E9);transform:scale(1.05)}
.mbw-day.available.today{border-color:var(--mbw-primary,#0EA5E9);background:rgba(14,165,233,.2)}
.mbw-day.today.past{border-color:rgba(255,255,255,.15)}
.mbw-day-num{font-size:.82rem;font-weight:700;line-height:1}
.mbw-day-spots{font-size:.56rem;color:var(--mbw-primary,#0EA5E9);margin-top:2px;font-weight:600}
.mbw-loading{text-align:center;padding:24px;color:var(--mbw-gray,#94A3B8);font-size:.84rem}
.mbw-spinner{width:22px;height:22px;border:2.5px solid rgba(14,165,233,.2);border-top-color:var(--mbw-primary,#0EA5E9);border-radius:50%;animation:mbw-spin .7s linear infinite;margin:0 auto 10px}
@keyframes mbw-spin{to{transform:rotate(360deg)}}

/* Slots */
.mbw-slot-hdr{display:flex;align-items:center;gap:10px;padding:16px 20px 14px;border-bottom:1px solid var(--mbw-border,#22222E)}
.mbw-back-btn{background:var(--mbw-surface,#0F0F1A);border:1px solid var(--mbw-border,#22222E);color:var(--mbw-gray,#94A3B8);padding:7px 14px;border-radius:50px;font-size:.78rem;font-weight:600;cursor:pointer;transition:all .2s;display:flex;align-items:center;gap:5px;white-space:nowrap}
.mbw-back-btn:hover{border-color:var(--mbw-primary,#0EA5E9);color:#fff}
.mbw-slot-date{font-size:.92rem;font-weight:800;color:#fff;letter-spacing:-.3px;text-align:center;flex:1}
.mbw-slots-body{padding:16px 20px}
.mbw-slots-title{font-size:.75rem;font-weight:700;color:var(--mbw-gray,#94A3B8);text-transform:uppercase;letter-spacing:.5px;margin-bottom:12px}
.mbw-slots-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:9px;margin-bottom:14px}
.mbw-slot{background:var(--mbw-surface,#0F0F1A);border:1.5px solid var(--mbw-border,#22222E);color:#fff;padding:11px 8px;border-radius:12px;font-size:.85rem;font-weight:700;cursor:pointer;text-align:center;transition:all .2s;font-family:'Inter',sans-serif}
.mbw-slot:hover{background:rgba(14,165,233,.15);border-color:var(--mbw-primary,#0EA5E9);color:var(--mbw-primary,#0EA5E9)}
.mbw-slot.selected{background:linear-gradient(135deg,var(--mbw-primary,#0EA5E9),var(--mbw-accent,#10B981));border-color:transparent;color:#fff}
.mbw-no-slots{text-align:center;padding:20px;color:var(--mbw-gray,#94A3B8);font-size:.85rem;line-height:1.6}
.mbw-back-cal{width:100%;margin-top:8px;background:none;border:1px solid var(--mbw-border,#22222E);color:var(--mbw-gray,#94A3B8);padding:10px;border-radius:10px;font-size:.82rem;font-weight:600;cursor:pointer;font-family:'Inter',sans-serif;transition:all .2s}
.mbw-back-cal:hover{border-color:var(--mbw-primary,#0EA5E9);color:#fff}
.mbw-slot-continue{width:100%;background:linear-gradient(135deg,var(--mbw-primary,#0EA5E9),var(--mbw-accent,#10B981));color:#fff;border:none;padding:13px;border-radius:12px;font-size:.9rem;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif;margin-top:4px;transition:opacity .2s;display:none}
.mbw-slot-continue.show{display:block}
.mbw-slot-continue:hover{opacity:.9}

/* Form */
.mbw-form-hdr{padding:16px 20px 14px;border-bottom:1px solid var(--mbw-border,#22222E)}
.mbw-form-summary{background:linear-gradient(135deg,rgba(14,165,233,.12),rgba(16,185,129,.08));border:1px solid rgba(14,165,233,.25);border-radius:12px;padding:12px 16px;margin:0 20px 16px;display:flex;align-items:center;gap:10px}
.mbw-form-summary-ico{font-size:1.5rem;flex-shrink:0}
.mbw-form-summary-txt{font-size:.84rem;font-weight:700;color:#fff;line-height:1.4}
.mbw-form-summary-sub{font-size:.72rem;color:var(--mbw-primary,#0EA5E9);margin-top:2px}
.mbw-form-body{padding:0 20px 20px;display:flex;flex-direction:column;gap:12px}
.mbw-field label{display:block;font-size:.74rem;font-weight:600;color:rgba(255,255,255,.65);margin-bottom:5px;letter-spacing:.2px}
.mbw-field input,.mbw-field select{width:100%;padding:11px 14px;background:var(--mbw-surface,#0F0F1A);border:1.5px solid var(--mbw-border,#22222E);border-radius:10px;font-size:.88rem;font-family:'Inter',sans-serif;color:#fff;outline:none;transition:border-color .2s;-webkit-appearance:none}
.mbw-field input::placeholder{color:rgba(148,163,184,.5)}
.mbw-field select option{background:var(--mbw-surface,#0F0F1A)}
.mbw-field input:focus,.mbw-field select:focus{border-color:var(--mbw-primary,#0EA5E9)}
.mbw-btn-confirm{width:100%;background:linear-gradient(135deg,var(--mbw-primary,#0EA5E9),var(--mbw-accent,#10B981));color:#fff;border:none;padding:14px;border-radius:12px;font-size:.95rem;font-weight:800;cursor:pointer;font-family:'Inter',sans-serif;margin-top:4px;transition:opacity .2s,transform .2s;display:flex;align-items:center;justify-content:center;gap:8px}
.mbw-btn-confirm:hover{opacity:.92;transform:translateY(-1px)}

/* Confirmation */
.mbw-confirm-body{padding:32px 24px;text-align:center;display:flex;flex-direction:column;align-items:center}
.mbw-confirm-ico{width:64px;height:64px;background:linear-gradient(135deg,var(--mbw-primary,#0EA5E9),var(--mbw-accent,#10B981));border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.8rem;margin-bottom:16px;box-shadow:0 8px 24px rgba(14,165,233,.3)}
.mbw-confirm-title{font-size:1.2rem;font-weight:900;color:#fff;margin-bottom:6px;letter-spacing:-.5px}
.mbw-confirm-sub{font-size:.84rem;color:var(--mbw-gray,#94A3B8);line-height:1.6;margin-bottom:20px}
.mbw-confirm-card{background:var(--mbw-surface,#0F0F1A);border:1px solid var(--mbw-border,#22222E);border-radius:14px;padding:16px 20px;width:100%;text-align:left;margin-bottom:20px}
.mbw-confirm-row{display:flex;justify-content:space-between;align-items:center;padding:7px 0;border-bottom:1px solid var(--mbw-border,#22222E);font-size:.82rem}
.mbw-confirm-row:last-child{border-bottom:none}
.mbw-confirm-lbl{color:var(--mbw-gray,#94A3B8)}
.mbw-confirm-val{font-weight:700;color:#fff}
.mbw-btn-wa{width:100%;background:linear-gradient(135deg,#25D366,#1aad54);color:#fff;border:none;padding:14px;border-radius:12px;font-size:.95rem;font-weight:800;cursor:pointer;font-family:'Inter',sans-serif;display:flex;align-items:center;justify-content:center;gap:8px;transition:opacity .2s;margin-bottom:10px}
.mbw-btn-wa:hover{opacity:.9}
.mbw-btn-new{width:100%;background:none;border:1px solid var(--mbw-border,#22222E);color:var(--mbw-gray,#94A3B8);padding:11px;border-radius:12px;font-size:.82rem;font-weight:600;cursor:pointer;font-family:'Inter',sans-serif;transition:all .2s}
.mbw-btn-new:hover{border-color:var(--mbw-primary,#0EA5E9);color:#fff}
.mbw-error{color:#f87171;font-size:.78rem;text-align:center;padding:8px 0}
`;

/* ---- Months & Days ---- */
const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const DIAS_CORTO = ['Do','Lu','Ma','Mi','Ju','Vi','Sa'];
const DIAS_LONG  = ['domingo','lunes','martes','miércoles','jueves','viernes','sábado'];

/* ============================================================
   CLASS
   ============================================================ */
window.MoviltecBooking = class {
  constructor(opts){
    this.containerId = opts.containerId || 'mbw';
    this.apiUrl      = opts.apiUrl  || null;
    this.waNumber    = opts.waNumber || '5492644114128';
    this.servicios   = opts.servicios || ['Consultar disponibilidad'];
    this.primaryColor= opts.primaryColor || '#0EA5E9';
    this.accentColor = opts.accentColor  || '#10B981';

    // State
    this.view = new Date(); this.view.setDate(1);
    this.selDate = null;
    this.selSlot = null;
    this.availMap= {};   // { 'YYYY-MM-DD': { available: bool, spots: n } }
    this.slotsCache = {};// { 'YYYY-MM-DD': ['09:00',...] }
    this.booking = {};

    this._injectCSS();
    this._render();
    this._loadMonth(this.view.getFullYear(), this.view.getMonth()+1);
  }

  /* ---------- CSS ---------- */
  _injectCSS(){
    if(document.getElementById('mbw-css')) return;
    const s = document.createElement('style');
    s.id='mbw-css';
    s.textContent = CSS
      .replace(/var\(--mbw-primary,[^)]+\)/g, this.primaryColor)
      .replace(/var\(--mbw-accent,[^)]+\)/g,  this.accentColor);
    document.head.appendChild(s);
  }

  /* ---------- Render ---------- */
  _render(){
    const c = document.getElementById(this.containerId);
    if(!c) return;
    c.innerHTML = `
    <div class="mbw" id="${this.containerId}-inner">

      <!-- STEP 1: CALENDAR -->
      <div class="mbw-step active" id="${this.containerId}-s1">
        <div class="mbw-cal-header">
          <button class="mbw-nav-btn" id="${this.containerId}-prev">&#8249;</button>
          <div>
            <div class="mbw-month-lbl" id="${this.containerId}-mlbl"></div>
            <div class="mbw-month-sub">Seleccion&aacute; un d&iacute;a disponible</div>
          </div>
          <button class="mbw-nav-btn" id="${this.containerId}-next">&#8250;</button>
        </div>
        <div class="mbw-weekdays">
          ${DIAS_CORTO.map(d=>`<div class="mbw-weekday">${d}</div>`).join('')}
        </div>
        <div id="${this.containerId}-days"></div>
        <div class="mbw-loading" id="${this.containerId}-load" style="display:none">
          <div class="mbw-spinner"></div>Cargando disponibilidad...
        </div>
      </div>

      <!-- STEP 2: SLOTS -->
      <div class="mbw-step" id="${this.containerId}-s2">
        <div class="mbw-slot-hdr">
          <button class="mbw-back-btn" id="${this.containerId}-back1">&#8592; Calendario</button>
          <div class="mbw-slot-date" id="${this.containerId}-sdate"></div>
        </div>
        <div class="mbw-slots-body">
          <div class="mbw-slots-title">Horarios disponibles</div>
          <div class="mbw-slots-grid" id="${this.containerId}-sgrid"></div>
          <button class="mbw-slot-continue" id="${this.containerId}-scont">Continuar con este horario &#8594;</button>
          <button class="mbw-back-cal" id="${this.containerId}-back1b">&#8592; Volver al calendario</button>
        </div>
      </div>

      <!-- STEP 3: FORM -->
      <div class="mbw-step" id="${this.containerId}-s3">
        <div class="mbw-form-hdr">
          <button class="mbw-back-btn" id="${this.containerId}-back2">&#8592; Cambiar horario</button>
        </div>
        <div class="mbw-form-summary">
          <div class="mbw-form-summary-ico">&#128197;</div>
          <div>
            <div class="mbw-form-summary-txt" id="${this.containerId}-fsummary">—</div>
            <div class="mbw-form-summary-sub">Complet&aacute; tus datos para confirmar</div>
          </div>
        </div>
        <div class="mbw-form-body">
          <div class="mbw-field"><label>Tu nombre *</label><input id="${this.containerId}-fname" placeholder="Nombre y apellido" required/></div>
          <div class="mbw-field"><label>Tu WhatsApp *</label><input id="${this.containerId}-fphone" type="tel" placeholder="Ej: 1154321234" required/></div>
          <div class="mbw-field"><label>Servicio</label>
            <select id="${this.containerId}-fservice">
              ${this.servicios.map(s=>`<option>${s}</option>`).join('')}
            </select>
          </div>
          <div class="mbw-error" id="${this.containerId}-ferr" style="display:none"></div>
          <button class="mbw-btn-confirm" id="${this.containerId}-fsubmit">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
            Confirmar turno
          </button>
        </div>
      </div>

      <!-- STEP 4: CONFIRMACIÓN -->
      <div class="mbw-step" id="${this.containerId}-s4">
        <div class="mbw-confirm-body">
          <div class="mbw-confirm-ico">&#10003;</div>
          <div class="mbw-confirm-title">&#161;Turno reservado!</div>
          <div class="mbw-confirm-sub">Te esperamos. Confirm&aacute; por WhatsApp para asegurarlo.</div>
          <div class="mbw-confirm-card" id="${this.containerId}-ccard"></div>
          <button class="mbw-btn-wa" id="${this.containerId}-cwa">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.121 1.532 5.847L0 24l6.336-1.506A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.96 0-3.793-.502-5.39-1.38l-.386-.23-3.985.947.982-3.884-.253-.4A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
            Confirmar por WhatsApp
          </button>
          <button class="mbw-btn-new" id="${this.containerId}-cnew">Reservar otro turno</button>
        </div>
      </div>

    </div>`;

    this._bind();
  }

  /* ---------- Events ---------- */
  _bind(){
    const id = this.containerId;
    this._el('prev').onclick   = ()=>this._changeMonth(-1);
    this._el('next').onclick   = ()=>this._changeMonth(1);
    this._el('back1').onclick  = ()=>this._goTo(1);
    this._el('back1b').onclick = ()=>this._goTo(1);
    this._el('back2').onclick  = ()=>this._goTo(2);
    this._el('scont').onclick  = ()=>{ if(this.selSlot) this._goTo(3); };
    this._el('fsubmit').onclick= (e)=>{ e.preventDefault(); this._submitBooking(); };
    this._el('cnew').onclick   = ()=>this._reset();
  }

  _el(suffix){ return document.getElementById(`${this.containerId}-${suffix}`); }

  /* ---------- Navigation ---------- */
  _goTo(step){
    [1,2,3,4].forEach(n=>{
      const el = document.getElementById(`${this.containerId}-s${n}`);
      if(el){ el.classList.remove('active'); }
    });
    const target = document.getElementById(`${this.containerId}-s${step}`);
    if(target) target.classList.add('active');

    if(step===2 && this.selDate) this._renderSlots();
    if(step===3) this._renderFormSummary();
  }

  /* ---------- Calendar ---------- */
  _changeMonth(delta){
    this.view.setMonth(this.view.getMonth() + delta);
    this._loadMonth(this.view.getFullYear(), this.view.getMonth()+1);
  }

  async _loadMonth(year, month){
    this._el('mlbl').textContent = `${MESES[month-1]} ${year}`;
    this._showLoading(true);

    if(this.apiUrl){
      try{
        const res = await fetch(`${this.apiUrl}?action=getDays&year=${year}&month=${month}`);
        const data = await res.json();
        this.availMap = {};
        (data.days||[]).forEach(d=>{ this.availMap[d.date] = {available:d.available, spots:d.spots||0}; });
      }catch(e){
        this._demoMonth(year, month);
      }
    } else {
      this._demoMonth(year, month);
    }

    this._showLoading(false);
    this._renderCalendar(year, month);
  }

  _demoMonth(year, month){
    const today = new Date(); today.setHours(0,0,0,0);
    const days  = new Date(year, month, 0).getDate();
    for(let d=1; d<=days; d++){
      const dt = new Date(year, month-1, d);
      const str= this._fmt(dt);
      const dow= dt.getDay();
      const isPast = dt < today;
      const isSun  = dow === 0;
      const isOpen = !isPast && !isSun;
      // Demo: simulate some slots taken on random days
      const spots = isOpen ? (Math.random()>0.25 ? Math.floor(Math.random()*6)+1 : 0) : 0;
      this.availMap[str] = { available: isOpen && spots>0, spots };
    }
  }

  _renderCalendar(year, month){
    const today = new Date(); today.setHours(0,0,0,0);
    const firstDow = new Date(year, month-1, 1).getDay();
    const days     = new Date(year, month, 0).getDate();
    // Start on Monday: offset
    const offset = (firstDow === 0) ? 6 : firstDow - 1;

    let html = '<div class="mbw-days">';
    for(let i=0; i<offset; i++) html += '<div class="mbw-day empty"></div>';

    for(let d=1; d<=days; d++){
      const dt  = new Date(year, month-1, d);
      const str = this._fmt(dt);
      const isToday = dt.getTime() === today.getTime();
      const info = this.availMap[str] || {available:false, spots:0};
      let cls = 'mbw-day';
      if(info.available) cls += ' available';
      else if(dt < today) cls += ' past';
      else cls += ' closed';
      if(isToday) cls += ' today';

      const spotsHtml = info.available ? `<span class="mbw-day-spots">${info.spots} libre${info.spots!==1?'s':''}</span>` : '';
      const clickAttr = info.available ? `onclick="document.getElementById('${this.containerId}-inner').__mbw.selectDay('${str}')"` : '';
      html += `<div class="${cls}" ${clickAttr}><span class="mbw-day-num">${d}</span>${spotsHtml}</div>`;
    }
    html += '</div>';
    this._el('days').innerHTML = html;
    // Attach instance reference for inline onclick
    document.getElementById(`${this.containerId}-inner`).__mbw = this;
  }

  selectDay(dateStr){
    this.selDate = dateStr;
    this.selSlot = null;
    this._goTo(2);
  }

  /* ---------- Slots ---------- */
  async _renderSlots(){
    const dt  = new Date(this.selDate + 'T12:00:00');
    const lbl = `${this._capitalize(DIAS_LONG[dt.getDay()])} ${dt.getDate()} de ${MESES[dt.getMonth()].toLowerCase()}`;
    this._el('sdate').textContent = lbl;
    this._el('sgrid').innerHTML = '<div class="mbw-loading"><div class="mbw-spinner"></div>Cargando horarios...</div>';
    this._el('scont').classList.remove('show');

    let slots = [];
    if(this.slotsCache[this.selDate]){
      slots = this.slotsCache[this.selDate];
    } else if(this.apiUrl){
      try{
        const res  = await fetch(`${this.apiUrl}?action=getSlots&date=${this.selDate}`);
        const data = await res.json();
        slots = data.slots || [];
        this.slotsCache[this.selDate] = slots;
      }catch(e){
        slots = this._demoSlots(dt.getDay());
      }
    } else {
      slots = this._demoSlots(dt.getDay());
      this.slotsCache[this.selDate] = slots;
    }

    if(!slots.length){
      this._el('sgrid').innerHTML = `<div class="mbw-no-slots" style="grid-column:1/-1">No quedan horarios para este d&iacute;a.<br>Prob&aacute; con otro d&iacute;a disponible.</div>`;
      return;
    }

    this._el('sgrid').innerHTML = slots.map(s=>`
      <button class="mbw-slot${s===this.selSlot?' selected':''}"
        onclick="document.getElementById('${this.containerId}-inner').__mbw.selectSlot('${s}')">${s}</button>
    `).join('');
  }

  selectSlot(slot){
    this.selSlot = slot;
    document.querySelectorAll(`#${this.containerId}-sgrid .mbw-slot`).forEach(btn=>{
      btn.classList.toggle('selected', btn.textContent.trim()===slot);
    });
    this._el('scont').classList.add('show');
  }

  _demoSlots(dow){
    if(dow===0) return [];
    const base = ['09:00','10:00','11:00','12:00','14:00','15:00','16:00','17:00','18:00','19:00'];
    const sat  = ['09:00','10:00','11:00','12:00','14:00','15:00','16:00'];
    const pool = dow===6 ? sat : base;
    // Remove some randomly for demo realism
    return pool.filter(()=>Math.random()>0.25);
  }

  /* ---------- Form ---------- */
  _renderFormSummary(){
    const dt  = new Date(this.selDate + 'T12:00:00');
    const lbl = `${this._capitalize(DIAS_LONG[dt.getDay()])} ${dt.getDate()} de ${MESES[dt.getMonth()].toLowerCase()} — ${this.selSlot}`;
    this._el('fsummary').textContent = lbl;
    this._el('ferr').style.display='none';
  }

  async _submitBooking(){
    const nombre  = this._el('fname').value.trim();
    const phone   = this._el('fphone').value.trim();
    const service = this._el('fservice').value;
    const errEl   = this._el('ferr');

    if(!nombre || !phone){ errEl.textContent='Complet&aacute; nombre y WhatsApp.'; errEl.style.display='block'; return; }

    this.booking = { date: this.selDate, time: this.selSlot, name: nombre, phone, service };

    // Save to Google Sheets via API
    if(this.apiUrl){
      try{
        const url = `${this.apiUrl}?action=book&date=${encodeURIComponent(this.selDate)}&time=${encodeURIComponent(this.selSlot)}&name=${encodeURIComponent(nombre)}&phone=${encodeURIComponent(phone)}&service=${encodeURIComponent(service)}`;
        const res  = await fetch(url);
        const data = await res.json();
        if(!data.success){ errEl.textContent = data.error||'Error al reservar. Intent&aacute; de nuevo.'; errEl.style.display='block'; return; }
        // Mark slot as taken in cache
        if(this.slotsCache[this.selDate]){
          this.slotsCache[this.selDate] = this.slotsCache[this.selDate].filter(s=>s!==this.selSlot);
        }
      }catch(e){
        // Si falla la API, igual mostramos confirmación (WA lo asegura)
      }
    }

    this._goTo(4);
    this._renderConfirmation();
  }

  _renderConfirmation(){
    const dt   = new Date(this.booking.date + 'T12:00:00');
    const fecha= `${this._capitalize(DIAS_LONG[dt.getDay()])} ${dt.getDate()} de ${MESES[dt.getMonth()]}`;
    const rows = [
      ['Fecha', fecha],
      ['Horario', this.booking.time],
      ['Servicio', this.booking.service],
      ['Nombre', this.booking.name],
      ['WhatsApp', this.booking.phone],
    ];
    this._el('ccard').innerHTML = rows.map(([l,v])=>`
      <div class="mbw-confirm-row">
        <span class="mbw-confirm-lbl">${l}</span>
        <span class="mbw-confirm-val">${v}</span>
      </div>`).join('');

    const msg = `\u{1F4C5} *Confirmo mi turno*\n\n\u{1F4CD} Fecha: ${fecha}\n\u23F0 Horario: ${this.booking.time}\n\u2728 Servicio: ${this.booking.service}\n\u{1F464} Nombre: ${this.booking.name}\n\n\u00A1Espero confirmaci\u00F3n!`;
    this._el('cwa').onclick = ()=> window.open(`https://wa.me/${this.waNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  }

  /* ---------- Helpers ---------- */
  _reset(){
    this.selDate=null; this.selSlot=null; this.booking={};
    this._el('fname').value='';
    this._el('fphone').value='';
    this._goTo(1);
    // Reload month to get fresh data
    this._loadMonth(this.view.getFullYear(), this.view.getMonth()+1);
  }
  _showLoading(v){
    const el = this._el('load');
    if(el) el.style.display = v ? 'block':'none';
    const daysEl = this._el('days');
    if(daysEl) daysEl.style.opacity = v ? '0.3':'1';
  }
  _fmt(dt){ return `${dt.getFullYear()}-${String(dt.getMonth()+1).padStart(2,'0')}-${String(dt.getDate()).padStart(2,'0')}`; }
  _capitalize(s){ return s.charAt(0).toUpperCase()+s.slice(1); }
};

})();
