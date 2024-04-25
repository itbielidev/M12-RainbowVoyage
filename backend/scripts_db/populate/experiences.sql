-- Experiencias Barcelona

INSERT INTO "Experience" (city_id, name, days_descriptions, descriptions, duration, num_people, images, "type", price) 
SELECT id, 'Orgullo Patrimonial' , 
ARRAY[
    'Casa Batlló visita guiada de 16:30-18:00',
    'Sagrada Familia visita guiada de 9:30-11:00',
    'Excursión a Montserrat de 9:00-18:00',
    'Parc Güell visita guida de 12:30-14:00', 
    'La Pedrera vista guida de 15:00-17:00. Paseo por la Ciutadella'
], 
ARRAY[
    'Sagrada Familia, Casa Batlló, La Pedrera',
    '¡Axel Hotel Barcelona, tu oasis de estilo, confort y diversión en el corazón de Barcelona!
    Nuestro hotel, ubicado en el emblemático barrio del Eixample, es mucho más que un lugar para alojarse ,¡es un destino en sí mismo! Con un enfoque único en la comunidad LGBTQ+, cada detalle refleja nuestra calidez y modernidad.
    Disfruta de lujosas habitaciones y suites, sumérgete en nuestra piscina en la azotea con vistas impresionantes, y explora la rica cultura y vida nocturna de Barcelona.
    ¡Estamos aquí para hacer que tu estancia sea inolvidable, ya sea por negocios o por placer! ¡Únete a nosotros y descubre por qué somos un destino vibrante para todos!', 
    'Asistencia a la llegada. 4 Noches. Todo incluido. Teléfono de emergencias 24/365 días. Regalo: 1 día de SPA. Rutas.'],
     5, 
     10, 
     ARRAY['pedrera-cover.webp','casaBatllo.webp','sagradaFamilia.webp','ciutadella.webp','montserrat.webp','parkGuell.webp','pedrera.webp','copas.webp','habitacion.webp','hotel.webp'], 
     'cultural',
     '1100' 
FROM "City" 
WHERE name LIKE '%Barcelona%';

INSERT INTO "Experience" (city_id,name, days_descriptions, descriptions, duration, num_people, images, "type", price) 
SELECT id, 'Sabores y sonrisas' , 
ARRAY[
'El nacional comida 14:00 -16:00'
,'Petit Comité comida 14:00-16:00'
,'El Botafumeiro comida 14:00 -16:00'
,'La Boqueria. Visita guiada 12:30-13:30. Comida 14:00 -16:00'
,'Cal Estevet. Comida 14:00-16:00'], 
ARRAY['El Nacional, Petit Comite, El Botafumeiro, La Boqueria, Cal Estevet',
'En el corazón de Barcelona, en pleno Paseo de Gracia, se encuentra uno  de los edificios más emblemáticos de la ciudad Condal: Majestic Hotel  & Spa Barcelona. Abierto en 1918, es hoy todo un referente de estilo  elegante y atemporal, propio de los más prestigiosos hoteles  internacionales.
Durante sus más de cien años, el Majestic, propiedad de la familia  Soldevila-Casals, ha sido testigo de importantes eventos políticos,  culturales e históricos que lo han dotado de una impronta y personalidad propias que se refleja en cada pequeño detalle de lujo y confort.  
',
'Asistencia a la llegada. 4 Noches. Todo incluido. Teléfono de emergencias 24/365 días. Regalo: 1 día de SPA. Rutas.'], 
5, 
10, 
ARRAY['crema-catalana.webp','boqueria.webp','botafumeiro.webp','estevet.webp','elnacional.webp','petitComite.webp','','bufetHotelEixample.webp','desayunosHotelEixample.webp','entradaHotelEixample.webp','gimnasioHotelEixample.webp','habitacionHotelEixample.webp'], 
'gastronomic', 
'1200' 
FROM "City" 
WHERE name LIKE '%Barcelona%';

