
import Image from "next/image"

export const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-16">Why Companies Choose PamirHub</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Sarah Johnson",
              role: "CTO, TechInnovate",
              image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg",
              text: "PamirHub's engineering team delivered exceptional quality mechanical designs that integrated perfectly with our existing systems. All done remotely and on schedule."
            },
            {
              name: "Michael Chen",
              role: "CEO, GlobalTech Solutions",
              image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg",
              text: "The comprehensive software development services from PamirHub saved us months of recruitment efforts. Their remote team delivers enterprise-grade solutions consistently."
            },
            {
              name: "Emma Davis",
              role: "Product Director, InnovateCorp",
              image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg",
              text: "PamirHub's remote electrical engineering team managed our complex project with exceptional precision. Their all-in-one service model eliminates the hassle of coordinating multiple contractors."
            }
          ].map((testimonial, i) => (
            <div key={i} className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-6">
                <div className="relative w-12 h-12">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div className="ml-4">
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <div className="text-yellow-400 mb-4">★★★★★</div>
              <p className="text-gray-600">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
