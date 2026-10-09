export const refreshFrequency = 2000;



export const command = "/usr/sbin/ioreg -r -c AppleSmartBattery -w0";



// Energia nominal do pacote em Wh (MacBook Pro 16" = 100 Wh, especificação Apple).

// Ajuste se o seu modelo for outro. Só afeta a autonomia estimada própria.

const DESIGN_WH = 100;



// Janela da média de consumo: 15 amostras x 2 s = 30 s

const HISTORY_SIZE = 15;



// Diagnóstico de "piscada": se o fundo ainda piscar, troque para false.

// Sem o desfoque do vidro (backdrop-filter) o fundo deixa de ser recomposto a cada atualização.

const GLASS = false;



export const className = \`

  bottom: 25px;

  left: 25px;

  width: 340px;



  color: #1d1d1f;

  font-family: -apple-system, BlinkMacSystemFont, sans-serif;



  /* O vidro fica numa camada estática, separada do texto. O texto muda a cada

     2 s; se o desfoque ficasse no mesmo elemento, o WebKit o recomporia junto

     e o fundo alternaria entre "chapado" e "vidro". */

  .panel {

    position: relative;

    box-sizing: border-box;

    padding: 20px;

    border-radius: 26px;

  }



  .glass {

    position: absolute;

    top: 0;

    right: 0;

    bottom: 0;

    left: 0;

    overflow: hidden;

    box-sizing: border-box;

    border-radius: 26px;

    background: ${GLASS ? "rgba(245, 247, 252, 0.48)" : "rgba(238, 241, 250, 0.72)"};

    ${GLASS ? "-webkit-backdrop-filter: blur(35px) saturate(180%); backdrop-filter: blur(35px) saturate(180%);" : ""}

    border: 1px solid rgba(255, 255, 255, 0.65);

    box-shadow:

      0 12px 40px rgba(0, 0, 0, 0.14),

      0 2px 8px rgba(0, 0, 0, 0.06),

      inset 0 1px 0 rgba(255, 255, 255, 0.85),

      inset 0 -1px 0 rgba(255, 255, 255, 0.25);

    pointer-events: none;

  }



  .glass::before {

    content: "";

    position: absolute;

    top: 0;

    left: 12%;

    right: 12%;

    height: 1px;

    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.95), transparent);

  }



  .glass::after {

    content: "";

    position: absolute;

    top: -80px;

    right: -70px;

    width: 220px;

    height: 220px;

    border-radius: 50%;

    background: radial-gradient(circle, rgba(255,255,255,0.30), transparent 70%);

  }



  .content {

    position: relative;

    z-index: 1;

  }



  .header {

    display: flex;

    justify-content: space-between;

    align-items: center;

    gap: 8px;

    font-size: 10px;

    font-weight: 600;

    letter-spacing: 0.8px;

    color: rgba(40,40,45,0.65);

  }



  .status {

    display: flex;

    align-items: center;

    gap: 6px;

    padding: 6px 11px;

    border-radius: 20px;

    font-size: 10px;

    font-weight: 700;

    white-space: nowrap;

    border: 1px solid rgba(255,255,255,0.35);

  }



  .statusDot {

    width: 6px;

    height: 6px;

    border-radius: 50%;

    background: currentColor;

  }



  .power {

    font-size: 38px;

    font-weight: 650;

    letter-spacing: -1.5px;

    margin-top: 22px;

    font-variant-numeric: tabular-nums;

  }



  .subtitle {

    font-size: 11px;

    color: rgba(40,40,45,0.60);

    margin-top: 3px;

  }



  .barHead {

    display: flex;

    justify-content: space-between;

    font-size: 10px;

    color: rgba(40,40,45,0.60);

    margin-top: 20px;

    margin-bottom: 6px;

    font-variant-numeric: tabular-nums;

  }



  .bar {

    height: 8px;

    border-radius: 20px;

    background: rgba(120,120,128,0.15);

    margin-bottom: 24px;

    overflow: hidden;

    box-shadow: inset 0 1px 3px rgba(0,0,0,0.08);

  }



  .fill {

    height: 100%;

    border-radius: 20px;

    transition: width 0.6s ease;

    box-shadow:

      0 0 8px rgba(80,180,140,0.25),

      inset 0 1px 0 rgba(255,255,255,0.35);

  }



  .grid {

    display: grid;

    grid-template-columns: 1fr 1fr;

    gap: 18px 14px;

  }



  .metric { min-width: 0; }



  .label {

    font-size: 11px;

    color: rgba(40,40,45,0.60);

    margin-bottom: 6px;

  }



  .value {

    font-size: 17px;

    font-weight: 620;

    letter-spacing: -0.3px;

    font-variant-numeric: tabular-nums;

    overflow-wrap: anywhere;

  }



  .sub {

    font-size: 10px;

    color: rgba(40,40,45,0.55);

    margin-top: 3px;

    min-height: 12px;

    white-space: nowrap;

    overflow: hidden;

    text-overflow: ellipsis;

    font-variant-numeric: tabular-nums;

  }



  .footer {

    margin-top: 22px;

    padding-top: 14px;

    border-top: 1px solid rgba(120,120,128,0.18);

    display: flex;

    justify-content: space-between;

    align-items: center;

    font-size: 10px;

    color: rgba(40,40,45,0.55);

  }



  .live { display: flex; align-items: center; gap: 5px; }



  .liveDot {

    width: 5px;

    height: 5px;

    background: #34c759;

    border-radius: 50%;

    box-shadow: 0 0 6px rgba(52,199,89,0.45);

  }



  .error { color: #ff453a; font-size: 12px; }



  @media (prefers-color-scheme: dark) {

    .glass {

      background: ${GLASS ? "rgba(35, 37, 45, 0.55)" : "rgba(35, 37, 45, 0.80)"};

      border: 1px solid rgba(255,255,255,0.18);

      box-shadow:

        0 12px 40px rgba(0,0,0,0.30),

        inset 0 1px 0 rgba(255,255,255,0.15);

    }

    .header, .subtitle, .label, .footer, .barHead, .sub {

      color: rgba(255,255,255,0.65);

    }

    .power, .value { color: #ffffff; }

    .bar { background: rgba(255,255,255,0.12); }

  }

\`;



// PARSE-START

// ioreg entrega inteiros de 64 bits sem sinal. Valores negativos (ex.: BatteryPower

// descarregando) chegam como \~1.8e19, então convertemos com BigInt, sem passar por double.

const toSigned = (digits) => {

  try {

    let v = BigInt(digits);

    if (v >= (1n << 63n)) v -= (1n << 64n);

    return Number(v);

  } catch (e) {

    return null;

  }

};



const num = (data, key) => {

  const m = data.match(new RegExp('"' + key + '"\\\s*=\\\s*(-?\\\d+)'));

  return m ? toSigned(m[1]) : null;

};



const flag = (data, key) =>

  new RegExp('"' + key + '"\\\s*=\\\s*Yes').test(data);



const str = (data, key) => {

  const m = data.match(new RegExp('"' + key + '"\\\s*=\\\s*"([^"]*)"'));

  return m ? m[1] : null;

};



const scale = (v, d) => (v === null ? null : v / d);



const parse = (out) => {

  if (!/"CurrentCapacity"/.test(out)) return null;

  return {

    system: scale(num(out, "SystemLoad"), 1000),

    input: scale(num(out, "SystemPowerIn"), 1000),

    adapter: scale(num(out, "IPDInputPower"), 1000),

    battery: scale(num(out, "BatteryPower"), 1000),

    voltage: scale(num(out, "Voltage"), 1000),

    pct: num(out, "CurrentCapacity"),

    timeToEmpty: num(out, "AvgTimeToEmpty"),

    timeToFull: num(out, "AvgTimeToFull"),

    cycles: num(out, "CycleCount"),

    cycleLimit: num(out, "DesignCycleCount9C"),

    full: num(out, "FullChargeCapacity"),

    nominal: num(out, "NominalChargeCapacity"),

    design: num(out, "DesignCapacity"),

    charging: flag(out, "IsCharging"),

    connected: flag(out, "ExternalConnected"),

    fullyCharged: flag(out, "FullyCharged")

  };

};

// PARSE-END



export const initialState = { m: null, history: [], error: null };



export const updateState = (event, prev) => {

  // O Übersicht pode chamar sem estado anterior (ou com um estado sem "history"),

  // então normalizamos antes de usar.

  const base = prev && typeof prev === "object" ? prev : {};

  const prevHistory = Array.isArray(base.history) ? base.history : [];



  if (!event || typeof event.output !== "string") {

    return event && event.error

      ? { ...base, history: prevHistory, error: String(event.error) }

      : { ...base, history: prevHistory };

  }



  const m = parse(event.output);

  if (!m) return { ...base, history: prevHistory, error: "Leitura inválida" };



  const history =

    m.system === null

      ? prevHistory

      : [...prevHistory, m.system].slice(-HISTORY_SIZE);



  return { m, history, error: null };

};



const TONES = {

  ok: {

    color: "#168a50",

    bg: "rgba(52,199,89,0.15)",

    bar: "linear-gradient(90deg, #34c759, #30b88a)"

  },

  info: {

    color: "#1f5fae",

    bg: "rgba(10,132,255,0.15)",

    bar: "linear-gradient(90deg, #0a84ff, #5ac8fa)"

  },

  warn: {

    color: "#8a560a",

    bg: "rgba(255,159,10,0.18)",

    bar: "linear-gradient(90deg, #ff9f0a, #ffcc00)"

  },

  low: {

    color: "#b3261e",

    bg: "rgba(255,69,58,0.15)",

    bar: "linear-gradient(90deg, #ff453a, #ff6b5e)"

  }

};



const formatTime = (minutes) => {

  if (

    minutes === null ||

    !Number.isFinite(minutes) ||

    minutes <= 0 ||

    minutes >= 65535

  ) {

    return "--";

  }

  const total = Math.round(minutes);

  const hours = Math.floor(total / 60);

  const mins = total % 60;

  return \`${hours}h ${String(mins).padStart(2, "0")}min\`;

};



const watts = (v, decimals = 2) =>

  v === null || !Number.isFinite(v) ? "--" : v.toFixed(decimals) + " W";



const signedWatts = (v) =>

  v === null || !Number.isFinite(v)

    ? "--"

    : (v > 0.005 ? "+" : "") + v.toFixed(2) + " W";



export const render = (state) => {

  const { m, error } = state || {};

  const history = Array.isArray(state && state.history) ? state.history : [];



  if (!m) {

    return (

      <div className="panel">

        <div className="glass" />

        <div className="content">

          <div className="error">

            {error

              ? "Sem leitura dos sensores"

              : "Aguardando leitura dos sensores..."}

          </div>

        </div>

      </div>

    );

  }



  // Estado

  let tone;

  let statusText;

  if (m.charging) {

    tone = "ok";

    statusText = "Carregando";

  } else if (m.connected) {

    tone = m.fullyCharged ? "ok" : "info";

    statusText = m.fullyCharged ? "Carga completa" : "Carga pausada";

  } else {

    tone = m.pct !== null && m.pct <= 20 ? "low" : "warn";

    statusText = "Na bateria";

  }

  const t = TONES[tone];



  // Consumo médio (30 s)

  const avg = history.length

    ? history.reduce((a, b) => a + b, 0) / history.length

    : null;



  // Autonomia própria (estimativa): energia restante / consumo médio

  const wh =

    m.pct !== null && m.full && m.design

      ? DESIGN_WH * (m.pct / 100) * (m.full / m.design)

      : null;

  const ownMinutes =

    !m.connected && wh !== null && avg !== null && avg > 0.5

      ? (wh / avg) * 60

      : null;



  // Adaptador

  const usage =

    m.connected && m.adapter > 0 && m.input !== null

      ? ((m.input / m.adapter) * 100).toFixed(1) + "% em uso"

      : null;



  // Fluxo da bateria

  let flow = "em repouso";

  if (m.battery !== null) {

    if (m.battery > 0.05) flow = "entrando";

    else if (m.battery < -0.05) flow = "saindo";

  }



  // Saúde

  const health =

    m.nominal && m.design ? (m.nominal / m.design) * 100 : null;



  // Tile de tempo

  let timeLabel;

  let timeValue;

  let timeSub = null;

  if (!m.connected) {

    timeLabel = "Autonomia (macOS)";

    timeValue = formatTime(m.timeToEmpty);

    if (ownMinutes !== null) {

      timeSub = "própria: " + formatTime(ownMinutes);

    }

  } else if (m.charging) {

    timeLabel = "Carga completa em";

    timeValue = formatTime(m.timeToFull);

  } else {

    timeLabel = "Carga";

    timeValue = m.fullyCharged ? "Completa" : "Pausada";

  }



  const pct = m.pct === null ? 0 : Math.max(0, Math.min(100, m.pct));



  return (

    <div className="panel">

      <div className="glass" />

      <div className="content">

      <div className="header">

        <span>MAC POWER MONITOR</span>

        <span

          className="status"

          style={{ color: t.color, background: t.bg }}

        \>

          <span className="statusDot" />

          {statusText}

        </span>

      </div>



      <div className="power">{watts(m.system)}</div>

      <div className="subtitle">Consumo atual do Mac</div>



      <div className="barHead">

        <span>Bateria</span>

        <span>{m.pct === null ? "--" : m.pct + "%"}</span>

      </div>

      <div className="bar">

        <div

          className="fill"

          style={{ width: pct + "%", background: t.bar }}

        />

      </div>



      <div className="grid">

        <div className="metric">

          <div className="label">Potência recebida</div>

          <div className="value">{watts(m.input)}</div>

        </div>



        <div className="metric">

          <div className="label">Adaptador</div>

          <div className="value">

            {m.connected && m.adapter > 0

              ? Math.round(m.adapter) + " W"

              : "--"}

          </div>

          <div className="sub">{usage || " "}</div>

        </div>



        <div className="metric">

          <div className="label">Fluxo da bateria</div>

          <div className="value">{signedWatts(m.battery)}</div>

          <div className="sub">{flow}</div>

        </div>



        <div className="metric">

          <div className="label">Consumo médio (30 s)</div>

          <div className="value">{watts(avg)}</div>

        </div>



        <div className="metric">

          <div className="label">{timeLabel}</div>

          <div className="value">{timeValue}</div>

          <div className="sub">{timeSub || " "}</div>

        </div>



        <div className="metric">

          <div className="label">Tensão</div>

          <div className="value">

            {m.voltage === null ? "--" : m.voltage.toFixed(2) + " V"}

          </div>

        </div>



        <div className="metric">

          <div className="label">Saúde</div>

          <div className="value">

            {health === null ? "--" : health.toFixed(1) + "%"}

          </div>

          {m.nominal && m.design && (

            <div className="sub">

              {m.nominal} / {m.design} mAh

            </div>

          )}

        </div>



        <div className="metric">

          <div className="label">Ciclos</div>

          <div className="value">

            {m.cycles === null ? "--" : m.cycles}

          </div>

          {m.cycleLimit && (

            <div className="sub">de {m.cycleLimit} previstos</div>

          )}

        </div>

      </div>



      <div className="footer">

        <span>Atualização: 2 s</span>

        <span className="live">

          <span className="liveDot" />

          LIVE

        </span>

      </div>

      </div>

    </div>

  );

};