INSERT INTO "Experience" (city_id,name, days_descriptions, descriptions, duration, num_people, images, "type", price) 
SELECT id, 'Party & Wellness' ,
ARRAY[
'La Chapelle desde las 23:00',
'Candy Darling desde las 23:00',
'El Molino desde las 22:00',
'Circuit Barcelona desde las 12:00',
'Aire Barcelona desde las 12:00.'], 
ARRAY['La Chapelle, Candy darling, El Molino, Circuit , Aire Barcelona',
'
    El hotel NH Barcelona Eixample, antes conocido como NH  Máster, se encuentra en una zona residencial del barrio del Eixample de  Barcelona. Es una ubicación muy tranquila a sólo 15 minutos andando del 
    Paseo de Gracia, donde tiendas exclusivas se mezclan con algunos de los edificios más famosos de Gaudí.
',
'Asistencia a la llegada. 4 Noches. Todo incluido. Teléfono de emergencias 24/365 días. Regalo: 1 día de SPA. Rutas.'], 
5, 
10, 
ARRAY['arena.webp','spa.webp','piscina.webp','copas.webp','','','','balconMajestic.webp','fitnessMajestic.webp','habitacionMajestic.webp','restauranteMajestic.webp','spaMajestic.webp','terrazaMajestic.webp'], 
'festive',
'850' 
FROM "City" 
WHERE name LIKE '%Barcelona%';



-- Experiencias Madrid
INSERT INTO "Experience" (city_id,name, days_descriptions, descriptions, duration, num_people, images, "type", price) 
SELECT id, 'Orgullo Patrimonial' ,
ARRAY[
 'El Madrid de Almodóvar',
 'Ruta Madrid Esencial',
 'El Retiro y Puerta de Alcalá',
 'Catedral de la Almudena y templo de Debod']
 , 
ARRAY[
'Un paseo por el Madrid de Almodovar, La Puerta Del Sol, Chueca, Catedral de la Almudena, templo de debod',
'Room Mate Alba tiene una localización magnífica en la calle de las Huertas, una de las vías peatonales más importantes del centro de Madrid que se caracteriza por los emblemáticos fragmentos literarios plasmados a lo largo de su recorrido. A su alrededor existe una amplia oferta gastronómica y cultural: al lado del famoso Triángulo del Arte. Y no te preocupes por tu obligada visita a la Puerta del Sol, calle Gran Vía y Plaza Mayor, están a solo 5 minutos andando.',
'Asistencia a la llegada. 4 Noches. Todo incluido. Teléfono de emergencias 24/365 días. Regalo: 1 día de SPA. Rutas.'], 
4, 
10, 
ARRAY['almudena.webp','almodovar.webp','debod.webp','cibeles.webp','sol.webp','ruta-madrid.webp','','palace-hab.webp','petitPalace.webp'], 
'cultural',
'800'
FROM "City" 
WHERE name LIKE '%Madrid%';

INSERT INTO "Experience" (city_id,name, days_descriptions, descriptions, duration, num_people, images, "type",price) 
SELECT id, 'Sabores y sonrisas' ,
ARRAY[
    'Ruta por el barrio de embajadores',
    'Ruta de Restaurantes, Cafés y Bodegas Centenarias',
    'Visita nocturna por la historia del Madrid antigo con tapas'], 
    ARRAY[
        'Gastronomía centenaria en embajadores, sol y cortes, mercado de san miguel',
        '
            Vitium Urban Suites es un hostal boutique en Madrid, Gran vía de diseño vanguardista y carismático que ofrece un nuevo concepto de alojamiento,  consiguiendo mejorar la imagen de los hostales tradicionales. Es un hostal en el centro de Madrid, ubicado en una zona privilegiada, Gran vía y en un edificio emblemático.
            Vitium Urban Suites sorprende especialmente a aquellas personas que buscan un lugar vanguardista y cosmopolita. Si aprecian la gran cantidad de actividades culturales y de ocio que la ubicación de este hostal de lujo en la Gran Vía de Madrid propone, podrán disfrutar de ellas con un alojamiento de calidad a precios asequibles.
        ',
        'Asistencia a la llegada. 4 Noches. Todo incluido. Teléfono de emergencias 24/365 días. Regalo: 1 día de SPA. Rutas.'
        ], 
    3, 
    10, 
    ARRAY['gastroMadrid.webp','barrioCortes.webp','debod.webp','mercado-sanmiguel.webp','embajadores.webp','','','bufetMadrid.webp','habitacionMadrid.webp','relaxMadrid.webp','terrazaMadrid.webp'], 
    'gastronomic', 
    '1500'
