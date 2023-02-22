import { Element, Text } from "domhandler"

export default new Element("Script", {}, [
  new Element("AlterTableStatement", {}, [
    new Element("Reserved", {"value":"ALTER"}, [new Text("ALTER")]),
    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
    new Element("Reserved", {"value":"TABLE"}, [new Text("TABLE")]),
    new Element("SchemaName", {"value":"test"}, [
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Identifier", {"value":"TEST"}, [new Text("test")]),
    ]),
    new Element("Dot", {}, [new Text(".")]),
    new Element("ObjectName", {"value":"sample"}, [
      new Element("Identifier", {"value":"SAMPLE"}, [new Text("sample")]),
    ]),
    new Element("AlterTableOptionList", {}, [
      new Element("RenameToObjectClause", {}, [
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("Identifier", {"value":"RENAME"}, [new Text("RENAME")]),
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("Reserved", {"value":"TO"}, [new Text("TO")]),
        new Element("ObjectName", {"value":"new_table"}, [
          new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
          new Element("Identifier", {}, [new Text("new_table")]),
        ]),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
  new Element("AlterTableStatement", {}, [
    new Element("Reserved", {"value":"ALTER"}, [new Text("ALTER")]),
    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
    new Element("Reserved", {"value":"TABLE"}, [new Text("TABLE")]),
    new Element("SchemaName", {"value":"test"}, [
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Identifier", {"value":"TEST"}, [new Text("test")]),
    ]),
    new Element("Dot", {}, [new Text(".")]),
    new Element("ObjectName", {"value":"sample"}, [
      new Element("Identifier", {"value":"SAMPLE"}, [new Text("sample")]),
    ]),
    new Element("AlterTableOptionList", {}, [
      new Element("RenameColumnClause", {}, [
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("Identifier", {"value":"RENAME"}, [new Text("RENAME")]),
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("Identifier", {"value":"COLUMN"}, [new Text("COLUMN")]),
        new Element("ColumnName", {"value":"old_column"}, [
          new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
          new Element("Identifier", {}, [new Text("old_column")]),
        ]),
        new Element("RenameToColumnClause", {}, [
          new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
          new Element("Reserved", {"value":"TO"}, [new Text("TO")]),
          new Element("ColumnName", {"value":"new_column"}, [
            new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
            new Element("Identifier", {}, [new Text("new_column")]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
  new Element("AlterTableStatement", {}, [
    new Element("Reserved", {"value":"ALTER"}, [new Text("ALTER")]),
    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
    new Element("Reserved", {"value":"TABLE"}, [new Text("TABLE")]),
    new Element("SchemaName", {"value":"test"}, [
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Identifier", {"value":"TEST"}, [new Text("test")]),
    ]),
    new Element("Dot", {}, [new Text(".")]),
    new Element("ObjectName", {"value":"sample"}, [
      new Element("Identifier", {"value":"SAMPLE"}, [new Text("sample")]),
    ]),
    new Element("AlterTableOptionList", {}, [
      new Element("RenameColumnClause", {}, [
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("Identifier", {"value":"RENAME"}, [new Text("RENAME")]),
        new Element("ColumnName", {"value":"old_column"}, [
          new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
          new Element("Identifier", {}, [new Text("old_column")]),
        ]),
        new Element("RenameToColumnClause", {}, [
          new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
          new Element("Reserved", {"value":"TO"}, [new Text("TO")]),
          new Element("ColumnName", {"value":"new_column"}, [
            new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
            new Element("Identifier", {}, [new Text("new_column")]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
  new Element("AlterTableStatement", {}, [
    new Element("Reserved", {"value":"ALTER"}, [new Text("ALTER")]),
    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
    new Element("Reserved", {"value":"TABLE"}, [new Text("TABLE")]),
    new Element("SchemaName", {"value":"test"}, [
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Identifier", {"value":"TEST"}, [new Text("test")]),
    ]),
    new Element("Dot", {}, [new Text(".")]),
    new Element("ObjectName", {"value":"sample"}, [
      new Element("Identifier", {"value":"SAMPLE"}, [new Text("sample")]),
    ]),
    new Element("AlterTableOptionList", {}, [
      new Element("AddColumnClause", {}, [
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("Reserved", {"value":"ADD"}, [new Text("ADD")]),
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("Identifier", {"value":"COLUMN"}, [new Text("COLUMN")]),
        new Element("TableColumn", {}, [
          new Element("ColumnName", {"value":"new_column"}, [
            new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
            new Element("Identifier", {}, [new Text("new_column")]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
  new Element("AlterTableStatement", {}, [
    new Element("Reserved", {"value":"ALTER"}, [new Text("ALTER")]),
    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
    new Element("Reserved", {"value":"TABLE"}, [new Text("TABLE")]),
    new Element("SchemaName", {"value":"test"}, [
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Identifier", {"value":"TEST"}, [new Text("test")]),
    ]),
    new Element("Dot", {}, [new Text(".")]),
    new Element("ObjectName", {"value":"sample"}, [
      new Element("Identifier", {"value":"SAMPLE"}, [new Text("sample")]),
    ]),
    new Element("AlterTableOptionList", {}, [
      new Element("AddColumnClause", {}, [
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("Reserved", {"value":"ADD"}, [new Text("ADD")]),
        new Element("TableColumn", {}, [
          new Element("ColumnName", {"value":"new_column"}, [
            new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
            new Element("Identifier", {}, [new Text("new_column")]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
  new Element("AlterTableStatement", {}, [
    new Element("Reserved", {"value":"ALTER"}, [new Text("ALTER")]),
    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
    new Element("Reserved", {"value":"TABLE"}, [new Text("TABLE")]),
    new Element("SchemaName", {"value":"test"}, [
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Identifier", {"value":"TEST"}, [new Text("test")]),
    ]),
    new Element("Dot", {}, [new Text(".")]),
    new Element("ObjectName", {"value":"sample"}, [
      new Element("Identifier", {"value":"SAMPLE"}, [new Text("sample")]),
    ]),
    new Element("AlterTableOptionList", {}, [
      new Element("AddColumnClause", {}, [
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("Reserved", {"value":"ADD"}, [new Text("ADD")]),
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("Identifier", {"value":"COLUMN"}, [new Text("COLUMN")]),
        new Element("TableColumn", {}, [
          new Element("ColumnName", {"value":"new_column"}, [
            new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
            new Element("Identifier", {}, [new Text("new_column")]),
          ]),
          new Element("ColumnConstraint", {}, [
            new Element("DefaultOption", {}, [
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Reserved", {"value":"DEFAULT"}, [new Text("DEFAULT")]),
              new Element("Expression", {}, [
                new Element("NullLiteral", {}, [
                  new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                  new Element("Reserved", {"value":"NULL"}, [new Text("NULL")]),
                ]),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
  new Element("AlterTableStatement", {}, [
    new Element("Reserved", {"value":"ALTER"}, [new Text("ALTER")]),
    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
    new Element("Reserved", {"value":"TABLE"}, [new Text("TABLE")]),
    new Element("SchemaName", {"value":"test"}, [
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Identifier", {"value":"TEST"}, [new Text("test")]),
    ]),
    new Element("Dot", {}, [new Text(".")]),
    new Element("ObjectName", {"value":"sample"}, [
      new Element("Identifier", {"value":"SAMPLE"}, [new Text("sample")]),
    ]),
    new Element("AlterTableOptionList", {}, [
      new Element("AddColumnClause", {}, [
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("Reserved", {"value":"ADD"}, [new Text("ADD")]),
        new Element("TableColumn", {}, [
          new Element("ColumnName", {"value":"new_column"}, [
            new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
            new Element("Identifier", {}, [new Text("new_column")]),
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
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
  new Element("AlterTableStatement", {}, [
    new Element("Reserved", {"value":"ALTER"}, [new Text("ALTER")]),
    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
    new Element("Reserved", {"value":"TABLE"}, [new Text("TABLE")]),
    new Element("SchemaName", {"value":"test"}, [
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Identifier", {"value":"TEST"}, [new Text("test")]),
    ]),
    new Element("Dot", {}, [new Text(".")]),
    new Element("ObjectName", {"value":"sample"}, [
      new Element("Identifier", {"value":"SAMPLE"}, [new Text("sample")]),
    ]),
    new Element("AlterTableOptionList", {}, [
      new Element("AddColumnClause", {}, [
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("Reserved", {"value":"ADD"}, [new Text("ADD")]),
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("Identifier", {"value":"COLUMN"}, [new Text("COLUMN")]),
        new Element("TableColumn", {}, [
          new Element("ColumnName", {"value":"new_column"}, [
            new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
            new Element("Identifier", {}, [new Text("new_column")]),
          ]),
          new Element("ColumnType", {}, [
            new Element("TypeName", {"value":"TEXT"}, [
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Identifier", {"value":"TEXT"}, [new Text("TEXT")]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
  new Element("AlterTableStatement", {}, [
    new Element("Reserved", {"value":"ALTER"}, [new Text("ALTER")]),
    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
    new Element("Reserved", {"value":"TABLE"}, [new Text("TABLE")]),
    new Element("SchemaName", {"value":"test"}, [
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Identifier", {"value":"TEST"}, [new Text("test")]),
    ]),
    new Element("Dot", {}, [new Text(".")]),
    new Element("ObjectName", {"value":"sample"}, [
      new Element("Identifier", {"value":"SAMPLE"}, [new Text("sample")]),
    ]),
    new Element("AlterTableOptionList", {}, [
      new Element("AddColumnClause", {}, [
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("Reserved", {"value":"ADD"}, [new Text("ADD")]),
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("Identifier", {"value":"COLUMN"}, [new Text("COLUMN")]),
        new Element("TableColumn", {}, [
          new Element("ColumnName", {"value":"new_column"}, [
            new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
            new Element("Identifier", {}, [new Text("new_column")]),
          ]),
          new Element("ColumnType", {}, [
            new Element("TypeName", {"value":"VARING CHARACTER"}, [
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Identifier", {}, [new Text("VARING")]),
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Identifier", {"value":"CHARACTER"}, [new Text("CHARACTER")]),
            ]),
          ]),
          new Element("ColumnConstraint", {}, [
            new Element("GeneratedColumnOption", {}, [
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Reserved", {"value":"GENERATED"}, [new Text("GENERATED")]),
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Reserved", {"value":"ALWAYS"}, [new Text("ALWAYS")]),
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Reserved", {"value":"AS"}, [new Text("AS")]),
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("LeftParen", {}, [new Text("(")]),
              new Element("GeneratedColumn", {}, [
                new Element("Expression", {}, [
                  new Element("NumericLiteral", {"value":"1"}, [
                    new Element("Numeric", {}, [new Text("1")]),
                  ]),
                ]),
              ]),
              new Element("RightParen", {}, [new Text(")")]),
              new Element("StoredOption", {}, [
                new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                new Element("Identifier", {"value":"STORED"}, [new Text("STORED")]),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
  new Element("AlterTableStatement", {}, [
    new Element("Reserved", {"value":"ALTER"}, [new Text("ALTER")]),
    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
    new Element("Reserved", {"value":"TABLE"}, [new Text("TABLE")]),
    new Element("SchemaName", {"value":"test"}, [
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Identifier", {"value":"TEST"}, [new Text("test")]),
    ]),
    new Element("Dot", {}, [new Text(".")]),
    new Element("ObjectName", {"value":"sample"}, [
      new Element("Identifier", {"value":"SAMPLE"}, [new Text("sample")]),
    ]),
    new Element("AlterTableOptionList", {}, [
      new Element("AddColumnClause", {}, [
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("Reserved", {"value":"ADD"}, [new Text("ADD")]),
        new Element("TableColumn", {}, [
          new Element("ColumnName", {"value":"new_column"}, [
            new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
            new Element("Identifier", {}, [new Text("new_column")]),
          ]),
          new Element("ColumnType", {}, [
            new Element("TypeName", {"value":"NUMERIC"}, [
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Identifier", {"value":"NUMERIC"}, [new Text("NUMERIC")]),
            ]),
            new Element("LeftParen", {}, [new Text("(")]),
            new Element("TypeOptionList", {}, [
              new Element("LengthOption", {}, [
                new Element("NumericLiteral", {"value":"1"}, [
                  new Element("Numeric", {}, [new Text("1")]),
                ]),
              ]),
              new Element("Comma", {}, [new Text(",")]),
              new Element("ScaleOption", {}, [
                new Element("NumericLiteral", {"value":"0"}, [
                  new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                  new Element("Numeric", {}, [new Text("0")]),
                ]),
              ]),
            ]),
            new Element("RightParen", {}, [new Text(")")]),
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
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
  new Element("AlterTableStatement", {}, [
    new Element("Reserved", {"value":"ALTER"}, [new Text("ALTER")]),
    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
    new Element("Reserved", {"value":"TABLE"}, [new Text("TABLE")]),
    new Element("SchemaName", {"value":"test"}, [
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Identifier", {"value":"TEST"}, [new Text("test")]),
    ]),
    new Element("Dot", {}, [new Text(".")]),
    new Element("ObjectName", {"value":"sample"}, [
      new Element("Identifier", {"value":"SAMPLE"}, [new Text("sample")]),
    ]),
    new Element("AlterTableOptionList", {}, [
      new Element("DropColumnClause", {}, [
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("Identifier", {"value":"DROP"}, [new Text("DROP")]),
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("Identifier", {"value":"COLUMN"}, [new Text("COLUMN")]),
        new Element("ColumnName", {"value":"new_column"}, [
          new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
          new Element("Identifier", {}, [new Text("new_column")]),
        ]),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
  new Element("AlterTableStatement", {}, [
    new Element("Reserved", {"value":"ALTER"}, [new Text("ALTER")]),
    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
    new Element("Reserved", {"value":"TABLE"}, [new Text("TABLE")]),
    new Element("SchemaName", {"value":"test"}, [
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Identifier", {"value":"TEST"}, [new Text("test")]),
    ]),
    new Element("Dot", {}, [new Text(".")]),
    new Element("ObjectName", {"value":"sample"}, [
      new Element("Identifier", {"value":"SAMPLE"}, [new Text("sample")]),
    ]),
    new Element("AlterTableOptionList", {}, [
      new Element("DropColumnClause", {}, [
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("Identifier", {"value":"DROP"}, [new Text("DROP")]),
        new Element("ColumnName", {"value":"new_column"}, [
          new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
          new Element("Identifier", {}, [new Text("new_column")]),
        ]),
      ]),
    ]),
  ]),
  new Element("SectionBreak", {}),
])
