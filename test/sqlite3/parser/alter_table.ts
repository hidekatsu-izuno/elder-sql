import { Element, Text } from "domhandler"

export default new Element("node", {"type":"Script"}, [
  new Element("node", {"type":"AlterTableStatement"}, [
    new Element("token", {"value":"ALTER","type":"Reserved"}, [new Text("ALTER")]),
    new Element("token", {"value":"TABLE","type":"Reserved"}, [
      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Text("TABLE"),
    ]),
    new Element("SchemaName", {"type":"ObjectName","value":"test"}, [
      new Element("token", {"value":"TEST","type":"Identifier"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("test"),
      ]),
    ]),
    new Element("token", {"type":"Dot"}, [new Text(".")]),
    new Element("node", {"type":"ObjectName","value":"sample"}, [
      new Element("token", {"value":"SAMPLE","type":"Identifier"}, [new Text("sample")]),
    ]),
    new Element("node", {"type":"RenameToObjectClause"}, [
      new Element("token", {"value":"RENAME","type":"Identifier"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("RENAME"),
      ]),
      new Element("token", {"value":"TO","type":"Reserved"}, [
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
    new Element("token", {"value":"ALTER","type":"Reserved"}, [new Text("ALTER")]),
    new Element("token", {"value":"TABLE","type":"Reserved"}, [
      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Text("TABLE"),
    ]),
    new Element("SchemaName", {"type":"ObjectName","value":"test"}, [
      new Element("token", {"value":"TEST","type":"Identifier"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("test"),
      ]),
    ]),
    new Element("token", {"type":"Dot"}, [new Text(".")]),
    new Element("node", {"type":"ObjectName","value":"sample"}, [
      new Element("token", {"value":"SAMPLE","type":"Identifier"}, [new Text("sample")]),
    ]),
    new Element("node", {"type":"RenameColumnClause"}, [
      new Element("token", {"value":"RENAME","type":"Identifier"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("RENAME"),
      ]),
      new Element("token", {"value":"COLUMN","type":"Identifier"}, [
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
        new Element("token", {"value":"TO","type":"Reserved"}, [
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
    new Element("token", {"value":"ALTER","type":"Reserved"}, [new Text("ALTER")]),
    new Element("token", {"value":"TABLE","type":"Reserved"}, [
      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Text("TABLE"),
    ]),
    new Element("SchemaName", {"type":"ObjectName","value":"test"}, [
      new Element("token", {"value":"TEST","type":"Identifier"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("test"),
      ]),
    ]),
    new Element("token", {"type":"Dot"}, [new Text(".")]),
    new Element("node", {"type":"ObjectName","value":"sample"}, [
      new Element("token", {"value":"SAMPLE","type":"Identifier"}, [new Text("sample")]),
    ]),
    new Element("node", {"type":"RenameColumnClause"}, [
      new Element("token", {"value":"RENAME","type":"Identifier"}, [
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
        new Element("token", {"value":"TO","type":"Reserved"}, [
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
    new Element("token", {"value":"ALTER","type":"Reserved"}, [new Text("ALTER")]),
    new Element("token", {"value":"TABLE","type":"Reserved"}, [
      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Text("TABLE"),
    ]),
    new Element("SchemaName", {"type":"ObjectName","value":"test"}, [
      new Element("token", {"value":"TEST","type":"Identifier"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("test"),
      ]),
    ]),
    new Element("token", {"type":"Dot"}, [new Text(".")]),
    new Element("node", {"type":"ObjectName","value":"sample"}, [
      new Element("token", {"value":"SAMPLE","type":"Identifier"}, [new Text("sample")]),
    ]),
    new Element("node", {"type":"AddColumnClause"}, [
      new Element("token", {"value":"ADD","type":"Reserved"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("ADD"),
      ]),
      new Element("token", {"value":"COLUMN","type":"Identifier"}, [
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
    new Element("token", {"value":"ALTER","type":"Reserved"}, [new Text("ALTER")]),
    new Element("token", {"value":"TABLE","type":"Reserved"}, [
      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Text("TABLE"),
    ]),
    new Element("SchemaName", {"type":"ObjectName","value":"test"}, [
      new Element("token", {"value":"TEST","type":"Identifier"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("test"),
      ]),
    ]),
    new Element("token", {"type":"Dot"}, [new Text(".")]),
    new Element("node", {"type":"ObjectName","value":"sample"}, [
      new Element("token", {"value":"SAMPLE","type":"Identifier"}, [new Text("sample")]),
    ]),
    new Element("node", {"type":"AddColumnClause"}, [
      new Element("token", {"value":"ADD","type":"Reserved"}, [
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
    new Element("token", {"value":"ALTER","type":"Reserved"}, [new Text("ALTER")]),
    new Element("token", {"value":"TABLE","type":"Reserved"}, [
      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Text("TABLE"),
    ]),
    new Element("SchemaName", {"type":"ObjectName","value":"test"}, [
      new Element("token", {"value":"TEST","type":"Identifier"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("test"),
      ]),
    ]),
    new Element("token", {"type":"Dot"}, [new Text(".")]),
    new Element("node", {"type":"ObjectName","value":"sample"}, [
      new Element("token", {"value":"SAMPLE","type":"Identifier"}, [new Text("sample")]),
    ]),
    new Element("node", {"type":"AddColumnClause"}, [
      new Element("token", {"value":"ADD","type":"Reserved"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("ADD"),
      ]),
      new Element("token", {"value":"COLUMN","type":"Identifier"}, [
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
            new Element("token", {"value":"DEFAULT","type":"Reserved"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Text("DEFAULT"),
            ]),
            new Element("node", {"type":"Expression"}, [
              new Element("node", {"type":"NullLiteral"}, [
                new Element("token", {"value":"NULL","type":"Reserved"}, [
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
    new Element("token", {"value":"ALTER","type":"Reserved"}, [new Text("ALTER")]),
    new Element("token", {"value":"TABLE","type":"Reserved"}, [
      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Text("TABLE"),
    ]),
    new Element("SchemaName", {"type":"ObjectName","value":"test"}, [
      new Element("token", {"value":"TEST","type":"Identifier"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("test"),
      ]),
    ]),
    new Element("token", {"type":"Dot"}, [new Text(".")]),
    new Element("node", {"type":"ObjectName","value":"sample"}, [
      new Element("token", {"value":"SAMPLE","type":"Identifier"}, [new Text("sample")]),
    ]),
    new Element("node", {"type":"AddColumnClause"}, [
      new Element("token", {"value":"ADD","type":"Reserved"}, [
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
            new Element("token", {"value":"PRIMARY","type":"Reserved"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Text("PRIMARY"),
            ]),
            new Element("token", {"value":"KEY","type":"Identifier"}, [
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
    new Element("token", {"value":"ALTER","type":"Reserved"}, [new Text("ALTER")]),
    new Element("token", {"value":"TABLE","type":"Reserved"}, [
      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Text("TABLE"),
    ]),
    new Element("SchemaName", {"type":"ObjectName","value":"test"}, [
      new Element("token", {"value":"TEST","type":"Identifier"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("test"),
      ]),
    ]),
    new Element("token", {"type":"Dot"}, [new Text(".")]),
    new Element("node", {"type":"ObjectName","value":"sample"}, [
      new Element("token", {"value":"SAMPLE","type":"Identifier"}, [new Text("sample")]),
    ]),
    new Element("node", {"type":"AddColumnClause"}, [
      new Element("token", {"value":"ADD","type":"Reserved"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("ADD"),
      ]),
      new Element("token", {"value":"COLUMN","type":"Identifier"}, [
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
            new Element("token", {"value":"TEXT","type":"Identifier"}, [
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
    new Element("token", {"value":"ALTER","type":"Reserved"}, [new Text("ALTER")]),
    new Element("token", {"value":"TABLE","type":"Reserved"}, [
      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Text("TABLE"),
    ]),
    new Element("SchemaName", {"type":"ObjectName","value":"test"}, [
      new Element("token", {"value":"TEST","type":"Identifier"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("test"),
      ]),
    ]),
    new Element("token", {"type":"Dot"}, [new Text(".")]),
    new Element("node", {"type":"ObjectName","value":"sample"}, [
      new Element("token", {"value":"SAMPLE","type":"Identifier"}, [new Text("sample")]),
    ]),
    new Element("node", {"type":"AddColumnClause"}, [
      new Element("token", {"value":"ADD","type":"Reserved"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("ADD"),
      ]),
      new Element("token", {"value":"COLUMN","type":"Identifier"}, [
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
            new Element("token", {"value":"CHARACTER","type":"Identifier"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Text("CHARACTER"),
            ]),
          ]),
        ]),
        new Element("node", {"type":"ColumnConstraint"}, [
          new Element("node", {"type":"GeneratedColumnOption"}, [
            new Element("token", {"value":"GENERATED","type":"Reserved"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Text("GENERATED"),
            ]),
            new Element("token", {"value":"ALWAYS","type":"Reserved"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Text("ALWAYS"),
            ]),
            new Element("token", {"value":"AS","type":"Reserved"}, [
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
              new Element("token", {"value":"STORED","type":"Identifier"}, [
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
    new Element("token", {"value":"ALTER","type":"Reserved"}, [new Text("ALTER")]),
    new Element("token", {"value":"TABLE","type":"Reserved"}, [
      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Text("TABLE"),
    ]),
    new Element("SchemaName", {"type":"ObjectName","value":"test"}, [
      new Element("token", {"value":"TEST","type":"Identifier"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("test"),
      ]),
    ]),
    new Element("token", {"type":"Dot"}, [new Text(".")]),
    new Element("node", {"type":"ObjectName","value":"sample"}, [
      new Element("token", {"value":"SAMPLE","type":"Identifier"}, [new Text("sample")]),
    ]),
    new Element("node", {"type":"AddColumnClause"}, [
      new Element("token", {"value":"ADD","type":"Reserved"}, [
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
            new Element("token", {"value":"NUMERIC","type":"Identifier"}, [
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
            new Element("token", {"value":"PRIMARY","type":"Reserved"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Text("PRIMARY"),
            ]),
            new Element("token", {"value":"KEY","type":"Identifier"}, [
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
    new Element("token", {"value":"ALTER","type":"Reserved"}, [new Text("ALTER")]),
    new Element("token", {"value":"TABLE","type":"Reserved"}, [
      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Text("TABLE"),
    ]),
    new Element("SchemaName", {"type":"ObjectName","value":"test"}, [
      new Element("token", {"value":"TEST","type":"Identifier"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("test"),
      ]),
    ]),
    new Element("token", {"type":"Dot"}, [new Text(".")]),
    new Element("node", {"type":"ObjectName","value":"sample"}, [
      new Element("token", {"value":"SAMPLE","type":"Identifier"}, [new Text("sample")]),
    ]),
    new Element("node", {"type":"DropColumnClause"}, [
      new Element("token", {"value":"DROP","type":"Identifier"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("DROP"),
      ]),
      new Element("token", {"value":"COLUMN","type":"Identifier"}, [
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
    new Element("token", {"value":"ALTER","type":"Reserved"}, [new Text("ALTER")]),
    new Element("token", {"value":"TABLE","type":"Reserved"}, [
      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Text("TABLE"),
    ]),
    new Element("SchemaName", {"type":"ObjectName","value":"test"}, [
      new Element("token", {"value":"TEST","type":"Identifier"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("test"),
      ]),
    ]),
    new Element("token", {"type":"Dot"}, [new Text(".")]),
    new Element("node", {"type":"ObjectName","value":"sample"}, [
      new Element("token", {"value":"SAMPLE","type":"Identifier"}, [new Text("sample")]),
    ]),
    new Element("node", {"type":"DropColumnClause"}, [
      new Element("token", {"value":"DROP","type":"Identifier"}, [
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
