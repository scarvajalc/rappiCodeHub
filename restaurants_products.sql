-- DROP TABLE restaurant_chains;

CREATE TABLE restaurantchains
(
    id serial NOT NULL,
    NIT varchar(40) NOT NULL,
	name varchar(100) NOT NULL,
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone,
    "deletedAt" timestamp without time zone,
    active boolean DEFAULT true,
    CONSTRAINT restaurantchains_pkey PRIMARY KEY (id)
);

-- DROP TABLE branches;

CREATE TABLE branches
(
    id serial NOT NULL,
    restaurantchain_id integer NOT NULL,
    name varchar(100) NOT NULL,
    address varchar(200) NOT NULL,
	latitude numeric NOT NULL,
	longitude numeric NOT NULL,
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone,
    "deletedAt" timestamp without time zone,
    active boolean DEFAULT true,
	CONSTRAINT branches_pkey PRIMARY KEY (id),
    CONSTRAINT branches_restaurantchain_id_fkey FOREIGN KEY (restaurantchain_id)
        REFERENCES restaurantchains (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

-- DROP TABLE products;

CREATE TABLE products
(
    id serial NOT NULL,
    name varchar(100) NOT NULL,
    price numeric NOT NULL,
	description varchar(255),
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone,
    "deletedAt" timestamp without time zone,
    active boolean DEFAULT true,
    CONSTRAINT products_pkey PRIMARY KEY (id)
);

-- DROP TABLE branchproducts;

CREATE TABLE branchproducts
(
    product_id integer NOT NULL,
    branch_id integer NOT NULL,
	stock integer NOT NULL,
	"createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone,
    "deletedAt" timestamp without time zone,
    active boolean DEFAULT true,
    CONSTRAINT branchproducts_product_id_fkey FOREIGN KEY (product_id)
        REFERENCES products (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
	CONSTRAINT branchproducts_branch_id_fkey FOREIGN KEY (branch_id)
        REFERENCES branches (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

-- DROP TABLE categories;

CREATE TABLE categories
(
    id serial NOT NULL,
    name varchar(100) NOT NULL,
	description varchar(255),
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone,
    "deletedAt" timestamp without time zone,
    active boolean DEFAULT true,
    CONSTRAINT categories_pkey PRIMARY KEY (id)
);

-- DROP TABLE categoryproducts;

CREATE TABLE categoryproducts
(
    product_id integer NOT NULL,
    category_id integer NOT NULL,
	"createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone,
    "deletedAt" timestamp without time zone,
    active boolean DEFAULT true,
    CONSTRAINT categoryproducts_product_id_fkey FOREIGN KEY (product_id)
        REFERENCES products (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
	CONSTRAINT categoryproducts_category_id_fkey FOREIGN KEY (category_id)
        REFERENCES categories (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

-- DROP TABLE openinghours;

CREATE TABLE openinghours
(
    id serial NOT NULL,
    branch_id integer NOT NULL,
    opening_day integer NOT NULL,
	opening_time time NOT NULL,
	closing_day integer NOT NULL,
	closing_time time NOT NULL,
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone,
    "deletedAt" timestamp without time zone,
    active boolean DEFAULT true,
	CONSTRAINT openinghours_pkey PRIMARY KEY (id),
    CONSTRAINT openinghours_branch_id_fkey FOREIGN KEY (branch_id)
        REFERENCES branches (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);
