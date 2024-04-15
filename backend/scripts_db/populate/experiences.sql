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
    'Visitando: Sagrada Familia, Casa Batlló, La Pedrera',
    '¡Axel Hotel Barcelona, tu oasis de estilo, confort y diversión en el corazón de Barcelona!
    Nuestro hotel, ubicado en el emblemático barrio del Eixample, es mucho más que un lugar para alojarse ,¡es un destino en sí mismo! Con un enfoque único en la comunidad LGBTQ+, cada detalle refleja nuestra calidez y modernidad.
    Disfruta de lujosas habitaciones y suites, sumérgete en nuestra piscina en la azotea con vistas impresionantes, y explora la rica cultura y vida nocturna de Barcelona.
    ¡Estamos aquí para hacer que tu estancia sea inolvidable, ya sea por negocios o por placer! ¡Únete a nosotros y descubre por qué somos un destino vibrante para todos!', 
    'Asistencia a la llegada. 4 Noches. Todo incluido. Teléfono de emergencias 24/365 días. Regalo: 1 día de SPA. Rutas.'],
     5, 
     10, 
     ARRAY['pedrera-cover.webp','casaBatllo.webp','sagradaFamilia.webp','ciutadella.webp','montserrat.webp','parkGuell.webp','pedrera.webp'], 
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
,'Ca l\'Estevet. Comida 14:00-16:00'], 
ARRAY['Visitando: El Nacional, Petit Comite, El Botafumeiro, La Boqueria, Ca l\' Estevet',
'En el corazón de Barcelona, en pleno Paseo de Gracia, se encuentra uno  de los edificios más emblemáticos de la ciudad Condal: Majestic Hotel  & Spa Barcelona. Abierto en 1918, es hoy todo un referente de estilo  elegante y atemporal, propio de los más prestigiosos hoteles  internacionales.
Durante sus más de cien años, el Majestic, propiedad de la familia  Soldevila-Casals, ha sido testigo de importantes eventos políticos,  culturales e históricos que lo han dotado de una impronta y personalidad propias que se refleja en cada pequeño detalle de lujo y confort.  
',
'Asistencia a la llegada. 4 Noches. Todo incluido. Teléfono de emergencias 24/365 días. Regalo: 1 día de SPA. Rutas.'], 
5, 
10, 
ARRAY['crema-catalana.webp','',''], 
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
ARRAY['Visitando: La Chapelle, Candy darling, El Molino, Circuit , Aire Barcelona',
'
    El hotel NH Barcelona Eixample, antes conocido como NH  Máster, se encuentra en una zona residencial del barrio del Eixample de  Barcelona. Es una ubicación muy tranquila a sólo 15 minutos andando del 
    Paseo de Gracia, donde tiendas exclusivas se mezclan con algunos de los edificios más famosos de Gaudí.
',
'Asistencia a la llegada. 4 Noches. Todo incluido. Teléfono de emergencias 24/365 días. Regalo: 1 día de SPA. Rutas.'], 
5, 
10, 
ARRAY['molino.webp','spa.webp','piscina.webp','copas.webp'], 
'festive',
'850' 
FROM "City" 
WHERE name LIKE '%Barcelona%';



-- Experiencias Madrid
INSERT INTO "Experience" (city_id,name, days_descriptions, descriptions, duration, num_people, images, "type") 
SELECT id, 'Orgullo Patrimonial' , ARRAY['Un paseo por el Madrid de Almodovar, La Puerta Del Sol, Chueca, Catedral de la Almudena, templo de debod' ,'','','',''], ARRAY['Un paseo por el Madrid de Almodovar, La Puerta Del Sol, Chueca, Catedral de la Almudena, templo de debod',''], 5, 10, ARRAY['almudena.webp','',''], 'cultural' 
FROM "City" 
WHERE name LIKE '%Madrid%';

INSERT INTO "Experience" (city_id,name, days_descriptions, descriptions, duration, num_people, images, "type",price) 
SELECT id, 'Sabores y sonrisas' , ARRAY['Visitando: Gastronomía centenaria en embajadores, sol y cortes, mercado de san miguel','','','',''], ARRAY['Visitando: Gastronomía centenaria en embajadores, sol y cortes, mercado de san miguel',''], 5, 10, ARRAY['gastroMadrid.webp','',''], 'gastronomic', '1500'
FROM "City" 
WHERE name LIKE '%Madrid%';

INSERT INTO "Experience" (city_id,name, days_descriptions, descriptions, duration, num_people, images, "type") 
SELECT id, 'Party & Wellness' , ARRAY['El orgullo, carrera de tacones, Six Harmonies','','','',''], ARRAY['El orgullo, carrera de tacones, Six Harmonies',''], 5, 10, ARRAY['chueca.webp','',''], 'festive' 
FROM "City" 
WHERE name LIKE '%Madrid%';

