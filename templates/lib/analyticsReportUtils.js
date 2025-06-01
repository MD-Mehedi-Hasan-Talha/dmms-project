import { formatCurrency, formatDate, getBengaliDate } from "./utils";

export const downloadAnalyticsReport = (
  overviewStats,
  marketAnalysis,
  priceTracking,
  expenseTrends,
  memberAnalysis,
  predictions,
  selectedPeriod
) => {
  const reportData = {
    overview: overviewStats,
    market: marketAnalysis,
    prices: priceTracking,
    trends: expenseTrends,
    members: memberAnalysis,
    predictions: predictions,
    period: selectedPeriod,
    generatedAt: new Date(),
  };

  // Create comprehensive CSV content
  const sections = [];

  // 1. Overview Section
  sections.push("=== সার্বিক তথ্য ===");
  sections.push(`রিপোর্ট তৈরির তারিখ,${formatDate(new Date())}`);
  sections.push(`নির্বাচিত সময়কাল,${selectedPeriod} দিন`);
  sections.push(`মোট খরচ,${formatCurrency(overviewStats.totalExpense)}`);
  sections.push(`মিল প্রতি খরচ,৳${overviewStats.averageMealCost}`);
  sections.push(`দৈনিক গড়,${formatCurrency(overviewStats.dailyAverage)}`);
  sections.push(`সক্রিয় সদস্য,${overviewStats.totalMembers} জন`);
  sections.push(`মাসিক বৃদ্ধি,${overviewStats.monthlyGrowth}%`);
  sections.push("");

  // 2. Market Analysis Section
  sections.push("=== বাজার বিশ্লেষণ ===");
  sections.push("ক্রেতা,তারিখ,মোট খরচ,দক্ষতা,মন্তব্য");
  marketAnalysis.forEach((purchase) => {
    sections.push(
      `"${purchase.buyer}",${getBengaliDate(purchase.date)},${formatCurrency(
        purchase.totalAmount
      )},${purchase.efficiency},"${purchase.notes}"`
    );
  });
  sections.push("");

  // 3. Price Tracking Section
  sections.push("=== দাম ট্র্যাকিং ===");
  sections.push("পণ্য,বর্তমান দাম,পূর্বের দাম,পরিবর্তন (%),ট্রেন্ড,সাপ্লায়ার");
  priceTracking.forEach((item) => {
    sections.push(
      `"${item.product}",৳${item.currentPrice},৳${item.previousPrice},${
        item.change > 0 ? "+" : ""
      }${item.change}%,${item.trend},"${item.supplier}"`
    );
  });
  sections.push("");

  // 4. Daily Trends Section
  sections.push("=== দৈনিক খরচের ট্রেন্ড ===");
  sections.push("তারিখ,খরচ,মিল সংখ্যা,প্রতি মিল খরচ");
  expenseTrends.daily.forEach((day) => {
    sections.push(
      `${day.date},${formatCurrency(day.amount)},${day.meals},৳${Math.round(
        day.amount / day.meals
      )}`
    );
  });
  sections.push("");

  // 5. Category Trends Section
  sections.push("=== ক্যাটেগরি অনুযায়ী খরচ ===");
  sections.push("ক্যাটেগরি,খরচ,শতাংশ,ট্রেন্ড");
  expenseTrends.categories.forEach((category) => {
    sections.push(
      `"${category.name}",${formatCurrency(category.amount)},${
        category.percentage
      }%,${category.trend}`
    );
  });
  sections.push("");

  // 6. Member Performance Section
  sections.push("=== সদস্যদের পারফরমেন্স ===");
  sections.push(
    "নাম,মোট কেনাকাটা,মোট খরচ,প্রতিবার গড়,দক্ষতা (%),সাশ্রয়,সেরা ক্যাটেগরি"
  );
  memberAnalysis.forEach((member) => {
    sections.push(
      `"${member.name}",${member.totalPurchases} বার,${formatCurrency(
        member.totalAmount
      )},${formatCurrency(member.averagePerTrip)},${
        member.efficiency
      }%,${formatCurrency(member.savings)},"${member.bestCategory}"`
    );
  });
  sections.push("");

  // 7. Predictions Section
  sections.push("=== পূর্বাভাস ===");
  sections.push(
    `পরবর্তী সপ্তাহের বাজেট,${formatCurrency(predictions.nextWeekBudget)}`
  );
  sections.push(
    `মাস শেষে প্রত্যাশিত খরচ,${formatCurrency(predictions.monthEndProjection)}`
  );
  sections.push("");
  sections.push("মৌসুমী ট্রেন্ড");
  sections.push("মাস,প্রত্যাশিত খরচ,কারণ");
  predictions.seasonalTrends.forEach((trend) => {
    sections.push(
      `"${trend.month}",${formatCurrency(trend.projection)},"${trend.reason}"`
    );
  });
  sections.push("");

  // 8. Alerts Section
  sections.push("=== সতর্কতা ===");
  sections.push("ধরন,বার্তা");
  predictions.alerts.forEach((alert) => {
    const type =
      alert.type === "warning"
        ? "সতর্কতা"
        : alert.type === "success"
          ? "সফল"
          : "তথ্য";
    sections.push(`"${type}","${alert.message}"`);
  });

  // Join all sections
  const csvContent = sections.join("\n");

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
    `analytics-report-${new Date().toISOString().split("T")[0]}.csv`
  );
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const downloadDetailedAnalyticsReport = (data) => {
  // Create a detailed HTML report for printing
  const printWindow = window.open("", "_blank");
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>বিস্তারিত অ্যানালিটিক্স রিপোর্ট</title>
      <meta charset="utf-8">
      <style>
        body { 
          font-family: 'SolaimanLipi', Arial, sans-serif; 
          margin: 20px; 
          line-height: 1.6;
        }
        .header { 
          text-align: center; 
          margin-bottom: 30px; 
          border-bottom: 2px solid #333;
          padding-bottom: 20px;
        }
        .section { 
          margin-bottom: 30px; 
          page-break-inside: avoid;
        }
        .section-title {
          background-color: #f0f0f0;
          padding: 10px;
          font-weight: bold;
          font-size: 18px;
          border-left: 4px solid #007bff;
          margin-bottom: 15px;
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
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 15px;
          margin-bottom: 20px;
        }
        .stat-card {
          border: 1px solid #ddd;
          padding: 15px;
          border-radius: 5px;
          background-color: #f9f9f9;
        }
        .stat-value {
          font-size: 24px;
          font-weight: bold;
          color: #007bff;
        }
        .trend-up { color: #dc3545; }
        .trend-down { color: #28a745; }
        .trend-stable { color: #6c757d; }
        @media print { 
          .no-print { display: none; }
          body { margin: 0; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>বিস্তারিত অ্যানালিটিক্স রিপোর্ট</h1>
        <h2>মেস ব্যবস্থাপনা সিস্টেম</h2>
        <p>রিপোর্ট তৈরির তারিখ: ${formatDate(new Date())}</p>
        <p>নির্বাচিত সময়কাল: ${data.selectedPeriod} দিন</p>
      </div>

      <div class="section">
        <div class="section-title">📊 সার্বিক পরিসংখ্যান</div>
        <div class="stats-grid">
          <div class="stat-card">
            <div>মোট খরচ</div>
            <div class="stat-value">${formatCurrency(
              data.overviewStats.totalExpense
            )}</div>
          </div>
          <div class="stat-card">
            <div>মিল প্রতি খরচ</div>
            <div class="stat-value">৳${data.overviewStats.averageMealCost}</div>
          </div>
          <div class="stat-card">
            <div>দৈনিক গড়</div>
            <div class="stat-value">${formatCurrency(
              data.overviewStats.dailyAverage
            )}</div>
          </div>
          <div class="stat-card">
            <div>সক্রিয় সদস্য</div>
            <div class="stat-value">${data.overviewStats.totalMembers} জন</div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">🛒 বাজার বিশ্লেষণ</div>
        <table class="table">
          <thead>
            <tr>
              <th>ক্রেতা</th>
              <th>তারিখ</th>
              <th>মোট খরচ</th>
              <th>দক্ষতা</th>
              <th>মন্তব্য</th>
            </tr>
          </thead>
          <tbody>
            ${data.marketAnalysis
              .map(
                (purchase) => `
              <tr>
                <td>${purchase.buyer}</td>
                <td>${getBengaliDate(purchase.date)}</td>
                <td>${formatCurrency(purchase.totalAmount)}</td>
                <td>${purchase.efficiency}</td>
                <td>${purchase.notes}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      </div>

      <div class="section">
        <div class="section-title">📈 দাম ট্র্যাকিং</div>
        <table class="table">
          <thead>
            <tr>
              <th>পণ্য</th>
              <th>বর্তমান দাম</th>
              <th>পূর্বের দাম</th>
              <th>পরিবর্তন</th>
              <th>সাপ্লায়ার</th>
            </tr>
          </thead>
          <tbody>
            ${data.priceTracking
              .map(
                (item) => `
              <tr>
                <td>${item.product}</td>
                <td>৳${item.currentPrice}</td>
                <td>৳${item.previousPrice}</td>
                <td class="trend-${
                  item.change > 0 ? "up" : item.change < 0 ? "down" : "stable"
                }">
                  ${item.change > 0 ? "+" : ""}${item.change}%
                </td>
                <td>${item.supplier}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      </div>

      <div class="section">
        <div class="section-title">👥 সদস্যদের পারফরমেন্স</div>
        <table class="table">
          <thead>
            <tr>
              <th>নাম</th>
              <th>মোট কেনাকাটা</th>
              <th>মোট খরচ</th>
              <th>দক্ষতা</th>
              <th>সাশ্রয়</th>
              <th>সেরা ক্যাটেগরি</th>
            </tr>
          </thead>
          <tbody>
            ${data.memberAnalysis
              .map(
                (member) => `
              <tr>
                <td>${member.name}</td>
                <td>${member.totalPurchases} বার</td>
                <td>${formatCurrency(member.totalAmount)}</td>
                <td>${member.efficiency}%</td>
                <td>${formatCurrency(member.savings)}</td>
                <td>${member.bestCategory}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      </div>

      <div class="no-print" style="margin-top: 30px; text-align: center;">
        <button onclick="window.print()" style="padding: 10px 20px; font-size: 16px; margin-right: 10px;">প্রিন্ট করুন</button>
        <button onclick="window.close()" style="padding: 10px 20px; font-size: 16px;">বন্ধ করুন</button>
      </div>
    </body>
    </html>
  `);
  printWindow.document.close();
};
