-- DROP TABLE shoppingcarts;

CREATE TABLE shoppingcarts
(
    id serial NOT NULL,
    client_id integer,
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone,
    "deletedAt" timestamp without time zone,
    active boolean DEFAULT true,
    CONSTRAINT shoppingcarts_pkey PRIMARY KEY (id),
    CONSTRAINT shoppingcarts_client_id_fkey FOREIGN KEY (client_id)
        REFERENCES clients (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

-- DROP TABLE producttests;

CREATE TABLE producttests
(
    id serial NOT NULL,
    name text  NOT NULL,
    price real NOT NULL,
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone,
    "deletedAt" timestamp without time zone,
    active boolean DEFAULT true,
    CONSTRAINT producttests_pkey PRIMARY KEY (id)
)
-- DROP TABLE productsshoppingcarts;

CREATE TABLE productsshoppingcarts
(
    id serial NOT NULL,
    sc_id integer NOT NULL,
    product_id integer NOT NULL,
    ammount integer NOT NULL,
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone,
    "deletedAt" timestamp without time zone,
    active boolean DEFAULT true,
    CONSTRAINT productsshoppingcarts_pkey PRIMARY KEY (id),
    CONSTRAINT productsshoppingcarts_product_id_fkey FOREIGN KEY (product_id)
        REFERENCES producttests (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT productsshoppingcarts_sc_id_fkey FOREIGN KEY (sc_id)
        REFERENCES shoppingcarts (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
