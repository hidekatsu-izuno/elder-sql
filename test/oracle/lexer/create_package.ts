import { Token, TokenType } from "../../../src/parser"
import { Keyword } from "../../../src/oracle/oracle_parser"

export const actual = `
-- create the audit table to track changes
CREATE TABLE emp_audit(date_of_action DATE, user_id VARCHAR2(20), 
                       package_name VARCHAR2(30));

CREATE OR REPLACE PACKAGE emp_admin AS
-- Declare externally visible types, cursor, exception
   TYPE EmpRecTyp IS RECORD (emp_id NUMBER, sal NUMBER);
   CURSOR desc_salary RETURN EmpRecTyp;
   invalid_salary EXCEPTION;
-- Declare externally callable subprograms
   FUNCTION hire_employee (last_name VARCHAR2, first_name VARCHAR2, 
     email VARCHAR2, phone_number VARCHAR2, job_id VARCHAR2, salary NUMBER,
     commission_pct NUMBER, manager_id NUMBER, department_id NUMBER) 
     RETURN NUMBER;
   PROCEDURE fire_employee (emp_id NUMBER); -- overloaded subprogram
   PROCEDURE fire_employee (emp_email VARCHAR2); -- overloaded subprogram
   PROCEDURE raise_salary (emp_id NUMBER, amount NUMBER);
   FUNCTION nth_highest_salary (n NUMBER) RETURN EmpRecTyp;
END emp_admin;
/
CREATE OR REPLACE PACKAGE BODY emp_admin AS
   number_hired NUMBER;  -- visible only in this package
-- Fully define cursor specified in package
   CURSOR desc_salary RETURN EmpRecTyp IS
      SELECT employee_id, salary FROM employees ORDER BY salary DESC;
-- Fully define subprograms specified in package
   FUNCTION hire_employee (last_name VARCHAR2, first_name VARCHAR2, 
     email VARCHAR2, phone_number VARCHAR2, job_id VARCHAR2, salary NUMBER,
     commission_pct NUMBER, manager_id NUMBER, department_id NUMBER) 
     RETURN NUMBER IS
     new_emp_id NUMBER;
   BEGIN
      SELECT employees_seq.NEXTVAL INTO new_emp_id FROM dual;
      INSERT INTO employees VALUES (new_emp_id, last_name, first_name, email,
        phone_number, SYSDATE, job_id, salary, commission_pct, manager_id,
        department_id);
      number_hired := number_hired + 1;
      DBMS_OUTPUT.PUT_LINE('The number of employees hired is ' 
                           || TO_CHAR(number_hired) );   
      RETURN new_emp_id;
   END hire_employee;
   PROCEDURE fire_employee (emp_id NUMBER) IS
   BEGIN
      DELETE FROM employees WHERE employee_id = emp_id;
   END fire_employee;
   PROCEDURE fire_employee (emp_email VARCHAR2) IS
   BEGIN
      DELETE FROM employees WHERE email = emp_email;
   END fire_employee;
  -- Define local function, available only inside package
   FUNCTION sal_ok (jobid VARCHAR2, sal NUMBER) RETURN BOOLEAN IS
      min_sal NUMBER;
      max_sal NUMBER;
   BEGIN
      SELECT MIN(salary), MAX(salary) INTO min_sal, max_sal FROM employees
         WHERE job_id = jobid;
      RETURN (sal >= min_sal) AND (sal <= max_sal);
   END sal_ok;
   PROCEDURE raise_salary (emp_id NUMBER, amount NUMBER) IS
      sal NUMBER(8,2);
      jobid VARCHAR2(10);
   BEGIN
      SELECT job_id, salary INTO jobid, sal FROM employees
             WHERE employee_id = emp_id;
      IF sal_ok(jobid, sal + amount) THEN
         UPDATE employees SET salary = salary + amount WHERE employee_id = emp_id;
      ELSE
         RAISE invalid_salary;
      END IF;
   EXCEPTION  -- exception-handling part starts here
     WHEN invalid_salary THEN
       DBMS_OUTPUT.PUT_LINE('The salary is out of the specified range.');
   END raise_salary;
   FUNCTION nth_highest_salary (n NUMBER) RETURN EmpRecTyp IS
      emp_rec EmpRecTyp;
   BEGIN
      OPEN desc_salary;
      FOR i IN 1..n LOOP
         FETCH desc_salary INTO emp_rec;
      END LOOP;
      CLOSE desc_salary;
      RETURN emp_rec;
   END nth_highest_salary;
BEGIN  -- initialization part starts here
   INSERT INTO emp_audit VALUES (SYSDATE, USER, 'EMP_ADMIN');
   number_hired := 0;
END emp_admin;
/
-- calling the package procedures
DECLARE
  new_emp_id NUMBER(6);
BEGIN
  new_emp_id := emp_admin.hire_employee('Belden', 'Enrique', 'EBELDEN',
                   '555.111.2222', 'ST_CLERK', 2500, .1, 101, 110);
  DBMS_OUTPUT.PUT_LINE('The new employee id is ' || TO_CHAR(new_emp_id) );
  EMP_ADMIN.raise_salary(new_emp_id, 100);
  DBMS_OUTPUT.PUT_LINE('The 10th highest salary is '|| 
    TO_CHAR(emp_admin.nth_highest_salary(10).sal) || ', belonging to employee: ' 
    || TO_CHAR(emp_admin.nth_highest_salary(10).emp_id) );
  emp_admin.fire_employee(new_emp_id);
-- you could also delete the newly added employee as follows:
--  emp_admin.fire_employee('EBELDEN');
END;
/
`.trim()
export const expected = [
  new Token(Keyword.CREATE, "CREATE", 43, [
    new Token(TokenType.LineComment, "-- create the audit table to track changes", 0),
    new Token(TokenType.LineBreak, "\n", 42)
  ]),
  new Token(Keyword.TABLE, "TABLE", 50, [
    new Token(TokenType.WhiteSpace, " ", 49)
  ]),
  new Token(TokenType.Identifier, "emp_audit", 56, [
    new Token(TokenType.WhiteSpace, " ", 55)
  ]),
  new Token(TokenType.LeftParen, "(", 65),
  new Token(TokenType.Identifier, "date_of_action", 66),
  new Token(Keyword.DATE, "DATE", 81, [
    new Token(TokenType.WhiteSpace, " ", 80)
  ]),
  new Token(TokenType.Comma, ",", 85),
  new Token(TokenType.Identifier, "user_id", 87, [
    new Token(TokenType.WhiteSpace, " ", 86)
  ]),
  new Token(Keyword.VARCHAR2, "VARCHAR2", 95, [
    new Token(TokenType.WhiteSpace, " ", 94)
  ]),
  new Token(TokenType.LeftParen, "(", 103),
  new Token(TokenType.Number, "20", 104),
  new Token(TokenType.RightParen, ")", 106),
  new Token(TokenType.Comma, ",", 107),
  new Token(TokenType.Identifier, "package_name", 133, [
    new Token(TokenType.WhiteSpace, " ", 108),
    new Token(TokenType.LineBreak, "\n", 109),
    new Token(TokenType.WhiteSpace, "                       ", 110)
  ]),
  new Token(Keyword.VARCHAR2, "VARCHAR2", 146, [
    new Token(TokenType.WhiteSpace, " ", 145)
  ]),
  new Token(TokenType.LeftParen, "(", 154),
  new Token(TokenType.Number, "30", 155),
  new Token(TokenType.RightParen, ")", 157),
  new Token(TokenType.RightParen, ")", 158),
  new Token(TokenType.SemiColon, ";", 159),
  new Token(Keyword.CREATE, "CREATE", 162, [
    new Token(TokenType.LineBreak, "\n", 160),
    new Token(TokenType.LineBreak, "\n", 161)
  ]),
  new Token(Keyword.OR, "OR", 169, [
    new Token(TokenType.WhiteSpace, " ", 168)
  ]),
  new Token([TokenType.Identifier, Keyword.REPLACE], "REPLACE", 172, [
    new Token(TokenType.WhiteSpace, " ", 171)
  ]),
  new Token([TokenType.Identifier, Keyword.PACKAGE], "PACKAGE", 180, [
    new Token(TokenType.WhiteSpace, " ", 179)
  ]),
  new Token(TokenType.Identifier, "emp_admin", 188, [
    new Token(TokenType.WhiteSpace, " ", 187)
  ]),
  new Token(Keyword.AS, "AS", 198, [
    new Token(TokenType.WhiteSpace, " ", 197)
  ]),
  new Token(Keyword.TYPE, "TYPE", 259, [
    new Token(TokenType.LineBreak, "\n", 200),
    new Token(TokenType.LineComment, "-- Declare externally visible types, cursor, exception", 201),
    new Token(TokenType.LineBreak, "\n", 255),
    new Token(TokenType.WhiteSpace, "   ", 256)
  ]),
  new Token(TokenType.Identifier, "EmpRecTyp", 264, [
    new Token(TokenType.WhiteSpace, " ", 263)
  ]),
  new Token(Keyword.IS, "IS", 274, [
    new Token(TokenType.WhiteSpace, " ", 273)
  ]),
  new Token([TokenType.Identifier, Keyword.RECORD], "RECORD", 277, [
    new Token(TokenType.WhiteSpace, " ", 276)
  ]),
  new Token(TokenType.LeftParen, "(", 284, [
    new Token(TokenType.WhiteSpace, " ", 283)
  ]),
  new Token(TokenType.Identifier, "emp_id", 285),
  new Token(Keyword.NUMBER, "NUMBER", 292, [
    new Token(TokenType.WhiteSpace, " ", 291)
  ]),
  new Token(TokenType.Comma, ",", 298),
  new Token(TokenType.Identifier, "sal", 300, [
    new Token(TokenType.WhiteSpace, " ", 299)
  ]),
  new Token(Keyword.NUMBER, "NUMBER", 304, [
    new Token(TokenType.WhiteSpace, " ", 303)
  ]),
  new Token(TokenType.RightParen, ")", 310),
  new Token(TokenType.SemiColon, ";", 311),
  new Token(Keyword.CURSOR, "CURSOR", 316, [
    new Token(TokenType.LineBreak, "\n", 312),
    new Token(TokenType.WhiteSpace, "   ", 313)
  ]),
  new Token(TokenType.Identifier, "desc_salary", 323, [
    new Token(TokenType.WhiteSpace, " ", 322)
  ]),
  new Token([TokenType.Identifier, Keyword.RETURN], "RETURN", 335, [
    new Token(TokenType.WhiteSpace, " ", 334)
  ]),
  new Token(TokenType.Identifier, "EmpRecTyp", 342, [
    new Token(TokenType.WhiteSpace, " ", 341)
  ]),
  new Token(TokenType.SemiColon, ";", 351),
  new Token(TokenType.Identifier, "invalid_salary", 356, [
    new Token(TokenType.LineBreak, "\n", 352),
    new Token(TokenType.WhiteSpace, "   ", 353)
  ]),
  new Token(Keyword.EXCEPTION, "EXCEPTION", 371, [
    new Token(TokenType.WhiteSpace, " ", 370)
  ]),
  new Token(TokenType.SemiColon, ";", 380),
  new Token(Keyword.FUNCTION, "FUNCTION", 428, [
    new Token(TokenType.LineBreak, "\n", 381),
    new Token(TokenType.LineComment, "-- Declare externally callable subprograms", 382),
    new Token(TokenType.LineBreak, "\n", 424),
    new Token(TokenType.WhiteSpace, "   ", 425)
  ]),
  new Token(TokenType.Identifier, "hire_employee", 437, [
    new Token(TokenType.WhiteSpace, " ", 436)
  ]),
  new Token(TokenType.LeftParen, "(", 451, [
    new Token(TokenType.WhiteSpace, " ", 450)
  ]),
  new Token(TokenType.Identifier, "last_name", 452),
  new Token(Keyword.VARCHAR2, "VARCHAR2", 462, [
    new Token(TokenType.WhiteSpace, " ", 461)
  ]),
  new Token(TokenType.Comma, ",", 470),
  new Token(TokenType.Identifier, "first_name", 472, [
    new Token(TokenType.WhiteSpace, " ", 471)
  ]),
  new Token(Keyword.VARCHAR2, "VARCHAR2", 483, [
    new Token(TokenType.WhiteSpace, " ", 482)
  ]),
  new Token(TokenType.Comma, ",", 491),
  new Token(TokenType.Identifier, "email", 499, [
    new Token(TokenType.WhiteSpace, " ", 492),
    new Token(TokenType.LineBreak, "\n", 493),
    new Token(TokenType.WhiteSpace, "     ", 494)
  ]),
  new Token(Keyword.VARCHAR2, "VARCHAR2", 505, [
    new Token(TokenType.WhiteSpace, " ", 504)
  ]),
  new Token(TokenType.Comma, ",", 513),
  new Token(TokenType.Identifier, "phone_number", 515, [
    new Token(TokenType.WhiteSpace, " ", 514)
  ]),
  new Token(Keyword.VARCHAR2, "VARCHAR2", 528, [
    new Token(TokenType.WhiteSpace, " ", 527)
  ]),
  new Token(TokenType.Comma, ",", 536),
  new Token(TokenType.Identifier, "job_id", 538, [
    new Token(TokenType.WhiteSpace, " ", 537)
  ]),
  new Token(Keyword.VARCHAR2, "VARCHAR2", 545, [
    new Token(TokenType.WhiteSpace, " ", 544)
  ]),
  new Token(TokenType.Comma, ",", 553),
  new Token(TokenType.Identifier, "salary", 555, [
    new Token(TokenType.WhiteSpace, " ", 554)
  ]),
  new Token(Keyword.NUMBER, "NUMBER", 562, [
    new Token(TokenType.WhiteSpace, " ", 561)
  ]),
  new Token(TokenType.Comma, ",", 568),
  new Token(TokenType.Identifier, "commission_pct", 575, [
    new Token(TokenType.LineBreak, "\n", 569),
    new Token(TokenType.WhiteSpace, "     ", 570)
  ]),
  new Token(Keyword.NUMBER, "NUMBER", 590, [
    new Token(TokenType.WhiteSpace, " ", 589)
  ]),
  new Token(TokenType.Comma, ",", 596),
  new Token(TokenType.Identifier, "manager_id", 598, [
    new Token(TokenType.WhiteSpace, " ", 597)
  ]),
  new Token(Keyword.NUMBER, "NUMBER", 609, [
    new Token(TokenType.WhiteSpace, " ", 608)
  ]),
  new Token(TokenType.Comma, ",", 615),
  new Token(TokenType.Identifier, "department_id", 617, [
    new Token(TokenType.WhiteSpace, " ", 616)
  ]),
  new Token(Keyword.NUMBER, "NUMBER", 631, [
    new Token(TokenType.WhiteSpace, " ", 630)
  ]),
  new Token(TokenType.RightParen, ")", 637),
  new Token([TokenType.Identifier, Keyword.RETURN], "RETURN", 645, [
    new Token(TokenType.WhiteSpace, " ", 638),
    new Token(TokenType.LineBreak, "\n", 639),
    new Token(TokenType.WhiteSpace, "     ", 640)
  ]),
  new Token(Keyword.NUMBER, "NUMBER", 652, [
    new Token(TokenType.WhiteSpace, " ", 651)
  ]),
  new Token(TokenType.SemiColon, ";", 658),
  new Token(Keyword.PROCEDURE, "PROCEDURE", 663, [
    new Token(TokenType.LineBreak, "\n", 659),
    new Token(TokenType.WhiteSpace, "   ", 660)
  ]),
  new Token(TokenType.Identifier, "fire_employee", 673, [
    new Token(TokenType.WhiteSpace, " ", 672)
  ]),
  new Token(TokenType.LeftParen, "(", 687, [
    new Token(TokenType.WhiteSpace, " ", 686)
  ]),
  new Token(TokenType.Identifier, "emp_id", 688),
  new Token(Keyword.NUMBER, "NUMBER", 695, [
    new Token(TokenType.WhiteSpace, " ", 694)
  ]),
  new Token(TokenType.RightParen, ")", 701),
  new Token(TokenType.SemiColon, ";", 702),
  new Token(Keyword.PROCEDURE, "PROCEDURE", 732, [
    new Token(TokenType.WhiteSpace, " ", 703),
    new Token(TokenType.LineComment, "-- overloaded subprogram", 704),
    new Token(TokenType.LineBreak, "\n", 728),
    new Token(TokenType.WhiteSpace, "   ", 729)
  ]),
  new Token(TokenType.Identifier, "fire_employee", 742, [
    new Token(TokenType.WhiteSpace, " ", 741)
  ]),
  new Token(TokenType.LeftParen, "(", 756, [
    new Token(TokenType.WhiteSpace, " ", 755)
  ]),
  new Token(TokenType.Identifier, "emp_email", 757),
  new Token(Keyword.VARCHAR2, "VARCHAR2", 767, [
    new Token(TokenType.WhiteSpace, " ", 766)
  ]),
  new Token(TokenType.RightParen, ")", 775),
  new Token(TokenType.SemiColon, ";", 776),
  new Token(Keyword.PROCEDURE, "PROCEDURE", 806, [
    new Token(TokenType.WhiteSpace, " ", 777),
    new Token(TokenType.LineComment, "-- overloaded subprogram", 778),
    new Token(TokenType.LineBreak, "\n", 802),
    new Token(TokenType.WhiteSpace, "   ", 803)
  ]),
  new Token(TokenType.Identifier, "raise_salary", 816, [
    new Token(TokenType.WhiteSpace, " ", 815)
  ]),
  new Token(TokenType.LeftParen, "(", 829, [
    new Token(TokenType.WhiteSpace, " ", 828)
  ]),
  new Token(TokenType.Identifier, "emp_id", 830),
  new Token(Keyword.NUMBER, "NUMBER", 837, [
    new Token(TokenType.WhiteSpace, " ", 836)
  ]),
  new Token(TokenType.Comma, ",", 843),
  new Token(TokenType.Identifier, "amount", 845, [
    new Token(TokenType.WhiteSpace, " ", 844)
  ]),
  new Token(Keyword.NUMBER, "NUMBER", 852, [
    new Token(TokenType.WhiteSpace, " ", 851)
  ]),
  new Token(TokenType.RightParen, ")", 858),
  new Token(TokenType.SemiColon, ";", 859),
  new Token(Keyword.FUNCTION, "FUNCTION", 864, [
    new Token(TokenType.LineBreak, "\n", 860),
    new Token(TokenType.WhiteSpace, "   ", 861)
  ]),
  new Token(TokenType.Identifier, "nth_highest_salary", 873, [
    new Token(TokenType.WhiteSpace, " ", 872)
  ]),
  new Token(TokenType.LeftParen, "(", 892, [
    new Token(TokenType.WhiteSpace, " ", 891)
  ]),
  new Token(TokenType.Identifier, "n", 893),
  new Token(Keyword.NUMBER, "NUMBER", 895, [
    new Token(TokenType.WhiteSpace, " ", 894)
  ]),
  new Token(TokenType.RightParen, ")", 901),
  new Token([TokenType.Identifier, Keyword.RETURN], "RETURN", 903, [
    new Token(TokenType.WhiteSpace, " ", 902)
  ]),
  new Token(TokenType.Identifier, "EmpRecTyp", 910, [
    new Token(TokenType.WhiteSpace, " ", 909)
  ]),
  new Token(TokenType.SemiColon, ";", 919),
  new Token(Keyword.END, "END", 921, [
    new Token(TokenType.LineBreak, "\n", 920)
  ]),
  new Token(TokenType.Identifier, "emp_admin", 925, [
    new Token(TokenType.WhiteSpace, " ", 924)
  ]),
  new Token(TokenType.SemiColon, ";", 934),
  new Token(TokenType.Delimiter, "/", 936, [
    new Token(TokenType.LineBreak, "\n", 935)
  ]),
  new Token(Keyword.CREATE, "CREATE", 938, [
    new Token(TokenType.LineBreak, "\n", 937)
  ]),
  new Token(Keyword.OR, "OR", 945, [
    new Token(TokenType.WhiteSpace, " ", 944)
  ]),
  new Token([TokenType.Identifier, Keyword.REPLACE], "REPLACE", 948, [
    new Token(TokenType.WhiteSpace, " ", 947)
  ]),
  new Token([TokenType.Identifier, Keyword.PACKAGE], "PACKAGE", 956, [
    new Token(TokenType.WhiteSpace, " ", 955)
  ]),
  new Token([TokenType.Identifier, Keyword.BODY], "BODY", 964, [
    new Token(TokenType.WhiteSpace, " ", 963)
  ]),
  new Token(TokenType.Identifier, "emp_admin", 969, [
    new Token(TokenType.WhiteSpace, " ", 968)
  ]),
  new Token(Keyword.AS, "AS", 979, [
    new Token(TokenType.WhiteSpace, " ", 978)
  ]),
  new Token(TokenType.Identifier, "number_hired", 985, [
    new Token(TokenType.LineBreak, "\n", 981),
    new Token(TokenType.WhiteSpace, "   ", 982)
  ]),
  new Token(Keyword.NUMBER, "NUMBER", 998, [
    new Token(TokenType.WhiteSpace, " ", 997)
  ]),
  new Token(TokenType.SemiColon, ";", 1004),
  new Token(Keyword.CURSOR, "CURSOR", 1086, [
    new Token(TokenType.WhiteSpace, "  ", 1005),
    new Token(TokenType.LineComment, "-- visible only in this package", 1007),
    new Token(TokenType.LineBreak, "\n", 1038),
    new Token(TokenType.LineComment, "-- Fully define cursor specified in package", 1039),
    new Token(TokenType.LineBreak, "\n", 1082),
    new Token(TokenType.WhiteSpace, "   ", 1083)
  ]),
  new Token(TokenType.Identifier, "desc_salary", 1093, [
    new Token(TokenType.WhiteSpace, " ", 1092)
  ]),
  new Token([TokenType.Identifier, Keyword.RETURN], "RETURN", 1105, [
    new Token(TokenType.WhiteSpace, " ", 1104)
  ]),
  new Token(TokenType.Identifier, "EmpRecTyp", 1112, [
    new Token(TokenType.WhiteSpace, " ", 1111)
  ]),
  new Token(Keyword.IS, "IS", 1122, [
    new Token(TokenType.WhiteSpace, " ", 1121)
  ]),
  new Token(Keyword.SELECT, "SELECT", 1131, [
    new Token(TokenType.LineBreak, "\n", 1124),
    new Token(TokenType.WhiteSpace, "      ", 1125)
  ]),
  new Token(TokenType.Identifier, "employee_id", 1138, [
    new Token(TokenType.WhiteSpace, " ", 1137)
  ]),
  new Token(TokenType.Comma, ",", 1149),
  new Token(TokenType.Identifier, "salary", 1151, [
    new Token(TokenType.WhiteSpace, " ", 1150)
  ]),
  new Token(Keyword.FROM, "FROM", 1158, [
    new Token(TokenType.WhiteSpace, " ", 1157)
  ]),
  new Token(TokenType.Identifier, "employees", 1163, [
    new Token(TokenType.WhiteSpace, " ", 1162)
  ]),
  new Token(Keyword.ORDER, "ORDER", 1173, [
    new Token(TokenType.WhiteSpace, " ", 1172)
  ]),
  new Token(Keyword.BY, "BY", 1179, [
    new Token(TokenType.WhiteSpace, " ", 1178)
  ]),
  new Token(TokenType.Identifier, "salary", 1182, [
    new Token(TokenType.WhiteSpace, " ", 1181)
  ]),
  new Token(Keyword.DESC, "DESC", 1189, [
    new Token(TokenType.WhiteSpace, " ", 1188)
  ]),
  new Token(TokenType.SemiColon, ";", 1193),
  new Token(Keyword.FUNCTION, "FUNCTION", 1247, [
    new Token(TokenType.LineBreak, "\n", 1194),
    new Token(TokenType.LineComment, "-- Fully define subprograms specified in package", 1195),
    new Token(TokenType.LineBreak, "\n", 1243),
    new Token(TokenType.WhiteSpace, "   ", 1244)
  ]),
  new Token(TokenType.Identifier, "hire_employee", 1256, [
    new Token(TokenType.WhiteSpace, " ", 1255)
  ]),
  new Token(TokenType.LeftParen, "(", 1270, [
    new Token(TokenType.WhiteSpace, " ", 1269)
  ]),
  new Token(TokenType.Identifier, "last_name", 1271),
  new Token(Keyword.VARCHAR2, "VARCHAR2", 1281, [
    new Token(TokenType.WhiteSpace, " ", 1280)
  ]),
  new Token(TokenType.Comma, ",", 1289),
  new Token(TokenType.Identifier, "first_name", 1291, [
    new Token(TokenType.WhiteSpace, " ", 1290)
  ]),
  new Token(Keyword.VARCHAR2, "VARCHAR2", 1302, [
    new Token(TokenType.WhiteSpace, " ", 1301)
  ]),
  new Token(TokenType.Comma, ",", 1310),
  new Token(TokenType.Identifier, "email", 1318, [
    new Token(TokenType.WhiteSpace, " ", 1311),
    new Token(TokenType.LineBreak, "\n", 1312),
    new Token(TokenType.WhiteSpace, "     ", 1313)
  ]),
  new Token(Keyword.VARCHAR2, "VARCHAR2", 1324, [
    new Token(TokenType.WhiteSpace, " ", 1323)
  ]),
  new Token(TokenType.Comma, ",", 1332),
  new Token(TokenType.Identifier, "phone_number", 1334, [
    new Token(TokenType.WhiteSpace, " ", 1333)
  ]),
  new Token(Keyword.VARCHAR2, "VARCHAR2", 1347, [
    new Token(TokenType.WhiteSpace, " ", 1346)
  ]),
  new Token(TokenType.Comma, ",", 1355),
  new Token(TokenType.Identifier, "job_id", 1357, [
    new Token(TokenType.WhiteSpace, " ", 1356)
  ]),
  new Token(Keyword.VARCHAR2, "VARCHAR2", 1364, [
    new Token(TokenType.WhiteSpace, " ", 1363)
  ]),
  new Token(TokenType.Comma, ",", 1372),
  new Token(TokenType.Identifier, "salary", 1374, [
    new Token(TokenType.WhiteSpace, " ", 1373)
  ]),
  new Token(Keyword.NUMBER, "NUMBER", 1381, [
    new Token(TokenType.WhiteSpace, " ", 1380)
  ]),
  new Token(TokenType.Comma, ",", 1387),
  new Token(TokenType.Identifier, "commission_pct", 1394, [
    new Token(TokenType.LineBreak, "\n", 1388),
    new Token(TokenType.WhiteSpace, "     ", 1389)
  ]),
  new Token(Keyword.NUMBER, "NUMBER", 1409, [
    new Token(TokenType.WhiteSpace, " ", 1408)
  ]),
  new Token(TokenType.Comma, ",", 1415),
  new Token(TokenType.Identifier, "manager_id", 1417, [
    new Token(TokenType.WhiteSpace, " ", 1416)
  ]),
  new Token(Keyword.NUMBER, "NUMBER", 1428, [
    new Token(TokenType.WhiteSpace, " ", 1427)
  ]),
  new Token(TokenType.Comma, ",", 1434),
  new Token(TokenType.Identifier, "department_id", 1436, [
    new Token(TokenType.WhiteSpace, " ", 1435)
  ]),
  new Token(Keyword.NUMBER, "NUMBER", 1450, [
    new Token(TokenType.WhiteSpace, " ", 1449)
  ]),
  new Token(TokenType.RightParen, ")", 1456),
  new Token([TokenType.Identifier, Keyword.RETURN], "RETURN", 1464, [
    new Token(TokenType.WhiteSpace, " ", 1457),
    new Token(TokenType.LineBreak, "\n", 1458),
    new Token(TokenType.WhiteSpace, "     ", 1459)
  ]),
  new Token(Keyword.NUMBER, "NUMBER", 1471, [
    new Token(TokenType.WhiteSpace, " ", 1470)
  ]),
  new Token(Keyword.IS, "IS", 1478, [
    new Token(TokenType.WhiteSpace, " ", 1477)
  ]),
  new Token(TokenType.Identifier, "new_emp_id", 1486, [
    new Token(TokenType.LineBreak, "\n", 1480),
    new Token(TokenType.WhiteSpace, "     ", 1481)
  ]),
  new Token(Keyword.NUMBER, "NUMBER", 1497, [
    new Token(TokenType.WhiteSpace, " ", 1496)
  ]),
  new Token(TokenType.SemiColon, ";", 1503),
  new Token(Keyword.BEGIN, "BEGIN", 1508, [
    new Token(TokenType.LineBreak, "\n", 1504),
    new Token(TokenType.WhiteSpace, "   ", 1505)
  ]),
  new Token(Keyword.SELECT, "SELECT", 1520, [
    new Token(TokenType.LineBreak, "\n", 1513),
    new Token(TokenType.WhiteSpace, "      ", 1514)
  ]),
  new Token(TokenType.Identifier, "employees_seq", 1527, [
    new Token(TokenType.WhiteSpace, " ", 1526)
  ]),
  new Token(TokenType.Dot, ".", 1540),
  new Token(TokenType.Identifier, "NEXTVAL", 1541),
  new Token(Keyword.INTO, "INTO", 1549, [
    new Token(TokenType.WhiteSpace, " ", 1548)
  ]),
  new Token(TokenType.Identifier, "new_emp_id", 1554, [
    new Token(TokenType.WhiteSpace, " ", 1553)
  ]),
  new Token(Keyword.FROM, "FROM", 1565, [
    new Token(TokenType.WhiteSpace, " ", 1564)
  ]),
  new Token(TokenType.Identifier, "dual", 1570, [
    new Token(TokenType.WhiteSpace, " ", 1569)
  ]),
  new Token(TokenType.SemiColon, ";", 1574),
  new Token(Keyword.INSERT, "INSERT", 1582, [
    new Token(TokenType.LineBreak, "\n", 1575),
    new Token(TokenType.WhiteSpace, "      ", 1576)
  ]),
  new Token(Keyword.INTO, "INTO", 1589, [
    new Token(TokenType.WhiteSpace, " ", 1588)
  ]),
  new Token(TokenType.Identifier, "employees", 1594, [
    new Token(TokenType.WhiteSpace, " ", 1593)
  ]),
  new Token(Keyword.VALUES, "VALUES", 1604, [
    new Token(TokenType.WhiteSpace, " ", 1603)
  ]),
  new Token(TokenType.LeftParen, "(", 1611, [
    new Token(TokenType.WhiteSpace, " ", 1610)
  ]),
  new Token(TokenType.Identifier, "new_emp_id", 1612),
  new Token(TokenType.Comma, ",", 1622),
  new Token(TokenType.Identifier, "last_name", 1624, [
    new Token(TokenType.WhiteSpace, " ", 1623)
  ]),
  new Token(TokenType.Comma, ",", 1633),
  new Token(TokenType.Identifier, "first_name", 1635, [
    new Token(TokenType.WhiteSpace, " ", 1634)
  ]),
  new Token(TokenType.Comma, ",", 1645),
  new Token(TokenType.Identifier, "email", 1647, [
    new Token(TokenType.WhiteSpace, " ", 1646)
  ]),
  new Token(TokenType.Comma, ",", 1652),
  new Token(TokenType.Identifier, "phone_number", 1662, [
    new Token(TokenType.LineBreak, "\n", 1653),
    new Token(TokenType.WhiteSpace, "        ", 1654)
  ]),
  new Token(TokenType.Comma, ",", 1674),
  new Token(Keyword.SYSDATE, "SYSDATE", 1676, [
    new Token(TokenType.WhiteSpace, " ", 1675)
  ]),
  new Token(TokenType.Comma, ",", 1683),
  new Token(TokenType.Identifier, "job_id", 1685, [
    new Token(TokenType.WhiteSpace, " ", 1684)
  ]),
  new Token(TokenType.Comma, ",", 1691),
  new Token(TokenType.Identifier, "salary", 1693, [
    new Token(TokenType.WhiteSpace, " ", 1692)
  ]),
  new Token(TokenType.Comma, ",", 1699),
  new Token(TokenType.Identifier, "commission_pct", 1701, [
    new Token(TokenType.WhiteSpace, " ", 1700)
  ]),
  new Token(TokenType.Comma, ",", 1715),
  new Token(TokenType.Identifier, "manager_id", 1717, [
    new Token(TokenType.WhiteSpace, " ", 1716)
  ]),
  new Token(TokenType.Comma, ",", 1727),
  new Token(TokenType.Identifier, "department_id", 1737, [
    new Token(TokenType.LineBreak, "\n", 1728),
    new Token(TokenType.WhiteSpace, "        ", 1729)
  ]),
  new Token(TokenType.RightParen, ")", 1750),
  new Token(TokenType.SemiColon, ";", 1751),
  new Token(TokenType.Identifier, "number_hired", 1759, [
    new Token(TokenType.LineBreak, "\n", 1752),
    new Token(TokenType.WhiteSpace, "      ", 1753)
  ]),
  new Token([TokenType.Operator, Keyword.OPE_ASSIGN], ":=", 1772, [
    new Token(TokenType.WhiteSpace, " ", 1771)
  ]),
  new Token(TokenType.Identifier, "number_hired", 1775, [
    new Token(TokenType.WhiteSpace, " ", 1774)
  ]),
  new Token(TokenType.Operator, "+", 1788, [
    new Token(TokenType.WhiteSpace, " ", 1787)
  ]),
  new Token(TokenType.Number, "1", 1790, [
    new Token(TokenType.WhiteSpace, " ", 1789)
  ]),
  new Token(TokenType.SemiColon, ";", 1791),
  new Token(TokenType.Identifier, "DBMS_OUTPUT", 1799, [
    new Token(TokenType.LineBreak, "\n", 1792),
    new Token(TokenType.WhiteSpace, "      ", 1793)
  ]),
  new Token(TokenType.Dot, ".", 1810),
  new Token(TokenType.Identifier, "PUT_LINE", 1811),
  new Token(TokenType.LeftParen, "(", 1819),
  new Token(TokenType.String, "'The number of employees hired is '", 1820),
  new Token(TokenType.Operator, "||", 1884, [
    new Token(TokenType.WhiteSpace, " ", 1855),
    new Token(TokenType.LineBreak, "\n", 1856),
    new Token(TokenType.WhiteSpace, "                           ", 1857)
  ]),
  new Token(TokenType.Identifier, "TO_CHAR", 1887, [
    new Token(TokenType.WhiteSpace, " ", 1886)
  ]),
  new Token(TokenType.LeftParen, "(", 1894),
  new Token(TokenType.Identifier, "number_hired", 1895),
  new Token(TokenType.RightParen, ")", 1907),
  new Token(TokenType.RightParen, ")", 1909, [
    new Token(TokenType.WhiteSpace, " ", 1908)
  ]),
  new Token(TokenType.SemiColon, ";", 1910),
  new Token([TokenType.Identifier, Keyword.RETURN], "RETURN", 1921, [
    new Token(TokenType.WhiteSpace, "   ", 1911),
    new Token(TokenType.LineBreak, "\n", 1914),
    new Token(TokenType.WhiteSpace, "      ", 1915)
  ]),
  new Token(TokenType.Identifier, "new_emp_id", 1928, [
    new Token(TokenType.WhiteSpace, " ", 1927)
  ]),
  new Token(TokenType.SemiColon, ";", 1938),
  new Token(Keyword.END, "END", 1943, [
    new Token(TokenType.LineBreak, "\n", 1939),
    new Token(TokenType.WhiteSpace, "   ", 1940)
  ]),
  new Token(TokenType.Identifier, "hire_employee", 1947, [
    new Token(TokenType.WhiteSpace, " ", 1946)
  ]),
  new Token(TokenType.SemiColon, ";", 1960),
  new Token(Keyword.PROCEDURE, "PROCEDURE", 1965, [
    new Token(TokenType.LineBreak, "\n", 1961),
    new Token(TokenType.WhiteSpace, "   ", 1962)
  ]),
  new Token(TokenType.Identifier, "fire_employee", 1975, [
    new Token(TokenType.WhiteSpace, " ", 1974)
  ]),
  new Token(TokenType.LeftParen, "(", 1989, [
    new Token(TokenType.WhiteSpace, " ", 1988)
  ]),
  new Token(TokenType.Identifier, "emp_id", 1990),
  new Token(Keyword.NUMBER, "NUMBER", 1997, [
    new Token(TokenType.WhiteSpace, " ", 1996)
  ]),
  new Token(TokenType.RightParen, ")", 2003),
  new Token(Keyword.IS, "IS", 2005, [
    new Token(TokenType.WhiteSpace, " ", 2004)
  ]),
  new Token(Keyword.BEGIN, "BEGIN", 2011, [
    new Token(TokenType.LineBreak, "\n", 2007),
    new Token(TokenType.WhiteSpace, "   ", 2008)
  ]),
  new Token(Keyword.DELETE, "DELETE", 2023, [
    new Token(TokenType.LineBreak, "\n", 2016),
    new Token(TokenType.WhiteSpace, "      ", 2017)
  ]),
  new Token(Keyword.FROM, "FROM", 2030, [
    new Token(TokenType.WhiteSpace, " ", 2029)
  ]),
  new Token(TokenType.Identifier, "employees", 2035, [
    new Token(TokenType.WhiteSpace, " ", 2034)
  ]),
  new Token(Keyword.WHERE, "WHERE", 2045, [
    new Token(TokenType.WhiteSpace, " ", 2044)
  ]),
  new Token(TokenType.Identifier, "employee_id", 2051, [
    new Token(TokenType.WhiteSpace, " ", 2050)
  ]),
  new Token([TokenType.Operator, Keyword.OPE_EQ], "=", 2063, [
    new Token(TokenType.WhiteSpace, " ", 2062)
  ]),
  new Token(TokenType.Identifier, "emp_id", 2065, [
    new Token(TokenType.WhiteSpace, " ", 2064)
  ]),
  new Token(TokenType.SemiColon, ";", 2071),
  new Token(Keyword.END, "END", 2076, [
    new Token(TokenType.LineBreak, "\n", 2072),
    new Token(TokenType.WhiteSpace, "   ", 2073)
  ]),
  new Token(TokenType.Identifier, "fire_employee", 2080, [
    new Token(TokenType.WhiteSpace, " ", 2079)
  ]),
  new Token(TokenType.SemiColon, ";", 2093),
  new Token(Keyword.PROCEDURE, "PROCEDURE", 2098, [
    new Token(TokenType.LineBreak, "\n", 2094),
    new Token(TokenType.WhiteSpace, "   ", 2095)
  ]),
  new Token(TokenType.Identifier, "fire_employee", 2108, [
    new Token(TokenType.WhiteSpace, " ", 2107)
  ]),
  new Token(TokenType.LeftParen, "(", 2122, [
    new Token(TokenType.WhiteSpace, " ", 2121)
  ]),
  new Token(TokenType.Identifier, "emp_email", 2123),
  new Token(Keyword.VARCHAR2, "VARCHAR2", 2133, [
    new Token(TokenType.WhiteSpace, " ", 2132)
  ]),
  new Token(TokenType.RightParen, ")", 2141),
  new Token(Keyword.IS, "IS", 2143, [
    new Token(TokenType.WhiteSpace, " ", 2142)
  ]),
  new Token(Keyword.BEGIN, "BEGIN", 2149, [
    new Token(TokenType.LineBreak, "\n", 2145),
    new Token(TokenType.WhiteSpace, "   ", 2146)
  ]),
  new Token(Keyword.DELETE, "DELETE", 2161, [
    new Token(TokenType.LineBreak, "\n", 2154),
    new Token(TokenType.WhiteSpace, "      ", 2155)
  ]),
  new Token(Keyword.FROM, "FROM", 2168, [
    new Token(TokenType.WhiteSpace, " ", 2167)
  ]),
  new Token(TokenType.Identifier, "employees", 2173, [
    new Token(TokenType.WhiteSpace, " ", 2172)
  ]),
  new Token(Keyword.WHERE, "WHERE", 2183, [
    new Token(TokenType.WhiteSpace, " ", 2182)
  ]),
  new Token(TokenType.Identifier, "email", 2189, [
    new Token(TokenType.WhiteSpace, " ", 2188)
  ]),
  new Token([TokenType.Operator, Keyword.OPE_EQ], "=", 2195, [
    new Token(TokenType.WhiteSpace, " ", 2194)
  ]),
  new Token(TokenType.Identifier, "emp_email", 2197, [
    new Token(TokenType.WhiteSpace, " ", 2196)
  ]),
  new Token(TokenType.SemiColon, ";", 2206),
  new Token(Keyword.END, "END", 2211, [
    new Token(TokenType.LineBreak, "\n", 2207),
    new Token(TokenType.WhiteSpace, "   ", 2208)
  ]),
  new Token(TokenType.Identifier, "fire_employee", 2215, [
    new Token(TokenType.WhiteSpace, " ", 2214)
  ]),
  new Token(TokenType.SemiColon, ";", 2228),
  new Token(Keyword.FUNCTION, "FUNCTION", 2291, [
    new Token(TokenType.LineBreak, "\n", 2229),
    new Token(TokenType.WhiteSpace, "  ", 2230),
    new Token(TokenType.LineComment, "-- Define local function, available only inside package", 2232),
    new Token(TokenType.LineBreak, "\n", 2287),
    new Token(TokenType.WhiteSpace, "   ", 2288)
  ]),
  new Token(TokenType.Identifier, "sal_ok", 2300, [
    new Token(TokenType.WhiteSpace, " ", 2299)
  ]),
  new Token(TokenType.LeftParen, "(", 2307, [
    new Token(TokenType.WhiteSpace, " ", 2306)
  ]),
  new Token(TokenType.Identifier, "jobid", 2308),
  new Token(Keyword.VARCHAR2, "VARCHAR2", 2314, [
    new Token(TokenType.WhiteSpace, " ", 2313)
  ]),
  new Token(TokenType.Comma, ",", 2322),
  new Token(TokenType.Identifier, "sal", 2324, [
    new Token(TokenType.WhiteSpace, " ", 2323)
  ]),
  new Token(Keyword.NUMBER, "NUMBER", 2328, [
    new Token(TokenType.WhiteSpace, " ", 2327)
  ]),
  new Token(TokenType.RightParen, ")", 2334),
  new Token([TokenType.Identifier, Keyword.RETURN], "RETURN", 2336, [
    new Token(TokenType.WhiteSpace, " ", 2335)
  ]),
  new Token(TokenType.Identifier, "BOOLEAN", 2343, [
    new Token(TokenType.WhiteSpace, " ", 2342)
  ]),
  new Token(Keyword.IS, "IS", 2351, [
    new Token(TokenType.WhiteSpace, " ", 2350)
  ]),
  new Token(TokenType.Identifier, "min_sal", 2360, [
    new Token(TokenType.LineBreak, "\n", 2353),
    new Token(TokenType.WhiteSpace, "      ", 2354)
  ]),
  new Token(Keyword.NUMBER, "NUMBER", 2368, [
    new Token(TokenType.WhiteSpace, " ", 2367)
  ]),
  new Token(TokenType.SemiColon, ";", 2374),
  new Token(TokenType.Identifier, "max_sal", 2382, [
    new Token(TokenType.LineBreak, "\n", 2375),
    new Token(TokenType.WhiteSpace, "      ", 2376)
  ]),
  new Token(Keyword.NUMBER, "NUMBER", 2390, [
    new Token(TokenType.WhiteSpace, " ", 2389)
  ]),
  new Token(TokenType.SemiColon, ";", 2396),
  new Token(Keyword.BEGIN, "BEGIN", 2401, [
    new Token(TokenType.LineBreak, "\n", 2397),
    new Token(TokenType.WhiteSpace, "   ", 2398)
  ]),
  new Token(Keyword.SELECT, "SELECT", 2413, [
    new Token(TokenType.LineBreak, "\n", 2406),
    new Token(TokenType.WhiteSpace, "      ", 2407)
  ]),
  new Token(TokenType.Identifier, "MIN", 2420, [
    new Token(TokenType.WhiteSpace, " ", 2419)
  ]),
  new Token(TokenType.LeftParen, "(", 2423),
  new Token(TokenType.Identifier, "salary", 2424),
  new Token(TokenType.RightParen, ")", 2430),
  new Token(TokenType.Comma, ",", 2431),
  new Token(TokenType.Identifier, "MAX", 2433, [
    new Token(TokenType.WhiteSpace, " ", 2432)
  ]),
  new Token(TokenType.LeftParen, "(", 2436),
  new Token(TokenType.Identifier, "salary", 2437),
  new Token(TokenType.RightParen, ")", 2443),
  new Token(Keyword.INTO, "INTO", 2445, [
    new Token(TokenType.WhiteSpace, " ", 2444)
  ]),
  new Token(TokenType.Identifier, "min_sal", 2450, [
    new Token(TokenType.WhiteSpace, " ", 2449)
  ]),
  new Token(TokenType.Comma, ",", 2457),
  new Token(TokenType.Identifier, "max_sal", 2459, [
    new Token(TokenType.WhiteSpace, " ", 2458)
  ]),
  new Token(Keyword.FROM, "FROM", 2467, [
    new Token(TokenType.WhiteSpace, " ", 2466)
  ]),
  new Token(TokenType.Identifier, "employees", 2472, [
    new Token(TokenType.WhiteSpace, " ", 2471)
  ]),
  new Token(Keyword.WHERE, "WHERE", 2491, [
    new Token(TokenType.LineBreak, "\n", 2481),
    new Token(TokenType.WhiteSpace, "         ", 2482)
  ]),
  new Token(TokenType.Identifier, "job_id", 2497, [
    new Token(TokenType.WhiteSpace, " ", 2496)
  ]),
  new Token([TokenType.Operator, Keyword.OPE_EQ], "=", 2504, [
    new Token(TokenType.WhiteSpace, " ", 2503)
  ]),
  new Token(TokenType.Identifier, "jobid", 2506, [
    new Token(TokenType.WhiteSpace, " ", 2505)
  ]),
  new Token(TokenType.SemiColon, ";", 2511),
  new Token([TokenType.Identifier, Keyword.RETURN], "RETURN", 2519, [
    new Token(TokenType.LineBreak, "\n", 2512),
    new Token(TokenType.WhiteSpace, "      ", 2513)
  ]),
  new Token(TokenType.LeftParen, "(", 2526, [
    new Token(TokenType.WhiteSpace, " ", 2525)
  ]),
  new Token(TokenType.Identifier, "sal", 2527),
  new Token(TokenType.Operator, ">=", 2531, [
    new Token(TokenType.WhiteSpace, " ", 2530)
  ]),
  new Token(TokenType.Identifier, "min_sal", 2534, [
    new Token(TokenType.WhiteSpace, " ", 2533)
  ]),
  new Token(TokenType.RightParen, ")", 2541),
  new Token(Keyword.AND, "AND", 2543, [
    new Token(TokenType.WhiteSpace, " ", 2542)
  ]),
  new Token(TokenType.LeftParen, "(", 2547, [
    new Token(TokenType.WhiteSpace, " ", 2546)
  ]),
  new Token(TokenType.Identifier, "sal", 2548),
  new Token(TokenType.Operator, "<=", 2552, [
    new Token(TokenType.WhiteSpace, " ", 2551)
  ]),
  new Token(TokenType.Identifier, "max_sal", 2555, [
    new Token(TokenType.WhiteSpace, " ", 2554)
  ]),
  new Token(TokenType.RightParen, ")", 2562),
  new Token(TokenType.SemiColon, ";", 2563),
  new Token(Keyword.END, "END", 2568, [
    new Token(TokenType.LineBreak, "\n", 2564),
    new Token(TokenType.WhiteSpace, "   ", 2565)
  ]),
  new Token(TokenType.Identifier, "sal_ok", 2572, [
    new Token(TokenType.WhiteSpace, " ", 2571)
  ]),
  new Token(TokenType.SemiColon, ";", 2578),
  new Token(Keyword.PROCEDURE, "PROCEDURE", 2583, [
    new Token(TokenType.LineBreak, "\n", 2579),
    new Token(TokenType.WhiteSpace, "   ", 2580)
  ]),
  new Token(TokenType.Identifier, "raise_salary", 2593, [
    new Token(TokenType.WhiteSpace, " ", 2592)
  ]),
  new Token(TokenType.LeftParen, "(", 2606, [
    new Token(TokenType.WhiteSpace, " ", 2605)
  ]),
  new Token(TokenType.Identifier, "emp_id", 2607),
  new Token(Keyword.NUMBER, "NUMBER", 2614, [
    new Token(TokenType.WhiteSpace, " ", 2613)
  ]),
  new Token(TokenType.Comma, ",", 2620),
  new Token(TokenType.Identifier, "amount", 2622, [
    new Token(TokenType.WhiteSpace, " ", 2621)
  ]),
  new Token(Keyword.NUMBER, "NUMBER", 2629, [
    new Token(TokenType.WhiteSpace, " ", 2628)
  ]),
  new Token(TokenType.RightParen, ")", 2635),
  new Token(Keyword.IS, "IS", 2637, [
    new Token(TokenType.WhiteSpace, " ", 2636)
  ]),
  new Token(TokenType.Identifier, "sal", 2646, [
    new Token(TokenType.LineBreak, "\n", 2639),
    new Token(TokenType.WhiteSpace, "      ", 2640)
  ]),
  new Token(Keyword.NUMBER, "NUMBER", 2650, [
    new Token(TokenType.WhiteSpace, " ", 2649)
  ]),
  new Token(TokenType.LeftParen, "(", 2656),
  new Token(TokenType.Number, "8", 2657),
  new Token(TokenType.Comma, ",", 2658),
  new Token(TokenType.Number, "2", 2659),
  new Token(TokenType.RightParen, ")", 2660),
  new Token(TokenType.SemiColon, ";", 2661),
  new Token(TokenType.Identifier, "jobid", 2669, [
    new Token(TokenType.LineBreak, "\n", 2662),
    new Token(TokenType.WhiteSpace, "      ", 2663)
  ]),
  new Token(Keyword.VARCHAR2, "VARCHAR2", 2675, [
    new Token(TokenType.WhiteSpace, " ", 2674)
  ]),
  new Token(TokenType.LeftParen, "(", 2683),
  new Token(TokenType.Number, "10", 2684),
  new Token(TokenType.RightParen, ")", 2686),
  new Token(TokenType.SemiColon, ";", 2687),
  new Token(Keyword.BEGIN, "BEGIN", 2692, [
    new Token(TokenType.LineBreak, "\n", 2688),
    new Token(TokenType.WhiteSpace, "   ", 2689)
  ]),
  new Token(Keyword.SELECT, "SELECT", 2704, [
    new Token(TokenType.LineBreak, "\n", 2697),
    new Token(TokenType.WhiteSpace, "      ", 2698)
  ]),
  new Token(TokenType.Identifier, "job_id", 2711, [
    new Token(TokenType.WhiteSpace, " ", 2710)
  ]),
  new Token(TokenType.Comma, ",", 2717),
  new Token(TokenType.Identifier, "salary", 2719, [
    new Token(TokenType.WhiteSpace, " ", 2718)
  ]),
  new Token(Keyword.INTO, "INTO", 2726, [
    new Token(TokenType.WhiteSpace, " ", 2725)
  ]),
  new Token(TokenType.Identifier, "jobid", 2731, [
    new Token(TokenType.WhiteSpace, " ", 2730)
  ]),
  new Token(TokenType.Comma, ",", 2736),
  new Token(TokenType.Identifier, "sal", 2738, [
    new Token(TokenType.WhiteSpace, " ", 2737)
  ]),
  new Token(Keyword.FROM, "FROM", 2742, [
    new Token(TokenType.WhiteSpace, " ", 2741)
  ]),
  new Token(TokenType.Identifier, "employees", 2747, [
    new Token(TokenType.WhiteSpace, " ", 2746)
  ]),
  new Token(Keyword.WHERE, "WHERE", 2770, [
    new Token(TokenType.LineBreak, "\n", 2756),
    new Token(TokenType.WhiteSpace, "             ", 2757)
  ]),
  new Token(TokenType.Identifier, "employee_id", 2776, [
    new Token(TokenType.WhiteSpace, " ", 2775)
  ]),
  new Token([TokenType.Operator, Keyword.OPE_EQ], "=", 2788, [
    new Token(TokenType.WhiteSpace, " ", 2787)
  ]),
  new Token(TokenType.Identifier, "emp_id", 2790, [
    new Token(TokenType.WhiteSpace, " ", 2789)
  ]),
  new Token(TokenType.SemiColon, ";", 2796),
  new Token(Keyword.IF, "IF", 2804, [
    new Token(TokenType.LineBreak, "\n", 2797),
    new Token(TokenType.WhiteSpace, "      ", 2798)
  ]),
  new Token(TokenType.Identifier, "sal_ok", 2807, [
    new Token(TokenType.WhiteSpace, " ", 2806)
  ]),
  new Token(TokenType.LeftParen, "(", 2813),
  new Token(TokenType.Identifier, "jobid", 2814),
  new Token(TokenType.Comma, ",", 2819),
  new Token(TokenType.Identifier, "sal", 2821, [
    new Token(TokenType.WhiteSpace, " ", 2820)
  ]),
  new Token(TokenType.Operator, "+", 2825, [
    new Token(TokenType.WhiteSpace, " ", 2824)
  ]),
  new Token(TokenType.Identifier, "amount", 2827, [
    new Token(TokenType.WhiteSpace, " ", 2826)
  ]),
  new Token(TokenType.RightParen, ")", 2833),
  new Token(Keyword.THEN, "THEN", 2835, [
    new Token(TokenType.WhiteSpace, " ", 2834)
  ]),
  new Token(Keyword.UPDATE, "UPDATE", 2849, [
    new Token(TokenType.LineBreak, "\n", 2839),
    new Token(TokenType.WhiteSpace, "         ", 2840)
  ]),
  new Token(TokenType.Identifier, "employees", 2856, [
    new Token(TokenType.WhiteSpace, " ", 2855)
  ]),
  new Token(Keyword.SET, "SET", 2866, [
    new Token(TokenType.WhiteSpace, " ", 2865)
  ]),
  new Token(TokenType.Identifier, "salary", 2870, [
    new Token(TokenType.WhiteSpace, " ", 2869)
  ]),
  new Token([TokenType.Operator, Keyword.OPE_EQ], "=", 2877, [
    new Token(TokenType.WhiteSpace, " ", 2876)
  ]),
  new Token(TokenType.Identifier, "salary", 2879, [
    new Token(TokenType.WhiteSpace, " ", 2878)
  ]),
  new Token(TokenType.Operator, "+", 2886, [
    new Token(TokenType.WhiteSpace, " ", 2885)
  ]),
  new Token(TokenType.Identifier, "amount", 2888, [
    new Token(TokenType.WhiteSpace, " ", 2887)
  ]),
  new Token(Keyword.WHERE, "WHERE", 2895, [
    new Token(TokenType.WhiteSpace, " ", 2894)
  ]),
  new Token(TokenType.Identifier, "employee_id", 2901, [
    new Token(TokenType.WhiteSpace, " ", 2900)
  ]),
  new Token([TokenType.Operator, Keyword.OPE_EQ], "=", 2913, [
    new Token(TokenType.WhiteSpace, " ", 2912)
  ]),
  new Token(TokenType.Identifier, "emp_id", 2915, [
    new Token(TokenType.WhiteSpace, " ", 2914)
  ]),
  new Token(TokenType.SemiColon, ";", 2921),
  new Token(Keyword.ELSE, "ELSE", 2929, [
    new Token(TokenType.LineBreak, "\n", 2922),
    new Token(TokenType.WhiteSpace, "      ", 2923)
  ]),
  new Token(TokenType.Identifier, "RAISE", 2943, [
    new Token(TokenType.LineBreak, "\n", 2933),
    new Token(TokenType.WhiteSpace, "         ", 2934)
  ]),
  new Token(TokenType.Identifier, "invalid_salary", 2949, [
    new Token(TokenType.WhiteSpace, " ", 2948)
  ]),
  new Token(TokenType.SemiColon, ";", 2963),
  new Token(Keyword.END, "END", 2971, [
    new Token(TokenType.LineBreak, "\n", 2964),
    new Token(TokenType.WhiteSpace, "      ", 2965)
  ]),
  new Token(Keyword.IF, "IF", 2975, [
    new Token(TokenType.WhiteSpace, " ", 2974)
  ]),
  new Token(TokenType.SemiColon, ";", 2977),
  new Token(Keyword.EXCEPTION, "EXCEPTION", 2982, [
    new Token(TokenType.LineBreak, "\n", 2978),
    new Token(TokenType.WhiteSpace, "   ", 2979)
  ]),
  new Token(Keyword.WHEN, "WHEN", 3037, [
    new Token(TokenType.WhiteSpace, "  ", 2991),
    new Token(TokenType.LineComment, "-- exception-handling part starts here", 2993),
    new Token(TokenType.LineBreak, "\n", 3031),
    new Token(TokenType.WhiteSpace, "     ", 3032)
  ]),
  new Token(TokenType.Identifier, "invalid_salary", 3042, [
    new Token(TokenType.WhiteSpace, " ", 3041)
  ]),
  new Token(Keyword.THEN, "THEN", 3057, [
    new Token(TokenType.WhiteSpace, " ", 3056)
  ]),
  new Token(TokenType.Identifier, "DBMS_OUTPUT", 3069, [
    new Token(TokenType.LineBreak, "\n", 3061),
    new Token(TokenType.WhiteSpace, "       ", 3062)
  ]),
  new Token(TokenType.Dot, ".", 3080),
  new Token(TokenType.Identifier, "PUT_LINE", 3081),
  new Token(TokenType.LeftParen, "(", 3089),
  new Token(TokenType.String, "'The salary is out of the specified range.'", 3090),
  new Token(TokenType.RightParen, ")", 3133),
  new Token(TokenType.SemiColon, ";", 3134),
  new Token(Keyword.END, "END", 3139, [
    new Token(TokenType.LineBreak, "\n", 3135),
    new Token(TokenType.WhiteSpace, "   ", 3136)
  ]),
  new Token(TokenType.Identifier, "raise_salary", 3143, [
    new Token(TokenType.WhiteSpace, " ", 3142)
  ]),
  new Token(TokenType.SemiColon, ";", 3155),
  new Token(Keyword.FUNCTION, "FUNCTION", 3160, [
    new Token(TokenType.LineBreak, "\n", 3156),
    new Token(TokenType.WhiteSpace, "   ", 3157)
  ]),
  new Token(TokenType.Identifier, "nth_highest_salary", 3169, [
    new Token(TokenType.WhiteSpace, " ", 3168)
  ]),
  new Token(TokenType.LeftParen, "(", 3188, [
    new Token(TokenType.WhiteSpace, " ", 3187)
  ]),
  new Token(TokenType.Identifier, "n", 3189),
  new Token(Keyword.NUMBER, "NUMBER", 3191, [
    new Token(TokenType.WhiteSpace, " ", 3190)
  ]),
  new Token(TokenType.RightParen, ")", 3197),
  new Token([TokenType.Identifier, Keyword.RETURN], "RETURN", 3199, [
    new Token(TokenType.WhiteSpace, " ", 3198)
  ]),
  new Token(TokenType.Identifier, "EmpRecTyp", 3206, [
    new Token(TokenType.WhiteSpace, " ", 3205)
  ]),
  new Token(Keyword.IS, "IS", 3216, [
    new Token(TokenType.WhiteSpace, " ", 3215)
  ]),
  new Token(TokenType.Identifier, "emp_rec", 3225, [
    new Token(TokenType.LineBreak, "\n", 3218),
    new Token(TokenType.WhiteSpace, "      ", 3219)
  ]),
  new Token(TokenType.Identifier, "EmpRecTyp", 3233, [
    new Token(TokenType.WhiteSpace, " ", 3232)
  ]),
  new Token(TokenType.SemiColon, ";", 3242),
  new Token(Keyword.BEGIN, "BEGIN", 3247, [
    new Token(TokenType.LineBreak, "\n", 3243),
    new Token(TokenType.WhiteSpace, "   ", 3244)
  ]),
  new Token(TokenType.Identifier, "OPEN", 3259, [
    new Token(TokenType.LineBreak, "\n", 3252),
    new Token(TokenType.WhiteSpace, "      ", 3253)
  ]),
  new Token(TokenType.Identifier, "desc_salary", 3264, [
    new Token(TokenType.WhiteSpace, " ", 3263)
  ]),
  new Token(TokenType.SemiColon, ";", 3275),
  new Token(Keyword.FOR, "FOR", 3283, [
    new Token(TokenType.LineBreak, "\n", 3276),
    new Token(TokenType.WhiteSpace, "      ", 3277)
  ]),
  new Token(TokenType.Identifier, "i", 3287, [
    new Token(TokenType.WhiteSpace, " ", 3286)
  ]),
  new Token(Keyword.IN, "IN", 3289, [
    new Token(TokenType.WhiteSpace, " ", 3288)
  ]),
  new Token(TokenType.Number, "1", 3292, [
    new Token(TokenType.WhiteSpace, " ", 3291)
  ]),
  new Token(TokenType.Dot, ".", 3293),
  new Token(TokenType.Dot, ".", 3294),
  new Token(TokenType.Identifier, "n", 3295),
  new Token(TokenType.Identifier, "LOOP", 3297, [
    new Token(TokenType.WhiteSpace, " ", 3296)
  ]),
  new Token(Keyword.FETCH, "FETCH", 3311, [
    new Token(TokenType.LineBreak, "\n", 3301),
    new Token(TokenType.WhiteSpace, "         ", 3302)
  ]),
  new Token(TokenType.Identifier, "desc_salary", 3317, [
    new Token(TokenType.WhiteSpace, " ", 3316)
  ]),
  new Token(Keyword.INTO, "INTO", 3329, [
    new Token(TokenType.WhiteSpace, " ", 3328)
  ]),
  new Token(TokenType.Identifier, "emp_rec", 3334, [
    new Token(TokenType.WhiteSpace, " ", 3333)
  ]),
  new Token(TokenType.SemiColon, ";", 3341),
  new Token(Keyword.END, "END", 3349, [
    new Token(TokenType.LineBreak, "\n", 3342),
    new Token(TokenType.WhiteSpace, "      ", 3343)
  ]),
  new Token(TokenType.Identifier, "LOOP", 3353, [
    new Token(TokenType.WhiteSpace, " ", 3352)
  ]),
  new Token(TokenType.SemiColon, ";", 3357),
  new Token(TokenType.Identifier, "CLOSE", 3365, [
    new Token(TokenType.LineBreak, "\n", 3358),
    new Token(TokenType.WhiteSpace, "      ", 3359)
  ]),
  new Token(TokenType.Identifier, "desc_salary", 3371, [
    new Token(TokenType.WhiteSpace, " ", 3370)
  ]),
  new Token(TokenType.SemiColon, ";", 3382),
  new Token([TokenType.Identifier, Keyword.RETURN], "RETURN", 3390, [
    new Token(TokenType.LineBreak, "\n", 3383),
    new Token(TokenType.WhiteSpace, "      ", 3384)
  ]),
  new Token(TokenType.Identifier, "emp_rec", 3397, [
    new Token(TokenType.WhiteSpace, " ", 3396)
  ]),
  new Token(TokenType.SemiColon, ";", 3404),
  new Token(Keyword.END, "END", 3409, [
    new Token(TokenType.LineBreak, "\n", 3405),
    new Token(TokenType.WhiteSpace, "   ", 3406)
  ]),
  new Token(TokenType.Identifier, "nth_highest_salary", 3413, [
    new Token(TokenType.WhiteSpace, " ", 3412)
  ]),
  new Token(TokenType.SemiColon, ";", 3431),
  new Token(Keyword.BEGIN, "BEGIN", 3433, [
    new Token(TokenType.LineBreak, "\n", 3432)
  ]),
  new Token(Keyword.INSERT, "INSERT", 3478, [
    new Token(TokenType.WhiteSpace, "  ", 3438),
    new Token(TokenType.LineComment, "-- initialization part starts here", 3440),
    new Token(TokenType.LineBreak, "\n", 3474),
    new Token(TokenType.WhiteSpace, "   ", 3475)
  ]),
  new Token(Keyword.INTO, "INTO", 3485, [
    new Token(TokenType.WhiteSpace, " ", 3484)
  ]),
  new Token(TokenType.Identifier, "emp_audit", 3490, [
    new Token(TokenType.WhiteSpace, " ", 3489)
  ]),
  new Token(Keyword.VALUES, "VALUES", 3500, [
    new Token(TokenType.WhiteSpace, " ", 3499)
  ]),
  new Token(TokenType.LeftParen, "(", 3507, [
    new Token(TokenType.WhiteSpace, " ", 3506)
  ]),
  new Token(Keyword.SYSDATE, "SYSDATE", 3508),
  new Token(TokenType.Comma, ",", 3515),
  new Token(Keyword.USER, "USER", 3517, [
    new Token(TokenType.WhiteSpace, " ", 3516)
  ]),
  new Token(TokenType.Comma, ",", 3521),
  new Token(TokenType.String, "'EMP_ADMIN'", 3523, [
    new Token(TokenType.WhiteSpace, " ", 3522)
  ]),
  new Token(TokenType.RightParen, ")", 3534),
  new Token(TokenType.SemiColon, ";", 3535),
  new Token(TokenType.Identifier, "number_hired", 3540, [
    new Token(TokenType.LineBreak, "\n", 3536),
    new Token(TokenType.WhiteSpace, "   ", 3537)
  ]),
  new Token([TokenType.Operator, Keyword.OPE_ASSIGN], ":=", 3553, [
    new Token(TokenType.WhiteSpace, " ", 3552)
  ]),
  new Token(TokenType.Number, "0", 3556, [
    new Token(TokenType.WhiteSpace, " ", 3555)
  ]),
  new Token(TokenType.SemiColon, ";", 3557),
  new Token(Keyword.END, "END", 3559, [
    new Token(TokenType.LineBreak, "\n", 3558)
  ]),
  new Token(TokenType.Identifier, "emp_admin", 3563, [
    new Token(TokenType.WhiteSpace, " ", 3562)
  ]),
  new Token(TokenType.SemiColon, ";", 3572),
  new Token(TokenType.Delimiter, "/", 3574, [
    new Token(TokenType.LineBreak, "\n", 3573)
  ]),
  new Token(Keyword.DECLARE, "DECLARE", 3610, [
    new Token(TokenType.LineBreak, "\n", 3575),
    new Token(TokenType.LineComment, "-- calling the package procedures", 3576),
    new Token(TokenType.LineBreak, "\n", 3609)
  ]),
  new Token(TokenType.Identifier, "new_emp_id", 3620, [
    new Token(TokenType.LineBreak, "\n", 3617),
    new Token(TokenType.WhiteSpace, "  ", 3618)
  ]),
  new Token(Keyword.NUMBER, "NUMBER", 3631, [
    new Token(TokenType.WhiteSpace, " ", 3630)
  ]),
  new Token(TokenType.LeftParen, "(", 3637),
  new Token(TokenType.Number, "6", 3638),
  new Token(TokenType.RightParen, ")", 3639),
  new Token(TokenType.SemiColon, ";", 3640),
  new Token(Keyword.BEGIN, "BEGIN", 3642, [
    new Token(TokenType.LineBreak, "\n", 3641)
  ]),
  new Token(TokenType.Identifier, "new_emp_id", 3650, [
    new Token(TokenType.LineBreak, "\n", 3647),
    new Token(TokenType.WhiteSpace, "  ", 3648)
  ]),
  new Token([TokenType.Operator, Keyword.OPE_ASSIGN], ":=", 3661, [
    new Token(TokenType.WhiteSpace, " ", 3660)
  ]),
  new Token(TokenType.Identifier, "emp_admin", 3664, [
    new Token(TokenType.WhiteSpace, " ", 3663)
  ]),
  new Token(TokenType.Dot, ".", 3673),
  new Token(TokenType.Identifier, "hire_employee", 3674),
  new Token(TokenType.LeftParen, "(", 3687),
  new Token(TokenType.String, "'Belden'", 3688),
  new Token(TokenType.Comma, ",", 3696),
  new Token(TokenType.String, "'Enrique'", 3698, [
    new Token(TokenType.WhiteSpace, " ", 3697)
  ]),
  new Token(TokenType.Comma, ",", 3707),
  new Token(TokenType.String, "'EBELDEN'", 3709, [
    new Token(TokenType.WhiteSpace, " ", 3708)
  ]),
  new Token(TokenType.Comma, ",", 3718),
  new Token(TokenType.String, "'555.111.2222'", 3739, [
    new Token(TokenType.LineBreak, "\n", 3719),
    new Token(TokenType.WhiteSpace, "                   ", 3720)
  ]),
  new Token(TokenType.Comma, ",", 3753),
  new Token(TokenType.String, "'ST_CLERK'", 3755, [
    new Token(TokenType.WhiteSpace, " ", 3754)
  ]),
  new Token(TokenType.Comma, ",", 3765),
  new Token(TokenType.Number, "2500", 3767, [
    new Token(TokenType.WhiteSpace, " ", 3766)
  ]),
  new Token(TokenType.Comma, ",", 3771),
  new Token(TokenType.Number, ".1", 3773, [
    new Token(TokenType.WhiteSpace, " ", 3772)
  ]),
  new Token(TokenType.Comma, ",", 3775),
  new Token(TokenType.Number, "101", 3777, [
    new Token(TokenType.WhiteSpace, " ", 3776)
  ]),
  new Token(TokenType.Comma, ",", 3780),
  new Token(TokenType.Number, "110", 3782, [
    new Token(TokenType.WhiteSpace, " ", 3781)
  ]),
  new Token(TokenType.RightParen, ")", 3785),
  new Token(TokenType.SemiColon, ";", 3786),
  new Token(TokenType.Identifier, "DBMS_OUTPUT", 3790, [
    new Token(TokenType.LineBreak, "\n", 3787),
    new Token(TokenType.WhiteSpace, "  ", 3788)
  ]),
  new Token(TokenType.Dot, ".", 3801),
  new Token(TokenType.Identifier, "PUT_LINE", 3802),
  new Token(TokenType.LeftParen, "(", 3810),
  new Token(TokenType.String, "'The new employee id is '", 3811),
  new Token(TokenType.Operator, "||", 3837, [
    new Token(TokenType.WhiteSpace, " ", 3836)
  ]),
  new Token(TokenType.Identifier, "TO_CHAR", 3840, [
    new Token(TokenType.WhiteSpace, " ", 3839)
  ]),
  new Token(TokenType.LeftParen, "(", 3847),
  new Token(TokenType.Identifier, "new_emp_id", 3848),
  new Token(TokenType.RightParen, ")", 3858),
  new Token(TokenType.RightParen, ")", 3860, [
    new Token(TokenType.WhiteSpace, " ", 3859)
  ]),
  new Token(TokenType.SemiColon, ";", 3861),
  new Token(TokenType.Identifier, "EMP_ADMIN", 3865, [
    new Token(TokenType.LineBreak, "\n", 3862),
    new Token(TokenType.WhiteSpace, "  ", 3863)
  ]),
  new Token(TokenType.Dot, ".", 3874),
  new Token(TokenType.Identifier, "raise_salary", 3875),
  new Token(TokenType.LeftParen, "(", 3887),
  new Token(TokenType.Identifier, "new_emp_id", 3888),
  new Token(TokenType.Comma, ",", 3898),
  new Token(TokenType.Number, "100", 3900, [
    new Token(TokenType.WhiteSpace, " ", 3899)
  ]),
  new Token(TokenType.RightParen, ")", 3903),
  new Token(TokenType.SemiColon, ";", 3904),
  new Token(TokenType.Identifier, "DBMS_OUTPUT", 3908, [
    new Token(TokenType.LineBreak, "\n", 3905),
    new Token(TokenType.WhiteSpace, "  ", 3906)
  ]),
  new Token(TokenType.Dot, ".", 3919),
  new Token(TokenType.Identifier, "PUT_LINE", 3920),
  new Token(TokenType.LeftParen, "(", 3928),
  new Token(TokenType.String, "'The 10th highest salary is '", 3929),
  new Token(TokenType.Operator, "||", 3958),
  new Token(TokenType.Identifier, "TO_CHAR", 3966, [
    new Token(TokenType.WhiteSpace, " ", 3960),
    new Token(TokenType.LineBreak, "\n", 3961),
    new Token(TokenType.WhiteSpace, "    ", 3962)
  ]),
  new Token(TokenType.LeftParen, "(", 3973),
  new Token(TokenType.Identifier, "emp_admin", 3974),
  new Token(TokenType.Dot, ".", 3983),
  new Token(TokenType.Identifier, "nth_highest_salary", 3984),
  new Token(TokenType.LeftParen, "(", 4002),
  new Token(TokenType.Number, "10", 4003),
  new Token(TokenType.RightParen, ")", 4005),
  new Token(TokenType.Dot, ".", 4006),
  new Token(TokenType.Identifier, "sal", 4007),
  new Token(TokenType.RightParen, ")", 4010),
  new Token(TokenType.Operator, "||", 4012, [
    new Token(TokenType.WhiteSpace, " ", 4011)
  ]),
  new Token(TokenType.String, "', belonging to employee: '", 4015, [
    new Token(TokenType.WhiteSpace, " ", 4014)
  ]),
  new Token(TokenType.Operator, "||", 4048, [
    new Token(TokenType.WhiteSpace, " ", 4042),
    new Token(TokenType.LineBreak, "\n", 4043),
    new Token(TokenType.WhiteSpace, "    ", 4044)
  ]),
  new Token(TokenType.Identifier, "TO_CHAR", 4051, [
    new Token(TokenType.WhiteSpace, " ", 4050)
  ]),
  new Token(TokenType.LeftParen, "(", 4058),
  new Token(TokenType.Identifier, "emp_admin", 4059),
  new Token(TokenType.Dot, ".", 4068),
  new Token(TokenType.Identifier, "nth_highest_salary", 4069),
  new Token(TokenType.LeftParen, "(", 4087),
  new Token(TokenType.Number, "10", 4088),
  new Token(TokenType.RightParen, ")", 4090),
  new Token(TokenType.Dot, ".", 4091),
  new Token(TokenType.Identifier, "emp_id", 4092),
  new Token(TokenType.RightParen, ")", 4098),
  new Token(TokenType.RightParen, ")", 4100, [
    new Token(TokenType.WhiteSpace, " ", 4099)
  ]),
  new Token(TokenType.SemiColon, ";", 4101),
  new Token(TokenType.Identifier, "emp_admin", 4105, [
    new Token(TokenType.LineBreak, "\n", 4102),
    new Token(TokenType.WhiteSpace, "  ", 4103)
  ]),
  new Token(TokenType.Dot, ".", 4114),
  new Token(TokenType.Identifier, "fire_employee", 4115),
  new Token(TokenType.LeftParen, "(", 4128),
  new Token(TokenType.Identifier, "new_emp_id", 4129),
  new Token(TokenType.RightParen, ")", 4139),
  new Token(TokenType.SemiColon, ";", 4140),
  new Token(Keyword.END, "END", 4244, [
    new Token(TokenType.LineBreak, "\n", 4141),
    new Token(TokenType.LineComment, "-- you could also delete the newly added employee as follows:", 4142),
    new Token(TokenType.LineBreak, "\n", 4203),
    new Token(TokenType.LineComment, "--  emp_admin.fire_employee('EBELDEN');", 4204),
    new Token(TokenType.LineBreak, "\n", 4243)
  ]),
  new Token(TokenType.SemiColon, ";", 4247),
  new Token(TokenType.Delimiter, "/", 4249, [
    new Token(TokenType.LineBreak, "\n", 4248)
  ]),
  new Token(TokenType.Eof, "", 4250)
]