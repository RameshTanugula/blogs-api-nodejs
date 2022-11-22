create table users(
    user_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    mobile VARCHAR(100) NOT NULL,
    password VARCHAR(200) NOT NULL,
    PRIMARY KEY ( user_id )
 );

  create table posts(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    ref_url VARCHAR(100) NOT NULL,
    category_id VARCHAR(100) NOT NULL,
    created_at datetime NOT NULL,
    updated_at  datetime NOT NULL,
    user_id VARCHAR(200) NOT NULL,
    user_name VARCHAR(200) NOT NULL,
    PRIMARY KEY ( id )
 );
 create table categories(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    created_at datetime NOT NULL,
    updated_at  datetime NOT NULL,
    user_id VARCHAR(200) NOT NULL,
    user_name VARCHAR(200) NOT NULL,
    PRIMARY KEY ( id )
 );