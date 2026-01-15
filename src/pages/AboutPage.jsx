const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          About Terra Food Loop
        </h1>

        {/* Mission */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Terra Food Loop connects businesses with surplus food to consumers
            who need it, reducing food waste and building stronger communities.
          </p>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-green-700 mb-6">
            How It Works
          </h2>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-700 font-bold text-xl">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Businesses Post
                </h3>
                <p className="text-gray-600">
                  Restaurants and stores post their surplus food items.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-700 font-bold text-xl">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Consumers Browse
                </h3>
                <p className="text-gray-600">
                  People browse available food items in their area.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-700 font-bold text-xl">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Pick Up & Enjoy
                </h3>
                <p className="text-gray-600">
                  Consumers pick up food and businesses reduce waste!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
