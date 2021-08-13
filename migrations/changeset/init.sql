-- temporary liquibase tests
CREATE TABLE public.liquibase_test
(
    id   uuid NOT NULL,
    col1 int NULL,
    col2 varchar(50) NULL,
    CONSTRAINT liquibase_test_pk PRIMARY KEY ( id )
);
