/** 
 * 
 * List employees
 */
export function listEmployees(engine, params) {
  let text = ""
  const args = new Array<any>()
  const ctx0 = {...params}
  text += "\nselect * from employee where"
  if (sandbox(ctx0, "employeeId != null")) {
    text += "\n  employee_id = ?"
    args.push(sandbox(ctx0, "employeeId"))
    if (sandbox(ctx0, "employeeName != null")) {
      text += "\n    and\n    employee_name = ?"
      args.push(sandbox(ctx0, "employeeName"))
    } else {
      text += "\n    and\n    employee_name is null"
    }
  }
  return engine.execute(text, args)
}
function sandbox(ctx, expr) {
  return (new Function("context", "with (ctx) { return (" + expr + ") }"))(ctx)
}