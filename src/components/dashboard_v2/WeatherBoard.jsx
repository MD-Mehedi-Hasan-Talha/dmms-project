import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const WeatherBoard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>আজকের আবহাওয়া</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <div className="text-3xl mb-2">🌤️</div>
          <p className="text-lg font-semibold">৩২°সে</p>
          <p className="text-sm text-gray-600">আংশিক মেঘলা</p>
          <p className="text-xs text-gray-500 mt-2">ঢাকা, বাংলাদেশ</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherBoard;
