import { Element, Text } from "domhandler"

export default new Element("node", {"type":"Script"}, [
  new Element("node", {"type":"CreateTriggerStatement"}, [
    new Element("token", {"value":"CREATE","type":"Reserved"}, [new Text("CREATE")]),
    new Element("token", {"value":"TRIGGER","type":"Identifier"}, [
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
      new Element("token", {"value":"UPDATE","type":"Reserved"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("UPDATE"),
      ]),
      new Element("node", {"type":"ColumnList"}, [
        new Element("token", {"value":"OF","type":"Identifier"}, [
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
      new Element("token", {"value":"ON","type":"Reserved"}, [
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
      new Element("token", {"value":"FOR","type":"Identifier"}, [new Text("FOR")]),
      new Element("token", {"value":"EACH","type":"Identifier"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("EACH"),
      ]),
      new Element("token", {"value":"ROW","type":"Identifier"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("ROW"),
        new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
      ]),
    ]),
    new Element("node", {"type":"BeginStatement"}, [
      new Element("token", {"value":"BEGIN","type":"Identifier"}, [
        new Text("BEGIN"),
        new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
      ]),
      new Element("node", {"type":"BeginBlock"}, [
        new Element("node", {"type":"UpdateStatement"}, [
          new Element("node", {"type":"UpdateClause"}, [
            new Element("token", {"value":"UPDATE","type":"Reserved"}, [
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
              new Element("token", {"value":"SET","type":"Reserved"}, [
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
                          new Element("token", {"value":"NEW","type":"Identifier"}, [
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
              new Element("token", {"value":"WHERE","type":"Reserved"}, [
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
                      new Element("token", {"value":"OLD","type":"Identifier"}, [
                        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                        new Text("old"),
                      ]),
                    ]),
                    new Element("token", {"type":"Dot"}, [new Text(".")]),
                    new Element("node", {"type":"ColumnName","value":"name"}, [
                      new Element("token", {"value":"NAME","type":"Identifier"}, [new Text("name")]),
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
      new Element("token", {"value":"END","type":"Identifier"}, [new Text("END")]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [
    new Text(";"),
    new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
  ]),
  new Element("node", {"type":"CreateTriggerStatement"}, [
    new Element("token", {"value":"CREATE","type":"Reserved"}, [new Text("CREATE")]),
    new Element("node", {"type":"TemporaryOption"}, [
      new Element("token", {"value":"TEMP","type":"Identifier"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("TEMP"),
      ]),
    ]),
    new Element("token", {"value":"TRIGGER","type":"Identifier"}, [
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
        new Element("token", {"value":"AFTER","type":"Identifier"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("AFTER"),
        ]),
      ]),
      new Element("token", {"value":"INSERT","type":"Reserved"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("INSERT"),
      ]),
      new Element("token", {"value":"ON","type":"Reserved"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("ON"),
      ]),
      new Element("SchemaName", {"type":"ObjectName","value":"main"}, [
        new Element("token", {"value":"MAIN","type":"Identifier"}, [
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
      new Element("token", {"value":"BEGIN","type":"Identifier"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("BEGIN"),
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
      ]),
      new Element("node", {"type":"BeginBlock"}, [
        new Element("node", {"type":"InsertStatement"}, [
          new Element("node", {"type":"InsertClause"}, [
            new Element("token", {"value":"INSERT","type":"Reserved"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text("  ")]),
              new Text("INSERT"),
            ]),
            new Element("token", {"value":"INTO","type":"Reserved"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Text("INTO"),
            ]),
            new Element("node", {"type":"ObjectName","value":"sample"}, [
              new Element("token", {"value":"SAMPLE","type":"Identifier"}, [
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
              new Element("token", {"value":"VALUES","type":"Reserved"}, [
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
                        new Element("token", {"value":"NEW","type":"Identifier"}, [new Text("NEW")]),
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
      new Element("token", {"value":"END","type":"Identifier"}, [new Text("END")]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [
    new Text(";"),
    new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
  ]),
  new Element("node", {"type":"CreateTriggerStatement"}, [
    new Element("token", {"value":"CREATE","type":"Reserved"}, [new Text("CREATE")]),
    new Element("token", {"value":"TRIGGER","type":"Identifier"}, [
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
        new Element("token", {"value":"INSTEAD","type":"Identifier"}, [new Text("INSTEAD")]),
        new Element("token", {"value":"OF","type":"Identifier"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("OF"),
        ]),
      ]),
      new Element("token", {"value":"UPDATE","type":"Reserved"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("UPDATE"),
      ]),
      new Element("node", {"type":"ColumnList"}, [
        new Element("token", {"value":"OF","type":"Identifier"}, [
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
      new Element("token", {"value":"ON","type":"Reserved"}, [
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
      new Element("token", {"value":"BEGIN","type":"Identifier"}, [
        new Text("BEGIN"),
        new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
      ]),
      new Element("node", {"type":"BeginBlock"}, [
        new Element("node", {"type":"UpdateStatement"}, [
          new Element("node", {"type":"UpdateClause"}, [
            new Element("token", {"value":"UPDATE","type":"Reserved"}, [
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
              new Element("token", {"value":"SET","type":"Reserved"}, [
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
                          new Element("token", {"value":"NEW","type":"Identifier"}, [new Text("NEW")]),
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
              new Element("token", {"value":"WHERE","type":"Reserved"}, [
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
                      new Element("token", {"value":"OLD","type":"Identifier"}, [new Text("OLD")]),
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
      new Element("token", {"value":"END","type":"Identifier"}, [new Text("END")]),
    ]),
  ]),
  new Element("token", {"type":"SemiColon"}, [
    new Text(";"),
    new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
  ]),
  new Element("node", {"type":"CreateTriggerStatement"}, [
    new Element("token", {"value":"CREATE","type":"Reserved"}, [new Text("CREATE")]),
    new Element("node", {"type":"TemporaryOption"}, [
      new Element("token", {"value":"TEMP","type":"Identifier"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("TEMP"),
      ]),
    ]),
    new Element("token", {"value":"TRIGGER","type":"Identifier"}, [
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
        new Element("token", {"value":"BEFORE","type":"Identifier"}, [
          new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
          new Text("BEFORE"),
        ]),
      ]),
      new Element("token", {"value":"INSERT","type":"Reserved"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("INSERT"),
      ]),
      new Element("token", {"value":"ON","type":"Reserved"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("ON"),
      ]),
      new Element("SchemaName", {"type":"ObjectName","value":"main"}, [
        new Element("token", {"value":"MAIN","type":"Identifier"}, [
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
      new Element("token", {"value":"BEGIN","type":"Identifier"}, [
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Text("BEGIN"),
        new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
        new Element("trivia", {"type":"LineBreak"}, [new Text("\n")]),
      ]),
      new Element("node", {"type":"BeginBlock"}, [
        new Element("node", {"type":"DeleteStatement"}, [
          new Element("node", {"type":"DeleteClause"}, [
            new Element("token", {"value":"DELETE","type":"Reserved"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text("  ")]),
              new Text("DELETE"),
            ]),
            new Element("token", {"value":"FROM","type":"Reserved"}, [
              new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
              new Text("FROM"),
            ]),
            new Element("node", {"type":"ObjectName","value":"sample"}, [
              new Element("token", {"value":"SAMPLE","type":"Identifier"}, [
                new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Text("sample"),
              ]),
            ]),
            new Element("node", {"type":"WhereClause"}, [
              new Element("token", {"value":"WHERE","type":"Reserved"}, [
                new Element("trivia", {"type":"WhiteSpace"}, [new Text(" ")]),
                new Text("WHERE"),
              ]),
              new Element("node", {"type":"Expression"}, [
                new Element("node", {"type":"EqualOperation"}, [
                  new Element("node", {"type":"ColumnReference"}, [
                    new Element("node", {"type":"ObjectName","value":"OLD"}, [
                      new Element("token", {"value":"OLD","type":"Identifier"}, [
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
      new Element("token", {"value":"END","type":"Identifier"}, [new Text("END")]),
    ]),
  ]),
  new Element("token", {"type":"EoF"}),
])
