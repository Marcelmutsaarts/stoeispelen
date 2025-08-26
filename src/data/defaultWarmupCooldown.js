const defaultWarmupActivities = [
  {
    id: 'warmup-001',
    title: 'Omgangsbaan dierbewegingen',
    type: 'warmup',
    description: 'Individueel naar de overkant bewegen als dier (tijgeren, ebi/slang, kikkersprongen, kreeft, etc.).',
    duration: '5-10 minuten',
    tags: ['beweging', 'dieren', 'individueel'],
    isDefault: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'warmup-002',
    title: 'Rollen voorover en achterover',
    type: 'warmup',
    description: 'Individueel van rollen zonder afslaan naar rollen mét afslaan. Methodische opbouw: laag → hoog, langzaam → snel, klein → groot, dichtbij → ver weg, zonder afslaan → met afslaan.',
    duration: '10-15 minuten',
    tags: ['rollen', 'methodisch', 'individueel'],
    isDefault: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'warmup-003',
    title: 'Het gezonde hamburger spel',
    type: 'warmup',
    description: 'Commando spel: "hamburger" = buik op de grond, "Big Mac" = twee spelers op elkaar, "Super Big Mac" = drie spelers op elkaar. Laatste speler/groep doet opdracht (bijv. sit-ups).',
    duration: '5-8 minuten',
    tags: ['commando spel', 'groep', 'reactie'],
    isDefault: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'warmup-004',
    title: 'Sumo met kussen',
    type: 'warmup',
    description: 'Twee spelers duwen elkaar met stootkussen in de cirkel. Regels: alleen via kussen duwen, bij overtreding herstart.',
    duration: '3-5 minuten per ronde',
    tags: ['sumo', 'kussen', 'duwen', 'koppels'],
    isDefault: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'warmup-005',
    title: 'Piraten en parels',
    type: 'warmup',
    description: 'Twee piraten vinden parels (tennisballen) en strijden om wie de parels mag hebben. Gewonnen als tegenstander beide ballen kwijt is of na 2 minuten.',
    duration: '2-3 minuten per ronde',
    tags: ['piraten', 'tennisballen', 'stoeien', 'koppels'],
    isDefault: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'warmup-006',
    title: 'Burenruzie',
    type: 'warmup',
    description: 'Twee groepen verdedigen hun land en proberen spelers van de tegenpartij gevangen te nemen. Spelen op knieën, gevangenisvak aanwezig.',
    duration: '10-15 minuten',
    tags: ['groepsspel', 'knieën', 'gevangenen', 'verdedigen'],
    isDefault: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'warmup-007',
    title: 'Schaak stoeien',
    type: 'warmup',
    description: 'Twee spelers houden elkaar in stoeivorm vast. Iedere speler krijgt per beurt 3 zetten (bijv. vastpakken, voet verzetten). Na 3 zetten wissel. Doel: ander op de rug krijgen en controle houden.',
    duration: '5-10 minuten',
    tags: ['schaak', 'stoeien', 'beurten', 'strategie'],
    isDefault: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'warmup-008',
    title: 'Koalabeer',
    type: 'warmup',
    description: 'Speler A zit als koala (armen en benen ingehaakt) op rug van speler B. Speler B probeert de koala af te schudden. Regels: koala mag niet loslaten, ander mag niet achterover springen.',
    duration: '2-3 minuten per ronde',
    tags: ['koala', 'rug', 'afschudden', 'koppels'],
    isDefault: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const defaultCooldownActivities = [
  {
    id: 'cooldown-001',
    title: 'Piratenschat',
    type: 'cooldown',
    description: 'Piraten hebben een schat gevonden en willen die voor zichzelf. Doel: tegenstanders de zee induwen (over de lijn = zee). Regels: niet staan, voorzichtig met kleding.',
    duration: '5-10 minuten',
    tags: ['piraten', 'schat', 'duwen', 'lijn'],
    isDefault: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'cooldown-002',
    title: 'Schatbewaarder',
    type: 'cooldown',
    description: 'Eén speler verdedigt een bal, de ander probeert de bal te pakken. Alleen handen gebruiken om bal te veroveren. 30 seconden per beurt.',
    duration: '30 seconden per beurt',
    tags: ['schat', 'bal', 'verdedigen', 'handen'],
    isDefault: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'cooldown-003',
    title: 'Hollandse leeuwen',
    type: 'cooldown',
    description: 'Gnoes steken rivier over, leeuwen (op knieën) proberen gnoes vast te houden. 3 tellen vasthouden = gnoe wordt leeuw. Vrij gebied aan einde mat. Varianten: staand spelen, rug vasthouden ipv tillen.',
    duration: '10-15 minuten',
    tags: ['leeuwen', 'gnoes', 'rivier', 'knieën', 'vasthouden'],
    isDefault: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'cooldown-004',
    title: 'Boef en politie',
    type: 'cooldown',
    description: 'Helft is boef, helft politie. Doel: ander 5 tellen in houdgreep houden. Daarna rol bekendmaken en eventueel wisselen. Einddoel: wie heeft de meerderheid na 10 minuten?',
    duration: '10 minuten',
    tags: ['boef', 'politie', 'houdgreep', 'rollen'],
    isDefault: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'cooldown-005',
    title: 'Krabben-eiland',
    type: 'cooldown',
    description: 'Eilandbewoners vs. krabben. Wordt een speler met billen/rug/buik op de mat geduwd, dan wordt die ook krab. Doel: krabben nemen eiland over. Varianten: veld groter/kleiner maken, hand op de mat = ook af.',
    duration: '10-15 minuten',
    tags: ['krabben', 'eiland', 'mat', 'duwen', 'besmetting'],
    isDefault: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const defaultWarmupCooldownActivities = [...defaultWarmupActivities, ...defaultCooldownActivities];

export default defaultWarmupCooldownActivities;
export { defaultWarmupActivities, defaultCooldownActivities };