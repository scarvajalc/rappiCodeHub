insert into restaurantchains (id, nit, name, active) values (1, 123, 'El Pollo Triste', true);
insert into restaurantchains (id, nit, name, active) values (2, 234, 'Hamburguesas de Bob', true);
insert into restaurantchains (id, nit, name, active) values (3, 345, 'Hamburguesas Krusty', true);
insert into restaurantchains (id, nit, name, active) values (4, 456, 'El Inactivo', false);

insert into branches (id, restaurantchain_id, name, address, latitude, longitude, active) 
values (1, 1, 'El Pollo Triste - Calle 62', 'Calle 62 7-1', 0.0, 0.0, true);
insert into branches (id, restaurantchain_id, name, address, latitude, longitude, active) 
values (2, 1, 'El Pollo Triste - Calle 13', 'Calle 13 10-10', 1.0, 1.0, true);
insert into branches (id, restaurantchain_id, name, address, latitude, longitude, active) 
values (3, 1, 'El Pollo Triste - NQS', 'Av NQS Calle 80', 2.0, 2.0, false);
insert into branches (id, restaurantchain_id, name, address, latitude, longitude, active)
values (4, 2, 'Hamburguesas de Bob', 'Calle Libertad 1254', 3.0, 3.0, true);
insert into branches (id, restaurantchain_id, name, address, latitude, longitude, active)
values (5, 3, 'Hamburguesas Krusty - Calle Falsa', 'Calle Falsa 123', 4.0, 4.0, true);
insert into branches (id, restaurantchain_id, name, address, latitude, longitude, active)
values (6, 3, 'Hamburguesas Krusty - Springfield', 'Evergreen 590', 5.0, 5.0, true);
insert into branches (id, restaurantchain_id, name, address, latitude, longitude, active)
values (7, 3, 'Hamburguesas Krusty - XYZ', 'Evergreen 534', 6.0, 6.0, true);
insert into branches (id, restaurantchain_id, name, address, latitude, longitude, active)
values (8, 4, 'El Inactivo - Qué importa', 'Calle qué importa 123', 10.0, 10.0, false);

insert into openinghours (branch_id, opening_time, closing_time) values (1, 32400, 79200);
insert into openinghours (branch_id, opening_time, closing_time) values (1, 118800, 165600);
insert into openinghours (branch_id, opening_time, closing_time) values (1, 205200, 252000);
insert into openinghours (branch_id, opening_time, closing_time) values (1, 291600, 338400);
insert into openinghours (branch_id, opening_time, closing_time) values (1, 378000, 435600);
insert into openinghours (branch_id, opening_time, closing_time) values (1, 464400, 522000);
insert into openinghours (branch_id, opening_time, closing_time) values (1, 550800, 597600);
insert into openinghours (branch_id, opening_time, closing_time) values (2, 32400, 79200);
insert into openinghours (branch_id, opening_time, closing_time) values (2, 118800, 165600);
insert into openinghours (branch_id, opening_time, closing_time) values (2, 205200, 252000);
insert into openinghours (branch_id, opening_time, closing_time) values (2, 291600, 338400);
insert into openinghours (branch_id, opening_time, closing_time) values (2, 378000, 435600);
insert into openinghours (branch_id, opening_time, closing_time) values (2, 464400, 522000);
insert into openinghours (branch_id, opening_time, closing_time) values (2, 550800, 597600);
insert into openinghours (branch_id, opening_time, closing_time) values (3, 0, 604800);
insert into openinghours (branch_id, opening_time, closing_time) values (5, 0, 604800);
insert into openinghours (branch_id, opening_time, closing_time) values (6, 0, 604800);
insert into openinghours (branch_id, opening_time, closing_time) values (8, 0, 604800);
insert into openinghours (branch_id, opening_time, closing_time) values (7, 0, 3600);
insert into openinghours (branch_id, opening_time, closing_time) values (4, 43200, 93600);
insert into openinghours (branch_id, opening_time, closing_time) values (4, 129600, 180000);
insert into openinghours (branch_id, opening_time, closing_time) values (4, 216000, 266400);
insert into openinghours (branch_id, opening_time, closing_time) values (4, 302400, 352800);
insert into openinghours (branch_id, opening_time, closing_time) values (4, 388800, 439200);
insert into openinghours (branch_id, opening_time, closing_time) values (4, 475200, 525600);
insert into openinghours (branch_id, opening_time, closing_time) values (4, 561600, 612000);

insert into products (id, name, price, description) values (1, 'Arroz con pollo', 20000, 'Incluye papas y gaseosa.');
insert into products (id, name, price, description) values (2, 'Pollo asado + Papas + Gaseosa', 30000, 'Papas frita y gaseosa pequeña.');
insert into products (id, name, price, description) values (3, 'Pollo broaster + Papas + Gaseosa', 32000, 'Papas frita y gaseosa pequeña.');
insert into products (id, name, price, description) values (4, 'Hamburguesa con queso + Papas + Gaseosa', 25000, 'Hamburguesa de 100 gr.');
insert into products (id, name, price, description) values (5, 'Hamburguesa doble + Papas + Gaseosa', 25000, 'Hamburguesa de 200 gr.');
insert into products (id, name, price, description) values (6, 'Krusty Hamburguesa', 25000, 'Sin adiciones.');

insert into branchproducts (product_id, branch_id, stock) values (1, 1, 10);
insert into branchproducts (product_id, branch_id, stock) values (2, 1, 10);
insert into branchproducts (product_id, branch_id, stock) values (3, 1, 10);
insert into branchproducts (product_id, branch_id, stock) values (1, 2, 5);
insert into branchproducts (product_id, branch_id, stock) values (2, 2, 5);
insert into branchproducts (product_id, branch_id, stock) values (3, 2, 0);
insert into branchproducts (product_id, branch_id, stock) values (1, 2, 0);
insert into branchproducts (product_id, branch_id, stock) values (2, 2, 0);
insert into branchproducts (product_id, branch_id, stock) values (3, 2, 12);
insert into branchproducts (product_id, branch_id, stock) values (4, 4, 50);
insert into branchproducts (product_id, branch_id, stock) values (5, 5, 50);
insert into branchproducts (product_id, branch_id, stock) values (6, 5, 50);
insert into branchproducts (product_id, branch_id, stock) values (5, 6, 50);
insert into branchproducts (product_id, branch_id, stock) values (6, 6, 0);
insert into branchproducts (product_id, branch_id, stock) values (5, 7, 0);
insert into branchproducts (product_id, branch_id, stock) values (6, 7, 50);
