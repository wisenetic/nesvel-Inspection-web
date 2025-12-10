import * as XLSX from "xlsx";

export const ExportUtils = {
  exportCSV: (data: any[], filename = "export.csv") => {
    const csvRows = [];
    if (data.length === 0) {
      const blob = new Blob([""], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      return;
    }
    const keys = Object.keys(data[0]);
    csvRows.push(keys.join(","));
    for (const row of data) {
      csvRows.push(keys.map((k) => JSON.stringify(row[k] ?? "")).join(","));
    }
    const csv = csvRows.join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  },

  exportExcel: (data: any[], filename = "export.xlsx") => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, filename);
  },
};
