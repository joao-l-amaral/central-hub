ALTER TABLE cat_digital_stores ADD isConsole boolean;

UPDATE cat_digital_stores SET isConsole = false WHERE name = 'Steam';
UPDATE cat_digital_stores SET isConsole = false WHERE name = 'Blizzard';
UPDATE cat_digital_stores SET isConsole = false WHERE name = 'GOG';
UPDATE cat_digital_stores SET isConsole = false WHERE name = 'Ubisoft';
UPDATE cat_digital_stores SET isConsole = false WHERE name = 'EA';
UPDATE cat_digital_stores SET isConsole = false WHERE name = 'Epic Store';
UPDATE cat_digital_stores SET isConsole = true WHERE name = 'Xbox';
UPDATE cat_digital_stores SET isConsole = true WHERE name = 'Sony';
UPDATE cat_digital_stores SET isConsole = true WHERE name = 'Nintendo';