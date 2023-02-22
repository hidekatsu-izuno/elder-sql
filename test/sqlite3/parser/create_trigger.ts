import { Element, Text } from "domhandler"

export default new Element("Script", {}, [
  new Element("CreateTriggerStatement", {}, [
    new Element("Reserved", {"value":"CREATE"}, [new Text("CREATE")]),
    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
    new Element("Identifier", {"value":"TRIGGER"}, [new Text("TRIGGER")]),
    new Element("ObjectName", {"value":"update_customer_address"}, [
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Identifier", {}, [new Text("update_customer_address")]),
    ]),
    new Element("UpdateOnClause", {}, [
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Reserved", {"value":"UPDATE"}, [new Text("UPDATE")]),
      new Element("ColumnList", {}, [
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("Identifier", {"value":"OF"}, [new Text("OF")]),
        new Element("ColumnName", {"value":"address"}, [
          new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
          new Element("Identifier", {}, [new Text("address")]),
        ]),
      ]),
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Reserved", {"value":"ON"}, [new Text("ON")]),
      new Element("ObjectName", {"value":"customers"}, [
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("Identifier", {}, [new Text("customers")]),
        new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
      ]),
    ]),
    new Element("ForEachRowOption", {}, [
      new Element("Identifier", {"value":"FOR"}, [new Text("FOR")]),
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Identifier", {"value":"EACH"}, [new Text("EACH")]),
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Identifier", {"value":"ROW"}, [new Text("ROW")]),
      new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
    ]),
    new Element("BeginStatement", {}, [
      new Element("Identifier", {"value":"BEGIN"}, [new Text("BEGIN")]),
      new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
      new Element("BeginBlock", {}, [
        new Element("UpdateStatement", {}, [
          new Element("UpdateClause", {}, [
            new Element("WhiteSpace", {"skip":"true"}, [new Text("  ")]),
            new Element("Reserved", {"value":"UPDATE"}, [new Text("UPDATE")]),
            new Element("ObjectName", {"value":"orders"}, [
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Identifier", {}, [new Text("orders")]),
            ]),
            new Element("SetClause", {}, [
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Reserved", {"value":"SET"}, [new Text("SET")]),
              new Element("UpdateColumnList", {}, [
                new Element("UpdateColumn", {}, [
                  new Element("ColumnName", {"value":"address"}, [
                    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                    new Element("Identifier", {}, [new Text("address")]),
                    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                  ]),
                  new Element("Operator", {}, [new Text("=")]),
                  new Element("ColumnValue", {}, [
                    new Element("Expression", {}, [
                      new Element("ColumnReference", {}, [
                        new Element("ObjectName", {"value":"new"}, [
                          new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                          new Element("Identifier", {"value":"NEW"}, [new Text("new")]),
                        ]),
                        new Element("Dot", {}, [new Text(".")]),
                        new Element("ColumnName", {"value":"address"}, [
                          new Element("Identifier", {}, [new Text("address")]),
                        ]),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
            new Element("WhereClause", {}, [
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Reserved", {"value":"WHERE"}, [new Text("WHERE")]),
              new Element("Expression", {}, [
                new Element("EqualOperation", {}, [
                  new Element("ColumnReference", {}, [
                    new Element("ColumnName", {"value":"customer_name"}, [
                      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                      new Element("Identifier", {}, [new Text("customer_name")]),
                      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                    ]),
                  ]),
                  new Element("Operator", {}, [new Text("=")]),
                  new Element("ColumnReference", {}, [
                    new Element("ObjectName", {"value":"old"}, [
                      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                      new Element("Identifier", {"value":"OLD"}, [new Text("old")]),
                    ]),
                    new Element("Dot", {}, [new Text(".")]),
                    new Element("ColumnName", {"value":"name"}, [
                      new Element("Identifier", {"value":"NAME"}, [new Text("name")]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
          ]),
        ]),
        new Element("SemiColon", {}, [new Text(";")]),
        new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
      ]),
      new Element("Identifier", {"value":"END"}, [new Text("END")]),
    ]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
  new Element("CreateTriggerStatement", {}, [
    new Element("Reserved", {"value":"CREATE"}, [new Text("CREATE")]),
    new Element("TemporaryOption", {}, [
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Identifier", {"value":"TEMP"}, [new Text("TEMP")]),
    ]),
    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
    new Element("Identifier", {"value":"TRIGGER"}, [new Text("TRIGGER")]),
    new Element("ObjectName", {"value":"ex1"}, [
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Identifier", {}, [new Text("ex1")]),
    ]),
    new Element("InsertOnClause", {}, [
      new Element("AfterOption", {}, [
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("Identifier", {"value":"AFTER"}, [new Text("AFTER")]),
      ]),
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Reserved", {"value":"INSERT"}, [new Text("INSERT")]),
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Reserved", {"value":"ON"}, [new Text("ON")]),
      new Element("SchemaName", {"value":"main"}, [
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("Identifier", {"value":"MAIN"}, [new Text("main")]),
      ]),
      new Element("Dot", {}, [new Text(".")]),
      new Element("ObjectName", {"value":"tab1"}, [
        new Element("Identifier", {}, [new Text("tab1")]),
      ]),
    ]),
    new Element("BeginStatement", {}, [
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Identifier", {"value":"BEGIN"}, [new Text("BEGIN")]),
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
      new Element("BeginBlock", {}, [
        new Element("InsertStatement", {}, [
          new Element("InsertClause", {}, [
            new Element("WhiteSpace", {"skip":"true"}, [new Text("  ")]),
            new Element("Reserved", {"value":"INSERT"}, [new Text("INSERT")]),
            new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
            new Element("Reserved", {"value":"INTO"}, [new Text("INTO")]),
            new Element("ObjectName", {"value":"sample"}, [
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Identifier", {"value":"SAMPLE"}, [new Text("sample")]),
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
            ]),
            new Element("LeftParen", {}, [new Text("(")]),
            new Element("ColumnList", {}, [
              new Element("ColumnName", {"value":"x"}, [
                new Element("Identifier", {}, [new Text("x")]),
              ]),
            ]),
            new Element("RightParen", {}, [new Text(")")]),
            new Element("ValuesClause", {}, [
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Reserved", {"value":"VALUES"}, [new Text("VALUES")]),
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("LeftParen", {}, [new Text("(")]),
              new Element("ExpressionList", {}, [
                new Element("Expression", {}, [
                  new Element("ColumnReference", {}, [
                    new Element("ObjectName", {"value":"NEW"}, [
                      new Element("Identifier", {"value":"NEW"}, [new Text("NEW")]),
                    ]),
                    new Element("Dot", {}, [new Text(".")]),
                    new Element("ColumnName", {"value":"x"}, [
                      new Element("Identifier", {}, [new Text("x")]),
                    ]),
                  ]),
                ]),
              ]),
              new Element("RightParen", {}, [new Text(")")]),
            ]),
          ]),
        ]),
        new Element("SemiColon", {}, [new Text(";")]),
        new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
      ]),
      new Element("Identifier", {"value":"END"}, [new Text("END")]),
    ]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
  new Element("CreateTriggerStatement", {}, [
    new Element("Reserved", {"value":"CREATE"}, [new Text("CREATE")]),
    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
    new Element("Identifier", {"value":"TRIGGER"}, [new Text("TRIGGER")]),
    new Element("ObjectName", {"value":"cust_addr_chng"}, [
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Identifier", {}, [new Text("cust_addr_chng")]),
      new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
    ]),
    new Element("UpdateOnClause", {}, [
      new Element("InsteadOfOption", {}, [
        new Element("Identifier", {"value":"INSTEAD"}, [new Text("INSTEAD")]),
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("Identifier", {"value":"OF"}, [new Text("OF")]),
      ]),
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Reserved", {"value":"UPDATE"}, [new Text("UPDATE")]),
      new Element("ColumnList", {}, [
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("Identifier", {"value":"OF"}, [new Text("OF")]),
        new Element("ColumnName", {"value":"cust_addr"}, [
          new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
          new Element("Identifier", {}, [new Text("cust_addr")]),
        ]),
      ]),
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Reserved", {"value":"ON"}, [new Text("ON")]),
      new Element("ObjectName", {"value":"customer_address"}, [
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("Identifier", {}, [new Text("customer_address")]),
        new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
      ]),
    ]),
    new Element("BeginStatement", {}, [
      new Element("Identifier", {"value":"BEGIN"}, [new Text("BEGIN")]),
      new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
      new Element("BeginBlock", {}, [
        new Element("UpdateStatement", {}, [
          new Element("UpdateClause", {}, [
            new Element("WhiteSpace", {"skip":"true"}, [new Text("  ")]),
            new Element("Reserved", {"value":"UPDATE"}, [new Text("UPDATE")]),
            new Element("ObjectName", {"value":"customer"}, [
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Identifier", {}, [new Text("customer")]),
            ]),
            new Element("SetClause", {}, [
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Reserved", {"value":"SET"}, [new Text("SET")]),
              new Element("UpdateColumnList", {}, [
                new Element("UpdateColumn", {}, [
                  new Element("ColumnName", {"value":"cust_addr"}, [
                    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                    new Element("Identifier", {}, [new Text("cust_addr")]),
                  ]),
                  new Element("Operator", {}, [new Text("=")]),
                  new Element("ColumnValue", {}, [
                    new Element("Expression", {}, [
                      new Element("ColumnReference", {}, [
                        new Element("ObjectName", {"value":"NEW"}, [
                          new Element("Identifier", {"value":"NEW"}, [new Text("NEW")]),
                        ]),
                        new Element("Dot", {}, [new Text(".")]),
                        new Element("ColumnName", {"value":"cust_addr"}, [
                          new Element("Identifier", {}, [new Text("cust_addr")]),
                          new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
                        ]),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
            new Element("WhereClause", {}, [
              new Element("WhiteSpace", {"skip":"true"}, [new Text("   ")]),
              new Element("Reserved", {"value":"WHERE"}, [new Text("WHERE")]),
              new Element("Expression", {}, [
                new Element("EqualOperation", {}, [
                  new Element("ColumnReference", {}, [
                    new Element("ColumnName", {"value":"cust_id"}, [
                      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                      new Element("Identifier", {}, [new Text("cust_id")]),
                    ]),
                  ]),
                  new Element("Operator", {}, [new Text("=")]),
                  new Element("ColumnReference", {}, [
                    new Element("ObjectName", {"value":"OLD"}, [
                      new Element("Identifier", {"value":"OLD"}, [new Text("OLD")]),
                    ]),
                    new Element("Dot", {}, [new Text(".")]),
                    new Element("ColumnName", {"value":"cust_id"}, [
                      new Element("Identifier", {}, [new Text("cust_id")]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
          ]),
        ]),
        new Element("SemiColon", {}, [new Text(";")]),
        new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
      ]),
      new Element("Identifier", {"value":"END"}, [new Text("END")]),
    ]),
  ]),
  new Element("SemiColon", {}, [new Text(";")]),
  new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
  new Element("CreateTriggerStatement", {}, [
    new Element("Reserved", {"value":"CREATE"}, [new Text("CREATE")]),
    new Element("TemporaryOption", {}, [
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Identifier", {"value":"TEMP"}, [new Text("TEMP")]),
    ]),
    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
    new Element("Identifier", {"value":"TRIGGER"}, [new Text("TRIGGER")]),
    new Element("ObjectName", {"value":"ex2"}, [
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Identifier", {}, [new Text("ex2")]),
    ]),
    new Element("InsertOnClause", {}, [
      new Element("BeforeOption", {}, [
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("Identifier", {"value":"BEFORE"}, [new Text("BEFORE")]),
      ]),
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Reserved", {"value":"INSERT"}, [new Text("INSERT")]),
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Reserved", {"value":"ON"}, [new Text("ON")]),
      new Element("SchemaName", {"value":"main"}, [
        new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
        new Element("Identifier", {"value":"MAIN"}, [new Text("main")]),
      ]),
      new Element("Dot", {}, [new Text(".")]),
      new Element("ObjectName", {"value":"tab1"}, [
        new Element("Identifier", {}, [new Text("tab1")]),
      ]),
    ]),
    new Element("BeginStatement", {}, [
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("Identifier", {"value":"BEGIN"}, [new Text("BEGIN")]),
      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
      new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
      new Element("BeginBlock", {}, [
        new Element("DeleteStatement", {}, [
          new Element("DeleteClause", {}, [
            new Element("WhiteSpace", {"skip":"true"}, [new Text("  ")]),
            new Element("Reserved", {"value":"DELETE"}, [new Text("DELETE")]),
            new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
            new Element("Reserved", {"value":"FROM"}, [new Text("FROM")]),
            new Element("ObjectName", {"value":"sample"}, [
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Identifier", {"value":"SAMPLE"}, [new Text("sample")]),
            ]),
            new Element("WhereClause", {}, [
              new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
              new Element("Reserved", {"value":"WHERE"}, [new Text("WHERE")]),
              new Element("Expression", {}, [
                new Element("EqualOperation", {}, [
                  new Element("ColumnReference", {}, [
                    new Element("ObjectName", {"value":"OLD"}, [
                      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                      new Element("Identifier", {"value":"OLD"}, [new Text("OLD")]),
                    ]),
                    new Element("Dot", {}, [new Text(".")]),
                    new Element("ColumnName", {"value":"x"}, [
                      new Element("Identifier", {}, [new Text("x")]),
                      new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                    ]),
                  ]),
                  new Element("Operator", {}, [new Text("=")]),
                  new Element("NumericLiteral", {"value":"1"}, [
                    new Element("WhiteSpace", {"skip":"true"}, [new Text(" ")]),
                    new Element("Numeric", {}, [new Text("1")]),
                  ]),
                ]),
              ]),
            ]),
          ]),
        ]),
        new Element("SemiColon", {}, [new Text(";")]),
        new Element("LineBreak", {"skip":"true"}, [new Text("\n")]),
      ]),
      new Element("Identifier", {"value":"END"}, [new Text("END")]),
    ]),
  ]),
  new Element("SectionBreak", {}),
])
