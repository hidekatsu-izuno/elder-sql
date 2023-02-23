import { Element } from "domhandler"
import { Parser } from "./parser.js"
import { compile, selectOne } from 'css-select'

export declare type ResolverOptions = {
  [key: string]: any
}

export class Repository {
  private objects = new Map<string, ObjectDef>
  private columns = new Map<string, ResolvedColumn>

  set(objectDef: ObjectDef) {
    const key = `${objectDef.objectName || ''}\0${objectDef.schemaName || ''}`
    this.objects.set(key, objectDef)
    for (const columnDef of objectDef.columns) {
      this.columns.set(`${columnDef.columnName}\0${key}`, {
        schemaName: objectDef.schemaName,
        objectName: objectDef.objectName,
        objectType: objectDef.objectType,
        columnName: columnDef.columnName,
        columnTypeSchema: columnDef.columnTypeSchema,
        columnTypeName: columnDef.columnTypeName,
        length: columnDef.length,
        precision: columnDef.precision,
      })
    }
  }

  getObject(objectKey: Omit<ObjectDef, "columns">) {
    const key = `${objectKey.objectName || ''}\0${objectKey.schemaName || ''}`
    const value = this.objects.get(key)
    if (value?.objectType === objectKey.objectType) {
      return value
    }
  }

  getColumn(columnKey: ResolvedColumn) {
    const key = `${columnKey.columnName || ''}\0${columnKey.objectName || ''}\0${columnKey.schemaName || ''}`
    const value = this.columns.get(key)
    if (value) {
      if (columnKey.objectType != null && value.objectType !== columnKey.objectType) {
        return
      }
      if (columnKey.columnTypeSchema != null || value.columnTypeSchema !== columnKey.columnTypeSchema) {
        return
      }
      if (columnKey.columnTypeName != null || value.columnTypeName !== columnKey.columnTypeName) {
        return
      }
      if (columnKey.length != null || value.length !== columnKey.length) {
        return
      }
      if (columnKey.precision != null || value.precision !== columnKey.precision) {
        return
      }
      return value  
    }
  }
}

export declare type ObjectDef = {
  schemaName?: string,
  objectName: string,
  objectType: string,
  columns: ColumnDef[]
}

export declare type ColumnDef = {
  columnName: string,
  columnTypeSchema?: string,
  columnTypeName: string,
  length?: number,
  precision?: number,
}

export declare type ResolvedColumn = ColumnDef & {
  schemaName?: string,
  objectName?: string,
  objectType?: string,
}

const SELECTER_STATEMENT = compile(".Statement", { xmlMode: true })

export abstract class Resolver {
  constructor(
    public parser: Parser,
    public repo: Repository,
    public options: ResolverOptions = {},
  ) {
  }

  resolve(query: string | Element, filename?: string): ResolvedColumn[] {
    const node = query instanceof Element ? query : this.parser.parse(query, filename)
    const statement = selectOne(SELECTER_STATEMENT, node)
    if (!statement) {
      throw new TypeError("Statement node is not found.")
    }
    return this.resolveNode(statement)
  }

  protected abstract resolveNode(statement: Element): ResolvedColumn[]
}