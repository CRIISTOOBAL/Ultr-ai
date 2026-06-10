import { useState, useRef, useEffect } from "react";

const BRAND = {
  navy:"#3AAEDC", navyLight:"#2B9DC8", red:"#C8102E", redHover:"#A50D25",
  white:"#FFFFFF", gray100:"#EFF6FA", gray300:"#CBD2DC", gray500:"#7A8799", gray700:"#3E4A5A",
};

const PROC_COLOR = { "ANG-P-105":"#1A6FB0", "ANG-P-146":"#8B6914", "ANG-P-250":"#8B1A1A" };
const PROC_LABEL = {
  "ANG-P-105":"Embarque y Descarga de Contenedores",
  "ANG-P-146":"Carga General / Heavy Lift",
  "ANG-P-250":"Embarque de Chatarra"
};
const PROC_EMOJI = { "ANG-P-105":"📦", "ANG-P-146":"🏗️", "ANG-P-250":"🔩" };

// ── MENÚ DE ACTIVIDADES ───────────────────────────────────────────────────────
const MENU_ACTIVIDADES = [
  { proc:"ANG-P-105", items:[
    "Inicio de operación (DDS / ART)",
    "Ingreso al buque / portalón",
    "Uso de canastillo",
    "Tránsito en cubierta y paillos",
    "Movimiento de pontones",
    "Destrinca y trinca de contenedores",
    "Apertura y cierre de twistlock / piñas",
    "Check list grúa tierra y spreader",
    "Inspección interior de nave",
    "Descarga de contenedores",
    "Retiro de twistlock en estación",
    "Carga / embarque de contenedores",
    "EPP obligatorio",
    "Teléfonos de emergencia",
    "Definiciones / Glosario",
  ]},
  { proc:"ANG-P-146", items:[
    "Inicio operación Heavy Lift (DDS / ART)",
    "Ingreso al buque / tránsito en nave",
    "Preparación muelle (Carga General / Heavy Lift)",
    "Posicionamiento camión porteador",
    "Destrinca y trinca (Carga General)",
    "Enganche / Desenganche Heavy Lift",
    "Utilería (Heavy Lift)",
    "Transferencia y descarga en cubierta",
    "Tándem (Heavy Lift)",
    "EPP obligatorio",
  ]},
  { proc:"ANG-P-250", items:[
    "Inicio operación chatarra (DDS / ART)",
    "Posicionamiento equipos en muelle",
    "Posicionamiento pasarelas / Safety Zone",
    "Posicionamiento argollas y ganchos",
    "Transferencia hacia bodega de la nave",
    "Volteo de batea en bodega",
    "Posicionamiento batea vacía y desenganche",
    "Posicionamiento batea vacía sobre tracto camión",
    "EPP obligatorio",
  ]},
];

