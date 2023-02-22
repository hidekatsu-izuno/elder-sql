import { Element, Text } from "domhandler"

export default new Element("Script", {}, [
  new Element("AlterTableStatement", {}, [
    new Element("Reserved", {"value":"ALTER"}, [new Text("ALTER")]),
    new Element("Reserved", {"value":"TABLE"}, [
      new Element("WhiteSpace", {}, [new Text(" ")]),
      new Text("TABLE"),
    ]),
    new Element("SchemaName", {"value":"test"}, [
      new Element("Identifier", {"value":"TEST"}, [
        new Element("WhiteSpace", {}, [new Text(" ")]),
        new Text("test"),
      ]),
    ]),
    new Element("Dot", {}, [new Text(".")]),
    new Element("ObjectName", {"value":"sample"}, [
      new Element("Identifier", {"value":"SAMPLE"}, [new Text("sample")]),
    ]),
    new Element("AlterTableOptionList", {}, [
      new Element("RenameToObjectClause", {}, [
        new Element("Identifier", {"value":"RENAME"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("RENAME"),
        ]),
        new Element("Reserved", {"value":"TO"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("TO"),
        ]),
        new Element("ObjectName", {"value":"new_table"}, [
          new Element("Identifier", {}, [
            new Element("WhiteSpace", {}, [new Text(" ")]),
            new Text("new_table"),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [
    new Text(";"),
    new Element("LineBreak", {}, [new Text("\n")]),
  ]),
  new Element("AlterTableStatement", {}, [
    new Element("Reserved", {"value":"ALTER"}, [new Text("ALTER")]),
    new Element("Reserved", {"value":"TABLE"}, [
      new Element("WhiteSpace", {}, [new Text(" ")]),
      new Text("TABLE"),
    ]),
    new Element("SchemaName", {"value":"test"}, [
      new Element("Identifier", {"value":"TEST"}, [
        new Element("WhiteSpace", {}, [new Text(" ")]),
        new Text("test"),
      ]),
    ]),
    new Element("Dot", {}, [new Text(".")]),
    new Element("ObjectName", {"value":"sample"}, [
      new Element("Identifier", {"value":"SAMPLE"}, [new Text("sample")]),
    ]),
    new Element("AlterTableOptionList", {}, [
      new Element("RenameColumnClause", {}, [
        new Element("Identifier", {"value":"RENAME"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("RENAME"),
        ]),
        new Element("Identifier", {"value":"COLUMN"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("COLUMN"),
        ]),
        new Element("ColumnName", {"value":"old_column"}, [
          new Element("Identifier", {}, [
            new Element("WhiteSpace", {}, [new Text(" ")]),
            new Text("old_column"),
          ]),
        ]),
        new Element("RenameToColumnClause", {}, [
          new Element("Reserved", {"value":"TO"}, [
            new Element("WhiteSpace", {}, [new Text(" ")]),
            new Text("TO"),
          ]),
          new Element("ColumnName", {"value":"new_column"}, [
            new Element("Identifier", {}, [
              new Element("WhiteSpace", {}, [new Text(" ")]),
              new Text("new_column"),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [
    new Text(";"),
    new Element("LineBreak", {}, [new Text("\n")]),
  ]),
  new Element("AlterTableStatement", {}, [
    new Element("Reserved", {"value":"ALTER"}, [new Text("ALTER")]),
    new Element("Reserved", {"value":"TABLE"}, [
      new Element("WhiteSpace", {}, [new Text(" ")]),
      new Text("TABLE"),
    ]),
    new Element("SchemaName", {"value":"test"}, [
      new Element("Identifier", {"value":"TEST"}, [
        new Element("WhiteSpace", {}, [new Text(" ")]),
        new Text("test"),
      ]),
    ]),
    new Element("Dot", {}, [new Text(".")]),
    new Element("ObjectName", {"value":"sample"}, [
      new Element("Identifier", {"value":"SAMPLE"}, [new Text("sample")]),
    ]),
    new Element("AlterTableOptionList", {}, [
      new Element("RenameColumnClause", {}, [
        new Element("Identifier", {"value":"RENAME"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("RENAME"),
        ]),
        new Element("ColumnName", {"value":"old_column"}, [
          new Element("Identifier", {}, [
            new Element("WhiteSpace", {}, [new Text(" ")]),
            new Text("old_column"),
          ]),
        ]),
        new Element("RenameToColumnClause", {}, [
          new Element("Reserved", {"value":"TO"}, [
            new Element("WhiteSpace", {}, [new Text(" ")]),
            new Text("TO"),
          ]),
          new Element("ColumnName", {"value":"new_column"}, [
            new Element("Identifier", {}, [
              new Element("WhiteSpace", {}, [new Text(" ")]),
              new Text("new_column"),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [
    new Text(";"),
    new Element("LineBreak", {}, [new Text("\n")]),
  ]),
  new Element("AlterTableStatement", {}, [
    new Element("Reserved", {"value":"ALTER"}, [new Text("ALTER")]),
    new Element("Reserved", {"value":"TABLE"}, [
      new Element("WhiteSpace", {}, [new Text(" ")]),
      new Text("TABLE"),
    ]),
    new Element("SchemaName", {"value":"test"}, [
      new Element("Identifier", {"value":"TEST"}, [
        new Element("WhiteSpace", {}, [new Text(" ")]),
        new Text("test"),
      ]),
    ]),
    new Element("Dot", {}, [new Text(".")]),
    new Element("ObjectName", {"value":"sample"}, [
      new Element("Identifier", {"value":"SAMPLE"}, [new Text("sample")]),
    ]),
    new Element("AlterTableOptionList", {}, [
      new Element("AddColumnClause", {}, [
        new Element("Reserved", {"value":"ADD"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("ADD"),
        ]),
        new Element("Identifier", {"value":"COLUMN"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("COLUMN"),
        ]),
        new Element("TableColumn", {}, [
          new Element("ColumnName", {"value":"new_column"}, [
            new Element("Identifier", {}, [
              new Element("WhiteSpace", {}, [new Text(" ")]),
              new Text("new_column"),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [
    new Text(";"),
    new Element("LineBreak", {}, [new Text("\n")]),
  ]),
  new Element("AlterTableStatement", {}, [
    new Element("Reserved", {"value":"ALTER"}, [new Text("ALTER")]),
    new Element("Reserved", {"value":"TABLE"}, [
      new Element("WhiteSpace", {}, [new Text(" ")]),
      new Text("TABLE"),
    ]),
    new Element("SchemaName", {"value":"test"}, [
      new Element("Identifier", {"value":"TEST"}, [
        new Element("WhiteSpace", {}, [new Text(" ")]),
        new Text("test"),
      ]),
    ]),
    new Element("Dot", {}, [new Text(".")]),
    new Element("ObjectName", {"value":"sample"}, [
      new Element("Identifier", {"value":"SAMPLE"}, [new Text("sample")]),
    ]),
    new Element("AlterTableOptionList", {}, [
      new Element("AddColumnClause", {}, [
        new Element("Reserved", {"value":"ADD"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("ADD"),
        ]),
        new Element("TableColumn", {}, [
          new Element("ColumnName", {"value":"new_column"}, [
            new Element("Identifier", {}, [
              new Element("WhiteSpace", {}, [new Text(" ")]),
              new Text("new_column"),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [
    new Text(";"),
    new Element("LineBreak", {}, [new Text("\n")]),
  ]),
  new Element("AlterTableStatement", {}, [
    new Element("Reserved", {"value":"ALTER"}, [new Text("ALTER")]),
    new Element("Reserved", {"value":"TABLE"}, [
      new Element("WhiteSpace", {}, [new Text(" ")]),
      new Text("TABLE"),
    ]),
    new Element("SchemaName", {"value":"test"}, [
      new Element("Identifier", {"value":"TEST"}, [
        new Element("WhiteSpace", {}, [new Text(" ")]),
        new Text("test"),
      ]),
    ]),
    new Element("Dot", {}, [new Text(".")]),
    new Element("ObjectName", {"value":"sample"}, [
      new Element("Identifier", {"value":"SAMPLE"}, [new Text("sample")]),
    ]),
    new Element("AlterTableOptionList", {}, [
      new Element("AddColumnClause", {}, [
        new Element("Reserved", {"value":"ADD"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("ADD"),
        ]),
        new Element("Identifier", {"value":"COLUMN"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("COLUMN"),
        ]),
        new Element("TableColumn", {}, [
          new Element("ColumnName", {"value":"new_column"}, [
            new Element("Identifier", {}, [
              new Element("WhiteSpace", {}, [new Text(" ")]),
              new Text("new_column"),
            ]),
          ]),
        ]),
        new Element("ColumnConstraintList", {}, [
          new Element("ColumnConstraint", {}, [
            new Element("DefaultOption", {}, [
              new Element("Reserved", {"value":"DEFAULT"}, [
                new Element("WhiteSpace", {}, [new Text(" ")]),
                new Text("DEFAULT"),
              ]),
              new Element("Expression", {}, [
                new Element("NullLiteral", {}, [
                  new Element("Reserved", {"value":"NULL"}, [
                    new Element("WhiteSpace", {}, [new Text(" ")]),
                    new Text("NULL"),
                  ]),
                ]),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [
    new Text(";"),
    new Element("LineBreak", {}, [new Text("\n")]),
  ]),
  new Element("AlterTableStatement", {}, [
    new Element("Reserved", {"value":"ALTER"}, [new Text("ALTER")]),
    new Element("Reserved", {"value":"TABLE"}, [
      new Element("WhiteSpace", {}, [new Text(" ")]),
      new Text("TABLE"),
    ]),
    new Element("SchemaName", {"value":"test"}, [
      new Element("Identifier", {"value":"TEST"}, [
        new Element("WhiteSpace", {}, [new Text(" ")]),
        new Text("test"),
      ]),
    ]),
    new Element("Dot", {}, [new Text(".")]),
    new Element("ObjectName", {"value":"sample"}, [
      new Element("Identifier", {"value":"SAMPLE"}, [new Text("sample")]),
    ]),
    new Element("AlterTableOptionList", {}, [
      new Element("AddColumnClause", {}, [
        new Element("Reserved", {"value":"ADD"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("ADD"),
        ]),
        new Element("TableColumn", {}, [
          new Element("ColumnName", {"value":"new_column"}, [
            new Element("Identifier", {}, [
              new Element("WhiteSpace", {}, [new Text(" ")]),
              new Text("new_column"),
            ]),
          ]),
        ]),
        new Element("ColumnConstraintList", {}, [
          new Element("ColumnConstraint", {}, [
            new Element("PrimaryKeyConstraint", {}, [
              new Element("Reserved", {"value":"PRIMARY"}, [
                new Element("WhiteSpace", {}, [new Text(" ")]),
                new Text("PRIMARY"),
              ]),
              new Element("Identifier", {"value":"KEY"}, [
                new Element("WhiteSpace", {}, [new Text(" ")]),
                new Text("KEY"),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [
    new Text(";"),
    new Element("LineBreak", {}, [new Text("\n")]),
  ]),
  new Element("AlterTableStatement", {}, [
    new Element("Reserved", {"value":"ALTER"}, [new Text("ALTER")]),
    new Element("Reserved", {"value":"TABLE"}, [
      new Element("WhiteSpace", {}, [new Text(" ")]),
      new Text("TABLE"),
    ]),
    new Element("SchemaName", {"value":"test"}, [
      new Element("Identifier", {"value":"TEST"}, [
        new Element("WhiteSpace", {}, [new Text(" ")]),
        new Text("test"),
      ]),
    ]),
    new Element("Dot", {}, [new Text(".")]),
    new Element("ObjectName", {"value":"sample"}, [
      new Element("Identifier", {"value":"SAMPLE"}, [new Text("sample")]),
    ]),
    new Element("AlterTableOptionList", {}, [
      new Element("AddColumnClause", {}, [
        new Element("Reserved", {"value":"ADD"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("ADD"),
        ]),
        new Element("Identifier", {"value":"COLUMN"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("COLUMN"),
        ]),
        new Element("TableColumn", {}, [
          new Element("ColumnName", {"value":"new_column"}, [
            new Element("Identifier", {}, [
              new Element("WhiteSpace", {}, [new Text(" ")]),
              new Text("new_column"),
            ]),
          ]),
          new Element("ColumnType", {}, [
            new Element("TypeName", {"value":"TEXT"}, [
              new Element("Identifier", {"value":"TEXT"}, [
                new Element("WhiteSpace", {}, [new Text(" ")]),
                new Text("TEXT"),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [
    new Text(";"),
    new Element("LineBreak", {}, [new Text("\n")]),
  ]),
  new Element("AlterTableStatement", {}, [
    new Element("Reserved", {"value":"ALTER"}, [new Text("ALTER")]),
    new Element("Reserved", {"value":"TABLE"}, [
      new Element("WhiteSpace", {}, [new Text(" ")]),
      new Text("TABLE"),
    ]),
    new Element("SchemaName", {"value":"test"}, [
      new Element("Identifier", {"value":"TEST"}, [
        new Element("WhiteSpace", {}, [new Text(" ")]),
        new Text("test"),
      ]),
    ]),
    new Element("Dot", {}, [new Text(".")]),
    new Element("ObjectName", {"value":"sample"}, [
      new Element("Identifier", {"value":"SAMPLE"}, [new Text("sample")]),
    ]),
    new Element("AlterTableOptionList", {}, [
      new Element("AddColumnClause", {}, [
        new Element("Reserved", {"value":"ADD"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("ADD"),
        ]),
        new Element("Identifier", {"value":"COLUMN"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("COLUMN"),
        ]),
        new Element("TableColumn", {}, [
          new Element("ColumnName", {"value":"new_column"}, [
            new Element("Identifier", {}, [
              new Element("WhiteSpace", {}, [new Text(" ")]),
              new Text("new_column"),
            ]),
          ]),
          new Element("ColumnType", {}, [
            new Element("TypeName", {"value":"VARING CHARACTER"}, [
              new Element("Identifier", {}, [
                new Element("WhiteSpace", {}, [new Text(" ")]),
                new Text("VARING"),
              ]),
              new Element("Identifier", {"value":"CHARACTER"}, [
                new Element("WhiteSpace", {}, [new Text(" ")]),
                new Text("CHARACTER"),
              ]),
            ]),
          ]),
        ]),
        new Element("ColumnConstraintList", {}, [
          new Element("ColumnConstraint", {}, [
            new Element("GeneratedColumnOption", {}, [
              new Element("Reserved", {"value":"GENERATED"}, [
                new Element("WhiteSpace", {}, [new Text(" ")]),
                new Text("GENERATED"),
              ]),
              new Element("Reserved", {"value":"ALWAYS"}, [
                new Element("WhiteSpace", {}, [new Text(" ")]),
                new Text("ALWAYS"),
              ]),
              new Element("Reserved", {"value":"AS"}, [
                new Element("WhiteSpace", {}, [new Text(" ")]),
                new Text("AS"),
                new Element("WhiteSpace", {}, [new Text(" ")]),
              ]),
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
                new Element("Identifier", {"value":"STORED"}, [
                  new Element("WhiteSpace", {}, [new Text(" ")]),
                  new Text("STORED"),
                ]),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [
    new Text(";"),
    new Element("LineBreak", {}, [new Text("\n")]),
  ]),
  new Element("AlterTableStatement", {}, [
    new Element("Reserved", {"value":"ALTER"}, [new Text("ALTER")]),
    new Element("Reserved", {"value":"TABLE"}, [
      new Element("WhiteSpace", {}, [new Text(" ")]),
      new Text("TABLE"),
    ]),
    new Element("SchemaName", {"value":"test"}, [
      new Element("Identifier", {"value":"TEST"}, [
        new Element("WhiteSpace", {}, [new Text(" ")]),
        new Text("test"),
      ]),
    ]),
    new Element("Dot", {}, [new Text(".")]),
    new Element("ObjectName", {"value":"sample"}, [
      new Element("Identifier", {"value":"SAMPLE"}, [new Text("sample")]),
    ]),
    new Element("AlterTableOptionList", {}, [
      new Element("AddColumnClause", {}, [
        new Element("Reserved", {"value":"ADD"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("ADD"),
        ]),
        new Element("TableColumn", {}, [
          new Element("ColumnName", {"value":"new_column"}, [
            new Element("Identifier", {}, [
              new Element("WhiteSpace", {}, [new Text(" ")]),
              new Text("new_column"),
            ]),
          ]),
          new Element("ColumnType", {}, [
            new Element("TypeName", {"value":"NUMERIC"}, [
              new Element("Identifier", {"value":"NUMERIC"}, [
                new Element("WhiteSpace", {}, [new Text(" ")]),
                new Text("NUMERIC"),
              ]),
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
                  new Element("Numeric", {}, [
                    new Element("WhiteSpace", {}, [new Text(" ")]),
                    new Text("0"),
                  ]),
                ]),
              ]),
            ]),
            new Element("RightParen", {}, [new Text(")")]),
          ]),
        ]),
        new Element("ColumnConstraintList", {}, [
          new Element("ColumnConstraint", {}, [
            new Element("PrimaryKeyConstraint", {}, [
              new Element("Reserved", {"value":"PRIMARY"}, [
                new Element("WhiteSpace", {}, [new Text(" ")]),
                new Text("PRIMARY"),
              ]),
              new Element("Identifier", {"value":"KEY"}, [
                new Element("WhiteSpace", {}, [new Text(" ")]),
                new Text("KEY"),
              ]),
            ]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [
    new Text(";"),
    new Element("LineBreak", {}, [new Text("\n")]),
  ]),
  new Element("AlterTableStatement", {}, [
    new Element("Reserved", {"value":"ALTER"}, [new Text("ALTER")]),
    new Element("Reserved", {"value":"TABLE"}, [
      new Element("WhiteSpace", {}, [new Text(" ")]),
      new Text("TABLE"),
    ]),
    new Element("SchemaName", {"value":"test"}, [
      new Element("Identifier", {"value":"TEST"}, [
        new Element("WhiteSpace", {}, [new Text(" ")]),
        new Text("test"),
      ]),
    ]),
    new Element("Dot", {}, [new Text(".")]),
    new Element("ObjectName", {"value":"sample"}, [
      new Element("Identifier", {"value":"SAMPLE"}, [new Text("sample")]),
    ]),
    new Element("AlterTableOptionList", {}, [
      new Element("DropColumnClause", {}, [
        new Element("Identifier", {"value":"DROP"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("DROP"),
        ]),
        new Element("Identifier", {"value":"COLUMN"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("COLUMN"),
        ]),
        new Element("ColumnName", {"value":"new_column"}, [
          new Element("Identifier", {}, [
            new Element("WhiteSpace", {}, [new Text(" ")]),
            new Text("new_column"),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("SemiColon", {}, [
    new Text(";"),
    new Element("LineBreak", {}, [new Text("\n")]),
  ]),
  new Element("AlterTableStatement", {}, [
    new Element("Reserved", {"value":"ALTER"}, [new Text("ALTER")]),
    new Element("Reserved", {"value":"TABLE"}, [
      new Element("WhiteSpace", {}, [new Text(" ")]),
      new Text("TABLE"),
    ]),
    new Element("SchemaName", {"value":"test"}, [
      new Element("Identifier", {"value":"TEST"}, [
        new Element("WhiteSpace", {}, [new Text(" ")]),
        new Text("test"),
      ]),
    ]),
    new Element("Dot", {}, [new Text(".")]),
    new Element("ObjectName", {"value":"sample"}, [
      new Element("Identifier", {"value":"SAMPLE"}, [new Text("sample")]),
    ]),
    new Element("AlterTableOptionList", {}, [
      new Element("DropColumnClause", {}, [
        new Element("Identifier", {"value":"DROP"}, [
          new Element("WhiteSpace", {}, [new Text(" ")]),
          new Text("DROP"),
        ]),
        new Element("ColumnName", {"value":"new_column"}, [
          new Element("Identifier", {}, [
            new Element("WhiteSpace", {}, [new Text(" ")]),
            new Text("new_column"),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("SectionBreak", {}, [new Text("")]),
])
