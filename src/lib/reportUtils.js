import { formatCurrency, formatDate, getMonthName } from "./utils";

export const downloadPaymentReport = (
  memberBills,
  selectedMonth,
  selectedYear
) => {
  // Create CSV content
  const headers = [
    "সদস্যের নাম",
    "মিল সংখ্যা",
    "মিল কস্ট",
    "অতিরিক্ত চার্জ",
    "মোট বিল",
    "পেইড অ্যামাউন্ট",
    "বকেয়া অ্যামাউন্ট",
    "স্ট্যাটাস",
    "পেমেন্ট তারিখ",
    "পেমেন্ট মেথড",
  ];

  const csvContent = [
    headers.join(","),
    ...memberBills.map((bill) =>
      [
        `"${bill.memberName}"`,
        bill.totalMeals,
        bill.mealCost,
        bill.extraCost,
        bill.totalAmount,
        bill.paidAmount,
        bill.dueAmount,
        bill.status === "paid"
          ? "পরিশোধিত"
          : bill.status === "partial"
            ? "আংশিক"
            : "বকেয়া",
        bill.paymentDate ? formatDate(new Date(bill.paymentDate)) : "N/A",
        bill.paymentMethod || "N/A",
      ].join(",")
    ),
  ].join("\n");

  // Add BOM for Bengali support
  const BOM = "\uFEFF";
  const blob = new Blob([BOM + csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  // Create download link
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    `payment-report-${getMonthName(selectedMonth)}-${selectedYear}.csv`
  );
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const downloadBillPDF = (billData) => {
  // This would typically use a PDF library like jsPDF
  // For now, we'll create a simple HTML print version

  const printWindow = window.open("", "_blank");
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>বিল - ${billData.memberName}</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .bill-info { margin-bottom: 20px; }
        .table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        .table th, .table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        .table th { background-color: #f2f2f2; }
        .total { font-weight: bold; font-size: 18px; text-align: right; }
        @media print { .no-print { display: none; } }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>মেস বিল</h1>
        <h2>${getMonthName(
          new Date().getMonth() + 1
        )} ${new Date().getFullYear()}</h2>
      </div>
      
      <div class="bill-info">
        <p><strong>সদস্যের নাম:</strong> ${billData.memberName}</p>
        <p><strong>বিল ID:</strong> #${billData.id}</p>
        <p><strong>তারিখ:</strong> ${new Date().toLocaleDateString("bn-BD")}</p>
      </div>

      <table class="table">
        <tr>
          <th>বিবরণ</th>
          <th>পরিমাণ</th>
          <th>মোট</th>
        </tr>
        <tr>
          <td>মিল কস্ট (${billData.totalMeals} মিল)</td>
          <td>৳১৫০ × ${billData.totalMeals}</td>
          <td>${formatCurrency(billData.mealCost)}</td>
        </tr>
        <tr>
          <td>অতিরিক্ত চার্জ</td>
          <td>-</td>
          <td>${formatCurrency(billData.extraCost)}</td>
        </tr>
        <tr class="total">
          <td colspan="2">সর্বমোট</td>
          <td>${formatCurrency(billData.totalAmount)}</td>
        </tr>
      </table>

      <div class="no-print">
        <button onclick="window.print()">প্রিন্ট করুন</button>
        <button onclick="window.close()">বন্ধ করুন</button>
      </div>
    </body>
    </html>
  `);
  printWindow.document.close();
};
