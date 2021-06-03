-- 2021-06-03 15:45:39 : add images available & images scheduled

CREATE TABLE images_avalible (
	url VARCHAR (2048),
    UNIQUE(url)
);

CREATE TABLE images_scheduled (
	url VARCHAR (2048),
	dont_show_before timestamptz,
    UNIQUE(dont_show_before)
);