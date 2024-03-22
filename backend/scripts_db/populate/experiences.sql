INSERT INTO "Experience" (city_id,name, days_descriptions, descriptions, duration, num_people, images, "type") 
SELECT id, 'Orgullo Patrimonial' , ARRAY['Visitando: Sagrada Familia, Casa Batlló, La Pedrera','','','',''], ARRAY['Visitando: Sagrada Familia, Casa Batlló, La Pedrera',''], 5, 10, ARRAY['','',''], 'cultural' 
FROM "City" 
WHERE name LIKE '%Barcelona%';
