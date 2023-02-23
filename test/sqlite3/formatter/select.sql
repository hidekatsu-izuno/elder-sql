SELECT
  1 + 2 - 3,
  -1 * 2 / 3 c1,
  +1 - 2 * 3 AS c2;

SELECT
  c1
FROM
  (
    SELECT
      *
    FROM
      sample
  )
GROUP BY
  c1;

WITH x AS (
  SELECT
    s.*
  FROM
    sample s
)
SELECT
  *
FROM
  x
WHERE
  x.col1 = 2
  AND NOT (
    x.col2 NOT LIKE '%x%'
    OR x.col2 IS NULL
  )
ORDER BY
  x.col3
LIMIT 1;

SELECT
  *
FROM
  a,
  main.b x,
  c as y
WHERE
  a.x = x.x
  AND x.x = y.x
  AND y.y = 0;

SELECT
  -1,
  TRUE,
  FALSE,
  NULL,
  CURRENT_TIME,
  CURRENT_DATE,
  CURRENT_TIMESTAMP,
  'aaa',
  "aaa",
  x'53514C697465';

SELECT
  ?1,
  ?,
  :param,
  @param,
  $param;

SELECT
  CASE x
    WHEN 1 THEN 'a'
  END x
FROM
  test;

SELECT
  CASE x
    WHEN 1 THEN 'a'
    WHEN 2 THEN 'b'
    ELSE 'c'
  END x
FROM
  test;

SELECT
  CASE
    WHEN x = 1 THEN 'a'
  END AS x
FROM
  test;

SELECT
  CASE
    WHEN x = 1 THEN 'a'
    WHEN x = 2 THEN 'b'
    ELSE 'c'
  END AS x
FROM
  test;

SELECT DISTINCT
  a.x
FROM
  a
  CROSS JOIN b
  JOIN c ON
    c.x = a.x
  INNER JOIN c1 ON
    c1.x = a.x
  NATURAL INNER JOIN c2 ON
    c2.x = a.x
  LEFT JOIN d ON
    d.x = a.x
  LEFT OUTER JOIN d1 ON
    d1.x = a.x
  NATURAL LEFT OUTER JOIN d2 ON
    d2.x = a.x
  RIGHT JOIN e ON
    e.x = a.x
  RIGHT OUTER JOIN e1 ON
    e1.x = a.x
  NATURAL RIGHT OUTER JOIN e2 ON
    e2.x = a.x
  FULL JOIN f ON
    f.x = a.x
  FULL OUTER JOIN f1 ON
    f1.x = a.x
  NATURAL FULL OUTER JOIN f2 ON
    f2.x = a.x
LIMIT 1 OFFSET 2
