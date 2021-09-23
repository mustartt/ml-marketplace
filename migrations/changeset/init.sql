-- Create hibernate sequence to use GenerationType.AUTO
create sequence public.hibernate_sequence;

create table public."user"
(
    user_id    int8 unique         not null,
    email      varchar(255),
    password   varchar(255),
    username   varchar(255) unique not null,

    constraint user_id_pk primary key (user_id)
);

create table public.user_profile
(
    profile_id  int8 not null,
    user_id     int8 not null,
    firstname   varchar(50),
    lastname    varchar(50),
    profile_img varchar(255),

    primary key (profile_id),
    constraint user_id_fk foreign key (user_id) references public."user"
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

create table public.model
(
    model_id      int8        not null,

    name          varchar(50) not null,

    category      varchar(50),
    framework     varchar(50),
    format        varchar(50),

    excerpt       text,
    description   text,
    create_date   timestamp   not null default now(),
    update_date   timestamp   not null default now(),

    publisher_id  int8        not null,

    storage_url   text,
    tags          text,
    price         float8               default 0,
    instance_size integer,

    constraint model_id_pk primary key (model_id),
    constraint publisher_id_fk foreign key (publisher_id) references public."user" (user_id)
);

create table public.dataset
(
    dataset_id    int8        not null,

    name          varchar(50) not null,

    category      varchar(50),
    framework     varchar(50),
    format        varchar(50),

    excerpt       text,
    description   text,
    create_date   timestamp   not null default now(),
    update_date   timestamp   not null default now(),

    publisher_id  int8        not null,

    storage_url   text,
    tags          text,
    price         float8               default 0,
    instance_size integer,

    constraint dataset_id_pk primary key (dataset_id),
    constraint publisher_id_fk foreign key (publisher_id) references public."user" (user_id)
);

create table public."cart_items"
(
    id    int8 unique         not null,
    quantity int,
    model_id int8,
    dataset_id int8,
    user_id int8,

    constraint model_id_fk foreign key (model_id) references public."model" (model_id),
    constraint dataset_id_fk foreign key (dataset_id) references public."dataset" (dataset_id),
    constraint user_id_fk foreign key (user_id) references public."user" (user_id)
);

create view aggregate_product_query_view as
select model_id as id,
       name,
       category,
       framework,
       format,
       excerpt,
       update_date,
       publisher_id,
       price,
       'model'  as type
from public.model
union all
select dataset_id as id,
       name,
       category,
       framework,
       format,
       excerpt,
       update_date,
       publisher_id,
       price,
       'dataset'  as type
from public.dataset;