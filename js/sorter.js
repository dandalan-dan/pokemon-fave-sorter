/**
 * PokéSort — sorter.js
 * Uses a merge-sort-based comparison algorithm.
 * Images: official Pokémon sprites from PokéAPI (placeholder until you swap your own).
 */

// ─── POKEMON DATA ──────────────────────────────────────────────────────────
// Each entry: { id, name, gen }
// Sprites are fetched from PokéAPI by id.
const GEN_RANGES = [
  { gen: 1, label: 'Gen I',   sub: '#001 – 151',  start: 1,   end: 151  },
  { gen: 2, label: 'Gen II',  sub: '#152 – 251',  start: 152, end: 251  },
  { gen: 3, label: 'Gen III', sub: '#252 – 386',  start: 252, end: 386  },
  { gen: 4, label: 'Gen IV',  sub: '#387 – 493',  start: 387, end: 493  },
  { gen: 5, label: 'Gen V',   sub: '#494 – 649',  start: 494, end: 649  },
  { gen: 6, label: 'Gen VI',  sub: '#650 – 721',  start: 650, end: 721  },
  { gen: 7, label: 'Gen VII', sub: '#722 – 809',  start: 722, end: 809  },
  { gen: 8, label: 'Gen VIII',sub: '#810 – 905',  start: 810, end: 905  },
  { gen: 9, label: 'Gen IX',  sub: '#906 – 1025', start: 906, end: 1025 },
];

