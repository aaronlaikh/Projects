/*Create movies table*/
create table if not exists `moviedb` . `movies` (
	id int not null primary key auto_increment,
    title varchar(100) not null,
    `year` int not null,
    director varchar(100) not null,
    banner_url varchar(200),
    trailer_url varchar(200)
);
create table if not exists `moviedb` . `stars` (
	id int not null primary key auto_increment,
    first_name varchar(50) not null,
    last_name varchar(50) not null,
	dob date,
    photo_url varchar(200)
);

create table if not exists `moviedb` . `stars_in_movies` (
	star_id int not null,
    movie_id int not null,
    foreign key (`star_id`) references `stars`(`id`),
    foreign key (`movie_id`) references `movies`(`id`)
);
create table if not exists `moviedb` . `genres` (
	id int not null primary key auto_increment,
    `name` varchar(32) not null
);

create table if not exists `moviedb` . `genres_in_movies` (
	star_id int not null,
    movie_id int not null,
    foreign key (`star_id`) references `stars`(`id`),
    foreign key (`movie_id`) references `movies`(`id`)
);

create table if not exists `moviedb` . `creditcards` (
	id varchar(20) primary key not null,
    first_name varchar(50) not null,
	last_name varchar(50) not null,
    expiration date not null
);

create table if not exists `moviedb` . `customers` (
	id int primary key not null auto_increment,
    first_name varchar(50) not null,
	last_name varchar(50) not null,
    cc_id varchar(20) not null,
    address varchar(200) not null,
    email varchar(50) not null,
    password varchar(20) not null,
    foreign key (`cc_id`) references `creditcards`(`id`)
);

create table if not exists `moviedb` . `sales` (
	id int primary key not null auto_increment,
    customer_id int not null,
	movie_id int not null,
    sale_date date not null,
    foreign key (`customer_id`) references `customers`(`id`),
    foreign key (`movie_id`) references `movies`(`id`)
);

