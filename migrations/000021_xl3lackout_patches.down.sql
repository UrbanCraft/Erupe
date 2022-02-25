BEGIN;

ALTER TABLE characters
    DROP COLUMN trophy bytea;

ALTER TABLE guilds
    ALTER COLUMN rp TYPE int USING 0;

END;
