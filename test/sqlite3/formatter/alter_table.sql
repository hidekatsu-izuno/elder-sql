ALTER TABLE test.sample
  RENAME TO new_table;

ALTER TABLE test.sample
  RENAME COLUMN old_column TO new_column;

ALTER TABLE test.sample
  RENAME old_column TO new_column;

ALTER TABLE test.sample
  ADD COLUMN new_column;

ALTER TABLE test.sample
  ADD new_column;

ALTER TABLE test.sample
  ADD COLUMN new_column
    DEFAULT NULL;

ALTER TABLE test.sample
  ADD new_column
    PRIMARY KEY;

ALTER TABLE test.sample
  ADD COLUMN new_column TEXT;

ALTER TABLE test.sample
  ADD COLUMN new_column VARING CHARACTER
    GENERATED ALWAYS AS (1) STORED;

ALTER TABLE test.sample
  ADD new_column NUMERIC(1, 0)
    PRIMARY KEY;

ALTER TABLE test.sample
  DROP COLUMN new_column;

ALTER TABLE test.sample
  DROP new_column