FROM "City" 
WHERE name LIKE '%Madrid%';

INSERT INTO "Experience" (city_id,name, days_descriptions, descriptions, duration, num_people, images, "type", price) 
SELECT id, 'Party & Wellness' , 
ARRAY
[
'Ruta por el barrio de Chueca',
'Visita al Orgullo',
'Orgullo y carrera de tacones',
'Día de Spa Six Harmonies'
], 
ARRAY[
    'El orgullo, carrera de tacones, Six Harmonies',
    'Vive Madrid desde el Petit Palace Chueca y abre tu corazón a todo lo que esta ciudad única puede ofrecerte. Desde este hotel boutique en el barrio de Chueca, estarás a un paso de la Gran Vía, la Puerta de Sol y los mejores locales de moda de Madrid. Sumérgete en su agradable ambiente y descubre los secretos de un edificio lleno de historia que irradia vanguardia y modernidad. Su estructura y ascensor se conservan desde la construcción de la Gran Vía en el siglo XX. Presume de su cuidada decoración y del desayuno healthy que preparan cada día, así como de sus increíbles habitaciones superiores. Además, aquí tu mascota es siempre bienvenida.',
    'Asistencia a la llegada. 4 Noches. Todo incluido. Teléfono de emergencias 24/365 días. Regalo: 1 día de SPA. Rutas.'], 
4, 
10, 
ARRAY['chueca.webp','batucada.webp','carrera-tacones.webp','six-harmonies.webp','chuecaUmbrella.webp','madpride.webp','sixharmoniesmad.webp','desayunosHotelmadrid.webp','habitacionmadrid.webp','relaxHotelMadrid.webp'], 
'festive',
'800'
FROM "City" 
WHERE name LIKE '%Madrid%';

-- Experiencias Ibiza
INSERT INTO "Experience" (city_id,name, days_descriptions, descriptions, duration, num_people, images, "type", price) 
SELECT id, 'Orgullo Patrimonial' , 
ARRAY[
'Ruta por Dalt Vila',
'Centro histórico de Ibiza',
'Los Baluartes de Sant Pere y Sant Jaume'
], 
ARRAY[
'Recorrer a pie Dalt Vila, el centro histórico de Ibiza, los Baluartes de Sant Pere y Sant Jaume',
'Situado frente al mar y cuenta con habitaciones amplias y modernas y suites junior. También ofrece piscinas de agua dulce, 4 pistas de tenis y un gimnasio. El hotel organiza un variado programa de animación para adultos y niños. Asimismo, el moderno spa tiene piscina cubierta, bañera de hidromasaje, sauna y baños de vapor. También hay una piscina al aire libre con chorros y cascadas. El establecimiento dispone de 3 restaurantes buffet y otros 4 a la carta, También hay un bar junto a la piscina y un bar en el vestíbulo. El aeropuerto de Ibiza está a solo 4 km del Grand Palladium Palace Ibiza Resort & Spa. La ciudad de Ibiza queda a 6 km.',
'Asistencia a la llegada. 4 Noches. Todo incluido. Teléfono de emergencias 24/365 días. Regalo: 1 día de SPA. Rutas.'], 
3, 
10, 
ARRAY['esCavallet.webp','baluartesantjaume.webp','casamatasantepere.webp','centroHistorico.webp','esVedra.webp','vilaAlta.webp','','hotel.webp','habitacion.webp','chillOut.webp'], 
'cultural',
'1000'
FROM "City" 
WHERE name LIKE '%Ibiza%';

