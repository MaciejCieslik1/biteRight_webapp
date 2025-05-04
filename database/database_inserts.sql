SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE app_user;
TRUNCATE meal_type;
TRUNCATE ingredient;
SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO app_user  (USERNAME, EMAIL, PASSWORD_HASH, TYPE) VALUES ('superusername', 'evenbetter@gmail.com', 'hashy_hash', 'besttype');

INSERT INTO meal_type (name) VALUES ('BREAKFAST'), ( 'LUNCH'),  ('DINNER'), ('SUPPER'), ('SNACKS');
--  nawstawiać ingredientów