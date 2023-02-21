import { Element, Text } from "domhandler"

export default new Element("Script", {}, [
  new Element("CreateTableStatement", {}, [
    new Element("skip", {"type":"BlockComment"}, [new Text("/* test table_1 */")]),
    new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
    new Element("token", {"type":"Reserved","value":"CREATE"}, [new Text("CREATE")]),
    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    new Element("token", {"type":"Reserved","value":"TABLE"}, [new Text("TABLE")]),
    new Element("SchemaName", {"value":"test"}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"TEST"}, [new Text("test")]),
    ]),
    new Element("token", {"type":"Dot"}, [new Text(".")]),
    new Element("ObjectName", {"value":"table_1"}, [
      new Element("token", {"type":"Identifier"}, [new Text("table_1")]),
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    ]),
    new Element("token", {"type":"LeftParen"}, [new Text("(")]),
    new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
    new Element("TableColumnList", {}, [
      new Element("TableColumn", {}, [
        new Element("ColumnName", {"value":"text_column"}, [
          new Element("skip", {"type":"WhiteSpace"}, [new Text("  ")]),
          new Element("token", {"type":"Identifier"}, [new Text("text_column")]),
        ]),
        new Element("ColumnType", {}, [
          new Element("TypeName", {"value":"TEXT"}, [
            new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Element("token", {"type":"Identifier","value":"TEXT"}, [new Text("TEXT")]),
          ]),
        ]),
        new Element("ColumnConstraint", {}, [
          new Element("NotNullConstraint", {}, [
            new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Element("token", {"type":"Reserved","value":"NOT"}, [new Text("NOT")]),
            new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Element("token", {"type":"Reserved","value":"NULL"}, [new Text("NULL")]),
          ]),
        ]),
        new Element("ColumnConstraint", {}, [
          new Element("PrimaryKeyConstraint", {}, [
            new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Element("token", {"type":"Reserved","value":"PRIMARY"}, [new Text("PRIMARY")]),
            new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Element("token", {"type":"Identifier","value":"KEY"}, [new Text("KEY")]),
          ]),
        ]),
      ]),
      new Element("token", {"type":"Comma"}, [new Text(",")]),
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("skip", {"type":"LineComment"}, [new Text("-- text affinity")]),
      new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
      new Element("TableColumn", {}, [
        new Element("ColumnName", {"value":"num_column"}, [
          new Element("skip", {"type":"WhiteSpace"}, [new Text("  ")]),
          new Element("token", {"type":"Identifier"}, [new Text("num_column")]),
        ]),
        new Element("ColumnType", {}, [
          new Element("TypeName", {"value":"NUMERIC"}, [
            new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Element("token", {"type":"Identifier","value":"NUMERIC"}, [new Text("NUMERIC")]),
          ]),
        ]),
      ]),
      new Element("token", {"type":"Comma"}, [new Text(",")]),
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("skip", {"type":"LineComment"}, [new Text("-- numeric affinity")]),
      new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
      new Element("TableColumn", {}, [
        new Element("ColumnName", {"value":"int_column"}, [
          new Element("skip", {"type":"WhiteSpace"}, [new Text("  ")]),
          new Element("token", {"type":"Identifier"}, [new Text("int_column")]),
        ]),
        new Element("ColumnType", {}, [
          new Element("TypeName", {"value":"INTEGER"}, [
            new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Element("token", {"type":"Identifier","value":"INTEGER"}, [new Text("INTEGER")]),
          ]),
        ]),
      ]),
      new Element("token", {"type":"Comma"}, [new Text(",")]),
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("skip", {"type":"LineComment"}, [new Text("-- integer affinity")]),
      new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
      new Element("TableColumn", {}, [
        new Element("ColumnName", {"value":"real_column"}, [
          new Element("skip", {"type":"WhiteSpace"}, [new Text("  ")]),
          new Element("token", {"type":"Identifier"}, [new Text("real_column")]),
        ]),
        new Element("ColumnType", {}, [
          new Element("TypeName", {"value":"INTEGER"}, [
            new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Element("token", {"type":"Identifier","value":"INTEGER"}, [new Text("INTEGER")]),
          ]),
        ]),
      ]),
      new Element("token", {"type":"Comma"}, [new Text(",")]),
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("skip", {"type":"LineComment"}, [new Text("-- real affinity")]),
      new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
      new Element("TableColumn", {}, [
        new Element("ColumnName", {"value":"blob_column"}, [
          new Element("skip", {"type":"WhiteSpace"}, [new Text("  ")]),
          new Element("token", {"type":"Identifier"}, [new Text("blob_column")]),
        ]),
        new Element("ColumnType", {}, [
          new Element("TypeName", {"value":"BLOB"}, [
            new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Element("token", {"type":"Identifier","value":"BLOB"}, [new Text("BLOB")]),
          ]),
        ]),
      ]),
      new Element("token", {"type":"Comma"}, [new Text(",")]),
      new Element("skip", {"type":"WhiteSpace"}, [new Text("   ")]),
      new Element("skip", {"type":"LineComment"}, [new Text("-- no affinity")]),
      new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
      new Element("TableColumn", {}, [
        new Element("ColumnName", {"value":"no_affinity_column"}, [
          new Element("skip", {"type":"WhiteSpace"}, [new Text("  ")]),
          new Element("token", {"type":"Identifier"}, [new Text("no_affinity_column")]),
          new Element("skip", {"type":"WhiteSpace"}, [new Text("  ")]),
          new Element("skip", {"type":"LineComment"}, [new Text("-- no affinity")]),
          new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
        ]),
      ]),
    ]),
    new Element("token", {"type":"RightParen"}, [new Text(")")]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("CreateTableStatement", {}, [
    new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
    new Element("skip", {"type":"BlockComment"}, [new Text("/* test table_2 */")]),
    new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
    new Element("token", {"type":"Reserved","value":"CREATE"}, [new Text("CREATE")]),
    new Element("TemporaryOption", {}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"TEMP"}, [new Text("temp")]),
    ]),
    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    new Element("token", {"type":"Reserved","value":"TABLE"}, [new Text("TABLE")]),
    new Element("ObjectName", {"value":"table_2"}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier"}, [new Text("table_2")]),
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    ]),
    new Element("token", {"type":"LeftParen"}, [new Text("(")]),
    new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
    new Element("TableColumnList", {}, [
      new Element("TableColumn", {}, [
        new Element("ColumnName", {"value":"text_column"}, [
          new Element("skip", {"type":"WhiteSpace"}, [new Text("  ")]),
          new Element("token", {"type":"Identifier"}, [new Text("\"text_column\"")]),
        ]),
        new Element("ColumnType", {}, [
          new Element("TypeName", {"value":"TEXT"}, [
            new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Element("token", {"type":"Identifier","value":"TEXT"}, [new Text("TEXT")]),
          ]),
        ]),
        new Element("ColumnConstraint", {}, [
          new Element("NotNullConstraint", {}, [
            new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Element("token", {"type":"Reserved","value":"NOT"}, [new Text("NOT")]),
            new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Element("token", {"type":"Reserved","value":"NULL"}, [new Text("NULL")]),
          ]),
        ]),
      ]),
      new Element("token", {"type":"Comma"}, [new Text(",")]),
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("skip", {"type":"BlockComment"}, [new Text("/*text affinity*/")]),
      new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
      new Element("TableColumn", {}, [
        new Element("ColumnName", {"value":"num_column"}, [
          new Element("skip", {"type":"WhiteSpace"}, [new Text("  ")]),
          new Element("token", {"type":"Identifier"}, [new Text("[num_column]")]),
        ]),
        new Element("ColumnType", {}, [
          new Element("TypeName", {"value":"NUMERIC"}, [
            new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Element("token", {"type":"Identifier","value":"NUMERIC"}, [new Text("NUMERIC")]),
          ]),
        ]),
        new Element("ColumnConstraint", {}, [
          new Element("NotNullConstraint", {}, [
            new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Element("token", {"type":"Reserved","value":"NOT"}, [new Text("NOT")]),
            new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Element("token", {"type":"Reserved","value":"NULL"}, [new Text("NULL")]),
          ]),
        ]),
      ]),
      new Element("token", {"type":"Comma"}, [new Text(",")]),
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("skip", {"type":"BlockComment"}, [new Text("/*numeric affinity*/")]),
      new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
      new Element("TableColumn", {}, [
        new Element("ColumnName", {"value":"int_column"}, [
          new Element("skip", {"type":"WhiteSpace"}, [new Text("  ")]),
          new Element("token", {"type":"Identifier"}, [new Text("`int_column`")]),
        ]),
        new Element("ColumnType", {}, [
          new Element("TypeName", {"value":"INTEGER"}, [
            new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Element("token", {"type":"Identifier","value":"INTEGER"}, [new Text("INTEGER")]),
          ]),
        ]),
      ]),
      new Element("token", {"type":"Comma"}, [new Text(",")]),
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("skip", {"type":"BlockComment"}, [new Text("/*integer affinity*/")]),
      new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
      new Element("TableColumn", {}, [
        new Element("ColumnName", {"value":"real_column"}, [
          new Element("skip", {"type":"WhiteSpace"}, [new Text("  ")]),
          new Element("token", {"type":"Identifier"}, [new Text("\"real_column\"")]),
        ]),
        new Element("ColumnType", {}, [
          new Element("TypeName", {"value":"INTEGER"}, [
            new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Element("token", {"type":"Identifier","value":"INTEGER"}, [new Text("INTEGER")]),
          ]),
        ]),
      ]),
      new Element("token", {"type":"Comma"}, [new Text(",")]),
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("skip", {"type":"BlockComment"}, [new Text("/*real affinity*/")]),
      new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
      new Element("TableColumn", {}, [
        new Element("ColumnName", {"value":"blob_column"}, [
          new Element("skip", {"type":"WhiteSpace"}, [new Text("  ")]),
          new Element("token", {"type":"Identifier"}, [new Text("[blob_column]")]),
        ]),
        new Element("ColumnType", {}, [
          new Element("TypeName", {"value":"BLOB"}, [
            new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Element("token", {"type":"Identifier","value":"BLOB"}, [new Text("BLOB")]),
          ]),
        ]),
      ]),
      new Element("token", {"type":"Comma"}, [new Text(",")]),
      new Element("skip", {"type":"WhiteSpace"}, [new Text("   ")]),
      new Element("skip", {"type":"BlockComment"}, [new Text("/*no affinity*/")]),
      new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
      new Element("TableColumn", {}, [
        new Element("ColumnName", {"value":"no_affinity_column"}, [
          new Element("skip", {"type":"WhiteSpace"}, [new Text("  ")]),
          new Element("token", {"type":"Identifier"}, [new Text("`no_affinity_column`")]),
        ]),
      ]),
      new Element("token", {"type":"Comma"}, [new Text(",")]),
      new Element("skip", {"type":"WhiteSpace"}, [new Text("  ")]),
      new Element("skip", {"type":"BlockComment"}, [new Text("/*no affinity*/")]),
      new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
      new Element("TableConstraint", {}, [
        new Element("PrimaryKeyConstraint", {}, [
          new Element("skip", {"type":"WhiteSpace"}, [new Text("  ")]),
          new Element("token", {"type":"Reserved","value":"PRIMARY"}, [new Text("PRIMARY")]),
          new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Element("token", {"type":"Identifier","value":"KEY"}, [new Text("KEY")]),
          new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Element("token", {"type":"LeftParen"}, [new Text("(")]),
          new Element("SortColumnList", {}, [
            new Element("SortColumn", {}, [
              new Element("Expression", {}, [
                new Element("ColumnReference", {}, [
                  new Element("ColumnName", {"value":"text_column"}, [
                    new Element("token", {"type":"Identifier"}, [new Text("text_column")]),
                  ]),
                ]),
              ]),
            ]),
            new Element("token", {"type":"Comma"}, [new Text(",")]),
            new Element("SortColumn", {}, [
              new Element("Expression", {}, [
                new Element("ColumnReference", {}, [
                  new Element("ColumnName", {"value":"num_column"}, [
                    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                    new Element("token", {"type":"Identifier"}, [new Text("num_column")]),
                  ]),
                ]),
              ]),
            ]),
          ]),
          new Element("token", {"type":"RightParen"}, [new Text(")")]),
          new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
        ]),
      ]),
    ]),
    new Element("token", {"type":"RightParen"}, [new Text(")")]),
    new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("CreateTableStatement", {}, [
    new Element("skip", {"type":"BlockComment"}, [new Text("/* test table_3 */")]),
    new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
    new Element("token", {"type":"Reserved","value":"CREATE"}, [new Text("CREATE")]),
    new Element("TemporaryOption", {}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Reserved","value":"TEMPORARY"}, [new Text("temporary")]),
    ]),
    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    new Element("token", {"type":"Reserved","value":"TABLE"}, [new Text("TABLE")]),
    new Element("ObjectName", {"value":"table_3"}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier"}, [new Text("table_3")]),
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    ]),
    new Element("token", {"type":"LeftParen"}, [new Text("(")]),
    new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
    new Element("TableColumnList", {}, [
      new Element("TableColumn", {}, [
        new Element("ColumnName", {"value":"col_1"}, [
          new Element("skip", {"type":"WhiteSpace"}, [new Text("  ")]),
          new Element("token", {"type":"Identifier"}, [new Text("col_1")]),
        ]),
        new Element("ColumnType", {}, [
          new Element("TypeName", {"value":"TEXT"}, [
            new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Element("token", {"type":"Identifier","value":"TEXT"}, [new Text("TEXT")]),
          ]),
        ]),
      ]),
      new Element("token", {"type":"Comma"}, [new Text(",")]),
      new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
      new Element("TableColumn", {}, [
        new Element("ColumnName", {"value":"col_2"}, [
          new Element("skip", {"type":"WhiteSpace"}, [new Text("  ")]),
          new Element("token", {"type":"Identifier"}, [new Text("col_2")]),
        ]),
        new Element("ColumnType", {}, [
          new Element("TypeName", {"value":"NUMERIC"}, [
            new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Element("token", {"type":"Identifier","value":"NUMERIC"}, [new Text("NUMERIC")]),
          ]),
        ]),
      ]),
      new Element("token", {"type":"Comma"}, [new Text(",")]),
      new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
      new Element("TableConstraint", {}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text("  ")]),
        new Element("token", {"type":"Reserved","value":"CONSTRAINT"}, [new Text("CONSTRAINT")]),
        new Element("ConstraintName", {"value":"c_001"}, [
          new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Element("token", {"type":"Identifier"}, [new Text("c_001")]),
        ]),
        new Element("UniqueConstraint", {}, [
          new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Element("token", {"type":"Reserved","value":"UNIQUE"}, [new Text("UNIQUE")]),
          new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Element("token", {"type":"LeftParen"}, [new Text("(")]),
          new Element("SortColumnList", {}, [
            new Element("SortColumn", {}, [
              new Element("Expression", {}, [
                new Element("ColumnReference", {}, [
                  new Element("ColumnName", {"value":"col_1"}, [
                    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                    new Element("token", {"type":"Identifier"}, [new Text("col_1")]),
                  ]),
                ]),
              ]),
            ]),
            new Element("token", {"type":"Comma"}, [new Text(",")]),
            new Element("SortColumn", {}, [
              new Element("Expression", {}, [
                new Element("ColumnReference", {}, [
                  new Element("ColumnName", {"value":"col_2"}, [
                    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                    new Element("token", {"type":"Identifier"}, [new Text("col_2")]),
                    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                  ]),
                ]),
              ]),
            ]),
          ]),
          new Element("token", {"type":"RightParen"}, [new Text(")")]),
          new Element("OnConflictClause", {}, [
            new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Element("token", {"type":"Reserved","value":"ON"}, [new Text("ON")]),
            new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Element("token", {"type":"Identifier","value":"CONFLICT"}, [new Text("CONFLICT")]),
            new Element("RollbackOption", {}, [
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"Identifier","value":"ROLLBACK"}, [new Text("ROLLBACK")]),
            ]),
          ]),
        ]),
      ]),
      new Element("token", {"type":"Comma"}, [new Text(",")]),
      new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
      new Element("TableConstraint", {}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text("  ")]),
        new Element("token", {"type":"Reserved","value":"CONSTRAINT"}, [new Text("CONSTRAINT")]),
        new Element("ConstraintName", {"value":"c_002"}, [
          new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Element("token", {"type":"Identifier"}, [new Text("c_002")]),
        ]),
        new Element("CheckConstraint", {}, [
          new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Element("token", {"type":"Reserved","value":"CHECK"}, [new Text("CHECK")]),
          new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Element("token", {"type":"LeftParen"}, [new Text("(")]),
          new Element("Expression", {}, [
            new Element("GreaterThanOperation", {}, [
              new Element("AddOperation", {}, [
                new Element("ColumnReference", {}, [
                  new Element("ColumnName", {"value":"col_1"}, [
                    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                    new Element("token", {"type":"Identifier"}, [new Text("col_1")]),
                    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                  ]),
                ]),
                new Element("token", {"type":"Operator"}, [new Text("+")]),
                new Element("ColumnReference", {}, [
                  new Element("ColumnName", {"value":"col_2"}, [
                    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                    new Element("token", {"type":"Identifier"}, [new Text("col_2")]),
                    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                  ]),
                ]),
              ]),
              new Element("token", {"type":"Operator"}, [new Text(">")]),
              new Element("NumericLiteral", {"value":"0"}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Element("token", {"type":"Numeric"}, [new Text("0")]),
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              ]),
            ]),
          ]),
          new Element("token", {"type":"RightParen"}, [new Text(")")]),
        ]),
      ]),
      new Element("token", {"type":"Comma"}, [new Text(",")]),
      new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
      new Element("TableConstraint", {}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text("  ")]),
        new Element("token", {"type":"Reserved","value":"CONSTRAINT"}, [new Text("CONSTRAINT")]),
        new Element("ConstraintName", {"value":"c_003"}, [
          new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Element("token", {"type":"Identifier"}, [new Text("c_003")]),
        ]),
        new Element("ForeignKeyConstraint", {}, [
          new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Element("token", {"type":"Reserved","value":"FOREIGN"}, [new Text("FOREIGN")]),
          new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Element("token", {"type":"Identifier","value":"KEY"}, [new Text("KEY")]),
          new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Element("token", {"type":"LeftParen"}, [new Text("(")]),
          new Element("ColumnList", {}, [
            new Element("ColumnName", {"value":"col_1"}, [
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"Identifier"}, [new Text("col_1")]),
            ]),
            new Element("token", {"type":"Comma"}, [new Text(",")]),
            new Element("ColumnName", {"value":"col_2"}, [
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"Identifier"}, [new Text("col_2")]),
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            ]),
          ]),
          new Element("token", {"type":"RightParen"}, [new Text(")")]),
          new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
          new Element("ReferencesClause", {}, [
            new Element("skip", {"type":"WhiteSpace"}, [new Text("    ")]),
            new Element("token", {"type":"Reserved","value":"REFERENCES"}, [new Text("REFERENCES")]),
            new Element("ObjectName", {"value":"table_1"}, [
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"Identifier"}, [new Text("table_1")]),
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            ]),
            new Element("token", {"type":"LeftParen"}, [new Text("(")]),
            new Element("ColumnList", {}, [
              new Element("ColumnName", {"value":"text_column"}, [
                new Element("token", {"type":"Identifier"}, [new Text("text_column")]),
              ]),
              new Element("token", {"type":"Comma"}, [new Text(",")]),
              new Element("ColumnName", {"value":"num_column"}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Element("token", {"type":"Identifier"}, [new Text("num_column")]),
              ]),
            ]),
            new Element("token", {"type":"RightParen"}, [new Text(")")]),
            new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
            new Element("OnDeleteClause", {}, [
              new Element("skip", {"type":"WhiteSpace"}, [new Text("    ")]),
              new Element("token", {"type":"Reserved","value":"ON"}, [new Text("ON")]),
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"Reserved","value":"DELETE"}, [new Text("DELETE")]),
              new Element("SetNullOption", {}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Element("token", {"type":"Reserved","value":"SET"}, [new Text("SET")]),
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Element("token", {"type":"Reserved","value":"NULL"}, [new Text("NULL")]),
                new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
              ]),
            ]),
            new Element("MatchSimpleOption", {}, [
              new Element("skip", {"type":"WhiteSpace"}, [new Text("    ")]),
              new Element("token", {"type":"Identifier","value":"MATCH"}, [new Text("MATCH")]),
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"Identifier","value":"SIMPLE"}, [new Text("SIMPLE")]),
              new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
            ]),
            new Element("OnUpdateClause", {}, [
              new Element("skip", {"type":"WhiteSpace"}, [new Text("    ")]),
              new Element("token", {"type":"Reserved","value":"ON"}, [new Text("ON")]),
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"Reserved","value":"UPDATE"}, [new Text("UPDATE")]),
              new Element("CascadeOption", {}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Element("token", {"type":"Identifier","value":"CASCADE"}, [new Text("CASCADE")]),
                new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
              ]),
            ]),
            new Element("NotDeferrableOption", {}, [
              new Element("skip", {"type":"WhiteSpace"}, [new Text("    ")]),
              new Element("token", {"type":"Reserved","value":"NOT"}, [new Text("NOT")]),
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"Reserved","value":"DEFERRABLE"}, [new Text("DEFERRABLE")]),
              new Element("InitiallyDeferredOption", {}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Element("token", {"type":"Identifier","value":"INITIALLY"}, [new Text("INITIALLY")]),
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Element("token", {"type":"Identifier","value":"DEFERRED"}, [new Text("DEFERRED")]),
                new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
    new Element("token", {"type":"RightParen"}, [new Text(")")]),
    new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  ]),
  new Element("CreateTableStatement", {}, [
    new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
    new Element("token", {"type":"Reserved","value":"CREATE"}, [new Text("CREATE")]),
    new Element("VirtualOption", {}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"VIRTUAL"}, [new Text("VIRTUAL")]),
    ]),
    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    new Element("token", {"type":"Reserved","value":"TABLE"}, [new Text("TABLE")]),
    new Element("ObjectName", {"value":"tablename"}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier"}, [new Text("tablename")]),
    ]),
    new Element("UsingModuleClause", {}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Reserved","value":"USING"}, [new Text("USING")]),
      new Element("ModuleName", {"value":"modulename"}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Identifier"}, [new Text("modulename")]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("CreateTableStatement", {}, [
    new Element("token", {"type":"Reserved","value":"CREATE"}, [new Text("CREATE")]),
    new Element("VirtualOption", {}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"VIRTUAL"}, [new Text("VIRTUAL")]),
    ]),
    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    new Element("token", {"type":"Reserved","value":"TABLE"}, [new Text("TABLE")]),
    new Element("SchemaName", {"value":"temp"}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"TEMP"}, [new Text("temp")]),
    ]),
    new Element("token", {"type":"Dot"}, [new Text(".")]),
    new Element("ObjectName", {"value":"t1"}, [
      new Element("token", {"type":"Identifier"}, [new Text("t1")]),
    ]),
    new Element("UsingModuleClause", {}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Reserved","value":"USING"}, [new Text("USING")]),
      new Element("ModuleName", {"value":"csv"}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Identifier"}, [new Text("csv")]),
      ]),
      new Element("token", {"type":"LeftParen"}, [new Text("(")]),
      new Element("ModuleArgumentList", {}, [
        new Element("ModuleArgument", {}, [
          new Element("token", {"type":"Identifier"}, [new Text("filename")]),
          new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Element("token", {"type":"Operator"}, [new Text("=")]),
          new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Element("token", {"type":"String"}, [new Text("'thefile.csv'")]),
        ]),
      ]),
      new Element("token", {"type":"RightParen"}, [new Text(")")]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("CreateTableStatement", {}, [
    new Element("token", {"type":"Reserved","value":"CREATE"}, [new Text("CREATE")]),
    new Element("VirtualOption", {}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"VIRTUAL"}, [new Text("VIRTUAL")]),
    ]),
    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    new Element("token", {"type":"Reserved","value":"TABLE"}, [new Text("TABLE")]),
    new Element("ObjectName", {"value":"email"}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier"}, [new Text("email")]),
    ]),
    new Element("UsingModuleClause", {}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Reserved","value":"USING"}, [new Text("USING")]),
      new Element("ModuleName", {"value":"fts5"}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Identifier"}, [new Text("fts5")]),
      ]),
      new Element("token", {"type":"LeftParen"}, [new Text("(")]),
      new Element("ModuleArgumentList", {}, [
        new Element("ModuleArgument", {}, [
          new Element("token", {"type":"Identifier"}, [new Text("sender")]),
        ]),
        new Element("token", {"type":"Comma"}, [new Text(",")]),
        new Element("ModuleArgument", {}, [
          new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Element("token", {"type":"Identifier"}, [new Text("title")]),
        ]),
        new Element("token", {"type":"Comma"}, [new Text(",")]),
        new Element("ModuleArgument", {}, [
          new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Element("token", {"type":"Identifier","value":"BODY"}, [new Text("body")]),
        ]),
      ]),
      new Element("token", {"type":"RightParen"}, [new Text(")")]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
])