// ── BASE DOCUMENTAL ───────────────────────────────────────────────────────────
const KNOWLEDGE_BASE = `
=== ANG-P-105: EMBARQUE Y DESCARGA DE CONTENEDORES ===

[7.1 — Inicio de Operación: DDS y ART]
Antes de comenzar la faena:
1. Ejecutar el Diálogo Diario de Seguridad (DDS) — a cargo del Coordinador de Operaciones Marítimas
2. Todos los trabajadores firman el registro DDS, confirmando condiciones físicas y psicológicas aptas
3. Realizar el Análisis de Riesgo de la Tarea (ART) — formulario F-SIG-051
4. Verificar check-list de equipos
5. Asegurar que el área de trabajo esté ordenada y limpia
Responsable: Coordinador de Operaciones Marítimas o Encargado de Nave/Tierra.

[7.2/7.3 — Ingreso al Buque y Tránsito por Portalón]
El ingreso puede ser por: Portalón, Jaula o Escalera real con red protectora.
- Inspeccionar la estructura antes de usarla
- Mantener mínimo 3 puntos de apoyo
- El portalón debe tener al menos 5 metros entre su base y el borde del muelle
- Personal externo requiere autorización del Coordinador de Operaciones Marítimas
- Usar arnés con doble cabo en escaleras verticales a bodega
Prohibido: saltar desde escala o desde la banda de la nave al muelle.

[7.4 — Uso de Canastillo]
- Mantener el canastillo limpio y libre de obstáculos
- Respetar los límites de peso y cantidad de personas
- Inspeccionar estructura, grilletes y cables antes de cada uso
- Arnés obligatorio — enganchar cola de seguridad a la baranda interior
- Cola de vida no debe quedar colgando
- El operador de la grúa solo levanta con la señal del supervisor
- Prohibido saltar o trepar fuera del canastillo

[7.5 — Tránsito en Cubierta y Paillos]
- Transitar por vías despejadas y segregadas
- Mantener área ordenada y limpia
- Comunicación permanente vía radio
- Usar apoya manos — mínimo 3 puntos de apoyo
- Uso de EPP básico y arnés de seguridad
- Prohibido usar el celular en zonas operativas
- Mantener escotillas cerradas

[7.6 — Movimiento de Pontones]
- Transitar por vías despejadas y segregadas
- Comunicación permanente vía radio
- Uso de EPP básico y arnés de seguridad
- Al conectar/desconectar pontones: no exponerse bajo la carga suspendida
- Avisar a todo el personal cercano antes de iniciar el movimiento
- Se permite apilar hasta 3 tapas de alto

[7.7 — Destrinca y Trinca de Contenedores en Nave]
Regla fundamental: mantener al menos 3 ROW de distancia de la posición de trabajo de la grúa.
1. Inspeccionar la nave previamente
2. Verificar que todas las escotillas estén cerradas antes de iniciar
3. Trabajar siempre en dupla (2 personas)
4. Un movilizador sostiene la varilla mientras el otro trinca/destrinca
5. Una vez separada la varilla: el compañero se aleja al menos 2 filas
6. Usar guantes anti-golpe en todo momento
7. Prohibido lanzar varillas o tensores

[7.8 — Apertura y Cierre de Twistlock / Piñas]
Preferencia: abrir desde la cubierta para evitar exponer trabajadores sobre el top de la estiba.
Si se debe abrir desde el top:
1. Trasladar trabajadores en canastillo hasta el centro de la estiba
2. Conectar arnés al sistema bastón
3. Avanzar desde el centro al extremo — bastón a mínimo 1 metro del borde
4. Proceder a apertura de twistlocks desde el borde
Twistlock trabado: usar martillo pico pato.
Prohibido: destrabar una piña con otra piña.

[7.9/7.10 — Check List Grúa Tierra y Protocolo de Entrega de Spreader]
- El operador realiza revisión mediante check list antes del turno
- Operadores deben portar licencia de conducir y carnet portuario
- Alarmas: reportar al Encargado de Nave → asistencia presencial de Mantención PANG (no vía teléfono)
- Spreader: check list previo al turno, ejecutado por personal Ultraport junto con Mantención Puerto Angamos.

[7.11 — Inspección Condiciones al Interior de la Nave]
- Comunicación permanente vía radio
- Revisión de equipos, herramientas y accesorios de elevación
- Mantener área limpia y ordenada
- Uso de EPP básico y arnés de seguridad
- Solicitar a la tripulación instalar líneas de vida o running en bodegas abiertas
- Verificar iluminación adecuada en todas las áreas

[7.12/7.13 — Descarga de Contenedores]
- El área de posicionamiento debe estar segregada y conificada con baliza
- Coordinador elabora circuito de ingreso de camiones
- Velocidad máxima en muelle: 25 km/h con luces encendidas
- Al estacionar, conductor aplica freno, apaga equipo y espera en la safety zone
- Contenedores de alto tonelaje: velocidad máxima en traslado 10 km/h; en radio de giro 5 km/h
- Prohibido: exponerse a cargas suspendidas.

[7.14 — Retiro de Twistlock en Estación]
- El Coordinador indica la zona donde se instalará la estación de retiro
- La zona debe estar segregada antes del inicio
- Prohibido lanzar los twistlock
- Usar guantes anti-golpe para el retiro
- Totalmente prohibido destrabar una piña con otra piña

[7.15 — Carga / Embarque de Contenedores]
- Área de posicionamiento segregada con barreras duras o New Jersey y señal pare/siga
- Camión debe quedar en línea (sin articulación)
- Velocidad máxima: 25 km/h con luces encendidas
Proceso en estación de piñas:
1. Movilizador coloca señal PARE/SIGA al frente de la cabina
2. Segundo movilizador instala cuña móvil en rueda de tracción
3. Movilizadores instalan twistlocks y el tarjador documenta la unidad
4. Verificar que cada piña quede bien calzada
5. Retirar cuña y señal PARE/SIGA solo cuando todos estén fuera del área

[EPP de Uso Obligatorio — ANG-P-105 (Contenedores)]
- Casco de seguridad
- Lentes de seguridad oscuros (día) y claros (noche)
- Guantes anti-golpe / anti-corte
- Zapatos de seguridad con punta de acero
- Barbiquejo
- Arnés de seguridad con dos cabos de vida en "Y" de acero
- Sunflap o protector de nuca / crema con filtro UV
Arnés obligatorio en: trabajos sobre 1,8 m, acceso a escalas de cubierta, trinca/destrinca, apertura de twistlocks en top de estiba.

[Teléfonos de Emergencia — Ultraport Angamos]
- HSE Ultraport Angamos (turno): 9 1953 1990
- HSEQ Puerto Angamos (Tatiana Lobos): 9 5333 1673
- IST Puerto Angamos Ambulancia 1: 9 6468 4816
- IST Puerto Angamos Ambulancia 2: 9 5396 5350
- Capitanía de Puerto Mejillones: 055-(2) 621513
- Bomberos Mejillones: 55-(2) 621591
- Hospital Mejillones: 55-(2) 621575
- Mutual de Seguridad Mejillones: 9 6652 0333
- IST Antofagasta: 055-(2) 222559

[Definiciones y Glosario]
- Portalón: Pasarela de fierro con piso de madera que se engancha al buque para subir/bajar de la cubierta
- Spreader: Herramienta colocada entre la grúa y el contenedor para engancharlo, levantarlo y bajarlo de forma segura
- Accidente: Evento no planificado que causa lesiones a personas o daños a equipos o instalaciones
- Incidente: Evento que no causó daños pero que pudo haberlos causado
- Derrame: Caída o escape no controlado de líquidos o materiales
- RESPEL: Residuo Peligroso
- EPP: Equipo de Protección Personal
- Batea: Contenedor tipo tolva utilizado en embarque de chatarra
- Safety Zone: Zona segura delimitada fuera del radio de acción de la grúa


=== ANG-P-146: CARGA Y DESCARGA DE CARGA GENERAL / HEAVY LIFT ===

[Sec. 8-9 — Inicio Operación Heavy Lift (DDS / ART / Pre-operativa)]
Antes de iniciar la faena el Coordinador Marítimo debe:
1. Ejecutar DDS y ART con todo el personal de turno
2. Revisar Planos de Embarque/Descarga, Packing List y diagramas de gravedad del Heavy Lift
3. Para H.L.: compartir diagramas de izaje, centro de gravedad y utilería con los encargados
4. Confirmar check list de nave — señalizar mediante letreros "PELIGRO CARGA SUSPENDIDA"
5. Definir circuito de ingreso de camiones y área de acopio
Documentación requerida del cliente (24 hrs antes del arribo): forma de enganche, peso, CG, cuidados especiales, puntos de izaje, instrucciones de nave y tierra.

[Sec. 12/13 — Ingreso al Buque / Tránsito en Nave (Carga General)]
- El ingreso a nave se debe realizar bajo lo establecido en ANG-I-023
- Transitar por vías despejadas y segregadas
- Mantener área limpia; comunicación permanente vía radio
- Uso de EPP y arnés sobre 1,8 m
- Prohibición de fumar en sectores de faena
- El Encargado de Nave identifica zonas de caída y habilita protecciones
- Prohibido transitar en lugares no habilitados

[Sec. 16 — Preparación Muelle Carga General / Heavy Lift]
El Coordinador Marítimo informa al grupo de encargados:
- Tipo de nave, tipo de carga y maquinaria a utilizar
- Se deben definir y señalizar con conos las áreas: zona de acopio, zona de destrinca y zona segura
- No exponerse extremidades ni cuerpo bajo carga suspendida
- Señalizar la ubicación en donde se detendrá el camión más el letrero de "Pare y Siga"
- Velocidad máxima en radio de giro: 7 km/h para tracto camiones

[Sec. 17 — Posicionamiento Camión Porteador (Carga General)]
- El camión se posiciona hacia los costados del sitio de trabajo (de aeropuerto)
- Una vez estacionado: motor detenido, freno de parqueo activado, conductor desciende y se posiciona en zona segura
- Personal Ultraport ubicará 1 letrero de pare y siga al frente de la cabina más cuña metálica en neumático delantero
- Velocidad máxima en radio de giro tracto camión: 7 km/h

[Sec. 18/19 — Destrinca y Trinca (Carga General / Bodega)]
La destrinca se realiza en bodega — el capataz de bodega supervisa constantemente orden, iluminación y condiciones.
- Encargado de nave evalúa riesgos y aplica check list antes de comenzar
- Cables y cadenas deben ser ordenados en el lugar designado, evitando que puedan enredarse
- La destrinca se realiza siempre a mínimo 2 movilizadores
- En caso de trabajo en altura (2 niveles o más): usar arnés y protocolos de altura
- Todo trabajador que suba al canastillo debe usar arnés con cuerda de vida anclado

[Sec. 20 — Enganche / Desenganche Heavy Lift]
- Mantener exposición de las manos lejos de las zonas de enganche de la utilería
- El Portalonero da indicaciones al Operador de Grúa Nave/Tierra, utilizando canal radial único
- Capataz y movilizadores verifican correctamente los puntos de izaje y tomas
- En caso de enganche a alturas sobre 1,8 mts: se utilizará canastillo tipo avión; el arnés debe quedar anclado con línea de vida y dos colas
- Si la carga requiere abordar el H.L.: arnés con doble cuerda de vida anclada, encargado de nave y tierra deben estar presentes

[Sec. 21 — Utilería (Heavy Lift)]
- Al desenganche: la maniobra no debe estar torcida ni doblada
- El estrobo se instala con una faja en el gancho de la grúa para evitar que rebote al desenganche
- Se debe tratar que el gancho quede lo más abajo posible para facilitar la postura
- Para la manipulación de estrobos rígidos usar guantes anti-golpe
- Tabla de pesos de utilería disponible en Anexo 30.11 del procedimiento

[Sec. 22/23 — Transferencia y Descarga en Cubierta (Carga General)]
- Verificar en el packing list el CG, anclaje y seguros de cada bulto
- Queda estrictamente prohibido manipular la carga con las manos directamente
- Encargado de tierra: mantener en la Safe Zone hasta que el bulto esté depositado
- Nunca mover la carga sobre la cabina del camión
- Movilizador debe usar arnés sobre 1,80 mts
- Cuadrilla de tierra verifica enganche del bulto → confirma al portalonero → portalonero da instrucciones al gruero

[Sec. 24 — Tándem (Heavy Lift)]
En modalidad TÁNDEM la carga será manipulada por dos grúas en forma simultánea.
- La carga máxima admisible por grúa en tándem es del 75% de su capacidad (≈ 75 ton por grúa)
- Se deben considerar 2 rigger o portaloneros, uno en cada bodega y otro en muelle
- Verificar cadenas, yugos, grilletes y eslingas en buen estado y con certificación al día
- Los operadores comunican en el mismo canal de radio — comunicación constante
- Uno de los operadores guía como Leader y el otro como Follower
- Durante descarga: arriar con misma velocidad manteniendo comunicación constante y verificando desbalanceo

[EPP de Uso Obligatorio — ANG-P-146 (Carga General / Heavy Lift)]
- Casco de seguridad
- Sunflap, protector de nuca o crema con filtro UV
- Lentes de seguridad oscuros (día) y claros (noche)
- Guantes de seguridad antigolpe - anticortes
- Zapatos de seguridad con punta de acero
- Barbiquejo
Aplica a todos los roles: movilizadores, operadores de equipos, portaloneros, tarjadores, capataces, encargados, coordinadores, jefes de área, trabajadores externos y conductores.


=== ANG-P-250: EMBARQUE DE CHATARRA ===

[Sec. 8 — Inicio Operación: Embarque de Chatarra (DDS / ART)]
Antes de iniciar la faena:
1. Ejecutar DDS con todo el personal de turno
2. Realizar el ART — F-SIG-051
3. Confirmar check list de nave turno a turno (Encargado de Nave)
4. Verificar postura de protecciones en bitas en caso de corte de espía (paneles)
5. Encargado de nave y tierra definen área segura fuera del radio de las grúas y el flujo de camiones
6. El armado de maniobra supervisado por el pañolero y el Encargado de Nave

[Sec. 14 — Posicionamiento de Equipos en Muelle (Chatarra)]
- Se establecen los puntos de recepción de camiones, delimitando con conos
- Respetar límites de velocidad: 25 km/h
- Usar conos o barreras duras (New Jersey) para señalizar zona de estacionamiento; debe existir un disco pare-siga
- Personal ubicará 1 letrero de pare y siga al frente de la cabina + cuña metálica en neumático delantero
- Una vez estacionado: motor detenido, freno de parqueo activado, operador se posiciona en zona segura
- El Encargado de Tierra indica el circuito de ingreso y salida a operadores tracto camión

[Sec. 15 — Posicionamiento de Pasarelas / Safety Zone (Chatarra)]
- Para movilización de plataformas: mínimo 2 movilizadores por lado, tomando la pasarela de sus puntos de apoyo o asas
- Una vez posicionada: poner el freno en las ruedas de la plataforma
- Se deberá instalar "SAFETY ZONE" mediante conos para que movilizadores se ubiquen previo al izaje
- La SAFETY ZONE debe estar fuera del radio de trabajo de grúa (Nave/Tierra) y flujo de camiones
- Solo el encargado de tierra autoriza la salida — debe estar presente el letrero "OPERACIONES DE IZAJE, NO SALIR DE SAFETY ZONE"

[Sec. 16 — Posicionamiento de Argollas y Ganchos (Chatarra)]
- Precaución en la instalación de las maniobras — puede existir interacción con la chatarra
- Uso en todo momento de guantes anti-golpes/cortes
- En caso de no poder instalar maniobras por restos de chatarra: el Encargado de Tierra coordina con Operador de Grúa Horquilla la remoción del material
- Uso de careta facial para evitar posibles cortes con despuntes
- Uso de coleto de cuero para evitar cortes
- En la zona de popa de la batea: instalar ganchos manuales; en la proa: colocar los argollones
- Durante posicionamiento: movilizadores sostendrán los niveláis para guiar correctamente sobre la tolva

[Sec. 17 — Transferencia hacia Bodega de la Nave (Chatarra)]
ADVERTENCIA: El riesgo crítico se presenta al inicio del izaje de la batea — todas las medidas preventivas deben estar implementadas antes de comenzar.
1. Antes de iniciar: movilizadores retiran las pasarelas del costado de la rampla y se posicionan en la zona segura
2. Una vez confirmados en zona segura → el portalonero autoriza y da instrucción para comenzar el izaje
3. El desplazamiento de la batea se realiza por la parte posterior de la rampla del camión — evitar paso sobre la cabina del tractocamión
4. Comenzar el izaje de la batea trasera; continuar con la siguiente rampla
5. El Operador de Grúa Tierra inicia el tensado de cables solo cuando los movilizadores estén confirmadamente en la zona segura
6. Portalonero guía la transferencia hacia el interior de la bodega hasta la correcta deposición en el fondo

[Sec. 18 — Volteo de Batea en Bodega (Chatarra)]
- El operador de grúa verifica que la batea esté completamente despejada y sin material residual antes de continuar
- Una vez confirmado: el portalonero otorga autorización para el retiro de la batea desde el interior de la bodega hacia el costado del muelle
- Si se detecta material o chatarra enganchada: el portalonero notifica de inmediato al encargado de tierra para coordinar su retiro antes de continuar

[Sec. 19/20 — Posicionamiento Batea Vacía en Muelle y Desenganche (Chatarra)]
Posicionamiento (Sec. 19):
- La batea vacía se retira desde el fondo de la bodega bajo guía directa del portalonero
- Durante el desplazamiento: ningún movilizador podrá ubicarse bajo el recorrido o área de influencia de la batea
- Los movilizadores permanecen en la zona segura hasta recibir la señal "OK" del portalonero
- Con la batea descargada: el operador de grúa tierra la deposita sobre la superficie de goma designada al costado de la nave
Desenganche (Sec. 20):
- Usar siempre guantes anticorte y anti-golpe
- Las maniobras deben mantenerse en posición de descanso o en configuración en "U"
- El portalonero autoriza el ingreso de los movilizadores para el desenganche
- Dos movilizadores inician el desenganche desde el sector de popa usando escaleras cortas
- Las escaleras solo pueden acercarse cuando la tolva esté correctamente posicionada y previa autorización del portalonero

[Sec. 21 — Posicionamiento de Batea Vacía sobre Tracto Camión (Chatarra)]
ADVERTENCIA: Ningún colaborador deberá interactuar en esta actividad.
- Antes de iniciar: el operador de grúa horquilla realiza el checklist del equipo
- La batea se posiciona sobre los calzos soldados a la rampla sobredimensionada
- El operador permanece atento a posibles filtraciones de aceite o fluidos hidráulicos
- En caso de detectar una fuga: equipo se detiene inmediatamente → aviso al encargado de tierra → protocolo de incidentes
- El operador confirma que no exista personal en el radio de acción → posiciona las uñas sobre los calzos → traslada y posiciona en la rampla del tracto

[EPP de Uso Obligatorio — ANG-P-250 (Embarque de Chatarra)]
- Casco de seguridad
- Sunflap, protector de nuca o crema con filtro UV
- Lentes de seguridad oscuros (día) y claros (noche)
- Guantes de seguridad antigolpe - anticortes
- Zapatos de seguridad con punta de acero
- Barbiquejo
- Mascarilla de doble filtro (adicional respecto a otros procedimientos)
En actividades con riesgo de cortes con chatarra:
- Careta facial
- Coleto de cuero
`;

