export class SearchQueryBuilder {
  private table_name: string;
  private select_values;
  private where_clause: string;
  private order_by: string;
  private join_clause: string;
  private limit_clause: string;
  private skip_clause: string;
  private count_clause: string;
    
  constructor() {
    this.table_name = '',
    this.select_values = '',
    this.where_clause = '';
    this.order_by = '';
    this.join_clause = '';
    this.limit_clause = '';
    this.skip_clause = '';
    this.count_clause = '';
  }

  public fromTable(tableName: string) {
    this.table_name = tableName;
    return this;
  }

  public select(...selectArgs) {
    this.select_values = selectArgs;
    return this;
  }

  public where(...whereArgs) {
    let whereClause = ' WHERE '
    for (let i = 0; i < whereArgs.length; i++) {
      whereClause += i !== whereArgs.length - 1 ? `${whereArgs[i]} = $${i + 1} AND ` : `${whereArgs[i]} = $${i + 1} `;
    }
    this.where_clause = whereClause;
    return this;
  }

  public where1(filterObject: object) {
    let whereClause = ''
    const firstKey = Object.keys(filterObject)[0];
    const lastkey = Object.keys(filterObject)[Object.keys(filterObject).length - 1];
    for (const [key, value] of Object.entries(filterObject)) {
      if (key === firstKey) {
        whereClause += ' WHERE ';
      } 
      whereClause += key !== lastkey ?` ${key} = ::${value} AND ` : ` ${key} = ${value} `;
    }
    this.where_clause = whereClause;
    return this;
  }

  public orderBy(fieldName: string) {
    this.order_by = fieldName;
    return this;
  }

  public limit(limit: number) {
    this.limit_clause = ` LIMIT ${limit} `;
    return this;
  }

  public skip(offset: number) {
    this.skip_clause = ` OFFSET ${offset} `;
    return this;
  }

  public join(tableToJoin: string, foreignKey: string, type: string) {
    this.join_clause =  ` ${type} JOIN ${tableToJoin} USING (${foreignKey})`;
    return this;
  }

  public count(columnName: string) {
    this.count_clause = ` COUNT 
    \${columnName} `;
    return this;
  }

  public build() {
    let query = `
    SELECT ${this.select_values}
    FROM ${this.table_name}`;

    if (this.join_clause !== '') {
      query += this.join_clause;
    }

    if (this.where_clause !== '') {
      query += this.where_clause;
    }

    if (this.order_by) {
      query += `ORDER BY ${this.order_by} DESC`
    }

    if (this.limit_clause !== '') {
      query += this.limit_clause;
    }

    if (this.skip_clause !== '') {
      query += this.skip_clause;
    }
    // query += ' returning *'
    return query;
  }
}

export class InsertQueryBuilder {
  private tableName: string;
  private insertClause: string;

  constructor(){
    this.tableName = '';
    this.insertClause = '';
  }

  public intoTable(tableName: string) {
    this.tableName = tableName;
    return this;
  }

  public fieldsToInsert(...fields) {
    let insertFields = `(`;
    let insertValues = ' VALUES ('
    for (let i = 0; i < fields.length; i++) {
      insertFields += i !== fields.length - 1 ? `${fields[i]}, `: `${fields[i]}`;
      insertValues += i !== fields.length - 1 ? `$${i + 1}, `: `$${i + 1}`;
    }
    insertFields += ')';
    insertValues += ') RETURNING *';
    this.insertClause = `${insertFields} ${insertValues}`;
    return this;
  }

  public build() {
    let query = `INSERT INTO ${this.tableName}`;
    query += this.insertClause;
    return query;
  }
}

export class UpdateQueryBuilder {
  private tableName: string;
  private updateFields: string;
  private whereClause: string;
  private updateFieldsCounts: number = 0;

  constructor(){
    this.tableName = '';
    this.updateFields = '';
    this.whereClause = '';
  }
  
  public intoTable(tableName: string) {
    this.tableName = tableName;
    return this;
  }
  
  public fieldsToUpdate(...fields) {
    let updateString = ' SET'
    for (let i = 0; i < fields.length; i++) {
      updateString += i !== fields.length - 1 ? ` ${fields[i]} = $${i+1},` : ` ${fields[i]} = $${i+1}`;
      this.updateFieldsCounts++;
    }
    this.updateFields = updateString;
    return this;
  }

  public where(...whereArgs) {
    let whereClause = ' WHERE ';
    for (let i = 0; i < whereArgs.length; i++) {
      whereClause += `${whereArgs[i]} = $${this.updateFieldsCounts + i + 1}`
    }
    this.whereClause = whereClause;
    return this;
  }

  public build() {
    let query = `UPDATE ${this.tableName}`;
    query += this.updateFields;
    query += this.whereClause;
    query += ' RETURNING *'
    return query;
  }
}