// Pokémon names (first 151 hardcoded; rest generated as "Pokémon #NNN")
// For a real build replace this with a full name list or a JSON fetch.
const KNOWN_NAMES = {
  1:'Bulbasaur',2:'Ivysaur',3:'Venusaur',4:'Charmander',5:'Charmeleon',6:'Charizard',7:'Squirtle',8:'Wartortle',9:'Blastoise',10:'Caterpie',11:'Metapod',12:'Butterfree',13:'Weedle',14:'Kakuna',15:'Beedrill',16:'Pidgey',17:'Pidgeotto',18:'Pidgeot',19:'Rattata',20:'Raticate',21:'Spearow',22:'Fearow',23:'Ekans',24:'Arbok',25:'Pikachu',26:'Raichu',27:'Sandshrew',28:'Sandslash',29:'Nidoran♀',30:'Nidorina',31:'Nidoqueen',32:'Nidoran♂',33:'Nidorino',34:'Nidoking',35:'Clefairy',36:'Clefable',37:'Vulpix',38:'Ninetales',39:'Jigglypuff',40:'Wigglytuff',41:'Zubat',42:'Golbat',43:'Oddish',44:'Gloom',45:'Vileplume',46:'Paras',47:'Parasect',48:'Venonat',49:'Venomoth',50:'Diglett',51:'Dugtrio',52:'Meowth',53:'Persian',54:'Psyduck',55:'Golduck',56:'Mankey',57:'Primeape',58:'Growlithe',59:'Arcanine',60:'Poliwag',61:'Poliwhirl',62:'Poliwrath',63:'Abra',64:'Kadabra',65:'Alakazam',66:'Machop',67:'Machoke',68:'Machamp',69:'Bellsprout',70:'Weepinbell',71:'Victreebel',72:'Tentacool',73:'Tentacruel',74:'Geodude',75:'Graveler',76:'Golem',77:'Ponyta',78:'Rapidash',79:'Slowpoke',80:'Slowbro',81:'Magnemite',82:'Magneton',83:"Farfetch'd",84:'Doduo',85:'Dodrio',86:'Seel',87:'Dewgong',88:'Grimer',89:'Muk',90:'Shellder',91:'Cloyster',92:'Gastly',93:'Haunter',94:'Gengar',95:'Onix',96:'Drowzee',97:'Hypno',98:'Krabby',99:'Kingler',100:'Voltorb',101:'Electrode',102:'Exeggcute',103:'Exeggutor',104:'Cubone',105:'Marowak',106:'Hitmonlee',107:'Hitmonchan',108:'Lickitung',109:'Koffing',110:'Weezing',111:'Rhyhorn',112:'Rhydon',113:'Chansey',114:'Tangela',115:'Kangaskhan',116:'Horsea',117:'Seadra',118:'Goldeen',119:'Seaking',120:'Staryu',121:'Starmie',122:'Mr. Mime',123:'Scyther',124:'Jynx',125:'Electabuzz',126:'Magmar',127:'Pinsir',128:'Tauros',129:'Magikarp',130:'Gyarados',131:'Lapras',132:'Ditto',133:'Eevee',134:'Vaporeon',135:'Jolteon',136:'Flareon',137:'Porygon',138:'Omanyte',139:'Omastar',140:'Kabuto',141:'Kabutops',142:'Aerodactyl',143:'Snorlax',144:'Articuno',145:'Zapdos',146:'Moltres',147:'Dratini',148:'Dragonair',149:'Dragonite',150:'Mewtwo',151:'Mew',
  152:'Chikorita',153:'Bayleef',154:'Meganium',155:'Cyndaquil',156:'Quilava',157:'Typhlosion',158:'Totodile',159:'Croconaw',160:'Feraligatr',161:'Sentret',162:'Furret',163:'Hoothoot',164:'Noctowl',165:'Ledyba',166:'Ledian',167:'Spinarak',168:'Ariados',169:'Crobat',170:'Chinchou',171:'Lanturn',172:'Pichu',173:'Cleffa',174:'Igglybuff',175:'Togepi',176:'Togetic',177:'Natu',178:'Xatu',179:'Mareep',180:'Flaaffy',181:'Ampharos',182:'Bellossom',183:'Marill',184:'Azumarill',185:'Sudowoodo',186:'Politoed',187:'Hoppip',188:'Skiploom',189:'Jumpluff',190:'Aipom',191:'Sunkern',192:'Sunflora',193:'Yanma',194:'Wooper',195:'Quagsire',196:'Espeon',197:'Umbreon',198:'Murkrow',199:'Slowking',200:'Misdreavus',201:'Unown',202:'Wobbuffet',203:'Girafarig',204:'Pineco',205:'Forretress',206:'Dunsparce',207:'Gligar',208:'Steelix',209:'Snubbull',210:'Granbull',211:'Qwilfish',212:'Scizor',213:'Shuckle',214:'Heracross',215:'Sneasel',216:'Teddiursa',217:'Ursaring',218:'Slugma',219:'Magcargo',220:'Swinub',221:'Piloswine',222:'Corsola',223:'Remoraid',224:'Octillery',225:'Delibird',226:'Mantine',227:'Skarmory',228:'Houndour',229:'Houndoom',230:'Kingdra',231:'Phanpy',232:'Donphan',233:'Porygon2',234:'Stantler',235:'Smeargle',236:'Tyrogue',237:'Hitmontop',238:'Smoochum',239:'Elekid',240:'Magby',241:'Miltank',242:'Blissey',243:'Raikou',244:'Entei',245:'Suicune',246:'Larvitar',247:'Pupitar',248:'Tyranitar',249:'Lugia',250:'Ho-Oh',251:'Celebi',
  252: 'Treecko', 253: 'Grovyle', 254: 'Sceptile', 255: 'Torchic', 256: 'Combusken', 257: 'Blaziken', 258: 'Mudkip', 259: 'Marshtomp', 260: 'Swampert', 261: 'Poochyena', 262: 'Mightyena', 263: 'Zigzagoon', 264: 'Linoone', 265: 'Wurmple', 266: 'Silcoon', 267: 'Beautifly', 268: 'Cascoon', 269: 'Dustox', 270: 'Lotad', 271: 'Lombre', 272: 'Ludicolo', 273: 'Seedot', 274: 'Nuzleaf', 275: 'Shiftry', 276: 'Taillow', 277: 'Swellow', 278: 'Wingull', 279: 'Pelipper', 280: 'Ralts', 281: 'Kirlia', 282: 'Gardevoir', 283: 'Surskit', 284: 'Masquerain', 285: 'Shroomish', 286: 'Breloom', 287: 'Slakoth', 288: 'Vigoroth', 289: 'Slaking', 290: 'Nincada', 291: 'Ninjask', 292: 'Shedinja', 293: 'Whismur', 294: 'Loudred', 295: 'Exploud', 296: 'Makuhita', 297: 'Hariyama', 298: 'Azurill', 299: 'Nosepass', 300: 'Skitty', 301: 'Delcatty', 302: 'Sableye', 303: 'Mawile', 304: 'Aron', 305: 'Lairon', 306: 'Aggron', 307: 'Meditite', 308: 'Medicham', 309: 'Electrike', 310: 'Manectric', 311: 'Plusle', 312: 'Minun', 313: 'Volbeat', 314: 'Illumise', 315: 'Roselia', 316: 'Gulpin', 317: 'Swalot', 318: 'Carvanha', 319: 'Sharpedo', 320: 'Wailmer', 321: 'Wailord', 322: 'Numel', 323: 'Camerupt', 324: 'Torkoal', 325: 'Spoink', 326: 'Grumpig', 327: 'Spinda', 328: 'Trapinch', 329: 'Vibrava', 330: 'Flygon', 331: 'Cacnea', 332: 'Cacturne', 333: 'Swablu', 334: 'Altaria', 335: 'Zangoose', 336: 'Seviper', 337: 'Lunatone', 338: 'Solrock', 339: 'Barboach', 340: 'Whiscash', 341: 'Corphish', 342: 'Crawdaunt', 343: 'Baltoy', 344: 'Claydol', 345: 'Lileep', 346: 'Cradily', 347: 'Anorith', 348: 'Armaldo', 349: 'Feebas', 350: 'Milotic', 351: 'Castform', 352: 'Kecleon', 353: 'Shuppet', 354: 'Banette', 355: 'Duskull', 356: 'Dusclops', 357: 'Tropius', 358: 'Chimecho', 359: 'Absol', 360: 'Wynaut', 361: 'Snorunt', 362: 'Glalie', 363: 'Spheal', 364: 'Sealeo', 365: 'Walrein', 366: 'Clamperl', 367: 'Huntail', 368: 'Gorebyss', 369: 'Relicanth', 370: 'Luvdisc', 371: 'Bagon', 372: 'Shelgon', 373: 'Salamence', 374: 'Beldum', 375: 'Metang', 376: 'Metagross', 377: 'Regirock', 378: 'Regice', 379: 'Registeel', 380: 'Latias', 381: 'Latios', 382: 'Kyogre', 383: 'Groudon', 384: 'Rayquaza', 385: 'Jirachi', 386: 'Deoxys',
  387: 'Turtwig', 388: 'Grotle', 389: 'Torterra', 390: 'Chimchar', 391: 'Monferno', 392: 'Infernape', 393: 'Piplup', 394: 'Prinplup', 395: 'Empoleon', 396: 'Starly', 397: 'Staravia', 398: 'Staraptor', 399: 'Bidoof', 400: 'Bibarel', 401: 'Kricketot', 402: 'Kricketune', 403: 'Shinx', 404: 'Luxio', 405: 'Luxray', 406: 'Budew', 407: 'Roserade', 408: 'Cranidos', 409: 'Rampardos', 410: 'Shieldon', 411: 'Bastiodon', 412: 'Burmy', 413: 'Wormadam', 414: 'Mothim', 415: 'Combee', 416: 'Vespiquen', 417: 'Pachirisu', 418: 'Buizel', 419: 'Floatzel', 420: 'Cherubi', 421: 'Cherrim', 422: 'Shellos', 423: 'Gastrodon', 424: 'Ambipom', 425: 'Drifloon', 426: 'Drifblim', 427: 'Buneary', 428: 'Lopunny', 429: 'Mismagius', 430: 'Honchkrow', 431: 'Glameow', 432: 'Purugly', 433: 'Chingling', 434: 'Stunky', 435: 'Skuntank', 436: 'Bronzor', 437: 'Bronzong', 438: 'Bonsly', 439: 'Mime Jr.', 440: 'Happiny', 441: 'Chatot', 442: 'Spiritomb', 443: 'Gible', 444: 'Gabite', 445: 'Garchomp', 446: 'Munchlax', 447: 'Riolu', 448: 'Lucario', 449: 'Hippopotas', 450: 'Hippowdon', 451: 'Skorupi', 452: 'Drapion', 453: 'Croagunk', 454: 'Toxicroak', 455: 'Carnivine', 456: 'Finneon', 457: 'Lumineon', 458: 'Mantyke', 459: 'Snover', 460: 'Abomasnow', 461: 'Weavile', 462: 'Magnezone', 463: 'Lickilicky', 464: 'Rhyperior', 465: 'Tangrowth', 466: 'Electivire', 467: 'Magmortar', 468: 'Togekiss', 469: 'Yanmega', 470: 'Leafeon', 471: 'Glaceon', 472: 'Gliscor', 473: 'Mamoswine', 474: 'Porygon-Z', 475: 'Gallade', 476: 'Probopass', 477: 'Dusknoir', 478: 'Froslass', 479: 'Rotom', 480: 'Uxie', 481: 'Mesprit', 482: 'Azelf', 483: 'Dialga', 484: 'Palkia', 485: 'Heatran', 486: 'Regigigas', 487: 'Giratina', 488: 'Cresselia', 489: 'Phione', 490: 'Manaphy', 491: 'Darkrai', 492: 'Shaymin', 493: 'Arceus',
  494: 'Victini', 495: 'Snivy', 496: 'Servine', 497: 'Serperior', 498: 'Tepig', 499: 'Pignite', 500: 'Emboar', 501: 'Oshawott', 502: 'Dewott', 503: 'Samurott', 504: 'Patrat', 505: 'Watchog', 506: 'Lillipup', 507: 'Herdier', 508: 'Stoutland', 509: 'Purrloin', 510: 'Liepard', 511: 'Pansage', 512: 'Simisage', 513: 'Pansear', 514: 'Simisear', 515: 'Panpour', 516: 'Simipour', 517: 'Munna', 518: 'Musharna', 519: 'Pidove', 520: 'Tranquill', 521: 'Unfezant', 522: 'Blitzle', 523: 'Zebstrika', 524: 'Roggenrola', 525: 'Boldore', 526: 'Gigalith', 527: 'Woobat', 528: 'Swoobat', 529: 'Drilbur', 530: 'Excadrill', 531: 'Audino', 532: 'Timburr', 533: 'Gurdurr', 534: 'Conkeldurr', 535: 'Tympole', 536: 'Palpitoad', 537: 'Seismitoad', 538: 'Throh', 539: 'Sawk', 540: 'Sewaddle', 541: 'Swadloon', 542: 'Leavanny', 543: 'Venipede', 544: 'Whirlipede', 545: 'Scolipede', 546: 'Cottonee', 547: 'Whimsicott', 548: 'Petilil', 549: 'Lilligant', 550: 'Basculin', 551: 'Sandile', 552: 'Krokorok', 553: 'Krookodile', 554: 'Darumaka', 555: 'Darmanitan', 556: 'Maractus', 557: 'Dwebble', 558: 'Crustle', 559: 'Scraggy', 560: 'Scrafty', 561: 'Sigilyph', 562: 'Yamask', 563: 'Cofagrigus', 564: 'Tirtouga', 
  565: 'Carracosta', 566: 'Archen', 567: 'Archeops', 568: 'Trubbish', 569: 'Garbodor', 570: 'Zorua', 571: 'Zoroark', 572: 'Minccino', 573: 'Cinccino', 574: 'Gothita', 575: 'Gothorita', 576: 'Gothitelle', 577: 'Solosis', 578: 'Duosion', 579: 'Reuniclus', 580: 'Ducklett', 581: 'Swanna', 582: 'Vanillite', 583: 'Vanillish', 584: 'Vanilluxe', 585: 'Deerling', 586: 'Sawsbuck', 587: 'Emolga', 588: 'Karrablast', 589: 'Escavalier', 590: 'Foongus', 591: 'Amoonguss', 592: 'Frillish', 593: 'Jellicent', 594: 'Alomomola', 595: 'Joltik', 596: 'Galvantula', 597: 'Ferroseed', 598: 'Ferrothorn', 599: 'Klink', 600: 'Klang', 601: 'Klinklang', 602: 'Tynamo', 603: 'Eelektrik', 604: 'Eelektross', 605: 'Elgyem', 606: 'Beheeyem', 607: 'Litwick', 608: 'Lampent', 609: 'Chandelure', 610: 'Axew', 611: 'Fraxure', 612: 'Haxorus', 613: 'Cubchoo', 614: 'Beartic', 615: 'Cryogonal', 616: 'Shelmet', 617: 'Accelgor', 618: 'Stunfisk', 619: 'Mienfoo', 620: 'Mienshao', 621: 'Druddigon', 622: 'Golett', 623: 'Golurk', 624: 'Pawniard', 625: 'Bisharp', 626: 'Bouffalant', 627: 'Rufflet', 628: 'Braviary', 629: 'Vullaby', 630: 'Mandibuzz', 631: 'Heatmor', 632: 'Durant', 633: 'Deino', 634: 'Zweilous', 635: 'Hydreigon', 636: 'Larvesta', 637: 'Volcarona', 638: 'Cobalion', 639: 'Terrakion', 640: 'Virizion', 641: 'Tornadus', 642: 'Thundurus', 643: 'Reshiram', 644: 'Zekrom', 645: 'Landorus', 646: 'Kyurem', 647: 'Keldeo', 648: 'Meloetta', 649: 'Genesect',
  650: 'Chespin', 651: 'Quilladin', 652: 'Chesnaught', 653: 'Fennekin', 654: 'Braixen', 655: 'Delphox', 656: 'Froakie', 657: 'Frogadier', 658: 'Greninja', 659: 'Bunnelby', 660: 'Diggersby', 661: 'Fletchling', 662: 'Fletchinder', 663: 'Talonflame', 664: 'Scatterbug', 665: 'Spewpa', 666: 'Vivillon', 667: 'Litleo', 668: 'Pyroar', 669: 'Flabébé', 670: 'Floette', 671: 'Florges', 672: 'Skiddo', 673: 'Gogoat', 674: 'Pancham', 675: 'Pangoro', 676: 'Furfrou', 677: 'Espurr', 678: 'Meowstic', 679: 'Honedge', 680: 'Doublade', 681: 'Aegislash', 682: 'Spritzee', 683: 'Aromatisse', 684: 'Swirlix', 685: 'Slurpuff', 686: 'Inkay', 687: 'Malamar', 688: 'Binacle', 689: 'Barbaracle', 690: 'Skrelp', 691: 'Dragalge', 692: 'Clauncher', 693: 'Clawitzer', 694: 'Helioptile', 695: 'Heliolisk', 696: 'Tyrunt', 697: 'Tyrantrum', 698: 'Amaura', 699: 'Aurorus', 700: 'Sylveon', 701: 'Hawlucha', 702: 'Dedenne', 703: 'Carbink', 704: 'Goomy', 705: 'Sliggoo', 706: 'Goodra', 707: 'Klefki', 708: 'Phantump', 709: 'Trevenant', 710: 'Pumpkaboo', 711: 'Gourgeist', 712: 'Bergmite', 713: 'Avalugg', 714: 'Noibat', 715: 'Noivern', 716: 'Xerneas', 717: 'Yveltal', 718: 'Zygarde', 719: 'Diancie', 720: 'Hoopa', 721: 'Volcanion',
  722:'Rowlet',723:'Dartrix',724:'Decidueye',725:'Litten',726:'Torracat',727:'Incineroar',728:'Popplio',729:'Brionne',730:'Primarina',731:'Pikipek',732:'Trumbeak',733:'Toucannon',734:'Yungoos',735:'Gumshoos',736:'Grubbin',737:'Charjabug',738:'Vikavolt',739:'Crabrawler',740:'Crabominable',741:'Oricorio',742:'Cutiefly',743:'Ribombee',744:'Rockruff',745:'Lycanroc',746:'Wishiwashi',747:'Mareanie',748:'Toxapex',749:'Mudbray',750:'Mudsdale',751:'Dewpider',752:'Araquanid',753:'Fomantis',754:'Lurantis',755:'Morelull',756:'Shiinotic',757:'Salandit',758:'Salazzle',759:'Stufful',760:'Bewear',761:'Bounsweet',762:'Steenee',763:'Tsareena',764:'Comfey',765:'Oranguru',766:'Passimian',767:'Wimpod',768:'Golisopod',769:'Sandygast',770:'Palossand',771:'Pyukumuku',772:'Type: Null',773:'Silvally',774:'Minior',775:'Komala',776:'Turtonator',777:'Togedemaru',778:'Mimikyu',779:'Bruxish',780:'Drampa',781:'Dhelmise',782:'Jangmo-o',783:'Hakamo-o',784:'Kommo-o',785:'Tapu Koko',786:'Tapu Lele',787:'Tapu Bulu',788:'Tapu Fini',789:'Cosmog',790:'Cosmoem',791:'Solgaleo',792:'Lunala',793:'Nihilego',794:'Buzzwole',795:'Pheromosa',796:'Xurkitree',797:'Celesteela',798:'Kartana',799:'Guzzlord',800:'Necrozma',801:'Magearna',802:'Marshadow',803:'Poipole',804:'Naganadel',805:'Stakataka',806:'Blacephalon',807:'Zeraora',808:'Meltan',809:'Melmetal',
  810:'Grookey',811:'Thwackey',812:'Rillaboom',813:'Scorbunny',814:'Raboot',815:'Cinderace',816:'Sobble',817:'Drizzile',818:'Inteleon',819:'Skwovet',820:'Greedent',821:'Rookidee',822:'Corvisquire',823:'Corviknight',824:'Blipbug',825:'Dottler',826:'Orbeetle',827:'Nickit',828:'Thievul',829:'Gossifleur',830:'Eldegoss',831:'Wooloo',832:'Dubwool',833:'Chewtle',834:'Drednaw',835:'Yamper',836:'Boltund',837:'Rolycoly',838:'Carkol',839:'Coalossal',840:'Applin',841:'Flapple',842:'Appletun',843:'Silicobra',844:'Sandaconda',845:'Cramorant',846:'Arrokuda',847:'Barraskewda',848:'Toxel',849:'Toxtricity',850:'Sizzlipede',851:'Centiskorch',852:'Clobbopus',853:'Grapploct',854:'Sinistea',855:'Polteageist',856:'Hatenna',857:'Hattrem',858:'Hatterene',859:'Impidimp',860:'Morgrem',861:'Grimmsnarl',862:'Obstagoon',863:'Perrserker',864:'Cursola',865:'Sirfetch’d',866:'Mr. Rime',867:'Runerigus',868:'Milcery',869:'Alcremie',870:'Falinks',871:'Pincurchin',872:'Snom',873:'Frosmoth',874:'Stonjourner',875:'Eiscue',876:'Indeedee',877:'Morpeko',878:'Cufant',879:'Copperajah',880:'Dracozolt',881:'Arctozolt',882:'Dracovish',883:'Arctovish',884:'Duraludon',885:'Dreepy',886:'Drakloak',887:'Dragapult',888:'Zacian',889:'Zamazenta',890:'Eternatus',891:'Kubfu',892:'Urshifu',893:'Zarude',894:'Regieleki',895:'Regidrago',896:'Glastrier',897:'Spectrier',898:'Calyrex',899:'Wyrdeer',900:'Kleavor',901:'Ursaluna',902:'Basculegion',903:'Sneasler',904:'Overqwil',905:'Enamorus',
  906:'Sprigatito',907:'Floragato',908:'Meowscarada',909:'Fuecoco',910:'Crocalor',911:'Skeledirge',912:'Quaxly',913:'Quaxwell',914:'Quaquaval',915:'Lechonk',916:'Oinkologne',917:'Tarountula',918:'Spidops',919:'Nymble',920:'Lokix',921:'Pawmi',922:'Pawmo',923:'Pawmot',924:'Tandemaus',925:'Maushold',926:'Fidough',927:'Dachsbun',928:'Smoliv',929:'Dolliv',930:'Arboliva',931:'Squawkabilly',932:'Nacli',933:'Naclstack',934:'Garganacl',935:'Charcadet',936:'Armarouge',937:'Ceruledge',938:'Tadbulb',939:'Bellibolt',940:'Wattrel',941:'Kilowattrel',942:'Maschiff',943:'Mabosstiff',944:'Shroodle',945:'Grafaiai',946:'Bramblin',947:'Brambleghast',948:'Toedscool',949:'Toedscruel',950:'Klawf',951:'Capsakid',952:'Scovillain',953:'Rellor',954:'Rabsca',955:'Flittle',956:'Espathra',957:'Tinkatink',958:'Tinkatuff',959:'Tinkaton',960:'Wiglett',961:'Wugtrio',962:'Bombirdier',963:'Finizen',964:'Palafin',965:'Varoom',966:'Revavroom',967:'Cyclizar',968:'Orthworm',969:'Glimmet',970:'Glimmora',971:'Greavard',972:'Houndstone',973:'Flamigo',974:'Cetoddle',975:'Cetitan',976:'Veluza',977:'Dondozo',978:'Tatsugiri',979:'Annihilape',980:'Clodsire',981:'Farigiraf',982:'Dudunsparce',983:'Kingambit',984:'Great Tusk',985:'Scream Tail',986:'Brute Bonnet',987:'Flutter Mane',988:'Slither Wing',989:'Sandy Shocks',990:'Iron Treads',991:'Iron Bundle',992:'Iron Hands',993:'Iron Jugulis',994:'Iron Moth',995:'Iron Thorns',996:'Frigibax',997:'Arctibax',998:'Baxcalibur',999:'Gimmighoul',1000:'Gholdengo',1001:'Wo-Chien',1002:'Chien-Pao',1003:'Ting-Lu',1004:'Chi-Yu',1005:'Roaring Moon',1006:'Iron Valiant',1007:'Koraidon',1008:'Miraidon',1009:'Walking Wake',1010:'Iron Leaves',1011:'Dipplin',1012:'Poltchageist',1013:'Sinistcha',1014:'Okidogi',1015:'Munkidori',1016:'Fezandipiti',1017:'Ogerpon',1018:'Archaludon',1019:'Hydrapple',1020:'Gouging Fire',1021:'Raging Bolt',1022:'Iron Boulder',1023:'Iron Crown',1024:'Terapagos',1025:'Pecharunt'
};

