import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { StarIcon } from "@heroicons/react/24/outline";

const testimonials = [
  {
    name: "আহমেদ আলী",
    role: "মেস অ্যাডমিন, ঢাকা",
    comment: "এই অ্যাপ ব্যবহার করে আমাদের মেসের সব ঝামেলা শেষ! সবাই খুশি।",
    rating: 5,
  },
  {
    name: "ফাতিমা খানম",
    role: "শিক্ষার্থী, চট্টগ্রাম",
    comment:
      "পেমেন্ট করা এখন খুবই সহজ। বিকাশ দিয়ে এক সেকেন্ডেই পেমেন্ট হয়ে যায়।",
    rating: 5,
  },
  {
    name: "রহিম উদ্দিন",
    role: "চাকরিজীবী, সিলেট",
    comment: "মাসের শেষে বিল কত হবে সেটা আগেই জানতে পারি। খুব সুবিধা।",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ব্যবহারকারীরা কী <span className="text-green-600">বলছেন</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 border-0 shadow-lg">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">
                "{testimonial.comment}"
              </p>
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
