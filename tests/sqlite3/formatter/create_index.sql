CREATE INDEX ix_sample ON sample (
  a
);

CREATE INDEX main.ix_sample ON sample (
  a,
  b,
  c
);

CREATE INDEX ix_sample ON sample (
  a,
  b ASC,
  c DESC
);

CREATE INDEX IF NOT EXISTS main.ix_sample ON sample (
  a + 1
)
WHERE
  a = 1;

CREATE UNIQUE INDEX main.ix_sample ON sample (
  a + 1 ASC,
  b + 1 DESC,
  c
);

CREATE UNIQUE INDEX IF NOT EXISTS main.ix_sample ON sample (
  a COLLATE test
)
WHERE
  a = 1;

CREATE UNIQUE INDEX IF NOT EXISTS main.ix_sample ON sample (
  a + 1 COLLATE test,
  b + 1 COLLATE test ASC
)
WHERE
  a = 1
