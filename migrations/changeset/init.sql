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

create table public."user"
(
    user_id  int8 not null,
    email    varchar(255),
    password varchar(255),
    username varchar(255),

    constraint user_id_pk primary key (user_id)
);

create table public."role"
(
    role_id int8 not null,
    name    varchar(255),

    constraint role_id_pk primary key (role_id)
);

create table public.user_roles
(
    user_id int8 not null,
    role_id int8 not null,

    primary key (user_id),

    constraint user_roles_user_fk foreign key (user_id) references public."user" (user_id),
    constraint user_roles_role_fk foreign key (role_id) references public."role" (role_id)
);

