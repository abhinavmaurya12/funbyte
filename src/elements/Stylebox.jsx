//1st section of home page with badge and update card
<div className="flex flex-col lg:flex-row items-center justify-center gap-6 mb-8">
  
  {/* Main Badge */}
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8 }}
    className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-blue-200 dark:border-zinc-700 text-blue-600 dark:text-blue-400"
  >
    🚀 Play New Mini Games Every Week • Fun at Every Byte
  </motion.div>

  {/* Update Card */}
  <motion.div
    initial={{ opacity: 0, x: 30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.4 }}
    className="px-4 py-3 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-300 dark:border-zinc-700 backdrop-blur-md"
  >
    <div className="text-xs text-gray-500 dark:text-gray-400">
      NEXT UPDATE
    </div>

    <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
      Friday • 7 PM
    </div>

    <div className="text-xs text-gray-500 dark:text-gray-400">
      🎮 New Mini Game Release
    </div>
  </motion.div>

</div>


// 2nd section with main heading and subheading