-- Experiencias Ibiza
INSERT INTO "Experience" (city_id,name, days_descriptions, descriptions, duration, num_people, images, "type") 
SELECT id, 'Orgullo Patrimonial' , ARRAY['Recorrer a pie Dalt Vila, el centro histórico de Ibiza, los Baluartes de Sant Pere y Sant Jaume','','','',''], ARRAY['Recorrer a pie Dalt Vila, el centro histórico de Ibiza, los Baluartes de Sant Pere y Sant Jaume',''], 5, 10, ARRAY['esCavallet.webp','',''], 'cultural' 
FROM "City" 
WHERE name LIKE '%Ibiza%';

INSERT INTO "Experience" (city_id,name, days_descriptions, descriptions, duration, num_people, images, "type", price) 
SELECT id, 'Sabores y sonrisas' , ARRAY['Visitando: Gourmet Experience de Dia completo','','','',''], ARRAY['Visitando: Gourmet Experience de Dia completo',''], 5, 10, ARRAY['brunchit.webp','',''], 'gastronomic', '1200'
FROM "City" 
WHERE name LIKE '%Ibiza%';

INSERT INTO "Experience" (city_id,name, days_descriptions, descriptions, duration, num_people, images, "type") 
SELECT id, 'Party & Wellness' , ARRAY['Visitando: La Posidonia','','','',''], ARRAY['Visitando: La Posidonia',''], 5, 10, ARRAY['pacha.webp','',''], 'festive' 
FROM "City" 
WHERE name LIKE '%Ibiza%';

-- Experiencias Gran Canaria

INSERT INTO "Experience" (city_id,name, days_descriptions, descriptions, duration, num_people, images, "type") 
SELECT id, 'Orgullo Patrimonial' , ARRAY['Visitando: Carnavales, Dunas De Maspalomas','','','',''], ARRAY['Visitando: Carnavales, Dunas De Maspalomas',''], 5, 10, ARRAY['carnaval-canarias.webp','',''], 'cultural' 
FROM "City" 
WHERE name LIKE '%Gran Canaria%';

INSERT INTO "Experience" (city_id,name, days_descriptions, descriptions, duration, num_people, images, "type") 
SELECT id, 'Sabores y sonrisas' , ARRAY['Visitando: Ruta de los quesos ','','','',''], ARRAY['Visitando: Ruta de los quesos ',''], 5, 10, ARRAY['','',''], 'gastronomic' 
FROM "City" 
WHERE name LIKE '%Gran Canaria%';

INSERT INTO "Experience" (city_id,name, days_descriptions, descriptions, duration, num_people, images, "type") 
SELECT id, 'Party & Wellness' , ARRAY['Visitando: Gala drag, Thalasso Gloria Amadores','','','',''], ARRAY['Visitando: Gala drag, Thalasso Gloria Amadores',''], 5, 10, ARRAY['','',''], 'festive' 
FROM "City" 
WHERE name LIKE '%Gran Canaria%';

-- Experiencias Málaga

INSERT INTO "Experience" (city_id,name, days_descriptions, descriptions, duration, num_people, images, "type") 
SELECT id, 'Orgullo Patrimonial' , ARRAY['Visitando: teatro romano, mercado central de atarazanas, alcazaba y castillo de gibralfaro, calle marqués de larios','','','',''], ARRAY['Visitando: teatro romano, mercado central de atarazanas, alcazaba y castillo de gibralfaro, calle marqués de larios',''], 5, 10, ARRAY['','',''], 'cultural' 
FROM "City" 
WHERE name LIKE '%Málaga%';

INSERT INTO "Experience" (city_id,name, days_descriptions, descriptions, duration, num_people, images, "type") 
SELECT id, 'Sabores y sonrisas' , ARRAY['Visitando: Cena en el Restaurante Messina con 1 estrella Michelín','','','',''], ARRAY['Visitando: Cena en el Restaurante Messina con 1 estrella Michelín',''], 5, 10, ARRAY['','',''], 'gastronomic' 
FROM "City" 
WHERE name LIKE '%Málaga%';

INSERT INTO "Experience" (city_id,name, days_descriptions, descriptions, duration, num_people, images, "type") 
SELECT id, 'Party & Wellness' , ARRAY['Visitando: lolas copas, calle de bruselas, Hammam Al Ándalus Málaga','','','',''], ARRAY['Visitando: lolas copas, calle de bruselas, Hammam Al Ándalus Málaga',''], 5, 10, ARRAY['','',''], 'festive' 
FROM "City" 
WHERE name LIKE '%Málaga%';

