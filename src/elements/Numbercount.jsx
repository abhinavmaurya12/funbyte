
//NUMBER COUNTER
    import { useState } from 'react'
    // import '../App.css'
    export default function Numbercount() {
        let [counter, setCounter]  = useState(5)
        let addValue = () => {
            if(counter === 20){
                alert("counter value is 20")
            }else{
                setCounter(counter + 1)
            }
        }
        let removeValue = () => {
            if(counter === 0){
                alert("counter value is 0")
            }else{
                setCounter(counter - 1)
            }
        }
        return (
                <>
  
  <div className="min-h-screen flex items-center justify-center bg-white p-4">
    <div className="bg-blue-600 text-white shadow-2xl rounded-3xl p-8 w-full max-w-md text-center">

      <h1 className="text-4xl font-extrabold mb-6">
        Number Counter
      </h1>

      <div className="bg-white text-gray-600 rounded-2xl p-6 mb-6 shadow-lg">
        <h2 className="text-5xl font-bold">
          {counter}
        </h2>
        <p className="text-gray-500 mt-2">
          Current Counter Value
        </p>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={addValue}
          className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl font-semibold transition-all duration-300"
        >
          + Add
        </button>

        <button
          onClick={removeValue}
          className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-xl font-semibold transition-all duration-300"
        >
          - Remove
        </button>
      </div>

    </div>
    
  </div>

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
        )
    }

    