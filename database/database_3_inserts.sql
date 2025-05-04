-- ----------->   Inserts to initialize the database   <--------------------------------
INSERT INTO app_user  (USERNAME, EMAIL, PASSWORD_HASH, TYPE) VALUES ('anowakforever', 'annanowak@gmail.com', 'hashy_hash', 'exampleuser');
INSERT INTO user_goal (GOAL_TYPE, GOAL_WEIGHT, DEADLINE) VALUES ("Get skinny", 55.5, now());
INSERT INTO user_info 
    (USER_ID, USER_GOAL_ID, NAME, SURNAME, AGE, WEIGHT, HEIGHT, LIFESTYLE) VALUES
    (1, 1, "Anna", "Nowak", 18,  60.0, 165, "Active" );
INSERT INTO meal_type (name) VALUES ('BREAKFAST'), ( 'LUNCH'),  ('DINNER'), ('SUPPER'), ('SNACKS');