EXPLAIN
SELECT
  a,
  b
FROM
  t1
WHERE
  a = 1;

EXPLAIN QUERY PLAN
SELECT
  t1.*,
  t2.*
FROM
  t1,
  t2
WHERE
  t1.a = 1
  AND t1.b > 2;
