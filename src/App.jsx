import { useState, useRef, useEffect } from "react";

const BRAND = {
  navy:"#3AAEDC", navyLight:"#2B9DC8", red:"#C8102E", redHover:"#A50D25",
  white:"#FFFFFF", gray100:"#EFF6FA", gray300:"#CBD2DC", gray500:"#7A8799", gray700:"#3E4A5A",
};

// ── COLORES POR MODO ──────────────────────────────────────────────────────────
const MODE_CONFIG = {
  maritimo: {
    label: "Operaciones Marítimas",
    short: "OPM",
    emoji: "⚓",
    color: "#1A6FB0",
    gradient: "linear-gradient(135deg,#3AAEDC,#2B9DC8)",
  },
  terrestre: {
    label: "Operaciones Terrestres",
    short: "OPT",
    emoji: "🏗️",
    color: "#5B4A2E",
    gradient: "linear-gradient(135deg,#7A6040,#5B4A2E)",
  },
};

// ── PROCEDIMIENTOS POR MODO ───────────────────────────────────────────────────
const PROC_COLOR = {
  // Marítimos
  "ANG-P-003":"#8B1A1A","ANG-P-043":"#1A5C8B","ANG-P-065":"#6B3A1A",
  "ANG-P-067":"#8B7A1A","ANG-P-105":"#1A6FB0","ANG-P-146":"#8B6914",
  "ANG-P-154":"#2E6B3A","ANG-P-250":"#8B1A1A","ANG-P-252":"#6B1A8B",
  // Terrestres
  "ANG-P-003.1":"#8B3A1A","ANG-P-088":"#1A5C6B","ANG-P-093":"#3A6B1A",
  "ANG-P-096":"#6B1A5C","ANG-P-150":"#8B6B1A","ANG-P-199":"#1A3A8B",
  "ANG-P-200":"#6B3A8B","ANG-P-201":"#8B1A4A",
};

const PROC_LABEL = {
  "ANG-P-003":"Descarga de Maxibags con Ganchos Automáticos",
  "ANG-P-043":"Descarga de Parque Eólico",
  "ANG-P-065":"Descarga de Asfalto",
  "ANG-P-067":"Embarque de Cátodos de Cobre",
  "ANG-P-105":"Embarque y Descarga de Contenedores",
  "ANG-P-146":"Carga General / Heavy Lift",
  "ANG-P-154":"Descarga de Tubos",
  "ANG-P-250":"Embarque de Chatarra",
  "ANG-P-252":"Embarque de Maxibags con Ganchos Automáticos",
  "ANG-P-003.1":"Consolidado de Cobre",
  "ANG-P-088":"Levante de Contenedores Full",
  "ANG-P-093":"Posicionamiento de Contenedores Vacíos",
  "ANG-P-096":"Marcado y Verificación de Paquetes de Cobre",
  "ANG-P-150":"Enzunchado de Atados de Cobre",
  "ANG-P-199":"Ingreso y Salida de Convoy",
  "ANG-P-200":"Despacho de Cobre",
  "ANG-P-201":"Recepción y Acopio de Cobre",
};

