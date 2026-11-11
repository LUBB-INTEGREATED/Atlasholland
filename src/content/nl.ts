export type ServiceGroupKey = 'operationeel' | 'planning-advies' | 'totaaloplossingen';

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceItem {
  number: string;
  slug: string;
  group: ServiceGroupKey;
  groupLabel: string;
  title: string;
  shortDescription: string;
  lead: string;
  whatWeDo: string[];
  bullets: string[];
  applications: string[];
  processSteps: {
    step: string;
    title: string;
    description: string;
  }[];
  faqs: ServiceFAQ[];
  certificates: string[];
  relatedSlugs: string[];
  image: string;
  imageAlt: string;
  featuredOnHome?: boolean;
}

export interface CourseItem {
  code: string;
  slug: string;
  title: string;
  duration: string;
  level: string;
  certification: string;
  description: string;
  topics: string[];
}

export interface VacancyItem {
  slug: string;
  code: string;
  title: string;
  region: string;
  hours: string;
  employmentType: string;
  startLabel: string;
  salaryIndication: string;
  shortSummary: string;
  intro: string;
  whatYouDo: string[];
  whatWeAsk: string[];
  whatWeOffer: string[];
}

export interface TargetAudienceTab {
  id: string;
  label: string;
  code: string;
  headline: string;
  description: string;
  checkItems: string[];
  ctaLabel: string;
  ctaHref: string;
  image: string;
  imageAlt: string;
}

const defaultServiceFAQs: ServiceFAQ[] = [
  {
    question: 'Welke informatie heeft u nodig voor een aanvraag?',
    answer:
      'Voor een snelle en nauwkeurige inzet ontvangen wij graag de projectlocatie (adres of hectometerpaal), de gewenste start- en einddatum, de begin- en eindtijden per dag, de aard van de werkzaamheden en het gewenste aantal verkeersregelaars of maatregelen.',
  },
  {
    question: 'Is meerdaagse of langdurige inzet mogelijk?',
    answer:
      'Ja. Wij leveren zowel kortlopende inzet van enkele uren als vaste ploegen voor meerweekse of meerjarige infrastructuur- en bouwprojecten, inclusief vaste ploegleiders en projectcoördinatie.',
  },
  {
    question: 'Hoe snel kunt u verkeersregelaars of maatregelen leveren?',
    answer:
      'Voor geplande werkzaamheden ontvangt u binnen 24 uur een sluitend voorstel. Bij calamiteiten, spoedreparaties of onverwachte afsluitingen is onze 24/7 meldkamer direct bereikbaar voor onmiddellijke uitruk.',
  },
];

