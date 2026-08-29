import { motion } from "framer-motion";
import { Gamepad2, Trophy, Zap, Brain } from "lucide-react";

export default function Home() {
  const floatingIcons = [
    { icon: Gamepad2, x: "10%", y: "20%" },
    { icon: Trophy, x: "85%", y: "25%" },
    { icon: Zap, x: "15%", y: "75%" },
    { icon: Brain, x: "80%", y: "70%" },
  ];

  return (
    <>
    <section className="relative min-h-screen bg-white dark:bg-black overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-zinc-900 dark:via-black dark:to-purple-900/20" />

      {/* Glowing Effects */}
      <div className="absolute top-20 right-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl opacity-20 animate-pulse" />

      {/* Floating Icons */}
      {floatingIcons.map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.div
            key={index}
            animate={{ y: [0, -20, 0] }}
            transition={{
              duration: 3 + index,
              repeat: Infinity,
            }}
            className="absolute hidden lg:block z-10"
            style={{
              left: item.x,
              top: item.y,
            }}
          >
            <Icon className="w-12 h-12 text-blue-500/30" />
          </motion.div>
        );
      })}

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Badge */}
          {/* <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-blue-200 dark:border-zinc-700 text-blue-600 dark:text-blue-400 mb-8"
          >
            🚀 Play New Mini Games Every Week • Fun at Every Byte
          </motion.div> */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 mb-8">
  
  {/* Badge */}
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8 }}
    className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-blue-200 dark:border-zinc-700 text-blue-600 dark:text-blue-400"
  >
   🎮 FunByte — Where Every Byte Brings Fun
  </motion.div>

<motion.div
  animate={{
    boxShadow: [
      "0 0 0px rgba(34,197,94,.4)",
      "0 0 20px rgba(214, 86, 27, 0.8)",
      "0 0 0px rgba(34,197,94,.4)",
    ],
  }}
  transition={{
    duration: 2,
    repeat: Infinity,
  }}
  className="flex items-center gap-3 px-4 py-2 rounded-full bg-green-50 dark:bg-green-900/20 border border-green-200">

  <span className="text-red-500 font-bold">10th</span>
  <span className="text-green-500 font-bold">20th</span>
  <span className="text-blue-500 font-bold">30th</span>

  <span className="bg-gradient-to-r from-red-500 via-green-500 to-blue-500 bg-clip-text text-transparent font-bold">
    🎮 Every Month Game Updates
  </span>


{/* <span className="text-lg font-bold tracking-wide">
  <span className="text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]">
    Every Sunday
  </span>
  {" • "}
  <span className="text-green-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]">
    New Game
  </span>
  {" • "}
  <span className="text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]">
    Release
  </span>
</span> */}
</motion.div>

  {/* Weekly Timeline */}
  <motion.div
    initial={{ opacity: 0, x: 30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.5 }}
    className="flex items-center gap-3 text-sm">
   

    {/* <div className="w-8 h-[2px] bg-gray-300"></div> */}

    {/* <div className="flex items-center gap-2">
      <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
      <span className="text-gray-700 dark:text-gray-300">Every Sunday</span>
    </div> */}

    <div className="w-8 h-[2px] bg-gray-300"></div>

    <div className="flex items-center gap-2">
      <span className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></span>
      <span className="font-semibold text-orange-500">
        Car box Race - New Game Added!
      </span>
    </div>
  </motion.div>
  
</div>



          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight"
          >
            <span className="text-gray-900 dark:text-white">
              Welcome to    
            </span>

           
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    _FunByte_ 
            </span>
            <span>🎮</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6"
          >
            <span className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-red-500 via-green-500 to-blue-500 bg-clip-text text-transparent">
              10+ Mini Games, Endless Fun!
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Play exciting games like Tic Tac Toe, Number Guess,
            Quiz Challenge, Flappy Bird, Snake, 2048, Memory Match
            and many more. No downloads. No signup. Just pure fun.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-5 justify-center mt-10"
          >
            <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-xl hover:scale-105 transition duration-300">
              🎮 Play Now
            </button>

            <button className="px-8 py-4 rounded-xl backdrop-blur-md bg-white/70 dark:bg-zinc-900/70 border border-gray-300 dark:border-zinc-700 hover:scale-105 transition duration-300">
              🚀 Explore Games
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mt-16"
          >
            <div className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md rounded-2xl p-6 shadow-lg">
              <h3 className="text-3xl font-bold text-blue-600">10+</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Mini Games
              </p>
            </div>

            <div className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md rounded-2xl p-6 shadow-lg">
              <h3 className="text-3xl font-bold text-green-600">100%</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Free To Play
              </p>
            </div>

            <div className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md rounded-2xl p-6 shadow-lg">
              <h3 className="text-3xl font-bold text-purple-600">∞</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Endless Fun
              </p>
            </div>
          </motion.div>
        </div>
      </div>

    </section>

 <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500 dark:text-gray-400">
            <span>Trusted by my Friends</span>
            <div className="flex items-center gap-6 opacity-60">
              <div className="px-4 py-2 bg-gray-100 dark:bg-zinc-800 rounded font-semibold">
                Let's
              </div>
              <div className="px-4 py-2 bg-gray-100 dark:bg-zinc-800 rounded font-semibold">
                Play
              </div>
              <div className="px-4 py-2 bg-gray-100 dark:bg-zinc-800 rounded font-semibold">
                Limitless
              </div>
              <div className="px-4 py-2 bg-gray-100 dark:bg-zinc-800 rounded font-semibold">
                Games
              </div>
            </div>
          </div>

          </>
    
  );
}