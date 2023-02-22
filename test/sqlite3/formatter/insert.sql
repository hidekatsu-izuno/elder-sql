INSERT INTO sample
VALUES (
  1
);

INSERT INTO main.sample
VALUES (
  1,
  '2',
  NULL
);

INSERT OR ABORT INTO main.sample (
  a
) VALUES (
  1
);

INSERT OR FAIL INTO sample AS sample2 (
  a,
  b
) VALUES (
  1,
  "2"
);

INSERT OR IGNORE INTO main.sample AS sample2 (
  a,
  b,
  c
) VALUES (
  1,
  "2",
  TRUE,
    (
      1,
      '2',
      FALSE
    )
  );

INSERT OR REPLACE INTO sample
VALUES (
  1,
  "2",
  NULL,
  (
    1,
    '2',
    TRUE
  ),
  (
    1,
    "2",
    FALSE
  )
);

INSERT OR ROLLBACK INTO main.sample
SELECT
  1;

INSERT INTO sample
  DEFAULT VALUES;

INSERT INTO main.sample
SELECT
  1
FROM
  sample2;

REPLACE INTO main.sample (
  a
) VALUES (
  1
);

WITH X AS (
  SELECT
    1 AS Y
)
INSERT INTO main.sample
SELECT
  Y
FROM
  X;

INSERT INTO main.sample
WITH X AS (
  SELECT
    1 AS Y
) SELECT
  Y
FROM
  X;

INSERT INTO main.sample
VALUES (
  1,
  '2',
  NULL
)
RETURNING
  *;

INSERT INTO main.sample
SELECT
  Y
FROM
  X
RETURNING
  Y,
  1 AS Z;

INSERT INTO sample
  DEFAULT VALUES
RETURNING
  1 AS Z,
  *;
