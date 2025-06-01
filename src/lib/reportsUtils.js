import {
  formatCurrency,
  formatDate,
  getMonthName,
  getBengaliNumber,
} from "./utils";

// Generate Monthly Statement Report
export const generateMonthlyStatement = (
  reportData,
  selectedMonth,
  selectedYear
) => {
  const printWindow = window.open("", "_blank");
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>মাসিক স্টেটমেন্ট - ${getMonthName(
        selectedMonth
      )} ${selectedYear}</title>
      <meta charset="utf-8">
      <style>
        body { 
          font-family: 'SolaimanLipi', Arial, sans-serif; 
          margin: 20px; 
          line-height: 1.6;
          color: #333;
        }
        .header { 
          text-align: center; 
          margin-bottom: 30px; 
          border-bottom: 3px solid #007bff;
          padding-bottom: 20px;
        }
        .summary-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }
        .summary-card {
          border: 1px solid #ddd;
          padding: 15px;
          border-radius: 8px;
          text-align: center;
          background: #f8f9fa;
        }
        .summary-value {
          font-size: 24px;
          font-weight: bold;
          color: #007bff;
        }
        .table { 
          width: 100%; 
          border-collapse: collapse; 
          margin-bottom: 20px; 
        }
        .table th, .table td { 
          border: 1px solid #ddd; 
          padding: 8px; 
          text-align: left; 
        }
        .table th { 
          background-color: #f2f2f2; 
          font-weight: bold;
        }
        .section {
          margin-bottom: 30px;
          page-break-inside: avoid;
        }
        .section-title {
          background-color: #007bff;
          color: white;
          padding: 10px;
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 15px;
        }
        @media print { 
          .no-print { display: none; }
          body { margin: 0; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>মাসিক আর্থিক স্টেটমেন্ট</h1>
        <h2>${getMonthName(selectedMonth)} ${selectedYear}</h2>
        <p>রিপোর্ট তৈরির তারিখ: ${formatDate(new Date())}</p>
      </div>

      <div class="summary-grid">
        <div class="summary-card">
          <div>মোট সদস্য</div>
          <div class="summary-value">${getBengaliNumber(
            reportData.monthly.totalMembers
          )}</div>
        </div>
        <div class="summary-card">
          <div>মোট মিল</div>
          <div class="summary-value">${getBengaliNumber(
            reportData.monthly.totalMeals
          )}</div>
        </div>
        <div class="summary-card">
          <div>মোট আয়</div>
          <div class="summary-value">${formatCurrency(
            reportData.monthly.totalRevenue
          )}</div>
        </div>
        <div class="summary-card">
          <div>মোট খরচ</div>
          <div class="summary-value">${formatCurrency(
            reportData.monthly.totalExpenses
          )}</div>
        </div>
        <div class="summary-card">
          <div>নিট লাভ</div>
          <div class="summary-value" style="color: ${
            reportData.monthly.profit > 0 ? "#28a745" : "#dc3545"
          }">${formatCurrency(reportData.monthly.profit)}</div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">📊 আর্থিক সারসংক্ষেপ</div>
        <table class="table">
          <tr>
            <td><strong>মোট আয়:</strong></td>
            <td style="text-align: right; color: #28a745; font-weight: bold;">${formatCurrency(
              reportData.monthly.totalRevenue
            )}</td>
          </tr>
          <tr>
            <td><strong>মোট খরচ:</strong></td>
            <td style="text-align: right; color: #dc3545; font-weight: bold;">${formatCurrency(
              reportData.monthly.totalExpenses
            )}</td>
          </tr>
          <tr style="background-color: #f8f9fa; font-size: 18px;">
            <td><strong>নিট ব্যালেন্স:</strong></td>
            <td style="text-align: right; font-weight: bold; color: ${
              reportData.monthly.profit > 0 ? "#28a745" : "#dc3545"
            }">${formatCurrency(reportData.monthly.profit)}</td>
          </tr>
        </table>
      </div>

      <div class="section">
        <div class="section-title">💰 খরচের বিভাজন</div>
        <table class="table">
          <thead>
            <tr>
              <th>ক্যাটেগরি</th>
              <th style="text-align: right;">পরিমাণ</th>
              <th style="text-align: right;">শতাংশ</th>
            </tr>
          </thead>
          <tbody>
            ${Object.entries(reportData.expenses)
              .map(([category, amount]) => {
                const percentage = Math.round(
                  (amount / reportData.monthly.totalExpenses) * 100
                );
                const categoryNames = {
                  bazaar: "বাজার",
                  utility: "ইউটিলিটি",
                  rent: "ভাড়া",
                  gas: "গ্যাস",
                  maintenance: "রক্ষণাবেক্ষণ",
                  other: "অন্যান্য",
                };
                return `
                <tr>
                  <td>${categoryNames[category]}</td>
                  <td style="text-align: right;">${formatCurrency(amount)}</td>
                  <td style="text-align: right;">${getBengaliNumber(
                    percentage
                  )}%</td>
                </tr>
              `;
              })
              .join("")}
          </tbody>
        </table>
      </div>

      <div class="section">
        <div class="section-title">👥 সদস্যদের পেমেন্ট স্ট্যাটাস</div>
        <table class="table">
          <thead>
            <tr>
              <th>সদস্য</th>
              <th style="text-align: center;">মিল</th>
              <th style="text-align: right;">বিল</th>
              <th style="text-align: right;">পেইড</th>
              <th style="text-align: right;">বকেয়া</th>
            </tr>
          </thead>
          <tbody>
            ${reportData.memberStats
              .map(
                (member) => `
              <tr>
                <td>${member.name}</td>
                <td style="text-align: center;">${getBengaliNumber(
                  member.meals
                )}</td>
                <td style="text-align: right;">${formatCurrency(
                  member.amount
                )}</td>
                <td style="text-align: right; color: #28a745;">${formatCurrency(
                  member.paid
                )}</td>
                <td style="text-align: right; color: ${
                  member.due > 0 ? "#dc3545" : "#28a745"
                };">${formatCurrency(member.due)}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      </div>

      <div class="no-print" style="margin-top: 30px; text-align: center;">
        <button onclick="window.print()" style="padding: 10px 20px; font-size: 16px; margin-right: 10px; background: #007bff; color: white; border: none; border-radius: 5px;">প্রিন্ট করুন</button>
        <button onclick="window.close()" style="padding: 10px 20px; font-size: 16px; background: #6c757d; color: white; border: none; border-radius: 5px;">বন্ধ করুন</button>
      </div>
    </body>
    </html>
  `);
  printWindow.document.close();
};

