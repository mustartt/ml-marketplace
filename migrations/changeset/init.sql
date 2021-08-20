CREATE TABLE public.product
(
    model_id      integer     NOT NULL,

    name          varchar(50) NOT NULL,

    type          varchar(10) NOT NULL,
    category      varchar(50),
    framework     varchar(50),
    format        varchar(50),

    publisher     integer     NOT NULL,

    excerpt       text,
    description   text,
    create_date   date        NOT NULL,
    update_date   date        NOT NULL,

    storage_url   text,
    tags          text,
    price         decimal,
    instance_size integer,

    CONSTRAINT PK_models PRIMARY KEY (model_id)
);

/*
CREATE TABLE public.user
(
    id          integer     NOT NULL,
    username    varchar(50) NOT NULL,
    password    varchar(50),
    email       varchar(50),
    verified    boolean,
    image_url   varchar(50),
    provider    varchar(50),
    provider_id varchar(50)
);
 */
