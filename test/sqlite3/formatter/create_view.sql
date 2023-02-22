CREATE VIEW v_sample AS
SELECT
  1;

CREATE VIEW IF NOT EXISTS main.v_sample (
  x
) AS
SELECT
  1;

CREATE TEMP VIEW main.v_sample AS
SELECT
  1;

CREATE TEMPORARY VIEW main.v_sample (
  a,
  b,
  c
) AS
SELECT
  1,
  2,
  3;

CREATE TEMPORARY VIEW IF NOT EXISTS main.v_sample AS
SELECT
  1;

