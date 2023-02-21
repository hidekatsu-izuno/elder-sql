import { Element, Text } from "domhandler"

export default new Element("Script", {}, [
  new Element("AlterTableStatement", {}, [
    new Element("token", {"type":"Reserved","value":"ALTER"}, [new Text("ALTER")]),
    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    new Element("token", {"type":"Reserved","value":"TABLE"}, [new Text("TABLE")]),
    new Element("SchemaName", {"value":"test"}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"TEST"}, [new Text("test")]),
    ]),
    new Element("token", {"type":"Dot"}, [new Text(".")]),
    new Element("ObjectName", {"value":"sample"}, [
      new Element("token", {"type":"Identifier","value":"SAMPLE"}, [new Text("sample")]),
    ]),
    new Element("RenameToObjectClause", {}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"RENAME"}, [new Text("RENAME")]),
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Reserved","value":"TO"}, [new Text("TO")]),
      new Element("ObjectName", {"value":"new_table"}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Identifier"}, [new Text("new_table")]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("AlterTableStatement", {}, [
    new Element("token", {"type":"Reserved","value":"ALTER"}, [new Text("ALTER")]),
    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    new Element("token", {"type":"Reserved","value":"TABLE"}, [new Text("TABLE")]),
    new Element("SchemaName", {"value":"test"}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"TEST"}, [new Text("test")]),
    ]),
    new Element("token", {"type":"Dot"}, [new Text(".")]),
    new Element("ObjectName", {"value":"sample"}, [
      new Element("token", {"type":"Identifier","value":"SAMPLE"}, [new Text("sample")]),
    ]),
    new Element("RenameColumnClause", {}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"RENAME"}, [new Text("RENAME")]),
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"COLUMN"}, [new Text("COLUMN")]),
      new Element("ColumnName", {"value":"old_column"}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Identifier"}, [new Text("old_column")]),
      ]),
      new Element("RenameToColumnClause", {}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Reserved","value":"TO"}, [new Text("TO")]),
        new Element("ColumnName", {"value":"new_column"}, [
          new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Element("token", {"type":"Identifier"}, [new Text("new_column")]),
        ]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("AlterTableStatement", {}, [
    new Element("token", {"type":"Reserved","value":"ALTER"}, [new Text("ALTER")]),
    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    new Element("token", {"type":"Reserved","value":"TABLE"}, [new Text("TABLE")]),
    new Element("SchemaName", {"value":"test"}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"TEST"}, [new Text("test")]),
    ]),
    new Element("token", {"type":"Dot"}, [new Text(".")]),
    new Element("ObjectName", {"value":"sample"}, [
      new Element("token", {"type":"Identifier","value":"SAMPLE"}, [new Text("sample")]),
    ]),
    new Element("RenameColumnClause", {}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"RENAME"}, [new Text("RENAME")]),
      new Element("ColumnName", {"value":"old_column"}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Identifier"}, [new Text("old_column")]),
      ]),
      new Element("RenameToColumnClause", {}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Reserved","value":"TO"}, [new Text("TO")]),
        new Element("ColumnName", {"value":"new_column"}, [
          new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Element("token", {"type":"Identifier"}, [new Text("new_column")]),
        ]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("AlterTableStatement", {}, [
    new Element("token", {"type":"Reserved","value":"ALTER"}, [new Text("ALTER")]),
    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    new Element("token", {"type":"Reserved","value":"TABLE"}, [new Text("TABLE")]),
    new Element("SchemaName", {"value":"test"}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"TEST"}, [new Text("test")]),
    ]),
    new Element("token", {"type":"Dot"}, [new Text(".")]),
    new Element("ObjectName", {"value":"sample"}, [
      new Element("token", {"type":"Identifier","value":"SAMPLE"}, [new Text("sample")]),
    ]),
    new Element("AddColumnClause", {}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Reserved","value":"ADD"}, [new Text("ADD")]),
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"COLUMN"}, [new Text("COLUMN")]),
      new Element("TableColumn", {}, [
        new Element("ColumnName", {"value":"new_column"}, [
          new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Element("token", {"type":"Identifier"}, [new Text("new_column")]),
        ]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("AlterTableStatement", {}, [
    new Element("token", {"type":"Reserved","value":"ALTER"}, [new Text("ALTER")]),
    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    new Element("token", {"type":"Reserved","value":"TABLE"}, [new Text("TABLE")]),
    new Element("SchemaName", {"value":"test"}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"TEST"}, [new Text("test")]),
    ]),
    new Element("token", {"type":"Dot"}, [new Text(".")]),
    new Element("ObjectName", {"value":"sample"}, [
      new Element("token", {"type":"Identifier","value":"SAMPLE"}, [new Text("sample")]),
    ]),
    new Element("AddColumnClause", {}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Reserved","value":"ADD"}, [new Text("ADD")]),
      new Element("TableColumn", {}, [
        new Element("ColumnName", {"value":"new_column"}, [
          new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Element("token", {"type":"Identifier"}, [new Text("new_column")]),
        ]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("AlterTableStatement", {}, [
    new Element("token", {"type":"Reserved","value":"ALTER"}, [new Text("ALTER")]),
    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    new Element("token", {"type":"Reserved","value":"TABLE"}, [new Text("TABLE")]),
    new Element("SchemaName", {"value":"test"}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"TEST"}, [new Text("test")]),
    ]),
    new Element("token", {"type":"Dot"}, [new Text(".")]),
    new Element("ObjectName", {"value":"sample"}, [
      new Element("token", {"type":"Identifier","value":"SAMPLE"}, [new Text("sample")]),
    ]),
    new Element("AddColumnClause", {}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Reserved","value":"ADD"}, [new Text("ADD")]),
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"COLUMN"}, [new Text("COLUMN")]),
      new Element("TableColumn", {}, [
        new Element("ColumnName", {"value":"new_column"}, [
          new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Element("token", {"type":"Identifier"}, [new Text("new_column")]),
        ]),
        new Element("ColumnConstraint", {}, [
          new Element("DefaultOption", {}, [
            new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Element("token", {"type":"Reserved","value":"DEFAULT"}, [new Text("DEFAULT")]),
            new Element("Expression", {}, [
              new Element("NullLiteral", {}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Element("token", {"type":"Reserved","value":"NULL"}, [new Text("NULL")]),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("AlterTableStatement", {}, [
    new Element("token", {"type":"Reserved","value":"ALTER"}, [new Text("ALTER")]),
    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    new Element("token", {"type":"Reserved","value":"TABLE"}, [new Text("TABLE")]),
    new Element("SchemaName", {"value":"test"}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"TEST"}, [new Text("test")]),
    ]),
    new Element("token", {"type":"Dot"}, [new Text(".")]),
    new Element("ObjectName", {"value":"sample"}, [
      new Element("token", {"type":"Identifier","value":"SAMPLE"}, [new Text("sample")]),
    ]),
    new Element("AddColumnClause", {}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Reserved","value":"ADD"}, [new Text("ADD")]),
      new Element("TableColumn", {}, [
        new Element("ColumnName", {"value":"new_column"}, [
          new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Element("token", {"type":"Identifier"}, [new Text("new_column")]),
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
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("AlterTableStatement", {}, [
    new Element("token", {"type":"Reserved","value":"ALTER"}, [new Text("ALTER")]),
    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    new Element("token", {"type":"Reserved","value":"TABLE"}, [new Text("TABLE")]),
    new Element("SchemaName", {"value":"test"}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"TEST"}, [new Text("test")]),
    ]),
    new Element("token", {"type":"Dot"}, [new Text(".")]),
    new Element("ObjectName", {"value":"sample"}, [
      new Element("token", {"type":"Identifier","value":"SAMPLE"}, [new Text("sample")]),
    ]),
    new Element("AddColumnClause", {}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Reserved","value":"ADD"}, [new Text("ADD")]),
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"COLUMN"}, [new Text("COLUMN")]),
      new Element("TableColumn", {}, [
        new Element("ColumnName", {"value":"new_column"}, [
          new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Element("token", {"type":"Identifier"}, [new Text("new_column")]),
        ]),
        new Element("ColumnType", {}, [
          new Element("TypeName", {"value":"TEXT"}, [
            new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Element("token", {"type":"Identifier","value":"TEXT"}, [new Text("TEXT")]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("AlterTableStatement", {}, [
    new Element("token", {"type":"Reserved","value":"ALTER"}, [new Text("ALTER")]),
    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    new Element("token", {"type":"Reserved","value":"TABLE"}, [new Text("TABLE")]),
    new Element("SchemaName", {"value":"test"}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"TEST"}, [new Text("test")]),
    ]),
    new Element("token", {"type":"Dot"}, [new Text(".")]),
    new Element("ObjectName", {"value":"sample"}, [
      new Element("token", {"type":"Identifier","value":"SAMPLE"}, [new Text("sample")]),
    ]),
    new Element("AddColumnClause", {}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Reserved","value":"ADD"}, [new Text("ADD")]),
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"COLUMN"}, [new Text("COLUMN")]),
      new Element("TableColumn", {}, [
        new Element("ColumnName", {"value":"new_column"}, [
          new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Element("token", {"type":"Identifier"}, [new Text("new_column")]),
        ]),
        new Element("ColumnType", {}, [
          new Element("TypeName", {"value":"VARING CHARACTER"}, [
            new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Element("token", {"type":"Identifier"}, [new Text("VARING")]),
            new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Element("token", {"type":"Identifier","value":"CHARACTER"}, [new Text("CHARACTER")]),
          ]),
        ]),
        new Element("ColumnConstraint", {}, [
          new Element("GeneratedColumnOption", {}, [
            new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Element("token", {"type":"Reserved","value":"GENERATED"}, [new Text("GENERATED")]),
            new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Element("token", {"type":"Reserved","value":"ALWAYS"}, [new Text("ALWAYS")]),
            new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Element("token", {"type":"Reserved","value":"AS"}, [new Text("AS")]),
            new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Element("token", {"type":"LeftParen"}, [new Text("(")]),
            new Element("GeneratedColumn", {}, [
              new Element("Expression", {}, [
                new Element("NumericLiteral", {"value":"1"}, [
                  new Element("token", {"type":"Numeric"}, [new Text("1")]),
                ]),
              ]),
            ]),
            new Element("token", {"type":"RightParen"}, [new Text(")")]),
            new Element("StoredOption", {}, [
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"Identifier","value":"STORED"}, [new Text("STORED")]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("AlterTableStatement", {}, [
    new Element("token", {"type":"Reserved","value":"ALTER"}, [new Text("ALTER")]),
    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    new Element("token", {"type":"Reserved","value":"TABLE"}, [new Text("TABLE")]),
    new Element("SchemaName", {"value":"test"}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"TEST"}, [new Text("test")]),
    ]),
    new Element("token", {"type":"Dot"}, [new Text(".")]),
    new Element("ObjectName", {"value":"sample"}, [
      new Element("token", {"type":"Identifier","value":"SAMPLE"}, [new Text("sample")]),
    ]),
    new Element("AddColumnClause", {}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Reserved","value":"ADD"}, [new Text("ADD")]),
      new Element("TableColumn", {}, [
        new Element("ColumnName", {"value":"new_column"}, [
          new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Element("token", {"type":"Identifier"}, [new Text("new_column")]),
        ]),
        new Element("ColumnType", {}, [
          new Element("TypeName", {"value":"NUMERIC"}, [
            new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Element("token", {"type":"Identifier","value":"NUMERIC"}, [new Text("NUMERIC")]),
          ]),
          new Element("token", {"type":"LeftParen"}, [new Text("(")]),
          new Element("OptionList", {}, [
            new Element("LengthOption", {}, [
              new Element("NumericLiteral", {"value":"1"}, [
                new Element("token", {"type":"Numeric"}, [new Text("1")]),
              ]),
            ]),
            new Element("token", {"type":"Comma"}, [new Text(",")]),
            new Element("ScaleOption", {}, [
              new Element("NumericLiteral", {"value":"0"}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Element("token", {"type":"Numeric"}, [new Text("0")]),
              ]),
            ]),
          ]),
          new Element("token", {"type":"RightParen"}, [new Text(")")]),
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
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("AlterTableStatement", {}, [
    new Element("token", {"type":"Reserved","value":"ALTER"}, [new Text("ALTER")]),
    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    new Element("token", {"type":"Reserved","value":"TABLE"}, [new Text("TABLE")]),
    new Element("SchemaName", {"value":"test"}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"TEST"}, [new Text("test")]),
    ]),
    new Element("token", {"type":"Dot"}, [new Text(".")]),
    new Element("ObjectName", {"value":"sample"}, [
      new Element("token", {"type":"Identifier","value":"SAMPLE"}, [new Text("sample")]),
    ]),
    new Element("DropColumnClause", {}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"DROP"}, [new Text("DROP")]),
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"COLUMN"}, [new Text("COLUMN")]),
      new Element("ColumnName", {"value":"new_column"}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Identifier"}, [new Text("new_column")]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("AlterTableStatement", {}, [
    new Element("token", {"type":"Reserved","value":"ALTER"}, [new Text("ALTER")]),
    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    new Element("token", {"type":"Reserved","value":"TABLE"}, [new Text("TABLE")]),
    new Element("SchemaName", {"value":"test"}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"TEST"}, [new Text("test")]),
    ]),
    new Element("token", {"type":"Dot"}, [new Text(".")]),
    new Element("ObjectName", {"value":"sample"}, [
      new Element("token", {"type":"Identifier","value":"SAMPLE"}, [new Text("sample")]),
    ]),
    new Element("DropColumnClause", {}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"DROP"}, [new Text("DROP")]),
      new Element("ColumnName", {"value":"new_column"}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Identifier"}, [new Text("new_column")]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SectionBreak"}),
])
