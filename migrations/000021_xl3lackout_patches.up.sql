BEGIN;

ALTER TABLE characters
    ADD COLUMN trophy bytea;

ALTER TABLE guilds
    ALTER COLUMN rp TYPE uint16 USING 0;

END;
