export class LvObjectReader {
  private headers: string[];
  private rows: any[];

  constructor(data: any) {
    this.headers = this.getHeaders(data);
    this.rows = this.getRows(data);
  }

  private getHeaders(data: any): string[] {
    return Object.keys(data[0] ? data[0] : data);
  }

  private getRows(data: any): any[] {
    const rows: any[] = [];
    for (const item of data) {
      const row: any = {};
      for (const header of this.headers) {
        row[header] = item[header];
      }
      rows.push(row);
    }
    return rows;
  }

  getHeadersForTable(): string[] {
    return this.headers;
  }

  getRowsForTable(): any[] {
    const rows = [];
    for (const row of this.rows) {
      const values = Object.values(row);
      rows.push(values);
    }
    return rows;
  }
}
