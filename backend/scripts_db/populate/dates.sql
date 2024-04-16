INSERT INTO "DateAvailabilty" (start_date, end_date , max_people, current_people, month, year, experience_id) 
SELECT  make_date(2024, 6, 6), make_date(2024, 6, 10), 10, 0, 'Junio', '2024', id 
FROM "Experience" 
WHERE name LIKE '%Sabores y sonrisas%';

INSERT INTO "DateAvailabilty" (start_date, end_date , max_people, current_people, month, year, experience_id) 
SELECT  make_date(2024, 6, 17), make_date(2024, 6, 21), 10, 0, 'Junio', '2024', id 
FROM "Experience" 
WHERE name LIKE '%Sabores y sonrisas%';

INSERT INTO "DateAvailabilty" (start_date, end_date , max_people, current_people, month, year, experience_id) 
SELECT  make_date(2024, 6, 17), make_date(2024, 6, 21), 10, 0, 'Junio', '2024', id 
FROM "Experience" 
WHERE name LIKE '%Orgullo Patrimonial%';

INSERT INTO "DateAvailabilty" (start_date, end_date , max_people, current_people, month, year, experience_id) 
SELECT  make_date(2024, 6, 17), make_date(2024, 6, 21), 10, 0, 'Junio', '2024', id 
FROM "Experience" 
WHERE name LIKE '%Party & Wellness%';

-- El carnaval de gran canarias es solo en febrero 
INSERT INTO "DateAvailabilty" (start_date, end_date , max_people, current_people, month, year, experience_id) 
SELECT  make_date(2025, 1, 25), make_date(2025, 1, 28), 10, 0, 'Enero', '2025', id 
FROM "Experience" 
WHERE name LIKE '%Party & Wellness%' AND city_id = (SELECT id FROM "City" WHERE name LIKE '%Gran Canaria%');
INSERT INTO "DateAvailabilty" (start_date, end_date , max_people, current_people, month, year, experience_id) 
SELECT  make_date(2025, 2, 2), make_date(2025, 2, 5), 10, 0, 'Febrero', '2025', id 
FROM "Experience" 
WHERE name LIKE '%Party & Wellness%' AND city_id = (SELECT id FROM "City" WHERE name LIKE '%Gran Canaria%');

INSERT INTO "DateAvailabilty" (start_date, end_date , max_people, current_people, month, year, experience_id) 
SELECT  make_date(2025, 2, 10), make_date(2025, 2, 13), 10, 0, 'Febrero', '2025', id 
FROM "Experience" 
WHERE name LIKE '%Party & Wellness%' AND city_id = (SELECT id FROM "City" WHERE name LIKE '%Gran Canaria%');

INSERT INTO "DateAvailabilty" (start_date, end_date , max_people, current_people, month, year, experience_id) 
SELECT  make_date(2025, 2, 14), make_date(2025, 2, 18), 10, 0, 'Febrero', '2025', id 
FROM "Experience" 
WHERE name LIKE '%Party & Wellness%' AND city_id = (SELECT id FROM "City" WHERE name LIKE '%Gran Canaria%');

-- El orgullo en Madrid 

INSERT INTO "DateAvailabilty" (start_date, end_date , max_people, current_people, month, year, experience_id) 
SELECT  make_date(2024, 6, 27), make_date(2024, 6, 30), 10, 0, 'Junio', '2024', id 
FROM "Experience" 
WHERE name LIKE '%Party & Wellness%' AND city_id = (SELECT id FROM "City" WHERE name LIKE '%Madrid%');

INSERT INTO "DateAvailabilty" (start_date, end_date , max_people, current_people, month, year, experience_id) 
SELECT  make_date(2024, 7, 1), make_date(2024, 7, 4), 10, 0, 'Julio', '2024', id 
FROM "Experience" 
WHERE name LIKE '%Party & Wellness%' AND city_id = (SELECT id FROM "City" WHERE name LIKE '%Madrid%');

INSERT INTO "DateAvailabilty" (start_date, end_date , max_people, current_people, month, year, experience_id) 
SELECT  make_date(2024, 7, 4), make_date(2024, 7, 7), 10, 0, 'Julio', '2024', id 
FROM "Experience" 
WHERE name LIKE '%Party & Wellness%' AND city_id = (SELECT id FROM "City" WHERE name LIKE '%Madrid%');


-- Circuit Festival Barcelona 2024 

INSERT INTO "DateAvailabilty" (start_date, end_date , max_people, current_people, month, year, experience_id) 
SELECT  make_date(2024, 8, 10), make_date(2024, 8, 15), 10, 0, 'Agosto', '2024', id 
FROM "Experience" 
WHERE name LIKE '%Party & Wellness%' AND city_id = (SELECT id FROM "City" WHERE name LIKE '%Barcelona%');

INSERT INTO "DateAvailabilty" (start_date, end_date , max_people, current_people, month, year, experience_id) 
SELECT  make_date(2024, 8, 12), make_date(2024, 8, 16), 10, 0, 'Agosto', '2024', id 
FROM "Experience" 
WHERE name LIKE '%Party & Wellness%' AND city_id = (SELECT id FROM "City" WHERE name LIKE '%Barcelona%');

INSERT INTO "DateAvailabilty" (start_date, end_date , max_people, current_people, month, year, experience_id) 
SELECT  make_date(2024, 8, 13), make_date(2024, 8, 17), 10, 0, 'Agosto', '2024', id 
FROM "Experience" 
WHERE name LIKE '%Party & Wellness%' AND city_id = (SELECT id FROM "City" WHERE name LIKE '%Barcelona%');