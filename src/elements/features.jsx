import { NavLink } from "react-router-dom";

export default function Features() {
  const features = [
    {
      title: "Number Counter",
      description:
        "Increase or decrease numbers and test your counting skills.",
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/000/095/998/small/vector-red-number-counter.jpg",
      badge: "New",
      badgeColor: "bg-green-500",
      route: "/numbercount",
    },
    {
      title: "Tic Tac Toe",
      description:
        "Challenge your friends to a game of Tic Tac Toe and see who's the best!",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKNKaKsJoO93z-1rtHLaDh1yxVQsHn5SuKLQ&s",
      badge: "Popular",
      badgeColor: "bg-blue-500",
      route: "/tictac",
    },
    {
      title: "Rock Paper Scissors",
      description:
        "Test your luck and strategy in this classic game of Rock Paper Scissors.",
      image:
        "https://static.vecteezy.com/system/resources/previews/010/307/906/non_2x/hands-playing-rock-paper-scissors-game-flat-design-style-illustration-vector.jpg",
      badge: null,
      badgeColor: "",
      route: "/rps",
    },
    {
      title: "Quiz Game",
      description:
        "Challenge your knowledge with fun and interactive quizzes.",
      image:
        "https://thumbs.dreamstime.com/b/quiz-logo-icon-vector-symbol-flat-cartoon-bubble-speeches-question-check-mark-signs-as-competition-game-interview-160701701.jpg",
      badge: "Beta",
      badgeColor: "bg-purple-500",
      route: "/quiz",
    },
    {
      title: "Guess the Number",
      description:
        "Test your guessing skills in this exciting number guessing game.",
      image:
        "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/850110/header.jpg?t=1667292241",
      badge: null,
      badgeColor: "",
      route: "/guessnum",
    },
    {
      title: "Typing Speed Test",
      description:
        "Improve your typing speed and accuracy with this fun challenge.",
      image:
        "https://i.pinimg.com/564x/7f/e0/67/7fe0675cc19ea0f153888005bc9cddef.jpg",
      badge: "Updated",
      badgeColor: "bg-orange-500",
      route: "/typingspeed",
    },
    {
      title: "Flappy Bird",
      description:
        "Test your reflexes in this challenging and addictive Flappy Bird clone.",
      image:
        "https://www.cnet.com/a/img/resize/46f2494ed207b1be804c17731f3949ed93dee003/hub/2014/02/14/6b6db47b-a5e1-11e3-a24e-d4ae52e62bcc/Flappy_Bird_Nick_02.jpg?auto=webp&fit=crop&height=675&width=1200",
      badge: "New",
      badgeColor: "bg-green-500",
      route: "/flappybird",
    },
    {
      title: "Game 2048",
      description: "Slide and combine tiles to reach 2048 in this addictive puzzle game.",
      image: "https://mir-s3-cdn-cf.behance.net/projects/808/cb0f41233081339.Y3JvcCwxMTIzLDg3OCwxODksMTY.png",
      badge: "Classic",
      badgeColor: "bg-yellow-500",
      route: "/game2048"
    },
    
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-zinc-900 dark:to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🎮 FunByte Games Collection
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Explore our collection of fun and exciting mini games. Play
            instantly and challenge yourself!
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />

                {feature.badge && (
                  <span
                    className={`absolute top-4 right-4 px-3 py-1 text-xs font-semibold text-white rounded-full ${feature.badgeColor}`}
                  >
                    {feature.badge}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col h-[220px]">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 flex-grow">
                  {feature.description}
                </p>

                {/* Play Button */}
                <NavLink
                  to={feature.route}
                  className="mt-5 inline-flex items-center justify-center px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200"
                >
                  🎮 Play Now
                </NavLink>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Button */}
        <div className="text-center mt-12">
          <NavLink
            to="/explore"
            className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
          >
            🚀 Explore All Games
          </NavLink>
        </div>
      </div>
    </section>
  );
}