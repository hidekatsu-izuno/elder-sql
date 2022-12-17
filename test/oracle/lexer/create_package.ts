import { SourceLocation, Token, TokenType, Keyword, Operator } from "../../../src/lexer"

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
  new Token(Keyword.CREATE, "CREATE", [
    new Token(TokenType.LineComment, "-- create the audit table to track changes", [], new SourceLocation(0, 1, 0, undefined)),
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(42, 1, 42, undefined))
  ], new SourceLocation(43, 2, 0, undefined)),
  new Token(Keyword.TABLE, "TABLE", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(49, 2, 6, undefined))
  ], new SourceLocation(50, 2, 7, undefined)),
  new Token(TokenType.Identifier, "emp_audit", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(55, 2, 12, undefined))
  ], new SourceLocation(56, 2, 13, undefined)),
  new Token(TokenType.LeftParen, "(", [], new SourceLocation(65, 2, 22, undefined)),
  new Token(TokenType.Identifier, "date_of_action", [], new SourceLocation(66, 2, 23, undefined)),
  new Token(Keyword.DATE, "DATE", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(80, 2, 37, undefined))
  ], new SourceLocation(81, 2, 38, undefined)),
  new Token(TokenType.Comma, ",", [], new SourceLocation(85, 2, 42, undefined)),
  new Token(TokenType.Identifier, "user_id", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(86, 2, 43, undefined))
  ], new SourceLocation(87, 2, 44, undefined)),
  new Token(Keyword.VARCHAR2, "VARCHAR2", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(94, 2, 51, undefined))
  ], new SourceLocation(95, 2, 52, undefined)),
  new Token(TokenType.LeftParen, "(", [], new SourceLocation(103, 2, 60, undefined)),
  new Token(TokenType.Number, "20", [], new SourceLocation(104, 2, 61, undefined)),
  new Token(TokenType.RightParen, ")", [], new SourceLocation(106, 2, 63, undefined)),
  new Token(TokenType.Comma, ",", [], new SourceLocation(107, 2, 64, undefined)),
  new Token(TokenType.Identifier, "package_name", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(108, 2, 65, undefined)),
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(109, 2, 66, undefined)),
    new Token(TokenType.WhiteSpace, "                       ", [], new SourceLocation(110, 3, 0, undefined))
  ], new SourceLocation(133, 3, 23, undefined)),
  new Token(Keyword.VARCHAR2, "VARCHAR2", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(145, 3, 35, undefined))
  ], new SourceLocation(146, 3, 36, undefined)),
  new Token(TokenType.LeftParen, "(", [], new SourceLocation(154, 3, 44, undefined)),
  new Token(TokenType.Number, "30", [], new SourceLocation(155, 3, 45, undefined)),
  new Token(TokenType.RightParen, ")", [], new SourceLocation(157, 3, 47, undefined)),
  new Token(TokenType.RightParen, ")", [], new SourceLocation(158, 3, 48, undefined)),
  new Token(TokenType.SemiColon, ";", [], new SourceLocation(159, 3, 49, undefined)),
  new Token(Keyword.CREATE, "CREATE", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(160, 3, 50, undefined)),
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(161, 4, 0, undefined))
  ], new SourceLocation(162, 5, 0, undefined)),
  new Token(Keyword.OR, "OR", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(168, 5, 6, undefined))
  ], new SourceLocation(169, 5, 7, undefined)),
  new Token([TokenType.Identifier, Keyword.REPLACE], "REPLACE", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(171, 5, 9, undefined))
  ], new SourceLocation(172, 5, 10, undefined)),
  new Token([TokenType.Identifier, Keyword.PACKAGE], "PACKAGE", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(179, 5, 17, undefined))
  ], new SourceLocation(180, 5, 18, undefined)),
  new Token(TokenType.Identifier, "emp_admin", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(187, 5, 25, undefined))
  ], new SourceLocation(188, 5, 26, undefined)),
  new Token(Keyword.AS, "AS", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(197, 5, 35, undefined))
  ], new SourceLocation(198, 5, 36, undefined)),
  new Token(Keyword.TYPE, "TYPE", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(200, 5, 38, undefined)),
    new Token(TokenType.LineComment, "-- Declare externally visible types, cursor, exception", [], new SourceLocation(201, 6, 0, undefined)),
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(255, 6, 54, undefined)),
    new Token(TokenType.WhiteSpace, "   ", [], new SourceLocation(256, 7, 0, undefined))
  ], new SourceLocation(259, 7, 3, undefined)),
  new Token(TokenType.Identifier, "EmpRecTyp", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(263, 7, 7, undefined))
  ], new SourceLocation(264, 7, 8, undefined)),
  new Token(Keyword.IS, "IS", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(273, 7, 17, undefined))
  ], new SourceLocation(274, 7, 18, undefined)),
  new Token([TokenType.Identifier, Keyword.RECORD], "RECORD", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(276, 7, 20, undefined))
  ], new SourceLocation(277, 7, 21, undefined)),
  new Token(TokenType.LeftParen, "(", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(283, 7, 27, undefined))
  ], new SourceLocation(284, 7, 28, undefined)),
  new Token(TokenType.Identifier, "emp_id", [], new SourceLocation(285, 7, 29, undefined)),
  new Token(Keyword.NUMBER, "NUMBER", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(291, 7, 35, undefined))
  ], new SourceLocation(292, 7, 36, undefined)),
  new Token(TokenType.Comma, ",", [], new SourceLocation(298, 7, 42, undefined)),
  new Token(TokenType.Identifier, "sal", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(299, 7, 43, undefined))
  ], new SourceLocation(300, 7, 44, undefined)),
  new Token(Keyword.NUMBER, "NUMBER", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(303, 7, 47, undefined))
  ], new SourceLocation(304, 7, 48, undefined)),
  new Token(TokenType.RightParen, ")", [], new SourceLocation(310, 7, 54, undefined)),
  new Token(TokenType.SemiColon, ";", [], new SourceLocation(311, 7, 55, undefined)),
  new Token(Keyword.CURSOR, "CURSOR", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(312, 7, 56, undefined)),
    new Token(TokenType.WhiteSpace, "   ", [], new SourceLocation(313, 8, 0, undefined))
  ], new SourceLocation(316, 8, 3, undefined)),
  new Token(TokenType.Identifier, "desc_salary", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(322, 8, 9, undefined))
  ], new SourceLocation(323, 8, 10, undefined)),
  new Token([TokenType.Identifier, Keyword.RETURN], "RETURN", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(334, 8, 21, undefined))
  ], new SourceLocation(335, 8, 22, undefined)),
  new Token(TokenType.Identifier, "EmpRecTyp", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(341, 8, 28, undefined))
  ], new SourceLocation(342, 8, 29, undefined)),
  new Token(TokenType.SemiColon, ";", [], new SourceLocation(351, 8, 38, undefined)),
  new Token(TokenType.Identifier, "invalid_salary", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(352, 8, 39, undefined)),
    new Token(TokenType.WhiteSpace, "   ", [], new SourceLocation(353, 9, 0, undefined))
  ], new SourceLocation(356, 9, 3, undefined)),
  new Token(Keyword.EXCEPTION, "EXCEPTION", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(370, 9, 17, undefined))
  ], new SourceLocation(371, 9, 18, undefined)),
  new Token(TokenType.SemiColon, ";", [], new SourceLocation(380, 9, 27, undefined)),
  new Token(Keyword.FUNCTION, "FUNCTION", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(381, 9, 28, undefined)),
    new Token(TokenType.LineComment, "-- Declare externally callable subprograms", [], new SourceLocation(382, 10, 0, undefined)),
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(424, 10, 42, undefined)),
    new Token(TokenType.WhiteSpace, "   ", [], new SourceLocation(425, 11, 0, undefined))
  ], new SourceLocation(428, 11, 3, undefined)),
  new Token(TokenType.Identifier, "hire_employee", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(436, 11, 11, undefined))
  ], new SourceLocation(437, 11, 12, undefined)),
  new Token(TokenType.LeftParen, "(", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(450, 11, 25, undefined))
  ], new SourceLocation(451, 11, 26, undefined)),
  new Token(TokenType.Identifier, "last_name", [], new SourceLocation(452, 11, 27, undefined)),
  new Token(Keyword.VARCHAR2, "VARCHAR2", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(461, 11, 36, undefined))
  ], new SourceLocation(462, 11, 37, undefined)),
  new Token(TokenType.Comma, ",", [], new SourceLocation(470, 11, 45, undefined)),
  new Token(TokenType.Identifier, "first_name", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(471, 11, 46, undefined))
  ], new SourceLocation(472, 11, 47, undefined)),
  new Token(Keyword.VARCHAR2, "VARCHAR2", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(482, 11, 57, undefined))
  ], new SourceLocation(483, 11, 58, undefined)),
  new Token(TokenType.Comma, ",", [], new SourceLocation(491, 11, 66, undefined)),
  new Token(TokenType.Identifier, "email", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(492, 11, 67, undefined)),
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(493, 11, 68, undefined)),
    new Token(TokenType.WhiteSpace, "     ", [], new SourceLocation(494, 12, 0, undefined))
  ], new SourceLocation(499, 12, 5, undefined)),
  new Token(Keyword.VARCHAR2, "VARCHAR2", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(504, 12, 10, undefined))
  ], new SourceLocation(505, 12, 11, undefined)),
  new Token(TokenType.Comma, ",", [], new SourceLocation(513, 12, 19, undefined)),
  new Token(TokenType.Identifier, "phone_number", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(514, 12, 20, undefined))
  ], new SourceLocation(515, 12, 21, undefined)),
  new Token(Keyword.VARCHAR2, "VARCHAR2", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(527, 12, 33, undefined))
  ], new SourceLocation(528, 12, 34, undefined)),
  new Token(TokenType.Comma, ",", [], new SourceLocation(536, 12, 42, undefined)),
  new Token(TokenType.Identifier, "job_id", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(537, 12, 43, undefined))
  ], new SourceLocation(538, 12, 44, undefined)),
  new Token(Keyword.VARCHAR2, "VARCHAR2", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(544, 12, 50, undefined))
  ], new SourceLocation(545, 12, 51, undefined)),
  new Token(TokenType.Comma, ",", [], new SourceLocation(553, 12, 59, undefined)),
  new Token(TokenType.Identifier, "salary", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(554, 12, 60, undefined))
  ], new SourceLocation(555, 12, 61, undefined)),
  new Token(Keyword.NUMBER, "NUMBER", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(561, 12, 67, undefined))
  ], new SourceLocation(562, 12, 68, undefined)),
  new Token(TokenType.Comma, ",", [], new SourceLocation(568, 12, 74, undefined)),
  new Token(TokenType.Identifier, "commission_pct", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(569, 12, 75, undefined)),
    new Token(TokenType.WhiteSpace, "     ", [], new SourceLocation(570, 13, 0, undefined))
  ], new SourceLocation(575, 13, 5, undefined)),
  new Token(Keyword.NUMBER, "NUMBER", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(589, 13, 19, undefined))
  ], new SourceLocation(590, 13, 20, undefined)),
  new Token(TokenType.Comma, ",", [], new SourceLocation(596, 13, 26, undefined)),
  new Token(TokenType.Identifier, "manager_id", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(597, 13, 27, undefined))
  ], new SourceLocation(598, 13, 28, undefined)),
  new Token(Keyword.NUMBER, "NUMBER", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(608, 13, 38, undefined))
  ], new SourceLocation(609, 13, 39, undefined)),
  new Token(TokenType.Comma, ",", [], new SourceLocation(615, 13, 45, undefined)),
  new Token(TokenType.Identifier, "department_id", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(616, 13, 46, undefined))
  ], new SourceLocation(617, 13, 47, undefined)),
  new Token(Keyword.NUMBER, "NUMBER", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(630, 13, 60, undefined))
  ], new SourceLocation(631, 13, 61, undefined)),
  new Token(TokenType.RightParen, ")", [], new SourceLocation(637, 13, 67, undefined)),
  new Token([TokenType.Identifier, Keyword.RETURN], "RETURN", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(638, 13, 68, undefined)),
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(639, 13, 69, undefined)),
    new Token(TokenType.WhiteSpace, "     ", [], new SourceLocation(640, 14, 0, undefined))
  ], new SourceLocation(645, 14, 5, undefined)),
  new Token(Keyword.NUMBER, "NUMBER", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(651, 14, 11, undefined))
  ], new SourceLocation(652, 14, 12, undefined)),
  new Token(TokenType.SemiColon, ";", [], new SourceLocation(658, 14, 18, undefined)),
  new Token(Keyword.PROCEDURE, "PROCEDURE", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(659, 14, 19, undefined)),
    new Token(TokenType.WhiteSpace, "   ", [], new SourceLocation(660, 15, 0, undefined))
  ], new SourceLocation(663, 15, 3, undefined)),
  new Token(TokenType.Identifier, "fire_employee", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(672, 15, 12, undefined))
  ], new SourceLocation(673, 15, 13, undefined)),
  new Token(TokenType.LeftParen, "(", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(686, 15, 26, undefined))
  ], new SourceLocation(687, 15, 27, undefined)),
  new Token(TokenType.Identifier, "emp_id", [], new SourceLocation(688, 15, 28, undefined)),
  new Token(Keyword.NUMBER, "NUMBER", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(694, 15, 34, undefined))
  ], new SourceLocation(695, 15, 35, undefined)),
  new Token(TokenType.RightParen, ")", [], new SourceLocation(701, 15, 41, undefined)),
  new Token(TokenType.SemiColon, ";", [], new SourceLocation(702, 15, 42, undefined)),
  new Token(Keyword.PROCEDURE, "PROCEDURE", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(703, 15, 43, undefined)),
    new Token(TokenType.LineComment, "-- overloaded subprogram", [], new SourceLocation(704, 15, 44, undefined)),
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(728, 15, 68, undefined)),
    new Token(TokenType.WhiteSpace, "   ", [], new SourceLocation(729, 16, 0, undefined))
  ], new SourceLocation(732, 16, 3, undefined)),
  new Token(TokenType.Identifier, "fire_employee", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(741, 16, 12, undefined))
  ], new SourceLocation(742, 16, 13, undefined)),
  new Token(TokenType.LeftParen, "(", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(755, 16, 26, undefined))
  ], new SourceLocation(756, 16, 27, undefined)),
  new Token(TokenType.Identifier, "emp_email", [], new SourceLocation(757, 16, 28, undefined)),
  new Token(Keyword.VARCHAR2, "VARCHAR2", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(766, 16, 37, undefined))
  ], new SourceLocation(767, 16, 38, undefined)),
  new Token(TokenType.RightParen, ")", [], new SourceLocation(775, 16, 46, undefined)),
  new Token(TokenType.SemiColon, ";", [], new SourceLocation(776, 16, 47, undefined)),
  new Token(Keyword.PROCEDURE, "PROCEDURE", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(777, 16, 48, undefined)),
    new Token(TokenType.LineComment, "-- overloaded subprogram", [], new SourceLocation(778, 16, 49, undefined)),
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(802, 16, 73, undefined)),
    new Token(TokenType.WhiteSpace, "   ", [], new SourceLocation(803, 17, 0, undefined))
  ], new SourceLocation(806, 17, 3, undefined)),
  new Token(TokenType.Identifier, "raise_salary", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(815, 17, 12, undefined))
  ], new SourceLocation(816, 17, 13, undefined)),
  new Token(TokenType.LeftParen, "(", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(828, 17, 25, undefined))
  ], new SourceLocation(829, 17, 26, undefined)),
  new Token(TokenType.Identifier, "emp_id", [], new SourceLocation(830, 17, 27, undefined)),
  new Token(Keyword.NUMBER, "NUMBER", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(836, 17, 33, undefined))
  ], new SourceLocation(837, 17, 34, undefined)),
  new Token(TokenType.Comma, ",", [], new SourceLocation(843, 17, 40, undefined)),
  new Token(TokenType.Identifier, "amount", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(844, 17, 41, undefined))
  ], new SourceLocation(845, 17, 42, undefined)),
  new Token(Keyword.NUMBER, "NUMBER", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(851, 17, 48, undefined))
  ], new SourceLocation(852, 17, 49, undefined)),
  new Token(TokenType.RightParen, ")", [], new SourceLocation(858, 17, 55, undefined)),
  new Token(TokenType.SemiColon, ";", [], new SourceLocation(859, 17, 56, undefined)),
  new Token(Keyword.FUNCTION, "FUNCTION", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(860, 17, 57, undefined)),
    new Token(TokenType.WhiteSpace, "   ", [], new SourceLocation(861, 18, 0, undefined))
  ], new SourceLocation(864, 18, 3, undefined)),
  new Token(TokenType.Identifier, "nth_highest_salary", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(872, 18, 11, undefined))
  ], new SourceLocation(873, 18, 12, undefined)),
  new Token(TokenType.LeftParen, "(", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(891, 18, 30, undefined))
  ], new SourceLocation(892, 18, 31, undefined)),
  new Token(TokenType.Identifier, "n", [], new SourceLocation(893, 18, 32, undefined)),
  new Token(Keyword.NUMBER, "NUMBER", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(894, 18, 33, undefined))
  ], new SourceLocation(895, 18, 34, undefined)),
  new Token(TokenType.RightParen, ")", [], new SourceLocation(901, 18, 40, undefined)),
  new Token([TokenType.Identifier, Keyword.RETURN], "RETURN", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(902, 18, 41, undefined))
  ], new SourceLocation(903, 18, 42, undefined)),
  new Token(TokenType.Identifier, "EmpRecTyp", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(909, 18, 48, undefined))
  ], new SourceLocation(910, 18, 49, undefined)),
  new Token(TokenType.SemiColon, ";", [], new SourceLocation(919, 18, 58, undefined)),
  new Token(Keyword.END, "END", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(920, 18, 59, undefined))
  ], new SourceLocation(921, 19, 0, undefined)),
  new Token(TokenType.Identifier, "emp_admin", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(924, 19, 3, undefined))
  ], new SourceLocation(925, 19, 4, undefined)),
  new Token(TokenType.SemiColon, ";", [], new SourceLocation(934, 19, 13, undefined)),
  new Token(TokenType.Delimiter, "/", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(935, 19, 14, undefined))
  ], new SourceLocation(936, 20, 0, undefined)),
  new Token(Keyword.CREATE, "CREATE", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(937, 20, 1, undefined))
  ], new SourceLocation(938, 21, 0, undefined)),
  new Token(Keyword.OR, "OR", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(944, 21, 6, undefined))
  ], new SourceLocation(945, 21, 7, undefined)),
  new Token([TokenType.Identifier, Keyword.REPLACE], "REPLACE", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(947, 21, 9, undefined))
  ], new SourceLocation(948, 21, 10, undefined)),
  new Token([TokenType.Identifier, Keyword.PACKAGE], "PACKAGE", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(955, 21, 17, undefined))
  ], new SourceLocation(956, 21, 18, undefined)),
  new Token([TokenType.Identifier, Keyword.BODY], "BODY", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(963, 21, 25, undefined))
  ], new SourceLocation(964, 21, 26, undefined)),
  new Token(TokenType.Identifier, "emp_admin", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(968, 21, 30, undefined))
  ], new SourceLocation(969, 21, 31, undefined)),
  new Token(Keyword.AS, "AS", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(978, 21, 40, undefined))
  ], new SourceLocation(979, 21, 41, undefined)),
  new Token(TokenType.Identifier, "number_hired", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(981, 21, 43, undefined)),
    new Token(TokenType.WhiteSpace, "   ", [], new SourceLocation(982, 22, 0, undefined))
  ], new SourceLocation(985, 22, 3, undefined)),
  new Token(Keyword.NUMBER, "NUMBER", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(997, 22, 15, undefined))
  ], new SourceLocation(998, 22, 16, undefined)),
  new Token(TokenType.SemiColon, ";", [], new SourceLocation(1004, 22, 22, undefined)),
  new Token(Keyword.CURSOR, "CURSOR", [
    new Token(TokenType.WhiteSpace, "  ", [], new SourceLocation(1005, 22, 23, undefined)),
    new Token(TokenType.LineComment, "-- visible only in this package", [], new SourceLocation(1007, 22, 25, undefined)),
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(1038, 22, 56, undefined)),
    new Token(TokenType.LineComment, "-- Fully define cursor specified in package", [], new SourceLocation(1039, 23, 0, undefined)),
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(1082, 23, 43, undefined)),
    new Token(TokenType.WhiteSpace, "   ", [], new SourceLocation(1083, 24, 0, undefined))
  ], new SourceLocation(1086, 24, 3, undefined)),
  new Token(TokenType.Identifier, "desc_salary", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(1092, 24, 9, undefined))
  ], new SourceLocation(1093, 24, 10, undefined)),
  new Token([TokenType.Identifier, Keyword.RETURN], "RETURN", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(1104, 24, 21, undefined))
  ], new SourceLocation(1105, 24, 22, undefined)),
  new Token(TokenType.Identifier, "EmpRecTyp", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(1111, 24, 28, undefined))
  ], new SourceLocation(1112, 24, 29, undefined)),
  new Token(Keyword.IS, "IS", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(1121, 24, 38, undefined))
  ], new SourceLocation(1122, 24, 39, undefined)),
  new Token(Keyword.SELECT, "SELECT", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(1124, 24, 41, undefined)),
    new Token(TokenType.WhiteSpace, "      ", [], new SourceLocation(1125, 25, 0, undefined))
  ], new SourceLocation(1131, 25, 6, undefined)),
  new Token(TokenType.Identifier, "employee_id", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(1137, 25, 12, undefined))
  ], new SourceLocation(1138, 25, 13, undefined)),
  new Token(TokenType.Comma, ",", [], new SourceLocation(1149, 25, 24, undefined)),
  new Token(TokenType.Identifier, "salary", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(1150, 25, 25, undefined))
  ], new SourceLocation(1151, 25, 26, undefined)),
  new Token(Keyword.FROM, "FROM", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(1157, 25, 32, undefined))
  ], new SourceLocation(1158, 25, 33, undefined)),
  new Token(TokenType.Identifier, "employees", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(1162, 25, 37, undefined))
  ], new SourceLocation(1163, 25, 38, undefined)),
  new Token(Keyword.ORDER, "ORDER", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(1172, 25, 47, undefined))
  ], new SourceLocation(1173, 25, 48, undefined)),
  new Token(Keyword.BY, "BY", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(1178, 25, 53, undefined))
  ], new SourceLocation(1179, 25, 54, undefined)),
  new Token(TokenType.Identifier, "salary", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(1181, 25, 56, undefined))
  ], new SourceLocation(1182, 25, 57, undefined)),
  new Token(Keyword.DESC, "DESC", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(1188, 25, 63, undefined))
  ], new SourceLocation(1189, 25, 64, undefined)),
  new Token(TokenType.SemiColon, ";", [], new SourceLocation(1193, 25, 68, undefined)),
  new Token(Keyword.FUNCTION, "FUNCTION", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(1194, 25, 69, undefined)),
    new Token(TokenType.LineComment, "-- Fully define subprograms specified in package", [], new SourceLocation(1195, 26, 0, undefined)),
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(1243, 26, 48, undefined)),
    new Token(TokenType.WhiteSpace, "   ", [], new SourceLocation(1244, 27, 0, undefined))
  ], new SourceLocation(1247, 27, 3, undefined)),
  new Token(TokenType.Identifier, "hire_employee", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(1255, 27, 11, undefined))
  ], new SourceLocation(1256, 27, 12, undefined)),
  new Token(TokenType.LeftParen, "(", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(1269, 27, 25, undefined))
  ], new SourceLocation(1270, 27, 26, undefined)),
  new Token(TokenType.Identifier, "last_name", [], new SourceLocation(1271, 27, 27, undefined)),
  new Token(Keyword.VARCHAR2, "VARCHAR2", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(1280, 27, 36, undefined))
  ], new SourceLocation(1281, 27, 37, undefined)),
  new Token(TokenType.Comma, ",", [], new SourceLocation(1289, 27, 45, undefined)),
  new Token(TokenType.Identifier, "first_name", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(1290, 27, 46, undefined))
  ], new SourceLocation(1291, 27, 47, undefined)),
  new Token(Keyword.VARCHAR2, "VARCHAR2", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(1301, 27, 57, undefined))
  ], new SourceLocation(1302, 27, 58, undefined)),
  new Token(TokenType.Comma, ",", [], new SourceLocation(1310, 27, 66, undefined)),
  new Token(TokenType.Identifier, "email", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(1311, 27, 67, undefined)),
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(1312, 27, 68, undefined)),
    new Token(TokenType.WhiteSpace, "     ", [], new SourceLocation(1313, 28, 0, undefined))
  ], new SourceLocation(1318, 28, 5, undefined)),
  new Token(Keyword.VARCHAR2, "VARCHAR2", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(1323, 28, 10, undefined))
  ], new SourceLocation(1324, 28, 11, undefined)),
  new Token(TokenType.Comma, ",", [], new SourceLocation(1332, 28, 19, undefined)),
  new Token(TokenType.Identifier, "phone_number", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(1333, 28, 20, undefined))
  ], new SourceLocation(1334, 28, 21, undefined)),
  new Token(Keyword.VARCHAR2, "VARCHAR2", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(1346, 28, 33, undefined))
  ], new SourceLocation(1347, 28, 34, undefined)),
  new Token(TokenType.Comma, ",", [], new SourceLocation(1355, 28, 42, undefined)),
  new Token(TokenType.Identifier, "job_id", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(1356, 28, 43, undefined))
  ], new SourceLocation(1357, 28, 44, undefined)),
  new Token(Keyword.VARCHAR2, "VARCHAR2", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(1363, 28, 50, undefined))
  ], new SourceLocation(1364, 28, 51, undefined)),
  new Token(TokenType.Comma, ",", [], new SourceLocation(1372, 28, 59, undefined)),
  new Token(TokenType.Identifier, "salary", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(1373, 28, 60, undefined))
  ], new SourceLocation(1374, 28, 61, undefined)),
  new Token(Keyword.NUMBER, "NUMBER", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(1380, 28, 67, undefined))
  ], new SourceLocation(1381, 28, 68, undefined)),
  new Token(TokenType.Comma, ",", [], new SourceLocation(1387, 28, 74, undefined)),
  new Token(TokenType.Identifier, "commission_pct", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(1388, 28, 75, undefined)),
    new Token(TokenType.WhiteSpace, "     ", [], new SourceLocation(1389, 29, 0, undefined))
  ], new SourceLocation(1394, 29, 5, undefined)),
  new Token(Keyword.NUMBER, "NUMBER", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(1408, 29, 19, undefined))
  ], new SourceLocation(1409, 29, 20, undefined)),
  new Token(TokenType.Comma, ",", [], new SourceLocation(1415, 29, 26, undefined)),
  new Token(TokenType.Identifier, "manager_id", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(1416, 29, 27, undefined))
  ], new SourceLocation(1417, 29, 28, undefined)),
  new Token(Keyword.NUMBER, "NUMBER", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(1427, 29, 38, undefined))
  ], new SourceLocation(1428, 29, 39, undefined)),
  new Token(TokenType.Comma, ",", [], new SourceLocation(1434, 29, 45, undefined)),
  new Token(TokenType.Identifier, "department_id", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(1435, 29, 46, undefined))
  ], new SourceLocation(1436, 29, 47, undefined)),
  new Token(Keyword.NUMBER, "NUMBER", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(1449, 29, 60, undefined))
  ], new SourceLocation(1450, 29, 61, undefined)),
  new Token(TokenType.RightParen, ")", [], new SourceLocation(1456, 29, 67, undefined)),
  new Token([TokenType.Identifier, Keyword.RETURN], "RETURN", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(1457, 29, 68, undefined)),
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(1458, 29, 69, undefined)),
    new Token(TokenType.WhiteSpace, "     ", [], new SourceLocation(1459, 30, 0, undefined))
  ], new SourceLocation(1464, 30, 5, undefined)),
  new Token(Keyword.NUMBER, "NUMBER", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(1470, 30, 11, undefined))
  ], new SourceLocation(1471, 30, 12, undefined)),
  new Token(Keyword.IS, "IS", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(1477, 30, 18, undefined))
  ], new SourceLocation(1478, 30, 19, undefined)),
  new Token(TokenType.Identifier, "new_emp_id", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(1480, 30, 21, undefined)),
    new Token(TokenType.WhiteSpace, "     ", [], new SourceLocation(1481, 31, 0, undefined))
  ], new SourceLocation(1486, 31, 5, undefined)),
  new Token(Keyword.NUMBER, "NUMBER", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(1496, 31, 15, undefined))
  ], new SourceLocation(1497, 31, 16, undefined)),
  new Token(TokenType.SemiColon, ";", [], new SourceLocation(1503, 31, 22, undefined)),
  new Token(Keyword.BEGIN, "BEGIN", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(1504, 31, 23, undefined)),
    new Token(TokenType.WhiteSpace, "   ", [], new SourceLocation(1505, 32, 0, undefined))
  ], new SourceLocation(1508, 32, 3, undefined)),
  new Token(Keyword.SELECT, "SELECT", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(1513, 32, 8, undefined)),
    new Token(TokenType.WhiteSpace, "      ", [], new SourceLocation(1514, 33, 0, undefined))
  ], new SourceLocation(1520, 33, 6, undefined)),
  new Token(TokenType.Identifier, "employees_seq", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(1526, 33, 12, undefined))
  ], new SourceLocation(1527, 33, 13, undefined)),
  new Token(TokenType.Dot, ".", [], new SourceLocation(1540, 33, 26, undefined)),
  new Token(TokenType.Identifier, "NEXTVAL", [], new SourceLocation(1541, 33, 27, undefined)),
  new Token(Keyword.INTO, "INTO", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(1548, 33, 34, undefined))
  ], new SourceLocation(1549, 33, 35, undefined)),
  new Token(TokenType.Identifier, "new_emp_id", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(1553, 33, 39, undefined))
  ], new SourceLocation(1554, 33, 40, undefined)),
  new Token(Keyword.FROM, "FROM", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(1564, 33, 50, undefined))
  ], new SourceLocation(1565, 33, 51, undefined)),
  new Token(TokenType.Identifier, "dual", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(1569, 33, 55, undefined))
  ], new SourceLocation(1570, 33, 56, undefined)),
  new Token(TokenType.SemiColon, ";", [], new SourceLocation(1574, 33, 60, undefined)),
  new Token(Keyword.INSERT, "INSERT", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(1575, 33, 61, undefined)),
    new Token(TokenType.WhiteSpace, "      ", [], new SourceLocation(1576, 34, 0, undefined))
  ], new SourceLocation(1582, 34, 6, undefined)),
  new Token(Keyword.INTO, "INTO", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(1588, 34, 12, undefined))
  ], new SourceLocation(1589, 34, 13, undefined)),
  new Token(TokenType.Identifier, "employees", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(1593, 34, 17, undefined))
  ], new SourceLocation(1594, 34, 18, undefined)),
  new Token(Keyword.VALUES, "VALUES", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(1603, 34, 27, undefined))
  ], new SourceLocation(1604, 34, 28, undefined)),
  new Token(TokenType.LeftParen, "(", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(1610, 34, 34, undefined))
  ], new SourceLocation(1611, 34, 35, undefined)),
  new Token(TokenType.Identifier, "new_emp_id", [], new SourceLocation(1612, 34, 36, undefined)),
  new Token(TokenType.Comma, ",", [], new SourceLocation(1622, 34, 46, undefined)),
  new Token(TokenType.Identifier, "last_name", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(1623, 34, 47, undefined))
  ], new SourceLocation(1624, 34, 48, undefined)),
  new Token(TokenType.Comma, ",", [], new SourceLocation(1633, 34, 57, undefined)),
  new Token(TokenType.Identifier, "first_name", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(1634, 34, 58, undefined))
  ], new SourceLocation(1635, 34, 59, undefined)),
  new Token(TokenType.Comma, ",", [], new SourceLocation(1645, 34, 69, undefined)),
  new Token(TokenType.Identifier, "email", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(1646, 34, 70, undefined))
  ], new SourceLocation(1647, 34, 71, undefined)),
  new Token(TokenType.Comma, ",", [], new SourceLocation(1652, 34, 76, undefined)),
  new Token(TokenType.Identifier, "phone_number", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(1653, 34, 77, undefined)),
    new Token(TokenType.WhiteSpace, "        ", [], new SourceLocation(1654, 35, 0, undefined))
  ], new SourceLocation(1662, 35, 8, undefined)),
  new Token(TokenType.Comma, ",", [], new SourceLocation(1674, 35, 20, undefined)),
  new Token(Keyword.SYSDATE, "SYSDATE", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(1675, 35, 21, undefined))
  ], new SourceLocation(1676, 35, 22, undefined)),
  new Token(TokenType.Comma, ",", [], new SourceLocation(1683, 35, 29, undefined)),
  new Token(TokenType.Identifier, "job_id", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(1684, 35, 30, undefined))
  ], new SourceLocation(1685, 35, 31, undefined)),
  new Token(TokenType.Comma, ",", [], new SourceLocation(1691, 35, 37, undefined)),
  new Token(TokenType.Identifier, "salary", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(1692, 35, 38, undefined))
  ], new SourceLocation(1693, 35, 39, undefined)),
  new Token(TokenType.Comma, ",", [], new SourceLocation(1699, 35, 45, undefined)),
  new Token(TokenType.Identifier, "commission_pct", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(1700, 35, 46, undefined))
  ], new SourceLocation(1701, 35, 47, undefined)),
  new Token(TokenType.Comma, ",", [], new SourceLocation(1715, 35, 61, undefined)),
  new Token(TokenType.Identifier, "manager_id", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(1716, 35, 62, undefined))
  ], new SourceLocation(1717, 35, 63, undefined)),
  new Token(TokenType.Comma, ",", [], new SourceLocation(1727, 35, 73, undefined)),
  new Token(TokenType.Identifier, "department_id", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(1728, 35, 74, undefined)),
    new Token(TokenType.WhiteSpace, "        ", [], new SourceLocation(1729, 36, 0, undefined))
  ], new SourceLocation(1737, 36, 8, undefined)),
  new Token(TokenType.RightParen, ")", [], new SourceLocation(1750, 36, 21, undefined)),
  new Token(TokenType.SemiColon, ";", [], new SourceLocation(1751, 36, 22, undefined)),
  new Token(TokenType.Identifier, "number_hired", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(1752, 36, 23, undefined)),
    new Token(TokenType.WhiteSpace, "      ", [], new SourceLocation(1753, 37, 0, undefined))
  ], new SourceLocation(1759, 37, 6, undefined)),
  new Token([TokenType.Operator, Operator.ASSIGN], ":=", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(1771, 37, 18, undefined))
  ], new SourceLocation(1772, 37, 19, undefined)),
  new Token(TokenType.Identifier, "number_hired", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(1774, 37, 21, undefined))
  ], new SourceLocation(1775, 37, 22, undefined)),
  new Token([TokenType.Operator, Operator.PLUS], "+", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(1787, 37, 34, undefined))
  ], new SourceLocation(1788, 37, 35, undefined)),
  new Token(TokenType.Number, "1", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(1789, 37, 36, undefined))
  ], new SourceLocation(1790, 37, 37, undefined)),
  new Token(TokenType.SemiColon, ";", [], new SourceLocation(1791, 37, 38, undefined)),
  new Token(TokenType.Identifier, "DBMS_OUTPUT", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(1792, 37, 39, undefined)),
    new Token(TokenType.WhiteSpace, "      ", [], new SourceLocation(1793, 38, 0, undefined))
  ], new SourceLocation(1799, 38, 6, undefined)),
  new Token(TokenType.Dot, ".", [], new SourceLocation(1810, 38, 17, undefined)),
  new Token(TokenType.Identifier, "PUT_LINE", [], new SourceLocation(1811, 38, 18, undefined)),
  new Token(TokenType.LeftParen, "(", [], new SourceLocation(1819, 38, 26, undefined)),
  new Token(TokenType.String, "'The number of employees hired is '", [], new SourceLocation(1820, 38, 27, undefined)),
  new Token(TokenType.Operator, "||", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(1855, 38, 62, undefined)),
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(1856, 38, 63, undefined)),
    new Token(TokenType.WhiteSpace, "                           ", [], new SourceLocation(1857, 39, 0, undefined))
  ], new SourceLocation(1884, 39, 27, undefined)),
  new Token(TokenType.Identifier, "TO_CHAR", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(1886, 39, 29, undefined))
  ], new SourceLocation(1887, 39, 30, undefined)),
  new Token(TokenType.LeftParen, "(", [], new SourceLocation(1894, 39, 37, undefined)),
  new Token(TokenType.Identifier, "number_hired", [], new SourceLocation(1895, 39, 38, undefined)),
  new Token(TokenType.RightParen, ")", [], new SourceLocation(1907, 39, 50, undefined)),
  new Token(TokenType.RightParen, ")", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(1908, 39, 51, undefined))
  ], new SourceLocation(1909, 39, 52, undefined)),
  new Token(TokenType.SemiColon, ";", [], new SourceLocation(1910, 39, 53, undefined)),
  new Token([TokenType.Identifier, Keyword.RETURN], "RETURN", [
    new Token(TokenType.WhiteSpace, "   ", [], new SourceLocation(1911, 39, 54, undefined)),
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(1914, 39, 57, undefined)),
    new Token(TokenType.WhiteSpace, "      ", [], new SourceLocation(1915, 40, 0, undefined))
  ], new SourceLocation(1921, 40, 6, undefined)),
  new Token(TokenType.Identifier, "new_emp_id", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(1927, 40, 12, undefined))
  ], new SourceLocation(1928, 40, 13, undefined)),
  new Token(TokenType.SemiColon, ";", [], new SourceLocation(1938, 40, 23, undefined)),
  new Token(Keyword.END, "END", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(1939, 40, 24, undefined)),
    new Token(TokenType.WhiteSpace, "   ", [], new SourceLocation(1940, 41, 0, undefined))
  ], new SourceLocation(1943, 41, 3, undefined)),
  new Token(TokenType.Identifier, "hire_employee", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(1946, 41, 6, undefined))
  ], new SourceLocation(1947, 41, 7, undefined)),
  new Token(TokenType.SemiColon, ";", [], new SourceLocation(1960, 41, 20, undefined)),
  new Token(Keyword.PROCEDURE, "PROCEDURE", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(1961, 41, 21, undefined)),
    new Token(TokenType.WhiteSpace, "   ", [], new SourceLocation(1962, 42, 0, undefined))
  ], new SourceLocation(1965, 42, 3, undefined)),
  new Token(TokenType.Identifier, "fire_employee", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(1974, 42, 12, undefined))
  ], new SourceLocation(1975, 42, 13, undefined)),
  new Token(TokenType.LeftParen, "(", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(1988, 42, 26, undefined))
  ], new SourceLocation(1989, 42, 27, undefined)),
  new Token(TokenType.Identifier, "emp_id", [], new SourceLocation(1990, 42, 28, undefined)),
  new Token(Keyword.NUMBER, "NUMBER", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(1996, 42, 34, undefined))
  ], new SourceLocation(1997, 42, 35, undefined)),
  new Token(TokenType.RightParen, ")", [], new SourceLocation(2003, 42, 41, undefined)),
  new Token(Keyword.IS, "IS", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2004, 42, 42, undefined))
  ], new SourceLocation(2005, 42, 43, undefined)),
  new Token(Keyword.BEGIN, "BEGIN", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(2007, 42, 45, undefined)),
    new Token(TokenType.WhiteSpace, "   ", [], new SourceLocation(2008, 43, 0, undefined))
  ], new SourceLocation(2011, 43, 3, undefined)),
  new Token(Keyword.DELETE, "DELETE", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(2016, 43, 8, undefined)),
    new Token(TokenType.WhiteSpace, "      ", [], new SourceLocation(2017, 44, 0, undefined))
  ], new SourceLocation(2023, 44, 6, undefined)),
  new Token(Keyword.FROM, "FROM", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2029, 44, 12, undefined))
  ], new SourceLocation(2030, 44, 13, undefined)),
  new Token(TokenType.Identifier, "employees", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2034, 44, 17, undefined))
  ], new SourceLocation(2035, 44, 18, undefined)),
  new Token(Keyword.WHERE, "WHERE", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2044, 44, 27, undefined))
  ], new SourceLocation(2045, 44, 28, undefined)),
  new Token(TokenType.Identifier, "employee_id", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2050, 44, 33, undefined))
  ], new SourceLocation(2051, 44, 34, undefined)),
  new Token([TokenType.Operator, Operator.EQ], "=", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2062, 44, 45, undefined))
  ], new SourceLocation(2063, 44, 46, undefined)),
  new Token(TokenType.Identifier, "emp_id", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2064, 44, 47, undefined))
  ], new SourceLocation(2065, 44, 48, undefined)),
  new Token(TokenType.SemiColon, ";", [], new SourceLocation(2071, 44, 54, undefined)),
  new Token(Keyword.END, "END", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(2072, 44, 55, undefined)),
    new Token(TokenType.WhiteSpace, "   ", [], new SourceLocation(2073, 45, 0, undefined))
  ], new SourceLocation(2076, 45, 3, undefined)),
  new Token(TokenType.Identifier, "fire_employee", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2079, 45, 6, undefined))
  ], new SourceLocation(2080, 45, 7, undefined)),
  new Token(TokenType.SemiColon, ";", [], new SourceLocation(2093, 45, 20, undefined)),
  new Token(Keyword.PROCEDURE, "PROCEDURE", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(2094, 45, 21, undefined)),
    new Token(TokenType.WhiteSpace, "   ", [], new SourceLocation(2095, 46, 0, undefined))
  ], new SourceLocation(2098, 46, 3, undefined)),
  new Token(TokenType.Identifier, "fire_employee", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2107, 46, 12, undefined))
  ], new SourceLocation(2108, 46, 13, undefined)),
  new Token(TokenType.LeftParen, "(", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2121, 46, 26, undefined))
  ], new SourceLocation(2122, 46, 27, undefined)),
  new Token(TokenType.Identifier, "emp_email", [], new SourceLocation(2123, 46, 28, undefined)),
  new Token(Keyword.VARCHAR2, "VARCHAR2", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2132, 46, 37, undefined))
  ], new SourceLocation(2133, 46, 38, undefined)),
  new Token(TokenType.RightParen, ")", [], new SourceLocation(2141, 46, 46, undefined)),
  new Token(Keyword.IS, "IS", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2142, 46, 47, undefined))
  ], new SourceLocation(2143, 46, 48, undefined)),
  new Token(Keyword.BEGIN, "BEGIN", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(2145, 46, 50, undefined)),
    new Token(TokenType.WhiteSpace, "   ", [], new SourceLocation(2146, 47, 0, undefined))
  ], new SourceLocation(2149, 47, 3, undefined)),
  new Token(Keyword.DELETE, "DELETE", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(2154, 47, 8, undefined)),
    new Token(TokenType.WhiteSpace, "      ", [], new SourceLocation(2155, 48, 0, undefined))
  ], new SourceLocation(2161, 48, 6, undefined)),
  new Token(Keyword.FROM, "FROM", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2167, 48, 12, undefined))
  ], new SourceLocation(2168, 48, 13, undefined)),
  new Token(TokenType.Identifier, "employees", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2172, 48, 17, undefined))
  ], new SourceLocation(2173, 48, 18, undefined)),
  new Token(Keyword.WHERE, "WHERE", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2182, 48, 27, undefined))
  ], new SourceLocation(2183, 48, 28, undefined)),
  new Token(TokenType.Identifier, "email", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2188, 48, 33, undefined))
  ], new SourceLocation(2189, 48, 34, undefined)),
  new Token([TokenType.Operator, Operator.EQ], "=", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2194, 48, 39, undefined))
  ], new SourceLocation(2195, 48, 40, undefined)),
  new Token(TokenType.Identifier, "emp_email", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2196, 48, 41, undefined))
  ], new SourceLocation(2197, 48, 42, undefined)),
  new Token(TokenType.SemiColon, ";", [], new SourceLocation(2206, 48, 51, undefined)),
  new Token(Keyword.END, "END", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(2207, 48, 52, undefined)),
    new Token(TokenType.WhiteSpace, "   ", [], new SourceLocation(2208, 49, 0, undefined))
  ], new SourceLocation(2211, 49, 3, undefined)),
  new Token(TokenType.Identifier, "fire_employee", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2214, 49, 6, undefined))
  ], new SourceLocation(2215, 49, 7, undefined)),
  new Token(TokenType.SemiColon, ";", [], new SourceLocation(2228, 49, 20, undefined)),
  new Token(Keyword.FUNCTION, "FUNCTION", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(2229, 49, 21, undefined)),
    new Token(TokenType.WhiteSpace, "  ", [], new SourceLocation(2230, 50, 0, undefined)),
    new Token(TokenType.LineComment, "-- Define local function, available only inside package", [], new SourceLocation(2232, 50, 2, undefined)),
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(2287, 50, 57, undefined)),
    new Token(TokenType.WhiteSpace, "   ", [], new SourceLocation(2288, 51, 0, undefined))
  ], new SourceLocation(2291, 51, 3, undefined)),
  new Token(TokenType.Identifier, "sal_ok", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2299, 51, 11, undefined))
  ], new SourceLocation(2300, 51, 12, undefined)),
  new Token(TokenType.LeftParen, "(", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2306, 51, 18, undefined))
  ], new SourceLocation(2307, 51, 19, undefined)),
  new Token(TokenType.Identifier, "jobid", [], new SourceLocation(2308, 51, 20, undefined)),
  new Token(Keyword.VARCHAR2, "VARCHAR2", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2313, 51, 25, undefined))
  ], new SourceLocation(2314, 51, 26, undefined)),
  new Token(TokenType.Comma, ",", [], new SourceLocation(2322, 51, 34, undefined)),
  new Token(TokenType.Identifier, "sal", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2323, 51, 35, undefined))
  ], new SourceLocation(2324, 51, 36, undefined)),
  new Token(Keyword.NUMBER, "NUMBER", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2327, 51, 39, undefined))
  ], new SourceLocation(2328, 51, 40, undefined)),
  new Token(TokenType.RightParen, ")", [], new SourceLocation(2334, 51, 46, undefined)),
  new Token([TokenType.Identifier, Keyword.RETURN], "RETURN", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2335, 51, 47, undefined))
  ], new SourceLocation(2336, 51, 48, undefined)),
  new Token(TokenType.Identifier, "BOOLEAN", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2342, 51, 54, undefined))
  ], new SourceLocation(2343, 51, 55, undefined)),
  new Token(Keyword.IS, "IS", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2350, 51, 62, undefined))
  ], new SourceLocation(2351, 51, 63, undefined)),
  new Token(TokenType.Identifier, "min_sal", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(2353, 51, 65, undefined)),
    new Token(TokenType.WhiteSpace, "      ", [], new SourceLocation(2354, 52, 0, undefined))
  ], new SourceLocation(2360, 52, 6, undefined)),
  new Token(Keyword.NUMBER, "NUMBER", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2367, 52, 13, undefined))
  ], new SourceLocation(2368, 52, 14, undefined)),
  new Token(TokenType.SemiColon, ";", [], new SourceLocation(2374, 52, 20, undefined)),
  new Token(TokenType.Identifier, "max_sal", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(2375, 52, 21, undefined)),
    new Token(TokenType.WhiteSpace, "      ", [], new SourceLocation(2376, 53, 0, undefined))
  ], new SourceLocation(2382, 53, 6, undefined)),
  new Token(Keyword.NUMBER, "NUMBER", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2389, 53, 13, undefined))
  ], new SourceLocation(2390, 53, 14, undefined)),
  new Token(TokenType.SemiColon, ";", [], new SourceLocation(2396, 53, 20, undefined)),
  new Token(Keyword.BEGIN, "BEGIN", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(2397, 53, 21, undefined)),
    new Token(TokenType.WhiteSpace, "   ", [], new SourceLocation(2398, 54, 0, undefined))
  ], new SourceLocation(2401, 54, 3, undefined)),
  new Token(Keyword.SELECT, "SELECT", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(2406, 54, 8, undefined)),
    new Token(TokenType.WhiteSpace, "      ", [], new SourceLocation(2407, 55, 0, undefined))
  ], new SourceLocation(2413, 55, 6, undefined)),
  new Token(TokenType.Identifier, "MIN", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2419, 55, 12, undefined))
  ], new SourceLocation(2420, 55, 13, undefined)),
  new Token(TokenType.LeftParen, "(", [], new SourceLocation(2423, 55, 16, undefined)),
  new Token(TokenType.Identifier, "salary", [], new SourceLocation(2424, 55, 17, undefined)),
  new Token(TokenType.RightParen, ")", [], new SourceLocation(2430, 55, 23, undefined)),
  new Token(TokenType.Comma, ",", [], new SourceLocation(2431, 55, 24, undefined)),
  new Token([TokenType.Identifier, Keyword.MAX], "MAX", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2432, 55, 25, undefined))
  ], new SourceLocation(2433, 55, 26, undefined)),
  new Token(TokenType.LeftParen, "(", [], new SourceLocation(2436, 55, 29, undefined)),
  new Token(TokenType.Identifier, "salary", [], new SourceLocation(2437, 55, 30, undefined)),
  new Token(TokenType.RightParen, ")", [], new SourceLocation(2443, 55, 36, undefined)),
  new Token(Keyword.INTO, "INTO", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2444, 55, 37, undefined))
  ], new SourceLocation(2445, 55, 38, undefined)),
  new Token(TokenType.Identifier, "min_sal", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2449, 55, 42, undefined))
  ], new SourceLocation(2450, 55, 43, undefined)),
  new Token(TokenType.Comma, ",", [], new SourceLocation(2457, 55, 50, undefined)),
  new Token(TokenType.Identifier, "max_sal", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2458, 55, 51, undefined))
  ], new SourceLocation(2459, 55, 52, undefined)),
  new Token(Keyword.FROM, "FROM", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2466, 55, 59, undefined))
  ], new SourceLocation(2467, 55, 60, undefined)),
  new Token(TokenType.Identifier, "employees", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2471, 55, 64, undefined))
  ], new SourceLocation(2472, 55, 65, undefined)),
  new Token(Keyword.WHERE, "WHERE", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(2481, 55, 74, undefined)),
    new Token(TokenType.WhiteSpace, "         ", [], new SourceLocation(2482, 56, 0, undefined))
  ], new SourceLocation(2491, 56, 9, undefined)),
  new Token(TokenType.Identifier, "job_id", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2496, 56, 14, undefined))
  ], new SourceLocation(2497, 56, 15, undefined)),
  new Token([TokenType.Operator, Operator.EQ], "=", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2503, 56, 21, undefined))
  ], new SourceLocation(2504, 56, 22, undefined)),
  new Token(TokenType.Identifier, "jobid", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2505, 56, 23, undefined))
  ], new SourceLocation(2506, 56, 24, undefined)),
  new Token(TokenType.SemiColon, ";", [], new SourceLocation(2511, 56, 29, undefined)),
  new Token([TokenType.Identifier, Keyword.RETURN], "RETURN", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(2512, 56, 30, undefined)),
    new Token(TokenType.WhiteSpace, "      ", [], new SourceLocation(2513, 57, 0, undefined))
  ], new SourceLocation(2519, 57, 6, undefined)),
  new Token(TokenType.LeftParen, "(", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2525, 57, 12, undefined))
  ], new SourceLocation(2526, 57, 13, undefined)),
  new Token(TokenType.Identifier, "sal", [], new SourceLocation(2527, 57, 14, undefined)),
  new Token(TokenType.Operator, ">=", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2530, 57, 17, undefined))
  ], new SourceLocation(2531, 57, 18, undefined)),
  new Token(TokenType.Identifier, "min_sal", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2533, 57, 20, undefined))
  ], new SourceLocation(2534, 57, 21, undefined)),
  new Token(TokenType.RightParen, ")", [], new SourceLocation(2541, 57, 28, undefined)),
  new Token(Keyword.AND, "AND", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2542, 57, 29, undefined))
  ], new SourceLocation(2543, 57, 30, undefined)),
  new Token(TokenType.LeftParen, "(", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2546, 57, 33, undefined))
  ], new SourceLocation(2547, 57, 34, undefined)),
  new Token(TokenType.Identifier, "sal", [], new SourceLocation(2548, 57, 35, undefined)),
  new Token(TokenType.Operator, "<=", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2551, 57, 38, undefined))
  ], new SourceLocation(2552, 57, 39, undefined)),
  new Token(TokenType.Identifier, "max_sal", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2554, 57, 41, undefined))
  ], new SourceLocation(2555, 57, 42, undefined)),
  new Token(TokenType.RightParen, ")", [], new SourceLocation(2562, 57, 49, undefined)),
  new Token(TokenType.SemiColon, ";", [], new SourceLocation(2563, 57, 50, undefined)),
  new Token(Keyword.END, "END", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(2564, 57, 51, undefined)),
    new Token(TokenType.WhiteSpace, "   ", [], new SourceLocation(2565, 58, 0, undefined))
  ], new SourceLocation(2568, 58, 3, undefined)),
  new Token(TokenType.Identifier, "sal_ok", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2571, 58, 6, undefined))
  ], new SourceLocation(2572, 58, 7, undefined)),
  new Token(TokenType.SemiColon, ";", [], new SourceLocation(2578, 58, 13, undefined)),
  new Token(Keyword.PROCEDURE, "PROCEDURE", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(2579, 58, 14, undefined)),
    new Token(TokenType.WhiteSpace, "   ", [], new SourceLocation(2580, 59, 0, undefined))
  ], new SourceLocation(2583, 59, 3, undefined)),
  new Token(TokenType.Identifier, "raise_salary", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2592, 59, 12, undefined))
  ], new SourceLocation(2593, 59, 13, undefined)),
  new Token(TokenType.LeftParen, "(", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2605, 59, 25, undefined))
  ], new SourceLocation(2606, 59, 26, undefined)),
  new Token(TokenType.Identifier, "emp_id", [], new SourceLocation(2607, 59, 27, undefined)),
  new Token(Keyword.NUMBER, "NUMBER", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2613, 59, 33, undefined))
  ], new SourceLocation(2614, 59, 34, undefined)),
  new Token(TokenType.Comma, ",", [], new SourceLocation(2620, 59, 40, undefined)),
  new Token(TokenType.Identifier, "amount", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2621, 59, 41, undefined))
  ], new SourceLocation(2622, 59, 42, undefined)),
  new Token(Keyword.NUMBER, "NUMBER", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2628, 59, 48, undefined))
  ], new SourceLocation(2629, 59, 49, undefined)),
  new Token(TokenType.RightParen, ")", [], new SourceLocation(2635, 59, 55, undefined)),
  new Token(Keyword.IS, "IS", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2636, 59, 56, undefined))
  ], new SourceLocation(2637, 59, 57, undefined)),
  new Token(TokenType.Identifier, "sal", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(2639, 59, 59, undefined)),
    new Token(TokenType.WhiteSpace, "      ", [], new SourceLocation(2640, 60, 0, undefined))
  ], new SourceLocation(2646, 60, 6, undefined)),
  new Token(Keyword.NUMBER, "NUMBER", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2649, 60, 9, undefined))
  ], new SourceLocation(2650, 60, 10, undefined)),
  new Token(TokenType.LeftParen, "(", [], new SourceLocation(2656, 60, 16, undefined)),
  new Token(TokenType.Number, "8", [], new SourceLocation(2657, 60, 17, undefined)),
  new Token(TokenType.Comma, ",", [], new SourceLocation(2658, 60, 18, undefined)),
  new Token(TokenType.Number, "2", [], new SourceLocation(2659, 60, 19, undefined)),
  new Token(TokenType.RightParen, ")", [], new SourceLocation(2660, 60, 20, undefined)),
  new Token(TokenType.SemiColon, ";", [], new SourceLocation(2661, 60, 21, undefined)),
  new Token(TokenType.Identifier, "jobid", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(2662, 60, 22, undefined)),
    new Token(TokenType.WhiteSpace, "      ", [], new SourceLocation(2663, 61, 0, undefined))
  ], new SourceLocation(2669, 61, 6, undefined)),
  new Token(Keyword.VARCHAR2, "VARCHAR2", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2674, 61, 11, undefined))
  ], new SourceLocation(2675, 61, 12, undefined)),
  new Token(TokenType.LeftParen, "(", [], new SourceLocation(2683, 61, 20, undefined)),
  new Token(TokenType.Number, "10", [], new SourceLocation(2684, 61, 21, undefined)),
  new Token(TokenType.RightParen, ")", [], new SourceLocation(2686, 61, 23, undefined)),
  new Token(TokenType.SemiColon, ";", [], new SourceLocation(2687, 61, 24, undefined)),
  new Token(Keyword.BEGIN, "BEGIN", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(2688, 61, 25, undefined)),
    new Token(TokenType.WhiteSpace, "   ", [], new SourceLocation(2689, 62, 0, undefined))
  ], new SourceLocation(2692, 62, 3, undefined)),
  new Token(Keyword.SELECT, "SELECT", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(2697, 62, 8, undefined)),
    new Token(TokenType.WhiteSpace, "      ", [], new SourceLocation(2698, 63, 0, undefined))
  ], new SourceLocation(2704, 63, 6, undefined)),
  new Token(TokenType.Identifier, "job_id", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2710, 63, 12, undefined))
  ], new SourceLocation(2711, 63, 13, undefined)),
  new Token(TokenType.Comma, ",", [], new SourceLocation(2717, 63, 19, undefined)),
  new Token(TokenType.Identifier, "salary", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2718, 63, 20, undefined))
  ], new SourceLocation(2719, 63, 21, undefined)),
  new Token(Keyword.INTO, "INTO", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2725, 63, 27, undefined))
  ], new SourceLocation(2726, 63, 28, undefined)),
  new Token(TokenType.Identifier, "jobid", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2730, 63, 32, undefined))
  ], new SourceLocation(2731, 63, 33, undefined)),
  new Token(TokenType.Comma, ",", [], new SourceLocation(2736, 63, 38, undefined)),
  new Token(TokenType.Identifier, "sal", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2737, 63, 39, undefined))
  ], new SourceLocation(2738, 63, 40, undefined)),
  new Token(Keyword.FROM, "FROM", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2741, 63, 43, undefined))
  ], new SourceLocation(2742, 63, 44, undefined)),
  new Token(TokenType.Identifier, "employees", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2746, 63, 48, undefined))
  ], new SourceLocation(2747, 63, 49, undefined)),
  new Token(Keyword.WHERE, "WHERE", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(2756, 63, 58, undefined)),
    new Token(TokenType.WhiteSpace, "             ", [], new SourceLocation(2757, 64, 0, undefined))
  ], new SourceLocation(2770, 64, 13, undefined)),
  new Token(TokenType.Identifier, "employee_id", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2775, 64, 18, undefined))
  ], new SourceLocation(2776, 64, 19, undefined)),
  new Token([TokenType.Operator, Operator.EQ], "=", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2787, 64, 30, undefined))
  ], new SourceLocation(2788, 64, 31, undefined)),
  new Token(TokenType.Identifier, "emp_id", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2789, 64, 32, undefined))
  ], new SourceLocation(2790, 64, 33, undefined)),
  new Token(TokenType.SemiColon, ";", [], new SourceLocation(2796, 64, 39, undefined)),
  new Token(Keyword.IF, "IF", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(2797, 64, 40, undefined)),
    new Token(TokenType.WhiteSpace, "      ", [], new SourceLocation(2798, 65, 0, undefined))
  ], new SourceLocation(2804, 65, 6, undefined)),
  new Token(TokenType.Identifier, "sal_ok", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2806, 65, 8, undefined))
  ], new SourceLocation(2807, 65, 9, undefined)),
  new Token(TokenType.LeftParen, "(", [], new SourceLocation(2813, 65, 15, undefined)),
  new Token(TokenType.Identifier, "jobid", [], new SourceLocation(2814, 65, 16, undefined)),
  new Token(TokenType.Comma, ",", [], new SourceLocation(2819, 65, 21, undefined)),
  new Token(TokenType.Identifier, "sal", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2820, 65, 22, undefined))
  ], new SourceLocation(2821, 65, 23, undefined)),
  new Token([TokenType.Operator, Operator.PLUS], "+", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2824, 65, 26, undefined))
  ], new SourceLocation(2825, 65, 27, undefined)),
  new Token(TokenType.Identifier, "amount", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2826, 65, 28, undefined))
  ], new SourceLocation(2827, 65, 29, undefined)),
  new Token(TokenType.RightParen, ")", [], new SourceLocation(2833, 65, 35, undefined)),
  new Token(Keyword.THEN, "THEN", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2834, 65, 36, undefined))
  ], new SourceLocation(2835, 65, 37, undefined)),
  new Token(Keyword.UPDATE, "UPDATE", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(2839, 65, 41, undefined)),
    new Token(TokenType.WhiteSpace, "         ", [], new SourceLocation(2840, 66, 0, undefined))
  ], new SourceLocation(2849, 66, 9, undefined)),
  new Token(TokenType.Identifier, "employees", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2855, 66, 15, undefined))
  ], new SourceLocation(2856, 66, 16, undefined)),
  new Token(Keyword.SET, "SET", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2865, 66, 25, undefined))
  ], new SourceLocation(2866, 66, 26, undefined)),
  new Token(TokenType.Identifier, "salary", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2869, 66, 29, undefined))
  ], new SourceLocation(2870, 66, 30, undefined)),
  new Token([TokenType.Operator, Operator.EQ], "=", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2876, 66, 36, undefined))
  ], new SourceLocation(2877, 66, 37, undefined)),
  new Token(TokenType.Identifier, "salary", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2878, 66, 38, undefined))
  ], new SourceLocation(2879, 66, 39, undefined)),
  new Token([TokenType.Operator, Operator.PLUS], "+", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2885, 66, 45, undefined))
  ], new SourceLocation(2886, 66, 46, undefined)),
  new Token(TokenType.Identifier, "amount", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2887, 66, 47, undefined))
  ], new SourceLocation(2888, 66, 48, undefined)),
  new Token(Keyword.WHERE, "WHERE", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2894, 66, 54, undefined))
  ], new SourceLocation(2895, 66, 55, undefined)),
  new Token(TokenType.Identifier, "employee_id", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2900, 66, 60, undefined))
  ], new SourceLocation(2901, 66, 61, undefined)),
  new Token([TokenType.Operator, Operator.EQ], "=", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2912, 66, 72, undefined))
  ], new SourceLocation(2913, 66, 73, undefined)),
  new Token(TokenType.Identifier, "emp_id", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2914, 66, 74, undefined))
  ], new SourceLocation(2915, 66, 75, undefined)),
  new Token(TokenType.SemiColon, ";", [], new SourceLocation(2921, 66, 81, undefined)),
  new Token(Keyword.ELSE, "ELSE", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(2922, 66, 82, undefined)),
    new Token(TokenType.WhiteSpace, "      ", [], new SourceLocation(2923, 67, 0, undefined))
  ], new SourceLocation(2929, 67, 6, undefined)),
  new Token([TokenType.Identifier, Keyword.RAISE], "RAISE", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(2933, 67, 10, undefined)),
    new Token(TokenType.WhiteSpace, "         ", [], new SourceLocation(2934, 68, 0, undefined))
  ], new SourceLocation(2943, 68, 9, undefined)),
  new Token(TokenType.Identifier, "invalid_salary", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2948, 68, 14, undefined))
  ], new SourceLocation(2949, 68, 15, undefined)),
  new Token(TokenType.SemiColon, ";", [], new SourceLocation(2963, 68, 29, undefined)),
  new Token(Keyword.END, "END", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(2964, 68, 30, undefined)),
    new Token(TokenType.WhiteSpace, "      ", [], new SourceLocation(2965, 69, 0, undefined))
  ], new SourceLocation(2971, 69, 6, undefined)),
  new Token(Keyword.IF, "IF", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(2974, 69, 9, undefined))
  ], new SourceLocation(2975, 69, 10, undefined)),
  new Token(TokenType.SemiColon, ";", [], new SourceLocation(2977, 69, 12, undefined)),
  new Token(Keyword.EXCEPTION, "EXCEPTION", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(2978, 69, 13, undefined)),
    new Token(TokenType.WhiteSpace, "   ", [], new SourceLocation(2979, 70, 0, undefined))
  ], new SourceLocation(2982, 70, 3, undefined)),
  new Token(Keyword.WHEN, "WHEN", [
    new Token(TokenType.WhiteSpace, "  ", [], new SourceLocation(2991, 70, 12, undefined)),
    new Token(TokenType.LineComment, "-- exception-handling part starts here", [], new SourceLocation(2993, 70, 14, undefined)),
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(3031, 70, 52, undefined)),
    new Token(TokenType.WhiteSpace, "     ", [], new SourceLocation(3032, 71, 0, undefined))
  ], new SourceLocation(3037, 71, 5, undefined)),
  new Token(TokenType.Identifier, "invalid_salary", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(3041, 71, 9, undefined))
  ], new SourceLocation(3042, 71, 10, undefined)),
  new Token(Keyword.THEN, "THEN", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(3056, 71, 24, undefined))
  ], new SourceLocation(3057, 71, 25, undefined)),
  new Token(TokenType.Identifier, "DBMS_OUTPUT", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(3061, 71, 29, undefined)),
    new Token(TokenType.WhiteSpace, "       ", [], new SourceLocation(3062, 72, 0, undefined))
  ], new SourceLocation(3069, 72, 7, undefined)),
  new Token(TokenType.Dot, ".", [], new SourceLocation(3080, 72, 18, undefined)),
  new Token(TokenType.Identifier, "PUT_LINE", [], new SourceLocation(3081, 72, 19, undefined)),
  new Token(TokenType.LeftParen, "(", [], new SourceLocation(3089, 72, 27, undefined)),
  new Token(TokenType.String, "'The salary is out of the specified range.'", [], new SourceLocation(3090, 72, 28, undefined)),
  new Token(TokenType.RightParen, ")", [], new SourceLocation(3133, 72, 71, undefined)),
  new Token(TokenType.SemiColon, ";", [], new SourceLocation(3134, 72, 72, undefined)),
  new Token(Keyword.END, "END", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(3135, 72, 73, undefined)),
    new Token(TokenType.WhiteSpace, "   ", [], new SourceLocation(3136, 73, 0, undefined))
  ], new SourceLocation(3139, 73, 3, undefined)),
  new Token(TokenType.Identifier, "raise_salary", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(3142, 73, 6, undefined))
  ], new SourceLocation(3143, 73, 7, undefined)),
  new Token(TokenType.SemiColon, ";", [], new SourceLocation(3155, 73, 19, undefined)),
  new Token(Keyword.FUNCTION, "FUNCTION", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(3156, 73, 20, undefined)),
    new Token(TokenType.WhiteSpace, "   ", [], new SourceLocation(3157, 74, 0, undefined))
  ], new SourceLocation(3160, 74, 3, undefined)),
  new Token(TokenType.Identifier, "nth_highest_salary", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(3168, 74, 11, undefined))
  ], new SourceLocation(3169, 74, 12, undefined)),
  new Token(TokenType.LeftParen, "(", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(3187, 74, 30, undefined))
  ], new SourceLocation(3188, 74, 31, undefined)),
  new Token(TokenType.Identifier, "n", [], new SourceLocation(3189, 74, 32, undefined)),
  new Token(Keyword.NUMBER, "NUMBER", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(3190, 74, 33, undefined))
  ], new SourceLocation(3191, 74, 34, undefined)),
  new Token(TokenType.RightParen, ")", [], new SourceLocation(3197, 74, 40, undefined)),
  new Token([TokenType.Identifier, Keyword.RETURN], "RETURN", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(3198, 74, 41, undefined))
  ], new SourceLocation(3199, 74, 42, undefined)),
  new Token(TokenType.Identifier, "EmpRecTyp", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(3205, 74, 48, undefined))
  ], new SourceLocation(3206, 74, 49, undefined)),
  new Token(Keyword.IS, "IS", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(3215, 74, 58, undefined))
  ], new SourceLocation(3216, 74, 59, undefined)),
  new Token(TokenType.Identifier, "emp_rec", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(3218, 74, 61, undefined)),
    new Token(TokenType.WhiteSpace, "      ", [], new SourceLocation(3219, 75, 0, undefined))
  ], new SourceLocation(3225, 75, 6, undefined)),
  new Token(TokenType.Identifier, "EmpRecTyp", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(3232, 75, 13, undefined))
  ], new SourceLocation(3233, 75, 14, undefined)),
  new Token(TokenType.SemiColon, ";", [], new SourceLocation(3242, 75, 23, undefined)),
  new Token(Keyword.BEGIN, "BEGIN", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(3243, 75, 24, undefined)),
    new Token(TokenType.WhiteSpace, "   ", [], new SourceLocation(3244, 76, 0, undefined))
  ], new SourceLocation(3247, 76, 3, undefined)),
  new Token([TokenType.Identifier, Keyword.OPEN], "OPEN", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(3252, 76, 8, undefined)),
    new Token(TokenType.WhiteSpace, "      ", [], new SourceLocation(3253, 77, 0, undefined))
  ], new SourceLocation(3259, 77, 6, undefined)),
  new Token(TokenType.Identifier, "desc_salary", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(3263, 77, 10, undefined))
  ], new SourceLocation(3264, 77, 11, undefined)),
  new Token(TokenType.SemiColon, ";", [], new SourceLocation(3275, 77, 22, undefined)),
  new Token(Keyword.FOR, "FOR", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(3276, 77, 23, undefined)),
    new Token(TokenType.WhiteSpace, "      ", [], new SourceLocation(3277, 78, 0, undefined))
  ], new SourceLocation(3283, 78, 6, undefined)),
  new Token(TokenType.Identifier, "i", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(3286, 78, 9, undefined))
  ], new SourceLocation(3287, 78, 10, undefined)),
  new Token(Keyword.IN, "IN", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(3288, 78, 11, undefined))
  ], new SourceLocation(3289, 78, 12, undefined)),
  new Token(TokenType.Number, "1", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(3291, 78, 14, undefined))
  ], new SourceLocation(3292, 78, 15, undefined)),
  new Token(TokenType.Dot, ".", [], new SourceLocation(3293, 78, 16, undefined)),
  new Token(TokenType.Dot, ".", [], new SourceLocation(3294, 78, 17, undefined)),
  new Token(TokenType.Identifier, "n", [], new SourceLocation(3295, 78, 18, undefined)),
  new Token([TokenType.Identifier, Keyword.LOOP], "LOOP", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(3296, 78, 19, undefined))
  ], new SourceLocation(3297, 78, 20, undefined)),
  new Token(Keyword.FETCH, "FETCH", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(3301, 78, 24, undefined)),
    new Token(TokenType.WhiteSpace, "         ", [], new SourceLocation(3302, 79, 0, undefined))
  ], new SourceLocation(3311, 79, 9, undefined)),
  new Token(TokenType.Identifier, "desc_salary", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(3316, 79, 14, undefined))
  ], new SourceLocation(3317, 79, 15, undefined)),
  new Token(Keyword.INTO, "INTO", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(3328, 79, 26, undefined))
  ], new SourceLocation(3329, 79, 27, undefined)),
  new Token(TokenType.Identifier, "emp_rec", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(3333, 79, 31, undefined))
  ], new SourceLocation(3334, 79, 32, undefined)),
  new Token(TokenType.SemiColon, ";", [], new SourceLocation(3341, 79, 39, undefined)),
  new Token(Keyword.END, "END", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(3342, 79, 40, undefined)),
    new Token(TokenType.WhiteSpace, "      ", [], new SourceLocation(3343, 80, 0, undefined))
  ], new SourceLocation(3349, 80, 6, undefined)),
  new Token([TokenType.Identifier, Keyword.LOOP], "LOOP", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(3352, 80, 9, undefined))
  ], new SourceLocation(3353, 80, 10, undefined)),
  new Token(TokenType.SemiColon, ";", [], new SourceLocation(3357, 80, 14, undefined)),
  new Token([TokenType.Identifier, Keyword.CLOSE], "CLOSE", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(3358, 80, 15, undefined)),
    new Token(TokenType.WhiteSpace, "      ", [], new SourceLocation(3359, 81, 0, undefined))
  ], new SourceLocation(3365, 81, 6, undefined)),
  new Token(TokenType.Identifier, "desc_salary", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(3370, 81, 11, undefined))
  ], new SourceLocation(3371, 81, 12, undefined)),
  new Token(TokenType.SemiColon, ";", [], new SourceLocation(3382, 81, 23, undefined)),
  new Token([TokenType.Identifier, Keyword.RETURN], "RETURN", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(3383, 81, 24, undefined)),
    new Token(TokenType.WhiteSpace, "      ", [], new SourceLocation(3384, 82, 0, undefined))
  ], new SourceLocation(3390, 82, 6, undefined)),
  new Token(TokenType.Identifier, "emp_rec", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(3396, 82, 12, undefined))
  ], new SourceLocation(3397, 82, 13, undefined)),
  new Token(TokenType.SemiColon, ";", [], new SourceLocation(3404, 82, 20, undefined)),
  new Token(Keyword.END, "END", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(3405, 82, 21, undefined)),
    new Token(TokenType.WhiteSpace, "   ", [], new SourceLocation(3406, 83, 0, undefined))
  ], new SourceLocation(3409, 83, 3, undefined)),
  new Token(TokenType.Identifier, "nth_highest_salary", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(3412, 83, 6, undefined))
  ], new SourceLocation(3413, 83, 7, undefined)),
  new Token(TokenType.SemiColon, ";", [], new SourceLocation(3431, 83, 25, undefined)),
  new Token(Keyword.BEGIN, "BEGIN", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(3432, 83, 26, undefined))
  ], new SourceLocation(3433, 84, 0, undefined)),
  new Token(Keyword.INSERT, "INSERT", [
    new Token(TokenType.WhiteSpace, "  ", [], new SourceLocation(3438, 84, 5, undefined)),
    new Token(TokenType.LineComment, "-- initialization part starts here", [], new SourceLocation(3440, 84, 7, undefined)),
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(3474, 84, 41, undefined)),
    new Token(TokenType.WhiteSpace, "   ", [], new SourceLocation(3475, 85, 0, undefined))
  ], new SourceLocation(3478, 85, 3, undefined)),
  new Token(Keyword.INTO, "INTO", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(3484, 85, 9, undefined))
  ], new SourceLocation(3485, 85, 10, undefined)),
  new Token(TokenType.Identifier, "emp_audit", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(3489, 85, 14, undefined))
  ], new SourceLocation(3490, 85, 15, undefined)),
  new Token(Keyword.VALUES, "VALUES", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(3499, 85, 24, undefined))
  ], new SourceLocation(3500, 85, 25, undefined)),
  new Token(TokenType.LeftParen, "(", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(3506, 85, 31, undefined))
  ], new SourceLocation(3507, 85, 32, undefined)),
  new Token(Keyword.SYSDATE, "SYSDATE", [], new SourceLocation(3508, 85, 33, undefined)),
  new Token(TokenType.Comma, ",", [], new SourceLocation(3515, 85, 40, undefined)),
  new Token(Keyword.USER, "USER", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(3516, 85, 41, undefined))
  ], new SourceLocation(3517, 85, 42, undefined)),
  new Token(TokenType.Comma, ",", [], new SourceLocation(3521, 85, 46, undefined)),
  new Token(TokenType.String, "'EMP_ADMIN'", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(3522, 85, 47, undefined))
  ], new SourceLocation(3523, 85, 48, undefined)),
  new Token(TokenType.RightParen, ")", [], new SourceLocation(3534, 85, 59, undefined)),
  new Token(TokenType.SemiColon, ";", [], new SourceLocation(3535, 85, 60, undefined)),
  new Token(TokenType.Identifier, "number_hired", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(3536, 85, 61, undefined)),
    new Token(TokenType.WhiteSpace, "   ", [], new SourceLocation(3537, 86, 0, undefined))
  ], new SourceLocation(3540, 86, 3, undefined)),
  new Token([TokenType.Operator, Operator.ASSIGN], ":=", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(3552, 86, 15, undefined))
  ], new SourceLocation(3553, 86, 16, undefined)),
  new Token(TokenType.Number, "0", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(3555, 86, 18, undefined))
  ], new SourceLocation(3556, 86, 19, undefined)),
  new Token(TokenType.SemiColon, ";", [], new SourceLocation(3557, 86, 20, undefined)),
  new Token(Keyword.END, "END", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(3558, 86, 21, undefined))
  ], new SourceLocation(3559, 87, 0, undefined)),
  new Token(TokenType.Identifier, "emp_admin", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(3562, 87, 3, undefined))
  ], new SourceLocation(3563, 87, 4, undefined)),
  new Token(TokenType.SemiColon, ";", [], new SourceLocation(3572, 87, 13, undefined)),
  new Token(TokenType.Delimiter, "/", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(3573, 87, 14, undefined))
  ], new SourceLocation(3574, 88, 0, undefined)),
  new Token(Keyword.DECLARE, "DECLARE", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(3575, 88, 1, undefined)),
    new Token(TokenType.LineComment, "-- calling the package procedures", [], new SourceLocation(3576, 89, 0, undefined)),
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(3609, 89, 33, undefined))
  ], new SourceLocation(3610, 90, 0, undefined)),
  new Token(TokenType.Identifier, "new_emp_id", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(3617, 90, 7, undefined)),
    new Token(TokenType.WhiteSpace, "  ", [], new SourceLocation(3618, 91, 0, undefined))
  ], new SourceLocation(3620, 91, 2, undefined)),
  new Token(Keyword.NUMBER, "NUMBER", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(3630, 91, 12, undefined))
  ], new SourceLocation(3631, 91, 13, undefined)),
  new Token(TokenType.LeftParen, "(", [], new SourceLocation(3637, 91, 19, undefined)),
  new Token(TokenType.Number, "6", [], new SourceLocation(3638, 91, 20, undefined)),
  new Token(TokenType.RightParen, ")", [], new SourceLocation(3639, 91, 21, undefined)),
  new Token(TokenType.SemiColon, ";", [], new SourceLocation(3640, 91, 22, undefined)),
  new Token(Keyword.BEGIN, "BEGIN", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(3641, 91, 23, undefined))
  ], new SourceLocation(3642, 92, 0, undefined)),
  new Token(TokenType.Identifier, "new_emp_id", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(3647, 92, 5, undefined)),
    new Token(TokenType.WhiteSpace, "  ", [], new SourceLocation(3648, 93, 0, undefined))
  ], new SourceLocation(3650, 93, 2, undefined)),
  new Token([TokenType.Operator, Operator.ASSIGN], ":=", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(3660, 93, 12, undefined))
  ], new SourceLocation(3661, 93, 13, undefined)),
  new Token(TokenType.Identifier, "emp_admin", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(3663, 93, 15, undefined))
  ], new SourceLocation(3664, 93, 16, undefined)),
  new Token(TokenType.Dot, ".", [], new SourceLocation(3673, 93, 25, undefined)),
  new Token(TokenType.Identifier, "hire_employee", [], new SourceLocation(3674, 93, 26, undefined)),
  new Token(TokenType.LeftParen, "(", [], new SourceLocation(3687, 93, 39, undefined)),
  new Token(TokenType.String, "'Belden'", [], new SourceLocation(3688, 93, 40, undefined)),
  new Token(TokenType.Comma, ",", [], new SourceLocation(3696, 93, 48, undefined)),
  new Token(TokenType.String, "'Enrique'", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(3697, 93, 49, undefined))
  ], new SourceLocation(3698, 93, 50, undefined)),
  new Token(TokenType.Comma, ",", [], new SourceLocation(3707, 93, 59, undefined)),
  new Token(TokenType.String, "'EBELDEN'", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(3708, 93, 60, undefined))
  ], new SourceLocation(3709, 93, 61, undefined)),
  new Token(TokenType.Comma, ",", [], new SourceLocation(3718, 93, 70, undefined)),
  new Token(TokenType.String, "'555.111.2222'", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(3719, 93, 71, undefined)),
    new Token(TokenType.WhiteSpace, "                   ", [], new SourceLocation(3720, 94, 0, undefined))
  ], new SourceLocation(3739, 94, 19, undefined)),
  new Token(TokenType.Comma, ",", [], new SourceLocation(3753, 94, 33, undefined)),
  new Token(TokenType.String, "'ST_CLERK'", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(3754, 94, 34, undefined))
  ], new SourceLocation(3755, 94, 35, undefined)),
  new Token(TokenType.Comma, ",", [], new SourceLocation(3765, 94, 45, undefined)),
  new Token(TokenType.Number, "2500", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(3766, 94, 46, undefined))
  ], new SourceLocation(3767, 94, 47, undefined)),
  new Token(TokenType.Comma, ",", [], new SourceLocation(3771, 94, 51, undefined)),
  new Token(TokenType.Number, ".1", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(3772, 94, 52, undefined))
  ], new SourceLocation(3773, 94, 53, undefined)),
  new Token(TokenType.Comma, ",", [], new SourceLocation(3775, 94, 55, undefined)),
  new Token(TokenType.Number, "101", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(3776, 94, 56, undefined))
  ], new SourceLocation(3777, 94, 57, undefined)),
  new Token(TokenType.Comma, ",", [], new SourceLocation(3780, 94, 60, undefined)),
  new Token(TokenType.Number, "110", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(3781, 94, 61, undefined))
  ], new SourceLocation(3782, 94, 62, undefined)),
  new Token(TokenType.RightParen, ")", [], new SourceLocation(3785, 94, 65, undefined)),
  new Token(TokenType.SemiColon, ";", [], new SourceLocation(3786, 94, 66, undefined)),
  new Token(TokenType.Identifier, "DBMS_OUTPUT", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(3787, 94, 67, undefined)),
    new Token(TokenType.WhiteSpace, "  ", [], new SourceLocation(3788, 95, 0, undefined))
  ], new SourceLocation(3790, 95, 2, undefined)),
  new Token(TokenType.Dot, ".", [], new SourceLocation(3801, 95, 13, undefined)),
  new Token(TokenType.Identifier, "PUT_LINE", [], new SourceLocation(3802, 95, 14, undefined)),
  new Token(TokenType.LeftParen, "(", [], new SourceLocation(3810, 95, 22, undefined)),
  new Token(TokenType.String, "'The new employee id is '", [], new SourceLocation(3811, 95, 23, undefined)),
  new Token(TokenType.Operator, "||", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(3836, 95, 48, undefined))
  ], new SourceLocation(3837, 95, 49, undefined)),
  new Token(TokenType.Identifier, "TO_CHAR", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(3839, 95, 51, undefined))
  ], new SourceLocation(3840, 95, 52, undefined)),
  new Token(TokenType.LeftParen, "(", [], new SourceLocation(3847, 95, 59, undefined)),
  new Token(TokenType.Identifier, "new_emp_id", [], new SourceLocation(3848, 95, 60, undefined)),
  new Token(TokenType.RightParen, ")", [], new SourceLocation(3858, 95, 70, undefined)),
  new Token(TokenType.RightParen, ")", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(3859, 95, 71, undefined))
  ], new SourceLocation(3860, 95, 72, undefined)),
  new Token(TokenType.SemiColon, ";", [], new SourceLocation(3861, 95, 73, undefined)),
  new Token(TokenType.Identifier, "EMP_ADMIN", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(3862, 95, 74, undefined)),
    new Token(TokenType.WhiteSpace, "  ", [], new SourceLocation(3863, 96, 0, undefined))
  ], new SourceLocation(3865, 96, 2, undefined)),
  new Token(TokenType.Dot, ".", [], new SourceLocation(3874, 96, 11, undefined)),
  new Token(TokenType.Identifier, "raise_salary", [], new SourceLocation(3875, 96, 12, undefined)),
  new Token(TokenType.LeftParen, "(", [], new SourceLocation(3887, 96, 24, undefined)),
  new Token(TokenType.Identifier, "new_emp_id", [], new SourceLocation(3888, 96, 25, undefined)),
  new Token(TokenType.Comma, ",", [], new SourceLocation(3898, 96, 35, undefined)),
  new Token(TokenType.Number, "100", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(3899, 96, 36, undefined))
  ], new SourceLocation(3900, 96, 37, undefined)),
  new Token(TokenType.RightParen, ")", [], new SourceLocation(3903, 96, 40, undefined)),
  new Token(TokenType.SemiColon, ";", [], new SourceLocation(3904, 96, 41, undefined)),
  new Token(TokenType.Identifier, "DBMS_OUTPUT", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(3905, 96, 42, undefined)),
    new Token(TokenType.WhiteSpace, "  ", [], new SourceLocation(3906, 97, 0, undefined))
  ], new SourceLocation(3908, 97, 2, undefined)),
  new Token(TokenType.Dot, ".", [], new SourceLocation(3919, 97, 13, undefined)),
  new Token(TokenType.Identifier, "PUT_LINE", [], new SourceLocation(3920, 97, 14, undefined)),
  new Token(TokenType.LeftParen, "(", [], new SourceLocation(3928, 97, 22, undefined)),
  new Token(TokenType.String, "'The 10th highest salary is '", [], new SourceLocation(3929, 97, 23, undefined)),
  new Token(TokenType.Operator, "||", [], new SourceLocation(3958, 97, 52, undefined)),
  new Token(TokenType.Identifier, "TO_CHAR", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(3960, 97, 54, undefined)),
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(3961, 97, 55, undefined)),
    new Token(TokenType.WhiteSpace, "    ", [], new SourceLocation(3962, 98, 0, undefined))
  ], new SourceLocation(3966, 98, 4, undefined)),
  new Token(TokenType.LeftParen, "(", [], new SourceLocation(3973, 98, 11, undefined)),
  new Token(TokenType.Identifier, "emp_admin", [], new SourceLocation(3974, 98, 12, undefined)),
  new Token(TokenType.Dot, ".", [], new SourceLocation(3983, 98, 21, undefined)),
  new Token(TokenType.Identifier, "nth_highest_salary", [], new SourceLocation(3984, 98, 22, undefined)),
  new Token(TokenType.LeftParen, "(", [], new SourceLocation(4002, 98, 40, undefined)),
  new Token(TokenType.Number, "10", [], new SourceLocation(4003, 98, 41, undefined)),
  new Token(TokenType.RightParen, ")", [], new SourceLocation(4005, 98, 43, undefined)),
  new Token(TokenType.Dot, ".", [], new SourceLocation(4006, 98, 44, undefined)),
  new Token(TokenType.Identifier, "sal", [], new SourceLocation(4007, 98, 45, undefined)),
  new Token(TokenType.RightParen, ")", [], new SourceLocation(4010, 98, 48, undefined)),
  new Token(TokenType.Operator, "||", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(4011, 98, 49, undefined))
  ], new SourceLocation(4012, 98, 50, undefined)),
  new Token(TokenType.String, "', belonging to employee: '", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(4014, 98, 52, undefined))
  ], new SourceLocation(4015, 98, 53, undefined)),
  new Token(TokenType.Operator, "||", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(4042, 98, 80, undefined)),
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(4043, 98, 81, undefined)),
    new Token(TokenType.WhiteSpace, "    ", [], new SourceLocation(4044, 99, 0, undefined))
  ], new SourceLocation(4048, 99, 4, undefined)),
  new Token(TokenType.Identifier, "TO_CHAR", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(4050, 99, 6, undefined))
  ], new SourceLocation(4051, 99, 7, undefined)),
  new Token(TokenType.LeftParen, "(", [], new SourceLocation(4058, 99, 14, undefined)),
  new Token(TokenType.Identifier, "emp_admin", [], new SourceLocation(4059, 99, 15, undefined)),
  new Token(TokenType.Dot, ".", [], new SourceLocation(4068, 99, 24, undefined)),
  new Token(TokenType.Identifier, "nth_highest_salary", [], new SourceLocation(4069, 99, 25, undefined)),
  new Token(TokenType.LeftParen, "(", [], new SourceLocation(4087, 99, 43, undefined)),
  new Token(TokenType.Number, "10", [], new SourceLocation(4088, 99, 44, undefined)),
  new Token(TokenType.RightParen, ")", [], new SourceLocation(4090, 99, 46, undefined)),
  new Token(TokenType.Dot, ".", [], new SourceLocation(4091, 99, 47, undefined)),
  new Token(TokenType.Identifier, "emp_id", [], new SourceLocation(4092, 99, 48, undefined)),
  new Token(TokenType.RightParen, ")", [], new SourceLocation(4098, 99, 54, undefined)),
  new Token(TokenType.RightParen, ")", [
    new Token(TokenType.WhiteSpace, " ", [], new SourceLocation(4099, 99, 55, undefined))
  ], new SourceLocation(4100, 99, 56, undefined)),
  new Token(TokenType.SemiColon, ";", [], new SourceLocation(4101, 99, 57, undefined)),
  new Token(TokenType.Identifier, "emp_admin", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(4102, 99, 58, undefined)),
    new Token(TokenType.WhiteSpace, "  ", [], new SourceLocation(4103, 100, 0, undefined))
  ], new SourceLocation(4105, 100, 2, undefined)),
  new Token(TokenType.Dot, ".", [], new SourceLocation(4114, 100, 11, undefined)),
  new Token(TokenType.Identifier, "fire_employee", [], new SourceLocation(4115, 100, 12, undefined)),
  new Token(TokenType.LeftParen, "(", [], new SourceLocation(4128, 100, 25, undefined)),
  new Token(TokenType.Identifier, "new_emp_id", [], new SourceLocation(4129, 100, 26, undefined)),
  new Token(TokenType.RightParen, ")", [], new SourceLocation(4139, 100, 36, undefined)),
  new Token(TokenType.SemiColon, ";", [], new SourceLocation(4140, 100, 37, undefined)),
  new Token(Keyword.END, "END", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(4141, 100, 38, undefined)),
    new Token(TokenType.LineComment, "-- you could also delete the newly added employee as follows:", [], new SourceLocation(4142, 101, 0, undefined)),
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(4203, 101, 61, undefined)),
    new Token(TokenType.LineComment, "--  emp_admin.fire_employee('EBELDEN');", [], new SourceLocation(4204, 102, 0, undefined)),
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(4243, 102, 39, undefined))
  ], new SourceLocation(4244, 103, 0, undefined)),
  new Token(TokenType.SemiColon, ";", [], new SourceLocation(4247, 103, 3, undefined)),
  new Token(TokenType.Delimiter, "/", [
    new Token(TokenType.LineBreak, "\n", [], new SourceLocation(4248, 103, 4, undefined))
  ], new SourceLocation(4249, 104, 0, undefined)),
  new Token(TokenType.Eof, "", [], new SourceLocation(4250, 104, 1, undefined))
]