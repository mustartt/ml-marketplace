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
