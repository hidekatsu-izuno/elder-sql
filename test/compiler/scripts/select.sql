/*#define listEmployees
 * 
 * List employees
 */
select * from employee where
/*#if employeeId != null */
  employee_id = /*#{employeeId}*/99
  and employee_id = /*#{employeeId}*/99
  /*#if employeeName != null */
    and employee_name in /*#{employeeName}*/('hoge')
    or employee_name in /*#{employeeName}*/('hoge')
  /*#elsif employeeName === "test"*/
    and
    employee_name = /*\${subquery}*/
    or
    employee_name = /*\${subquery}*/
  /*#else*/
    and
    employee_name is null
  /*#end*/

  /*#if employeeTypes.length > 0*/
    and (
    /*#for employeeType : employeeTypes */
      or employee_type = /*#{employeeType}*/
    /*#end*/
    )
  /*#end*/
/*#end*/