export const nl = {
  meta: {
    siteName: 'Atlas Holland B.V.',
    defaultTitle: 'Atlas Holland B.V. — Gecertificeerde Verkeersregelaars & Verkeersmaatregelen',
    defaultDescription:
      'Gecertificeerde verkeersregelaars, tijdelijke verkeersmaatregelen, verkeersplannen en BLVC-advies voor infra, bouw, evenementen en calamiteiten. Landelijk 24/7 inzetbaar.',
  },
  nav: {
    items: [
      { label: 'Diensten', href: '/diensten', hasMega: true },
      { label: 'Opleidingen', href: '/opleidingen' },
      { label: 'Over ons', href: '/over-ons' },
      { label: 'Werken bij', href: '/werken-bij' },
      { label: 'Contact', href: '/contact' },
    ],
    ctaLabel: 'Offerte aanvragen',
    ctaHref: '/offerte-aanvragen',
    statusLabel: '24/7',
    megaMenuGroups: {
      operationeel: 'OPERATIONEEL OP LOCATIE',
      'planning-advies': 'PLANNING & ADVIES',
      totaaloplossingen: 'TOTAALOPLOSSINGEN',
    },
    megaMenuAllLabel: 'Bekijk alle 11 diensten',
    megaMenuRecruitLabel: 'Direct solliciteren als verkeersregelaar',
  },
  home: {
    hero: {
      monoLabel: 'ATLAS HOLLAND B.V. — VERKEERSVEILIGHEID',
      headlineLine1: 'VEILIG',
      headlineLine2: 'VERKEER.',
      headlineLine3Prefix: 'GOED ',
      headlineLine3Signal: 'GEREGELD.',
      lead: 'Gecertificeerde verkeersregelaars en complete verkeersoplossingen voor infra, bouw, evenementen en calamiteiten. Landelijk inzetbaar, 24/7 bereikbaar.',
      primaryCta: 'Verkeersregelaars aanvragen',
      secondaryCta: 'Bekijk diensten',
      // TODO: replace with real Atlas photo
      heroImage: '/images/atlas_hero_controller_1794250078216.jpg',
      heroImageAlt:
        'Beroepsverkeersregelaar in effen hoogzichtbaarheidskleding en helm op een Nederlandse werklocatie bij zonsopkomst',
      quickRequest: {
        serviceLabel: 'DIENST',
        dateLabel: 'STARTDATUM',
        postalCodeLabel: 'POSTCODE / REGIO',
        postalCodePlaceholder: 'Bijv. 3542 AB of Utrecht',
        submitLabel: 'Verder',
        onlineStatus: 'Planning nu bereikbaar',
      },
    },
    ticker: [
      'VERKEERSREGELAARS',
      'BOUWPORTIER',
      'VERKEERSPLANNEN',
      'BLVC',
      'CALAMITEITEN 24/7',
      'EVENEMENTEN',
      'TIJDELIJKE VERKEERSMAATREGELEN',
      'VEILIGHEIDSPERSOON TRAM',
    ],
    sections: {
      services: {
        index: '01 — DIENSTEN',
        note: '11 SPECIALISMEN',
        headline: 'ALLES VOOR EEN VEILIGE WERKPLEK',
        description:
          'Van één gecertificeerde verkeersregelaar bij een spoedreparatie tot een compleet CROW-verkeersplan met bebording en projectcoördinatie.',
        allServicesLink: 'Alle 11 diensten',
        recruitCallout: 'Zelf aan de slag op de weg? Bekijk onze vacatures',
      },
      stats: {
        index: '02 — IN CIJFERS',
        note: 'CAPACITEIT & BEREIKBAARHEID',
        headline: 'SCHAALBAAR. DAG EN NACHT.',
        // TODO: replace with real Atlas photo
        stripImage: '/images/atlas_roadwork_panorama_1794250081740.jpg',
        stripImageAlt:
          'Overzicht van een gecontroleerde wegafzetting met geleidebakens en verkeersregelaars in effen veiligheidskleding',
        stripCaption: 'LANDELIJKE DEKKING — CROW 96A / 96B & BRL 9101 CONFORMITEIT',
      },
      process: {
        index: '03 — WERKWIJZE',
        note: 'VAN PLAN TOT OPLEVERING',
        headline: 'DRIE STAPPEN. GEEN RUIS.',
        steps: [
          {
            number: '01',
            title: 'Voorbereiding',
            subtitle: 'VERKEERSPLAN EN ADVIES',
            description:
              'We brengen verkeersstromen, vergunningseisen en omgevingsrisico’s in kaart en vertalen deze naar een toetsbaar verkeers- of BLVC-plan.',
          },
          {
            number: '02',
            title: 'Uitvoering',
            subtitle: 'GECERTIFICEERDE VERKEERSREGELAARS',
            description:
              'Onze landelijk aangestelde verkeersregelaars, bouwportiers en bordenploegen zorgen op locatie voor veilige doorgang en rust rond het werkvak.',
          },
          {
            number: '03',
            title: 'Coördinatie',
            subtitle: 'ÉÉN AANSPREEKPUNT, DIRECT BIJSTUREN',
            description:
              'Wijzigingen in fasering of weersomstandigheden? Onze 24/7 planning schakelt direct met uw uitvoerder en stuurt de inzet op locatie bij.',
          },
        ],
      },
      audiences: {
        index: '04 — VOOR WIE',
        note: 'OPDRACHTGEVERS',
        headline: 'AFGESTEMD OP UW PRAKTIJK',
        tabs: [
          {
            id: 'gemeenten',
            label: 'Gemeenten',
            code: 'PUBLIEKE RUIMTE & HANDHAVING',
            headline: 'DOORSTROMING EN DRAAGVLAK IN DE STAD',
            description:
              'Bij herinrichtingen, marktdagen of stedelijke evenementen verwacht de omgeving een veilige en gastvrije begeleiding. Onze mensen combineren verkeersinzicht met heldere communicatie naar bewoners en ondernemers.',
            checkItems: [
              'Landelijk aangestelde beroepsverkeersregelaars met SVNL-pas',
              'Onderbouwing met CROW-conforme verkeers- en BLVC-plannen',
              'Representatieve inzet met de-escalerende communicatie',
            ],
            ctaLabel: 'Inzet voor gemeenten aanvragen',
            ctaHref: '/offerte-aanvragen?dienst=verkeersregelaars',
            // TODO: replace with real Atlas photo
            image: '/images/atlas_careers_team_1794250082780.jpg',
            imageAlt: 'Verkeersregelaar in effen veiligheidsvest begeleidt stadsverkeer en fietsers bij kruispunt',
          },
          {
            id: 'aannemers',
            label: 'Aannemers',
            code: 'GWW, INFRA & BOUWPLAATSEN',
            headline: 'VEILIGE WERKVAKKEN EN STRAKKE BOUWLOGISTIEK',
            description:
              'Geen stilstand bij de bouwpoort of onveilige situaties langs de rijbaan. Wij leveren VCA-gecertificeerde verkeersregelaars, bouwportiers en tijdelijke verkeersmaatregelen die meebewegen met uw uitvoeringsplanning.',
            checkItems: [
              'Flexibele op- en afschaling per dagdeel of uitvoeringsfase',
              'Bouwportiers voor toegangscontrole en veilig achteruitrijdend bouwverkeer',
              'Volledige ontzorging inclusief bebording, hekwerk en afzettingen',
            ],
            ctaLabel: 'Capaciteit voor uw project aanvragen',
            ctaHref: '/offerte-aanvragen?dienst=bouwportier',
            // TODO: replace with real Atlas photo
            image: '/images/atlas_site_gate_portier_1794250082715.jpg',
            imageAlt: 'Bouwportier en verkeersregelaar in onbedrukte hi-vis kleding bij een beveiligde bouwplaatsingang',
          },
          {
            id: 'nutsbedrijven',
            label: 'Nutsbedrijven',
            code: 'NETBEHEER, KABELS & LEIDINGEN',
            headline: 'DIRECT TERecht BIJ STORINGEN EN NETUITBREIDING',
            description:
              'Werkzaamheden aan het energienet, warmtenetten of waterleidingen vragen om snelle, betrouwbare afzettingen in woonwijken en langs doorgaande wegen — ook midden in de nacht.',
            checkItems: [
              '24/7 spoedlijn voor directe uitruk bij netstoringen en lekkages',
              'Kleinschalige én grootschalige afzettingen conform CROW 96b',
              'Vaste ploegkoppeling voor wijkgerichte vervangingsprojecten',
            ],
            ctaLabel: 'Spoed- of projectinzet regelen',
            ctaHref: '/offerte-aanvragen?dienst=calamiteiten',
            // TODO: replace with real Atlas photo
            image: '/images/atlas_roadwork_panorama_1794250081740.jpg',
            imageAlt: 'Verkeersmaatregelen en begeleiding bij graafwerkzaamheden aan ondergrondse infrastructuur',
          },
          {
            id: 'evenementen',
            label: 'Evenementen',
            code: 'FESTIVALS, SPORT & PUBLIEKSSTROMEN',
            headline: 'SOEPELE INSTROOM EN UITSTROOM VOOR BEZOEKERS',
            description:
              'De ervaring van uw bezoekers begint op de aanrijroute en het parkeerterrein. Wij organiseren het volledige mobiliteitsplan: van parkeerbegeleiding en pendelroutes tot motorbegeleiding.',
            checkItems: [
              'Integrale aanpak van aanrijroutes, parkeervelden en kiss & ride',
              'Ervaren coördinatoren op locatie die schakelen met organisatie en hulpdiensten',
              'Motorbegeleiding voor wielerkoersen, marathons en konvooien',
            ],
            ctaLabel: 'Evenementenverkeer bespreken',
            ctaHref: '/offerte-aanvragen?dienst=evenementen',
            // TODO: replace with real Atlas photo
            image: '/images/atlas-audience-events.svg',
            imageAlt: 'Parkeerbegeleiders in effen reflecterende kleding wijzen bezoekersstromen de weg bij een evenemententerrein',
          },
        ] as TargetAudienceTab[],
      },
      whyAtlas: {
        index: '05 — WAAROM ATLAS',
        note: 'ONZE BELOFTE',
        headline: 'KORTE LIJNEN. DUIDELIJKE AFSPRAKEN. BETROKKEN OP LOCATIE.',
        lead: 'Op de weg telt alleen wat er daadwerkelijk staat. Daarom werken wij zonder onnodige tussenlagen: uw uitvoerder spreekt direct met onze planners.',
        items: [
          {
            number: '01',
            title: 'Snel schakelen',
            description:
              'Binnen 24 uur een sluitende offerte. Loopt een werk uit of valt er een spoedklus tussen? Onze planning is 24/7 bemand door mensen die het vak kennen.',
          },
          {
            number: '02',
            title: 'Veiligheid voorop',
            description:
              'Iedere medewerker beschikt over een geldige landelijke aanstellingspas, VCA-certificering en hoogwaardige persoonlijke beschermingsmiddelen.',
          },
          {
            number: '03',
            title: 'Ervaren vakmensen',
            description:
              'Wij investeren continu in praktijkopleiding, agressiebeheersing en trambaanveiligheid. Onze mensen staan rustig, alert en representatief op hun post.',
          },
          {
            number: '04',
            title: 'Één vast aanspreekpunt',
            description:
              'Van het eerste verkeersplan en de vergunningsaanvraag tot het plaatsen van de laatste pilon: u heeft één vaste projectcoördinator.',
          },
        ],
      },
      coverage: {
        index: '06 — LANDELIJK INZETBAAR',
        note: 'NEDERLAND · 24/7',
        headline: 'OVERAL OP DE WEG. BINNEN ÉÉN TELEFOONTJE.',
        description:
          'Met regionale steunpunten en vakmensen verspreid door heel Nederland zijn wij snel ter plaatse bij zowel geplande infrawerken als onverwachte calamiteiten.',
        emergencyLabel: 'SPOEDINZET OF DIRECT OVERLEG MET DE PLANNING?',
        ctaLabel: 'Plan uw inzet',
      },
      quality: {
        index: '07 — KWALITEIT & CERTIFICERING',
        note: 'NORMERING',
        headline: 'GEBORGD VOLGENS LANDELIJKE RICHTLIJNEN',
      },
      testimonials: {
        index: '08 — OPDRACHTGEVERS & ERVARINGEN',
        note: 'REFERENTIES',
        headline: 'BEWEZEN IN DE PRAKTIJK',
      },
      careers: {
        index: '08 — WERKEN BIJ ATLAS',
        note: 'VACATURES & OPLEIDING',
        headline: 'WORD VERKEERSREGELAAR.',
        lead: 'Houd jij het hoofd koel in het verkeer en werk je graag buiten met veel vrijheid? Ook zonder ervaring leiden wij je volledig op tot gecertificeerd beroepsverkeersregelaar.',
        benefits: ['GRATIS OPLEIDING', 'GOED SALARIS', 'COMPLETE UITRUSTING'],
        ctaLabel: 'Bekijk vacatures',
        ctaHref: '/werken-bij',
        // TODO: replace with real Atlas photo
        bgImage: '/images/atlas_careers_team_1794250082780.jpg',
        bgImageAlt: 'Twee verkeersregelaars in effen veiligheidskleding en helm overleggen op een werklocatie',
      },
      closingCta: {
        monoLabel: 'DIRECT CAPACITEIT OF ADVIES',
        headline: 'VERKEERSREGELAARS NODIG?',
        subtext:
          'Vraag binnen twee minuten een offerte aan of bel rechtstreeks met onze 24/7 planning voor directe inzet.',
        primaryCta: 'Offerte aanvragen',
        secondaryCta: 'Solliciteer direct',
      },
    },
  },
  servicesPage: {
    breadcrumb: 'HOME / DIENSTEN',
    h1: 'ONZE DIENSTEN',
    lead: 'Complete ondersteuning voor veilige werkvakken, bereikbare steden en gecontroleerde verkeersstromen. Combineer losse inzet van verkeersregelaars met verkeerskundig advies en tijdelijke verkeersmaatregelen.',
    // TODO: replace with real Atlas photo
    heroImage: '/images/atlas_roadwork_panorama_1794250081740.jpg',
    heroImageAlt: 'Overzicht van tijdelijke verkeersmaatregelen en gecertificeerde verkeersregelaars langs een rijbaan',
    groups: [
      {
        key: 'operationeel' as ServiceGroupKey,
        code: 'GROEP 01 — OPERATIONEEL OP LOCATIE',
        title: 'Gecertificeerde vakmensen op de weg en aan de poort',
        description:
          'Direct inzetbare beroepsverkeersregelaars, bouwportiers en veiligheidspersonen voor kortlopende en langdurige projecten.',
      },
      {
        key: 'planning-advies' as ServiceGroupKey,
        code: 'GROEP 02 — PLANNING & ADVIES',
        title: 'Verkeerskundige voorbereiding en vergunningstrajecten',
        description:
          'Toetsbare verkeersplannen, BLVC-kaders en strakke projectcoördinatie voorafgaand aan en tijdens de uitvoering.',
      },
      {
        key: 'totaaloplossingen' as ServiceGroupKey,
        code: 'GROEP 03 — TOTAALOPLOSSINGEN',
        title: 'Volledige ontzorging bij wegwerk, evenementen en spoed',
        description:
          'Levering, plaatsing en beheer van bebording en afzettingen, evenementenmobiliteit en 24/7 calamiteiteninzet.',
      },
    ],
  },
  services: [
    {
      number: '01',
      slug: 'verkeersregelaars',
      group: 'operationeel',
      groupLabel: 'OPERATIONEEL',
      title: 'Verkeersregelaars',
      shortDescription:
        'Gecertificeerde beroepsverkeersregelaars voor wegwerkzaamheden, bouwprojecten, evenementen en omleidingen.',
      lead: 'Gecertificeerde beroepsverkeersregelaars voor wegwerkzaamheden, bouwprojecten, evenementen en omleidingen; inzetbaar vanaf enkele uren tot meerjarige projecten.',
      whatWeDo: [
        'Wanneer de reguliere verkeerssituatie wijzigt door wegwerkzaamheden, hijswerkzaamheden of evenementen, zorgt een landelijk aangestelde beroepsverkeersregelaar van Atlas Holland B.V. voor veilige doorgang en rust op locatie.',
        'Onze verkeersregelaars beschikken over een geldige SVNL-aanstellingspas, VCA-certificering en ruime praktijkervaring in zowel binnenstedelijke knelpunten als provinciale wegen. Zij begeleiden gemotoriseerd verkeer, fietsers en voetgangers en houden de werkzone vrij voor uw uitvoerders.',
      ],
      bullets: [
        'Landelijk bevoegde beroepsverkeersregelaars (SVNL-aanstellingspas & VCA)',
        'Flexibel inzetbaar vanaf één dagdeel tot volledige projectbezetting',
        'Uitgerust met RWS-conforme hoogzichtbaarheidskleding en portofoons',
        'Gastvrije en duidelijke communicatie richting weggebruikers en omwonenden',
      ],
      applications: [
        'Asfaltonderhoud, herbestrating en kruispuntreconstructies',
        'Kabels- en leidingenwerkzaamheden in woonwijken en stadscentra',
        'Kranen, betonstort en bijzonder transport op krappe locaties',
        'Verkeersomleidingen bij tijdelijke wegafsluitingen',
      ],
      processSteps: [
        {
          step: '01',
          title: 'Locatie- en taakinstructie',
          description:
            'We bespreken vooraf de verkeerssituatie, knelpunten, werktijden en specifieke veiligheidsafspraken van uw project.',
        },
        {
          step: '02',
          title: 'Bezetting op locatie',
          description:
            'Onze verkeersregelaars melden zich ruim op tijd bij uw uitvoerder op locatie, volledig uitgerust en gebrieft.',
        },
        {
          step: '03',
          title: 'Actieve begeleiding & terugkoppeling',
          description:
            'Tijdens het werk sturen we verkeersstromen actief bij en schakelt onze 24/7 planning direct bij gewijzigde werktijden.',
        },
      ],
      faqs: defaultServiceFAQs,
      certificates: ['SVNL', 'VCA**', 'BRL 9101', 'ISO 9001'],
      relatedSlugs: ['tijdelijke-verkeersmaatregelen', 'verkeersplannen', 'bouwportier'],
      // TODO: replace with real Atlas photo
      image: '/images/atlas_hero_controller_1794250078216.jpg',
      imageAlt: 'Gecertificeerde verkeersregelaar in effen veiligheidskleding op een kruispunt',
      featuredOnHome: true,
    },
    {
      number: '02',
      slug: 'bouwportier',
      group: 'operationeel',
      groupLabel: 'OPERATIONEEL',
      title: 'Bouwportier',
      shortDescription:
        'Gecontroleerde toegang tot de bouwplaats, bezoekersregistratie en veilige in- en uitrit van bouwverkeer.',
      lead: 'Gecontroleerde toegang tot de bouwplaats, sluitende bezoekersregistratie en veilige begeleiding van in- en uitrijdend bouwverkeer.',
      whatWeDo: [
        'De toegangspoort is het visitekaartje én de belangrijkste veiligheidsfilter van uw bouwplaats. Onze bouwportiers zijn tevens gecertificeerd verkeersregelaar, waardoor zij zowel de toegangscontrole als de verkeersveiligheid op de openbare weg voor de bouwpoort beheersen.',
        'Wij controleren bouwplaatsmedewerkers, leveranciers en bezoekers op geldige passen en PBM-gebruik, sturen vrachtauto’s op afroep naar de juiste loszone en begeleiden achteruitrijdend bouwverkeer veilig over fietspaden en trottoirs.',
      ],
      bullets: [
        'Combinatiefunctie: ervaren bouwportier én bevoegd beroepsverkeersregelaar',
        'Strikte toegangscontrole, bezoekersregistratie en controle op PBM-plicht',
        'Coördinatie van laad- en losbewegingen volgens uw dagplanning',
        'Begeleiding van zwaar bouwverkeer tussen openbare weg en bouwterrein',
      ],
      applications: [
        'Binnenstedelijke woning- en utiliteitsbouw met beperkte opstelruimte',
        'Grootschalige renovatie- en sloopprojecten in drukke winkelstraten',
        'Industriële bouwlocaties en energieprojecten met strikte toegangseisen',
      ],
      processSteps: [
        {
          step: '01',
          title: 'Poortprotocol & logistiek plan',
          description:
            'Samen met uw uitvoerder leggen we toegangsregels, levertijden en aanrijroutes vast in een helder poortprotocol.',
        },
        {
          step: '02',
          title: 'Toegangscontrole & ontvangst',
          description:
            'Registratie van personeel en transporten bij de poort, inclusief controle op helm, schoenen en hesje.',
        },
        {
          step: '03',
          title: 'Veilige in- en uitritbegeleiding',
          description:
            'Actieve verkeersregeling op de openbare weg bij het in- en uitdraaien van vrachtverkeer en kranen.',
        },
      ],
      faqs: defaultServiceFAQs,
      certificates: ['VCA**', 'SVNL', 'ISO 9001'],
      relatedSlugs: ['verkeersregelaars', 'blvc-plannen', 'projectcoordinatie'],
      // TODO: replace with real Atlas photo
      image: '/images/atlas_site_gate_portier_1794250082715.jpg',
      imageAlt: 'Bouwportier in effen veiligheidskleding controleert toegang bij een bouwplaatshek',
      featuredOnHome: true,
    },
    {
      number: '03',
      slug: 'veiligheidspersoon-tram',
      group: 'operationeel',
      groupLabel: 'OPERATIONEEL',
      title: 'Veiligheidspersoon tram',
      shortDescription:
        'Gespecialiseerd veiligheidspersoneel voor werkzaamheden nabij trambanen; tijdige waarschuwing bij naderende trams.',
      lead: 'Gespecialiseerd veiligheidspersoneel voor werkzaamheden in en nabij het profiel van vrije ruimte van trambanen.',
      whatWeDo: [
        'Werken langs of aan het tramspoor brengt specifieke aanrijdings- en bovenleidingsrisico’s met zich mee. Onze veiligheidspersonen tram bewaken continu het profiel van vrije ruimte en waarschuwen de werkploeg tijdig bij naderende trams.',
        'Voorafgaand aan de dienst voert de veiligheidspersoon een veiligheidsbriefing uit met de uitvoerende ploeg, spreekt het waarschuwingssignaal en de wijkplaats af en onderhoudt waar nodig contact met de verkeersleiding van het vervoersbedrijf.',
      ],
      bullets: [
        'Specifiek opgeleid voor veilig werken nabij tramspoor en bovenleiding',
        'Uitsluitend belast met waarneming en waarschuwing (geen dubbeltaak)',
        'Heldere instructie van wijkplaatsen en ontruimingstijden voor aanvang werk',
        'Ervaring in stedelijke tramnetwerken (Amsterdam, Rotterdam, Den Haag, Utrecht)',
      ],
      applications: [
        'Groenonderhoud, bestrating en rioleringswerk langs trambanen',
        'Werkzaamheden aan halteperrons, bovenleidingsmasten en kruisingen',
        'Gevelonderhoud en hijswerkzaamheden binnen de gevarenzone van de tram',
      ],
      processSteps: [
        {
          step: '01',
          title: 'Zichtlijn- en risicoanalyse',
          description:
            'Bepaling van waarschuwingsafstanden, remwegen, zichtlijnen en veilige wijkplaatsen langs het spoor.',
        },
        {
          step: '02',
          title: 'Startwerkinstructie op locatie',
          description:
            'Korte verplichte briefing met alle grondwerkers en machinisten over signalen en wijkgedrag.',
        },
        {
          step: '03',
          title: 'Continue spoorbewaking',
          description:
            'Onaflatende bewaking van beide rijrichtingen tot het werkvak veilig is vrijgegeven.',
        },
      ],
      faqs: defaultServiceFAQs,
      certificates: ['VCA**', 'SVNL', 'ISO 9001'],
      relatedSlugs: ['verkeersregelaars', 'verkeersplannen', 'projectcoordinatie'],
      // TODO: replace with real Atlas photo
      image: '/images/atlas-tram-safety.svg',
      imageAlt: 'Veiligheidspersoon tram in onbedrukte hi-vis kleding bewaakt werkzaamheden langs tramspoor',
    },
    {
      number: '04',
      slug: 'parkeerbegeleiding',
      group: 'operationeel',
      groupLabel: 'OPERATIONEEL',
      title: 'Parkeerbegeleiding',
      shortDescription:
        'Gastvrije en efficiënte geleiding van bezoekers naar parkeervakken met vrije aan- en afvoerroutes.',
      lead: 'Gastvrije en gestructureerde parkeerbegeleiding die bezoekers vlot naar een parkeerplaats leidt en aanrijroutes vrijhoudt.',
      whatWeDo: [
        'Een volle parkeerplaats of stagnerende inrit zorgt direct voor opstoppingen op de omliggende wegen. Onze parkeerbegeleiders combineren een gastvrije ontvangst met strakke regie op het parkeerterrein.',
        'Wij benutten de beschikbare capaciteit optimaal door rijstroken systematisch te vullen, houden calamiteitenroutes en laadzones vrij en schakelen bij piekdrukte naadloos over van instroom- naar uitstroomconfiguratie.',
      ],
      bullets: [
        'Optimale benutting van permanente parkeerterreinen en tijdelijke weidevelden',
        'Vrijhouden van calamiteitenroutes, gehandicaptenplaatsen en VIP-zones',
        'Representatieve en behulpzame ontvangst van uw gasten en bezoekers',
        'Naadloze afstemming met verkeersregelaars op de openbare aanrijroute',
      ],
      applications: [
        'Publieksevenementen, beurzen, congressen en sportwedstrijden',
        'Tijdelijke parkeerdruk bij winkelcentra, ziekenhuizen en bedrijventerreinen',
        'Pendelbusstations en Park & Ride (P+R) locaties',
      ],
      processSteps: [
        {
          step: '01',
          title: 'Terreinindeling & rijroutes',
          description:
            'Opstellen van een logische vakindeling en scheiding van inkomend, uitgaand en voetgangersverkeer.',
        },
        {
          step: '02',
          title: 'Pieksturing bij instroom',
          description:
            'Vlotte doorverwijzing per rij zodat wachtrijen bij de entree tot een minimum beperkt blijven.',
        },
        {
          step: '03',
          title: 'Gecontroleerde uitstroom',
          description:
            'Actieve dosering bij afloop van het evenement om vastlopende uitritten te voorkomen.',
        },
      ],
      faqs: defaultServiceFAQs,
      certificates: ['SVNL', 'VCA**', 'ISO 9001'],
      relatedSlugs: ['evenementen', 'verkeersregelaars', 'motorbegeleiding'],
      // TODO: replace with real Atlas photo
      image: '/images/atlas-audience-events.svg',
      imageAlt: 'Parkeerbegeleider in effen veiligheidskleding wijst voertuigen naar parkeervakken',
    },
    {
      number: '05',
      slug: 'motorbegeleiding',
      group: 'operationeel',
      groupLabel: 'OPERATIONEEL',
      title: 'Motorbegeleiding',
      shortDescription:
        'Mobiele verkeersbegeleiding voor wielerkoersen, hardloopevenementen, konvooien en verplaatsende routes.',
      lead: 'Dynamische verkeersbegeleiding vanaf de motor voor sportwedstrijden, toertochten en bewegende evenementen.',
      whatWeDo: [
        'Bij evenementen die zich over een parcours verplaatsen — zoals wielerwedstrijden, marathons of colonne-ritten — volstaan vaste posten alleen niet. Onze gecertificeerde motorverkeersregelaars bewegen voor de stoet uit om kruispunten tijdig vrij te maken en direct na doorkomst weer veilig vrij te geven.',
        'Door deze zogeheten harmonica-methode blijft de hinder voor het overige verkeer minimaal en is de veiligheid van deelnemers en publiek op elk punt van de route geborgd.',
      ],
      bullets: [
        'Landelijk bevoegde verkeersregelaars met specialistische motoruitrusting',
        'Rijdende afzetting volgens het harmonica-principe voor minimale verkeershinder',
        'Onderlinge portofoonverbinding met koersdirectie, voorrijwagen en vaste posten',
        'Voorafgaande parcoursverkenning en markering van risicopunten',
      ],
      applications: [
        'Wielerkoersen, toertochten en triatlons op de openbare weg',
        'Stedelijke marathons, wandeltochten en optochten',
        'Begeleiding van bijzondere colonnes en logistieke verplaatsingen',
      ],
      processSteps: [
        {
          step: '01',
          title: 'Parcoursschouw & draaiboek',
          description:
            'Analyse van de route, doorkomsttijden en kritische kruispunten in afstemming met de vergunning.',
        },
        {
          step: '02',
          title: 'Vooruitgeschoven beveiliging',
          description:
            'Motorregelaars zetten kruispunten kort voor doorkomst stil en sluiten na de bezemwagen direct weer aan.',
        },
        {
          step: '03',
          title: 'Evaluatie & vrijgave',
          description:
            'Gefaseerde openstelling van het parcours zodra de laatste deelnemers veilig zijn gepasseerd.',
        },
      ],
      faqs: defaultServiceFAQs,
      certificates: ['SVNL', 'VCA**', 'ISO 9001'],
      relatedSlugs: ['evenementen', 'verkeersregelaars', 'parkeerbegeleiding'],
      // TODO: replace with real Atlas photo
      image: '/images/atlas-moto-escort.svg',
      imageAlt: 'Motorverkeersregelaar in effen hoogzichtbaarheidskleding op een afgezet parcours',
    },
    {
      number: '06',
      slug: 'verkeersplannen',
      group: 'planning-advies',
      groupLabel: 'PLANNING & ADVIES',
      title: 'Verkeersplannen',
      shortDescription:
        'CROW-conforme verkeersplannen en bebordingstekeningen die verkeersstromen, maatregelen en bezetting combineren.',
      lead: 'Toetsbare CROW-verkeersplannen en detailtekeningen voor vergunningsaanvragen en een veilige uitvoering buiten.',
      whatWeDo: [
        'Een veilige werkplek op of langs de weg begint op de tekentafel. Onze verkeerskundig adviseurs ontwerpen overzichtelijke verkeersplannen en bebordingstekeningen volgens de landelijke CROW-richtlijnen 96a en 96b.',
        'Wij houden vanaf het eerste ontwerp rekening met de uitvoerbaarheid in de praktijk: kloppen de zichtlijnen, kunnen hulpdiensten passeren, is de omleidingsroute geschikt voor vracht- en busverkeer en waar zijn verkeersregelaars noodzakelijk? Zo voorkomt u vertraging bij de wegbeheerder.',
      ],
      bullets: [
        'Detailtekeningen conform CROW 96a (autosnelwegen) en CROW 96b (binnen/buiten bebouwde kom)',
        'Direct geschikt voor indiening bij gemeente, provincie of waterschap (LTC / Melvin)',
        'Integrale uitwerking van fasering, omleidingsroutes, bebording en personele inzet',
        'Praktijktoets op locatie vóór definitieve indiening',
      ],
      applications: [
        'Vergunningsaanvragen (TVM-aanvraag) bij gemeenten en provincies',
        'Gefaseerde kruispuntreconstructies en rioolvervangingen',
        'Tijdelijke afsluitingen voor hijswerkzaamheden of gevelmontage',
      ],
      processSteps: [
        {
          step: '01',
          title: 'Inventarisatie & schouw',
          description:
            'Beoordeling van werktekeningen, uitvoeringsfasering en verkeersintensiteiten op de projectlocatie.',
        },
        {
          step: '02',
          title: 'Verkeerskundig ontwerp (CROW)',
          description:
            'Uitwerking van bebordingstekeningen, omleidingsroutes en benodigde inzet van verkeersregelaars.',
        },
        {
          step: '03',
          title: 'Afstemming wegbeheerder',
          description:
            'Toelichting richting gemeente of wegbeheerder en doorvertaling naar onze uitvoeringsploegen buiten.',
        },
      ],
      faqs: defaultServiceFAQs,
      certificates: ['BRL 9101', 'ISO 9001', 'VCA**'],
      relatedSlugs: ['blvc-plannen', 'tijdelijke-verkeersmaatregelen', 'projectcoordinatie'],
      // TODO: replace with real Atlas photo
      image: '/images/atlas-traffic-plan.svg',
      imageAlt: 'Verkeerskundige tekening en CROW-bebordingsplan op een werktafel',
      featuredOnHome: true,
    },
    {
      number: '07',
      slug: 'blvc-plannen',
      group: 'planning-advies',
      groupLabel: 'PLANNING & ADVIES',
      title: 'BLVC-plannen',
      shortDescription:
        'Bereikbaarheid, Leefbaarheid, Veiligheid en Communicatie integraal verankerd in uw projectvoorbereiding.',
      lead: 'Integrale BLVC-plannen waarmee u de impact van bouw- en infraprojecten op de omgeving aantoonbaar beheerst.',
      whatWeDo: [
        'Steeds meer gemeenten stellen bij vergunningverlening of EMVI-aanbestedingen een goedgekeurd BLVC-plan (Bereikbaarheid, Leefbaarheid, Veiligheid en Communicatie) verplicht. Atlas Holland B.V. schrijft geen papieren tijgers, maar praktische BLVC-plannen die zowel bij het bevoegd gezag als op de bouwplaats werken.',
        'Wij stemmen bouwroutes, venstertijden, geluids- en stofbeperking, veilige schoolroutes en omgevingscommunicatie op elkaar af en vertalen deze direct naar werkbare afspraken voor onderaannemers en leveranciers.',
      ],
      bullets: [
        'Volledige uitwerking van Bereikbaarheid, Leefbaarheid, Veiligheid en Communicatie',
        'Geschikt voor omgevingsvergunningen, gemeentelijke toetsing en EMVI-plannen',
        'Inclusief bouwroutekaarten, poortinstructies en faseringsoverzichten',
        'Naadloze koppeling met onze bouwportiers en verkeersregelaars in de uitvoering',
      ],
      applications: [
        'Binnenstedelijke nieuwbouw- en transformatieprojecten',
        'Langdurige gebiedsontwikkeling en herinrichting van winkelgebieden',
        'EMVI- en BPKV-aanbestedingen voor civiele en bouwkundige aannemers',
      ],
      processSteps: [
        {
          step: '01',
          title: 'Omgevings- en stakeholderanalyse',
          description:
            'In kaart brengen van scholen, hulpdiensten, winkelbevoorrading, OV-lijnen en kwetsbare routes.',
        },
        {
          step: '02',
          title: 'Opstellen BLVC-kader & kaarten',
          description:
            'Vastleggen van aanrijroutes, werktijden, veiligheidszones en communicatiemomenten.',
        },
        {
          step: '03',
          title: 'Toetsing & borging tijdens de bouw',
          description:
            'Begeleiding van het gemeentelijk akkoord en naleving op locatie via onze projectcoördinator.',
        },
      ],
      faqs: defaultServiceFAQs,
      certificates: ['BRL 9101', 'ISO 9001', 'VCA**'],
      relatedSlugs: ['verkeersplannen', 'bouwportier', 'projectcoordinatie'],
      // TODO: replace with real Atlas photo
      image: '/images/atlas-traffic-plan.svg',
      imageAlt: 'BLVC-faseringskaart met bereikbaarheidsroutes en veilige voetgangerszones',
      featuredOnHome: true,
    },
    {
      number: '08',
      slug: 'projectcoordinatie',
      group: 'planning-advies',
      groupLabel: 'PLANNING & ADVIES',
      title: 'Projectcoördinatie',
      shortDescription:
        'Één vast aanspreekpunt dat voorbereiding, personeelsplanning, bebording en aansturing op locatie verbindt.',
      lead: 'Één vast aanspreekpunt dat verkeerskundige voorbereiding, dagplanning en aansturing op locatie met elkaar verbindt.',
      whatWeDo: [
        'Bij complexe of meerfasige projecten wilt u als hoofduitvoerder of projectleider niet schakelen tussen verschillende partijen voor tekeningen, borden en verkeersregelaars. Onze projectcoördinator neemt de volledige regie over de tijdelijke verkeerssituatie uit handen.',
        'De projectcoördinator sluit aan bij uw bouwvergaderingen, controleert dagelijks of afzettingen nog voldoen aan de actuele bouwfase en stuurt de ploeg verkeersregelaars en portiers direct op locatie aan.',
      ],
      bullets: [
        'Één verantwoordelijke coördinator voor advies, materiaal én personeel',
        'Periodieke schouw en logboekregistratie van alle geplaatste verkeersmaatregelen',
        'Directe deelname aan uw uitvoerdersoverleg en LEAN-planningsessies',
        'Snelle bijsturing bij faseringswijzigingen of weersinvloeden',
      ],
      applications: [
        'Meermaandelijkse weg- en spoorreconstructies met wisselende deelfasen',
        'Grote stedelijke bouwplaatsen met meerdere gelijktijdige nevenaannemers',
        'Raamovereenkomsten voor netbeheerders en gemeentelijk onderhoud',
      ],
      processSteps: [
        {
          step: '01',
          title: 'Kick-off & faseringsplanning',
          description:
            'Koppeling van uw uitvoeringsplanning aan benodigde vergunningen, materiaal en personeelsroosters.',
        },
        {
          step: '02',
          title: 'Dagelijkse regie op locatie',
          description:
            'Aansturing van verkeersregelaars, controle van bebording en afstemming met omgevingsmanagers.',
        },
        {
          step: '03',
          title: 'Rapportage & nazorg',
          description:
            'Heldere weekrapportages van ingezette uren, wijzigingen en veiligheidsobservaties.',
        },
      ],
      faqs: defaultServiceFAQs,
      certificates: ['ISO 9001', 'VCA**', 'BRL 9101'],
      relatedSlugs: ['verkeersplannen', 'tijdelijke-verkeersmaatregelen', 'verkeersregelaars'],
      // TODO: replace with real Atlas photo
      image: '/images/atlas-planning-ops.svg',
      imageAlt: 'Projectcoördinator bespreekt verkeersfasering op locatie met uitvoeringsploeg',
    },
    {
      number: '09',
      slug: 'tijdelijke-verkeersmaatregelen',
      group: 'totaaloplossingen',
      groupLabel: 'TOTAALOPLOSSINGEN',
      title: 'Tijdelijke verkeersmaatregelen',
      shortDescription:
        'Afzettingen, RVV-bebording, geleidebakens, tekstkarren en omleidingen — vakkundig geplaatst en onderhouden.',
      lead: 'Levering, plaatsing, onderhoud en verwijdering van complete tijdelijke verkeersmaatregelen conform BRL 9101 en CROW 96a/96b.',
      whatWeDo: [
        'Goed geplaatste verkeersmaatregelen geleiden de weggebruiker intuïtief langs uw werkvak. Atlas Holland B.V. levert en plaatst het volledige pakket aan tijdelijke verkeersmaatregelen (TVM): van RVV-borden, geleidebakens en schrikhekken tot tekstwagens, tijdelijke verkeersregelinstallaties (tVRI) en barriers.',
        'Onze gecertificeerde bordenploegen plaatsen alle maatregelen exact volgens het goedgekeurde verkeersplan, controleren de zichtbaarheid en stabiliteit tussentijds en bouwen het werkvak direct na afronding weer veilig af.',
      ],
      bullets: [
        'Plaatsing en instandhouding door BRL 9101-opgeleide vakmensen',
        'Compleet assortiment: RVV-bebording, bakens, hekwerken, tekstkarren en tVRI’s',
        '24/7 storingsdienst bij stormschade, aanrijdingen of verschoven afzettingen',
        'Direct te combineren met inzet van onze gecertificeerde verkeersregelaars',
      ],
      applications: [
        'Rijstrookafzettingen en wegafsluitingen op gemeentelijke en provinciale wegen',
        'Omleidingsroutes met vooraankondigingsborden en gele tekstborden',
        'Fysieke afscherming van bouwkuipen, sleuven en kranen',
      ],
      processSteps: [
        {
          step: '01',
          title: 'Uitzetten volgens tekening',
          description:
            'Opbouw van de afzetting en omleidingsbebording in de juiste werkvolgorde voor veilige plaatsing.',
        },
        {
          step: '02',
          title: 'Schouw & instandhouding',
          description:
            'Periodieke controle op leesbaarheid, plaatsing en werking gedurende de gehele projectduur.',
        },
        {
          step: '03',
          title: 'Vlotte afbouw & vrijgave',
          description:
            'Directe verwijdering na oplevering zodat de weg zonder vertraging weer open kan.',
        },
      ],
      faqs: defaultServiceFAQs,
      certificates: ['BRL 9101', 'VCA**', 'ISO 9001'],
      relatedSlugs: ['verkeersplannen', 'verkeersregelaars', 'calamiteiten'],
      // TODO: replace with real Atlas photo
      image: '/images/atlas_roadwork_panorama_1794250081740.jpg',
      imageAlt: 'Geplaatste geleidebakens, RVV-borden en rijbaanafzetting langs een Nederlandse weg',
      featuredOnHome: true,
    },
    {
      number: '10',
      slug: 'evenementen',
      group: 'totaaloplossingen',
      groupLabel: 'TOTAALOPLOSSINGEN',
      title: 'Evenementen verkeersmanagement',
      shortDescription:
        'Bezoekers- en verkeersstromen van aanrijroute en parkeren tot veilige uitstroom na afloop.',
      lead: 'Integraal verkeersmanagement voor evenementen: van mobiliteitsplan en bewegwijzering tot verkeersregelaars en parkeerregie.',
      whatWeDo: [
        'Bij een publieksevenement komen duizenden bezoekers, leveranciers, artiesten, fietsers en pendelbussen in korte tijd samen. Atlas Holland B.V. verzorgt het gehele verkeersmanagement zodat uw terrein vlot bereikbaar is én de omliggende wegen en hulpdienstroutes vrij blijven.',
        'Wij stellen het mobiliteitsplan op voor de evenementenvergunning, plaatsen tijdelijke bewegwijzering en tekstkarren, bemannen de kruispunten met evenementen- en beroepsverkeersregelaars en sturen de parkeervelden aan.',
      ],
      bullets: [
        'Compleet mobiliteits- en verkeersplan voor uw gemeentelijke evenementenvergunning',
        'Scheiding van bezoekersstromen, bouw-/productieverkeer en calamiteitenroutes',
        'Ervaren verkeerscoördinator in de centrale post van de organisatie',
        'Combinatie van beroepsverkeersregelaars, parkeerbegeleiders en tekstwagens',
      ],
      applications: [
        'Muziekfestivals, stadsfeesten en publieksbeurzen',
        'Sportevenementen, stadionwedstrijden en wielerrondes',
        'Bedrijfsopeningen, congressen en tijdelijke publiekslocaties',
      ],
      processSteps: [
        {
          step: '01',
          title: 'Mobiliteitsplan & vergunning',
          description:
            'Uitwerking van aanrijroutes, P-velden, fietsenstallingen en kiss & ride voor het veiligheidsoverleg.',
        },
        {
          step: '02',
          title: 'Opbouw & instroomregie',
          description:
            'Plaatsing van bewegwijzering en actieve verkeerssturing tijdens opbouw en bezoekersinstroom.',
        },
        {
          step: '03',
          title: 'Uitstroom & afbouw',
          description:
            'Gecontroleerde uitstroom na het slotakkoord zodat bezoekers veilig en zonder chaos vertrekken.',
        },
      ],
      faqs: defaultServiceFAQs,
      certificates: ['SVNL', 'BRL 9101', 'VCA**', 'ISO 9001'],
      relatedSlugs: ['parkeerbegeleiding', 'motorbegeleiding', 'verkeersregelaars'],
      // TODO: replace with real Atlas photo
      image: '/images/atlas-audience-events.svg',
      imageAlt: 'Verkeersmanagement en bezoekersbegeleiding bij de entree van een groot evenement',
    },
    {
      number: '11',
      slug: 'calamiteiten',
      group: 'totaaloplossingen',
      groupLabel: 'TOTAALOPLOSSINGEN',
      title: 'Calamiteiten & spoedinzet',
      shortDescription:
        'Directe 24/7 uitruk bij incidenten, netstoringen, spoedreparaties en onverwachte wegafsluitingen.',
      lead: '24/7 parate inzet van verkeersregelaars en spoedafzettingen bij incidenten, storingen en acute onveilige wegsituaties.',
      whatWeDo: [
        'Een gesprongen waterleiding, een stroomstoring op een kruispunt, uitgevallen verkeerslichten of spoedherstel aan het wegdek laat zich niet plannen. Daarom is de spoedlijn van Atlas Holland B.V. 24 uur per dag, 7 dagen per week bemand door een beslissingsbevoegde planner.',
        'Na uw melding sturen wij direct de dichtstbijzijnde verkeersregelaars en afzetmaterialen aan. Ter plaatse zorgen wij voor een veilige werkzone voor de storingsmonteurs en leiden wij het verkeer gecontroleerd om het incident heen.',
      ],
      bullets: [
        '24/7 rechtstreeks contact met onze dienstdoende planner (geen keuzemenu of callcenter)',
        'Snelle aanrijtijden door landelijke spreiding van mensen en materiaal',
        'Directe beveiliging bij uitgevallen VRI-kruispunten, zinkgaten en leidingschades',
        'Volledige afstemming met wegbeheerders, bergers en hulpdiensten op locatie',
      ],
      applications: [
        'Spoedreparaties aan gas-, water-, warmte- en elektriciteitsnetten',
        'Uitval van verkeersregelinstallaties (VRI) op drukke kruispunten',
        'Stormschade, spoedbestrating, asfaltschade en incidentafhandeling',
      ],
      processSteps: [
        {
          step: '01',
          title: '24/7 Spoedmelding',
          description:
            'U belt onze spoedlijn met de locatie en aard van het incident; onze planner activeert direct de ploeg.',
        },
        {
          step: '02',
          title: 'Beveiliging van de locatie',
          description:
            'Eerste afscherming van het incident en veilige regeling van het verkeer rond de storingslocatie.',
        },
        {
          step: '03',
          title: 'Continuering tot vrijgave',
          description:
            'Aflossing bij langdurige herstelwerkzaamheden totdat de weg weer veilig kan worden vrijgegeven.',
        },
      ],
      faqs: defaultServiceFAQs,
      certificates: ['SVNL', 'VCA**', 'BRL 9101', 'ISO 9001'],
      relatedSlugs: ['verkeersregelaars', 'tijdelijke-verkeersmaatregelen', 'projectcoordinatie'],
      // TODO: replace with real Atlas photo
      image: '/images/atlas-audience-utilities.svg',
      imageAlt: '24/7 spoedinzet met verkeersregelaars en bakenafzetting bij nachtelijke herstelwerkzaamheden',
      featuredOnHome: true,
    },
  ] as ServiceItem[],
  opleidingenPage: {
    breadcrumb: 'HOME / OPLEIDINGEN',
    h1: 'OPLEIDINGEN & CERTIFICERING',
    lead: 'Veiligheid op de weg vraagt om actuele vakkennis en scherp handelen. Wij verzorgen praktijkgerichte opleidingen en herinstructies voor onze eigen medewerkers én voor teams van opdrachtgevers.',
    // TODO: replace with real Atlas photo
    heroImage: '/images/atlas-academy.svg',
    heroImageAlt: 'Praktijkinstructie verkeersveiligheid en CROW-richtlijnen voor verkeersregelaars',
    coursesIndex: '01 — CURSUSOVERZICHT',
    coursesNote: '6 ERKENDE TRAJECTEN',
    coursesHeadline: 'PRAKTIJKGERICHT OPGELEID VOLGENS LANDELIJKE NORMEN',
    courses: [
      {
        code: 'BRL 9101',
        slug: 'brl-9101',
        title: 'BRL 9101 — Veilig werken aan de weg & TVM',
        duration: '2 dagen + examen',
        level: 'Vakbekwaamheid CROW 96a/96b',
        certification: 'Erkend BRL 9101 certificaat (5 jaar geldig)',
        description:
          'Volledige opleiding voor het veilig plaatsen, onderhouden en verwijderen van tijdelijke verkeersmaatregelen volgens de CROW-richtlijnen 96a en 96b.',
        topics: ['CROW 96a & 96b richtlijnen', 'Opbouw- en afbouwvolgorde', 'Zichtlijnen & veiligheidszones'],
      },
      {
        code: 'SVNL-BVR',
        slug: 'beroepsverkeersregelaar',
        title: 'Beroepsverkeersregelaar (SVNL Aanstellingspas)',
        duration: '3 dagen theorie + praktijkexamen',
        level: 'Startkwalificatie & herinstructie',
        certification: 'Landelijke aanstellingspas via SVNL',
        description:
          'Wettelijk erkende opleiding tot landelijk bevoegd beroepsverkeersregelaar, inclusief e-learning, praktijktraining op drukke kruispunten en officieel SVNL-examen.',
        topics: ['Wettelijke kaders & stoptekens', 'Positiekiezen op kruispunten', 'Praktijkexamen op de openbare weg'],
      },
      {
        code: 'VCA-VOL',
        slug: 'vca-vol',
        title: 'VCA Basis & VCA-VOL (Veiligheid voor Operationeel Leidinggevenden)',
        duration: '1 dag + examen',
        level: 'Basis / Leidinggevend',
        certification: 'Officieel VCA-diploma (10 jaar geldig)',
        description:
          'Essentiële veiligheidsopleiding voor iedereen die op bouwplaatsen en infrawerken actief is, gericht op risicobeheersing, PBM-gebruik en veilige werkmethoden.',
        topics: ['Arbowetgeving & taakrisicoanalyse', 'Gevaarlijke stoffen & materieel', 'Handelen bij ongevallen'],
      },
      {
        code: 'EHBO-BHV',
        slug: 'ehbo-bhv',
        title: 'EHBO & Bedrijfshulpverlening (BHV) op de bouwplaats',
        duration: '1 dag praktijk',
        level: 'Initiële training & jaarlijkse herhaling',
        certification: 'BHV-pas met reanimatie / AED-aantekening',
        description:
          'Praktische training in levensreddend handelen, reanimatie met AED, wondverzorging en ontruiming, toegespitst op situaties langs de weg en op het bouwterrein.',
        topics: ['Levensreddend handelen & AED', 'Brandbestrijding & alarmering', 'Communicatie met 112-meldkamer'],
      },
      {
        code: 'DE-ESC',
        slug: 'agressie-conflicthantering',
        title: 'Agressie- en conflicthantering in het verkeer',
        duration: '1 dagdeel met trainingsacteur',
        level: 'Verdieping voor verkeersregelaars & portiers',
        certification: 'Bewijs van deelname Atlas Academie',
        description:
          'Hoe blijf je rustig, duidelijk en professioneel bij ongeduldige of gefrustreerde weggebruikers? Praktijkgerichte training met herkenbare scenario’s aan de afzetting.',
        topics: ['Vroegtijdig herkennen van spanning', 'De-escalerende gesprekstechnieken', 'Eigen veiligheid & grenzen stellen'],
      },
      {
        code: 'TRAM-VP',
        slug: 'tramveiligheid',
        title: 'Veiligheidspersoon Tram (Werken nabij de trambaan)',
        duration: '1 dag theorie + toets',
        level: 'Specialisatie stedelijke infra',
        certification: 'Certificaat Veiligheidspersoon Tram',
        description:
          'Specialistische instructie voor veilig werken binnen of nabij het profiel van vrije ruimte van stedelijke trambanen en bovenleidingen.',
        topics: ['Profiel van vrije ruimte & remwegen', 'Waarschuwingsprocedures & wijkplaatsen', 'Bovenleidingsrisico’s'],
      },
    ] as CourseItem[],
    form: {
      index: '02 — AANMELDEN',
      note: 'DIRECT INSCHRIJVEN',
      headline: 'AANMELDEN VOOR EEN OPLEIDING',
      description:
        'Kies hieronder de gewenste opleiding. Binnen één werkdag nemen wij contact op over de eerstvolgende startdata en leslocaties (individueel of in-company).',
      submitLabel: 'Aanmelding versturen',
      successMessage:
        'Uw aanmelding is ontvangen. Onze opleidingscoördinator neemt binnen één werkdag contact met u op om de startdatum te bevestigen.',
    },
  },
  overOnsPage: {
    breadcrumb: 'HOME / OVER ONS',
    h1: 'VAKMANSCHAP OP HET ASFALT',
    lead: 'Atlas Holland B.V. is opgericht vanuit één duidelijke overtuiging: verkeersveiligheid rond bouw- en infraprojecten vraagt om mensen die hun vak verstaan én een planning die altijd bereikbaar is.',
    // TODO: replace with real Atlas photo
    heroImage: '/images/atlas-planning-ops.svg',
    heroImageAlt: 'Team en centrale planning van Atlas Holland B.V. bij de voorbereiding van wegwerkzaamheden',
    story: {
      index: '01 — ONS VERHAAL',
      note: 'OPGERICHT IN 2016',
      headline: 'ALLES ONDER ÉÉN DAK VOOR VEILIGE DOORSTROMING',
      paragraphs: [
        'Wie werkt aan de Nederlandse infrastructuur, weet hoe nauw uitvoering en omgeving op elkaar aansluiten. Een vertraagde vergunning, een onduidelijke omleiding of een onervaren post bij een bouwpoort leidt direct tot stilstand en irritatie.',
        'Daarom brengt Atlas Holland B.V. verkeerskundig ontwerp, tijdelijke verkeersmaatregelen en gecertificeerde vakmensen onder één dak samen. Onze verkeerskundigen tekenen plannen die buiten daadwerkelijk kloppen; onze eigen bordenploegen en verkeersregelaars voeren ze tot op de meter nauwkeurig uit.',
        'Vanuit ons centrale steunpunt in Utrecht sturen wij dagelijks projecten aan in alle twaalf provincies — voor gemeenten, grote en middelgrote aannemers, netbeheerders en evenementenorganisaties.',
      ],
    },
    values: {
      index: '02 — KERNWAARDEN',
      note: 'WAAR WIJ VOOR STAAN',
      headline: 'VIER PRINCIPES DIE ELKE INZET BEPALEN',
      items: [
        {
          number: '01',
          title: 'Veiligheid zonder compromis',
          description:
            'Geen werkvak gaat open voordat zichtlijnen, bebording en persoonlijke beschermingsmiddelen kloppen. Veiligheid voor weggebruikers, grondwerkers én onze eigen mensen staat altijd op één.',
        },
        {
          number: '02',
          title: 'Kwaliteit in voorbereiding en uitvoering',
          description:
            'Wij werken uitsluitend volgens CROW 96a/96b, BRL 9101 en VCA**-richtlijnen en leiden onze medewerkers doorlopend op via onze eigen praktijkacademie.',
        },
        {
          number: '03',
          title: 'Betrokkenheid op locatie',
          description:
            'Onze projectcoördinatoren zitten niet alleen achter een scherm, maar schouwen de werklocaties persoonlijk en houden direct contact met uw uitvoerder.',
        },
        {
          number: '04',
          title: 'Flexibiliteit — 24 uur per dag',
          description:
            'Infrastructuur houdt zich niet aan kantoortijden. Of het nu gaat om nachtelijk asfaltonderhoud of een spoedafsluiting op zondagochtend: wij staan paraat.',
        },
      ],
    },
    team: {
      index: '03 — HET TEAM',
      note: 'KORTE LIJNEN',
      headline: 'UW VASTE AANSPREEKPUNTEN',
      description:
        'Bij Atlas Holland B.V. krijgt u direct de juiste persoon aan de lijn. Maak kennis met de mensen achter onze planning, verkeerskunde en opleidingen.',
    },
  },
  werkenBijPage: {
    breadcrumb: 'HOME / WERKEN BIJ',
    h1Line1: 'JOUW INZET.',
    h1Line2: 'MAAKT HET VERSCHIL.',
    subHeadline: 'Geen ervaring? Wij leiden je op.',
    lead: 'Als verkeersregelaar of bouwportier bij Atlas Holland ben jij degene die zorgt dat wegwerkers veilig kunnen werken en iedereen veilig thuiskomt. Werk lekker buiten, op afwisselende locaties en in een hecht team dat altijd achter je staat.',
    // TODO: replace with real Atlas photo
    heroImage: '/images/atlas_careers_team_1794250082780.jpg',
    heroImageAlt: 'Verkeersregelaars van Atlas Holland in effen veiligheidskleding en helm op een werklocatie',
    benefitsSection: {
      index: '01 — WAT WIJ JOU BIEDEN',
      note: 'ARBEIDSVOORWAARDEN',
      headline: 'GOED GEREGELD VOOR ONZE VAKMENSEN',
      items: [
        {
          number: '01',
          title: 'Goed salaris, toeslagen & stipt op tijd betaald',
          description:
            'Een sterk startsalaris, 8,33% vakantiegeld, reiskostenvergoeding vanaf de eerste kilometer én extra toeslagen bij avond-, nacht- en weekenddiensten.',
        },
        {
          number: '02',
          title: 'Gratis erkende opleidingen via Atlas',
          description:
            'Nog geen aanstellingspas of VCA? Wij betalen en regelen jouw volledige opleiding tot beroepsverkeersregelaar. Zodra je slaagt, ga je direct betaald aan de slag.',
        },
        {
          number: '03',
          title: 'Complete professionele uitrusting & PBM',
          description:
            'Je krijgt van ons een compleet pakket hoogwaardige werkkleding voor elk seizoen, veiligheidsschoenen, helm en portofoon zodat je altijd comfortabel en veilig staat.',
        },
        {
          number: '04',
          title: 'Een hecht team & een planning die met je meedenkt',
          description:
            'Jij geeft aan hoeveel uur en op welke dagen je wilt werken (fulltime, parttime of flexibel). Onze planners kennen je bij naam en zorgen voor mooie klussen in jouw regio.',
        },
      ],
    },
    vacanciesSection: {
      index: '02 — OPENSTAANDE VACATURES',
      note: 'DIRECT INSTROMEN',
      headline: 'KIES JOUW ROL OP DE WEG',
    },
    vacancies: [
      {
        slug: 'beroepsverkeersregelaar-fulltime-parttime',
        code: 'VAC-01',
        title: 'Beroepsverkeersregelaar (Ervaren of In Opleiding)',
        region: 'Landelijk / In jouw eigen regio',
        hours: '16 – 40 uur per week',
        employmentType: 'Fulltime / Parttime / Flexibel',
        startLabel: 'Per direct of in overleg',
        salaryIndication: '€ 2.550 – € 3.250 bruto p/m (o.b.v. 40u) + toeslagen',
        shortSummary:
          'Begeleid verkeersstromen bij infra- en bouwprojecten in jouw regio. Ook zonder ervaring welkom: wij verzorgen je gratis SVNL- en VCA-opleiding.',
        intro:
          'Als beroepsverkeersregelaar bij Atlas Holland ben je het gezicht op locatie bij wegwerkzaamheden, nieuwbouwprojecten en evenementen. Jij houdt het overzicht, geeft duidelijke tekens en zorgt dat weggebruikers en wegwerkers veilig langs elkaar heen kunnen.',
        whatYouDo: [
          'Je regelt zelfstandig of in teamverband het verkeer rond wegwerkzaamheden, omleidingen en bouwplaatsen.',
          'Je bent het eerste aanspreekpunt voor automobilisten, fietsers, buurtbewoners en chauffeurs van werkverkeer.',
          'Je stemt op locatie af met de uitvoerder en je collega’s zodat de werkzone op elk moment veilig blijft.',
          'Je controleert of de bebording en afzetting rond jouw post goed en zichtbaar staat opgesteld.',
        ],
        whatWeAsk: [
          'Je bent minimaal 18 jaar en beheerst de Nederlandse taal goed in woord.',
          'Je staat stevig in je schoenen, blijft vriendelijk én duidelijk en werkt graag in de buitenlucht.',
          'Ervaring of een geldige SVNL-aanstellingspas is een pré, maar geen vereiste — wij leiden je gratis op.',
          'Een rijbewijs B is handig, maar ook met het OV zijn veel stedelijke projectlocaties uitstekend bereikbaar.',
        ],
        whatWeOffer: [
          'Gratis erkende opleiding tot landelijk beroepsverkeersregelaar (SVNL) en VCA.',
          'Uitstekend uurloon met onregelmatigheidstoeslagen voor avond-, nacht- en weekendwerk.',
          'Volledig verzorgd kleding- en veiligheidspakket voor zomer en winter.',
          'Uren en werkdagen in overleg met onze vaste planners.',
        ],
      },
      {
        slug: 'bouwportier-toegangscontrole',
        code: 'VAC-02',
        title: 'Bouwportier / Logistiek Verkeersregelaar',
        region: 'Randstad, Midden- en Zuid-Nederland',
        hours: '24 – 40 uur per week',
        employmentType: 'Fulltime / Parttime',
        startLabel: 'Per direct',
        salaryIndication: '€ 2.650 – € 3.350 bruto p/m (o.b.v. 40u)',
        shortSummary:
          'Houd de regie bij de toegangspoort van grote bouwprojecten: registreer bezoekers en begeleid zwaar bouwverkeer veilig de openbare weg op.',
        intro:
          'Als bouwportier ben je onmisbaar op binnenstedelijke bouwplaatsen. Je bewaakt de toegang tot het bouwterrein, ontvangt bezoekers en leveranciers en zorgt als bevoegd verkeersregelaar dat vrachtwagens en kranen veilig kunnen in- en uitrijden.',
        whatYouDo: [
          'Je bemant de portiersloge bij de hoofdingang van het bouwproject en controleert bouwplaats-ID’s en PBM-gebruik.',
          'Je registreert bezoekers, onderaannemers en geplande vrachtleveringen volgens het dagschema.',
          'Je begeleidt in- en uitrijdend bouwverkeer veilig over omliggende fietspaden en rijbanen.',
          'Je houdt de inrit en de directe omgeving van de bouwpoort vrij en overzichtelijk.',
        ],
        whatWeAsk: [
          'Je bent gastvrij, punctueel en durft mensen vriendelijk aan te spreken op veiligheidsvoorschriften.',
          'Je hebt een VCA-certificaat en aanstellingspas verkeersregelaar (of bent bereid deze gratis via ons te halen).',
          'Je vindt het prettig om langere tijd op één vaste projectlocatie onderdeel te zijn van het bouwteam.',
        ],
        whatWeOffer: [
          'Vaste projectlocaties voor langere duur met regelmatige dagtijden.',
          'Goed salaris, reiskostenvergoeding en stipte betaling.',
          'Doorgroeimogelijkheden naar hoofdbouwportier of projectcoördinator.',
        ],
      },
      {
        slug: 'vakman-tijdelijke-verkeersmaatregelen-brl9101',
        code: 'VAC-03',
        title: 'Vakman Tijdelijke Verkeersmaatregelen (BRL 9101)',
        region: 'Standplaats Utrecht (Landelijke inzet)',
        hours: '32 – 40 uur per week',
        employmentType: 'Fulltime',
        startLabel: 'Per direct',
        salaryIndication: '€ 2.850 – € 3.650 bruto p/m + storingsvergoeding',
        shortSummary:
          'Plaats, controleer en onderhoud tijdelijke verkeersmaatregelen, bebording en afzettingen met onze modern uitgeruste bedrijfswagens.',
        intro:
          'Met jouw collega-bordenplaatser ga je dagelijks op pad om wegafzettingen, omleidingsroutes en tekstkarren op te bouwen en in stand te houden volgens de CROW-richtlijnen.',
        whatYouDo: [
          'Je laadt de benodigde bebording, bakens en hekwerken in op onze werf in Utrecht.',
          'Je plaatst en verwijdert tijdelijke verkeersmaatregelen op projectlocaties aan de hand van de verkeerstekening.',
          'Je voert controleschouwen uit en herstelt afzettingen bij wijzigingen of calamiteiten.',
        ],
        whatWeAsk: [
          'Je bent in het bezit van rijbewijs B (BE is een groot pluspunt).',
          'Je bent praktisch ingesteld, fysiek fit en werkt nauwkeurig met tekeningen.',
          'In het bezit van VCA en BRL 9101, of gemotiveerd om het BRL 9101-certificaat op onze kosten te behalen.',
        ],
        whatWeOffer: [
          'Een afwisselende en zelfstandige functie met eigen modern uitgeruste werkbus.',
          'Uitstekend salaris met aantrekkelijke vergoedingen voor avond- en bereikbaarheidsdiensten.',
          'Volledige BRL 9101-vakopleiding en doorgroeikansen naar voorman of werkvoorbereider.',
        ],
      },
      {
        slug: 'evenementen-verkeersregelaar-bijbaan',
        code: 'VAC-04',
        title: 'Evenementenverkeersregelaar & Parkeerbegeleider (Flex / Bijbaan)',
        region: 'Landelijk',
        hours: '8 – 24 uur per week',
        employmentType: 'Parttime / Flexibel / Weekend',
        startLabel: 'Doorlopende instroom',
        salaryIndication: 'Goed uurloon + weekendtoeslagen',
        shortSummary:
          'Werk op de leukste festivals, sportwedstrijden en publieksevenementen van Nederland en bepaal zelf wanneer je beschikbaar bent.',
        intro:
          'Zoek je een afwisselende bijbaan of parttime baan in de buitenlucht? Als evenementenverkeersregelaar en parkeerbegeleider ben jij het eerste aanspreekpunt voor duizenden bezoekers.',
        whatYouDo: [
          'Je begeleidt bezoekersstromen en voertuigen op de aanrijroutes en parkeerterreinen van evenementen.',
          'Je wijst gasten gastvrij de weg en houdt de doorgang voor pendelbussen en hulpdiensten vrij.',
          'Je werkt samen in een gezellig team onder leiding van een ervaren coördinator op locatie.',
        ],
        whatWeAsk: [
          'Je bent minimaal 18 jaar, enthousiast en servicegericht.',
          'Je bent regelmatig beschikbaar in het weekend of tijdens het evenementenseizoen.',
          'Geen ervaring nodig: wij regelen vooraf jouw instructie.',
        ],
        whatWeOffer: [
          'Werken op toonaangevende evenementen en sportwedstrijden door heel Nederland.',
          'Flexibele planning via onze app: je kiest zelf de diensten die in jouw agenda passen.',
          'Gezamenlijk vervoer vanaf centrale opstappunten en goede catering op locatie.',
        ],
      },
    ] as VacancyItem[],
    stepsSection: {
      index: '03 — ZO WERKT HET',
      note: 'IN 4 STAPPEN OP DE WEG',
      headline: 'VAN SOLLICITATIE TOT EERSTE DIENST',
      steps: [
        {
          number: '01',
          title: 'Solliciteer in 2 minuten',
          description:
            'Vul het formulier onderaan deze pagina in. Een lang cv is niet nodig; we horen vooral graag wie je bent en hoeveel je wilt werken.',
        },
        {
          number: '02',
          title: 'Kennismaken met een kop koffie',
          description:
            'Binnen 2 werkdagen bellen we je op en nodigen we je uit voor een persoonlijk gesprek om alles rustig door te nemen.',
        },
        {
          number: '03',
          title: 'Gratis opleiding & uitrusting',
          description:
            'Heb je nog geen pas? Dan start je direct met de theorie en praktijkopleiding. Ondertussen meten we jouw kleding- en veiligheidspakket aan.',
        },
        {
          number: '04',
          title: 'Betaald aan de slag',
          description:
            'Je eerste diensten loop je samen met een ervaren collega, zodat je vol vertrouwen op je eigen post staat.',
        },
      ],
    },
    faqsSection: {
      index: '04 — VEELGESTELDE VRAGEN',
      note: 'WERKEN BIJ ATLAS',
      headline: 'ALLES WAT JE WILT WETEN VOOR JE START',
      items: [
        {
          question: 'Ik heb nog geen ervaring of certificaat. Kan ik toch solliciteren?',
          answer:
            'Ja, absoluut! Een groot deel van onze verkeersregelaars is zonder ervaring bij ons gestart. Wij regelen én betalen jouw volledige opleiding tot beroepsverkeersregelaar (SVNL) en je VCA-certificaat.',
        },
        {
          question: 'Kan ik zelf aangeven hoeveel uur en welke dagen ik wil werken?',
          answer:
            'Ja. Of je nu fulltime (32–40 uur) aan de slag wilt of parttime naast een studie of andere baan: we spreken vaste dagen of een flexibel rooster af dat bij jouw situatie past.',
        },
        {
          question: 'Heb ik een rijbewijs en eigen auto nodig?',
          answer:
            'Een rijbewijs B is erg handig omdat je dan op meer plekken inzetbaar bent (en bij vaste inzet een bedrijfsauto kunt rijden). Heb je geen rijbewijs? Dan plannen we je in op projecten die goed met het openbaar vervoer bereikbaar zijn of waar je kunt meerijden met een collega.',
        },
        {
          question: 'Hoe zit het met werkkleding voor regen en kou?',
          answer:
            'Wij zorgen voor een compleet, hoogwaardig kledingpakket voor alle weersomstandigheden: van doorwaai- en zomerkleding tot waterdichte winterparka’s, thermo-onderkleding, helm en S3-veiligheidsschoenen.',
        },
      ],
    },
    form: {
      index: '05 — DIRECT SOLLICITEREN',
      note: 'REACTIE BINNEN 2 WERKDAGEN',
      headline: 'ZET DE EERSTE STAP. SOLLICITEER DIRECT.',
      description:
        'Laat hieronder je gegevens achter. Onze recruiter Sanne neemt binnen twee werkdagen persoonlijk contact met je op.',
      submitLabel: 'Sollicitatie versturen',
      successMessage:
        'Bedankt voor je sollicitatie! We hebben je gegevens goed ontvangen en nemen binnen 2 werkdagen telefonisch contact met je op.',
    },
  },
  offertePage: {
    breadcrumb: 'HOME / OFFERTE AANVRAGEN',
    h1: 'OFFERTE OF INZET AANVRAGEN',
    lead: 'Vraag in drie korte stappen verkeersregelaars, tijdelijke verkeersmaatregelen of een verkeersplan aan. U ontvangt binnen 24 uur een heldere prijsopgave en capaciteitsbevestiging.',
    // TODO: replace with real Atlas photo
    heroImage: '/images/atlas_roadwork_panorama_1794250081740.jpg',
    heroImageAlt: 'Geplande inzet van verkeersregelaars en tijdelijke verkeersmaatregelen op een Nederlandse werklocatie',
    stepsHeader: ['01 DIENST', '02 PROJECT', '03 CONTACT'],
    sidePanel: {
      responseBadge: 'REACTIE BINNEN 24 UUR',
      responseTitle: 'Persoonlijk voorstel van onze planning',
      responseText:
        'Elke aanvraag wordt direct beoordeeld door een ervaren planner of verkeerskundige. Wij controleren de uitvoerbaarheid en sturen u binnen 24 uur een sluitend voorstel.',
      spoedBadge: 'SPOEDINZET NODIG?',
      spoedTitle: 'Direct verkeersregelaars op locatie',
      spoedText:
        'Heeft u vandaag of vannacht nog mensen of afzettingen nodig vanwege een calamiteit of storing? Bel rechtstreeks met onze 24/7 meldkamer.',
    },
    successTitle: 'Bedankt! We nemen binnen 24 uur contact met u op.',
    successText:
      'Uw aanvraag is geregistreerd bij onze centrale planning. Heeft uw aanvraag spoed voor vandaag? Bel dan direct ons 24/7 nummer.',
  },
  contactPage: {
    breadcrumb: 'HOME / CONTACT',
    h1: 'DIRECT CONTACT MET DE PLANNING',
    lead: 'Korte lijnen en directe antwoorden. Bel onze 24/7 centrale voor spoedinzet en lopende projecten, of stuur ons een bericht voor advies op maat.',
    // TODO: replace with real Atlas photo
    heroImage: '/images/atlas-planning-ops.svg',
    heroImageAlt: 'Centrale planning en kantoor van Atlas Holland B.V. in Utrecht',
    formHeadline: 'STUUR EEN BERICHT',
    formSuccess:
      'Bedankt voor uw bericht. Onze medewerkers nemen binnen één werkdag (en bij spoed direct) contact met u op.',
    detailsHeadline: 'BEREIKBAARHEID & VESTIGING',
    routeLabel: 'Plan route naar vestiging Utrecht',
  },
  legal: {
    privacy: {
      breadcrumb: 'HOME / PRIVACYVERKLARING',
      h1: 'PRIVACYVERKLARING',
      lead: 'Atlas Holland B.V. gaat zorgvuldig en vertrouwelijk om met persoonsgegevens van opdrachtgevers, websitebezoekers, cursisten en sollicitanten conform de Algemene Verordening Gegevensbescherming (AVG).',
      sections: [
        {
          code: '01 — VERWERKINGSVERANTWOORDELIJKE',
          title: 'Wie is verantwoordelijk voor de verwerking van uw gegevens?',
          body: 'Atlas Holland B.V., gevestigd aan de Atoomweg 412, 3542 AB te Utrecht (KvK 84920174), is verwerkingsverantwoordelijke voor de verwerking van persoonsgegevens zoals beschreven in deze verklaring.',
        },
        {
          code: '02 — DOELEN VAN VERWERKING',
          title: 'Waarvoor gebruiken wij uw persoonsgegevens?',
          body: 'Wij verwerken uw contact- en projectgegevens uitsluitend voor: (a) het opstellen en uitvoeren van offertes en opdrachten voor verkeersmaatregelen en personeelsinzet, (b) het verwerken van cursusinschrijvingen en certificeringen, en (c) het beoordelen van sollicitaties en het voeren van de personeels- en verloningsadministratie.',
        },
        {
          code: '03 — BEWAARTERMIJNEN',
          title: 'Hoe lang bewaren wij uw gegevens?',
          body: 'Offerte- en klantgegevens worden bewaard conform de wettelijke fiscale bewaartermijn van 7 jaar. Gegevens van sollicitanten (zoals motivatie en cv) worden uiterlijk 4 weken na afronding van de sollicitatieprocedure verwijderd, tenzij u toestemming geeft om uw gegevens gedurende maximaal 1 jaar in portefeuille te houden.',
        },
        {
          code: '04 — BEVEILIGING & RECHTEN',
          title: 'Beveiliging en uw rechten onder de AVG',
          body: 'Wij treffen passende technische en organisatorische maatregelen om misbruik en onbevoegde toegang tegen te gaan. U heeft te allen tijde het recht om uw gegevens in te zien, te laten corrigeren of te laten verwijderen via een verzoek aan ons e-mailadres.',
        },
      ],
    },
    terms: {
      breadcrumb: 'HOME / ALGEMENE VOORWAARDEN',
      h1: 'ALGEMENE VOORWAARDEN',
      lead: 'Op alle aanbiedingen, offertes, werkzaamheden en overeenkomsten van Atlas Holland B.V. zijn onderstaande kernbepalingen van toepassing.',
      sections: [
        {
          code: '01 — TOEPASSELIJKHEID & OFFERTES',
          title: 'Toepasselijkheid en totstandkoming van opdrachten',
          body: 'Deze voorwaarden zijn van toepassing op alle offertes en opdrachten van Atlas Holland B.V. voor het ter beschikking stellen van verkeersregelaars, bouwportiers, het opstellen van verkeers-/BLVC-plannen en het leveren van tijdelijke verkeersmaatregelen. Offertes zijn 30 dagen geldig, tenzij schriftelijk anders vermeld.',
        },
        {
          code: '02 — UITVOERING & VEILIGHEID OP LOCATIE',
          title: 'Verplichtingen rond veiligheid en werkomstandigheden',
          body: 'Atlas Holland B.V. levert gecertificeerd personeel met voorgeschreven persoonlijke beschermingsmiddelen. Opdrachtgever draagt zorg voor tijdige en juiste informatie over de werklocatie, vergunningen en eventuele bijzondere risico’s conform de Arbowet.',
        },
        {
          code: '03 — WIJZIGINGEN, ANNULERING & SPOEDINZET',
          title: 'Planning, minimale afname en annulering',
          body: 'Voor reguliere personeelsinzet geldt een minimale afname van 4 uur per dienst. Kosteloze annulering of verschuiving van geplande diensten is mogelijk tot 24 uur voor aanvang van de dienst; bij annulering binnen 24 uur voor aanvang worden de gereserveerde uren conform tarief in rekening gebracht.',
        },
        {
          code: '04 — MATERIAAL & AANSPRAKELIJKHEID',
          title: 'Gehuurde verkeersmaatregelen en aansprakelijkheid',
          body: 'Geplaatste bebording, bakens, hekwerken en tekstwagens blijven eigendom van Atlas Holland B.V. Schade of vermissing op de projectlocatie buiten toedoen van Atlas Holland B.V. komt voor rekening van de opdrachtgever. Op alle rechtsverhoudingen is uitsluitend Nederlands recht van toepassing.',
        },
      ],
    },
  },
  footer: {
    servicesTitle: 'DIENSTEN',
    companyTitle: 'ATLAS HOLLAND',
    contactTitle: '24/7 CONTACT & VESTIGING',
    rights: '© 2026 Atlas Holland B.V. Alle rechten voorbehouden.',
    privacyLabel: 'Privacyverklaring',
    termsLabel: 'Algemene voorwaarden',
  },
};

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return nl.services.find((s) => s.slug === slug);
}

export function getVacancyBySlug(slug: string): VacancyItem | undefined {
  return nl.werkenBijPage.vacancies.find((v) => v.slug === slug);
}
