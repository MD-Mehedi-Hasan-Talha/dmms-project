import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TabsContent } from "@/components/ui/tabs";
import { ScaleIcon } from "@heroicons/react/24/outline";
import { formatCurrency } from "@/lib/utils";

export default function ProductComparisonTab({ filteredProducts }) {
  return (
    <>
      <TabsContent value="products" className="space-y-6">
        {filteredProducts.map((product, index) => (
          <Card key={index} className="border border-gray-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <ScaleIcon className="w-5 h-5" />
                  <span>{product.name}</span>
                </CardTitle>
                <div className="text-right">
                  <Badge className="bg-green-100 text-green-800 mb-1">
                    মাসিক সাশ্রয়: {formatCurrency(product.savings)}
                  </Badge>
                  <p className="text-sm text-gray-600">
                    সুপারিশ: {product.recommendation}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">সাপ্লায়ার তুলনা:</h4>
                  <div className="space-y-3">
                    {product.suppliers.map((supplier, idx) => (
                      <div key={idx} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{supplier.name}</span>
                          <span className="text-lg font-bold text-green-600">
                            ৳{supplier.price}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-gray-600">মান:</span>
                            <div className="flex items-center">
                              {"★".repeat(supplier.quality)}
                              {"☆".repeat(5 - supplier.quality)}
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-600">প্রাপ্যতা:</span>
                            <div className="flex items-center">
                              {"★".repeat(supplier.availability)}
                              {"☆".repeat(5 - supplier.availability)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">দামের ইতিহাস (গত ৫ দিন):</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>সর্বোচ্চ:</span>
                      <span>৳{Math.max(...product.priceHistory)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>সর্বনিম্ন:</span>
                      <span>৳{Math.min(...product.priceHistory)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>গড়:</span>
                      <span>
                        ৳
                        {Math.round(
                          product.priceHistory.reduce((a, b) => a + b) /
                            product.priceHistory.length
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex space-x-1 items-end h-20">
                      {product.priceHistory.map((price, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-green-500 rounded-t"
                          style={{
                            height: `${
                              (price / Math.max(...product.priceHistory)) * 100
                            }%`,
                            minHeight: "20px",
                          }}
                          title={`দিন ${i + 1}: ৳${price}`}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>৫ দিন আগে</span>
                      <span>আজ</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </TabsContent>
    </>
  );
}
