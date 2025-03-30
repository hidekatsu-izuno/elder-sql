import { Element, Text } from "domhandler"

export default new Element("node", {"type":"Script"}, [
  new Element("node", {"type":"CreateTriggerStatement"}, [
    new Element("token", {"type":"Reserved","value":"CREATE"}, [new Text("CREATE")]),
    new Element("token", {"type":"Identifier","value":"TRIGGER"}, [
      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Text("TRIGGER"),
    ]),
    new Element("node", {"type":"ObjectName","value":"update_customer_address"}, [
      new Element("token", {"type":"Identifier"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("update_customer_address"),
      ]),
    ]),
    new Element("node", {"type":"UpdateOnClause"}, [
      new Element("token", {"type":"Reserved","value":"UPDATE"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("UPDATE"),
      ]),
      new Element("node", {"type":"ColumnList"}, [
        new Element("token", {"type":"Identifier","value":"OF"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("OF"),
        ]),
        new Element("node", {"type":"ColumnName","value":"address"}, [
          new Element("token", {"type":"Identifier"}, [
            new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Text("address"),
          ]),
        ]),
      ]),
      new Element("token", {"type":"Reserved","value":"ON"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("ON"),
      ]),
      new Element("node", {"type":"ObjectName","value":"customers"}, [
        new Element("token", {"type":"Identifier"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("customers"),
          new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
        ]),
      ]),
    ]),
    new Element("node", {"type":"ForEachRowOption"}, [
      new Element("token", {"type":"Identifier","value":"FOR"}, [new Text("FOR")]),
      new Element("token", {"type":"Identifier","value":"EACH"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("EACH"),
      ]),
      new Element("token", {"type":"Identifier","value":"ROW"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("ROW"),
        new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
      ]),
    ]),
    new Element("node", {"type":"BeginStatement"}, [
      new Element("token", {"type":"Identifier","value":"BEGIN"}, [
        new Text("BEGIN"),
        new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
      ]),
      new Element("node", {"type":"BeginBlock"}, [
        new Element("node", {"type":"UpdateStatement"}, [
          new Element("node", {"type":"UpdateClause"}, [
            new Element("token", {"type":"Reserved","value":"UPDATE"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text("  ")]),
              new Text("UPDATE"),
            ]),
            new Element("node", {"type":"ObjectName","value":"orders"}, [
              new Element("token", {"type":"Identifier"}, [
                new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Text("orders"),
              ]),
            ]),
            new Element("node", {"type":"SetClause"}, [
              new Element("token", {"type":"Reserved","value":"SET"}, [
                new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Text("SET"),
              ]),
              new Element("node", {"type":"UpdateColumnList"}, [
                new Element("node", {"type":"UpdateColumn"}, [
                  new Element("node", {"type":"ColumnName","value":"address"}, [
                    new Element("token", {"type":"Identifier"}, [
                      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                      new Text("address"),
                      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                    ]),
                  ]),
                  new Element("token", {"type":"Operator"}, [new Text("=")]),
                  new Element("node", {"type":"ColumnValue"}, [
                    new Element("node", {"type":"Expression"}, [
                      new Element("node", {"type":"ColumnReference"}, [
                        new Element("node", {"type":"ObjectName","value":"new"}, [
                          new Element("token", {"type":"Identifier","value":"NEW"}, [
                            new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                            new Text("new"),
                          ]),
                        ]),
                        new Element("token", {"type":"Dot"}, [new Text(".")]),
                        new Element("node", {"type":"ColumnName","value":"address"}, [
                          new Element("token", {"type":"Identifier"}, [new Text("address")]),
                        ]),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
            new Element("node", {"type":"WhereClause"}, [
              new Element("token", {"type":"Reserved","value":"WHERE"}, [
                new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Text("WHERE"),
              ]),
              new Element("node", {"type":"Expression"}, [
                new Element("node", {"type":"EqualOperation"}, [
                  new Element("node", {"type":"ColumnReference"}, [
                    new Element("node", {"type":"ColumnName","value":"customer_name"}, [
                      new Element("token", {"type":"Identifier"}, [
                        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Text("customer_name"),
                        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                      ]),
                    ]),
                  ]),
                  new Element("token", {"type":"Operator"}, [new Text("=")]),
                  new Element("node", {"type":"ColumnReference"}, [
                    new Element("node", {"type":"ObjectName","value":"old"}, [
                      new Element("token", {"type":"Identifier","value":"OLD"}, [
                        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Text("old"),
                      ]),
                    ]),
                    new Element("token", {"type":"Dot"}, [new Text(".")]),
                    new Element("node", {"type":"ColumnName","value":"name"}, [
                      new Element("token", {"type":"Identifier","value":"NAME"}, [new Text("name")]),
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
      ]),
      new Element("token", {"type":"Identifier","value":"END"}, [new Text("END")]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [
    new Text(";"),
    new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
  ]),
  new Element("node", {"type":"CreateTriggerStatement"}, [
    new Element("token", {"type":"Reserved","value":"CREATE"}, [new Text("CREATE")]),
    new Element("node", {"type":"TemporaryOption"}, [
      new Element("token", {"type":"Identifier","value":"TEMP"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("TEMP"),
      ]),
    ]),
    new Element("token", {"type":"Identifier","value":"TRIGGER"}, [
      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Text("TRIGGER"),
    ]),
    new Element("node", {"type":"ObjectName","value":"ex1"}, [
      new Element("token", {"type":"Identifier"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("ex1"),
      ]),
    ]),
    new Element("node", {"type":"InsertOnClause"}, [
      new Element("node", {"type":"AfterOption"}, [
        new Element("token", {"type":"Identifier","value":"AFTER"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("AFTER"),
        ]),
      ]),
      new Element("token", {"type":"Reserved","value":"INSERT"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("INSERT"),
      ]),
      new Element("token", {"type":"Reserved","value":"ON"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("ON"),
      ]),
      new Element("node", {"type":"SchemaName","value":"main"}, [
        new Element("token", {"type":"Identifier","value":"MAIN"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("main"),
        ]),
      ]),
      new Element("token", {"type":"Dot"}, [new Text(".")]),
      new Element("node", {"type":"ObjectName","value":"tab1"}, [
        new Element("token", {"type":"Identifier"}, [new Text("tab1")]),
      ]),
    ]),
    new Element("node", {"type":"BeginStatement"}, [
      new Element("token", {"type":"Identifier","value":"BEGIN"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("BEGIN"),
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
      ]),
      new Element("node", {"type":"BeginBlock"}, [
        new Element("node", {"type":"InsertStatement"}, [
          new Element("node", {"type":"InsertClause"}, [
            new Element("token", {"type":"Reserved","value":"INSERT"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text("  ")]),
              new Text("INSERT"),
            ]),
            new Element("token", {"type":"Reserved","value":"INTO"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Text("INTO"),
            ]),
            new Element("node", {"type":"ObjectName","value":"sample"}, [
              new Element("token", {"type":"Identifier","value":"SAMPLE"}, [
                new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Text("sample"),
                new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
              ]),
            ]),
            new Element("token", {"type":"LeftParen"}, [new Text("(")]),
            new Element("node", {"type":"ColumnList"}, [
              new Element("node", {"type":"ColumnName","value":"x"}, [
                new Element("token", {"type":"Identifier"}, [new Text("x")]),
              ]),
            ]),
            new Element("token", {"type":"RightParen"}, [new Text(")")]),
            new Element("node", {"type":"ValuesClause"}, [
              new Element("token", {"type":"Reserved","value":"VALUES"}, [
                new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Text("VALUES"),
                new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
              ]),
              new Element("node", {"type":"ExpressionListGroup"}, [
                new Element("token", {"type":"LeftParen"}, [new Text("(")]),
                new Element("node", {"type":"ExpressionList"}, [
                  new Element("node", {"type":"Expression"}, [
                    new Element("node", {"type":"ColumnReference"}, [
                      new Element("node", {"type":"ObjectName","value":"NEW"}, [
                        new Element("token", {"type":"Identifier","value":"NEW"}, [new Text("NEW")]),
                      ]),
                      new Element("token", {"type":"Dot"}, [new Text(".")]),
                      new Element("node", {"type":"ColumnName","value":"x"}, [
                        new Element("token", {"type":"Identifier"}, [new Text("x")]),
                      ]),
                    ]),
                  ]),
                ]),
                new Element("token", {"type":"RightParen"}, [new Text(")")]),
              ]),
            ]),
          ]),
        ]),
        new Element("token", {"type":"SemiColon"}, [
          new Text(";"),
          new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
        ]),
      ]),
      new Element("token", {"type":"Identifier","value":"END"}, [new Text("END")]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [
    new Text(";"),
    new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
  ]),
  new Element("node", {"type":"CreateTriggerStatement"}, [
    new Element("token", {"type":"Reserved","value":"CREATE"}, [new Text("CREATE")]),
    new Element("token", {"type":"Identifier","value":"TRIGGER"}, [
      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Text("TRIGGER"),
    ]),
    new Element("node", {"type":"ObjectName","value":"cust_addr_chng"}, [
      new Element("token", {"type":"Identifier"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("cust_addr_chng"),
        new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
      ]),
    ]),
    new Element("node", {"type":"UpdateOnClause"}, [
      new Element("node", {"type":"InsteadOfOption"}, [
        new Element("token", {"type":"Identifier","value":"INSTEAD"}, [new Text("INSTEAD")]),
        new Element("token", {"type":"Identifier","value":"OF"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("OF"),
        ]),
      ]),
      new Element("token", {"type":"Reserved","value":"UPDATE"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("UPDATE"),
      ]),
      new Element("node", {"type":"ColumnList"}, [
        new Element("token", {"type":"Identifier","value":"OF"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("OF"),
        ]),
        new Element("node", {"type":"ColumnName","value":"cust_addr"}, [
          new Element("token", {"type":"Identifier"}, [
            new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
            new Text("cust_addr"),
          ]),
        ]),
      ]),
      new Element("token", {"type":"Reserved","value":"ON"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("ON"),
      ]),
      new Element("node", {"type":"ObjectName","value":"customer_address"}, [
        new Element("token", {"type":"Identifier"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("customer_address"),
          new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
        ]),
      ]),
    ]),
    new Element("node", {"type":"BeginStatement"}, [
      new Element("token", {"type":"Identifier","value":"BEGIN"}, [
        new Text("BEGIN"),
        new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
      ]),
      new Element("node", {"type":"BeginBlock"}, [
        new Element("node", {"type":"UpdateStatement"}, [
          new Element("node", {"type":"UpdateClause"}, [
            new Element("token", {"type":"Reserved","value":"UPDATE"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text("  ")]),
              new Text("UPDATE"),
            ]),
            new Element("node", {"type":"ObjectName","value":"customer"}, [
              new Element("token", {"type":"Identifier"}, [
                new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Text("customer"),
              ]),
            ]),
            new Element("node", {"type":"SetClause"}, [
              new Element("token", {"type":"Reserved","value":"SET"}, [
                new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Text("SET"),
              ]),
              new Element("node", {"type":"UpdateColumnList"}, [
                new Element("node", {"type":"UpdateColumn"}, [
                  new Element("node", {"type":"ColumnName","value":"cust_addr"}, [
                    new Element("token", {"type":"Identifier"}, [
                      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                      new Text("cust_addr"),
                    ]),
                  ]),
                  new Element("token", {"type":"Operator"}, [new Text("=")]),
                  new Element("node", {"type":"ColumnValue"}, [
                    new Element("node", {"type":"Expression"}, [
                      new Element("node", {"type":"ColumnReference"}, [
                        new Element("node", {"type":"ObjectName","value":"NEW"}, [
                          new Element("token", {"type":"Identifier","value":"NEW"}, [new Text("NEW")]),
                        ]),
                        new Element("token", {"type":"Dot"}, [new Text(".")]),
                        new Element("node", {"type":"ColumnName","value":"cust_addr"}, [
                          new Element("token", {"type":"Identifier"}, [
                            new Text("cust_addr"),
                            new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
                          ]),
                        ]),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
            ]),
            new Element("node", {"type":"WhereClause"}, [
              new Element("token", {"type":"Reserved","value":"WHERE"}, [
                new Element("trivia", {"type":"WhiteSpace"}, [new Text("   ")]),
                new Text("WHERE"),
              ]),
              new Element("node", {"type":"Expression"}, [
                new Element("node", {"type":"EqualOperation"}, [
                  new Element("node", {"type":"ColumnReference"}, [
                    new Element("node", {"type":"ColumnName","value":"cust_id"}, [
                      new Element("token", {"type":"Identifier"}, [
                        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Text("cust_id"),
                      ]),
                    ]),
                  ]),
                  new Element("token", {"type":"Operator"}, [new Text("=")]),
                  new Element("node", {"type":"ColumnReference"}, [
                    new Element("node", {"type":"ObjectName","value":"OLD"}, [
                      new Element("token", {"type":"Identifier","value":"OLD"}, [new Text("OLD")]),
                    ]),
                    new Element("token", {"type":"Dot"}, [new Text(".")]),
                    new Element("node", {"type":"ColumnName","value":"cust_id"}, [
                      new Element("token", {"type":"Identifier"}, [new Text("cust_id")]),
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
      ]),
      new Element("token", {"type":"Identifier","value":"END"}, [new Text("END")]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [
    new Text(";"),
    new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
  ]),
  new Element("node", {"type":"CreateTriggerStatement"}, [
    new Element("token", {"type":"Reserved","value":"CREATE"}, [new Text("CREATE")]),
    new Element("node", {"type":"TemporaryOption"}, [
      new Element("token", {"type":"Identifier","value":"TEMP"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("TEMP"),
      ]),
    ]),
    new Element("token", {"type":"Identifier","value":"TRIGGER"}, [
      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
      new Text("TRIGGER"),
    ]),
    new Element("node", {"type":"ObjectName","value":"ex2"}, [
      new Element("token", {"type":"Identifier"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("ex2"),
      ]),
    ]),
    new Element("node", {"type":"InsertOnClause"}, [
      new Element("node", {"type":"BeforeOption"}, [
        new Element("token", {"type":"Identifier","value":"BEFORE"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("BEFORE"),
        ]),
      ]),
      new Element("token", {"type":"Reserved","value":"INSERT"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("INSERT"),
      ]),
      new Element("token", {"type":"Reserved","value":"ON"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("ON"),
      ]),
      new Element("node", {"type":"SchemaName","value":"main"}, [
        new Element("token", {"type":"Identifier","value":"MAIN"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("main"),
        ]),
      ]),
      new Element("token", {"type":"Dot"}, [new Text(".")]),
      new Element("node", {"type":"ObjectName","value":"tab1"}, [
        new Element("token", {"type":"Identifier"}, [new Text("tab1")]),
      ]),
    ]),
    new Element("node", {"type":"BeginStatement"}, [
      new Element("token", {"type":"Identifier","value":"BEGIN"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("BEGIN"),
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
      ]),
      new Element("node", {"type":"BeginBlock"}, [
        new Element("node", {"type":"DeleteStatement"}, [
          new Element("node", {"type":"DeleteClause"}, [
            new Element("token", {"type":"Reserved","value":"DELETE"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text("  ")]),
              new Text("DELETE"),
            ]),
            new Element("token", {"type":"Reserved","value":"FROM"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Text("FROM"),
            ]),
            new Element("node", {"type":"ObjectName","value":"sample"}, [
              new Element("token", {"type":"Identifier","value":"SAMPLE"}, [
                new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Text("sample"),
              ]),
            ]),
            new Element("node", {"type":"WhereClause"}, [
              new Element("token", {"type":"Reserved","value":"WHERE"}, [
                new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Text("WHERE"),
              ]),
              new Element("node", {"type":"Expression"}, [
                new Element("node", {"type":"EqualOperation"}, [
                  new Element("node", {"type":"ColumnReference"}, [
                    new Element("node", {"type":"ObjectName","value":"OLD"}, [
                      new Element("token", {"type":"Identifier","value":"OLD"}, [
                        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Text("OLD"),
                      ]),
                    ]),
                    new Element("token", {"type":"Dot"}, [new Text(".")]),
                    new Element("node", {"type":"ColumnName","value":"x"}, [
                      new Element("token", {"type":"Identifier"}, [
                        new Text("x"),
                        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                      ]),
                    ]),
                  ]),
                  new Element("token", {"type":"Operator"}, [new Text("=")]),
                  new Element("node", {"type":"NumericLiteral","value":"1"}, [
                    new Element("token", {"type":"Numeric"}, [
                      new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                      new Text("1"),
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
      ]),
      new Element("token", {"type":"Identifier","value":"END"}, [new Text("END")]),
    ]),
  ]),
  new Element("token", {"type":"EoF"}),
])
