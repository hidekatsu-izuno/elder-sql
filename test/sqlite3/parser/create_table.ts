import { Element, Text } from "domhandler"

export default new Element("Script", {}, [
  new Element("CreateTableStatement", {}, [
    new Element("BlockComment", {"skip":"true"}, [new Text("/* test table_1 */")]),
    new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
    new Element("Reserved", {"value":"CREATE"}, [new Text("CREATE")]),
    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
    new Element("Reserved", {"value":"TABLE"}, [new Text("TABLE")]),
    new Element("SchemaName", {"value":"test"}, [
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Identifier", {"value":"TEST"}, [new Text("test")]),
    ]),
    new Element("Dot", {}, [new Text(".")]),
    new Element("ObjectName", {"value":"table_1"}, [
      new Element("Identifier", {}, [new Text("table_1")]),
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
    ]),
    new Element("LeftParen", {}, [new Text("(")]),
    new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
    new Element("TableColumnList", {}, [
      new Element("TableColumn", {}, [
        new Element("ColumnName", {"value":"text_column"}, [
          new Element("WhiteSpace", {"skip":"true"}, [new Text("  ")]),
          new Element("Identifier", {}, [new Text("text_column")]),
        ]),
        new Element("ColumnType", {}, [
          new Element("TypeName", {"value":"TEXT"}, [
            new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
            new Element("Identifier", {"value":"TEXT"}, [new Text("TEXT")]),
          ]),
        ]),
        new Element("ColumnConstraint", {}, [
          new Element("NotNullConstraint", {}, [
            new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
            new Element("Reserved", {"value":"NOT"}, [new Text("NOT")]),
            new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
            new Element("Reserved", {"value":"NULL"}, [new Text("NULL")]),
          ]),
        ]),
        new Element("ColumnConstraint", {}, [
          new Element("PrimaryKeyConstraint", {}, [
            new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
            new Element("Reserved", {"value":"PRIMARY"}, [new Text("PRIMARY")]),
            new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
            new Element("Identifier", {"value":"KEY"}, [new Text("KEY")]),
          ]),
        ]),
      ]),
      new Element("Comma", {}, [new Text(",")]),
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("LineComment", {"skip":"true"}, [new Text("-- text affinity")]),
      new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
      new Element("TableColumn", {}, [
        new Element("ColumnName", {"value":"num_column"}, [
          new Element("WhiteSpace", {"skip":"true"}, [new Text("  ")]),
          new Element("Identifier", {}, [new Text("num_column")]),
        ]),
        new Element("ColumnType", {}, [
          new Element("TypeName", {"value":"NUMERIC"}, [
            new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
            new Element("Identifier", {"value":"NUMERIC"}, [new Text("NUMERIC")]),
          ]),
        ]),
      ]),
      new Element("Comma", {}, [new Text(",")]),
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("LineComment", {"skip":"true"}, [new Text("-- numeric affinity")]),
      new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
      new Element("TableColumn", {}, [
        new Element("ColumnName", {"value":"int_column"}, [
          new Element("WhiteSpace", {"skip":"true"}, [new Text("  ")]),
          new Element("Identifier", {}, [new Text("int_column")]),
        ]),
        new Element("ColumnType", {}, [
          new Element("TypeName", {"value":"INTEGER"}, [
            new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
            new Element("Identifier", {"value":"INTEGER"}, [new Text("INTEGER")]),
          ]),
        ]),
      ]),
      new Element("Comma", {}, [new Text(",")]),
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("LineComment", {"skip":"true"}, [new Text("-- integer affinity")]),
      new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
      new Element("TableColumn", {}, [
        new Element("ColumnName", {"value":"real_column"}, [
          new Element("WhiteSpace", {"skip":"true"}, [new Text("  ")]),
          new Element("Identifier", {}, [new Text("real_column")]),
        ]),
        new Element("ColumnType", {}, [
          new Element("TypeName", {"value":"INTEGER"}, [
            new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
            new Element("Identifier", {"value":"INTEGER"}, [new Text("INTEGER")]),
          ]),
        ]),
      ]),
      new Element("Comma", {}, [new Text(",")]),
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("LineComment", {"skip":"true"}, [new Text("-- real affinity")]),
      new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
      new Element("TableColumn", {}, [
        new Element("ColumnName", {"value":"blob_column"}, [
          new Element("WhiteSpace", {"skip":"true"}, [new Text("  ")]),
          new Element("Identifier", {}, [new Text("blob_column")]),
        ]),
        new Element("ColumnType", {}, [
          new Element("TypeName", {"value":"BLOB"}, [
            new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
            new Element("Identifier", {"value":"BLOB"}, [new Text("BLOB")]),
          ]),
        ]),
      ]),
      new Element("Comma", {}, [new Text(",")]),
      new Element("WhiteSpace", {"skip":"true"}, [new Text("   ")]),
      new Element("LineComment", {"skip":"true"}, [new Text("-- no affinity")]),
      new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
      new Element("TableColumn", {}, [
        new Element("ColumnName", {"value":"no_affinity_column"}, [
          new Element("WhiteSpace", {"skip":"true"}, [new Text("  ")]),
          new Element("Identifier", {}, [new Text("no_affinity_column")]),
          new Element("WhiteSpace", {"skip":"true"}, [new Text("  ")]),
          new Element("LineComment", {"skip":"true"}, [new Text("-- no affinity")]),
          new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
        ]),
      ]),
    ]),
    new Element("RightParen", {}, [new Text(")")]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
  new Element("CreateTableStatement", {}, [
    new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
    new Element("BlockComment", {"skip":"true"}, [new Text("/* test table_2 */")]),
    new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
    new Element("Reserved", {"value":"CREATE"}, [new Text("CREATE")]),
    new Element("TemporaryOption", {}, [
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Identifier", {"value":"TEMP"}, [new Text("temp")]),
    ]),
    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
    new Element("Reserved", {"value":"TABLE"}, [new Text("TABLE")]),
    new Element("ObjectName", {"value":"table_2"}, [
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Identifier", {}, [new Text("table_2")]),
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
    ]),
    new Element("LeftParen", {}, [new Text("(")]),
    new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
    new Element("TableColumnList", {}, [
      new Element("TableColumn", {}, [
        new Element("ColumnName", {"value":"text_column"}, [
          new Element("WhiteSpace", {"skip":"true"}, [new Text("  ")]),
          new Element("Identifier", {}, [new Text("\"text_column\"")]),
        ]),
        new Element("ColumnType", {}, [
          new Element("TypeName", {"value":"TEXT"}, [
            new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
            new Element("Identifier", {"value":"TEXT"}, [new Text("TEXT")]),
          ]),
        ]),
        new Element("ColumnConstraint", {}, [
          new Element("NotNullConstraint", {}, [
            new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
            new Element("Reserved", {"value":"NOT"}, [new Text("NOT")]),
            new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
            new Element("Reserved", {"value":"NULL"}, [new Text("NULL")]),
          ]),
        ]),
      ]),
      new Element("Comma", {}, [new Text(",")]),
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("BlockComment", {"skip":"true"}, [new Text("/*text affinity*/")]),
      new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
      new Element("TableColumn", {}, [
        new Element("ColumnName", {"value":"num_column"}, [
          new Element("WhiteSpace", {"skip":"true"}, [new Text("  ")]),
          new Element("Identifier", {}, [new Text("[num_column]")]),
        ]),
        new Element("ColumnType", {}, [
          new Element("TypeName", {"value":"NUMERIC"}, [
            new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
            new Element("Identifier", {"value":"NUMERIC"}, [new Text("NUMERIC")]),
          ]),
        ]),
        new Element("ColumnConstraint", {}, [
          new Element("NotNullConstraint", {}, [
            new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
            new Element("Reserved", {"value":"NOT"}, [new Text("NOT")]),
            new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
            new Element("Reserved", {"value":"NULL"}, [new Text("NULL")]),
          ]),
        ]),
      ]),
      new Element("Comma", {}, [new Text(",")]),
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("BlockComment", {"skip":"true"}, [new Text("/*numeric affinity*/")]),
      new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
      new Element("TableColumn", {}, [
        new Element("ColumnName", {"value":"int_column"}, [
          new Element("WhiteSpace", {"skip":"true"}, [new Text("  ")]),
          new Element("Identifier", {}, [new Text("`int_column`")]),
        ]),
        new Element("ColumnType", {}, [
          new Element("TypeName", {"value":"INTEGER"}, [
            new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
            new Element("Identifier", {"value":"INTEGER"}, [new Text("INTEGER")]),
          ]),
        ]),
      ]),
      new Element("Comma", {}, [new Text(",")]),
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("BlockComment", {"skip":"true"}, [new Text("/*integer affinity*/")]),
      new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
      new Element("TableColumn", {}, [
        new Element("ColumnName", {"value":"real_column"}, [
          new Element("WhiteSpace", {"skip":"true"}, [new Text("  ")]),
          new Element("Identifier", {}, [new Text("\"real_column\"")]),
        ]),
        new Element("ColumnType", {}, [
          new Element("TypeName", {"value":"INTEGER"}, [
            new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
            new Element("Identifier", {"value":"INTEGER"}, [new Text("INTEGER")]),
          ]),
        ]),
      ]),
      new Element("Comma", {}, [new Text(",")]),
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("BlockComment", {"skip":"true"}, [new Text("/*real affinity*/")]),
      new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
      new Element("TableColumn", {}, [
        new Element("ColumnName", {"value":"blob_column"}, [
          new Element("WhiteSpace", {"skip":"true"}, [new Text("  ")]),
          new Element("Identifier", {}, [new Text("[blob_column]")]),
        ]),
        new Element("ColumnType", {}, [
          new Element("TypeName", {"value":"BLOB"}, [
            new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
            new Element("Identifier", {"value":"BLOB"}, [new Text("BLOB")]),
          ]),
        ]),
      ]),
      new Element("Comma", {}, [new Text(",")]),
      new Element("WhiteSpace", {"skip":"true"}, [new Text("   ")]),
      new Element("BlockComment", {"skip":"true"}, [new Text("/*no affinity*/")]),
      new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
      new Element("TableColumn", {}, [
        new Element("ColumnName", {"value":"no_affinity_column"}, [
          new Element("WhiteSpace", {"skip":"true"}, [new Text("  ")]),
          new Element("Identifier", {}, [new Text("`no_affinity_column`")]),
        ]),
      ]),
      new Element("Comma", {}, [new Text(",")]),
      new Element("WhiteSpace", {"skip":"true"}, [new Text("  ")]),
      new Element("BlockComment", {"skip":"true"}, [new Text("/*no affinity*/")]),
      new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
      new Element("TableConstraint", {}, [
        new Element("PrimaryKeyConstraint", {}, [
          new Element("WhiteSpace", {"skip":"true"}, [new Text("  ")]),
          new Element("Reserved", {"value":"PRIMARY"}, [new Text("PRIMARY")]),
          new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
          new Element("Identifier", {"value":"KEY"}, [new Text("KEY")]),
          new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
          new Element("LeftParen", {}, [new Text("(")]),
          new Element("SortColumnList", {}, [
            new Element("SortColumn", {}, [
              new Element("Expression", {}, [
                new Element("ColumnReference", {}, [
                  new Element("ColumnName", {"value":"text_column"}, [
                    new Element("Identifier", {}, [new Text("text_column")]),
                  ]),
                ]),
              ]),
            ]),
            new Element("Comma", {}, [new Text(",")]),
            new Element("SortColumn", {}, [
              new Element("Expression", {}, [
                new Element("ColumnReference", {}, [
                  new Element("ColumnName", {"value":"num_column"}, [
                    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                    new Element("Identifier", {}, [new Text("num_column")]),
                  ]),
                ]),
              ]),
            ]),
          ]),
          new Element("RightParen", {}, [new Text(")")]),
          new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
        ]),
      ]),
    ]),
    new Element("RightParen", {}, [new Text(")")]),
    new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
  new Element("CreateTableStatement", {}, [
    new Element("BlockComment", {"skip":"true"}, [new Text("/* test table_3 */")]),
    new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
    new Element("Reserved", {"value":"CREATE"}, [new Text("CREATE")]),
    new Element("TemporaryOption", {}, [
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Reserved", {"value":"TEMPORARY"}, [new Text("temporary")]),
    ]),
    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
    new Element("Reserved", {"value":"TABLE"}, [new Text("TABLE")]),
    new Element("ObjectName", {"value":"table_3"}, [
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Identifier", {}, [new Text("table_3")]),
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
    ]),
    new Element("LeftParen", {}, [new Text("(")]),
    new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
    new Element("TableColumnList", {}, [
      new Element("TableColumn", {}, [
        new Element("ColumnName", {"value":"col_1"}, [
          new Element("WhiteSpace", {"skip":"true"}, [new Text("  ")]),
          new Element("Identifier", {}, [new Text("col_1")]),
        ]),
        new Element("ColumnType", {}, [
          new Element("TypeName", {"value":"TEXT"}, [
            new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
            new Element("Identifier", {"value":"TEXT"}, [new Text("TEXT")]),
          ]),
        ]),
      ]),
      new Element("Comma", {}, [new Text(",")]),
      new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
      new Element("TableColumn", {}, [
        new Element("ColumnName", {"value":"col_2"}, [
          new Element("WhiteSpace", {"skip":"true"}, [new Text("  ")]),
          new Element("Identifier", {}, [new Text("col_2")]),
        ]),
        new Element("ColumnType", {}, [
          new Element("TypeName", {"value":"NUMERIC"}, [
            new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
            new Element("Identifier", {"value":"NUMERIC"}, [new Text("NUMERIC")]),
          ]),
        ]),
      ]),
      new Element("Comma", {}, [new Text(",")]),
      new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
      new Element("TableConstraint", {}, [
        new Element("WhiteSpace", {"skip":"true"}, [new Text("  ")]),
        new Element("Reserved", {"value":"CONSTRAINT"}, [new Text("CONSTRAINT")]),
        new Element("ConstraintName", {"value":"c_001"}, [
          new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
          new Element("Identifier", {}, [new Text("c_001")]),
        ]),
        new Element("UniqueConstraint", {}, [
          new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
          new Element("Reserved", {"value":"UNIQUE"}, [new Text("UNIQUE")]),
          new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
          new Element("LeftParen", {}, [new Text("(")]),
          new Element("SortColumnList", {}, [
            new Element("SortColumn", {}, [
              new Element("Expression", {}, [
                new Element("ColumnReference", {}, [
                  new Element("ColumnName", {"value":"col_1"}, [
                    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                    new Element("Identifier", {}, [new Text("col_1")]),
                  ]),
                ]),
              ]),
            ]),
            new Element("Comma", {}, [new Text(",")]),
            new Element("SortColumn", {}, [
              new Element("Expression", {}, [
                new Element("ColumnReference", {}, [
                  new Element("ColumnName", {"value":"col_2"}, [
                    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                    new Element("Identifier", {}, [new Text("col_2")]),
                    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                  ]),
                ]),
              ]),
            ]),
          ]),
          new Element("RightParen", {}, [new Text(")")]),
          new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
          new Element("OnConflictClause", {}, [
            new Element("WhiteSpace", {"skip":"true"}, [new Text("    ")]),
            new Element("Reserved", {"value":"ON"}, [new Text("ON")]),
            new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
            new Element("Identifier", {"value":"CONFLICT"}, [new Text("CONFLICT")]),
            new Element("RollbackOption", {}, [
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Identifier", {"value":"ROLLBACK"}, [new Text("ROLLBACK")]),
            ]),
          ]),
        ]),
      ]),
      new Element("Comma", {}, [new Text(",")]),
      new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
      new Element("TableConstraint", {}, [
        new Element("WhiteSpace", {"skip":"true"}, [new Text("  ")]),
        new Element("Reserved", {"value":"CONSTRAINT"}, [new Text("CONSTRAINT")]),
        new Element("ConstraintName", {"value":"c_002"}, [
          new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
          new Element("Identifier", {}, [new Text("c_002")]),
        ]),
        new Element("CheckConstraint", {}, [
          new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
          new Element("Reserved", {"value":"CHECK"}, [new Text("CHECK")]),
          new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
          new Element("LeftParen", {}, [new Text("(")]),
          new Element("Expression", {}, [
            new Element("GreaterThanOperation", {}, [
              new Element("AddOperation", {}, [
                new Element("ColumnReference", {}, [
                  new Element("ColumnName", {"value":"col_1"}, [
                    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                    new Element("Identifier", {}, [new Text("col_1")]),
                    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                  ]),
                ]),
                new Element("Operator", {}, [new Text("+")]),
                new Element("ColumnReference", {}, [
                  new Element("ColumnName", {"value":"col_2"}, [
                    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                    new Element("Identifier", {}, [new Text("col_2")]),
                    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                  ]),
                ]),
              ]),
              new Element("Operator", {}, [new Text(">")]),
              new Element("NumericLiteral", {"value":"0"}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                new Element("Numeric", {}, [new Text("0")]),
                new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              ]),
            ]),
          ]),
          new Element("RightParen", {}, [new Text(")")]),
        ]),
      ]),
      new Element("Comma", {}, [new Text(",")]),
      new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
      new Element("TableConstraint", {}, [
        new Element("WhiteSpace", {"skip":"true"}, [new Text("  ")]),
        new Element("Reserved", {"value":"CONSTRAINT"}, [new Text("CONSTRAINT")]),
        new Element("ConstraintName", {"value":"c_003"}, [
          new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
          new Element("Identifier", {}, [new Text("c_003")]),
        ]),
        new Element("ForeignKeyConstraint", {}, [
          new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
          new Element("Reserved", {"value":"FOREIGN"}, [new Text("FOREIGN")]),
          new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
          new Element("Identifier", {"value":"KEY"}, [new Text("KEY")]),
          new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
          new Element("LeftParen", {}, [new Text("(")]),
          new Element("ColumnList", {}, [
            new Element("ColumnName", {"value":"col_1"}, [
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Identifier", {}, [new Text("col_1")]),
            ]),
            new Element("Comma", {}, [new Text(",")]),
            new Element("ColumnName", {"value":"col_2"}, [
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Identifier", {}, [new Text("col_2")]),
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
            ]),
          ]),
          new Element("RightParen", {}, [new Text(")")]),
          new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
          new Element("ReferencesClause", {}, [
            new Element("WhiteSpace", {"skip":"true"}, [new Text("    ")]),
            new Element("Reserved", {"value":"REFERENCES"}, [new Text("REFERENCES")]),
            new Element("ObjectName", {"value":"table_1"}, [
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Identifier", {}, [new Text("table_1")]),
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
            ]),
            new Element("LeftParen", {}, [new Text("(")]),
            new Element("ColumnList", {}, [
              new Element("ColumnName", {"value":"text_column"}, [
                new Element("Identifier", {}, [new Text("text_column")]),
              ]),
              new Element("Comma", {}, [new Text(",")]),
              new Element("ColumnName", {"value":"num_column"}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                new Element("Identifier", {}, [new Text("num_column")]),
              ]),
            ]),
            new Element("RightParen", {}, [new Text(")")]),
            new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
            new Element("ReferencesOptionList", {}, [
              new Element("OnDeleteClause", {}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text("    ")]),
                new Element("Reserved", {"value":"ON"}, [new Text("ON")]),
                new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                new Element("Reserved", {"value":"DELETE"}, [new Text("DELETE")]),
                new Element("SetNullOption", {}, [
                  new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                  new Element("Reserved", {"value":"SET"}, [new Text("SET")]),
                  new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                  new Element("Reserved", {"value":"NULL"}, [new Text("NULL")]),
                  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
                ]),
              ]),
              new Element("MatchSimpleOption", {}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text("    ")]),
                new Element("Identifier", {"value":"MATCH"}, [new Text("MATCH")]),
                new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                new Element("Identifier", {"value":"SIMPLE"}, [new Text("SIMPLE")]),
                new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
              ]),
              new Element("OnUpdateClause", {}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text("    ")]),
                new Element("Reserved", {"value":"ON"}, [new Text("ON")]),
                new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                new Element("Reserved", {"value":"UPDATE"}, [new Text("UPDATE")]),
                new Element("CascadeOption", {}, [
                  new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                  new Element("Identifier", {"value":"CASCADE"}, [new Text("CASCADE")]),
                  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
                ]),
              ]),
              new Element("NotDeferrableOption", {}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text("    ")]),
                new Element("Reserved", {"value":"NOT"}, [new Text("NOT")]),
                new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                new Element("Reserved", {"value":"DEFERRABLE"}, [new Text("DEFERRABLE")]),
                new Element("InitiallyDeferredOption", {}, [
                  new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                  new Element("Identifier", {"value":"INITIALLY"}, [new Text("INITIALLY")]),
                  new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                  new Element("Identifier", {"value":"DEFERRED"}, [new Text("DEFERRED")]),
                  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
                ]),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
    new Element("RightParen", {}, [new Text(")")]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
  new Element("CreateTableStatement", {}, [
    new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
    new Element("Reserved", {"value":"CREATE"}, [new Text("CREATE")]),
    new Element("VirtualOption", {}, [
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Identifier", {"value":"VIRTUAL"}, [new Text("VIRTUAL")]),
    ]),
    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
    new Element("Reserved", {"value":"TABLE"}, [new Text("TABLE")]),
    new Element("ObjectName", {"value":"tablename"}, [
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Identifier", {}, [new Text("tablename")]),
    ]),
    new Element("UsingModuleClause", {}, [
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Reserved", {"value":"USING"}, [new Text("USING")]),
      new Element("ModuleName", {"value":"modulename"}, [
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("Identifier", {}, [new Text("modulename")]),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
  new Element("CreateTableStatement", {}, [
    new Element("Reserved", {"value":"CREATE"}, [new Text("CREATE")]),
    new Element("VirtualOption", {}, [
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Identifier", {"value":"VIRTUAL"}, [new Text("VIRTUAL")]),
    ]),
    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
    new Element("Reserved", {"value":"TABLE"}, [new Text("TABLE")]),
    new Element("SchemaName", {"value":"temp"}, [
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Identifier", {"value":"TEMP"}, [new Text("temp")]),
    ]),
    new Element("Dot", {}, [new Text(".")]),
    new Element("ObjectName", {"value":"t1"}, [
      new Element("Identifier", {}, [new Text("t1")]),
    ]),
    new Element("UsingModuleClause", {}, [
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Reserved", {"value":"USING"}, [new Text("USING")]),
      new Element("ModuleName", {"value":"csv"}, [
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("Identifier", {}, [new Text("csv")]),
      ]),
      new Element("LeftParen", {}, [new Text("(")]),
      new Element("ModuleArgumentList", {}, [
        new Element("ModuleArgument", {}, [
          new Element("Identifier", {}, [new Text("filename")]),
          new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
          new Element("Operator", {}, [new Text("=")]),
          new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
          new Element("String", {}, [new Text("'thefile.csv'")]),
        ]),
      ]),
      new Element("RightParen", {}, [new Text(")")]),
    ]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
  new Element("CreateTableStatement", {}, [
    new Element("Reserved", {"value":"CREATE"}, [new Text("CREATE")]),
    new Element("VirtualOption", {}, [
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Identifier", {"value":"VIRTUAL"}, [new Text("VIRTUAL")]),
    ]),
    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
    new Element("Reserved", {"value":"TABLE"}, [new Text("TABLE")]),
    new Element("ObjectName", {"value":"email"}, [
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Identifier", {}, [new Text("email")]),
    ]),
    new Element("UsingModuleClause", {}, [
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Reserved", {"value":"USING"}, [new Text("USING")]),
      new Element("ModuleName", {"value":"fts5"}, [
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("Identifier", {}, [new Text("fts5")]),
      ]),
      new Element("LeftParen", {}, [new Text("(")]),
      new Element("ModuleArgumentList", {}, [
        new Element("ModuleArgument", {}, [
          new Element("Identifier", {}, [new Text("sender")]),
        ]),
        new Element("Comma", {}, [new Text(",")]),
        new Element("ModuleArgument", {}, [
          new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
          new Element("Identifier", {}, [new Text("title")]),
        ]),
        new Element("Comma", {}, [new Text(",")]),
        new Element("ModuleArgument", {}, [
          new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
          new Element("Identifier", {"value":"BODY"}, [new Text("body")]),
        ]),
      ]),
      new Element("RightParen", {}, [new Text(")")]),
    ]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
])