function getPokemonName(id) {
  return KNOWN_NAMES[id] || `Pokémon #${id}`;
}

// ─── CLASSIFICATION SETS ───────────────────────────────────────────────────

const MYTHICALS = new Set([
  151,  // Mew
  251,  // Celebi
  385,  // Jirachi
  386,  // Deoxys
  489,490, // Phione, Manaphy
  491,  // Darkrai
  492,  // Shaymin
  493,  // Arceus
  494,  // Victini
  647,  // Keldeo
  648,  // Meloetta
  649,  // Genesect
  719,  // Diancie
  720,  // Hoopa
  721,  // Volcanion
  801,  // Magearna
  802,  // Marshadow
  807,  // Zeraora
  808,809, // Meltan, Melmetal
  893,  // Zarude
  905,  // Enamorus (mythical in some lists)
  1014, // Pecharunt
]);

const LEGENDARIES = new Set([
  // Gen 1
  144,145,146,150,
  // Gen 2
  243,244,245,249,250,
  // Gen 3
  377,378,379,380,381,382,383,384,
  // Gen 4
  480,481,482,483,484,485,486,487,488,
  // Gen 5
  638,639,640,641,642,643,644,645,646,
  // Gen 6
  716,717,718,
  // Gen 7
  785,786,787,788,789,790,791,792,793,794,795,796,797,798,799,800,
  // Gen 8
  888,889,890,891,892,894,895,896,897,898,
  // Gen 9
  995,997,999,1001,1003,1007,1008,1009,1010,
]);