const SYSTEM_PROMPT = `Eres ULTR-AI, el asistente operativo oficial de Ultraport Angamos, puerto multipropósito en Antofagasta, Chile.

Tu única fuente de información son los tres procedimientos oficiales que se incluyen abajo. NUNCA inventes datos.

BASE DOCUMENTAL:
${KNOWLEDGE_BASE}

REGLAS DE RESPUESTA:
1. Responde siempre en español.
2. Formato: usa **negritas** para términos clave, listas numeradas para pasos secuenciales, guiones para requisitos.
3. NO uses encabezados Markdown (# ## ###). Estructura el texto con negritas y saltos de línea.
4. BREVEDAD: Si te preguntan por una actividad a grandes rasgos, responde en 3-5 puntos clave. Solo entra en detalle si el usuario lo pide explícitamente (ej: "explícame en detalle", "cuáles son todos los pasos").
5. Identifica siempre el procedimiento: empieza indicando si es ANG-P-105, ANG-P-146 o ANG-P-250.
6. Si la pregunta abarca varios procedimientos, indícalo y responde cada uno brevemente.
7. Fuera del ámbito operativo: responde "Esta consulta está fuera del ámbito operativo de Ultraport."
8. Si no está en los documentos: responde "No encontré esto en la documentación oficial. Consulta al Supervisor de Turno."
9. Al final de cada respuesta, incluye una línea así (sin Markdown, solo texto plano separado):
FOLLOWUP:opción 1|opción 2|opción 3
Elige 2-3 preguntas de seguimiento cortas y relevantes al tema que acabas de responder. Estas serán mostradas como botones al usuario.`;