INSERT INTO "Experience" (city_id,name, days_descriptions, descriptions, duration, num_people, images, "type", price) 
SELECT id, 'Sabores y sonrisas' , 
ARRAY[
'Gourmet Experience',
'Tour en barco Ibiza - Formentera. Incluye tapas, bebida, viaje ida y vuelta',
'Brunch & Yoga'
], 
ARRAY[
'Gourmet Experience de Dia completo',
'El Standard ocupa su lugar en una larga lista de caracteres atrevidos que dejarán su huella en Ibiza. Cincuenta y tres habitaciones y suites ocupan este elegante hotel blanco a tiro de piedra del puerto deportivo. Al final de la cuadra, Casa Privada ofrece los placeres de una elegante residencia privada. UP ofrece una de las únicas piscinas de temporada en la azotea de Ibiza y vistas panorámicas del Castillo, de día y de noche. El restaurante del hotel, Jara, a pie de calle, abre las puertas a bellos desconocidos y a la animada escena callejera, creando una atmósfera en la que todo vale hasta altas horas de la madrugada.',
'Asistencia a la llegada. 3 Noches. Todo incluido. Teléfono de emergencias 24/365 días. Regalo: 1 Día de SPA. Rutas.'], 
3, 
10, 
ARRAY['brunchit.webp','mitchBar.webp','sushimi.webp','tapasIbiza.webp','thePriceAlbert.webp','vanilleIbiza.webp','','habitacionStandardIBiza.webp','terrazaStandardIbiza.webp'], 
'gastronomic', 
'1200'
FROM "City" 
WHERE name LIKE '%Ibiza%';

INSERT INTO "Experience" (city_id,name, days_descriptions, descriptions, duration, num_people, images, "type", price) 
SELECT id, 'Party & Wellness' , 
ARRAY[
'Celebra el Orgullo',
'Celebra el Orgullo',
'La Posidonia',
'Ushuaia'
], ARRAY[
'Fiesta del Orgullo, La Posidonia, Ushuaia,',
'Disfrutarás de una estancia de lujo gracias a los servicios y facilidades a tu disposición: ropa de cama de primera calidad, camas Kings Size, mobiliario de diseño, terraza con vistas al mar o la piscina, servicio de habitaciones 24 h, WiFi… ¿Buscas una habitación con jacuzzi en Ibiza con vistas al mar? ¿O acaso prefieres una suite swim-up con acceso directo a piscina privada? ¿O tienes alma de número uno y deseas la Rock Star Suite, una suite acristalada de 165 metros cuadrados con increíbles vistas sobre el Mediterráneo? Tenemos más de una docena de categorías de habitaciones y suites de lujo para que vivas unas memorables vacaciones en Ibiza en familia, en pareja o con amigos. Ooooh, yeah!',
'Asistencia a la llegada. 4 Noches. Todo incluido. Teléfono de emergencias 24/365 días. Regalo: 1 día de SPA. Rutas.'], 
4, 
10, 
ARRAY['pacha.webp','posidio.webp','ushuaia.webp','','','','','habitacionPalladiumIbiza.webp','recepcionIbizaPalladium.webp','hotelIbizaPalladium.webp'], 
'festive',
'700' 
FROM "City" 
WHERE name LIKE '%Ibiza%';

-- Experiencias Gran Canaria

INSERT INTO "Experience" (city_id,name, days_descriptions, descriptions, duration, num_people, images, "type", price) 
SELECT id, 'Orgullo Patrimonial' , 
ARRAY[
'Tour dunas de Maspalomas',
'Canteras',
'Tour Vegueta',
'Triana y Teror'], 
ARRAY['Canteras, Dunas De Maspalomas, Triana y Teror',
'Tu hotel en el centro de Las Palmas de Gran Canaria.
Hotel Cristina by Tigotan resulta de la fusión entre lo urbano y lo vacacional. Esta mezcla ofrece el perfecto tándem entre los espacios modernos y diáfanos donde podemos desde deleitar una buena comida o una copa hasta llevar a cabo una jornada de teletrabajo, a pie de playa, en la primera línea más espectacular de toda Las Palmas de Gran Canaria.
',
'Asistencia a la llegada. 4 Noches. Todo incluido. Teléfono de emergencias 24/365 días. Regalo: 1 día de SPA. Rutas.'], 
4, 
10, 
ARRAY['dunas-maspalomas.webp','canteras.webp','teror.webp','triana.webp','vegueta.webp','','','peregrina.webp','peregrina-terrace.webp','peregrina-hab.webp'], 
'cultural',
'1200'
FROM "City" 
WHERE name LIKE '%Gran Canaria%';

