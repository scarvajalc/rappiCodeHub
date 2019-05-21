--DROP TABLE orders;

CREATE TABLE orders
(
    id serial NOT NULL PRIMARY KEY,
    client_id integer REFERENCES clients(id),
	client_address_id integer REFERENCES client_addresses(id),
	rt_id integer REFERENCES rappitenderos(id),
	branch_id integer REFERENCES branches(id),
	total numeric,
	status bool,
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone,
    "deletedAt" timestamp without time zone,
    active boolean DEFAULT true
);
--DROP TABLE ordersproducts;

CREATE TABLE ordersproducts
(
    id serial NOT NULL PRIMARY KEY,
    order_id integer REFERENCES orders(id),
	product_id integer REFERENCES products(id),
	quantity integer, 
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone,
    "deletedAt" timestamp without time zone,
    active boolean DEFAULT true
);



