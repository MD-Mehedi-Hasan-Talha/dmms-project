import { formatCurrency, formatDate } from "./utils";

export const downloadMarketIntelligenceReport = (
  supplierComparison,
  productComparison,
  marketIntelligence,
  budgetOptimization
) => {
  const reportData = {
    suppliers: supplierComparison,
    products: productComparison,
    intelligence: marketIntelligence,
    optimization: budgetOptimization,
    generatedAt: new Date(),
  };

  // Create comprehensive CSV content
  const sections = [];

  // 1. Header
  sections.push("=== উন্নত অ্যানালিটিক্স রিপোর্ট ===");
  sections.push(`রিপোর্ট তৈরির তারিখ,${formatDate(new Date())}`);
  sections.push(`রিপোর্ট ধরন,বাজার বুদ্ধিমত্তা ও সাপ্লায়ার বিশ্লেষণ`);
  sections.push("");

  // 2. Supplier Analysis Section
  sections.push("=== সাপ্লায়ার বিশ্লেষণ ===");
  sections.push("নাম,অবস্থান,রেটিং,মোট কেনাকাটা,গড় দাম,নির্ভরযোগ্যতা");
  supplierComparison.forEach((supplier) => {
    sections.push(
      `"${supplier.name}","${supplier.location}",${supplier.rating},${supplier.totalPurchases} বার,৳${supplier.averagePrice},${supplier.reliability}%`
    );
  });
  sections.push("");

  // 3. Supplier Products Details
  sections.push("=== সাপ্লায়ার অনুযায়ী পণ্যের তালিকা ===");
  sections.push("সাপ্লায়ার,পণ্য,দাম,মান,আপডেট তারিখ");
  supplierComparison.forEach((supplier) => {
    supplier.products.forEach((product) => {
      sections.push(
        `"${supplier.name}","${product.name}",৳${product.price},"${product.quality}",${product.lastUpdated}`
      );
    });
  });
  sections.push("");

  // 4. Product Comparison
  sections.push("=== পণ্য তুলনা বিশ্লেষণ ===");
  sections.push("পণ্য,একক,সুপারিশকৃত সাপ্লায়ার,মাসিক সাশ্রয়");
  productComparison.forEach((product) => {
    sections.push(
      `"${product.name}","${product.unit}","${
        product.recommendation
      }",${formatCurrency(product.savings)}`
    );
  });
  sections.push("");

  // 5. Product Price Details
  sections.push("=== পণ্য অনুযায়ী সাপ্লায়ার দাম ===");
  sections.push("পণ্য,সাপ্লায়ার,দাম,মান (১-৫),প্রাপ্যতা (১-৫)");
  productComparison.forEach((product) => {
    product.suppliers.forEach((supplier) => {
      sections.push(
        `"${product.name}","${supplier.name}",৳${supplier.price},${supplier.quality},${supplier.availability}`
      );
    });
  });
  sections.push("");

  // 6. Price Alerts
  sections.push("=== মূল্য সতর্কতা ===");
  sections.push("পণ্য,স্ট্যাটাস,বার্তা,সুপারিশ,করণীয়");
  marketIntelligence.priceAlerts.forEach((alert) => {
    const status =
      alert.status === "warning"
        ? "সতর্কতা"
        : alert.status === "success"
          ? "ভাল খবর"
          : "তথ্য";
    sections.push(
      `"${alert.product}","${status}","${alert.message}","${alert.suggestion}","${alert.action}"`
    );
  });
  sections.push("");

  // 7. Seasonal Trends
  sections.push("=== মৌসুমী ট্রেন্ড ===");
  sections.push("মৌসুম,সময়কাল,ক্যাটেগরি,পরিবর্তন (%),কারণ");
  marketIntelligence.seasonalTrends.forEach((season) => {
    season.trends.forEach((trend) => {
      sections.push(
        `"${season.season}","${season.months}","${trend.category}",${
          trend.change > 0 ? "+" : ""
        }${trend.change}%,"${trend.reason}"`
      );
    });
  });
  sections.push("");

  // 8. Budget Optimization
  sections.push("=== বাজেট অপটিমাইজেশন ===");
  sections.push(
    `বর্তমান মাসিক খরচ,${formatCurrency(budgetOptimization.currentMonthly)}`
  );
  sections.push(
    `অপটিমাইজড বাজেট,${formatCurrency(budgetOptimization.optimizedBudget)}`
  );
  sections.push(
    `সম্ভাব্য সাশ্রয়,${formatCurrency(budgetOptimization.potentialSavings)}`
  );
  sections.push("");
  sections.push("সাশ্রয়ের উপায়,প্রত্যাশিত সাশ্রয়,কঠিনতা,বিবরণ");
  budgetOptimization.suggestions.forEach((suggestion) => {
    sections.push(
      `"${suggestion.action}",${formatCurrency(suggestion.savings)},"${
        suggestion.effort
      }","${suggestion.description}"`
    );
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
    `market-intelligence-report-${new Date().toISOString().split("T")[0]}.csv`
  );
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const downloadDetailedMarketReport = (data) => {
  // Create a detailed HTML report for printing
  const printWindow = window.open("", "_blank");
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>উন্নত বাজার বুদ্ধিমত্তা রিপোর্ট</title>
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
        .section { 
          margin-bottom: 30px; 
          page-break-inside: avoid;
        }
        .section-title {
          background: linear-gradient(135deg, #007bff, #0056b3);
          color: white;
          padding: 12px 15px;
          font-weight: bold;
          font-size: 18px;
          border-radius: 8px;
          margin-bottom: 15px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .table { 
          width: 100%; 
          border-collapse: collapse; 
          margin-bottom: 20px; 
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          border-radius: 8px;
          overflow: hidden;
        }
        .table th, .table td { 
          border: 1px solid #e0e0e0; 
          padding: 12px 8px; 
          text-align: left; 
        }
        .table th { 
          background: linear-gradient(135deg, #f8f9fa, #e9ecef);
          font-weight: bold;
          color: #495057;
        }
        .table tr:nth-child(even) {
          background-color: #f8f9fa;
        }
        .table tr:hover {
          background-color: #e3f2fd;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          margin-bottom: 25px;
        }
        .stat-card {
          border: 1px solid #e0e0e0;
          padding: 20px;
          border-radius: 12px;
          background: linear-gradient(135deg, #ffffff, #f8f9fa);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          transition: transform 0.2s;
        }
        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.15);
        }
        .stat-label {
          font-size: 14px;
          color: #6c757d;
          margin-bottom: 8px;
        }
        .stat-value {
          font-size: 28px;
          font-weight: bold;
          color: #007bff;
          margin-bottom: 5px;
        }
        .supplier-card {
          border: 1px solid #e0e0e0;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 20px;
          background: white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }
        .supplier-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
          padding-bottom: 10px;
          border-bottom: 2px solid #f0f0f0;
        }
        .supplier-name {
          font-size: 20px;
          font-weight: bold;
          color: #2c3e50;
        }
        .rating {
          background: linear-gradient(135deg, #ffc107, #ff8f00);
          color: white;
          padding: 6px 12px;
          border-radius: 20px;
          font-weight: bold;
        }
        .alert-card {
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 15px;
          border-left: 4px solid;
        }
        .alert-warning {
          background-color: #fff8e1;
          border-left-color: #ffc107;
          color: #8a6d00;
        }
        .alert-success {
          background-color: #e8f5e8;
          border-left-color: #28a745;
          color: #155724;
        }
        .alert-info {
          background-color: #e3f2fd;
          border-left-color: #007bff;
          color: #004085;
        }
        .optimization-summary {
          background: linear-gradient(135deg, #e8f5e8, #c8e6c9);
          padding: 25px;
          border-radius: 12px;
          margin-bottom: 20px;
          text-align: center;
        }
        .savings-highlight {
          font-size: 36px;
          font-weight: bold;
          color: #2e7d32;
          margin: 10px 0;
        }
        @media print { 
          .no-print { display: none; }
          body { margin: 0; }
          .stat-card, .supplier-card { break-inside: avoid; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>উন্নত বাজার বুদ্ধিমত্তা রিপোর্ট</h1>
        <h2>মেস ব্যবস্থাপনা সিস্টেম</h2>
        <p>রিপোর্ট তৈরির তারিখ: ${formatDate(new Date())}</p>
        <p>বিশ্লেষণের ধরন: সাপ্লায়ার তুলনা ও বাজেট অপটিমাইজেশন</p>
      </div>

      <div class="section">
        <div class="section-title">📊 মূল পরিসংখ্যান</div>
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-label">সম্ভাব্য মাসিক সাশ্রয়</div>
            <div class="stat-value">${formatCurrency(
              data.budgetOptimization.potentialSavings
            )}</div>
            <div class="stat-label">বর্তমান খরচের ${Math.round(
              (data.budgetOptimization.potentialSavings /
                data.budgetOptimization.currentMonthly) *
                100
            )}% কম</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">মোট সাপ্লায়ার</div>
            <div class="stat-value">${data.supplierComparison.length}</div>
            <div class="stat-label">বিশ্লেষণে অন্তর্ভুক্ত</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">পণ্য তুলনা</div>
            <div class="stat-value">${data.productComparison.length}</div>
            <div class="stat-label">টি প্রধান পণ্য</div>
          </div>
          <div class="stat-card">
            <div class="stat-label">সেরা সাপ্লায়ার</div>
            <div class="stat-value" style="font-size: 20px;">${
              data.supplierComparison.reduce(
                (best, current) =>
                  current.rating > best.rating ? current : best,
                data.supplierComparison[0]
              ).name
            }</div>
            <div class="stat-label">সর্বোচ্চ রেটিং</div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">🏪 সাপ্লায়ার বিশ্লেষণ</div>
        ${data.supplierComparison
          .map(
            (supplier) => `
          <div class="supplier-card">
            <div class="supplier-header">
              <div>
                <div class="supplier-name">${supplier.name}</div>
                <div style="color: #6c757d; font-size: 14px;">${
                  supplier.location
                }</div>
              </div>
              <div class="rating">${"★".repeat(
                Math.floor(supplier.rating)
              )}${"☆".repeat(5 - Math.floor(supplier.rating))} ${
                supplier.rating
              }</div>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 15px;">
              <div>
                <strong>মোট কেনাকাটা:</strong> ${supplier.totalPurchases} বার
              </div>
              <div>
                <strong>গড় দাম:</strong> ৳${supplier.averagePrice}
              </div>
              <div>
                <strong>নির্ভরযোগ্যতা:</strong> ${supplier.reliability}%
              </div>
            </div>

            <div style="margin-bottom: 15px;">
              <strong>প্রধান পণ্যসমূহ:</strong>
              <table class="table" style="margin-top: 10px;">
                <thead>
                  <tr>
                    <th>পণ্য</th>
                    <th>দাম</th>
                    <th>মান</th>
                    <th>সর্বশেষ আপডেট</th>
                  </tr>
                </thead>
                <tbody>
                  ${supplier.products
                    .map(
                      (product) => `
                    <tr>
                      <td>${product.name}</td>
                      <td>৳${product.price}</td>
                      <td>${product.quality}</td>
                      <td>${product.lastUpdated}</td>
                    </tr>
                  `
                    )
                    .join("")}
                </tbody>
              </table>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
              <div>
                <strong style="color: #28a745;">✓ সুবিধাসমূহ:</strong>
                <ul style="margin: 5px 0; padding-left: 20px;">
                  ${supplier.advantages
                    .map((advantage) => `<li>${advantage}</li>`)
                    .join("")}
                </ul>
              </div>
              <div>
                <strong style="color: #dc3545;">⚠ অসুবিধাসমূহ:</strong>
                <ul style="margin: 5px 0; padding-left: 20px;">
                  ${supplier.disadvantages
                    .map((disadvantage) => `<li>${disadvantage}</li>`)
                    .join("")}
                </ul>
              </div>
            </div>
          </div>
        `
          )
          .join("")}
      </div>

      <div class="section">
        <div class="section-title">🔍 পণ্য তুলনা বিশ্লেষণ</div>
        ${data.productComparison
          .map(
            (product) => `
          <div class="supplier-card">
            <div class="supplier-header">
              <div class="supplier-name">${product.name} (${product.unit})</div>
              <div style="text-align: right;">
                <div style="color: #28a745; font-weight: bold; font-size: 16px;">
                  মাসিক সাশ্রয়: ${formatCurrency(product.savings)}
                </div>
                <div style="color: #6c757d; font-size: 14px;">
                  সুপারিশ: ${product.recommendation}
                </div>
              </div>
            </div>
            
            <table class="table">
              <thead>
                <tr>
                  <th>সাপ্লায়ার</th>
                  <th>দাম</th>
                  <th>মান</th>
                  <th>প্রাপ্যতা</th>
                </tr>
              </thead>
              <tbody>
                ${product.suppliers
                  .map(
                    (supplier) => `
                  <tr>
                    <td>${supplier.name}</td>
                    <td><strong>৳${supplier.price}</strong></td>
                    <td>${"★".repeat(supplier.quality)}${"☆".repeat(
                      5 - supplier.quality
                    )}</td>
                    <td>${"★".repeat(supplier.availability)}${"☆".repeat(
                      5 - supplier.availability
                    )}</td>
                  </tr>
                `
                  )
                  .join("")}
              </tbody>
            </table>

            <div style="margin-top: 15px;">
              <strong>দামের ইতিহাস (গত ৫ দিন):</strong>
              <div style="display: flex; gap: 5px; margin-top: 10px; align-items: end; height: 60px;">
                ${product.priceHistory
                  .map(
                    (price, i) => `
                  <div style="
                    flex: 1; 
                    background: linear-gradient(to top, #007bff, #0056b3); 
                    border-radius: 4px 4px 0 0;
                    height: ${
                      (price / Math.max(...product.priceHistory)) * 100
                    }%;
                    min-height: 20px;
                    display: flex;
                    align-items: end;
                    justify-content: center;
                    color: white;
                    font-size: 12px;
                    padding: 2px;
                  " title="দিন ${i + 1}: ৳${price}">
                    ৳${price}
                  </div>
                `
                  )
                  .join("")}
              </div>
            </div>
          </div>
        `
          )
          .join("")}
      </div>

      <div class="section">
        <div class="section-title">⚠️ মূল্য সতর্কতা ও বাজার বুদ্ধিমত্তা</div>
        ${data.marketIntelligence.priceAlerts
          .map(
            (alert) => `
          <div class="alert-card alert-${alert.status}">
            <h4 style="margin: 0 0 10px 0; font-size: 18px;">${alert.product}</h4>
            <p style="margin: 5px 0; font-weight: bold;">${alert.message}</p>
            <p style="margin: 5px 0;">${alert.suggestion}</p>
            <div style="background: rgba(255,255,255,0.7); padding: 10px; border-radius: 6px; margin-top: 10px;">
              <strong>করণীয়:</strong> ${alert.action}
            </div>
          </div>
        `
          )
          .join("")}
      </div>

      <div class="section">
        <div class="section-title">💰 বাজেট অপটিমাইজেশন</div>
        <div class="optimization-summary">
          <h3 style="margin: 0 0 10px 0;">সাশ্রয়ের সুযোগ</h3>
          <div>বর্তমান মাসিক খরচ: <strong>${formatCurrency(
            data.budgetOptimization.currentMonthly
          )}</strong></div>
          <div class="savings-highlight">${formatCurrency(
            data.budgetOptimization.potentialSavings
          )} সাশ্রয় সম্ভব</div>
          <div>অপটিমাইজড বাজেট: <strong>${formatCurrency(
            data.budgetOptimization.optimizedBudget
          )}</strong></div>
        </div>

        <h4 style="margin: 20px 0 15px 0;">বিস্তারিত সুপারিশসমূহ:</h4>
        ${data.budgetOptimization.suggestions
          .map(
            (suggestion, index) => `
          <div class="supplier-card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
              <h4 style="margin: 0; color: #2c3e50;">${index + 1}. ${
                suggestion.action
              }</h4>
              <div style="text-align: right;">
                <div style="font-size: 18px; font-weight: bold; color: #28a745;">
                  ${formatCurrency(suggestion.savings)}/মাস
                </div>
                <div style="padding: 4px 8px; background: ${
                  suggestion.effort === "সহজ"
                    ? "#d4edda"
                    : suggestion.effort === "মাঝারি"
                      ? "#fff3cd"
                      : "#f8d7da"
                }; border-radius: 4px; font-size: 12px;">
                  ${suggestion.effort}
                </div>
              </div>
            </div>
            <p style="color: #6c757d; margin: 0;">${suggestion.description}</p>
          </div>
        `
          )
          .join("")}
      </div>

      <div class="no-print" style="margin-top: 40px; text-align: center; padding: 20px; border-top: 2px solid #e0e0e0;">
        <button onclick="window.print()" style="
          padding: 12px 24px; 
          font-size: 16px; 
          margin-right: 15px; 
          background: linear-gradient(135deg, #007bff, #0056b3); 
          color: white; 
          border: none; 
          border-radius: 8px; 
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        ">📄 প্রিন্ট করুন</button>
        <button onclick="window.close()" style="
          padding: 12px 24px; 
          font-size: 16px; 
          background: #6c757d; 
          color: white; 
          border: none; 
          border-radius: 8px; 
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        ">✖ বন্ধ করুন</button>
      </div>
    </body>
    </html>
  `);
  printWindow.document.close();
};