INSERT INTO "Experience" (city_id,name, days_descriptions, descriptions, duration, num_people, images, "type", price) 
SELECT id, 'Sabores y sonrisas' ,
ARRAY[
'Tour Mercadillo de Tenor',
'Tour Mercado Agrícola de Guía y Tour Mercado Artesano de Vega de San Mateo',
'Mercado de Maspalomas',
'Mercado Artesanal de Santa Brígida'
], 
ARRAY[
    'Ruta de los quesos',
    'En pleno centro histórico de la ciudad de Las Palmas de Gran Canaria encontrará el Boutique Hotel Cordial La Peregrina. Con 28 amplias y preciosas habitaciones, este hotel urbano se caracteriza por el contraste entre el exterior clásico del inmueble y un interior vanguardista orientado a proporcionar al huésped una experiencia singular, con gran atención a la tecnología, extremando el cuidado de cada detalle para conseguir un alto nivel de confort. Un edificio histórico y protegido situado en una zona de gran ambiente, en el Barrio de Triana en la esquina entre la Calle Remedios y Calle Peregrina, que hará de su estancia en la capital de Gran Canaria una experiencia inolvidable.',
    'Asistencia a la llegada. 4 Noches. Todo incluido. Teléfono de emergencias 24/365 días. Regalo: 1 día de SPA. Rutas.'], 
    4, 
    10, 
    ARRAY['cortijo-pavon.webp','cortijo-pavon.webp','queso-canario.webp','ruta-quesos.webp','','','','recepcion.webp','habitacionCanarias.webp','entrada.webp'], 
    'gastronomic',
    '600'
FROM "City" 
WHERE name LIKE '%Gran Canaria%';

INSERT INTO "Experience" (city_id,name, days_descriptions, descriptions, duration, num_people, images, "type", price) 
SELECT id, 'Party & Wellness' , 
ARRAY[
    'Día de Spa',
    'Desfile de carnaval',
    'Gala Drag',
    'Gran Cabalgata'], 
    ARRAY[
        'Gala drag, Desfile de Carnaval, Thalasso Gloria Amadores',
        'Tu hotel en el centro de Las Palmas de Gran Canaria.
Hotel Cristina by Tigotan resulta de la fusión entre lo urbano y lo vacacional. Esta mezcla ofrece el perfecto tándem entre los espacios modernos y diáfanos donde podemos desde deleitar una buena comida o una copa hasta llevar a cabo una jornada de teletrabajo, a pie de playa, en la primera línea más espectacular de toda Las Palmas de Gran Canaria.
',
        'Asistencia a la llegada. 4 Noches. Todo incluido. Teléfono de emergencias 24/365 días. Regalo: 1 día de SPA. Rutas.'], 
        4,
        10, 
        ARRAY['carnaval-canarias.webp','gala-drag.webp','lesbian-beach.webp','maspalomas-festival.webp','orgullo-maspalomas.webp','','','terrazaHotelCanarias.webp','recepcionHotelCanarias.webp','habitacionHotelCanarias.webp'], 
        'festive',
        '800'
FROM "City" 
WHERE name LIKE '%Gran Canaria%';

-- Experiencias Málaga

INSERT INTO "Experience" (city_id,name, days_descriptions, descriptions, duration, num_people, images, "type", price) 
SELECT id, 'Orgullo Patrimonial' , 
ARRAY[
    'Teatro romano',
    'Mercado central de Atarazanas',
    'Alcazaba',
    'Castillo del Gibralfaro',
    'Calle Marqués de Larios'], 
    ARRAY[
        'Teatro Romano, Mercado Central de Atarazanas, Alcazaba y Castillo de Gibralfaro, Calle Marqués De Larios',
        'Hotel en Málaga, situado en la decimonónica calle Larios, una de las zonas más emblemáticas de la ciudad, y una de las vías más elegantes y relevantes a nivel histórico, comercial y cultural. Ocupa el antiguo edificio que, tras construirse en 1821, acogió durante todo el siglo XX los populares Almacenes Gómez Raggio, convertidos en un punto de referencia para toda la ciudad y que hoy ven reflejada su esencia en sutiles detalles del proyecto de interiorismo del hotel, inspirados en los orígenes del inmueble.
        La situación estratégica del establecimiento, en el número 10 de esta céntrica vía malagueña, permite vivir el magnífico ambiente que respira la ciudad andaluza, y disfrutar de su arte, tradición, gastronomía, cultura y vanguardia. Se encuentra a escasos metros de la Catedral, el Teatro Romano, la Alcazaba, el Museo Carmen Thyssen Málaga y el Museo Picasso. Para disfrutar del sol, la playa de La Malagueta está a tan solo 15 minutos andando del hotel.
        ',
        'Asistencia a la llegada. 4 Noches. Todo incluido. Teléfono de emergencias 24/365 días. Regalo: 1 día de SPA. Rutas.'], 
        5, 
        10, 
        ARRAY['Roman_Malaga.webp','alcazaba.webp','castilo-gibralzara.webp','teatroRomanoMalaga.webp','Roman_Malaga.webp','calleLariosMalaga.webp','spaMalaga.webp','hotelMalaga.webp','habitacionMalaga.webp'], 
        'cultural',
        '1000'