// Starters: all three starter lines (stage 1, 2, 3) for each generation
const STARTERS = new Set([
  // Gen 1
  1,2,3,4,5,6,7,8,9,
  // Gen 2
  152,153,154,155,156,157,158,159,160,
  // Gen 3
  252,253,254,255,256,257,258,259,260,
  // Gen 4
  387,388,389,390,391,392,393,394,395,
  // Gen 5
  495,496,497,498,499,500,501,502,503,
  // Gen 6
  650,651,652,653,654,655,656,657,658,
  // Gen 7
  722,723,724,725,726,727,728,729,730,
  // Gen 8
  810,811,812,813,814,815,816,817,818,
  // Gen 9
  906,907,908,909,910,911,912,913,914,
]);

// Evolution stages: 1 = base/first, 2 = middle, 3 = final
// Pokémon not in an evolution line are treated as "final" (stage 3)
const STAGE_MAP = (() => {
  // [ [stage1, stage2, stage3?], ... ]  — lists of chains
  const chains = [
    // Gen 1
    [1,2,3],[4,5,6],[7,8,9],[10,11,12],[13,14,15],[16,17,18],
    [19,20],[21,22],[23,24],[25,26],[27,28],[29,30,31],[32,33,34],
    [35,36],[37,38],[39,40],[41,42,169],[43,44,45],[46,47],
    [48,49],[50,51],[52,53],[54,55],[56,57],[58,59],
    [60,61,62],[63,64,65],[66,67,68],[69,70,71],[72,73],
    [74,75,76],[77,78],[79,80],[81,82],[84,85],[86,87],
    [88,89],[90,91],[92,93,94],[96,97],[98,99],[100,101],
    [102,103],[104,105],[109,110],[111,112],[113],[114],
    [116,117],[118,119],[120,121],[129,130],[133],[134],[135],[136],
    [137],[138,139],[140,141],[142],[143],[144],[145],[146],[147,148,149],[150],[151],
    // Gen 2
    [152,153,154],[155,156,157],[158,159,160],[161,162],[163,164],
    [165,166],[167,168],[170,171],[172,25,26],[173,35,36],[174,39,40],
    [175,176],[177,178],[179,180,181],[182],[183,184],[185],
    [186],[187,188,189],[190],[191,192],[193],[194,195],
    [196],[197],[198],[199],[200],[201],[202],[203],[204,205],
    [206],[207],[208],[209,210],[211],[212],[213],[214],[215],
    [216,217],[218,219],[220,221],[222],[223,224],[225],[226],[227],
    [228,229],[230],[231,232],[233],[234],[235],[236,106],[236,107],[236,237],
    [238,124],[239,125],[240,126],[241],[242],[243],[244],[245],
    [246,247,248],[249],[250],[251],
    // Gen 3
    [252,253,254],[255,256,257],[258,259,260],[261,262],[263,264],
    [265,266,267],[265,268,269],[270,271,272],[273,274,275],
    [276,277],[278,279],[280,281,282],[283,284],[285,286],[287,288,289],
    [290,291],[290,292],[293,294,295],[296,297],[298],[299,476],
    [300,301],[302],[303],[304,305,306],[307,308],[309,310],
    [311],[312],[313],[314],[315],[316,317],[318,319],[320,321],
    [322,323],[324],[325,326],[327],[328,329,330],[331,332],
    [333,334],[335],[336],[337],[338],[339,340],[341,342],
    [343,344],[345,346],[347,348],[349,350],[351],[352],[353,354],
    [355,356],[357],[358],[359],[360,202],[361,362],[363,364,365],
    [366,367,368],[369],[370],[371,372,373],[374,375,376],
    [377],[378],[379],[380],[381],[382],[383],[384],[385],[386],
    // Gen 4
    [387,388,389],[390,391,392],[393,394,395],[396,397,398],
    [399,400],[401,402],[403,404,405],[406,407],[408,409],[410,411],
    [412,413],[414],[415,416],[417],[418,419],[420,421],[422,423],
    [424],[425,426],[427,428],[429],[430],[431,432],[433,442],
    [434,435],[436,437],[438,185],[439,122],[440,113],[441],
    [443,444,445],[446,143],[447,448],[449,450],[451,452],
    [453,454],[455],[456,457],[458,226],[459,460],[461],[462],
    [463],[464],[465],[466],[467],[468],[469],[470],[471],
    [472],[473],[474],[475],[476],[477],[478],[479],
    [480],[481],[482],[483,484],[485],[486],[487],[488],[489,490],
    [491],[492],[493],
    // Gen 5
    [495,496,497],[498,499,500],[501,502,503],[504,505],[506,507,508],
    [509,510],[511,512],[513,514],[515,516],[517,518],[519,520,521],
    [522,523],[524,525,526],[527,528],[529,530],[531],
    [532,533,534],[535,536,537],[538],[539],[540,541,542],
    [543,544,545],[546,547],[548,549],[550],[551,552,553],
    [554,555],[556],[557,558],[559,560],[561],[562,563],
    [564,565],[566,567],[568,569],[570,571],[572,573],[574,575,576],
    [577,578,579],[580,581],[582,583,584],[585,586],[587],
    [588,589],[590,591],[592,593],[594],[595,596],[597,598],
    [599,600,601],[602,603,604],[605,606],[607,608,609],
    [610,611,612],[613,614],[615],[616,617],[618],[619,620],
    [621],[622,623],[624,625],[626],[627,628],[629,630],
    [631],[632],[633,634,635],[636,637],[638],[639],[640],
    [641],[642],[643],[644],[645],[646],[647],[648],[649],
    // Gen 6
    [650,651,652],[653,654,655],[656,657,658],[659,660,661],[662,663,164/*typo ok*/],
    [664,665,666],[667,668],[669,670,671],[672,673],[674,675],
    [676],[677,678],[679,680,681],[682,683],[684,685],[686,687],
    [688,689],[690,691],[692,693],[694,695],[696,697],[698,699],
    [700],[701],[702],[703],[704,705,706],[707],[708,709],
    [710,711],[712,713],[714,715],[716],[717],[718],[719],[720],[721],
    // Gen 7
    [722,723,724],[725,726,727],[728,729,730],[731,732,733],
    [734,735],[736,737,738],[739,740],[741],[742,743],[744,745],
    [746],[747,748],[749,750],[751,752],[753,754],[755,756],
    [757,758],[759,760],[761,762,763],[764],[765],[766],[767,768],
    [769,770],[771],[772,773],[774],[775],[776],[777],[778],
    [779],[780],[781],[782,783,784],[785],[786],[787],[788],
    [789,790],[791],[792],[793],[794],[795],[796],[797],[798],[799],[800],
    [801],[802],[803,804],[805],[806],[807],[808,809],
    // Gen 8
    [810,811,812],[813,814,815],[816,817,818],[819,820],[821,822,823],
    [824,825,826],[827,828],[829,830],[831,832],[833,834,835],
    [836],[837,838,839],[840,841],[840,842],[843,844],[845],
    [846,847],[848,849],[850,851],[852,853],[854,855],[856,857,858],
    [859,860,861],[862],[863],[864],[865],[866],[867],[868,869],
    [870],[871],[872,873],[874],[875],[876],[877],[878,879],
    [880],[881],[882],[883],[884],[885,886,887],[888],[889],[890],
    [891,892],[893],[894],[895],[896],[897],[898],
    // Gen 9
    [906,907,908],[909,910,911],[912,913,914],[915,916],[917,918],
    [919,920],[921,922,923],[924,925],[926],[927,928],[929,930],
    [931],[932,933,934],[935,936,937],[938,939],[940,941],[942,943],
    [944,945,946],[947],[948,949],[950,951],[952,953],[954,955],
    [956,957,958],[959,960],[961,962,963],[964],[965],[966],
    [967],[968],[969,970],[971],[972],[973],[974],[975,976],
    [977],[978],[979],[980],[981],[982],[983],[984],[985,986],
    [987],[988],[989],[990],[991],[992],[993],[994],[995],
    [996],[997],[998],[999],[1000],[1001],[1002],[1003],
    [1004],[1005],[1006],[1007],[1008],[1009],[1010],
  ];
  const map = {};
  for (const chain of chains) {
    if (chain.length === 1) {
      // Solo Pokémon — treat as final stage
      map[chain[0]] = 3;
    } else if (chain.length === 2) {
      map[chain[0]] = 1;
      map[chain[1]] = 3;
    } else {
      map[chain[0]] = 1;
      for (let i = 1; i < chain.length - 1; i++) map[chain[i]] = 2;
      map[chain[chain.length - 1]] = 3;
    }
  }
  return map;
})();

