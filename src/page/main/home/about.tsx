import { Statistics } from "./statistics";

export const About = () => {
  return (
    <section
      id="about"
      className="container py-24 sm:py-32"
    >
      <div className="bg-muted/50 border rounded-lg py-12">
        <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
          <img
            src="/landing-page/pilot.png"
            alt="about-img"
            className="w-[300px] object-contain rounded-lg"
          />
          <div className="bg-green-0 flex flex-col justify-between">
            <div className="pb-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                  About{" "}
                </span>
                Pharmacy Store
              </h2>
              <p className="text-xl text-muted-foreground mt-4">
                Pharmacy Store is a leading provider of pharmaceutical products and services.
                Our mission is to deliver high-quality medications and healthcare solutions
                to our customers.With a commitment to excellence and a focus on customer
                satisfaction, we strive to be the trusted partner for all your pharmacy needs.
                Our team of experienced pharmacists and healthcare professionals is dedicated
                to providing personalized care and expert advice to help you achieve optimal
                health and well-being.
              </p>
            </div>

            <Statistics />
          </div>
        </div>
      </div>
    </section>
  );
};