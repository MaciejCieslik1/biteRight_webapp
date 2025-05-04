-- --> mysql database summary:
-- created tables               17
-- created indexes               2
-- created views                 3

create database if not exists mysql_database;
use mysql_database;
-- ------------------------------------->        tables, primary keys, indexes & unique constraints    <---------------------------------------
create table address (
        address_id                  integer not null auto_increment primary key,
        user_id                     integer not null,
        address                     varchar(64) not null,
        city                        varchar(64) not null,
        postal_code                 varchar(5) not null,
        country                     varchar(64) not null
);

create table app_user (
        user_id                     integer not null auto_increment primary key,
        username                    varchar(64) not null,
        email                       varchar(64) not null,
        password_hash               varchar(255) not null,
        type                        varchar(64) not null
);

alter table app_user add constraint user_username_un unique ( username );

create table daily_limits (
        daily_limit_id              integer not null auto_increment primary key,
        user_id                     integer not null,
        calorie_limit              integer not null,
        protein_limit               integer not null,
        fat_limit                   integer not null,
        carb_limit                  integer not null,
        water_goal                  integer not null
);

create unique index daily_limits__idx on
        daily_limits (
                user_id
        asc );

create table exercise_info (
        exercise_id                 integer not null auto_increment primary key,
        metabolic_equivalent        decimal(4, 1) not null,
        name                        varchar(64) not null
);
alter table exercise_info add constraint exercise_name_un unique ( name );


create table ingredient (
        ingredient_id               integer not null auto_increment primary key,
        name                        varchar(64) not null, -- UNIQUE
        brand                       varchar(64),
        portion_size                integer not null,
        calories                    integer not null,
        protein                     integer not null,
        fat                         integer not null,
        carbs                       integer not null
);

alter table ingredient add constraint ingredient_name_un unique ( name );


create table limit_history (
        history_id                  integer not null auto_increment primary key,
        date_changed                date not null,
        user_id                     integer not null,
        calorie_lilmit              integer not null,
        protein_limit               integer not null,
        fat_limit                   integer not null,
        carb_limit                  integer not null,
        water_goal                  integer
);

create table meal (
        meal_id                     integer not null auto_increment primary key,
        user_id                     integer not null,
        meal_type_id                integer not null,
        meal_date                   date not null,
        name                        varchar(64) not null,
        description                 varchar(256)
);

alter table meal add constraint users_meal_un unique ( name, user_id );

create table meal_content (
        meal_content_id             integer not null auto_increment primary key,
        ingredient_id               integer not null,
        meal_id                integer not null,
        ingredient_amount           integer not null
);

create table meal_type (
        type_id                     integer not null auto_increment primary key,
        name                        varchar(64) not null -- UNIQUE
);

alter table meal_type add constraint unique_meal_type_name unique ( name );

create table recipe (
        recipe_id                   integer not null auto_increment primary key,
        name                        varchar(64) not null, -- UNIQUE
        description                 varchar(255)
);

alter table recipe add constraint recipe_name_un unique ( name );

create table recipe_content (
        recipe_content_id           integer not null auto_increment primary key,
        recipe_id                   integer not null,
        ingredient_id               integer not null,
        ingredient_amount           integer not null
);

create table user_exercise (
        user_exercise_id            integer not null auto_increment primary key,
        user_id                     integer not null,
        exercise_info_id            integer not null,
        activity_date               date not null,
        duration                    integer not null,
        calories_burnt              integer not null
);

create table user_goal (
        user_goal_id                integer not null auto_increment primary key,
        goal_type                   varchar(127) not null,
        goal_weight                 decimal(5, 2) not null,
        deadline                    date not null
);

create table user_info (
        user_info_id                integer not null auto_increment primary key,
        user_id                     integer not null,
        user_goal_id                integer not null,
        name                        varchar(64) not null,
        surname                     varchar(64) not null,
        age                         integer not null,
        weight                      decimal(5, 2) not null,
        height                      integer not null,
        lifestyle                   varchar(64) not null,
        bmi                         decimal(4, 2) not null
);

create table user_preferences (
        user_preferences_id         integer not null auto_increment primary key,
        user_id                     integer not null,
        language                    varchar(64) not null default("eng"),
        darkmode                    boolean not null default false,
        font                        varchar(64),
        notifications               boolean not null default false
);

create unique index user_preferences__idx on
        user_preferences (
                user_id
        asc );

