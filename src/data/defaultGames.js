const defaultGames = [
  {
    id: "default-game-001",
    title: "Uit balans halen gelijke positie",
    objective: "Vanuit hurk-positie (op de knieën) is het doel elkaar uit balans te halen. Hierbij moet je zorgen zelf balans te houden zonder te steunen op de mat (met de handen/ellenbogen/hoofd).",
    leftColumn: {
      startPosition: "Zittend op de knieën",
      playerA: "Zit op de knieën en probeert speler B uit balans te halen door een lichaamsdeel anders dan de onderbenen op de mat te krijgen. Probeert het LZP boven het eigen steunvlak te houden.",
      playerB: "Zit op de knieën en probeert speler A uit balans te halen door een lichaamsdeel anders dan de onderbenen op de mat te krijgen. Probeert het LZP boven het eigen steunvlak te houden.",
      rules: "Het tweetal start op allebei op de knieën. Wanneer iemand zijn/haar hand op de mat zet krijgt de ander 1 punt. Twee handen op de mat = 2 punten. Een grip om de nek mag alleen als daar een arm bij zit."
    },
    rightColumn: {
      image: "",
      modifications: {
        S: "Meerdere aanvallers die A uit balans proberen te krijgen / het bokje mag proberen in guard te gaan zitten en/of op te staan. Dan moet de aanvaller meer controle houden over het lichaam van de verdediger.",
        T: "",
        R: "Als A tijdens het spel twee handen gesloten om het been van B krijgt dan krijgt A 1 punt. OF A en B mogen geen grips meer maken (dus alleen werken met gesloten handen)",
        O: "",
        O2: "",
        M: ""
      },
      tips: "- Vanuit een goede basis kan je kracht geven en ontvangen zonder mobiliteit en positie te verliezen\n- Rots & water: Wissel weerstand met meebewegen af\n- LZP / actieve heupen: Het verplaatsen / verlagen van het LZP kan helpen om een balans voordeel te krijgen t.o.v. de tegenstander\n- De hand van de tegenstander bij de pols controleren 2 handen op 1\n- Steunpunten van de ander blokkeren\n- Basis zo breed en laag mogelijk maken",
      youtubeUrl: ""
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "default-game-002",
    title: "Uit balans halen ongelijke positie",
    objective: "Speler B moet speler A proberen uit balans te halen terwijl deze in bokje/turtle positie probeert te blijven zitten.",
    leftColumn: {
      startPosition: "Bokje/turtle",
      playerA: "Zit als bokje/turtle op de mat. Met als doel deze positie te behouden zonder om te vallen of met de buik op de mat te komen.",
      playerB: "Heeft als doel A uit balans te halen. Met de buik plat op de mat te duwen of om te duwen. Lukt dit dan heeft B 1 punt en starten ze weer opnieuw in de beginpositie",
      rules: "Een grip om de nek mag alleen als daar een arm bij zit. Een kanteling op de zijkant of rug is voldoende voor B"
    },
    rightColumn: {
      image: "/images/spel_2_image.png",
      modifications: {
        S: "Meerdere aanvallers die A uit balans proberen te krijgen / het bokje mag proberen in guard te gaan zitten en/of op te staan. Dan moet de aanvaller meer controle houden over het lichaam van de verdediger.",
        T: "",
        R: "Als A tijdens het spel twee handen gesloten om het been van B krijgt dan krijgt A 1 punt. OF A en B mogen geen grips meer maken (dus alleen werken met gesloten handen)",
        O: "",
        O2: "",
        M: ""
      },
      tips: "- B: Van klein naar groot: kleine steunpunten eerst afbreken voor het uit balans halen van een groot steunpunt\n- B: Direction of force: Probeer bij sweeps en kantelingen krachten te leveren die haaks op de tegenstander staan\n- Tripod-principe: Hierbij ben jij als aanvaller met 3 steunpunten (bijv. 2 knieën en 1 hand) relatief stabiel, dit is hetzelfde voor de tegenstander. Het doel is om een voordeel te krijgen t.o.v. de tegenstander. Dus het liefst jij als aanvaller 3 steunpunten en de tegenstander 0. In de praktijk zal dit vaker 3:2, 3:1 or 2:1 zijn\n- B: Steunpunten van A blokkeren\n- A: Basis zo breed en laag mogelijk maken",
      youtubeUrl: ""
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "default-game-003",
    title: "Butterfly sweep",
    objective: "Speler A probeert vanuit de butterfly guard speler B op de rug te krijgen",
    leftColumn: {
      startPosition: "Butterfly guard",
      playerA: "Zit op de billen met de hakken tegen elkaar (kan de benen als een soort schild gebruiken). Het doel voor A om B op de rug te krijgen. Als dit lukt dan heeft A 1 punt.",
      playerB: "Zit op de knieën voor A en moet het doel van A voorkomen (maar mag niet staan). Als B niet op de rug is gekomen nadat de tijd is verstreken dan heeft B 1 punt.",
      rules: "Je mag de arm(en) vastpakken vanaf de polsen en het pak. Je mag niet in het gezicht komen en je mag geen vingers vastpakken. B mag niet op zijn/haar handen steunen."
    },
    rightColumn: {
      image: "/images/spel_3_image.png",
      modifications: {
        S: "",
        T: "",
        R: "A en B mogen geen grips meer maken (dus alleen werken met gesloten handen) OF B mag maximaal 1 hand op de mat plaatsen.",
        O: "B mag ook gaan staan",
        O2: "",
        M: ""
      },
      tips: "- B: probeer de kracht en richting van de weerstand in het spel te veranderen\n- B: Gebruik armen als \"frames\" om afstand en structuur te bewaren\n- A: Tripod-principe: Hierbij ben jij als aanvaller met 3 steunpunten (bijv. 2 knieën en 1 hand) relatief stabiel, dit is hetzelfde voor de tegenstander. Het doel is om een voordeel te krijgen t.o.v. de tegenstander. Dus het liefst jij als aanvaller 3 steunpunten en de tegenstander 0. In de praktijk zal dit vaker 3:2, 3:1 or 2:1 zijn\n- A: inside position, probeer 1 of twee armen onder de armen van B te krijgen en billen dan zo dicht mogelijk onder B te schuiven",
      youtubeUrl: ""
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "default-game-004",
    title: "Controleren bokje/turtle",
    objective: "Speler B moet zien te voorkomen dat speler A kan opstaan vanuit bokje/turtle",
    leftColumn: {
      startPosition: "Bokje/turtle",
      playerA: "Zit als bokje/turtle op de mat. Het doel is om uiteindelijk volledig op te staan. Dit is voor 1 punt.",
      playerB: "Moet A zo lang mogelijk zien te controleren en als het lukt plat te drukken op de mat en daar te houden.",
      rules: "Staan = wanneer A rechtop staat, 2 voeten op de mat en geen handen. Een grip om de nek mag alleen als daar een arm bij zit."
    },
    rightColumn: {
      image: "/images/spel_4_image.png",
      modifications: {
        S: "",
        T: "A heeft maar 30 seconden om te staan",
        R: "Als A op de rug kan worden gedrukt door B dan heeft B ook 1 punt OF A en B mogen geen grips meer maken (dus alleen werken met gesloten handen)",
        O: "Als B 1 been kan inhaken dan krijgt B 1 punt, 2 benen inhaken is 2 extra punten.",
        O2: "",
        M: "A moet proberen een object te pakken wat net buiten bereik ligt. B moet dit voorkomen."
      },
      tips: "- B: Structuur afbreken, van klein naar groot: kleine steunpunten eerst afbreken voor het uit balans halen van een groot steunpunt\n- B: Als je ledenmaten kan controleren dan deze juist intrekken\n- A: probeer je steunvlak groot te maken door breed en laag te zitten\n- A: Maak hoogte/ruimte op plekken waar het gewicht van Speler B niet is (bv. als gewicht op schouders is -> heupen liften; als gewicht op heupen is -> bovenlichaam liften)",
      youtubeUrl: ""
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "default-game-005",
    title: "Controleren ligpositie op buik",
    objective: "Speler B moet zien te voorkomen dat Speler A naar een bokje/turtle kan komen.",
    leftColumn: {
      startPosition: "Plat op de buik",
      playerA: "Ligt plat op zijn/haar buik en heeft als doel in bokje/turtle te komen (1 punt) om vervolgens volledig te gaan staan (2 punten)",
      playerB: "Moet proberen A zo lang mogelijk zien te controleren en als het lukt A te draaien op zijn/haar rug.",
      rules: "Wanneer A twee voeten plat op de grond heeft en geen handen meer op de mat dan is dit staan en 2 punten. Het omhoog komen naar turtle/bokje is voor A 1 punt. B moet A controleren voor 3 seconden voor 1 punt."
    },
    rightColumn: {
      image: "",
      modifications: {
        S: "",
        T: "",
        R: "Als B 1 been kan inhaken dan krijgt B 1 punt, 2 benen inhaken is 2 extra punten.",
        O: "Als A in het spel naar een defensieve/gelijke positie kan komen dan is dit ook 1 punt",
        O2: "",
        M: "A moet proberen een object te pakken wat net buiten bereik ligt. B moet dit voorkomen."
      },
      tips: "- B: probeer het borstbeen constant contact te laten houden met de rug van A\n- B: Van klein naar groot: kleine steunpunten eerst afbreken voor het uit balans halen van een groot steunpunt\n- B: probeer de polsen van A te controleren (van binnenuit) om te voorkomen dat A op zijn/haar ellenbogen kan komen\n- B: Actieve tenen in de mat\n- A: In lood-principe / frames: Gebruik de kracht van het skelet en niet van de spier(en). Zelfde principe als bij acrogym",
      youtubeUrl: ""
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "default-game-006",
    title: "Controleren ligpositie op rug",
    objective: "Speler B moet zien te voorkomen dat speler A naar de buik draait en tot bokje/turtle komt.",
    leftColumn: {
      startPosition: "Side control",
      playerA: "Ligt plat op zijn/haar rug en heeft als doel in bokje/turtle te komen of op de buik te draaien (1 punt).",
      playerB: "Moet proberen A zo lang mogelijk zien te controleren. Als B van de ene zijkant naar de andere kan draaien zonder dat A ontsnapt dan heeft B 1 punt.",
      rules: "Tijdens het spel mogen A en B niet staan. Na 1 minuut wisselen ze van rol."
    },
    rightColumn: {
      image: "/images/spel_6_image.png",
      modifications: {
        S: "",
        T: "",
        R: "Om 1 punt te krijgen moet B top komen (mount).",
        O: "Als A in het spel naar een defensieve/gelijke positie kan komen dan is dit ook 1 punt",
        O2: "",
        M: ""
      },
      tips: "- A: probeer actief het LZP weg te plaatsen van de druk van B (shrimpen)\n- A: In lood-principe / frames: Gebruik de kracht van het skelet en niet van de spier(en). Zelfde principe als bij acrogym\n- B: probeer contact te houden met het borstbeen op het borstbeen van de tegenstander\n- B: probeer de druk te vergroten of verplaatsen door je heupen te draaien en/of tenen actief in de mat te zetten\n- B: probeer bij het roteren de heupen van A te controleren met een grip (gestrekte arm)",
      youtubeUrl: ""
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "default-game-007",
    title: "Verdedigen van passeren",
    objective: "Speler A moet voorkomen dat speler B de benen kan passeren.",
    leftColumn: {
      startPosition: "Butterfly guard",
      playerA: "Zit op de billen met voeten vooruit. A moet proberen 4 connecties te houden (2 grips met handen en voeten ergens op het lichaam van van B)",
      playerB: "Zit op de knieën voor A en heeft als doel om alle connecties te verbreken",
      rules: "Alleen B mag gaan staan. Pas als A geen contact meer heeft met handen en voeten heeft B een punt."
    },
    rightColumn: {
      image: "/images/spel_7_image.png",
      modifications: {
        S: "",
        T: "",
        R: "Als A B op de billen of zijkant heup kan krijgen dan heeft A 1 punt",
        O: "In het spel mag B er nu ook voor kiezen om A plat op de rug te duwen voor 1 punt.",
        O2: "",
        M: ""
      },
      tips: "- A: Tripod-principe: Hierbij ben jij als aanvaller met 3 steunpunten (bijv. 2 knieën en 1 hand) relatief stabiel, dit is hetzelfde voor de tegenstander. Het doel is om een voordeel te krijgen t.o.v. de tegenstander. Dus het liefst jij als aanvaller 3 steunpunten en de tegenstander 0. In de praktijk zal dit vaker 3:2, 3:1 or 2:1 zijn\n- A: In lood-principe / frames: Gebruik de kracht van het skelet en niet van de spier(en). Zelfde principe als bij acrogym\n- B: Rots & water: Wissel weerstand+richting met meebewegen af\n- B: nieten, probeer ledenmaten van A spreekwoordelijk op de mat te nieten/controleren en daar te houden om meer ruimte te maken voor het passeren",
      youtubeUrl: ""
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "default-game-008",
    title: "Verdedigen vanaf de rug",
    objective: "Speler A moet voorkomen dat speler B vanuit side control naar mount komt.",
    leftColumn: {
      startPosition: "Side control",
      playerA: "Ligt op zijn/haar rug en heeft als doel om te voorkomen dat B in een dominantere positie komt.",
      playerB: "Heeft een controle van de zijkant en moet proberen om een dominantere positie te krijgen door op A te gaan zitten (mount).",
      rules: "B heeft hier maar 1 minuut de tijd voor en krijgt alleen 1 punt als het lukt om op A te gaan zitten waarbij het een volledige mount is. A mag niet gaan staan of omhoog komen (de rug/zijkant moet contact houden met de mat)."
    },
    rightColumn: {
      image: "/images/spel_8_image.png",
      modifications: {
        S: "",
        T: "Tijd verkorten of verlengen",
        R: "Als A de benen van B kan vangen dan starten ze weer in de beginpositie",
        O: "Als A kan staan dan krijgt A 1 punt",
        O2: "",
        M: ""
      },
      tips: "- A: In lood-principe / frames: Gebruik de kracht van het skelet en niet van de spier(en). Zelfde principe als bij acrogym\n- A: probeer je knie en ellebogen naar elkaar toe te brengen en gebruik deze als een schil om passeren moeilijker te maken\n- A: Heupen gebruiken (\"shrimpen\") om ruimte te herwinnen en frames opnieuw te plaatsen\n- B: nieten, probeer ledenmaten van A spreekwoordelijk op de mat te nieten/controleren en daar te houden om meer ruimte te maken voor het passeren\n- B: Separatie: Elleboog en knie van Speler B van elkaar scheiden",
      youtubeUrl: ""
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "default-game-009",
    title: "Rugzak verdedigen",
    objective: "Speler A moet voorkomen dat speler B hooks krijgt met de voeten.",
    leftColumn: {
      startPosition: "Backmount zonder hooks",
      playerA: "Zit op de grond en heeft als doel om te voorkomen dat B hooks krijgt",
      playerB: "Zit achter A met een seatbelt grip. De taak van B is om hooks te krijgen bij A.",
      rules: "De seatbeltgrip mag niet worden verbroken bij dit spel. Als speler B 2 hooks krijgt, begin je in de startpositie opnieuw. Speler B krijgt 1 punt met 1 hook en 2 punten met 2 hooks. We spelen 1 minuut beiden en kijken dan wie er de meeste punten heeft."
    },
    rightColumn: {
      image: "/images/spel_9_image.png",
      modifications: {
        S: "",
        T: "Langer of korter",
        R: "",
        O: "",
        O2: "",
        M: ""
      },
      tips: "- B: Ruimte Creëren: Elleboog en knie van A separeren om ruimte voor de haak te maken\n- B: Volgen: Bewegingen van Speler A volgen om centrale positie te behouden\n- A: Compact Blijven: Knieën en ellebogen dicht bij elkaar houden (\"T-rex arms\")\n- A: Handgevecht: De voet/been die de haak probeert te maken controleren/wegduwen\n- A: Asymmetrie: Op één heup leunen/liggen om die kant moeilijker aan te vallen te maken\n- A: Draaien: Proberen weg te draaien van de kant waar de haak dreigt",
      youtubeUrl: ""
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "default-game-010",
    title: "Controle verbreken op de rug vanuit side control",
    objective: "Speler A moet proberen de armen weer tussen zichzelf en speler B te krijgen vanuit side control.",
    leftColumn: {
      startPosition: "Side control",
      playerA: "Ligt op de rug met de armen naar buiten. De taak van Speler A is om de armen tussen zichzelf en speler B te krijgen.",
      playerB: "Zit/ligt naast speler A, met de armen om het bovenlichaam (hoofd en schouder bv). De taak van speler B is voorkomen dat speler A de armen er weer tussen krijgt.",
      rules: "Spel duurt 1 minuut per speler. Dan wisselen. Speler A verdient 1 punt per arm die hij er tussen krijgt. Als beide armen ertussen zijn, dan begin je weer in de uitgangspositie."
    },
    rightColumn: {
      image: "/images/spel_10_image.png",
      modifications: {
        S: "",
        T: "Langer of korter. Je kunt ook variëren in hoeveel de top speler mag rondgaan rond het lichaam (north-south en naar de andere kant en zelfs mount).",
        R: "",
        O: "",
        O2: "",
        M: ""
      },
      tips: "- B: Druk & Connectie: Borst-op-borst druk houden; dynamisch gewicht gebruiken\n- B: Isolatie: Proberen de onderste arm van Speler A te isoleren/controleren\n- B: Blokkeren: Voorkomen dat de knie van Speler A naar binnen komt\n- A: Frames: Gebruik maken van frames (onderarm, knie) om ruimte te forceren\n- A: Heupbeweging: Brug maken en/of \"shrimpen\" om ruimte te genereren voor het frame",
      youtubeUrl: ""
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "default-game-011",
    title: "Controle verbreken op de rug vanuit mount",
    objective: "Speler A moet de controle van B over de ruimte tussen ellenbogen en knieën aan minimaal één kant verbreken (frame terugwinnen)",
    leftColumn: {
      startPosition: "Mount",
      playerA: "De controle van B over de ruimte tussen ellenbogen en knieën aan minimaal één kant verbreken (frame terugwinnen)",
      playerB: "Mount positie behouden, ruimte tussen ellenbogen en knieën van A blijven controleren",
      rules: ""
    },
    rightColumn: {
      image: "/images/spel_11_image.png",
      modifications: {
        S: "",
        T: "",
        R: "",
        O: "",
        O2: "",
        M: ""
      },
      tips: "- B: Laag Blijven: Zwaartepunt laag houden, connectie behouden\n- B: Steunpunten: Gewicht/steunpunten op het lichaam van A gebruiken voor controle\n- A: Ruimte Creëren: Brug maken om B te destabiliseren; \"shrimpen\" om heupen te verplaatsen\n- A: Frame Herstel: Elleboog terug naar de knie brengen (kan via \"knee-elbow escape\" of \"kipping escape\"). Tegenstander laten posten (handen op mat) kan helpen",
      youtubeUrl: ""
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "default-game-012",
    title: "Rugzak ontsnappen",
    objective: "Speler B moet proberen uit de backmount te ontsnappen.",
    leftColumn: {
      startPosition: "Backmount met hooks",
      playerA: "Heeft 2 armen om B heen en 2 benen ingehaakt (zit als een soort rugzakje achter op B).",
      playerB: "Zit op zijn/haar billen en heeft als doel zijn/haar rug helemaal plat op de mat te krijgen of met zijn/haar buik helemaal naar A toe te draaien.",
      rules: "Niemand mag gaan staan tijdens het spel. Wanneer B 3 seconden zijn/haar rug op de mat kan houden of met de buik naar A toe kan draaien dan heeft B 1 punt. Na 2 minuten wisselen ze van rol."
    },
    rightColumn: {
      image: "/images/spel_12_image.png",
      modifications: {
        S: "",
        T: "",
        R: "Als A 1 been los heeft dan is dit ook goed voor 1 punt.",
        O: "",
        O2: "Wanneer je ontsnapt bent zoek je een nieuwe (vrije) tegenstander waarbij jij de controle gaat maken.",
        M: ""
      },
      tips: "- A: Momentum creëren: Door het versnellen van de massa meer momentum mee te krijgen\n- B: probeer je borstbeen tegen de rug van A te houden\n- A: controles afbreken, werk systematisch naar het afbreken van controles. Bijv eerst 1 been losmaken voordat je weg gaat draaien",
      youtubeUrl: ""
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "default-game-013",
    title: "Voorbij de voeten",
    objective: "Speler A moet proberen te voorkomen dat speler B voorbij de voeten komt.",
    leftColumn: {
      startPosition: "Guard op de rug",
      playerA: "Doel A (Top): Voorbij de benen/guard van Speler B komen (richting side control/mount).",
      playerB: "Doel B (Bottom): Pass voorkomen, voeten/knieën tussen zichzelf en Speler A houden (guard behouden).",
      rules: "Speler A mag geen wilde bewegingen maken voor de veiligheid. Het spel duurt per speler 1 minuut. Speler B krijgt 1 punt per seconde dat hij voorbij beide voeten van speler A is. Je telt dit hardop."
    },
    rightColumn: {
      image: "/images/spel_13_image.png",
      modifications: {
        S: "",
        T: "Korter of langer",
        R: "A en B mogen geen handen gebruiken",
        O: "",
        O2: "",
        M: ""
      },
      tips: "- De voeten van speler A kunnen naar beneden, naar boven en opzij. Manipuleer dit met je handen zo dat je er makkelijker voorbij komt\n- De controle van je voet en daarmee je knieën en je heupen kun je voorkomen door geen goede grips op je schenen toe te staan en zelf goede grips te pakken\n- Probeer bij het passeren te waven (benen wegsturen van de richting waar je naartoe gaat)\n- Wissel af in veel druk of weinig druk om de benen uit de weg te krijgen bij het passeren",
      youtubeUrl: ""
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "default-game-014",
    title: "Voorbij butterfly komen",
    objective: "Speler A moet voorkomen dat speler B voorbij de benen komt vanuit butterfly guard",
    leftColumn: {
      startPosition: "Butterfly guard",
      playerA: "Zit op zijn/haar billen met de hakken tegen elkaar. Doel om te voorkomen dat B de benen van A kan passeren.",
      playerB: "Zit op de knieën voor A en heeft als doel om A te passeren (voorbij de benen te komen).",
      rules: "Allebei mogen ze niet gaan staan. Als B voorbij de benen is (eigen heup boven of op de heup van de tegenstander) dan wisselen ze van rol."
    },
    rightColumn: {
      image: "/images/spel_14_image.png",
      modifications: {
        S: "",
        T: "",
        R: "Als A binnen 10 seconden zijn/haar benen toch weer terugkrijgt naar de begin positie dan heeft B geen punt.",
        O: "A mag nu ook proberen te gaan staan om 1 punt te krijgen of B uit balans te halen (B mag niet met de billen op de mat komen)",
        O2: "",
        M: ""
      },
      tips: "- A: Tripod-principe: Hierbij ben jij als verdediger met 3 steunpunten (bijv. 2 handen en 1 been) relatief stabiel, dit is hetzelfde voor de tegenstander. Het doel is om een voordeel te krijgen t.o.v. de tegenstander\n- A: In lood-principe / frames: Gebruik de kracht van het skelet en niet van de spier(en). Zelfde principe als bij acrogym\n- B: Rots & water: Wissel weerstand met meebewegen af\n- B: nieten, probeer ledenmaten van A spreekwoordelijk op de mat te nieten/controleren en daar te houden om meer ruimte te maken voor het passeren\n- B: zwevend passeren (LZP hoog > druk op armen) of druk passeren (LZP laag > druk op benen)\n- A: probeer met twee armen onder de armen van B te komen voor extra controle",
      youtubeUrl: ""
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "default-game-015",
    title: "Voorbij turtle of guard",
    objective: "Speler A moet zien te voorkomen dat speler B vanuit de voorkant van de turtle bij de heupen van speler A kan komen.",
    leftColumn: {
      startPosition: "Bokje/turtle",
      playerA: "Zit op zijn/haar knieën en ellenbogen en heeft als doel om te voorkomen dat B kan passeren naar de heupen.",
      playerB: "Gaat proberen om de frames van A te passeren en aan de zijkant van de turtle te komen met twee armen om de romp van A heen.",
      rules: "Als A twee armen om het been van B heeft dan heeft A 1 punt. Als B dit kan voorkomen en naar de zijkant kan komen van A met twee armen om de romp dan heeft B 1 punt."
    },
    rightColumn: {
      image: "/images/spel_15_image.png",
      modifications: {
        S: "",
        T: "",
        R: "Als B voor 5 seconden contact kan houden met het borstbeen op de rug van A dan heeft B ook 1 punt.",
        O: "B start in de lock van A en moet vervolgens passeren",
        O2: "",
        M: "A moet voorkomen dat B bij een object komt"
      },
      tips: "- B: Direction of force: Probeer bij sweeps en kantelingen krachten te leveren die haaks op de tegenstander staan\n- A: In lood-principe / frames: Gebruik de kracht van het skelet en niet van de spier(en). Zelfde principe als bij acrogym\n- B: Van klein naar groot: kleine steunpunten eerst afbreken voor het uit balans halen van een groot steunpunt\n- B: probeer je benen actief naar achter te duwen, borstbeen op de rug van A en heupen laag te houden",
      youtubeUrl: ""
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "default-game-016",
    title: "Zinvolle verbinding",
    objective: "Speler A moet proberen om zoveel mogelijk fysiek contact met speler B te maken met zijn ledematen.",
    leftColumn: {
      startPosition: "Guard op de rug",
      playerA: "De verdediger ligt op de grond. De verdediger probeert met minimaal 3 ledematen contact te maken met de aanvaller. Bv 1 hand bij een enkel en twee voeten op het lichaam.",
      playerB: "Voorbij de knielijn van A komen. Kan gefaseerd: 1. Voorbij voeten, 2. Voorbij knieën, 3. Borst-op-borst controle.",
      rules: "Als er zinvol contact is met minimaal 3 ledematen, dan begin je opnieuw of als B gepasseerd is (allebei 1 punt)."
    },
    rightColumn: {
      image: "/images/spel_16_image.png",
      modifications: {
        S: "",
        T: "Tijd interval",
        R: "A moet minimaal 3 seconden vasthouden om 1 punt te krijgen",
        O: "Als A 1 hand van B op de grond krijgt dan zijn het twee punten.",
        O2: "",
        M: ""
      },
      tips: "- A: probeer door middel van je heupen/LZP actief te draaien een dominante hoek op B te houden\n- B: probeer laag en op ooghoogte van A te blijven, switch je heupen om in een dominante hoek te komen\n- B: controle voeten/benen is cruciaal\n- B: varieer in druk/snelheid en hoek",
      youtubeUrl: ""
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "default-game-017",
    title: "Passeer de voeten / guard spel",
    objective: "Speler A moet altijd minimaal 1 voet tussen zichzelf en speler B zien te houden.",
    leftColumn: {
      startPosition: "Guard op de rug",
      playerA: "De verdediger ligt op de rug. Het doel van de verdediger is om altijd minimaal 1 voet voor of op het lichaam van de aanvaller te houden",
      playerB: "De aanvaller staat. Het doel van de aanvaller is voorbij de voeten van A te komen",
      rules: "Het is een continue spel, dus als de aanvaller er voorbij is, moet hij daar blijven en kan de verdediger de positie weer terugpakken. Het contact moet gecontroleerd zijn, dus niet schoppen."
    },
    rightColumn: {
      image: "/images/spel_17_image.png",
      modifications: {
        S: "",
        T: "",
        R: "Je mag alleen maar buitenom passeren, of juist alleen maar met 1 been tussen de benen van de verdediger. Hetzelfde spel kan ook met het passeren van de knieën.",
        O: "",
        O2: "",
        M: ""
      },
      tips: "- A: probeer door middel van je heupen/LZP actief te draaien een dominante hoek op B te houden\n- B: nieten, probeer ledenmaten van A spreekwoordelijk op de mat te nieten/controleren en daar te houden om meer ruimte te maken voor het passeren\n- A: zorg dat de aanvaller geen goede grips kan pakken, of verbreek deze",
      youtubeUrl: ""
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "default-game-018",
    title: "Chest to back",
    objective: "Speler A moet voorkomen dat speler B bij zijn rug kan komen en deze kan controleren",
    leftColumn: {
      startPosition: "Guard op de billen",
      playerA: "Zit en probeert te voorkomen dat speler B bij de rug kan komen.",
      playerB: "Staat en probeert de rug van speler A vast te pakken zodat borst tegen rug contact ontstaat.",
      rules: ""
    },
    rightColumn: {
      image: "/images/spel_18_image.png",
      modifications: {
        S: "",
        T: "Passeren op intervallen",
        R: "",
        O: "",
        O2: "Schaken, iedere speler krijgt 2 zetten, na uitvoeren mag de andere weer. Gebruik de zetten om het einddoel te bereiken.",
        M: ""
      },
      tips: "- A: probeer ledenmaten te nieten/isoleren. Oftewel een arm/been op de mat te drukken, houden en zo naar de volgende positie te gaan\n- A: dino armen, hou je ellenbogen tegen je romp aan en pas op dat je de armen te ver uitstrekt bij passeren om underhooks te voorkomen\n- A: probeer op ooghoogte te komen van B\n- B: probeer de armen van A juist te verlengen om makkelijker underhooks te maken, blijf zelf ook actief dino armen houden\n- B: probeer de steunpunten van A te storen tijdens het spel (voeten blokkeren etc.)",
      youtubeUrl: ""
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "default-game-019",
    title: "Sweepen staande tegenstander",
    objective: "Speler A probeert de balans van speler B te verstoren terwijl hij op de rug ligt en Speler B staat.",
    leftColumn: {
      startPosition: "Guard op de rug",
      playerA: "Ligt op de grond en mag op 3 plekken contact maken met speler B (bv 1 enkel met de hand en twee voeten/schenen op het lichaam). Het doel van speler A is speler B met de billen of handen op de grond te krijgen.",
      playerB: "Staat voor speler A. Nadat speler A op drie plekken contact heeft gemaakt, probeert speler B te voorkomen dat zijn lichaam contact maakt met de grond met de handen of de billen/heupen.",
      rules: "Speler A krijgt 1 punt voor iedere keer dat de handen of billen/heupen van speler B op de grond komen. Daarna begin je weer in de staande positie. Na 1 minuut wisselen. Je kunt dit spel meerdere ronden spelen met verschillende uitgangsposities/pakkingen."
    },
    rightColumn: {
      image: "/images/spel_19_image.png",
      modifications: {
        S: "",
        T: "Langer of korter",
        R: "",
        O: "",
        O2: "",
        M: ""
      },
      tips: "- Speler B heeft balans zolang hij zijn heupen boven zijn LZP kan houden. Wanneer je als speler A de heupen blijvend voorbij het LZP krijgt, zal speler B vallen\n- Gebruik niet alleen duwen en trekken, maar blokkeer ook voeten zodat het LZP op zijn plek blijft en niet met de onbalans mee kan bewegen",
      youtubeUrl: ""
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "default-game-020",
    title: "Opstaan closed guard",
    objective: "Speler B moet proberen op te staan uit de closed guard van speler A",
    leftColumn: {
      startPosition: "Closed guard",
      playerA: "1. Voorkomen dat B opstaat door controle te houden. 2. A sweepen (op zij/billen krijgen). 3. Tijdens B's opstaan-poging een arm onder het been krijgen (dit maakt B's succesvolle stand ongeldig voor dit spel).",
      playerB: "Opstaan uit de closed guard (handen van de mat, stabiele houding) ZONDER dat A tijdens het opstaan een arm onder B's been/knie krijgt (onderhaak/begin sweep).",
      rules: "B mag absoluut niet A optillen of in elkaar duwen (op de nek). Als B kan staan zonder te steunen op zijn/haar handen dan heeft B 1 punt."
    },
    rightColumn: {
      image: "/images/spel_20_image.png",
      modifications: {
        S: "",
        T: "",
        R: "A mag beginnen met twee underhooks",
        O: "Als B helemaal los kan komen dan 2 punten",
        O2: "",
        M: ""
      },
      tips: "- A: probeer het postuur van B gebroken te houden door de heupen te controleren + schouders\n- A: als B gaat staan kan je in de overgangsfase proberen uit balans te brengen door afwisselend te duwen en/of trekken op de steunpunten\n- B: probeer je postuur recht en sterk te houden\n- B: controleer de armen van A om het staan makkelijker te maken",
      youtubeUrl: ""
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "default-game-021",
    title: "Opstaan guard op de rug",
    objective: "Speler A moet proberen op te staan vanaf de rug op de grond",
    leftColumn: {
      startPosition: "Guard op de rug",
      playerA: "Ligt op de grond (mag ook zitten) en moet proberen volledig te gaan staan of B uit balans te halen.",
      playerB: "Moet contact houden met (minstens 1 hand of voet) en gaat proberen A op de grond te houden.",
      rules: "Als het A lukt om volledig te gaan staan (op twee voeten) of B zo uit balans te halen dat B een knie of heup op de mat moet plaatsen dan heeft A 1 punt. B moet proberen A te controleren maar mag niet passeren."
    },
    rightColumn: {
      image: "/images/spel_21_image.png",
      modifications: {
        S: "King of the mat, doordraaien met wachtende studenten als iemand een punt heeft gemaakt",
        T: "Tijd verkorten of verlengen",
        R: "Als B kan passeren dan heeft B 1 punt",
        O: "",
        O2: "",
        M: ""
      },
      tips: "- B: Speler B heeft balans zolang hij zijn heupen boven zijn LZP kan houden. Wanneer je als speler A de heupen blijvend voorbij het LZP krijgt, zal speler B vallen\n- A: probeer af te wisselen tussen balans verstoring en te gaan staan, zo krijg je de massa van B meer in beweging\n- A: Creëer afstand/frames; maak onderste been vrij; zoek ruimte om hoofd/schouders omhoog te brengen",
      youtubeUrl: ""
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export default defaultGames;