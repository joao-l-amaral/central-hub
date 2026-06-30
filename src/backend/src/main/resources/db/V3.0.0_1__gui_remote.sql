CREATE TABLE gui_remote (
    name text PRIMARY KEY,
    url text not null,
    title text not null,
    enable boolean
);