// Generate Meal Analytics Report
export const generateMealAnalytics = (
  reportData,
  selectedMonth,
  selectedYear
) => {
  const printWindow = window.open("", "_blank");
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>মিল অ্যানালিটিক্স - ${getMonthName(
        selectedMonth
      )} ${selectedYear}</title>
      <meta charset="utf-8">
      <style>
        body { font-family: 'SolaimanLipi', Arial, sans-serif; margin: 20px; line-height: 1.6; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 3px solid #28a745; padding-bottom: 20px; }
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .stat-card { border: 1px solid #ddd; padding: 20px; border-radius: 8px; text-align: center; background: #f8f9fa; }
        .stat-value { font-size: 24px; font-weight: bold; color: #28a745; }
        .table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        .table th, .table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        .table th { background-color: #f2f2f2; }
        @media print { .no-print { display: none; } }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>মিল অ্যানালিটিক্স রিপোর্ট</h1>
        <h2>${getMonthName(selectedMonth)} ${selectedYear}</h2>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div>মোট মিল</div>
          <div class="stat-value">${getBengaliNumber(
            reportData.monthly.totalMeals
          )}</div>
        </div>
        <div class="stat-card">
          <div>দৈনিক গড় মিল</div>
          <div class="stat-value">${getBengaliNumber(
            Math.round(reportData.monthly.totalMeals / 30)
          )}</div>
        </div>
        <div class="stat-card">
          <div>প্রতি সদস্য গড় মিল</div>
          <div class="stat-value">${getBengaliNumber(
            reportData.monthly.avgMealsPerMember
          )}</div>
        </div>
        <div class="stat-card">
          <div>মিল প্রতি খরচ</div>
          <div class="stat-value">৳${getBengaliNumber(
            reportData.monthly.mealRate
          )}</div>
        </div>
      </div>

      <h3>সদস্য অনুযায়ী মিল বিশ্লেষণ</h3>
      <table class="table">
        <thead>
          <tr>
            <th>সদস্যের নাম</th>
            <th>মিল সংখ্যা</th>
            <th>দৈনিক গড়</th>
            <th>মোট খরচ</th>
          </tr>
        </thead>
        <tbody>
          ${reportData.memberStats
            .map(
              (member) => `
            <tr>
              <td>${member.name}</td>
              <td>${getBengaliNumber(member.meals)}</td>
              <td>${getBengaliNumber((member.meals / 30).toFixed(1))}</td>
              <td>${formatCurrency(member.amount)}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>

      <div class="no-print" style="margin-top: 30px; text-align: center;">
        <button onclick="window.print()" style="padding: 10px 20px; font-size: 16px; margin-right: 10px;">প্রিন্ট করুন</button>
        <button onclick="window.close()" style="padding: 10px 20px; font-size: 16px;">বন্ধ করুন</button>
      </div>
    </body>
    </html>
  `);
  printWindow.document.close();
};

// Generate Payment Report
export const generatePaymentReport = (
  reportData,
  selectedMonth,
  selectedYear
) => {
  const printWindow = window.open("", "_blank");
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>পেমেন্ট রিপোর্ট - ${getMonthName(
        selectedMonth
      )} ${selectedYear}</title>
      <meta charset="utf-8">
      <style>
        body { font-family: 'SolaimanLipi', Arial, sans-serif; margin: 20px; line-height: 1.6; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 3px solid #dc3545; padding-bottom: 20px; }
        .summary { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 30px; }
        .table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        .table th, .table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        .table th { background-color: #f2f2f2; }
        .paid { color: #28a745; font-weight: bold; }
        .due { color: #dc3545; font-weight: bold; }
        @media print { .no-print { display: none; } }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>পেমেন্ট রিপোর্ট</h1>
        <h2>${getMonthName(selectedMonth)} ${selectedYear}</h2>
      </div>

      <div class="summary">
        <h3>পেমেন্ট সারসংক্ষেপ</h3>
        <p><strong>মোট প্রত্যাশিত আয়:</strong> ${formatCurrency(
          reportData.monthly.totalRevenue
        )}</p>
        <p><strong>মোট সংগৃহীত:</strong> <span class="paid">${formatCurrency(
          reportData.memberStats.reduce((sum, member) => sum + member.paid, 0)
        )}</span></p>
        <p><strong>মোট বকেয়া:</strong> <span class="due">${formatCurrency(
          reportData.memberStats.reduce((sum, member) => sum + member.due, 0)
        )}</span></p>
        <p><strong>সংগ্রহের হার:</strong> ${getBengaliNumber(
          reportData.monthly.collectionRate
        )}%</p>
      </div>

      <h3>সদস্য অনুযায়ী পেমেন্ট স্ট্যাটাস</h3>
      <table class="table">
        <thead>
          <tr>
            <th>সদস্যের নাম</th>
            <th>মোট বিল</th>
            <th>পেইড</th>
            <th>বকেয়া</th>
            <th>পেমেন্ট হার</th>
            <th>স্ট্যাটাস</th>
          </tr>
        </thead>
        <tbody>
          ${reportData.memberStats
            .map((member) => {
              const paymentRate = Math.round(
                (member.paid / member.amount) * 100
              );
              const status =
                paymentRate === 100
                  ? "সম্পূর্ণ"
                  : paymentRate > 50
                    ? "আংশিক"
                    : "অপেমেন্ট";
              return `
              <tr>
                <td>${member.name}</td>
                <td>${formatCurrency(member.amount)}</td>
                <td class="paid">${formatCurrency(member.paid)}</td>
                <td class="due">${formatCurrency(member.due)}</td>
                <td>${getBengaliNumber(paymentRate)}%</td>
                <td>${status}</td>
              </tr>
            `;
            })
            .join("")}
        </tbody>
      </table>

      <div class="no-print" style="margin-top: 30px; text-align: center;">
        <button onclick="window.print()" style="padding: 10px 20px; font-size: 16px; margin-right: 10px;">প্রিন্ট করুন</button>
        <button onclick="window.close()" style="padding: 10px 20px; font-size: 16px;">বন্ধ করুন</button>
      </div>
    </body>
    </html>
  `);
  printWindow.document.close();
};

// Download CSV Report
export const downloadCSVReport = (reportData, selectedMonth, selectedYear) => {
  const csvContent = [
    "মেস রিপোর্ট - " + getMonthName(selectedMonth) + " " + selectedYear,
    "",
    "সারসংক্ষেপ",
    "মোট সদস্য," + reportData.monthly.totalMembers,
    "মোট মিল," + reportData.monthly.totalMeals,
    "মোট আয়," + reportData.monthly.totalRevenue,
    "মোট খরচ," + reportData.monthly.totalExpenses,
    "নিট লাভ," + reportData.monthly.profit,
    "",
    "সদস্যদের তথ্য",
    "নাম,মিল সংখ্যা,মোট বিল,পেইড,বকেয়া",
    ...reportData.memberStats.map(
      (member) =>
        `"${member.name}",${member.meals},${member.amount},${member.paid},${member.due}`
    ),
    "",
    "খরচের বিভাজন",
    "ক্যাটেগরি,পরিমাণ",
    ...Object.entries(reportData.expenses).map(([category, amount]) => {
      const categoryNames = {
        bazaar: "বাজার",
        utility: "ইউটিলিটি",
        rent: "ভাড়া",
        gas: "গ্যাস",
        maintenance: "রক্ষণাবেক্ষণ",
        other: "অন্যান্য",
      };
      return `"${categoryNames[category]}",${amount}`;
    }),
  ].join("\n");

  const BOM = "\uFEFF";
  const blob = new Blob([BOM + csvContent], {
    type: "text/csv;charset=utf-8;",
  });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    `mess-report-${getMonthName(selectedMonth)}-${selectedYear}.csv`
  );
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Share Report Function
export const shareReport = (reportData, selectedMonth, selectedYear) => {
  const shareData = {
    title: `মেস রিপোর্ট - ${getMonthName(selectedMonth)} ${selectedYear}`,
    text: `মোট আয়: ${formatCurrency(
      reportData.monthly.totalRevenue
    )}, মোট খরচ: ${formatCurrency(
      reportData.monthly.totalExpenses
    )}, নিট লাভ: ${formatCurrency(reportData.monthly.profit)}`,
    url: window.location.href,
  };

  if (navigator.share) {
    navigator.share(shareData);
  } else {
    // Fallback - copy to clipboard
    const textToShare = `${shareData.title}\n${shareData.text}\n${shareData.url}`;
    navigator.clipboard.writeText(textToShare).then(() => {
      alert("রিপোর্ট ক্লিপবোর্ডে কপি হয়েছে!");
    });
  }
};

// Print Current Report
export const printCurrentReport = () => {
  window.print();
};
