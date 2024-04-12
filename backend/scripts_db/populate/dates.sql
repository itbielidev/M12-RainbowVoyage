INSERT INTO "DateAvailabilty" (start_date, end_date , max_people, current_people, month, year, experience_id) 
SELECT  make_date(2024, 6, 6), make_date(2024, 6, 10), 5, 0, 'Junio', '2024', id 
FROM "Experience" 
WHERE name LIKE '%Sabores y sonrisas%';

INSERT INTO "DateAvailabilty" (start_date, end_date , max_people, current_people, month, year, experience_id) 
SELECT  make_date(2024, 6, 17), make_date(2024, 6, 21), 5, 0, 'Junio', '2024', id 
FROM "Experience" 
WHERE name LIKE '%Sabores y sonrisas%';