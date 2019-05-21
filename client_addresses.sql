-- Table: public.client_addresses

-- DROP TABLE public.client_addresses;

CREATE TABLE public.client_addresses
(
    address_name character varying COLLATE pg_catalog."default",
    client_id integer,
    id integer NOT NULL DEFAULT nextval('client_addresses_id_seq'::regclass),
    latitude character varying COLLATE pg_catalog."default",
    longitude character varying COLLATE pg_catalog."default",
    current boolean,
    CONSTRAINT client_addresses_pkey PRIMARY KEY (id),
    CONSTRAINT client_id FOREIGN KEY (client_id)
        REFERENCES public.clients (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.client_addresses
    OWNER to postgres;