FROM "City" 
WHERE name LIKE '%Málaga%';

INSERT INTO "Experience" (city_id,name, days_descriptions, descriptions, duration, num_people, images, "type", price) 
SELECT id, 'Sabores y sonrisas' , 
ARRAY[
    'Cena Restaurante Messina (1 estrella Michelin)',
    'Ruta en bici & pescaito',
    'Mercado Central & tapas',
    'Ruta de maridaje'
    ], 
    ARRAY[
        'Cena en el Restaurante Messina con 1 estrella Michelín, Mercado Central',
        'Su inmejorable ubicación entre la Catedral de Málaga y el Paseo del Parque, así como su espectacular vista al puerto, convierten a este hotel en uno de los más emblemáticos de la ciudad. Se encuentra cerca del Museo Picasso, la Alcazaba, el Castillo de Gibralfaro, la famosa calle Marqués de Larios y la playa de La Malagueta. El menú del restaurante del AC Hotel Málaga Palacio se basa en la cocina regional con gran variedad de platos de todo el mundo. En verano, visite el bar y el restaurante Ático del piso 15, la terraza del hotel, donde también puede encontrar nuestra impresionante piscina en la azotea, el lugar ideal para refrescarse durante los sofocantes meses mientras disfruta de las mágicas vistas. Disfrute de un cóctel en el AC Lounge, situado en el primer piso, que ofrece un espíritu urbano y un entorno informal, elegante y moderno en el centro de Málaga. ',
        'Asistencia a la llegada. 4 Noches. Todo incluido. Teléfono de emergencias 24/365 días. Regalo: 1 día de SPA. Rutas.'], 
        4, 
        10, 
        ARRAY['mercadoMalaga.webp','mercadoMalaga.webp','messina.webp','maridaje.webp','','','','piscinaMalaga.webp','comidaMalaga.webp','habitacionMalaga1.webp'],
         'gastronomic',
         '800'
FROM "City" 
WHERE name LIKE '%Málaga%';

INSERT INTO "Experience" (city_id,name, days_descriptions, descriptions, duration, num_people, images, "type", price) 
SELECT id, 'Party & Wellness' , 
ARRAY[
'Lolas Copas',
'Copeo en la calle Bruselas',
'Hammam Al Ándalus',
'Hammam Al Ándalus'], 
ARRAY[
'Lolas Copas, Calle de Bruselas, Hammam Al Ándalus Málaga',
'El hotel Molina Lario es un hotel de 4 estrellas que cuenta con una situación privilegiada en el corazón de Málaga justo enfrente de la Catedral, a escasos metros del Puerto, del Museo Picasso y de la zona peatonal de la ciudad. Es un hotel con encanto en el centro de la ciudad, formado por dos edificios rehabilitados con fachada original del s.XIX y un tercero completamente nuevo, que integran un conjunto hotelero único en el centro de la ciudad de Málaga. Sus 103 habitaciones muy luminosas y de diferentes estilos, están pensadas para hacerle sentir como en casa y para que no le falte de nada ya que cuentan con múltiples detalles.',
'Asistencia a la llegada. 4 Noches. Todo incluido. Teléfono de emergencias 24/365 días. Regalo: 1 día de SPA. Rutas.'],
 4, 
 10, 
 ARRAY['lolaCopasMalaga.webp','hammamAlAndalus.webp','lolaCopasMalaga.webp','calleBruselasMalaga.webp','','','','terrazaHotel.webp','habitacionHotel.webp','entradaHotel.webp'], 
 'festive',
 '1200' 
FROM "City" 
WHERE name LIKE '%Málaga%';

