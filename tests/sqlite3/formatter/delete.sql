DELETE FROM sample;

DELETE FROM main.sample;

WITH X AS (
  SELECT
    1 AS Y
)
DELETE FROM main.sample
WHERE
  x = (
    SELECT
      Y
    FROM
      X
  );

DELETE FROM main.sample
WHERE
  x = 3
  AND y = 1
RETURNING
  *