create table water_intake (
        water_intake_id             integer not null auto_increment primary key,
        intake_date                 date not null,
        user_id                     integer not null,
        water_amount                integer not null
);

create table weight_history (
        weight_id                   integer not null auto_increment primary key,
        user_id                     integer not null,
        measurement_date            date not null,
        weight                      decimal(5, 2) not null
);





-- ---------------------------------------->        foreign keys     <------------------------------------------
alter table address
        add constraint address_user_fk foreign key ( user_id )
                references app_user ( user_id );

alter table daily_limits
        add constraint daily_limits_user_fk foreign key ( user_id )
                references app_user ( user_id );

alter table meal_content
        add constraint meal_content_ingredient_fk foreign key ( ingredient_id )
                references ingredient ( ingredient_id );

alter table meal_content
        add constraint meal_content_meal_fk foreign key ( meal_id )
                references meal ( meal_id );

alter table meal
        add constraint meal_meal_type_fk foreign key ( meal_type_id )
                references meal_type ( type_id );

alter table meal
        add constraint meal_user_fk foreign key ( user_id )
                references app_user ( user_id );

alter table recipe_content
        add constraint recipe_content_food_fk foreign key ( ingredient_id )
                references ingredient ( ingredient_id );

alter table recipe_content
        add constraint recipe_content_recipe_fk foreign key ( recipe_id )
                references recipe ( recipe_id );

alter table user_exercise
        add constraint user_exercise_exercise_info_fk foreign key ( exercise_info_id )
                references exercise_info ( exercise_id );

alter table user_exercise
        add constraint user_exercise_user_fk foreign key ( user_id )
                references app_user ( user_id );

alter table user_info
        add constraint user_info_user_fk foreign key ( user_id )
                references app_user ( user_id );

alter table user_info
        add constraint user_info_user_goal_fk foreign key ( user_goal_id )
                references user_goal ( user_goal_id );

alter table user_preferences
        add constraint user_preferences_user_fk foreign key ( user_id )
                references app_user ( user_id );

alter table water_intake
        add constraint water_intake_user_fk foreign key ( user_id )
                references app_user ( user_id );

alter table weight_history
        add constraint weight_history_user_fk foreign key ( user_id )
                references app_user ( user_id );





-- ---------------------------------------->        views     <------------------------------------------
create or replace view meal_info  as
select meal.meal_id as meal_id,
        meal.user_id as user_id,
    meal.name as meal_name,
    sum(ingredient.calories * meal_content.ingredient_amount / 100) as calories,
    sum(ingredient.protein * meal_content.ingredient_amount / 100) as protein,
    sum(ingredient.fat * meal_content.ingredient_amount / 100) as fat,
    sum(ingredient.carbs * meal_content.ingredient_amount / 100) as carbs
from meal_content
    inner join ingredient on ingredient.ingredient_id =
        meal_content.ingredient_id
    inner join meal on meal.meal_id = meal_content.meal_id
group by meal.meal_id,
    meal.user_id,
    meal.name
;


create or replace view daily_summary    as
select app_user.user_id as user_id,
    water_intake.intake_date as summary_date,
    sum(meal_info.calories) as calories,
    sum(meal_info.protein) as protein,
    sum(meal_info.fat) as fat,
    sum(meal_info.carbs) as carbs,
    sum(user_exercise.calories_burnt) as calories_burnt
from app_user
    inner join water_intake on app_user.user_id = water_intake.user_id
    inner join user_exercise on app_user.user_id = user_exercise.user_id,
    meal_info
group by app_user.user_id,
    water_intake.intake_date
;


create or replace view recipe_info ( recipe_id, recipe_name, calories, protein, fat, carbs ) as
select
        recipe.recipe_id   as recipe_id,
        recipe.name  as recipe_name,
        sum(ingredient.calories * recipe_content.ingredient_amount / 100) as calories,
        sum(ingredient.protein * recipe_content.ingredient_amount / 100)    as protein,
        sum(ingredient.fat * recipe_content.ingredient_amount / 100)            as fat,
        sum(ingredient.carbs * recipe_content.ingredient_amount / 100)        as carbs
from
        ingredient
        inner join recipe_content on ingredient.ingredient_id = recipe_content.ingredient_id
        inner join recipe on recipe.recipe_id = recipe_content.recipe_id
group by
        recipe.recipe_id,
        recipe.name
;