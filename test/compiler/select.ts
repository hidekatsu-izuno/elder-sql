export const actual = `
/*#define listEmployees
 * 
 * List employees
 */
select * from employee where
/*#if employeeId != null */
  employee_id = /*#{employeeId}*/99
  /*#if employeeName != null */
    and employee_name in /*#{employeeName}*/('hoge')
  /*#elif employeeName === "test"*/
--* and
--* employee_name = /*\${subquery}*/
  /*#else*/
--* and
--* employee_name is null
  /*#end*/

  /*#if employeeTypes.length > 0*/
    and (
    /*#for employeeType : employeeTypes */
      or employee_type = /*#{employeeType}*/
    /*#end*/
    )
  /*#end*/
/*#end*/
`.trim()
export const expected = `
/** 
 * 
 * List employees
 */
export function listEmployees(engine, params) {
  const text = ""
  const args = []
  const context0 = {...params}
  text += "\nselect * from employee where"
  if (employeeId != null) {
    text += "\n  employee_id = ?"
    args.push(sandbox(context0, "employeeId"))
    if (employeeName != null) {
      text += "\n    and\n    employee_name = ?"
      args.push(sandbox(context0, "employeeName"))
    } else {
      text += "\n    and\n    employee_name is null"
    )
  )
  return engine.execute(text, args)
}
function sandbox(context, expr) {
  return (new Function("context", "with (context) " + expr))(context)
}
`.trim()