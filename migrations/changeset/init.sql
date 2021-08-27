create table public.model
(
    model_id      integer     not null,

    name          varchar(50) not null,

    category      varchar(50),
    framework     varchar(50),
    format        varchar(50),

    excerpt       text,
    description   text,
    create_date   date        not null,
    update_date   date        not null,

    storage_url   text,
    tags          text,
    price         decimal,
    instance_size integer,

    constraint PK_model primary key (model_id)
);

create table public.dataset
(
    dataset_id    integer     not null,

    name          varchar(50) not null,

    category      varchar(50),
    framework     varchar(50),
    format        varchar(50),

    excerpt       text,
    description   text,
    create_date   date        not null,
    update_date   date        not null,

    storage_url   text,
    tags          text,
    price         decimal,
    instance_size integer,

    constraint PK_dataset primary key (dataset_id)
);


