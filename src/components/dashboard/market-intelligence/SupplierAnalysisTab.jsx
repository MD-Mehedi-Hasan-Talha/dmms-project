import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TabsContent } from "@/components/ui/tabs";
import {
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import {
  getQualityBadge,
  getQualityText,
  getSupplierRating,
} from "@/lib/utils";

export default function SupplierAnalysisTab({ filteredSuppliers }) {
  return (
    <>
      <TabsContent value="suppliers" className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredSuppliers.map((supplier, index) => (
            <Card
              key={index}
              className="border-2 hover:border-green-300 transition-colors"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{supplier.name}</CardTitle>
                  <Badge className="bg-blue-100 text-blue-800">
                    {getSupplierRating(supplier.rating)}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{supplier.location}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">মোট কেনাকাটা:</span>
                    <p className="font-semibold">
                      {supplier.totalPurchases} বার
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">গড় দাম:</span>
                    <p className="font-semibold">৳{supplier.averagePrice}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">নির্ভরযোগ্যতা:</span>
                    <p className="font-semibold">{supplier.reliability}%</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">প্রধান পণ্যসমূহ:</h4>
                  <div className="space-y-2">
                    {supplier.products.map((product, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center p-2 bg-gray-50 rounded"
                      >
                        <div>
                          <span className="font-medium">{product.name}</span>
                          <Badge
                            className={`ml-2 text-xs ${getQualityBadge(
                              product.quality
                            )}`}
                          >
                            {typeof product.quality === "string"
                              ? product.quality
                              : getQualityText(product.quality)}
                          </Badge>
                        </div>
                        <span className="font-semibold">৳{product.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">সুবিধা:</h4>
                  <ul className="text-sm space-y-1">
                    {supplier.advantages.map((advantage, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-green-600"
                      >
                        <CheckCircleIcon className="w-4 h-4 mr-2" />
                        {advantage}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2">অসুবিধা:</h4>
                  <ul className="text-sm space-y-1">
                    {supplier.disadvantages.map((disadvantage, idx) => (
                      <li key={idx} className="flex items-center text-red-600">
                        <ExclamationTriangleIcon className="w-4 h-4 mr-2" />
                        {disadvantage}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>
    </>
  );
}
