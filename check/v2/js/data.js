// Данные для работы без сервера (автогенерация)
window.CARDS_DATA = {
  "everything": [
    {
      "title": "Поиск клиентов, модов и dll",
      "meta": "Обнаружение клиентов, модов | Обязательный список",
      "code": "ext:.exe;.jar regex:(?i)(shellbag|impact|wurst|bleach[-_]?hack|aristois|huzuni|skill[-_]?client|nodus|inertia|ares|sigma|meteor|atomic|zamorozka|liquid[-_]?bounce|nurik|nursultan|celestial|calestial|celka|expensive|neverhook|excellent|wexside|wild|minced|deadcode|akrien|jigsaw|future|jessica|dreampool|vape|infinity|squad|no[-_]?rules|konas|zeus[-_]?client|rich[-_]?client|ghost[-_]?client|rusher[-_]?hack|thunder[-_]?hack|moon[-_]?hack|winner|nova|exire|doomsday|nightware|ricardo|extazyy|troxill|arbuz|dauntiblyat|rename[-_]?me[-_]?please|edit[-_]?me|takker|faker|xameleon|fuze[-_]?client|wise[-_]?folder|net[-_]?limiter|feather|delta|eclipse|venus|jex|hakari|hush|hach|rogalik|catlavan|haruka|wissend|fluger|sperma|vortex|newcode|astra|britva|bariton|bot|player|freecam|bedrock|hotbar|swap|chest|gumball|tweak|entity|viabackwards|viaforge|viaproxy|hitbox|elytra|xaero|through|mob|auto|place|health|inventory|x[-_]?ray|clean[-_]?cut|smart[-_]?moving|save[-_]?searcher|world[-_]?downloader|trade[-_]?finder|chorus[-_]?find|inv[-_]?move|chunk[-_]?copy|seed[-_]?cracker|diamond[-_]?sim|forge[-_]?hax|step[-_]?up|client[-_]?commands|camera[-_]?utils|cheat[-_]?utils|universal[-_]?mod|swing[-_]?through[-_]?grass|shift[\\s_-]?tap|aim[\\s_-]?assistance|grass[\\s_-]?pas|motor[\\s_-]?assistance|player[\\s_-]?highlighter|slippery[\\s_-]?mod|entity-outliner|elytraswapperplusclient|chest[\\s_-]?esp|armor[\\s_-]?hot[\\s_-]?swap|fallen|aurora|wine[\\s_-]?launcher|sh[\\s_-]?project|trigger[\\s_-]?bot|collapse|melonity|blessed|zachot[\\s_-]?po[\\s_-]?angl[\\s_-]?8[\\s_-]?klass|creator1171|Spawner[\\s_-]?Locator)"
    },
    {
      "title": "Поиск конфигов и логов",
      "meta": "Обнаружение конфигурационных файлов и логов | Обязательный список",
      "code": "ext:.txt;.json;.toml;.yml;.cfg;.properties | folder: dm:last14days regex:(bariton|bot|player|freecam|bedrock|hotbar|swap|chest|gumball|tweak|entity|crystal|optimizer|viabackwards|viaforge|viaproxy|hitbox|elytra|xaero|through|mob|auto|place|health|inventory|x[-_]?ray|clean[-_]?cut|smart[-_]?moving|save[-_]?searcher|world[-_]?downloader|trade[-_]?finder|chorus[-_]?find|inv[-_]?move|chunk[-_]?copy|seed[-_]?cracker|diamond[-_]?sim|forge[-_]?hax|step[-_]?up|client[-_]?commands|camera[-_]?utils|cheat[-_]?utils|universal[-_]?mod|swing[-_]?through[-_]?grass|shift[\\s_-]?tap|aim[\\s_-]?assistance|grass[\\s_-]?pas|motor[\\s_-]?assistance|player[\\s_-]?highlighter|slippery[\\s_-]?mod|entity-outliner|elytraswapperplusclient|chest[\\s_-]?esp|armor[\\s_-]?hot[\\s_-]?swap|fallen|aurora|wine[\\s_-]?launcher|sh[\\s_-]?project|trigger[\\s_-]?bot|collapse|melonity|blessed|zachot[\\s_-]?po[\\s_-]?angl[\\s_-]?8[\\s_-]?klass|creator1171|Spawner[\\s_-]?Locator)"
    },
    {
      "title": "Поиск по сигнатуре AxisAlignedBB + mp3",
      "meta": "Vec.dll + mp3 hitbox | Обязательный список",
      "code": "size:30kb utf8content:net/minecraft/util/math/axisalignedbb | size:9400174"
    },
    {
      "title": "Поиск авалона и клинеров",
      "meta": "Обнаружение файлов по размеру и содержимому | Обязательный список",
      "code": "*.exe size:1566208 | size:22285824 | size:1010176 | size:22433280 | size:348672 | size:352256 | size:782848 | size:6887424 | size:763392 | size:6111 | size:743424 | size:1767424 | size:823808 | size:18126848 | <size:700kb..5mb utf8content:net=\"\" minecraftforge=\"\" fml=\"\" loading=\"\" fmlloader=\"\" |=\"\" glowesp=\"\"> | <size:14mb..17mb utf8content:d3d11createdeviceandswapchain|loadlibrarya=\"\"></size:14mb..17mb></size:700kb..5mb>"
    },
    {
      "title": "Поиск doomsday",
      "meta": "В .jar | Обязательный список",
      "code": "*.jar size:21kb-10mb utf8content:net/java/s.class utf8content:net/java/f.class"
    },
    {
      "title": "Поиск doomsday",
      "meta": "В любом другом формате | Обязательный список",
      "code": "size:21kb-10mb utf8content:net/java/s.class utf8content:net/java/f.class"
    },
    {
      "title": "Поиск изменения .dll и .exe",
      "meta": "Переименование .dll .exe файлов",
      "code": "da:[currentDate] !.exe !.dll size:700kb..30mb file: content:\"This program cannot be run in DOS mode.\""
    },
    {
      "title": "Поиск лоадера читов",
      "meta": "Обнаружение больших .exe файлов",
      "code": "size:5mb..55mb ext:exe"
    },
    {
      "title": "поиск хитбоксов .jar",
      "meta": "Обнаружение Хитбоксов - проверяйте всё, что найдёт | Обязательный список",
      "code": "size:2263|size:5266|size:6515|size:6770|size:6778|size:7016|size:7218|size:7803|size:7891|size:9327|size:10283|size:10605|size:10958|size:11554|size:16541|size:17308|size:17339|size:18180|size:18527|size:18587|size:18734|size:19266|size:20578|size:20583|size:20639|size:20883|size:21161|size:21234|size:21664|size:22036|size:22861|size:26247|size:27546|size:27809|size:28084|size:28439|size:29304|size:29567|size:30279|size:31549|size:31607|size:34449|size:34669|size:35971|size:35993|size:38149|size:39017|size:39321|size:40142|size:42782|size:47159|size:48242|size:50828|size:51212|size:52426|size:54088|size:59381|size:62782|size:65316|size:65486|size:65765|size:66659|size:67491|size:68794|size:69757|size:72334|size:74105|size:80751|size:88896|size:95530|size:98811|size:100523|size:100799|size:101297|size:101571|size:101703|size:102297|size:102733|size:103761|size:104954|size:105623|size:105672|size:112386|size:120640|size:138417|size:143006|size:143597|size:143600|size:147329|size:147873|size:151762|size:153937|size:156722|size:156779|size:166677|size:169718|size:173698|size:183634|size:183651|size:192156|size:202720|size:257482|size:263070|size:267746|size:274865|size:300286|size:334588|size:343169|size:350629|size:409616|size:410358|size:517248|size:519731|size:532826|size:539151|size:556494|size:597406|size:636621|size:640838|size:878781|size:925493|size:1077149|size:1165063|size:1181556|size:1444714|size:1471429|size:1569093|size:1822841|size:3113569|size:3425801|size:3541075|size:3541138|size:3642292|size:3684385|size:4642998|size:5630483|size:7052171|size:7059952|size:22258750|size:25704986|size:26179274|size:26691896 *.jar"
    },
    {
      "title": "Поиск читов в .dll",
      "meta": "Проверяйте всё, что найдёт | Обязательный список",
      "code": "*.dll size:11767808 | size:486400 | size:15294464 | size:5641728 | size:2273792 | size:819987 | size:3823616 | size:1686528 | size:1560713"
    },
    {
      "title": "Поиск читов в .jar",
      "meta": "Обязательно проверяйте, что найдёт | Обязательный список",
      "code": "*.jar size:2405 | size:2263 | size:3089 | size:4447 | size:6289 | size:7234 | size:7272 | size:8191 | size:8195 | size:9068 | size:9372 | size:10283 | size:11193 | size:14569 | size:17339 | size:19950 | size:19996 | size:20639 | size:20883 | size:24662 | size:25349 | size:26255 | size:27152 | size:27546 | size:28084 | size:34669 | size:34669 | size:35971 | size:51079 | size:54088 | size:65486 | size:69757 | size:90139 | size:95121 | size:95195 | size:100183 | size:102128 | size:103620 | size:104255 | size:113386 | size:114974 | size:120071 | size:137550 | size:151762 | size:170201 | size:170201 | size:181747 | size:186566 | size:192156 | size:192156 | size:257482 | size:286362 | size:286362 | size:335770 | size:365980 | size:380768 | size:383073 | size:434725 | size:569437 | size:612658 | size:625367 | size:895578 | size:925493 | size:967068 | size:1045107 | size:1330279 | size:1565003 | size:1822841 | size:1844101 | size:1870498 | size:3283826 | size:3372839 | size:3425801 | size:3841809 | size:4049697 | size:4059091 | size:4101247 | size:4610404 | size:4610405 | size:6009357 | size:6349526 | size:6377588 | size:6699922 | size:6731555 | size:6731555 | size:7052171 | size:7743912 | size:11464320 | size:13650364 | size:22205672 | size:28632494 | size:44722980 | size:47608266"
    },
    {
      "title": "Поиск читов в .exe",
      "meta": "Проверяйте всё, что найдёт | Обязательный список",
      "code": "*.exe size:547827 | size:1309696 | size:14202368 | size:782848 | size:53760 | size:13686784 | size:28107997 | size:22763666 | size:17731024 | size:72832762 | size:8520278 | size:63326352 | size:11421787 | size:11463432 | size:743936 | size:823808 | size:9388032 | size:191206617 | size15984640 | size:11897599 | size:11877071 | size:16197700 | size:16192613 | size:16192612 | size:16192613 | size:12173155 | size:16190579 | size:16674923 | size:16446210 | size:15361912 | size:13734493 | size:12474796 | size:12475699 | size:12104654 | size:12104647 | size:19521024 | size:41382400 | size:4426752 | size:5253632 | size:52722370 | size:38520304 | size:27185152"
    },
    {
      "title": "Поиск запрещённых модификаций в .jar",
      "meta": "Проверяйте всё, что найдёт | Обязательный список",
      "code": "*.jar size:39834 | size:41081 | size:41152 | size:149406 | size:151858 | size:148093 | size:150268 | size:153004 | size:214898 | size:150917 | size:128008 | size:142303 | size:146862 | size:132475 | size:130265 | size:131067 | size:214772 | size:130199 | size:135400 | size:1948224 | size:19817 | size:19951 | size:19951 | size:18953 | size:19767 | size:28097 | size:20551 | size:29051 | size:29505 | size:19975 | size:19690 | size:19760 | size:3413 | size:49189 | size:9215 | size:9181 | size:8081 | size:8123 | size:8365 | size:10296 | size:10513 | size:9366 | size:9269 | size:9201"
    }
  ],
  "journal": [
    {
      "title": "Поиск по директории",
      "meta": "замените путь_к_папке - на настоящий путь",
      "code": "directory:путь_к_папке;name:!!"
    },
    {
      "title": "Поиск по поддиректориям",
      "meta": "Поиск .jar,.exe,.zip.",
      "code": "directory::;name:.jar||.zip||.rar;name:!!.lnk"
    },
    {
      "title": "Поиск в папках загрузок и рабочего стола",
      "meta": "Поиск в папках загрузок и рабочего стола",
      "code": "directory:Downloads||Desktop"
    }
  ],
  "common": [
    {
      "name": "DoomsDay Client",
      "strings": ["4aNT>jeSE@I\"KE)PQ07", "prlgQZGLbPCtCOg", "g]PW3an+)F(8T%#HFA!", "LvKgLTrpiVEaxZQIpXK", "]KqhNDviTSmLXa\\Gky", "KXSoIckfbwuWyEn\\VJ", "kdISqbPxmulRWqURNt", "kqdtPXM^OUXAws", "JkadeI\\[\\_faN\\[Va"]
    },
    {
      "name": "Squad Client",
      "strings": ["x/mo/c"]
    },
    {
      "name": "Hitbox by kew3uik (mp3/pnd/g/exe)",
      "strings": ["stubborn.website"]
    },
    {
      "name": "Cortex Client",
      "strings": ["10^]^]]]!!46", "]]]]_]10]]]]]]]", "\\#\"&546754654'", "\\_^]++++", "!!5!27654'!5!27654'!5!"]
    },
    {
      "name": "Cortex Client ProstoCraft",
      "strings": ["E S P"]
    },
    {
      "name": "Blessed Client",
      "strings": ["EEEFFFHHHHJJJJM", "NNNNNNNNN{{{{{", "3333NNNNgigg", "kkkyik^^ZkBBB2221KKYHYeYVY"]
    },
    {
      "name": "Vertzah Client",
      "strings": ["Hitbox:", "Reach:"]
    },
    {
      "name": "Hitbox LabyMod",
      "strings": ["b/time", "BaoBab:"]
    },
    {
      "name": "Dreampool Client",
      "strings": ["dreampool", "TriggerBOT", "forge.commons."]
    },
    {
      "name": "Hitbox Lunar",
      "strings": ["ZDCoder"]
    },
    {
      "name": "String for any converter JAR -> DLL",
      "strings": ["radioegor146"]
    },
    {
      "name": "Inject Cheat",
      "strings": ["magicthein", "net.minecraftforge.ASMEventHandler.31.wait(long, int)", "chs/Main", "chs/Profiller", "areyoufuckingdump"]
    },
    {
      "name": "Takker",
      "strings": ["http://localhost:8080/", "org/springframework/boot/loader/ref/Cleaner.instance\\:org.springframework.boot.loader.ref.Cleaner"]
    },
    {
      "name": "Fakker",
      "strings": ["net/lenni0451/commons/httpclient/HttpResponse", "Client2ProxyHandler.CLIENT\\_2\\_PROXY\\_ATTRIBUTE\\_KEY"]
    },
    {
      "name": "Hameleon",
      "strings": ["xameleon.html"]
    },
    {
      "name": "Vape V4",
      "strings": ["vape.gg", "www.vape.gg", "VAPE4DLL"]
    },
    {
      "name": "Hitbox",
      "strings": ["CREATED_BY_WHYMADUD", "oeshb", "h1tb0x", "ch0ffa_box", "onupdate", "tickupdate", "net.minecraftforge.ASMEventHandler.31.wait(long, int)", "BreakHitsOn", "waoHITBOXES", "chs/", "HRCRHIIIq", "RHOOOCCC5.e", "listSpritesure", "Zero/Time"]
    },
    {
      "name": "Storm Aimasisst",
      "strings": ["GetDiskId", "afefefeffe"]
    },
    {
      "name": "Ammit Client",
      "strings": [".crlc)", "(ITK;J)V"]
    },
    {
      "name": "Expensive + Haruka",
      "strings": ["ClickPearl"]
    },
    {
      "name": "Noise Client",
      "strings": ["Noise Client"]
    }
  ],
  "mods": [
    {"name": "ALLATORI hb", "size": "7 кб", "check": "ALLATORI, букв. .class", "comment": ""},
    {"name": "Hitboxs ChunkAnimator", "size": "7 кб", "check": "com\\magma4496\\Creatormagma.class", "comment": "Анализ через Luyten\\Recaf Могут встречатся в Lunar Client"},
    {"name": "Hitboxs FullBrightnessToggle", "size": "7 кб", "check": "", "comment": "Анализ через Luyten\\Recaf"},
    {"name": "Hitboxs bushroot", "size": "8 | 10 | 21 кб", "check": "me\\bushroot", "comment": "Часто встречаются"},
    {"name": "Hitboxs", "size": "8 кб", "check": "com\\example\\examplemod\\Neat.class", "comment": ""},
    {"name": "FabricHits", "size": "11 кб", "check": "net\\fabricmc\\example\\ExampleMod.class", "comment": "Хитбоксы для Fabric"},
    {"name": "Hitboxs ShulkerTooltip", "size": "12 кб", "check": "", "comment": "Анализ через Luyten\\Recaf"},
    {"name": "Autoreconnect (goodman)", "size": "17\\42 кб", "check": "me\\goodman", "comment": "Часто встречаются (в LabyMod)"},
    {"name": "Hitboxs ChunkAnimator", "size": "20\\53 кб", "check": "", "comment": "Анализ через Luyten\\Recaf"},
    {"name": "Hitboxs", "size": "21 кб", "check": "Protected-by-DCrasher", "comment": ""},
    {"name": "Hitboxs в TapeMouse", "size": "28 | 170 кб", "check": "net\\dries007\\tapemouse\\tapemouseOnOff", "comment": ""},
    {"name": "Hitboxs Neat", "size": "19 | 28 | 34 | 188 кб", "check": "vazkii\\neat", "comment": "отсутствует HealthBarRenderer.class Часто встречаются"},
    {"name": "Hitboxs", "size": "31 кб", "check": "org\\yeat\\Other\\a.class, aa.class", "comment": "Версия: Fabric 1.20.1"},
    {"name": "FpsBoost", "size": "36 кб", "check": "com\\shaori\\fpsboost", "comment": ""},
    {"name": "Hitboxs TopkaVisual", "size": "42 кб", "check": "org\\scamservice\\Init.class", "comment": ""},
    {"name": "Hitboxs", "size": "62 кб", "check": "com\\cmdcoders\\cheats", "comment": ""},
    {"name": "Hitboxs TopkaVisual", "size": "64 кб", "check": "dev\\service\\baing\\Bypass.class", "comment": ""},
    {"name": "Ghost-клиент (TopkaHealth)", "size": "66 кб", "check": "ev\\service\\use\\Bypass.class", "comment": ""},
    {"name": "Hitboxs MinecraftOptimization", "size": "69 кб", "check": "dev\\minecraftoptimization", "comment": "Часто встречаются"},
    {"name": "Hitboxs Neat", "size": "71 кб", "check": "com\\modd\\Crack.class", "comment": ""},
    {"name": "Ghost-клиент (MarlowsCrystalOptimizer)", "size": "73 кб", "check": "com\\kapiteon\\freecam", "comment": ""},
    {"name": "Hitboxs", "size": "79 кб", "check": "minecraft\\telegram\\@markcls\\GODSYSTEM", "comment": ""},
    {"name": "Ghost-клиент (Better Fps)", "size": "97 кб", "check": "net\\client\\ExampleMod.class", "comment": ""},
    {"name": "Hitboxs", "size": "99 кб", "check": ".OBFUSCATED WITH Gromek.class", "comment": ""},
    {"name": "Hitboxs Creative Core", "size": "99 | 100 | 101 | 103 | 104 кб", "check": "creativecore\\Start.class", "comment": "Часто встречаются"},
    {"name": "Hitboxs ClickThrough(AutoJump)", "size": "100 кб", "check": "Анализ через Luyten\\Recaf", "comment": ""},
    {"name": "Hitboxs FpsReducer(AutoJump)", "size": "144 кб", "check": "bre2el\\fpsreducer\\Client.class", "comment": ""},
    {"name": "Ghost-Клиент", "size": "149 кб", "check": "eu\\me, MainClass.class | eu\\me\\mods, MinecraftRender.class", "comment": ""},
    {"name": "Hitboxs CustomHitboxes", "size": "151 кб", "check": "lmao\\drip\\customhitboxes", "comment": ""},
    {"name": "Hitboxs Toro Health", "size": "252 кб", "check": "a.class, b.class и т.д.", "comment": ""},
    {"name": "Hitboxs", "size": "544 кб", "check": "@rejavastealbot - telegram.class", "comment": ""},
    {"name": "Hitboxs", "size": "584 кб", "check": "me\\ichun\\mods\\ichunutil", "comment": ""},
    {"name": "Blessed Crack", "size": "904 кб", "check": "zov\\blessed\\crack\\by\\laqwrt", "comment": ""},
    {"name": "Hitboxs Neat", "size": "1411 кб", "check": "KILLYOURFAMILY.class", "comment": ""},
    {"name": "Ghost-Клиент (Recaf)", "size": "20819 кб", "check": "me\\corey\\recaf\\Recaf.class", "comment": "На данный момент, чит не работает"},
    {"name": "Virgin Client (Ghost)", "size": "1,7-1,9 мб", "check": "net\\smoothboot\\client\\module\\combat", "comment": ""},
    {"name": "ChanLibs (Ghost)", "size": "613 кб ~", "check": "org\\chainlibs\\module\\impl\\modules", "comment": ""},
    {"name": "Doomsday", "size": "29 - 30000 kb", "check": "Strings PH \\ SS \\ WinRar по логотипу \\ Ocean \\ dcomlaunch", "comment": ""},
    {"name": "Rolleron GH", "size": "30-34 | 41 | 43 kb", "check": "me\\rolleron\\launch This.class", "comment": ""},
    {"name": "PseudoAutoSprint", "size": "56,1 кб", "check": "dvd\\explorer\\nocheat\\client\\impl\\ghost Hitbox.class", "comment": ""},
    {"name": "Jeed", "size": "44 кб", "check": "Анализ модов через Luyten \\ Recaf \\ Fluddy Checker", "comment": ""},
    {"name": "Troxill Crack", "size": "167 кб", "check": "ru\\zdcoder\\troxill\\modules", "comment": ""},
    {"name": "Wl-Zoom GH", "size": "506 кб", "check": "Анализ мода через Luyten \\ Recaf \\ Fluddy Checker", "comment": ""},
    {"name": "Cortezz Client", "size": "3599 кб", "check": "client\\cortezz", "comment": ""},
    {"name": "ThunderHack", "size": "5847 кб", "check": "thunder\\hack", "comment": ""},
    {"name": "Drip Client", "size": "28 430 кб", "check": "Ocean \\ RedLotus \\ EchoScanner", "comment": ""},
    {"name": "Vape V4", "size": "11 210 / 12 000 кб", "check": "Ocean \\ Appinfo \\ EchoScanner \\ Strings the javaw.exe \\ DPS", "comment": ""},
    {"name": "Ammit Client", "size": "17 698 кб", "check": "Ocean \\ Strings the javaw.exe \\ DPS \\ PcaClient", "comment": ""},
    {"name": "Ammit Client (Linux)", "size": "21 594 кб", "check": "Ocean \\ SS Tools Linux", "comment": ""},
    {"name": "Blessed Client", "size": "6435-26435 кб", "check": "Ocean / Strings the javaw.exe / CrashLog", "comment": ""},
    {"name": "Vape V3", "size": "3614 кб", "check": "Ocean / String the javaw.exe / DPS / Pca", "comment": ""},
    {"name": "Vape V2", "size": "3678 кб", "check": "В данный момент уже не работает.", "comment": ""},
    {"name": "MicoHitboxes", "size": "14950 кб", "check": "Ocean / DPS / PcaClient / Diagtrack", "comment": ""},
    {"name": "Avalone Green", "size": "987 кб", "check": "Ocean / DPS / Conhost / PcaClient", "comment": ""},
    {"name": "Avalone Green", "size": "726 кб", "check": "Ocean / DPS / Conhost / PcaClient", "comment": ""},
    {"name": "Avalone Red", "size": "824 кб", "check": "Ocean / DPS / Conhost / PcaClient", "comment": ""},
    {"name": "Avalone Red", "size": "21764 кб", "check": "Ocean / DPS / Conhost / PcaClient", "comment": ""},
    {"name": "Cheat by Ke3wik", "size": "8771 кб", "check": "Ocean / DPS / PcaClient / CrashLog / Strings the javaw.exe", "comment": ""},
    {"name": "Avalone Blue", "size": "765 кб", "check": "Ocean / DPS / Conhost / PcaClient", "comment": ""},
    {"name": "Imperator Client", "size": "9243 кб", "check": "Ocean / DPS / PcaClient / CrashLog / Strings the javaw.exe", "comment": ""},
    {"name": "Rockstar Legit", "size": "450 кб", "check": "DPS / EchoScanner / Ocean / Appinfo / Consent", "comment": ""},
    {"name": "Cortex Legit 3.0 - Beta", "size": "7363 кб", "check": ".o в Temp / Stubborn.Website / Appinfo", "comment": "Отсутствует клиннер"},
    {"name": "Сortex Legit", "size": "16-20 мб", "check": ".o в Temp / Stubborn.Website / Appinfo", "comment": ""},
    {"name": "MP3 Dllhost (Anapa V4)", "size": "9180 кб", "check": "CrashLog / Stubborn.Website / Appinfo", "comment": ""},
    {"name": "Laze Client", "size": "Loader - 118 кб, .dll - 3613 кб", "check": "Strings the javaw.exe / DPS / PcaSvc", "comment": ""},
    {"name": "Squad Client", "size": "25 мб ~", "check": "Strings the javaw.exe / Name - Sound.mp3", "comment": ""},
    {"name": "Avalone Green", "size": "1,6 мб", "check": "Ocean / DPS / Conhost / PcaClient", "comment": ""},
    {"name": "Dreampool", "size": "27450 кб", "check": "Srings the javaw.exe (MagicTheInjecting)", "comment": "Чит уже не актуален"},
    {"name": "LibLibMujina (Linux)", "size": "511 / 510 кб", "check": "Linux 1.20.4 - Fabric / Lunar / Vanilla - Only Ocean Detections", "comment": ""},
    {"name": "Vertzah Client", "size": "1526 кб", "check": "System Informer / Разбор .dll", "comment": "Часто встречаются"},
    {"name": "Undetectable", "size": "1523-1756 кб", "check": "System Informer / Разбор .dll", "comment": ""},
    {"name": "Cortex Crack", "size": "15251 | 17625 кб", "check": "System Informer / Разбор .dll", "comment": ""},
    {"name": "vec.dll", "size": "30 кб (чаще всего)", "check": "System Informer / Разбор .dll", "comment": "Часто встречаются"},
    {"name": "DoomsDay (dll)", "size": "5510 кб", "check": "System Informer / Разбор .dll", "comment": ""},
    {"name": "Lunar Optimize", "size": "5497 кб", "check": "System Informer / Разбор .dll", "comment": ""},
    {"name": "Troxill Crack", "size": "1457 кб", "check": "System Informer / Разбор .dll", "comment": ""},
    {"name": "NeverHook Legit", "size": "2486 кб", "check": "System Informer / Разбор .dll", "comment": ""},
    {"name": "Безымянный dll", "size": "1525 кб", "check": "System Informer / Разбор .dll", "comment": ""},
    {"name": "Безымянный dll", "size": "1397 кб", "check": "System Informer / Разбор .dll", "comment": ""},
    {"name": "Безымянный dll", "size": "13591 кб", "check": "System Informer", "comment": ""}
  ],
  "banned": [
    {"name": "ElytraSwap", "tag": "Перемещение", "desc": "Автоматическая смена элитр в полёте"},
    {"name": "ArmorHotSwap", "tag": "ПвП", "desc": "Автоматическая смена брони в бою"},
    {"name": "Slippery Mod", "tag": "Механики", "desc": "Изменение механики скольжения блоков"},
    {"name": "StepUp Mod", "tag": "Перемещение", "desc": "Автоподъем на блоки без прыжка"},
    {"name": "InvMove", "tag": "Механики", "desc": "Возможность движения с открытым инвентарём"},
    {"name": "Inventory Totem", "tag": "ПвП", "desc": "Автоматическое использование тотема при смерти"},
    {"name": "Aim Assistance", "tag": "ПвП", "desc": "Помощь в прицеливании (аимбот)"},
    {"name": "Auto Look", "tag": "Автоматизация", "desc": "Автоматическое направление взгляда"},
    {"name": "Zergatul.cheatutils", "tag": "Читы", "desc": "Набор читерских утилит"},
    {"name": "NoClipFlyMod", "tag": "Перемещение", "desc": "Полёт и прохождение сквозь блоки"},
    {"name": "FreeCam", "tag": "Визуал", "desc": "Отделение камеры от тела игрока"},
    {"name": "AutoClicky", "tag": "ПвП", "desc": "Автокликер для быстрых действий"},
    {"name": "AttackAura", "tag": "ПвП", "desc": "Аура атаки вокруг игрока"},
    {"name": "Trigger bot", "tag": "ПвП", "desc": "Автоматическая атака при наведении"},
    {"name": "Auto totem", "tag": "ПвП", "desc": "Автоматическая установка тотема"},
    {"name": "inventory move", "tag": "Механики", "desc": "Движение с открытым инвентарём"},
    {"name": "elytra hack", "tag": "Перемещение", "desc": "Улучшенное управление элитрами"},
    {"name": "forge hax", "tag": "Читы", "desc": "Набор читов для Forge"}
  ],

  "settings": {
    "updatedAt": "28.12.2025"
  }
}
;