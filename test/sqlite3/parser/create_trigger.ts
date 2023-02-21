import { Element, Text } from "domhandler"

export default new Element("Script", {}, [
  new Element("CreateTriggerStatement", {}, [
    new Element("token", {"type":"Reserved","value":"CREATE"}, [new Text("CREATE")]),
    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    new Element("token", {"type":"Identifier","value":"TRIGGER"}, [new Text("TRIGGER")]),
    new Element("ObjectName", {"value":"update_customer_address"}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier"}, [new Text("update_customer_address")]),
    ]),
    new Element("UpdateOnClause", {}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Reserved","value":"UPDATE"}, [new Text("UPDATE")]),
      new Element("ColumnList", {}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Identifier","value":"OF"}, [new Text("OF")]),
        new Element("ColumnName", {"value":"address"}, [
          new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Element("token", {"type":"Identifier"}, [new Text("address")]),
        ]),
      ]),
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Reserved","value":"ON"}, [new Text("ON")]),
      new Element("ObjectName", {"value":"customers"}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Identifier"}, [new Text("customers")]),
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
      ]),
    ]),
    new Element("BeginStatement", {}, [
      new Element("BeginBlock", {}, [
        new Element("token", {"type":"Identifier","value":"BEGIN"}, [new Text("BEGIN")]),
        new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
        new Element("UpdateStatement", {}, [
          new Element("UpdateClause", {}, [
            new Element("skip", {"type":"WhiteSpace"}, [new Text("  ")]),
            new Element("token", {"type":"Reserved","value":"UPDATE"}, [new Text("UPDATE")]),
            new Element("ObjectName", {"value":"orders"}, [
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"Identifier"}, [new Text("orders")]),
            ]),
            new Element("SetClause", {}, [
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"Reserved","value":"SET"}, [new Text("SET")]),
              new Element("UpdateColumnList", {}, [
                new Element("UpdateColumn", {}, [
                  new Element("ColumnName", {"value":"address"}, [
                    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                    new Element("token", {"type":"Identifier"}, [new Text("address")]),
                    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                  ]),
                  new Element("token", {"type":"Operator"}, [new Text("=")]),
                  new Element("ColumnValue", {}, [
                    new Element("Expression", {}, [
                      new Element("ColumnReference", {}, [
                        new Element("ObjectName", {"value":"new"}, [
                          new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                          new Element("token", {"type":"Identifier","value":"NEW"}, [new Text("new")]),
                        ]),
                        new Element("token", {"type":"Dot"}, [new Text(".")]),
                        new Element("ColumnName", {"value":"address"}, [
                          new Element("token", {"type":"Identifier"}, [new Text("address")]),
                        ]),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
            new Element("WhereClause", {}, [
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"Reserved","value":"WHERE"}, [new Text("WHERE")]),
              new Element("Expression", {}, [
                new Element("EqualOperation", {}, [
                  new Element("ColumnReference", {}, [
                    new Element("ColumnName", {"value":"customer_name"}, [
                      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                      new Element("token", {"type":"Identifier"}, [new Text("customer_name")]),
                      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                    ]),
                  ]),
                  new Element("token", {"type":"Operator"}, [new Text("=")]),
                  new Element("ColumnReference", {}, [
                    new Element("ObjectName", {"value":"old"}, [
                      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                      new Element("token", {"type":"Identifier","value":"OLD"}, [new Text("old")]),
                    ]),
                    new Element("token", {"type":"Dot"}, [new Text(".")]),
                    new Element("ColumnName", {"value":"name"}, [
                      new Element("token", {"type":"Identifier","value":"NAME"}, [new Text("name")]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
          ]),
        ]),
        new Element("token", {"type":"SemiColon"}, [new Text(";")]),
        new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
        new Element("token", {"type":"Identifier","value":"END"}, [new Text("END")]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("CreateTriggerStatement", {}, [
    new Element("token", {"type":"Reserved","value":"CREATE"}, [new Text("CREATE")]),
    new Element("TemporaryOption", {}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"TEMP"}, [new Text("TEMP")]),
    ]),
    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    new Element("token", {"type":"Identifier","value":"TRIGGER"}, [new Text("TRIGGER")]),
    new Element("ObjectName", {"value":"ex1"}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier"}, [new Text("ex1")]),
    ]),
    new Element("AfterOption", {}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"AFTER"}, [new Text("AFTER")]),
    ]),
    new Element("InsertOnClause", {}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Reserved","value":"INSERT"}, [new Text("INSERT")]),
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Reserved","value":"ON"}, [new Text("ON")]),
      new Element("SchemaName", {"value":"main"}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Identifier","value":"MAIN"}, [new Text("main")]),
      ]),
      new Element("token", {"type":"Dot"}, [new Text(".")]),
      new Element("ObjectName", {"value":"tab1"}, [
        new Element("token", {"type":"Identifier"}, [new Text("tab1")]),
      ]),
    ]),
    new Element("BeginStatement", {}, [
      new Element("BeginBlock", {}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Identifier","value":"BEGIN"}, [new Text("BEGIN")]),
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
        new Element("InsertStatement", {}, [
          new Element("InsertClause", {}, [
            new Element("skip", {"type":"WhiteSpace"}, [new Text("  ")]),
            new Element("token", {"type":"Reserved","value":"INSERT"}, [new Text("INSERT")]),
            new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Element("token", {"type":"Reserved","value":"INTO"}, [new Text("INTO")]),
            new Element("ObjectName", {"value":"sample"}, [
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"Identifier","value":"SAMPLE"}, [new Text("sample")]),
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            ]),
            new Element("token", {"type":"LeftParen"}, [new Text("(")]),
            new Element("ColumnList", {}, [
              new Element("ColumnName", {"value":"x"}, [
                new Element("token", {"type":"Identifier"}, [new Text("x")]),
              ]),
            ]),
            new Element("token", {"type":"RightParen"}, [new Text(")")]),
            new Element("ValuesClause", {}, [
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"Reserved","value":"VALUES"}, [new Text("VALUES")]),
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"LeftParen"}, [new Text("(")]),
              new Element("ExpressionList", {}, [
                new Element("Expression", {}, [
                  new Element("ColumnReference", {}, [
                    new Element("ObjectName", {"value":"NEW"}, [
                      new Element("token", {"type":"Identifier","value":"NEW"}, [new Text("NEW")]),
                    ]),
                    new Element("token", {"type":"Dot"}, [new Text(".")]),
                    new Element("ColumnName", {"value":"x"}, [
                      new Element("token", {"type":"Identifier"}, [new Text("x")]),
                    ]),
                  ]),
                ]),
              ]),
              new Element("token", {"type":"RightParen"}, [new Text(")")]),
            ]),
          ]),
        ]),
        new Element("token", {"type":"SemiColon"}, [new Text(";")]),
        new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
        new Element("token", {"type":"Identifier","value":"END"}, [new Text("END")]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("CreateTriggerStatement", {}, [
    new Element("token", {"type":"Reserved","value":"CREATE"}, [new Text("CREATE")]),
    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    new Element("token", {"type":"Identifier","value":"TRIGGER"}, [new Text("TRIGGER")]),
    new Element("ObjectName", {"value":"cust_addr_chng"}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier"}, [new Text("cust_addr_chng")]),
      new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
    ]),
    new Element("InsteadOfOption", {}, [
      new Element("token", {"type":"Identifier","value":"INSTEAD"}, [new Text("INSTEAD")]),
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"OF"}, [new Text("OF")]),
    ]),
    new Element("UpdateOnClause", {}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Reserved","value":"UPDATE"}, [new Text("UPDATE")]),
      new Element("ColumnList", {}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Identifier","value":"OF"}, [new Text("OF")]),
        new Element("ColumnName", {"value":"cust_addr"}, [
          new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Element("token", {"type":"Identifier"}, [new Text("cust_addr")]),
        ]),
      ]),
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Reserved","value":"ON"}, [new Text("ON")]),
      new Element("ObjectName", {"value":"customer_address"}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Identifier"}, [new Text("customer_address")]),
        new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
      ]),
    ]),
    new Element("BeginStatement", {}, [
      new Element("BeginBlock", {}, [
        new Element("token", {"type":"Identifier","value":"BEGIN"}, [new Text("BEGIN")]),
        new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
        new Element("UpdateStatement", {}, [
          new Element("UpdateClause", {}, [
            new Element("skip", {"type":"WhiteSpace"}, [new Text("  ")]),
            new Element("token", {"type":"Reserved","value":"UPDATE"}, [new Text("UPDATE")]),
            new Element("ObjectName", {"value":"customer"}, [
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"Identifier"}, [new Text("customer")]),
            ]),
            new Element("SetClause", {}, [
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"Reserved","value":"SET"}, [new Text("SET")]),
              new Element("UpdateColumnList", {}, [
                new Element("UpdateColumn", {}, [
                  new Element("ColumnName", {"value":"cust_addr"}, [
                    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                    new Element("token", {"type":"Identifier"}, [new Text("cust_addr")]),
                  ]),
                  new Element("token", {"type":"Operator"}, [new Text("=")]),
                  new Element("ColumnValue", {}, [
                    new Element("Expression", {}, [
                      new Element("ColumnReference", {}, [
                        new Element("ObjectName", {"value":"NEW"}, [
                          new Element("token", {"type":"Identifier","value":"NEW"}, [new Text("NEW")]),
                        ]),
                        new Element("token", {"type":"Dot"}, [new Text(".")]),
                        new Element("ColumnName", {"value":"cust_addr"}, [
                          new Element("token", {"type":"Identifier"}, [new Text("cust_addr")]),
                          new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
                        ]),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
            new Element("WhereClause", {}, [
              new Element("skip", {"type":"WhiteSpace"}, [new Text("   ")]),
              new Element("token", {"type":"Reserved","value":"WHERE"}, [new Text("WHERE")]),
              new Element("Expression", {}, [
                new Element("EqualOperation", {}, [
                  new Element("ColumnReference", {}, [
                    new Element("ColumnName", {"value":"cust_id"}, [
                      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                      new Element("token", {"type":"Identifier"}, [new Text("cust_id")]),
                    ]),
                  ]),
                  new Element("token", {"type":"Operator"}, [new Text("=")]),
                  new Element("ColumnReference", {}, [
                    new Element("ObjectName", {"value":"OLD"}, [
                      new Element("token", {"type":"Identifier","value":"OLD"}, [new Text("OLD")]),
                    ]),
                    new Element("token", {"type":"Dot"}, [new Text(".")]),
                    new Element("ColumnName", {"value":"cust_id"}, [
                      new Element("token", {"type":"Identifier"}, [new Text("cust_id")]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
          ]),
        ]),
        new Element("token", {"type":"SemiColon"}, [new Text(";")]),
        new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
        new Element("token", {"type":"Identifier","value":"END"}, [new Text("END")]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [new Text(";")]),
  new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
  new Element("CreateTriggerStatement", {}, [
    new Element("token", {"type":"Reserved","value":"CREATE"}, [new Text("CREATE")]),
    new Element("TemporaryOption", {}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"TEMP"}, [new Text("TEMP")]),
    ]),
    new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
    new Element("token", {"type":"Identifier","value":"TRIGGER"}, [new Text("TRIGGER")]),
    new Element("ObjectName", {"value":"ex2"}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier"}, [new Text("ex2")]),
    ]),
    new Element("BeforeOption", {}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Identifier","value":"BEFORE"}, [new Text("BEFORE")]),
    ]),
    new Element("InsertOnClause", {}, [
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Reserved","value":"INSERT"}, [new Text("INSERT")]),
      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Element("token", {"type":"Reserved","value":"ON"}, [new Text("ON")]),
      new Element("SchemaName", {"value":"main"}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Identifier","value":"MAIN"}, [new Text("main")]),
      ]),
      new Element("token", {"type":"Dot"}, [new Text(".")]),
      new Element("ObjectName", {"value":"tab1"}, [
        new Element("token", {"type":"Identifier"}, [new Text("tab1")]),
      ]),
    ]),
    new Element("BeginStatement", {}, [
      new Element("BeginBlock", {}, [
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("token", {"type":"Identifier","value":"BEGIN"}, [new Text("BEGIN")]),
        new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
        new Element("DeleteStatement", {}, [
          new Element("DeleteClause", {}, [
            new Element("skip", {"type":"WhiteSpace"}, [new Text("  ")]),
            new Element("token", {"type":"Reserved","value":"DELETE"}, [new Text("DELETE")]),
            new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Element("token", {"type":"Reserved","value":"FROM"}, [new Text("FROM")]),
            new Element("ObjectName", {"value":"sample"}, [
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"Identifier","value":"SAMPLE"}, [new Text("sample")]),
            ]),
            new Element("WhereClause", {}, [
              new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Element("token", {"type":"Reserved","value":"WHERE"}, [new Text("WHERE")]),
              new Element("Expression", {}, [
                new Element("EqualOperation", {}, [
                  new Element("ColumnReference", {}, [
                    new Element("ObjectName", {"value":"OLD"}, [
                      new Element("skip", {"type":"WhiteSpace"}, [new Text(" ")]),
                      new Element("token", {"type":"Identifier","value":"OLD"}, [new Text("OLD")]),
                    ]),
                    new Element("token", {"type":"Dot"}, [new Text(".")]),
                    new Element("ColumnName", {"value":"x"}, [
                      new Element("token", {"type":"Identifier"}, [new Text("x")]),
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
        ]),
        new Element("token", {"type":"SemiColon"}, [new Text(";")]),
        new Element("skip", {"type":"LineBreak"}, [new Text("\n")]),
        new Element("token", {"type":"Identifier","value":"END"}, [new Text("END")]),
      ]),
    ]),
  ]),
  new Element("token", {"type":"SectionBreak"}),
])