// ── COMPONENTES UI ────────────────────────────────────────────────────────────

function TypingDots() {
  return (
    <div style={{display:"flex",gap:4,padding:"12px 16px",alignItems:"center"}}>
      {[0,1,2].map(i=>(
        <div key={i} style={{width:7,height:7,borderRadius:"50%",backgroundColor:BRAND.gray300,animation:`bounce 1.2s ease-in-out ${i*.2}s infinite`}}/>
      ))}
      <style>{`@keyframes bounce{0%,80%,100%{transform:translateY(0);opacity:.4}40%{transform:translateY(-6px);opacity:1}}`}</style>
    </div>
  );
}

function renderMarkdown(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/^(\d+\.) /gm, "<br/><strong>$1</strong> ")
    .replace(/^- /gm, "<br/>• ")
    .replace(/\n\n/g, "<br/><br/>")
    .replace(/\n/g, "<br/>");
}

// Extrae followups de la respuesta y devuelve { clean, followups }
function parseResponse(text) {
  const match = text.match(/FOLLOWUP:(.+)$/m);
  if (!match) return { clean: text.trim(), followups: [] };
  const followups = match[1].split("|").map(s => s.trim()).filter(Boolean);
  const clean = text.replace(/FOLLOWUP:.+$/m, "").trim();
  return { clean, followups };
}