// ── MENÚ DESPLEGABLE POR MODO ─────────────────────────────────────────────────
const MENU_MARITIMO = [
  { proc:"ANG-P-105", label:"Embarque y Descarga de Contenedores", items:[
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
  { proc:"ANG-P-146", label:"Carga General / Heavy Lift", items:[
    "Inicio operación Heavy Lift (DDS / ART)",
    "Ingreso al buque / tránsito en nave",
    "Preparación muelle",
    "Posicionamiento camión porteador",
    "Destrinca y trinca (Carga General)",
    "Enganche / Desenganche Heavy Lift",
    "Utilería (Heavy Lift)",
    "Transferencia y descarga en cubierta",
    "Tándem (Heavy Lift)",
    "EPP obligatorio",
  ]},
  { proc:"ANG-P-250", label:"Embarque de Chatarra", items:[
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
  { proc:"ANG-P-003", label:"Descarga de Maxibags con Ganchos Automáticos", items:[
    "Inicio operación (DDS / ART)",
    "Ingreso al buque",
    "Tránsito en nave",
    "Inspección previa de ganchos automáticos",
    "Movimiento de pontones",
    "Enganche en bodega",
    "Desenganche en muelle",
    "Descarga, traslado y acopio en muelle",
    "Desestibe y descarga en naves Reefer",
    "Reparación de maxibags en muelle",
    "Reparación de maxibags en bodega",
    "Desencarpado / Desestiba en cubierta",
    "Protocolo de emergencias",
    "EPP obligatorio",
  ]},
  { proc:"ANG-P-252", label:"Embarque de Maxibags con Ganchos Automáticos", items:[
    "Inicio operación (DDS / ART)",
    "Ingreso al buque",
    "Tránsito en nave",
    "Inspección previa de ganchos automáticos",
    "Movimiento de pontones",
    "Recepción de carga en muelle",
    "Enganche en muelle",
    "Embarque, traslado y estiba a bordo",
    "Reparación de maxibags en muelle",
    "Reparación de maxibags en bodega",
    "Estiba en cubierta",
    "Encarpado en cubierta",
    "Protocolo de emergencias",
    "EPP obligatorio",
  ]},
  { proc:"ANG-P-043", label:"Descarga de Parque Eólico", items:[
    "Inicio operación (DDS / ART)",
    "Preparación de la nave",
    "Ingreso a áreas de trabajo",
    "Destrinca de bultos",
    "Posicionamiento de camiones",
    "Áreas seguras de trabajo",
    "Enganche y desenganche en nave y tierra",
    "Transferencia y porteo en muelle",
    "EPP obligatorio",
  ]},
  { proc:"ANG-P-065", label:"Descarga de Asfalto", items:[
    "Inicio operación (DDS / ART)",
    "Ingreso al buque / tránsito por portalón",
    "Tránsito en nave",
    "Armado del rack",
    "Desarmado del rack",
    "Instrumentación en rack de descarga",
    "Conexiones",
    "Instalación de señalética y equipo contra incendio",
    "Instalación de manteletas",
    "Ingreso de camión externo",
    "Carguío de asfalto a camión",
    "EPP obligatorio",
  ]},
  { proc:"ANG-P-067", label:"Embarque de Cátodos de Cobre", items:[
    "Inicio operación (DDS / ART)",
    "Ingreso al buque",
    "Tránsito por portalón",
    "Uso de canastillo",
    "Tránsito en nave",
    "Movimiento de pontones",
    "Ingreso de tracto camión con cátodos",
    "Descarga de rampla con grúa horquilla",
    "Armado de eslinga con cadenas",
    "Embarque de cátodos con cadenas",
    "Recepción de plataforma a bordo",
    "Estiba con grúa horquilla en bodega",
    "Trinca de cátodos",
    "Embarque con Flat Rack (FR)",
    "Embarque con Preslingado",
    "EPP obligatorio",
  ]},
  { proc:"ANG-P-154", label:"Descarga de Tubos", items:[
    "Inicio operación (DDS / ART)",
    "Inspección previa y check list de nave",
    "Ingreso al buque (portalón / canastillo / escalera)",
    "Implementación sistema contra caídas",
    "Descarga de tubos desde bodega",
    "Recepción en muelle / descarga directa a camión",
    "Zona de trinca en muelle",
    "EPP obligatorio",
  ]},
];

const MENU_TERRESTRE = [
  { area:"CFS Exportaciones", color:"#1A6FB0", procs:[
    { proc:"ANG-P-003.1", label:"Consolidado de Cobre", items:[
      "Inicio operación (DDS / ART)",
      "Posicionamiento de contenedores para consolidado",
      "Proceso de consolidado de cobre",
      "Capturación / tarja durante consolidado",
      "Cierre de contenedor y sellado",
      "Reglas generales de seguridad en consolidado",
      "EPP obligatorio",
    ]},
    { proc:"ANG-P-088", label:"Levante de Contenedores Full", items:[
      "Inicio operación (DDS / ART)",
      "Sellado con equipos móviles (tarjador + movilizador)",
      "Sellado sin equipos móviles",
      "Levante de contenedor con personal completo",
      "Comunicación radial y zonas seguras",
      "EPP obligatorio",
    ]},
    { proc:"ANG-P-093", label:"Posicionamiento de Contenedores Vacíos", items:[
      "Inicio operación (DDS / ART)",
      "Revisión de plano y asignación de contenedor",
      "Posicionamiento de contenedor",
      "Comunicación radial y zonas seguras",
      "EPP obligatorio",
    ]},
  ]},
  { area:"Patio de Cobre", color:"#8B6914", procs:[
    { proc:"ANG-P-096", label:"Marcado y Verificación de Paquetes de Cobre", items:[
      "Inicio operación (DDS / ART)",
      "Proceso de marcado de paquetes",
      "Verificación de identidad y lote",
      "EPP obligatorio",
    ]},
    { proc:"ANG-P-150", label:"Enzunchado de Atados de Cobre", items:[
      "Inicio operación (DDS / ART)",
      "Proceso de enzunchado manual",
      "Verificación de enzunchado",
      "EPP obligatorio",
    ]},
    { proc:"ANG-P-199", label:"Ingreso y Salida de Convoy", items:[
      "Inicio operación (DDS / ART)",
      "Preparación de inicio y comunicación con ferrocarril",
      "Preparación de ingreso al terminal",
      "Ingreso de convoy a patio cobre",
      "Desacople y aseguramiento de carros",
      "Salida de convoy de patio cobre",
      "EPP obligatorio",
    ]},
    { proc:"ANG-P-200", label:"Despacho de Cobre", items:[
      "Inicio operación (DDS / ART)",
      "Despacho de cobre a nave",
      "Despacho a consolidado",
      "Despacho en camiones calle (ánodos)",
      "Despacho en camiones calle (cátodos)",
      "Despacho en convoy",
      "Proceso documental de porteo",
      "EPP obligatorio",
    ]},
    { proc:"ANG-P-201", label:"Recepción y Acopio de Cobre", items:[
      "Inicio operación (DDS / ART)",
      "Descarga desde convoy",
      "Capturación / tarja desde convoy",
      "Recepción desde camiones de calle",
      "Recepción desde nave",
      "Reglas generales de acopio de cobre",
      "Conteo láminas cobre Codelco",
      "Proceso documental de recepción",
      "EPP obligatorio",
    ]},
  ]},
];

// ── BASE DOCUMENTAL ───────────────────────────────────────────────────────────
const KB_MARITIMO = `
=== OPERACIONES MARÍTIMAS — ULTRAPORT ANGAMOS ===

== ANG-P-105: EMBARQUE Y DESCARGA DE CONTENEDORES ==

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
- Inspeccionar la estructura antes de usarla. Mantener mínimo 3 puntos de apoyo.
- El portalón debe tener al menos 5 metros entre su base y el borde del muelle.
- Personal externo requiere autorización del Coordinador de Operaciones Marítimas.
- Usar arnés con doble cabo en escaleras verticales a bodega.
Prohibido: saltar desde escala o desde la banda de la nave al muelle.

[7.4 — Uso de Canastillo]
- Mantener el canastillo limpio y libre de obstáculos. Respetar límites de peso y cantidad de personas.
- Inspeccionar estructura, grilletes y cables antes de cada uso.
- Arnés obligatorio — enganchar cola de seguridad a la baranda interior.
- Cola de vida no debe quedar colgando.
- El operador de la grúa solo levanta con la señal del supervisor.
- Prohibido saltar o trepar fuera del canastillo.

[7.5 — Tránsito en Cubierta y Paillos]
- Transitar por vías despejadas y segregadas. Mantener área ordenada y limpia.
- Comunicación permanente vía radio. Usar apoya manos — mínimo 3 puntos de apoyo.
- Uso de EPP básico y arnés de seguridad. Prohibido usar el celular en zonas operativas.
- Mantener escotillas cerradas.

[7.6 — Movimiento de Pontones]
- Comunicación permanente vía radio. Uso de EPP básico y arnés de seguridad.
- Al conectar/desconectar pontones: no exponerse bajo la carga suspendida.
- Avisar a todo el personal cercano antes de iniciar el movimiento.
- Se permite apilar hasta 3 tapas de alto.

[7.7 — Destrinca y Trinca de Contenedores en Nave]
Regla fundamental: mantener al menos 3 ROW de distancia de la posición de trabajo de la grúa.
1. Inspeccionar la nave previamente. Verificar que escotillas estén cerradas.
2. Trabajar siempre en dupla (2 personas).
3. Un movilizador sostiene la varilla mientras el otro trinca/destrinca.
4. Una vez separada la varilla: el compañero se aleja al menos 2 filas.
5. Usar guantes anti-golpe en todo momento. Prohibido lanzar varillas o tensores.

[7.8 — Apertura y Cierre de Twistlock / Piñas]
Preferencia: abrir desde la cubierta para evitar exponer trabajadores sobre el top de la estiba.
Si se debe abrir desde el top:
1. Trasladar trabajadores en canastillo hasta el centro de la estiba.
2. Conectar arnés al sistema bastón. Avanzar desde el centro al extremo — bastón a mínimo 1 metro del borde.
Twistlock trabado: usar martillo pico pato. Prohibido: destrabar una piña con otra piña.

[7.9/7.10 — Check List Grúa Tierra y Spreader]
- El operador realiza revisión mediante check list antes del turno.
- Operadores deben portar licencia de conducir y carnet portuario.
- Alarmas: reportar al Encargado de Nave → asistencia presencial de Mantención PANG (no vía teléfono).

[7.11 — Inspección Interior de la Nave]
- Comunicación permanente vía radio. Revisión de equipos y herramientas.
- Mantener área limpia y ordenada. Uso de EPP básico y arnés de seguridad.
- Solicitar a la tripulación instalar líneas de vida o running en bodegas abiertas.
- Verificar iluminación adecuada en todas las áreas.

[7.12/7.13 — Descarga de Contenedores]
- Área de posicionamiento segregada y conificada con baliza.
- Coordinador elabora circuito de ingreso de camiones.
- Velocidad máxima en muelle: 25 km/h con luces encendidas.
- Al estacionar, conductor aplica freno, apaga equipo y espera en la safety zone.
- Contenedores de alto tonelaje: velocidad máxima en traslado 10 km/h; en radio de giro 5 km/h.
- Prohibido: exponerse a cargas suspendidas.

[7.14 — Retiro de Twistlock en Estación]
- El Coordinador indica la zona donde se instalará la estación de retiro.
- La zona debe estar segregada antes del inicio. Prohibido lanzar los twistlock.
- Usar guantes anti-golpe. Prohibido destrabar una piña con otra piña.

[7.15 — Carga / Embarque de Contenedores]
- Área de posicionamiento segregada con barreras duras o New Jersey y señal pare/siga.
- Camión debe quedar en línea (sin articulación). Velocidad máxima: 25 km/h.
Proceso en estación de piñas:
1. Movilizador coloca señal PARE/SIGA al frente de la cabina.
2. Segundo movilizador instala cuña móvil en rueda de tracción.
3. Movilizadores instalan twistlocks y el tarjador documenta la unidad.
4. Verificar que cada piña quede bien calzada.
5. Retirar cuña y señal PARE/SIGA solo cuando todos estén fuera del área.

[EPP — ANG-P-105]
- Casco de seguridad. Lentes de seguridad oscuros (día) y claros (noche).
- Guantes anti-golpe / anti-corte. Zapatos de seguridad con punta de acero.
- Barbiquejo. Arnés de seguridad con dos cabos de vida en "Y" de acero.
- Sunflap o protector de nuca / crema con filtro UV.
- Arnés obligatorio en: trabajos sobre 1,8 m, escalas de cubierta, trinca/destrinca, apertura de twistlocks en top de estiba.

[Teléfonos de Emergencia — Ultraport Angamos]
- HSE Ultraport Angamos (turno): 9 1953 1990
- HSEQ Puerto Angamos (Tatiana Lobos): 9 5333 1673
- IST Puerto Angamos Ambulancia 1: 9 6468 4816 / Ambulancia 2: 9 5396 5350
- Capitanía de Puerto Mejillones: 055-(2) 621513
- Bomberos Mejillones: 55-(2) 621591 / Hospital Mejillones: 55-(2) 621575
- Mutual de Seguridad Mejillones: 9 6652 0333 / IST Antofagasta: 055-(2) 222559

[Definiciones y Glosario]
- Portalón: Pasarela de fierro con piso de madera que se engancha al buque.
- Spreader: Herramienta entre la grúa y el contenedor para engancharlo y levantarlo.
- Accidente: Evento no planificado que causa lesiones o daños. Incidente: sin daños pero pudo haberlos.
- RESPEL: Residuo Peligroso. EPP: Equipo de Protección Personal.
- Batea: Contenedor tipo tolva utilizado en embarque de chatarra.
- Safety Zone: Zona segura delimitada fuera del radio de acción de la grúa.


== ANG-P-146: CARGA GENERAL / HEAVY LIFT ==

[Inicio Operación Heavy Lift — DDS / ART]
Antes de iniciar, el Coordinador Marítimo debe:
1. Ejecutar DDS y ART con todo el personal de turno.
2. Revisar Planos de Embarque/Descarga, Packing List y diagramas de gravedad del Heavy Lift.
3. Para H.L.: compartir diagramas de izaje, centro de gravedad y utilería con los encargados.
4. Confirmar check list de nave — señalizar con letreros "PELIGRO CARGA SUSPENDIDA".
5. Definir circuito de ingreso de camiones y área de acopio.
Documentación requerida del cliente (24 hrs antes): forma de enganche, peso, CG, cuidados especiales, puntos de izaje.

[Ingreso al Buque / Tránsito en Nave — Carga General]
- Ingreso a nave bajo lo establecido en ANG-I-023. Transitar por vías despejadas y segregadas.
- Mantener área limpia; comunicación permanente vía radio. Uso de EPP y arnés sobre 1,8 m.
- Prohibición de fumar en sectores de faena. Prohibido transitar en lugares no habilitados.

[Preparación Muelle — Carga General / Heavy Lift]
- Coordinador informa: tipo de nave, tipo de carga y maquinaria a utilizar.
- Definir y señalizar con conos: zona de acopio, zona de destrinca y zona segura.
- No exponerse extremidades ni cuerpo bajo carga suspendida.
- Velocidad máxima en radio de giro: 7 km/h para tracto camiones.

[Posicionamiento Camión Porteador]
- El camión se posiciona hacia los costados del sitio de trabajo.
- Motor detenido, freno de parqueo activado, conductor en zona segura.
- Personal Ultraport ubicará letrero pare/siga y cuña metálica en neumático delantero.

[Destrinca y Trinca — Carga General / Bodega]
- La destrinca se realiza en bodega — capataz supervisa constantemente.
- Encargado de nave evalúa riesgos y aplica check list antes de comenzar.
- Cables y cadenas ordenados en lugar designado. Mínimo 2 movilizadores.
- En altura (2 niveles o más): usar arnés y protocolos de altura.

[Enganche / Desenganche Heavy Lift]
- Mantener manos lejos de las zonas de enganche de la utilería.
- El Portalonero da indicaciones al Operador de Grúa usando canal radial único.
- En alturas sobre 1,8 mts: canastillo tipo avión, arnés con línea de vida y dos colas.

[Utilería — Heavy Lift]
- Al desenganche: la maniobra no debe estar torcida ni doblada.
- El estrobo se instala con una faja en el gancho para evitar que rebote al desenganche.
- Para estrobos rígidos usar guantes anti-golpe.
- Tabla de pesos de utilería disponible en Anexo 30.11 del procedimiento.

[Transferencia y Descarga en Cubierta]
- Verificar en el packing list el CG, anclaje y seguros de cada bulto.
- Estrictamente prohibido manipular la carga con las manos directamente.
- Encargado de tierra: mantener personal en la Safe Zone hasta que el bulto esté depositado.
- Cuadrilla de tierra verifica enganche → confirma al portalonero → portalonero instruye al gruero.

[Tándem — Heavy Lift]
- Dos grúas en forma simultánea. Carga máxima admisible por grúa: 75% de su capacidad (~75 ton).
- 2 rigger o portaloneros: uno en cada bodega y otro en muelle.
- Los operadores comunican en el mismo canal de radio. Uno como Leader, el otro como Follower.

[EPP — ANG-P-146]
- Casco, sunflap/crema UV, lentes oscuros (día) y claros (noche), guantes antigolpe-anticortes, zapatos con punta de acero, barbiquejo.
- Aplica a todos los roles: movilizadores, operadores, portaloneros, tarjadores, capataces, encargados, coordinadores.


== ANG-P-250: EMBARQUE DE CHATARRA ==

[Inicio Operación — DDS / ART]
1. Ejecutar DDS con todo el personal de turno.
2. Realizar el ART — F-SIG-051.
3. Confirmar check list de nave turno a turno (Encargado de Nave).
4. Encargado de nave y tierra definen área segura fuera del radio de las grúas y flujo de camiones.
5. El armado de maniobra supervisado por el pañolero y el Encargado de Nave.

[Posicionamiento de Equipos en Muelle]
- Establecer puntos de recepción de camiones delimitando con conos. Velocidad máxima: 25 km/h.
- Personal ubicará letrero pare/siga al frente de la cabina y cuña metálica en neumático delantero.
- Motor detenido, freno de parqueo activado, operador en zona segura.

[Posicionamiento de Pasarelas / Safety Zone]
- Mínimo 2 movilizadores por lado para movilizar plataformas.
- Una vez posicionada: poner el freno en las ruedas de la plataforma.
- Instalar "SAFETY ZONE" mediante conos fuera del radio de trabajo de grúa y flujo de camiones.
- Solo el encargado de tierra autoriza la salida. Letrero: "OPERACIONES DE IZAJE, NO SALIR DE SAFETY ZONE".

[Posicionamiento de Argollas y Ganchos]
- Uso en todo momento de guantes anti-golpes/cortes. Uso de careta facial y coleto de cuero.
- En zona de popa de la batea: instalar ganchos manuales; en la proa: argollones.
- Movilizadores sostendrán los niveláis para guiar correctamente sobre la tolva.

[Transferencia hacia Bodega de la Nave]
ADVERTENCIA: El riesgo crítico se presenta al inicio del izaje de la batea.
1. Movilizadores retiran pasarelas y se posicionan en zona segura.
2. Portalonero autoriza y da instrucción para comenzar el izaje.
3. Desplazamiento de la batea por la parte posterior de la rampla — evitar paso sobre la cabina.
4. El Operador de Grúa Tierra inicia el tensado de cables solo cuando movilizadores estén en zona segura.

[Volteo de Batea en Bodega]
- El operador de grúa verifica que la batea esté completamente despejada y sin material residual.
- Si se detecta chatarra enganchada: el portalonero notifica al encargado de tierra para coordinar retiro.

[Posicionamiento Batea Vacía y Desenganche]
- La batea vacía se retira desde el fondo de la bodega bajo guía directa del portalonero.
- Ningún movilizador podrá ubicarse bajo el recorrido o área de influencia de la batea.
- Usar guantes anticorte y anti-golpe. Dos movilizadores inician el desenganche desde popa con escaleras cortas.

[Posicionamiento de Batea Vacía sobre Tracto Camión]
ADVERTENCIA: Ningún colaborador deberá interactuar en esta actividad.
- Operador de grúa horquilla realiza el checklist del equipo antes de iniciar.
- La batea se posiciona sobre los calzos soldados a la rampla sobredimensionada.
- En caso de detectar fuga de fluidos: equipo se detiene → aviso al encargado de tierra → protocolo de incidentes.

[EPP — ANG-P-250]
- Casco, sunflap/crema UV, lentes oscuros (día) y claros (noche), guantes antigolpe-anticortes, zapatos con punta de acero, barbiquejo.
- Mascarilla de doble filtro (adicional). En actividades con riesgo de cortes: careta facial y coleto de cuero.


== ANG-P-003: DESCARGA DE MAXIBAGS CON GANCHOS AUTOMÁTICOS ==

[Inicio Operación — DDS / ART]
DDS a cargo del encargado de tierra o coordinador. ART mediante F-SIG-051 antes de cada faena.
- Check List de Nave turno a turno. Encargado de nave y tierra definen área segura.
- El pañolero trasladará y verificará el estado de las maniobras previo al inicio de operaciones.

[Ingreso al Buque]
- Tres formas: portalón, canastillo, escalera de nave. Inspeccionar estructura antes de usarla.
- Portalón: mínimo 5 metros entre base y borde del muelle. Mallas de protección obligatorias.
- Canastillo: arnés obligatorio. Escaleras verticales sin respaldo: instalar línea de vida vertical.

[Tránsito en Nave]
- Transitar por vías despejadas. Prohibición de fumar. Arnés sobre 1,8 metros.
- Entregar HDS del producto al encargado de nave. Prohibido transitar en lugares no habilitados.

[Inspección Previa de Ganchos Automáticos]
- Señalizar con letreros "PELIGRO — MANEJO DE MERCANCIAS PELIGROSAS — PROHIBIDO FUMAR".
- Demarcar perlones mediante pintado fluorescente en la zona de enganche.
- Pañol Marítimo envía "CHECK LIST" de estatus de ganchos antes del turno.

[Enganche en Bodega]
- Una vez abierta la bodega: ventilar mínimo 10 minutos.
- Solo el portalonero da indicaciones al Operador de Grúa usando canal radial único.
- Movilizadores verifican enganche: (A) demarcación fluorescente 100% dentro del gancho; (B) "CLICK" audible.
- El capataz de bodega da visto bueno al portalonero para tensar e izar.

[Desenganche en Muelle]
- Se utilizará control remoto para abrir los ganchos automáticos.
- Si un perlón queda enganchado: liberarlo con laucha o varilla. Nunca con las manos.
- Una vez finalizado el desenganche, la cuadrilla se dirige a la zona de seguridad.
- Solo el encargado de tierra autoriza a salir de la SAFE ZONE.

[Descarga, Traslado y Acopio en Muelle]
- Maniobras disponibles: 10, 12, 18 y 22 maxibags.
- Grúa horquilla sale de zona de parqueo solo cuando todo el personal esté en zona segura.
- No se deben poner manteletas bajo carga suspendida — hacerlo antes de comenzar.
- No manipular los ganchos automáticos manualmente.

[EPP — ANG-P-003]
- Casco, sunflap/crema UV, lentes oscuros/claros, guantes anti-golpe/anti-corte, zapatos punta de acero.
- Respirador doble filtro. Buzo de papel.


== ANG-P-252: EMBARQUE DE MAXIBAGS CON GANCHOS AUTOMÁTICOS ==

[Inicio Operación — DDS / ART]
DDS a cargo del encargado de tierra o coordinador de operaciones terrestres. ART mediante F-SIG-051.
- Check List de Nave turno a turno. Área segura fuera del radio de grúas y flujo de camiones.

[Enganche en Muelle]
- Personal sube a plataformas y engancha asas de maxibags pasando el perlón por el gancho.
- Verificar "CLICK" audible y que demarcación fluorescente esté 100% dentro del gancho.
- Una vez finalizado el enganche, cuadrilla baja de la plataforma y se posiciona en zona segura.
- Solo el encargado de tierra autoriza salir de la SAFE ZONE.

[Embarque, Traslado y Estiba a Bordo]
- Maniobras disponibles: 10, 12 y 22 maxibags.
- Portalonero activa apertura automática de ganchos para liberar la maniobra.
- No manipular los ganchos automáticos manualmente.
- Solo el portalonero da indicaciones al gruero usando canal radial único.

[EPP — ANG-P-252]
- Casco, sunflap/crema UV, lentes oscuros/claros, guantes antigolpe-anticortes, zapatos punta de acero.
- Guantes antigolpes/corte para enzunchado. Buso desechable.


== ANG-P-043: DESCARGA DE PARQUE EÓLICO ==

[Inicio Operación — DDS / ART]
DDS a cargo del supervisor de turno. ART enfocándose en las condiciones de entorno y paso a paso.
- Difundir uso de arnés en bodega (sobre 1,8 metros). Verificar línea de vida anclada a estructura fija de la nave.
- Es obligatorio el curso de altura y exámenes de altura (octavo par) para trabajar en esta faena.

[Actividades Principales]
- Preparación de la nave: inspección de bodega, verificación de condiciones antes del ingreso del personal.
- Ingreso a áreas de trabajo: por portalón, jaula o escalera con red protectora. Mínimo 3 puntos de apoyo.
- Destrinca de bultos: encargado de nave supervisa constantemente orden, iluminación y condiciones.
- Posicionamiento de camiones: circuito de ingreso coordinado por encargado de tierra.
- Áreas seguras: definidas fuera del radio de operación de grúas y tránsito de equipos.
- Enganche y desenganche en nave y tierra: verificar puntos de izaje. Canal radial único.
- Transferencia y porteo en muelle: nunca mover la carga sobre la cabina del camión.

[EPP — ANG-P-043]
- Casco, crema con filtro UV, lentes de seguridad, guantes anticorte-antigolpes, zapatos punta de acero, arnés sobre 1,80 mts.


== ANG-P-065: DESCARGA DE ASFALTO ==

[Inicio Operación — DDS / ART]
DDS y ART al inicio de cada turno. Revisar secuencia de descarga de asfalto.
- Actividad: descarga de asfalto a través de flexibles desde la nave al rack, donde es descargado a camiones.

[Actividades Principales]
- Ingreso al buque: por portalón, escalera de nave. Inspeccionar estructura antes de usar. Mínimo 5 metros portalón-borde muelle.
- Tránsito por portalón: mantener 3 puntos de apoyo. Uso de apoyamanos. Prohibido saltar.
- Tránsito en nave: comunicación vía radio. Arnés sobre 1,8 metros. Prohibición de fumar.
- Armado del rack: según check list de montaje de módulos ENEX S.A. Encargado de tierra supervisando.
- Desarmado del rack: al finalizar operación. Área limpia y ordenada.
- Instrumentación: verificar instrumentos en rack de descarga antes de iniciar.
- Conexiones: realizar conexiones de flexibles siguiendo secuencia indicada.
- Señalética y equipo contra incendio: instalar antes de iniciar operación.
- Manteletas: instalar para contención de derrames.
- Ingreso camión externo: velocidad máxima 25 km/h. Conductor en zona segura.
- Carguío a camión: solo cuando rack esté operativo y área despejada.

[EPP — ANG-P-065]
- Casco, crema UV, lentes, guantes anticorte-antigolpes, zapatos punta de acero, barbiquejo.


== ANG-P-067: EMBARQUE DE CÁTODOS DE COBRE ==

[Inicio Operación — DDS / ART]
DDS y ART al inicio. Revisar secuencia de embarque. El pañolero verifica estado de maniobras previo al inicio.
- Pañolero responsable de trasladar y verificar estado de maniobras y materiales antes, durante y al finalizar.

[Ingreso al Buque]
Tres formas: portalón, jaula (canastillo), escalera real con red protectora.
- Portalón: mínimo 5 metros entre base y borde de muelle. Reforzar conexión con fajas o cables.
- Personal externo debe contar con autorización del Coordinador de Operaciones Marítimas.

[Ingreso de Tracto Camión con Cátodos]
- Velocidad máxima: 25 km/h. Licencia de conducir y carnet portuario obligatorio.
- Circuito de ingreso coordinado por encargado de tierra. Espacio libre entre rampla y borde: mínimo 4 mts.

[Armado de Eslinga con Cadenas]
- El horquillero prepara la eslinga enfrentando siempre de frente el acopio.
- La pila debe quedar estable. Altura máxima: 1,60 mts aproximado.
- Los trabajadores pasan cadenas por debajo de la eslinga a unos 10 cm del extremo de los atados.
- Prohibido sujetar la cadena con las manos al subir la maniobra. Movilizadores siempre con manos libres sobre el cátodo.

[Embarque con Cadenas / Flat Rack / Preslingado]
- Solo el portalonero da indicaciones al operador de grúa tierra mediante canal radial único.
- Al trasladar los cátodos, deben estar bien asegurados y vigilados para evitar su caída.
- Al depositar la eslinga en bodega: el personal retira cadenas tomándolas por la parte superior.

[Estiba con Grúa Horquilla en Bodega]
- Personal en zona segura mientras opera la grúa horquilla.
- Distancia mínima de 3 metros de grúa horquilla. Área mínima de trabajo: 6x6 mts.
- Colaboradores sobre la estiba (sobre 1,8 mts): arnés anclado a cuerda de vida previamente instalada.

[Trinca de Cátodos]
- Encargado de nave instruye forma de choquear la estiba.
- Movilizadores tensan vientos con herramienta adecuada (grifa, tensores, grampas, grillete, bastón, chicharra, llave de trinca).

[EPP — ANG-P-067]
- Casco, sunflap/crema UV, lentes oscuros (día) y claros (noche), guantes antigolpe-anticortes, zapatos punta de acero, barbiquejo.


== ANG-P-154: DESCARGA DE TUBOS ==

[Inicio Operación — DDS / ART]
DDS y ART antes de iniciar. Verificar que todos tengan curso de altura y examen de altura (octavo par).
- SIEMPRE SE DEBE GENERAR UN CHECKLIST DE LAS ACTIVIDADES PREVIAS Y TRABAJAR CON RIGGING PLAN CERTIFICADO Y APROBADO POR CLIENTE.
- El Supervisor de Nave deberá aplicar check list previo al inicio del turno verificando sistemas de protección contra caídas y camadas/atriles de camiones porteadores.

[Ingreso al Buque]
Por portalón, canastillo o escalera de nave.
- Portalón: mínimo 5 metros entre base y borde de muelle.
- Canastillo: arnés obligatorio anclado a estructura fija interior.
- Escaleras verticales sin respaldo: instalar línea de vida vertical con arnés.

[Implementación Sistema Contra Caídas]
- Sistema de líneas de vida retráctil o anclaje directo al spreader (2 líneas de perlón o cable 1" por cada lado).
- Distancia de seguridad mínima respecto al borde de la estiba: 5 metros. En esta zona SIEMPRE arnés enganchado.
- ESTRICTAMENTE PROHIBIDO exponerse bajo carga suspendida.
- Maniobra de izaje: conectores (muelas) revestidos para protección de los biseles de los tubos.

[Descarga de Tubos desde Bodega]
- Movilizadores ubicarán conectores en los extremos de los tubos una vez la maniobra esté estable.
- Instalados los conectores → movilizadores se alejan a zona de resguardo → portalonero instruye el izaje.
- Se deberán instalar niveláis o retenidas en cada muela para facilitar su retiro.
- Prohibido al personal en tierra retirar muelas directamente con las manos.

[Recepción en Muelle / Descarga Directa a Camión]
- Se permitirá 1 camión en la zona de descarga. Conductor baja y espera en Safety Zone.
- Movilizadores permanecen en Safety Zone hasta que encargado de muelle autorice su salida.
- Para tomar niveláis: movilizadores usarán varillas (lauchas) para mantenerse alejados de carga suspendida.
- Prohibido subir a las ramplas de los camiones (excepto si quedan muelas trabadas — usar escala aeropuerto).

[EPP — ANG-P-154]
- Casco, sunflap/crema UV, lentes oscuros (día) y claros (noche), guantes antigolpes-anticorte, zapatos punta de acero.
`;

const KB_TERRESTRE = `
=== OPERACIONES TERRESTRES — ULTRAPORT ANGAMOS ===

== ÁREA: CFS EXPORTACIONES ==

-- ANG-P-003.1: CONSOLIDADO DE COBRE --

[Objetivo]
Estandarizar el proceso de Consolidado de Cobre para disminuir riesgos e incidentes en la operación.

[Definiciones]
- Packing List o Loteo: listado de carga que identifica un grupo de mercancías.
- Jaulas de Seguridad: Elemento que protege las mercancías que transportan los carros del convoy.
- Gálibo: línea de delimitación de seguridad para el tránsito del convoy.
- Palos estiba: material de estiba que se utiliza en el apilamiento de cobre.
- Palos estaca: material de estiba que se utiliza en el acopio de cobre.

[Inicio Operación — DDS / ART]
DDS a cargo del coordinador de operaciones terrestres o encargado de tierra del turno.
ART mediante F-SIG-051 antes de cada faena.

[Proceso de Consolidado]
- El encargado de tierra es responsable de supervisar y coordinar todas las actividades del área de consolidado.
- No se puede realizar consolidado y levante en el mismo pasillo simultáneamente.
- No se puede utilizar la grúa horquilla de 3,5 ton para cerrar puertas.
- El encargado de tierra indica a movilizadores y tarjadores su zona segura en el área de consolidado.
- Personal externo que desee ingresar a la faena debe pedir autorización al encargado de tierra.
- Movilizadores no podrán invadir el área de giro de los equipos en operación.
- El tarjador puede iniciar el sellado solo una vez que el consolidado esté completamente terminado. No se puede sellar y consolidar al mismo tiempo.
- El movilizador deberá colocar un cono de advertencia para que el horquillero no ingrese a un contenedor sin autorización.

[EPP — ANG-P-003.1]
- Casco, sunflap/crema UV, lentes oscuros (día) y claros (noche), guantes antigolpe-anticortes, zapatos punta de acero, barbiquejo.


-- ANG-P-088: LEVANTE DE CONTENEDORES FULL --

[Objetivo]
Establecer los pasos secuenciales del proceso de levante de contenedores para reducir riesgos.

[Definiciones]
- Listado de levante: listado de carga que identifica grupo de contenedores por levantar por marca y peso.
- Corner fitting: accesorio estructural en las esquinas del contenedor que permite izaje, sujeción y apilación segura.

[Descripción del Proceso]
El levante de contenedores retira contenedores consolidados con cobre desde CG, usando tractocamión y Reach Stacker (RS). Los contenedores se trasladan hacia el sector de Stacking para pre-stack y posterior embarque.

[Inicio Operación — DDS / ART]
DDS a cargo del encargado de tierra del turno, registrado en "ANG-P-088 R-005 Registro DDS".

[Sellado con Equipos Móviles]
- El tarjador inicia la colocación de sellos después de revisar el listado de secuencia de levante.
- El movilizador verifica que todas las puertas estén correctamente cerradas (puede usar martillo).
- Una vez toda la banda esté sellada, el tarjador informa por radio al operador de portacontenedores para iniciar.
- Estrictamente prohibido sellar el contenedor mientras se está levantando en el mismo pasillo.
- El tarjador y movilizador no podrán invadir el área de giro de los equipos en operación.
- Toda comunicación entre coordinador, tarjador y operadores: solo por vía radial.
- Cuando inicie el levante, tarjador y movilizador se resguardan en zona segura.
- La persona responsable de colocar el sello es exclusivamente el tarjador.

[Sellado sin Equipos Móviles]
- El sellado del contenedor se iniciará una vez que toda la marca haya sido completamente consolidada.
- Estrictamente prohibido sellar mientras se está consolidando.

[Levante de Contenedor con Personal Completo]
- Operadores revisan su equipo asignado y completan su Check List antes de iniciar.
- Control Room informa vía radial al operador de portacontenedores qué contenedores se levantarán.

[EPP — ANG-P-088]
- Casco, sunflap/crema UV, lentes oscuros (día) y claros (noche), guantes antigolpe-anticortes, zapatos punta de acero, barbiquejo.


-- ANG-P-093: POSICIONAMIENTO DE CONTENEDORES VACÍOS --

[Objetivo]
Establecer los pasos secuenciales para el proceso de posicionamiento de contenedores vacíos en sector CG para su posterior consolidación con cobre.

[Definiciones]
- Secuencia de posicionamiento: listado de carga que identifica grupo de contenedores por levantar por marca y peso.
- Corner fitting: accesorio estructural en las esquinas del contenedor para izaje, sujeción y apilación segura.

[Inicio Operación — DDS / ART]
DDS a cargo del encargado de tierra del turno, registrado en "ANG-P-093 R-005 Registro DDS".

[Revisión de Plano y Asignación de Contenedor]
- El tarjador revisa la secuencia de posicionamiento y el plano de posicionamiento.
- El plano indica la ubicación exacta donde debe colocarse la marca asignada según la secuencia.
- Una vez revisados secuencia y plano, el tarjador da señal al operador del portacontenedores y se resguarda en zona segura.
- El tarjador registra marca, tipo de contenedor, total posicionado y tiempos.
- Tarjador / Coordinador mantendrá una distancia mínima de 10 metros del radio de giro del equipo.
- Cualquier modificación de postura de contenedores por temas de espacio: informar al coordinador.
- Toda comunicación entre coordinador, tarjador y operadores: solo por vía radial.
- Queda prohibida cualquier interacción directa entre el personal y la maquinaria.

[Posicionamiento de Contenedor]
- Los operadores revisan el equipo y completan su Check List antes de iniciar.
- Operadores del tractocamión se dirigen al área de depósito. Una vez cargado el contenedor vacío, se desplazan al CG indicado por el tarjador.
- El operador del portacontenedores espera la señal del tarjador para iniciar el posicionamiento.
- El Reach Stacker se ubica frente a la rampla y procede a izar el contenedor.
- Al finalizar la faena, los operadores cierran el horómetro y estacionan equipos en la zona designada.

[EPP — ANG-P-093]
- Casco, sunflap/crema UV, lentes oscuros (día) y claros (noche), guantes antigolpe-anticortes, zapatos punta de acero, barbiquejo.


== ÁREA: PATIO DE COBRE ==

-- ANG-P-096: MARCADO Y VERIFICACIÓN DE PAQUETES DE COBRE --

[Objetivo]
Estandarizar la faena de marcado y verificación de paquetes de cobre.

[Definiciones]
- Packing List o Loteo: listado de carga que identifica un lote.
- Paleta: elemento confeccionado en madera o acrílico.
- Lote: conjunto de mercancías. ID: identificación de mercancías.

[Inicio Operación — DDS / ART]
DDS a cargo del coordinador de operaciones terrestres o encargado de tierra. ART mediante F-SIG-051.

[Proceso de Marcado y Verificación]
- El marcador verifica la identidad del paquete según el Packing List.
- Se verifica que el ID del lote coincida con lo indicado en la documentación.
- La paleta (de madera o acrílico) se coloca en el paquete con la información correspondiente.
- En caso de discrepancias entre lo físico y lo documentado: informar al encargado de tierra de inmediato.
- Prohibido manipular paquetes de cobre sin los EPP correspondientes.

[EPP — ANG-P-096]
- Casco, sunflap/crema UV, lentes oscuros (día) y claros (noche), guantes antigolpe-anticortes, zapatos punta de acero.


-- ANG-P-150: ENZUNCHADO DE ATADOS DE COBRE --

[Objetivo]
Estandarizar la faena de enzunchado de atados de cobre.

[Inicio Operación — DDS / ART]
DDS a cargo del supervisor antes de iniciar el turno. ART cuando exista actividad no rutinaria.

[Proceso de Enzunchado]
- El supervisor verifica que el personal cuente con todos los EPP antes de iniciar.
- El enzunchado debe realizarse siguiendo la secuencia indicada por el supervisor.
- Durante el enzunchado: uso obligatorio de guantes tipo cabritilla u otro material adecuado.
- Verificar que el enzunchado quede firme y correctamente posicionado antes de mover el atado.
- En caso de enzunchado deficiente o roto: detener la operación e informar al supervisor.
- Prohibido permanecer bajo cargas suspendidas durante el traslado de atados.
- Mantener el área de trabajo limpia y ordenada en todo momento.

[EPP — ANG-P-150]
- Casco, sunflap/crema UV, lentes de seguridad, guantes tipo cabritilla u otro material adecuado, zapatos punta de acero.


-- ANG-P-199: INGRESO Y SALIDA DE CONVOY --

[Objetivo]
Estandarizar las actividades de ingreso y salida del convoy al área Patio de Cobre.

[Inicio Operación — DDS / ART]
Encargado de tierra instruye a personal en DDS. Operadores grúa horquilla realizan Check List y notifican desviaciones.

[Preparación de Ingreso al Terminal]
- El maquinista o operador de piso se comunica vía radial con el encargado de tierra para coordinar ingreso.
- Encargado de tierra de patio cobre informa al supervisor del ferrocarril la línea de recepción y ubicación de cortes.
- Encargado de tierra verifica que las líneas estén expeditas y libres de personal y objetos antes de autorizar el ingreso.
- Encargado de tierra da aviso del ingreso y solicita que el área esté totalmente despejada.

[Ingreso de Convoy a Patio Cobre]
- El encargado de tierra coordina con personal del ferrocarril la línea de ingreso.
- El encargado de tierra o Control Patio verifica que no exista personal o maquinaria dentro de la vía férrea ni en el gálibo pintado en el piso.
- Autorizado el ingreso: la locomotora acciona la bocina dos veces y se retira el new jersey que bloquea la línea.
- Una vez estacionado el convoy: personal del Ferrocarril desacopla los carros. Los trabajadores de Ultraport NO tienen interacción con el convoy en esta actividad.
- PROHIBIDO que tracto camiones, horquillas y trabajadores efectúen movimientos en el mismo ramal férreo mientras el convoy se posiciona.
- Una vez la máquina desacoplada y carros asegurados: se firma documentación de aseguramiento. Solo entonces se inicia la preparación para la descarga.
- Después de que la máquina salga de la losa: se posiciona un new jersey de concreto bloqueando la vía.
- Ultraport NO ingresará ningún convoy sin tener a la vista la documentación que ampare la carga.

[Salida de Convoy de Patio Cobre]
- Una vez descargados los carros, Control Patio o encargado de tierra autorizan el ingreso de locomotora para acople.
- Antes de ingresar y al salir del Patio: el conductor del convoy hace sonar la bocina al menos dos veces.
- PROHIBIDO que tracto camiones, horquillas y trabajadores efectúen movimientos en el mismo ramal férreo durante la maniobra de salida.
- Después de la salida del convoy: se posiciona nuevamente la barrera new jersey.

[EPP — ANG-P-199]
- Casco con cubrenuca y barbiquejo, crema con filtro UV, lentes de seguridad, guantes cabritilla, zapatos punta de acero, ropa corporativa de alta visibilidad.


-- ANG-P-200: DESPACHO DE COBRE --

[Objetivo]
Determinar los pasos secuenciales para el proceso de Despacho de Cobre desde Patio de Cobre.

[Inicio Operación — DDS / ART]
DDS a cargo del encargado de tierra. ART mediante F-SIG-051 antes de cada faena.

[Despacho de Cobre a Nave]
- Preparación: coordinar con encargado de tierra el tipo de cobre, cliente, cantidad y destino.
- Despacho con camiones internos: operadores de grúa horquilla toman paquetes y los cargan en camiones internos según packing list.
- Velocidad máxima: 25 km/h. Conductor aplica freno y espera en zona segura antes de la carga.

[Despacho a Consolidado]
- Preparación: encargado de tierra coordina con CFS Exportaciones la secuencia y destino.
- Con camiones internos: grúa horquilla carga los paquetes de cobre según orden de consolidado.
- Encargado de tierra verifica que la marca y cantidad coincidan con el packing list antes de despachar.

[Despacho en Camiones Calle — Ánodos]
- Preparación: encargado de tierra revisa la documentación del cliente antes de autorizar el ingreso.
- Proceso de despacho: grúa horquilla carga los ánodos en el camión calle según instrucciones.
- Conductor del camión calle: motor detenido, freno de parqueo activado, en zona segura durante la carga.

[Despacho en Camiones Calle — Cátodos]
- Similar al despacho de ánodos, con las especificaciones propias del tipo de carga (cátodos).
- Encargado de tierra verifica que el camión y la carga estén correctamente identificados.

[Despacho en Convoy]
- Preparación: coordinar con el operador ferroviario la cantidad de carros y su posicionamiento.
- Proceso de despacho: grúa horquilla carga los paquetes de cobre en los carros del convoy.
- PROHIBIDO que trabajadores interactúen con el convoy durante el movimiento de la locomotora.
- New jersey posicionado bloqueando la vía durante todo el proceso de carga.

[Reglas Generales]
- Toda comunicación entre coordinador, operadores y tarjadores: exclusivamente por vía radial.
- Prohibida la interacción directa entre personal y maquinaria en operación.
- Siempre verificar que el área esté libre de personal antes de mover la grúa horquilla.

[EPP — ANG-P-200]
- Casco, sunflap/crema UV, lentes oscuros (día) y claros (noche), guantes antigolpe-anticortes, zapatos punta de acero, barbiquejo.


-- ANG-P-201: RECEPCIÓN Y ACOPIO DE COBRE --

[Objetivo]
Determinar los pasos secuenciales para la Recepción y Acopio de Cobre desde Convoy, Camiones Calle y Nave.

[Inicio Operación — DDS / ART]
DDS a cargo del encargado de tierra. ART mediante F-SIG-051 antes de cada faena.

[Descarga desde Convoy]
- Preparación general: encargado de tierra coordina con el operador ferroviario la cantidad de carros y el productor.
- Preparación Codelco Chuqui CCC-P: proceso específico para este tipo de cobre con sus propias verificaciones.
- Descarga de convoy: grúa horquilla descarga los paquetes de cobre desde los carros según packing list.
- PROHIBIDO que trabajadores interactúen con el convoy durante el movimiento de la locomotora.
- Capturación / tarja en piso desde convoy: control patio registra los paquetes descargados en piso.
- Capturación / tarja directo a celda desde convoy: control patio registra los paquetes asignados directamente a celda.

[Recepción desde Camiones de Calle]
- Preparación: encargado de tierra verifica la documentación del cliente antes de autorizar el ingreso.
- Descarga de camiones calle: grúa horquilla descarga los paquetes de cobre según instrucciones.
- Conductor del camión calle: motor detenido, freno de parqueo activado, en zona segura durante la descarga.
- Capturación / tarja de camiones calle: control patio registra los paquetes descargados.

[Recepción desde Nave]
- Preparación de descarga de tracto camión: encargado de tierra coordina circuito de camiones.
- Descarga de tracto camión: grúa horquilla descarga los paquetes desde el tracto camión.
- Capturación de cobre de nave cabotaje exportación: proceso documental específico.
- Capturación de cobre de nave cabotaje nacional (Ánodos): proceso específico para ánodos.

[Reglas Generales de Acopio de Cobre]
- El acopio se realiza en la celda asignada según el tipo de cobre y cliente.
- Los paquetes deben quedar correctamente apilados con palos de estiba entre cada plan.
- Verificar que las etiquetas y marcas de los paquetes sean legibles antes del acopio.
- En caso de paquetes dañados o sin identificación: segregar y reportar al encargado de tierra.

[Conteo Láminas Cobre Codelco]
- El conteo de láminas de cobre Codelco se realiza según protocolo específico del cliente.
- El control patio registra el conteo y lo comunica al encargado de tierra.

[EPP — ANG-P-201]
- Casco, sunflap/crema UV, lentes oscuros (día) y claros (noche), guantes antigolpe-anticortes, zapatos punta de acero, barbiquejo.
`;

// ── SYSTEM PROMPTS POR MODO ───────────────────────────────────────────────────
const makeSystemPrompt = (mode, kb) => `Eres ULTR-AI, el asistente operativo oficial de Ultraport Angamos para el área de ${mode === "maritimo" ? "Operaciones Marítimas" : "Operaciones Terrestres"}.

Tu única fuente de información son los procedimientos oficiales de Ultraport Angamos que se te proporcionan a continuación. NUNCA inventes datos.

BASE DOCUMENTAL:
${kb}

REGLAS DE RESPUESTA:
1. Responde siempre en español.
2. Formato: usa **negritas** para términos clave, listas numeradas para pasos secuenciales, guiones para requisitos.
3. NO uses encabezados Markdown (# ## ###). Estructura con negritas y saltos de línea.
4. BREVEDAD: Si te preguntan por una actividad a grandes rasgos, responde en 3-5 puntos clave. Solo entra en detalle si el usuario lo pide explícitamente.
5. Identifica siempre el procedimiento al inicio (ej: ANG-P-105, ANG-P-201, etc.).
6. Si la pregunta abarca varios procedimientos, indícalo y responde cada uno brevemente.
7. Fuera del ámbito operativo de ${mode === "maritimo" ? "Operaciones Marítimas" : "Operaciones Terrestres"}: responde "Esta consulta está fuera del ámbito de ${mode === "maritimo" ? "Operaciones Marítimas" : "Operaciones Terrestres"}. Si necesitas información de otra área, cambia el modo en el encabezado."
8. Si no está en los documentos: responde "No encontré esto en la documentación oficial. Consulta al Supervisor de Turno."
9. Al final de cada respuesta incluye (sin Markdown):
FOLLOWUP:opción 1|opción 2|opción 3
Elige 2-3 preguntas de seguimiento cortas y relevantes al tema respondido.`;

// ── HELPERS ───────────────────────────────────────────────────────────────────
function parseResponse(text) {
  const match = text.match(/FOLLOWUP:(.+)$/m);
  if (!match) return { clean: text.trim(), followups: [] };
  const followups = match[1].split("|").map(s => s.trim()).filter(Boolean);
  const clean = text.replace(/FOLLOWUP:.+$/m, "").trim();
  return { clean, followups };
}

function detectProc(text) {
  const all = Object.keys(PROC_LABEL);
  return all.find(p => text.includes(p)) || null;
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

// ── COMPONENTES ───────────────────────────────────────────────────────────────
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
          {proc && !isUser && (
            <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8}}>
              <div style={{background:PROC_COLOR[proc]||BRAND.navy,color:"white",fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:20,letterSpacing:".06em"}}>
                {proc} — {PROC_LABEL[proc]}
              </div>
            </div>
          )}
          <div style={{whiteSpace:"pre-line"}} dangerouslySetInnerHTML={{__html:isUser?msg.content:renderMarkdown(msg.content)}}/>
        </div>
        {!isUser && msg.followups && msg.followups.length > 0 && (
          <div style={{width:"100%"}}>
            <div style={{fontSize:10,color:BRAND.gray500,fontWeight:600,textTransform:"uppercase",letterSpacing:".07em",marginBottom:5}}>Consultas relacionadas</div>
            <div style={{display:"flex",flexDirection:"column",gap:4}}>
              {msg.followups.map((fq,i) => (
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

// ── MENÚ DESPLEGABLE ──────────────────────────────────────────────────────────
function MenuPanel({ mode, onSelect, onClose }) {
  const [openProcs, setOpenProcs] = useState({});
  const [openAreas, setOpenAreas] = useState({});

  const toggleProc = (key) => setOpenProcs(p => ({...p, [key]: !p[key]}));
  const toggleArea = (key) => setOpenAreas(p => ({...p, [key]: !p[key]}));

  const modeConf = MODE_CONFIG[mode];

  return (
    <div style={{position:"absolute",top:0,left:0,right:0,bottom:0,background:BRAND.gray100,zIndex:10,display:"flex",flexDirection:"column",borderRadius:24,overflow:"hidden"}}>
      <div style={{background:modeConf.gradient,padding:"14px 16px 12px",display:"flex",alignItems:"center",gap:10,borderBottom:`3px solid ${BRAND.red}`}}>
        <button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",color:"white",fontSize:18,lineHeight:1,padding:"0 4px"}}>←</button>
        <div style={{color:"#FFFFFF",fontWeight:700,fontSize:14}}>{modeConf.emoji} {modeConf.label}</div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"12px"}}>
        {mode === "maritimo" && MENU_MARITIMO.map((p) => (
          <div key={p.proc} style={{marginBottom:8}}>
            <button onClick={() => toggleProc(p.proc)}
              style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",background:PROC_COLOR[p.proc]||BRAND.navy,borderRadius:10,padding:"8px 12px",border:"none",cursor:"pointer",marginBottom:2}}>
              <span style={{color:"white",fontWeight:700,fontSize:11,letterSpacing:".04em",textAlign:"left"}}>{p.proc} — {p.label}</span>
              <span style={{color:"white",fontSize:14,flexShrink:0}}>{openProcs[p.proc] ? "▲" : "▼"}</span>
            </button>
            {openProcs[p.proc] && p.items.map((item, i) => (
              <button key={i} onClick={() => { onSelect(`Explícame: ${item} (${p.proc})`); onClose(); }}
                style={{display:"flex",alignItems:"center",gap:6,width:"100%",background:BRAND.white,border:`1px solid ${BRAND.gray300}`,borderRadius:8,padding:"7px 12px 7px 20px",fontSize:12,color:BRAND.gray700,cursor:"pointer",fontFamily:"inherit",textAlign:"left",marginBottom:3}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=BRAND.red;e.currentTarget.style.background="#FFF5F7";}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=BRAND.gray300;e.currentTarget.style.background=BRAND.white;}}>
                <span style={{color:PROC_COLOR[p.proc]||BRAND.navy,fontWeight:700,fontSize:13}}>›</span>{item}
              </button>
            ))}
          </div>
        ))}

        {mode === "terrestre" && MENU_TERRESTRE.map((area) => (
          <div key={area.area} style={{marginBottom:10}}>
            <button onClick={() => toggleArea(area.area)}
              style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",background:area.color,borderRadius:10,padding:"8px 12px",border:"none",cursor:"pointer",marginBottom:4}}>
              <span style={{color:"white",fontWeight:800,fontSize:12,letterSpacing:".05em"}}>{area.area.toUpperCase()}</span>
              <span style={{color:"white",fontSize:14}}>{openAreas[area.area] ? "▲" : "▼"}</span>
            </button>
            {openAreas[area.area] && area.procs.map((p) => (
              <div key={p.proc} style={{marginBottom:6,paddingLeft:8}}>
                <button onClick={() => toggleProc(p.proc)}
                  style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",background:PROC_COLOR[p.proc]||area.color,borderRadius:8,padding:"7px 12px",border:"none",cursor:"pointer",marginBottom:2,opacity:0.9}}>
                  <span style={{color:"white",fontWeight:700,fontSize:11,textAlign:"left"}}>{p.proc} — {p.label}</span>
                  <span style={{color:"white",fontSize:12,flexShrink:0}}>{openProcs[p.proc] ? "▲" : "▼"}</span>
                </button>
                {openProcs[p.proc] && p.items.map((item, i) => (
                  <button key={i} onClick={() => { onSelect(`Explícame: ${item} (${p.proc})`); onClose(); }}
                    style={{display:"flex",alignItems:"center",gap:6,width:"100%",background:BRAND.white,border:`1px solid ${BRAND.gray300}`,borderRadius:8,padding:"7px 12px 7px 24px",fontSize:12,color:BRAND.gray700,cursor:"pointer",fontFamily:"inherit",textAlign:"left",marginBottom:3}}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor=BRAND.red;e.currentTarget.style.background="#FFF5F7";}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor=BRAND.gray300;e.currentTarget.style.background=BRAND.white;}}>
                    <span style={{color:PROC_COLOR[p.proc]||area.color,fontWeight:700,fontSize:13}}>›</span>{item}
                  </button>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── PANTALLA SELECTOR DE MODO ─────────────────────────────────────────────────
function ModeSelector({ onSelect }) {
  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",minHeight:"100vh",background:`linear-gradient(160deg,${BRAND.navy} 0%,${BRAND.navyLight} 100%)`,fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif",padding:16}}>
      <div style={{width:"100%",maxWidth:400,background:BRAND.white,borderRadius:24,overflow:"hidden",boxShadow:"0 24px 60px rgba(0,0,0,.4)"}}>
        <div style={{background:`linear-gradient(135deg,${BRAND.navy},${BRAND.navyLight})`,padding:"24px 20px 20px",borderBottom:`3px solid ${BRAND.red}`,textAlign:"center"}}>
          <div style={{display:"flex",justifyContent:"center",marginBottom:10}}>
            <div style={{width:52,height:52,borderRadius:12,overflow:"hidden",border:`2px solid rgba(255,255,255,0.3)`}}>
              <LogoUltraport/>
            </div>
          </div>
          <div style={{color:"white",fontWeight:800,fontSize:20,letterSpacing:".01em"}}>ULTR-AI</div>
          <div style={{color:"#D0EAF7",fontSize:12,marginTop:4}}>Asistente Operativo — Ultraport Angamos</div>
        </div>
        <div style={{padding:"24px 20px"}}>
          <div style={{fontSize:13,color:BRAND.gray500,textAlign:"center",marginBottom:20,fontWeight:600,textTransform:"uppercase",letterSpacing:".08em"}}>
            ¿Qué área vas a consultar?
          </div>
          <button onClick={() => onSelect("maritimo")}
            style={{width:"100%",display:"flex",alignItems:"center",gap:14,background:`linear-gradient(135deg,#3AAEDC,#2B9DC8)`,border:"none",borderRadius:14,padding:"16px 18px",cursor:"pointer",marginBottom:12,fontFamily:"inherit"}}>
            <span style={{fontSize:28}}>⚓</span>
            <div style={{textAlign:"left"}}>
              <div style={{color:"white",fontWeight:700,fontSize:15}}>Operaciones Marítimas</div>
              <div style={{color:"rgba(255,255,255,0.75)",fontSize:11,marginTop:2}}>9 procedimientos — Nave, muelle y transferencia</div>
            </div>
          </button>
          <button onClick={() => onSelect("terrestre")}
            style={{width:"100%",display:"flex",alignItems:"center",gap:14,background:`linear-gradient(135deg,#7A6040,#5B4A2E)`,border:"none",borderRadius:14,padding:"16px 18px",cursor:"pointer",fontFamily:"inherit"}}>
            <span style={{fontSize:28}}>🏗️</span>
            <div style={{textAlign:"left"}}>
              <div style={{color:"white",fontWeight:700,fontSize:15}}>Operaciones Terrestres</div>
              <div style={{color:"rgba(255,255,255,0.75)",fontSize:11,marginTop:2}}>8 procedimientos — CFS Exportaciones y Patio de Cobre</div>
            </div>
          </button>
        </div>
        <div style={{padding:"0 20px 20px",textAlign:"center",fontSize:10,color:BRAND.gray500}}>
          Respuestas basadas exclusivamente en documentación oficial Ultraport
        </div>
      </div>
    </div>
  );
}

const SUGGESTED = {
  maritimo: [
    "¿Cuáles son los pasos antes de comenzar una faena?",
    "¿Qué EPP necesito para heavy lift?",
    "¿Cómo se realiza el izaje de una batea?",
  ],
  terrestre: [
    "¿Cómo se inicia la recepción de cobre desde convoy?",
    "¿Cuáles son las medidas de seguridad en el consolidado de cobre?",
    "¿Qué debo verificar antes de iniciar el levante de contenedores?",
  ],
};

// ── APP PRINCIPAL ─────────────────────────────────────────────────────────────
export default function UltrAI() {
  const [mode, setMode] = useState(null); // null = pantalla selector
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({behavior:"smooth"}); }, [messages, loading]);

  const selectMode = (m) => {
    setMode(m);
    const mConf = MODE_CONFIG[m];
    setMessages([{
      id:0, role:"assistant", type:"welcome",
      content:`Hola. Soy **ULTR-AI** en modo **${mConf.label}**.\n\nPuedes consultarme sobre cualquier actividad, procedimiento de seguridad, EPP u operaciones de esta área. Respondo solo con información de la documentación oficial.\n\nUsa el menú 📋 para explorar todos los procedimientos disponibles, o escribe tu consulta directamente.`
    }]);
  };

  const changeMode = () => {
    setMode(null);
    setMessages([]);
    setInput("");
    setShowMenu(false);
  };

  const sendMessage = async (text) => {
    const query = (text || input).trim();
    if (!query || loading) return;
    setInput("");

    const userMsg = { id: Date.now(), role:"user", type:"user", content: query };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      const kb = mode === "maritimo" ? KB_MARITIMO : KB_TERRESTRE;
      const systemPrompt = makeSystemPrompt(mode, kb);

      const conversationHistory = [...messages, userMsg]
        .filter(m => m.id !== 0)
        .map(m => ({ role: m.role, content: m.content }));

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "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",
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: systemPrompt,
          messages: conversationHistory
        })
      });

      if (!response.ok) throw new Error(`Error API: ${response.status}`);

      const data = await response.json();
      const rawText = data.content.filter(b => b.type === "text").map(b => b.text).join("\n");
      const { clean, followups } = parseResponse(rawText);
      const proc = detectProc(clean);

      setMessages(prev => [...prev, {
        id: Date.now() + 1, role:"assistant", type:"ai",
        content: clean, proc, followups
      }]);

    } catch (err) {
      setMessages(prev => [...prev, {
        id: Date.now() + 1, role:"assistant", type:"error",
        content: "Hubo un error al procesar tu consulta. Por favor intenta nuevamente."
      }]);
    } finally {
      setLoading(false);
    }
  };

  if (!mode) return <ModeSelector onSelect={selectMode}/>;

  const modeConf = MODE_CONFIG[mode];

  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",minHeight:"100vh",background:`linear-gradient(160deg,${BRAND.navy} 0%,${BRAND.navyLight} 100%)`,fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif",padding:16}}>
      <div style={{width:"100%",maxWidth:400,height:"88vh",maxHeight:780,background:BRAND.gray100,borderRadius:24,display:"flex",flexDirection:"column",overflow:"hidden",boxShadow:"0 24px 60px rgba(0,0,0,.4)",position:"relative"}}>

        {showMenu && <MenuPanel mode={mode} onSelect={sendMessage} onClose={() => setShowMenu(false)}/>}

        {/* ── HEADER ── */}
        <div style={{background:modeConf.gradient,padding:"12px 14px 10px",display:"flex",alignItems:"center",gap:8,borderBottom:`3px solid ${BRAND.red}`}}>
          <div style={{width:40,height:40,borderRadius:10,overflow:"hidden",flexShrink:0,border:`2px solid rgba(255,255,255,0.25)`}}>
            <LogoUltraport/>
          </div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{color:"#FFFFFF",fontWeight:700,fontSize:14,letterSpacing:".01em"}}>ULTR-AI</div>
            <div style={{color:"rgba(255,255,255,0.75)",fontSize:10,display:"flex",alignItems:"center",gap:4,marginTop:1}}>
              <span style={{width:6,height:6,borderRadius:"50%",background:"#34D399",display:"inline-block",flexShrink:0}}/>
              {modeConf.emoji} {modeConf.short} — Base documental activa
            </div>
          </div>
          <button onClick={changeMode} title="Cambiar modo"
            style={{background:"rgba(255,255,255,0.15)",border:"1px solid rgba(255,255,255,0.3)",borderRadius:8,padding:"5px 8px",cursor:"pointer",color:"white",fontSize:10,fontFamily:"inherit",fontWeight:600,whiteSpace:"nowrap"}}>
            ⇄ Cambiar
          </button>
          <button onClick={() => setShowMenu(true)} title="Ver procedimientos"
            style={{background:"rgba(255,255,255,0.15)",border:"1px solid rgba(255,255,255,0.3)",borderRadius:8,padding:"5px 8px",cursor:"pointer",color:"white",fontSize:13,fontFamily:"inherit"}}>
            📋
          </button>
        </div>

        {/* ── MENSAJES ── */}
        <div style={{flex:1,overflowY:"auto",padding:"16px 12px",display:"flex",flexDirection:"column"}}>
          {messages.map(msg => <Message key={msg.id} msg={msg} onFollowup={sendMessage}/>)}

          {messages.length === 1 && (
            <div style={{marginTop:8}}>
              <div style={{fontSize:11,color:BRAND.gray500,fontWeight:600,textTransform:"uppercase",letterSpacing:".07em",marginBottom:8,paddingLeft:4}}>Consultas frecuentes</div>
              {SUGGESTED[mode].map((s,i) => (
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
              placeholder={`Consulta sobre ${modeConf.short}...`} rows={1}
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
