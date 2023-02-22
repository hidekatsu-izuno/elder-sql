/* test table_1 */
CREATE TABLE test.table_1 (
  text_column TEXT NOT NULL PRIMARY KEY, -- text affinity
  num_column NUMERIC, -- numeric affinity
  int_column INTEGER, -- integer affinity
  real_column INTEGER, -- real affinity
  blob_column BLOB,   -- no affinity
  no_affinity_column  -- no affinity
);

/* test table_2 */
CREATE temp TABLE table_2 (
  "text_column" TEXT NOT NULL, /*text affinity*/
  [num_column] NUMERIC NOT NULL, /*numeric affinity*/
  `int_column` INTEGER, /*integer affinity*/
  "real_column" INTEGER, /*real affinity*/
  [blob_column] BLOB,   /*no affinity*/
  `no_affinity_column`,  /*no affinity*/
  PRIMARY KEY (text_column, num_column)
)
;
/* test table_3 */
CREATE temporary TABLE table_3 (
  col_1 TEXT,
  col_2 NUMERIC,
  CONSTRAINT c_001 UNIQUE ( col_1, col_2 )
    ON CONFLICT ROLLBACK,
  CONSTRAINT c_002 CHECK ( col_1 + col_2 > 0 ),
  CONSTRAINT c_003 FOREIGN KEY ( col_1, col_2 )
    REFERENCES table_1 (text_column, num_column)
    ON DELETE SET NULL
    MATCH SIMPLE
    ON UPDATE CASCADE
    NOT DEFERRABLE INITIALLY DEFERRED
);

CREATE VIRTUAL TABLE tablename USING modulename;
CREATE VIRTUAL TABLE temp.t1 USING csv(filename = 'thefile.csv');
CREATE VIRTUAL TABLE email USING fts5(sender, title, body);