import { Element, Text } from "domhandler"

export default new Element("Script", {}, [
  new Element("CreateIndexStatement", {}, [
    new Element("token", {"type":"Reserved","value":"CREATE"}, [new Text("CREATE")]),
    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    new Element("token", {"type":"Reserved","value":"INDEX"}, [new Text("INDEX")]),
    new Element("ObjectName", {"value":"ix_sample"}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier"}, [new Text("ix_sample")]),
    ]),
    new Element("IndexOnClause", {}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Reserved","value":"ON"}, [new Text("ON")]),
      new Element("ObjectName", {"value":"sample"}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Identifier","value":"SAMPLE"}, [new Text("sample")]),
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      ]),
      new Element("token", {"type":"LeftParen"}, [new Text("(")]),
      new Element("SortColumnList", {}, [
        new Element("SortColumn", {}, [
          new Element("Expression", {}, [
            new Element("ColumnReference", {}, [
              new Element("ColumnName", {"value":"a"}, [
                new Element("token", {"type":"Identifier"}, [new Text("a")]),
              ]),
            ]),
          ]),
        ]),
      ]),
      new Element("token", {"type":"RightParen"}, [new Text(")")]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("CreateIndexStatement", {}, [
    new Element("token", {"type":"Reserved","value":"CREATE"}, [new Text("CREATE")]),
    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    new Element("token", {"type":"Reserved","value":"INDEX"}, [new Text("INDEX")]),
    new Element("SchemaName", {"value":"main"}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"MAIN"}, [new Text("main")]),
    ]),
    new Element("token", {"type":"Dot"}, [new Text(".")]),
    new Element("ObjectName", {"value":"ix_sample"}, [
      new Element("token", {"type":"Identifier"}, [new Text("ix_sample")]),
    ]),
    new Element("IndexOnClause", {}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Reserved","value":"ON"}, [new Text("ON")]),
      new Element("ObjectName", {"value":"sample"}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Identifier","value":"SAMPLE"}, [new Text("sample")]),
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      ]),
      new Element("token", {"type":"LeftParen"}, [new Text("(")]),
      new Element("SortColumnList", {}, [
        new Element("SortColumn", {}, [
          new Element("Expression", {}, [
            new Element("ColumnReference", {}, [
              new Element("ColumnName", {"value":"a"}, [
                new Element("token", {"type":"Identifier"}, [new Text("a")]),
              ]),
            ]),
          ]),
        ]),
        new Element("token", {"type":"Comma"}, [new Text(",")]),
        new Element("SortColumn", {}, [
          new Element("Expression", {}, [
            new Element("ColumnReference", {}, [
              new Element("ColumnName", {"value":"b"}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Element("token", {"type":"Identifier"}, [new Text("b")]),
              ]),
            ]),
          ]),
        ]),
        new Element("token", {"type":"Comma"}, [new Text(",")]),
        new Element("SortColumn", {}, [
          new Element("Expression", {}, [
            new Element("ColumnReference", {}, [
              new Element("ColumnName", {"value":"c"}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Element("token", {"type":"Identifier"}, [new Text("c")]),
              ]),
            ]),
          ]),
        ]),
      ]),
      new Element("token", {"type":"RightParen"}, [new Text(")")]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("CreateIndexStatement", {}, [
    new Element("token", {"type":"Reserved","value":"CREATE"}, [new Text("CREATE")]),
    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    new Element("token", {"type":"Reserved","value":"INDEX"}, [new Text("INDEX")]),
    new Element("ObjectName", {"value":"ix_sample"}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier"}, [new Text("ix_sample")]),
    ]),
    new Element("IndexOnClause", {}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Reserved","value":"ON"}, [new Text("ON")]),
      new Element("ObjectName", {"value":"sample"}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Identifier","value":"SAMPLE"}, [new Text("sample")]),
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      ]),
      new Element("token", {"type":"LeftParen"}, [new Text("(")]),
      new Element("SortColumnList", {}, [
        new Element("SortColumn", {}, [
          new Element("Expression", {}, [
            new Element("ColumnReference", {}, [
              new Element("ColumnName", {"value":"a"}, [
                new Element("token", {"type":"Identifier"}, [new Text("a")]),
              ]),
            ]),
          ]),
        ]),
        new Element("token", {"type":"Comma"}, [new Text(",")]),
        new Element("SortColumn", {}, [
          new Element("Expression", {}, [
            new Element("ColumnReference", {}, [
              new Element("ColumnName", {"value":"b"}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Element("token", {"type":"Identifier"}, [new Text("b")]),
              ]),
            ]),
          ]),
          new Element("AscOption", {}, [
            new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Element("token", {"type":"Identifier","value":"ASC"}, [new Text("ASC")]),
          ]),
        ]),
        new Element("token", {"type":"Comma"}, [new Text(",")]),
        new Element("SortColumn", {}, [
          new Element("Expression", {}, [
            new Element("ColumnReference", {}, [
              new Element("ColumnName", {"value":"c"}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Element("token", {"type":"Identifier"}, [new Text("c")]),
              ]),
            ]),
          ]),
          new Element("DescOption", {}, [
            new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Element("token", {"type":"Identifier","value":"DESC"}, [new Text("DESC")]),
          ]),
        ]),
      ]),
      new Element("token", {"type":"RightParen"}, [new Text(")")]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("CreateIndexStatement", {}, [
    new Element("token", {"type":"Reserved","value":"CREATE"}, [new Text("CREATE")]),
    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    new Element("token", {"type":"Reserved","value":"INDEX"}, [new Text("INDEX")]),
    new Element("IfNotExistsOption", {}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"IF"}, [new Text("IF")]),
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Reserved","value":"NOT"}, [new Text("NOT")]),
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Reserved","value":"EXISTS"}, [new Text("EXISTS")]),
    ]),
    new Element("SchemaName", {"value":"main"}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"MAIN"}, [new Text("main")]),
    ]),
    new Element("token", {"type":"Dot"}, [new Text(".")]),
    new Element("ObjectName", {"value":"ix_sample"}, [
      new Element("token", {"type":"Identifier"}, [new Text("ix_sample")]),
    ]),
    new Element("IndexOnClause", {}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Reserved","value":"ON"}, [new Text("ON")]),
      new Element("ObjectName", {"value":"sample"}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Identifier","value":"SAMPLE"}, [new Text("sample")]),
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      ]),
      new Element("token", {"type":"LeftParen"}, [new Text("(")]),
      new Element("SortColumnList", {}, [
        new Element("SortColumn", {}, [
          new Element("Expression", {}, [
            new Element("AddOperation", {}, [
              new Element("ColumnReference", {}, [
                new Element("ColumnName", {"value":"a"}, [
                  new Element("token", {"type":"Identifier"}, [new Text("a")]),
                  new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                ]),
              ]),
              new Element("token", {"type":"Operator"}, [new Text("+")]),
              new Element("NumericLiteral", {"value":"1"}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Element("token", {"type":"Numeric"}, [new Text("1")]),
              ]),
            ]),
          ]),
        ]),
      ]),
      new Element("token", {"type":"RightParen"}, [new Text(")")]),
    ]),
    new Element("WhereClause", {}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Reserved","value":"WHERE"}, [new Text("WHERE")]),
      new Element("Expression", {}, [
        new Element("EqualOperation", {}, [
          new Element("ColumnReference", {}, [
            new Element("ColumnName", {"value":"a"}, [
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"Identifier"}, [new Text("a")]),
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            ]),
          ]),
          new Element("token", {"type":"Operator"}, [new Text("=")]),
          new Element("NumericLiteral", {"value":"1"}, [
            new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Element("token", {"type":"Numeric"}, [new Text("1")]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("CreateIndexStatement", {}, [
    new Element("token", {"type":"Reserved","value":"CREATE"}, [new Text("CREATE")]),
    new Element("UniqueOption", {}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Reserved","value":"UNIQUE"}, [new Text("UNIQUE")]),
    ]),
    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    new Element("token", {"type":"Reserved","value":"INDEX"}, [new Text("INDEX")]),
    new Element("SchemaName", {"value":"main"}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"MAIN"}, [new Text("main")]),
    ]),
    new Element("token", {"type":"Dot"}, [new Text(".")]),
    new Element("ObjectName", {"value":"ix_sample"}, [
      new Element("token", {"type":"Identifier"}, [new Text("ix_sample")]),
    ]),
    new Element("IndexOnClause", {}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Reserved","value":"ON"}, [new Text("ON")]),
      new Element("ObjectName", {"value":"sample"}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Identifier","value":"SAMPLE"}, [new Text("sample")]),
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      ]),
      new Element("token", {"type":"LeftParen"}, [new Text("(")]),
      new Element("SortColumnList", {}, [
        new Element("SortColumn", {}, [
          new Element("Expression", {}, [
            new Element("AddOperation", {}, [
              new Element("ColumnReference", {}, [
                new Element("ColumnName", {"value":"a"}, [
                  new Element("token", {"type":"Identifier"}, [new Text("a")]),
                  new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                ]),
              ]),
              new Element("token", {"type":"Operator"}, [new Text("+")]),
              new Element("NumericLiteral", {"value":"1"}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Element("token", {"type":"Numeric"}, [new Text("1")]),
              ]),
            ]),
          ]),
          new Element("AscOption", {}, [
            new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Element("token", {"type":"Identifier","value":"ASC"}, [new Text("ASC")]),
          ]),
        ]),
        new Element("token", {"type":"Comma"}, [new Text(",")]),
        new Element("SortColumn", {}, [
          new Element("Expression", {}, [
            new Element("AddOperation", {}, [
              new Element("ColumnReference", {}, [
                new Element("ColumnName", {"value":"b"}, [
                  new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Element("token", {"type":"Identifier"}, [new Text("b")]),
                  new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                ]),
              ]),
              new Element("token", {"type":"Operator"}, [new Text("+")]),
              new Element("NumericLiteral", {"value":"1"}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Element("token", {"type":"Numeric"}, [new Text("1")]),
              ]),
            ]),
          ]),
          new Element("DescOption", {}, [
            new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Element("token", {"type":"Identifier","value":"DESC"}, [new Text("DESC")]),
          ]),
        ]),
        new Element("token", {"type":"Comma"}, [new Text(",")]),
        new Element("SortColumn", {}, [
          new Element("Expression", {}, [
            new Element("ColumnReference", {}, [
              new Element("ColumnName", {"value":"c"}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Element("token", {"type":"Identifier"}, [new Text("c")]),
              ]),
            ]),
          ]),
        ]),
      ]),
      new Element("token", {"type":"RightParen"}, [new Text(")")]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("CreateIndexStatement", {}, [
    new Element("token", {"type":"Reserved","value":"CREATE"}, [new Text("CREATE")]),
    new Element("UniqueOption", {}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Reserved","value":"UNIQUE"}, [new Text("UNIQUE")]),
    ]),
    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    new Element("token", {"type":"Reserved","value":"INDEX"}, [new Text("INDEX")]),
    new Element("IfNotExistsOption", {}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"IF"}, [new Text("IF")]),
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Reserved","value":"NOT"}, [new Text("NOT")]),
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Reserved","value":"EXISTS"}, [new Text("EXISTS")]),
    ]),
    new Element("SchemaName", {"value":"main"}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"MAIN"}, [new Text("main")]),
    ]),
    new Element("token", {"type":"Dot"}, [new Text(".")]),
    new Element("ObjectName", {"value":"ix_sample"}, [
      new Element("token", {"type":"Identifier"}, [new Text("ix_sample")]),
    ]),
    new Element("IndexOnClause", {}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Reserved","value":"ON"}, [new Text("ON")]),
      new Element("ObjectName", {"value":"sample"}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Identifier","value":"SAMPLE"}, [new Text("sample")]),
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      ]),
      new Element("token", {"type":"LeftParen"}, [new Text("(")]),
      new Element("SortColumnList", {}, [
        new Element("SortColumn", {}, [
          new Element("Expression", {}, [
            new Element("CollateOperation", {}, [
              new Element("ColumnReference", {}, [
                new Element("ColumnName", {"value":"a"}, [
                  new Element("token", {"type":"Identifier"}, [new Text("a")]),
                ]),
              ]),
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"Reserved","value":"COLLATE"}, [new Text("COLLATE")]),
              new Element("CollationName", {"value":"test"}, [
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Element("token", {"type":"Identifier","value":"TEST"}, [new Text("test")]),
              ]),
            ]),
          ]),
        ]),
      ]),
      new Element("token", {"type":"RightParen"}, [new Text(")")]),
    ]),
    new Element("WhereClause", {}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Reserved","value":"WHERE"}, [new Text("WHERE")]),
      new Element("Expression", {}, [
        new Element("EqualOperation", {}, [
          new Element("ColumnReference", {}, [
            new Element("ColumnName", {"value":"a"}, [
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"Identifier"}, [new Text("a")]),
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            ]),
          ]),
          new Element("token", {"type":"Operator"}, [new Text("=")]),
          new Element("NumericLiteral", {"value":"1"}, [
            new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Element("token", {"type":"Numeric"}, [new Text("1")]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("CreateIndexStatement", {}, [
    new Element("token", {"type":"Reserved","value":"CREATE"}, [new Text("CREATE")]),
    new Element("UniqueOption", {}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Reserved","value":"UNIQUE"}, [new Text("UNIQUE")]),
    ]),
    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    new Element("token", {"type":"Reserved","value":"INDEX"}, [new Text("INDEX")]),
    new Element("IfNotExistsOption", {}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"IF"}, [new Text("IF")]),
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Reserved","value":"NOT"}, [new Text("NOT")]),
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Reserved","value":"EXISTS"}, [new Text("EXISTS")]),
    ]),
    new Element("SchemaName", {"value":"main"}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"MAIN"}, [new Text("main")]),
    ]),
    new Element("token", {"type":"Dot"}, [new Text(".")]),
    new Element("ObjectName", {"value":"ix_sample"}, [
      new Element("token", {"type":"Identifier"}, [new Text("ix_sample")]),
    ]),
    new Element("IndexOnClause", {}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Reserved","value":"ON"}, [new Text("ON")]),
      new Element("ObjectName", {"value":"sample"}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Identifier","value":"SAMPLE"}, [new Text("sample")]),
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      ]),
      new Element("token", {"type":"LeftParen"}, [new Text("(")]),
      new Element("SortColumnList", {}, [
        new Element("SortColumn", {}, [
          new Element("Expression", {}, [
            new Element("AddOperation", {}, [
              new Element("ColumnReference", {}, [
                new Element("ColumnName", {"value":"a"}, [
                  new Element("token", {"type":"Identifier"}, [new Text("a")]),
                  new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                ]),
              ]),
              new Element("token", {"type":"Operator"}, [new Text("+")]),
              new Element("CollateOperation", {}, [
                new Element("NumericLiteral", {"value":"1"}, [
                  new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Element("token", {"type":"Numeric"}, [new Text("1")]),
                ]),
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Element("token", {"type":"Reserved","value":"COLLATE"}, [new Text("COLLATE")]),
                new Element("CollationName", {"value":"test"}, [
                  new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Element("token", {"type":"Identifier","value":"TEST"}, [new Text("test")]),
                ]),
              ]),
            ]),
          ]),
        ]),
        new Element("token", {"type":"Comma"}, [new Text(",")]),
        new Element("SortColumn", {}, [
          new Element("Expression", {}, [
            new Element("AddOperation", {}, [
              new Element("ColumnReference", {}, [
                new Element("ColumnName", {"value":"b"}, [
                  new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Element("token", {"type":"Identifier"}, [new Text("b")]),
                  new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                ]),
              ]),
              new Element("token", {"type":"Operator"}, [new Text("+")]),
              new Element("CollateOperation", {}, [
                new Element("NumericLiteral", {"value":"1"}, [
                  new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Element("token", {"type":"Numeric"}, [new Text("1")]),
                ]),
                new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Element("token", {"type":"Reserved","value":"COLLATE"}, [new Text("COLLATE")]),
                new Element("CollationName", {"value":"test"}, [
                  new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                  new Element("token", {"type":"Identifier","value":"TEST"}, [new Text("test")]),
                ]),
              ]),
            ]),
          ]),
          new Element("AscOption", {}, [
            new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Element("token", {"type":"Identifier","value":"ASC"}, [new Text("ASC")]),
          ]),
        ]),
      ]),
      new Element("token", {"type":"RightParen"}, [new Text(")")]),
    ]),
    new Element("WhereClause", {}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Reserved","value":"WHERE"}, [new Text("WHERE")]),
      new Element("Expression", {}, [
        new Element("EqualOperation", {}, [
          new Element("ColumnReference", {}, [
            new Element("ColumnName", {"value":"a"}, [
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"Identifier"}, [new Text("a")]),
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            ]),
          ]),
          new Element("token", {"type":"Operator"}, [new Text("=")]),
          new Element("NumericLiteral", {"value":"1"}, [
            new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Element("token", {"type":"Numeric"}, [new Text("1")]),
          ]),
        ]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SectionBreak"}),
])