function getStage(id) {
  return STAGE_MAP[id] ?? 3; // default: treat unknown as final
}

function getSpriteUrl(id) {
  // Official PokéAPI front-default sprite
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

function getGenForId(id) {
  for (const g of GEN_RANGES) {
    if (id >= g.start && id <= g.end) return g.gen;
  }
  return 9;
}

// ─── BUILD POKEMON LIST FROM SELECTED GENS + CRITERIA ─────────────────────
function buildPokemonList(selectedGens, criteria) {
  const {
    includeMythical,
    includeLegendary,
    startersOnly,
    includeStage1,
    includeStage2,
    finalOnly,
  } = criteria;

  const list = [];
  for (const g of GEN_RANGES) {
    if (!selectedGens.has(g.gen)) continue;
    for (let id = g.start; id <= g.end; id++) {
      const isMythical   = MYTHICALS.has(id);
      const isLegendary  = LEGENDARIES.has(id);
      const isStarter    = STARTERS.has(id);
      const stage        = getStage(id);

      // --- Starters Only mode ---
      if (startersOnly && !isStarter) continue;

      // --- Mythical / Legendary gates (only apply when NOT in starters-only) ---
      if (!startersOnly) {
        if (isMythical && !includeMythical) continue;
        if (isLegendary && !includeLegendary) continue;
      }

      // --- Evolution stage gates ---
      if (finalOnly) {
        // Final only: skip stage 1 and stage 2
        if (stage === 1 || stage === 2) continue;
      } else {
        if (stage === 1 && !includeStage1) continue;
        if (stage === 2 && !includeStage2) continue;
      }

      list.push({ id, name: getPokemonName(id), gen: g.gen });
    }
  }
  return list;
}

// ─── MERGE-SORT BASED COMPARISON ENGINE ────────────────────────────────────
/**
 * We keep an explicit merge-sort "work stack" so we can pause and ask
 * the user each time we need a comparison, then resume.
 *
 * State shape:
 *   stack: Array of {left, right, mergedSoFar, li, ri}   (merge frames)
 *   pendingMerge: current frame waiting for a comparison
 *   sortedChunks: array of sorted arrays feeding the stack
 *   totalComparisons: estimated total
 *   doneComparisons: comparisons made
 *   history: array of snapshots for undo
 *   result: final sorted array (null until done)
 */
let state = null;

function estimateComparisons(n) {
  if (n <= 1) return 0;
  return Math.ceil(n * Math.log2(n));
}

function initSorter(pokemonList) {
  // Shuffle first for fairness
  const arr = [...pokemonList];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  // Build initial sorted chunks of size 1
  const chunks = arr.map(p => [p]);

  state = {
    chunks,
    totalComparisons: estimateComparisons(arr.length),
    doneComparisons: 0,
    history: [],
    result: null,
    // merge state
    merging: false,
    mergeLeft: null,
    mergeRight: null,
    mergedSo: [],
    li: 0,
    ri: 0,
    pendingLeft: null,
    pendingRight: null,
  };
  advanceMerge();
}

function advanceMerge() {
  // If only one chunk left, sorting is done
  if (state.chunks.length === 1 && !state.merging) {
    state.result = state.chunks[0];
    showResults();
    return;
  }

  // If we're mid-merge and no comparison is pending, continue the merge
  if (state.merging) {
    continueMerge();
    return;
  }

  // Start a new merge pass: pair up chunks
  if (state.chunks.length === 1) {
    state.result = state.chunks[0];
    showResults();
    return;
  }

  // Pop the first two chunks and start merging them
  const left = state.chunks.shift();
  const right = state.chunks.shift();

  state.merging = true;
  state.mergeLeft = left;
  state.mergeRight = right;
  state.mergedSo = [];
  state.li = 0;
  state.ri = 0;

  continueMerge();
}

function continueMerge() {
  const { mergeLeft: L, mergeRight: R, li, ri } = state;

  // Drain any exhausted side
  if (li >= L.length) {
    state.mergedSo.push(...R.slice(ri));
    finishMerge();
    return;
  }
  if (ri >= R.length) {
    state.mergedSo.push(...L.slice(li));
    finishMerge();
    return;
  }

  // Need a comparison: present the two candidates
  state.pendingLeft = L[li];
  state.pendingRight = R[ri];
  renderSortScreen();
}

function finishMerge() {
  // Put merged chunk back, start next
  state.chunks.push(state.mergedSo);
  state.merging = false;
  state.mergeLeft = null;
  state.mergeRight = null;
  state.mergedSo = [];
  state.li = 0;
  state.ri = 0;

  advanceMerge();
}

// pick: 0 = left wins, 1 = right wins, 'tie' = tie
function pick(side) {
  if (!state || state.result) return;

  // Save undo snapshot
  state.history.push(snapshotState());

  if (side === 0) {
    // Left wins → left goes earlier (higher rank)
    state.mergedSo.push(state.pendingLeft);
    state.li++;
  } else {
    state.mergedSo.push(state.pendingRight);
    state.ri++;
  }

  state.doneComparisons++;
  continueMerge();
}

function tie() {
  if (!state || state.result) return;
  state.history.push(snapshotState());
  // Both go in, left first
  state.mergedSo.push(state.pendingLeft);
  state.mergedSo.push(state.pendingRight);
  state.li++;
  state.ri++;
  state.doneComparisons++;
  continueMerge();
}

function undoLast() {
  if (!state || state.history.length === 0) return;
  const snap = state.history.pop();
  restoreState(snap);
  renderSortScreen();
}

// ─── STATE SNAPSHOT / RESTORE ──────────────────────────────────────────────
function snapshotState() {
  return {
    chunks: state.chunks.map(c => [...c]),
    doneComparisons: state.doneComparisons,
    merging: state.merging,
    mergeLeft: state.mergeLeft ? [...state.mergeLeft] : null,
    mergeRight: state.mergeRight ? [...state.mergeRight] : null,
    mergedSo: [...state.mergedSo],
    li: state.li,
    ri: state.ri,
    pendingLeft: state.pendingLeft,
    pendingRight: state.pendingRight,
  };
}
function restoreState(snap) {
  Object.assign(state, {
    chunks: snap.chunks.map(c => [...c]),
    doneComparisons: snap.doneComparisons,
    merging: snap.merging,
    mergeLeft: snap.mergeLeft ? [...snap.mergeLeft] : null,
    mergeRight: snap.mergeRight ? [...snap.mergeRight] : null,
    mergedSo: [...snap.mergedSo],
    li: snap.li,
    ri: snap.ri,
    pendingLeft: snap.pendingLeft,
    pendingRight: snap.pendingRight,
    result: null,
  });
}

// ─── RENDERING ─────────────────────────────────────────────────────────────
function renderSortScreen() {
  const L = state.pendingLeft;
  const R = state.pendingRight;
  if (!L || !R) return;

  document.getElementById('img-left').src  = getSpriteUrl(L.id);
  document.getElementById('img-left').alt  = L.name;
  document.getElementById('num-left').textContent  = `#${String(L.id).padStart(3,'0')}`;
  document.getElementById('name-left').textContent  = L.name;
  document.getElementById('gen-left').textContent  = `Gen ${toRoman(L.gen)}`;

  document.getElementById('img-right').src = getSpriteUrl(R.id);
  document.getElementById('img-right').alt = R.name;
  document.getElementById('num-right').textContent = `#${String(R.id).padStart(3,'0')}`;
  document.getElementById('name-right').textContent = R.name;
  document.getElementById('gen-right').textContent = `Gen ${toRoman(R.gen)}`;

  // Progress
  const pct = state.totalComparisons > 0
    ? Math.min(99, Math.round((state.doneComparisons / state.totalComparisons) * 100))
    : 0;
  document.getElementById('progress-fill').style.width = pct + '%';
  document.getElementById('progress-text').textContent = pct + '%';

  // Animate cards
  const cards = document.querySelectorAll('.pokemon-card');
  cards.forEach(c => { c.style.animation = 'none'; c.offsetHeight; c.style.animation = ''; });
}

function showResults() {
  showScreen('screen-results');
  const list = document.getElementById('results-list');
  list.innerHTML = '';

  const results = state.result;
  results.forEach((p, i) => {
    const rank = i + 1;
    const row = document.createElement('div');
    row.className = 'result-row';
    row.style.animationDelay = Math.min(i * 0.03, 1.5) + 's';
    row.innerHTML = `
      <div class="result-rank">${rank}</div>
      <img class="result-img" src="${getSpriteUrl(p.id)}" alt="${p.name}" />
      <div class="result-info">
        <div class="result-name">${p.name}</div>
        <div class="result-meta">#${String(p.id).padStart(3,'0')} · Gen ${toRoman(p.gen)}</div>
      </div>
    `;
    list.appendChild(row);
  });
}

// ─── SCREEN MANAGEMENT ─────────────────────────────────────────────────────
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// ─── LANDING SETUP ─────────────────────────────────────────────────────────
const selectedGens = new Set([1,2,3,4,5,6,7,8,9]);

// Criteria state
const criteria = {
  includeMythical:  true,
  includeLegendary: true,
  startersOnly:     false,
  includeStage1:    true,
  includeStage2:    true,
  finalOnly:        false,
};

function getCriteria() { return { ...criteria }; }

function buildGenCheckboxes() {
  const container = document.getElementById('gen-checkboxes');
  GEN_RANGES.forEach(g => {
    const item = document.createElement('label');
    item.className = 'gen-item checked';
    item.innerHTML = `
      <input type="checkbox" checked value="${g.gen}" />
      <div class="gen-check-box"></div>
      <div class="gen-label">
        <span class="gen-label-main">${g.label}</span>
        <span class="gen-label-sub">${g.sub}</span>
      </div>
    `;
    const cb = item.querySelector('input');
    cb.addEventListener('change', () => {
      if (cb.checked) { selectedGens.add(g.gen); item.classList.add('checked'); }
      else            { selectedGens.delete(g.gen); item.classList.remove('checked'); }
      updatePokemonCount();
    });
    container.appendChild(item);
  });
}

// Helper: sync a checkbox element + its label item to a value
function setCb(id, checked) {
  const cb   = document.getElementById(id);
  const item = cb.closest('.gen-item') || document.getElementById('ci-' + id.replace('cb-',''));
  cb.checked = checked;
  if (checked) item.classList.add('checked'); else item.classList.remove('checked');
}

function wireUpCriteriaCheckboxes() {
  // ── Mythical ──
  document.getElementById('cb-mythical').addEventListener('change', function () {
    criteria.includeMythical = this.checked;
    syncCriteriaItem('ci-mythical', this.checked);
    updatePokemonCount();
  });

  // ── Legendary ──
  document.getElementById('cb-legendary').addEventListener('change', function () {
    criteria.includeLegendary = this.checked;
    syncCriteriaItem('ci-legendary', this.checked);
    updatePokemonCount();
  });

  // ── Starters Only ──
  document.getElementById('cb-starters').addEventListener('change', function () {
    criteria.startersOnly = this.checked;
    syncCriteriaItem('ci-starters', this.checked, true);
    if (this.checked) {
      // Uncheck mythical & legendary
      criteria.includeMythical  = false;
      criteria.includeLegendary = false;
      setCb('cb-mythical',  false);
      setCb('cb-legendary', false);
      syncCriteriaItem('ci-mythical',  false);
      syncCriteriaItem('ci-legendary', false);
      // Disable them
      document.getElementById('ci-mythical').classList.add('disabled');
      document.getElementById('ci-legendary').classList.add('disabled');
    } else {
      // Re-enable mythical & legendary
      document.getElementById('ci-mythical').classList.remove('disabled');
      document.getElementById('ci-legendary').classList.remove('disabled');
    }
    updatePokemonCount();
  });

  // ── Stage 1 ──
  document.getElementById('cb-stage1').addEventListener('change', function () {
    criteria.includeStage1 = this.checked;
    syncCriteriaItem('ci-stage1', this.checked);
    updatePokemonCount();
  });

  // ── Stage 2 ──
  document.getElementById('cb-stage2').addEventListener('change', function () {
    criteria.includeStage2 = this.checked;
    syncCriteriaItem('ci-stage2', this.checked);
    updatePokemonCount();
  });

  // ── Final Stage Only ──
  document.getElementById('cb-finalonly').addEventListener('change', function () {
    criteria.finalOnly = this.checked;
    syncCriteriaItem('ci-finalonly', this.checked, true);
    if (this.checked) {
      // Uncheck stage1 & stage2
      criteria.includeStage1 = false;
      criteria.includeStage2 = false;
      setCb('cb-stage1', false);
      setCb('cb-stage2', false);
      syncCriteriaItem('ci-stage1', false);
      syncCriteriaItem('ci-stage2', false);
      document.getElementById('ci-stage1').classList.add('disabled');
      document.getElementById('ci-stage2').classList.add('disabled');
    } else {
      document.getElementById('ci-stage1').classList.remove('disabled');
      document.getElementById('ci-stage2').classList.remove('disabled');
    }
    updatePokemonCount();
  });
}

// Sync visual state of a criteria label item
function syncCriteriaItem(itemId, checked, exclusive = false) {
  const item = document.getElementById(itemId);
  if (!item) return;
  if (checked) {
    item.classList.add('checked');
    if (exclusive) item.classList.add('exclusive');
    else item.classList.remove('exclusive');
  } else {
    item.classList.remove('checked');
    item.classList.remove('exclusive');
  }
}

function updatePokemonCount() {
  const count = buildPokemonList(selectedGens, getCriteria()).length;
  const label = document.getElementById('pokemon-count-label');
  label.textContent = `${count.toLocaleString()} Pokémon selected`;
  document.getElementById('btn-start').disabled = count < 2;
}

document.getElementById('btn-all').addEventListener('click', () => {
  GEN_RANGES.forEach(g => selectedGens.add(g.gen));
  document.querySelectorAll('#gen-checkboxes .gen-item').forEach(item => {
    item.classList.add('checked');
    item.querySelector('input').checked = true;
  });
  updatePokemonCount();
});

document.getElementById('btn-none').addEventListener('click', () => {
  selectedGens.clear();
  document.querySelectorAll('#gen-checkboxes .gen-item').forEach(item => {
    item.classList.remove('checked');
    item.querySelector('input').checked = false;
  });
  updatePokemonCount();
});

document.getElementById('btn-start').addEventListener('click', () => {
  const list = buildPokemonList(selectedGens, getCriteria());
  if (list.length < 2) return;
  showScreen('screen-sort');
  initSorter(list);
});

document.getElementById('btn-undo').addEventListener('click', undoLast);

document.getElementById('btn-restart').addEventListener('click', () => {
  state = null;
  showScreen('screen-landing');
  updatePokemonCount();
});

document.getElementById('btn-copy').addEventListener('click', () => {
  if (!state?.result) return;
  const text = state.result
    .map((p, i) => `${i+1}. ${p.name} (#${String(p.id).padStart(3,'0')})`)
    .join('\n');
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById('btn-copy');
    btn.textContent = '✅ Copied!';
    setTimeout(() => btn.textContent = '📋 Copy List', 2000);
  });
});

// ─── KEYBOARD CONTROLS ─────────────────────────────────────────────────────
document.addEventListener('keydown', e => {
  const sort = document.getElementById('screen-sort');
  if (!sort.classList.contains('active')) return;
  switch (e.key.toLowerCase()) {
    case 'a': case 'arrowleft':  pick(0); break;
    case 'd': case 'arrowright': pick(1); break;
    case 't': tie(); break;
    case 'z': undoLast(); break;
  }
});

// ─── HELPERS ───────────────────────────────────────────────────────────────
function toRoman(n) {
  const map = {1:'I',2:'II',3:'III',4:'IV',5:'V',6:'VI',7:'VII',8:'VIII',9:'IX'};
  return map[n] || n;
}

// ─── INIT ───────────────────────────────────────────────────────────────────
buildGenCheckboxes();
wireUpCriteriaCheckboxes();
updatePokemonCount();