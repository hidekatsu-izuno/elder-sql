UPDATE sample
SET
  a = 1;

UPDATE main.sample
SET
  a = 1,
  b = 2
WHERE
  c = 3;

WITH X AS (
  SELECT
    1 AS Y
)
UPDATE sample AS dest
SET
  a = 1,
  b = 2
FROM
  X
WHERE
  dest.c = X.c;

UPDATE main.sample
SET
  a = 1,
  b = (
    SELECT
      1
  )
RETURNING
  Y,
  1 AS Z,
  *;