// Detecta procedimiento(s) mencionados en el texto
function detectProc(text) {
  const procs = ["ANG-P-105","ANG-P-146","ANG-P-250"].filter(p => text.includes(p));
  return procs.length > 0 ? procs[0] : null; // badge del primero mencionado
}

const LogoUltraport = () => (
  <svg viewBox="0 0 100 100" width="38" height="38" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="10" fill="#3AAEDC"/>
    <path d="M0,35 C15,20 35,20 50,35 C65,50 85,50 100,35 L100,65 C85,80 65,80 50,65 C35,50 15,50 0,65 Z" fill="white"/>
  </svg>
);

function Message({ msg, onFollowup }) {
  const isUser = msg.role === "user";
  const isError = !isUser && msg.type === "error";
  const proc = msg.proc || null;

  return (
    <div style={{display:"flex",justifyContent:isUser?"flex-end":"flex-start",marginBottom:12,alignItems:"flex-end",gap:8}}>
      {!isUser && (
        <div style={{width:30,height:30,borderRadius:"50%",background:`linear-gradient(135deg,${BRAND.navy},${BRAND.navyLight})`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,border:`2px solid ${BRAND.red}`,overflow:"hidden"}}>
          <svg viewBox="0 0 100 100" width="26" height="26" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" fill="#3AAEDC"/>
            <path d="M0,35 C15,20 35,20 50,35 C65,50 85,50 100,35 L100,65 C85,80 65,80 50,65 C35,50 15,50 0,65 Z" fill="white"/>
          </svg>
        </div>
      )}
      <div style={{maxWidth:"78%",display:"flex",flexDirection:"column",gap:6,alignItems:isUser?"flex-end":"flex-start"}}>
        <div style={{
          borderRadius:isUser?"18px 18px 4px 18px":"18px 18px 18px 4px",
          padding:"10px 14px",
          background:isUser?`linear-gradient(135deg,${BRAND.red},${BRAND.redHover})`:isError?"#FFF3F5":BRAND.white,
          color:isUser?BRAND.white:BRAND.gray700,
          fontSize:14,lineHeight:1.55,
          boxShadow:isUser?`0 2px 8px rgba(200,16,46,.25)`:`0 2px 8px rgba(10,31,59,.08)`,
          border:!isUser?`1px solid ${isError?"#FFCCD4":BRAND.gray300}`:"none"
        }}>
          {/* Badge procedimiento */}
          {proc && !isUser && (
            <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8}}>
              <div style={{background:PROC_COLOR[proc],color:"white",fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:20,letterSpacing:".06em"}}>
                {PROC_EMOJI[proc]} {proc} — {PROC_LABEL[proc]}
              </div>
            </div>
          )}
          <div style={{whiteSpace:"pre-line"}} dangerouslySetInnerHTML={{__html: isUser ? msg.content : renderMarkdown(msg.content)}}/>
        </div>

        {/* Botones de seguimiento */}
        {!isUser && msg.followups && msg.followups.length > 0 && (
          <div style={{width:"100%"}}>
            <div style={{fontSize:10,color:BRAND.gray500,fontWeight:600,textTransform:"uppercase",letterSpacing:".07em",marginBottom:5}}>Consultas relacionadas</div>
            <div style={{display:"flex",flexDirection:"column",gap:4}}>
              {msg.followups.map((fq, i) => (
                <button key={i} onClick={() => onFollowup(fq)}
                  style={{background:BRAND.gray100,border:`1px solid ${BRAND.gray300}`,borderRadius:8,padding:"7px 10px",fontSize:12,color:BRAND.navy,cursor:"pointer",fontFamily:"inherit",textAlign:"left",display:"flex",alignItems:"center",gap:6}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=BRAND.red;e.currentTarget.style.background="#FFF5F7";}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor=BRAND.gray300;e.currentTarget.style.background=BRAND.gray100;}}>
                  <span style={{color:BRAND.red,fontSize:14,fontWeight:700}}>›</span>{fq}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── PANEL DE MENÚ ─────────────────────────────────────────────────────────────
function MenuPanel({ onSelect, onClose }) {
  return (
    <div style={{position:"absolute",top:0,left:0,right:0,bottom:0,background:BRAND.gray100,zIndex:10,display:"flex",flexDirection:"column",borderRadius:24,overflow:"hidden"}}>
      <div style={{background:`linear-gradient(135deg,${BRAND.navy},${BRAND.navyLight})`,padding:"14px 16px 12px",display:"flex",alignItems:"center",gap:10,borderBottom:`3px solid ${BRAND.red}`}}>
        <button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",color:"white",fontSize:18,lineHeight:1,padding:"0 4px"}}>←</button>
        <div style={{color:"#FFFFFF",fontWeight:700,fontSize:15}}>Índice de Procedimientos</div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"12px"}}>
        {MENU_ACTIVIDADES.map(({proc, items}) => (
          <div key={proc} style={{marginBottom:16}}>
            <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8,padding:"6px 10px",background:PROC_COLOR[proc],borderRadius:10}}>
              <span style={{fontSize:14}}>{PROC_EMOJI[proc]}</span>
              <span style={{color:"white",fontWeight:700,fontSize:11,letterSpacing:".04em"}}>{proc} — {PROC_LABEL[proc]}</span>
            </div>
            {items.map((item, i) => (
              <button key={i} onClick={() => { onSelect(`Explícame: ${item} (${proc})`); onClose(); }}
                style={{display:"flex",alignItems:"center",gap:6,width:"100%",background:BRAND.white,border:`1px solid ${BRAND.gray300}`,borderRadius:8,padding:"8px 10px",fontSize:12,color:BRAND.gray700,cursor:"pointer",fontFamily:"inherit",textAlign:"left",marginBottom:4}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=BRAND.red;e.currentTarget.style.background="#FFF5F7";}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=BRAND.gray300;e.currentTarget.style.background=BRAND.white;}}>
                <span style={{color:PROC_COLOR[proc],fontWeight:700,fontSize:13}}>›</span>{item}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const SUGGESTED = [
  "¿Cómo inicio la operación de embarque de chatarra?",
  "¿Qué EPP necesito para heavy lift?",
  "¿Cuáles son los pasos antes de comenzar una faena?",
];

// ── APP PRINCIPAL ─────────────────────────────────────────────────────────────
export default function UltrAI() {
  const [messages, setMessages] = useState([
    { id:0, role:"assistant", type:"welcome",
      content:"Hola. Soy **ULTR-AI**, asistente operativo de Ultraport Angamos.\n\nPuedes consultarme sobre cualquier actividad, procedimiento de seguridad, EPP, emergencias u operaciones del puerto. Respondo solo con información de la documentación oficial.\n\nUsa el menú 📋 para explorar todas las actividades disponibles, o escribe tu consulta directamente." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({behavior:"smooth"}); }, [messages, loading]);

  const sendMessage = async (text) => {
    const query = (text || input).trim();
    if (!query || loading) return;
    setInput("");

    const userMsg = { id: Date.now(), role:"user", type:"user", content: query };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      const conversationHistory = [...messages, userMsg]
        .filter(m => m.id !== 0)
        .map(m => ({ role: m.role, content: m.content }));

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: conversationHistory
        })
      });

      if (!response.ok) throw new Error(`Error API: ${response.status}`);

      const data = await response.json();
      const rawText = data.content.filter(b => b.type === "text").map(b => b.text).join("\n");
      const { clean, followups } = parseResponse(rawText);
      const proc = detectProc(clean);

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: "assistant",
        type: "ai",
        content: clean,
        proc,
        followups
      }]);

    } catch (err) {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: "assistant",
        type: "error",
        content: "Hubo un error al procesar tu consulta. Por favor intenta nuevamente."
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",minHeight:"100vh",background:`linear-gradient(160deg,${BRAND.navy} 0%,${BRAND.navyLight} 100%)`,fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif",padding:16}}>
      <div style={{width:"100%",maxWidth:400,height:"88vh",maxHeight:780,background:BRAND.gray100,borderRadius:24,display:"flex",flexDirection:"column",overflow:"hidden",boxShadow:"0 24px 60px rgba(0,0,0,.4)",position:"relative"}}>

        {/* ── MENÚ PANEL ── */}
        {showMenu && <MenuPanel onSelect={sendMessage} onClose={() => setShowMenu(false)}/>}

        {/* ── HEADER ── */}
        <div style={{background:`linear-gradient(135deg,${BRAND.navy},${BRAND.navyLight})`,padding:"14px 16px 12px",display:"flex",alignItems:"center",gap:10,borderBottom:`3px solid ${BRAND.red}`}}>
          <div style={{width:42,height:42,borderRadius:10,overflow:"hidden",flexShrink:0,border:`2px solid rgba(255,255,255,0.25)`}}>
            <LogoUltraport/>
          </div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{color:"#FFFFFF",fontWeight:700,fontSize:15,letterSpacing:".01em"}}>ULTR-AI</div>
            <div style={{color:"#D0EAF7",fontSize:10,display:"flex",alignItems:"center",gap:5,marginTop:1}}>
              <span style={{width:6,height:6,borderRadius:"50%",background:"#34D399",display:"inline-block",flexShrink:0}}/>
              Base documental activa
            </div>
          </div>
          {/* Botón menú */}
          <button onClick={() => setShowMenu(true)}
            title="Ver todos los procedimientos"
            style={{background:"rgba(255,255,255,0.15)",border:"1px solid rgba(255,255,255,0.3)",borderRadius:8,padding:"6px 10px",cursor:"pointer",color:"white",fontSize:13,fontFamily:"inherit",display:"flex",alignItems:"center",gap:4}}>
            📋
          </button>
          <div style={{textAlign:"right",flexShrink:0,marginLeft:4}}>
            <span style={{fontWeight:800,fontSize:12,color:"#FFFFFF",letterSpacing:".08em"}}>ULTRAPORT</span>
          </div>
        </div>

        {/* ── MENSAJES ── */}
        <div style={{flex:1,overflowY:"auto",padding:"16px 12px",display:"flex",flexDirection:"column"}}>
          {messages.map(msg => <Message key={msg.id} msg={msg} onFollowup={sendMessage}/>)}

          {messages.length === 1 && (
            <div style={{marginTop:8}}>
              <div style={{fontSize:11,color:BRAND.gray500,fontWeight:600,textTransform:"uppercase",letterSpacing:".07em",marginBottom:8,paddingLeft:4}}>Consultas frecuentes</div>
              {SUGGESTED.map((s,i) => (
                <button key={i} onClick={() => sendMessage(s)}
                  style={{display:"block",width:"100%",textAlign:"left",background:BRAND.white,border:`1px solid ${BRAND.gray300}`,borderRadius:10,padding:"9px 12px",fontSize:13,color:BRAND.navy,cursor:"pointer",marginBottom:6,fontFamily:"inherit",lineHeight:1.4}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=BRAND.red;e.currentTarget.style.background="#FFF5F7";}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor=BRAND.gray300;e.currentTarget.style.background=BRAND.white;}}>
                  {s}
                </button>
              ))}
            </div>
          )}

          {loading && (
            <div style={{display:"flex",justifyContent:"flex-start",marginBottom:12,alignItems:"flex-end",gap:8}}>
              <div style={{width:30,height:30,borderRadius:"50%",background:`linear-gradient(135deg,${BRAND.navy},${BRAND.navyLight})`,display:"flex",alignItems:"center",justifyContent:"center",border:`2px solid ${BRAND.red}`,overflow:"hidden"}}>
                <svg viewBox="0 0 100 100" width="26" height="26" xmlns="http://www.w3.org/2000/svg">
                  <rect width="100" height="100" fill="#3AAEDC"/>
                  <path d="M0,35 C15,20 35,20 50,35 C65,50 85,50 100,35 L100,65 C85,80 65,80 50,65 C35,50 15,50 0,65 Z" fill="white"/>
                </svg>
              </div>
              <div style={{background:BRAND.white,borderRadius:"18px 18px 18px 4px",border:`1px solid ${BRAND.gray300}`}}><TypingDots/></div>
            </div>
          )}
          <div ref={bottomRef}/>
        </div>

        {/* ── INPUT ── */}
        <div style={{padding:"10px 12px 14px",background:BRAND.white,borderTop:`1px solid ${BRAND.gray300}`}}>
          <div style={{display:"flex",gap:8,alignItems:"flex-end"}}>
            <textarea value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key==="Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }}}
              placeholder="Consulta en lenguaje natural..." rows={1}
              style={{flex:1,resize:"none",border:`1.5px solid ${BRAND.gray300}`,borderRadius:14,padding:"10px 14px",fontSize:14,fontFamily:"inherit",color:BRAND.gray700,background:BRAND.gray100,outline:"none",lineHeight:1.5}}
              onFocus={e => e.target.style.borderColor=BRAND.navy}
              onBlur={e => e.target.style.borderColor=BRAND.gray300}/>
            <button onClick={() => sendMessage()} disabled={!input.trim() || loading}
              style={{width:42,height:42,borderRadius:12,background:!input.trim()||loading?BRAND.gray300:BRAND.red,border:"none",cursor:!input.trim()||loading?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"background .2s"}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
          <div style={{fontSize:10,color:BRAND.gray500,textAlign:"center",marginTop:7}}>
            Respuestas basadas exclusivamente en documentación oficial Ultraport
          </div>
        </div>
      </div>
    </div>
  );
}
