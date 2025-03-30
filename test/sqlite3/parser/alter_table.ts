import { Element, Text } from "domhandler"

export default new Element("node", {"type":"Script"}, [
  new Element("node", {"type":"AlterTableStatement"}, [
    new Element("token", {"type":"Reserved","value":"ALTER"}, [new Text("ALTER")]),
    new Element("token", {"type":"Reserved","value":"TABLE"}, [
      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Text("TABLE"),
    ]),
    new Element("node", {"type":"SchemaName","value":"test"}, [
      new Element("token", {"type":"Identifier","value":"TEST"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("test"),
      ]),
    ]),
    new Element("token", {"type":"Dot"}, [new Text(".")]),
    new Element("node", {"type":"ObjectName","value":"sample"}, [
      new Element("token", {"type":"Identifier","value":"SAMPLE"}, [new Text("sample")]),
    ]),
    new Element("node", {"type":"RenameToObjectClause"}, [
      new Element("token", {"type":"Identifier","value":"RENAME"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("RENAME"),
      ]),
      new Element("token", {"type":"Reserved","value":"TO"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("TO"),
      ]),
      new Element("node", {"type":"ObjectName","value":"new_table"}, [
        new Element("token", {"type":"Identifier"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("new_table"),
        ]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [
    new Text(";"),
    new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
  ]),
  new Element("node", {"type":"AlterTableStatement"}, [
    new Element("token", {"type":"Reserved","value":"ALTER"}, [new Text("ALTER")]),
    new Element("token", {"type":"Reserved","value":"TABLE"}, [
      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Text("TABLE"),
    ]),
    new Element("node", {"type":"SchemaName","value":"test"}, [
      new Element("token", {"type":"Identifier","value":"TEST"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("test"),
      ]),
    ]),
    new Element("token", {"type":"Dot"}, [new Text(".")]),
    new Element("node", {"type":"ObjectName","value":"sample"}, [
      new Element("token", {"type":"Identifier","value":"SAMPLE"}, [new Text("sample")]),
    ]),
    new Element("node", {"type":"RenameColumnClause"}, [
      new Element("token", {"type":"Identifier","value":"RENAME"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("RENAME"),
      ]),
      new Element("token", {"type":"Identifier","value":"COLUMN"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("COLUMN"),
      ]),
      new Element("node", {"type":"ColumnName","value":"old_column"}, [
        new Element("token", {"type":"Identifier"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("old_column"),
        ]),
      ]),
      new Element("node", {"type":"RenameToColumnClause"}, [
        new Element("token", {"type":"Reserved","value":"TO"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("TO"),
        ]),
        new Element("node", {"type":"ColumnName","value":"new_column"}, [
          new Element("token", {"type":"Identifier"}, [
            new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Text("new_column"),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [
    new Text(";"),
    new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
  ]),
  new Element("node", {"type":"AlterTableStatement"}, [
    new Element("token", {"type":"Reserved","value":"ALTER"}, [new Text("ALTER")]),
    new Element("token", {"type":"Reserved","value":"TABLE"}, [
      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Text("TABLE"),
    ]),
    new Element("node", {"type":"SchemaName","value":"test"}, [
      new Element("token", {"type":"Identifier","value":"TEST"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("test"),
      ]),
    ]),
    new Element("token", {"type":"Dot"}, [new Text(".")]),
    new Element("node", {"type":"ObjectName","value":"sample"}, [
      new Element("token", {"type":"Identifier","value":"SAMPLE"}, [new Text("sample")]),
    ]),
    new Element("node", {"type":"RenameColumnClause"}, [
      new Element("token", {"type":"Identifier","value":"RENAME"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("RENAME"),
      ]),
      new Element("node", {"type":"ColumnName","value":"old_column"}, [
        new Element("token", {"type":"Identifier"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("old_column"),
        ]),
      ]),
      new Element("node", {"type":"RenameToColumnClause"}, [
        new Element("token", {"type":"Reserved","value":"TO"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("TO"),
        ]),
        new Element("node", {"type":"ColumnName","value":"new_column"}, [
          new Element("token", {"type":"Identifier"}, [
            new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Text("new_column"),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [
    new Text(";"),
    new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
  ]),
  new Element("node", {"type":"AlterTableStatement"}, [
    new Element("token", {"type":"Reserved","value":"ALTER"}, [new Text("ALTER")]),
    new Element("token", {"type":"Reserved","value":"TABLE"}, [
      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Text("TABLE"),
    ]),
    new Element("node", {"type":"SchemaName","value":"test"}, [
      new Element("token", {"type":"Identifier","value":"TEST"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("test"),
      ]),
    ]),
    new Element("token", {"type":"Dot"}, [new Text(".")]),
    new Element("node", {"type":"ObjectName","value":"sample"}, [
      new Element("token", {"type":"Identifier","value":"SAMPLE"}, [new Text("sample")]),
    ]),
    new Element("node", {"type":"AddColumnClause"}, [
      new Element("token", {"type":"Reserved","value":"ADD"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("ADD"),
      ]),
      new Element("token", {"type":"Identifier","value":"COLUMN"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("COLUMN"),
      ]),
      new Element("node", {"type":"TableColumn"}, [
        new Element("node", {"type":"ColumnName","value":"new_column"}, [
          new Element("token", {"type":"Identifier"}, [
            new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Text("new_column"),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [
    new Text(";"),
    new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
  ]),
  new Element("node", {"type":"AlterTableStatement"}, [
    new Element("token", {"type":"Reserved","value":"ALTER"}, [new Text("ALTER")]),
    new Element("token", {"type":"Reserved","value":"TABLE"}, [
      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Text("TABLE"),
    ]),
    new Element("node", {"type":"SchemaName","value":"test"}, [
      new Element("token", {"type":"Identifier","value":"TEST"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("test"),
      ]),
    ]),
    new Element("token", {"type":"Dot"}, [new Text(".")]),
    new Element("node", {"type":"ObjectName","value":"sample"}, [
      new Element("token", {"type":"Identifier","value":"SAMPLE"}, [new Text("sample")]),
    ]),
    new Element("node", {"type":"AddColumnClause"}, [
      new Element("token", {"type":"Reserved","value":"ADD"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("ADD"),
      ]),
      new Element("node", {"type":"TableColumn"}, [
        new Element("node", {"type":"ColumnName","value":"new_column"}, [
          new Element("token", {"type":"Identifier"}, [
            new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Text("new_column"),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [
    new Text(";"),
    new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
  ]),
  new Element("node", {"type":"AlterTableStatement"}, [
    new Element("token", {"type":"Reserved","value":"ALTER"}, [new Text("ALTER")]),
    new Element("token", {"type":"Reserved","value":"TABLE"}, [
      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Text("TABLE"),
    ]),
    new Element("node", {"type":"SchemaName","value":"test"}, [
      new Element("token", {"type":"Identifier","value":"TEST"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("test"),
      ]),
    ]),
    new Element("token", {"type":"Dot"}, [new Text(".")]),
    new Element("node", {"type":"ObjectName","value":"sample"}, [
      new Element("token", {"type":"Identifier","value":"SAMPLE"}, [new Text("sample")]),
    ]),
    new Element("node", {"type":"AddColumnClause"}, [
      new Element("token", {"type":"Reserved","value":"ADD"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("ADD"),
      ]),
      new Element("token", {"type":"Identifier","value":"COLUMN"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("COLUMN"),
      ]),
      new Element("node", {"type":"TableColumn"}, [
        new Element("node", {"type":"ColumnName","value":"new_column"}, [
          new Element("token", {"type":"Identifier"}, [
            new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Text("new_column"),
          ]),
        ]),
        new Element("node", {"type":"ColumnConstraint"}, [
          new Element("node", {"type":"DefaultOption"}, [
            new Element("token", {"type":"Reserved","value":"DEFAULT"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Text("DEFAULT"),
            ]),
            new Element("node", {"type":"Expression"}, [
              new Element("node", {"type":"NullLiteral"}, [
                new Element("token", {"type":"Reserved","value":"NULL"}, [
                  new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Text("NULL"),
                ]),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [
    new Text(";"),
    new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
  ]),
  new Element("node", {"type":"AlterTableStatement"}, [
    new Element("token", {"type":"Reserved","value":"ALTER"}, [new Text("ALTER")]),
    new Element("token", {"type":"Reserved","value":"TABLE"}, [
      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Text("TABLE"),
    ]),
    new Element("node", {"type":"SchemaName","value":"test"}, [
      new Element("token", {"type":"Identifier","value":"TEST"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("test"),
      ]),
    ]),
    new Element("token", {"type":"Dot"}, [new Text(".")]),
    new Element("node", {"type":"ObjectName","value":"sample"}, [
      new Element("token", {"type":"Identifier","value":"SAMPLE"}, [new Text("sample")]),
    ]),
    new Element("node", {"type":"AddColumnClause"}, [
      new Element("token", {"type":"Reserved","value":"ADD"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("ADD"),
      ]),
      new Element("node", {"type":"TableColumn"}, [
        new Element("node", {"type":"ColumnName","value":"new_column"}, [
          new Element("token", {"type":"Identifier"}, [
            new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Text("new_column"),
          ]),
        ]),
        new Element("node", {"type":"ColumnConstraint"}, [
          new Element("node", {"type":"PrimaryKeyConstraint"}, [
            new Element("token", {"type":"Reserved","value":"PRIMARY"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Text("PRIMARY"),
            ]),
            new Element("token", {"type":"Identifier","value":"KEY"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Text("KEY"),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [
    new Text(";"),
    new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
  ]),
  new Element("node", {"type":"AlterTableStatement"}, [
    new Element("token", {"type":"Reserved","value":"ALTER"}, [new Text("ALTER")]),
    new Element("token", {"type":"Reserved","value":"TABLE"}, [
      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Text("TABLE"),
    ]),
    new Element("node", {"type":"SchemaName","value":"test"}, [
      new Element("token", {"type":"Identifier","value":"TEST"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("test"),
      ]),
    ]),
    new Element("token", {"type":"Dot"}, [new Text(".")]),
    new Element("node", {"type":"ObjectName","value":"sample"}, [
      new Element("token", {"type":"Identifier","value":"SAMPLE"}, [new Text("sample")]),
    ]),
    new Element("node", {"type":"AddColumnClause"}, [
      new Element("token", {"type":"Reserved","value":"ADD"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("ADD"),
      ]),
      new Element("token", {"type":"Identifier","value":"COLUMN"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("COLUMN"),
      ]),
      new Element("node", {"type":"TableColumn"}, [
        new Element("node", {"type":"ColumnName","value":"new_column"}, [
          new Element("token", {"type":"Identifier"}, [
            new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Text("new_column"),
          ]),
        ]),
        new Element("node", {"type":"ColumnType"}, [
          new Element("node", {"type":"TypeName","value":"TEXT"}, [
            new Element("token", {"type":"Identifier","value":"TEXT"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Text("TEXT"),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [
    new Text(";"),
    new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
  ]),
  new Element("node", {"type":"AlterTableStatement"}, [
    new Element("token", {"type":"Reserved","value":"ALTER"}, [new Text("ALTER")]),
    new Element("token", {"type":"Reserved","value":"TABLE"}, [
      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Text("TABLE"),
    ]),
    new Element("node", {"type":"SchemaName","value":"test"}, [
      new Element("token", {"type":"Identifier","value":"TEST"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("test"),
      ]),
    ]),
    new Element("token", {"type":"Dot"}, [new Text(".")]),
    new Element("node", {"type":"ObjectName","value":"sample"}, [
      new Element("token", {"type":"Identifier","value":"SAMPLE"}, [new Text("sample")]),
    ]),
    new Element("node", {"type":"AddColumnClause"}, [
      new Element("token", {"type":"Reserved","value":"ADD"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("ADD"),
      ]),
      new Element("token", {"type":"Identifier","value":"COLUMN"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("COLUMN"),
      ]),
      new Element("node", {"type":"TableColumn"}, [
        new Element("node", {"type":"ColumnName","value":"new_column"}, [
          new Element("token", {"type":"Identifier"}, [
            new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Text("new_column"),
          ]),
        ]),
        new Element("node", {"type":"ColumnType"}, [
          new Element("node", {"type":"TypeName","value":"VARING CHARACTER"}, [
            new Element("token", {"type":"Identifier"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Text("VARING"),
            ]),
            new Element("token", {"type":"Identifier","value":"CHARACTER"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Text("CHARACTER"),
            ]),
          ]),
        ]),
        new Element("node", {"type":"ColumnConstraint"}, [
          new Element("node", {"type":"GeneratedColumnOption"}, [
            new Element("token", {"type":"Reserved","value":"GENERATED"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Text("GENERATED"),
            ]),
            new Element("token", {"type":"Reserved","value":"ALWAYS"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Text("ALWAYS"),
            ]),
            new Element("token", {"type":"Reserved","value":"AS"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Text("AS"),
              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
            ]),
            new Element("token", {"type":"LeftParen"}, [new Text("(")]),
            new Element("node", {"type":"GeneratedColumn"}, [
              new Element("node", {"type":"Expression"}, [
                new Element("node", {"type":"NumericLiteral","value":"1"}, [
                  new Element("token", {"type":"Numeric"}, [new Text("1")]),
                ]),
              ]),
            ]),
            new Element("token", {"type":"RightParen"}, [new Text(")")]),
            new Element("node", {"type":"StoredOption"}, [
              new Element("token", {"type":"Identifier","value":"STORED"}, [
                new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Text("STORED"),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [
    new Text(";"),
    new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
  ]),
  new Element("node", {"type":"AlterTableStatement"}, [
    new Element("token", {"type":"Reserved","value":"ALTER"}, [new Text("ALTER")]),
    new Element("token", {"type":"Reserved","value":"TABLE"}, [
      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Text("TABLE"),
    ]),
    new Element("node", {"type":"SchemaName","value":"test"}, [
      new Element("token", {"type":"Identifier","value":"TEST"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("test"),
      ]),
    ]),
    new Element("token", {"type":"Dot"}, [new Text(".")]),
    new Element("node", {"type":"ObjectName","value":"sample"}, [
      new Element("token", {"type":"Identifier","value":"SAMPLE"}, [new Text("sample")]),
    ]),
    new Element("node", {"type":"AddColumnClause"}, [
      new Element("token", {"type":"Reserved","value":"ADD"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("ADD"),
      ]),
      new Element("node", {"type":"TableColumn"}, [
        new Element("node", {"type":"ColumnName","value":"new_column"}, [
          new Element("token", {"type":"Identifier"}, [
            new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Text("new_column"),
          ]),
        ]),
        new Element("node", {"type":"ColumnType"}, [
          new Element("node", {"type":"TypeName","value":"NUMERIC"}, [
            new Element("token", {"type":"Identifier","value":"NUMERIC"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Text("NUMERIC"),
            ]),
          ]),
          new Element("token", {"type":"LeftParen"}, [new Text("(")]),
          new Element("node", {"type":"TypeOptionList"}, [
            new Element("node", {"type":"LengthOption"}, [
              new Element("node", {"type":"NumericLiteral","value":"1"}, [
                new Element("token", {"type":"Numeric"}, [new Text("1")]),
              ]),
            ]),
            new Element("token", {"type":"Comma"}, [new Text(",")]),
            new Element("node", {"type":"ScaleOption"}, [
              new Element("node", {"type":"NumericLiteral","value":"0"}, [
                new Element("token", {"type":"Numeric"}, [
                  new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Text("0"),
                ]),
              ]),
            ]),
          ]),
          new Element("token", {"type":"RightParen"}, [new Text(")")]),
        ]),
        new Element("node", {"type":"ColumnConstraint"}, [
          new Element("node", {"type":"PrimaryKeyConstraint"}, [
            new Element("token", {"type":"Reserved","value":"PRIMARY"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Text("PRIMARY"),
            ]),
            new Element("token", {"type":"Identifier","value":"KEY"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Text("KEY"),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [
    new Text(";"),
    new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
  ]),
  new Element("node", {"type":"AlterTableStatement"}, [
    new Element("token", {"type":"Reserved","value":"ALTER"}, [new Text("ALTER")]),
    new Element("token", {"type":"Reserved","value":"TABLE"}, [
      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Text("TABLE"),
    ]),
    new Element("node", {"type":"SchemaName","value":"test"}, [
      new Element("token", {"type":"Identifier","value":"TEST"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("test"),
      ]),
    ]),
    new Element("token", {"type":"Dot"}, [new Text(".")]),
    new Element("node", {"type":"ObjectName","value":"sample"}, [
      new Element("token", {"type":"Identifier","value":"SAMPLE"}, [new Text("sample")]),
    ]),
    new Element("node", {"type":"DropColumnClause"}, [
      new Element("token", {"type":"Identifier","value":"DROP"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("DROP"),
      ]),
      new Element("token", {"type":"Identifier","value":"COLUMN"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("COLUMN"),
      ]),
      new Element("node", {"type":"ColumnName","value":"new_column"}, [
        new Element("token", {"type":"Identifier"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("new_column"),
        ]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [
    new Text(";"),
    new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
  ]),
  new Element("node", {"type":"AlterTableStatement"}, [
    new Element("token", {"type":"Reserved","value":"ALTER"}, [new Text("ALTER")]),
    new Element("token", {"type":"Reserved","value":"TABLE"}, [
      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Text("TABLE"),
    ]),
    new Element("node", {"type":"SchemaName","value":"test"}, [
      new Element("token", {"type":"Identifier","value":"TEST"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("test"),
      ]),
    ]),
    new Element("token", {"type":"Dot"}, [new Text(".")]),
    new Element("node", {"type":"ObjectName","value":"sample"}, [
      new Element("token", {"type":"Identifier","value":"SAMPLE"}, [new Text("sample")]),
    ]),
    new Element("node", {"type":"DropColumnClause"}, [
      new Element("token", {"type":"Identifier","value":"DROP"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("DROP"),
      ]),
      new Element("node", {"type":"ColumnName","value":"new_column"}, [
        new Element("token", {"type":"Identifier"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("new_column"),
        ]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"EoF"}),
])
