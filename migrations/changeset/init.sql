create table public.user_profile
(
    profile_id  int8 not null,
    firstname   varchar(50),
    lastname    varchar(50),
    profile_img varchar(255),

    primary key (profile_id)
);

create table public."user"
(
    user_id    int8 not null,
    email      varchar(255),
    password   varchar(255),
    username   varchar(255),
    profile_id int8,

    constraint user_id_pk primary key (user_id),
    constraint user_profile_fk foreign key (profile_id) references public.user_profile (profile_id)
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
    create_date   timestamp        not null,
    update_date   timestamp        not null,

    publisher_id  int8        not null,

    storage_url   text,
    tags          text,
    price         float8,
    instance_size integer,

    constraint PK_model primary key (model_id),
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
    create_date   timestamp        not null,
    update_date   timestamp        not null,

    storage_url   text,
    tags          text,
    price         float8,
    instance_size integer,

    constraint PK_dataset primary key (dataset_id)
);
