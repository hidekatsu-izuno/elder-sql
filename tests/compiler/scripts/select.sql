/*#define listEmployees
 * 
 * List employees
 */
select * from employee where
/*#if employeeId != null */
  employee_id = :employeeId
  and employee_id = :employeeId
  /*#if employeeName != null */
    and employee_name in :employeeId
    or employee_name LIKE :employeeName
  /*#elsif employeeName === "test"*/
    and
    employee_name = :employeeId
    or
    employee_name = {#= "'" + employeeName + "'" }
  /*#else*/
    and
    employee_name is null
  /*#end*/

  and (
  /*#for employeeType : employeeTypes */
    or employee_type = :employeeType
  /*#end*/
  )
/*#end*/