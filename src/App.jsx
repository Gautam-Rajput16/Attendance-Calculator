import React, { useState } from 'react';
import { Calculator, School2, Info } from 'lucide-react';

function App() {
  const [totalClasses, setTotalClasses] = useState('');
  const [attendedClasses, setAttendedClasses] = useState('');
  const [result, setResult] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const calculateAttendance = (e) => {
    e.preventDefault();

    const total = typeof totalClasses === 'string' ? parseInt(totalClasses) : totalClasses;
    const attended = typeof attendedClasses === 'string' ? parseInt(attendedClasses) : attendedClasses;

    if (!total || total <= 0 || !attended || attended < 0) {
      alert('Ek bhi din college nhi gya hai tu admission kyu liya 💩, Ghar walo ke pass jaada Black Money hai 🧐');
      return;
    }

    if (attended > total) {
      alert('Tu thoda sa chutiya hai kya 🤡');
      return;
    }

    const currentPercentage = (attended / total) * 100;
    const requiredPercentage = 75;

    const totalRequiredClasses = Math.ceil((requiredPercentage * total) / 100);
    const requiredClasses = Math.max(0, totalRequiredClasses - attended);
    const remainingClasses = total - attended;
    const isAchievable = attended + remainingClasses >= totalRequiredClasses;
    const canSkipClasses = Math.max(0, attended - totalRequiredClasses);

    setResult({
      currentPercentage,
      requiredClasses,
      remainingClasses,
      isAchievable,
      canSkipClasses,
      totalClasses: total,
      attendedClasses: attended,
    });
    setShowDetails(true);
  };

  return (
    <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <School2 className="h-16 w-16 text-cyan-400 mx-auto mb-4 animate-glow" strokeWidth={1.5} />
            <div className="absolute inset-0 bg-cyan-400/20 blur-xl rounded-full" />
          </div>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">
            Attendance Calculator
          </h1>
          <p className="text-gray-400 text-sm">Calculate required classes for 75% attendance</p>
        </div>

        {/* Calculator Form */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-6 mb-6 animate-glow">
          <form onSubmit={calculateAttendance} className="space-y-4">
            <div>
              <label htmlFor="totalClasses" className="block text-sm text-gray-300 mb-1">
                Total Classes
              </label>
              <input
                id="totalClasses"
                type="number"
                min="1"
                value={totalClasses}
                onChange={(e) => setTotalClasses(e.target.value ? parseInt(e.target.value) : '')}
                className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg 
                         text-cyan-400 placeholder-gray-500 focus:ring-2 focus:ring-cyan-400/50 
                         focus:border-cyan-400/50 transition-all"
                placeholder="Enter total classes"
                required
              />
            </div>

            <div>
              <label htmlFor="attendedClasses" className="block text-sm text-gray-300 mb-1">
                Classes Attended
              </label>
              <input
                id="attendedClasses"
                type="number"
                min="0"
                value={attendedClasses}
                onChange={(e) => setAttendedClasses(e.target.value ? parseInt(e.target.value) : '')}
                className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg 
                         text-cyan-400 placeholder-gray-500 focus:ring-2 focus:ring-cyan-400/50 
                         focus:border-cyan-400/50 transition-all"
                placeholder="Enter attended classes"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 px-4 
                       rounded-lg hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 
                       flex items-center justify-center gap-2 mt-6 group"
            >
              <Calculator className="h-5 w-5 group-hover:rotate-180 transition-transform duration-300" />
              Calculate
            </button>
          </form>
        </div>

        {/* Results */}
        {result && (
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-6 animate-fade-in">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700">
                  <div className="text-sm text-gray-400 mb-1">Current</div>
                  <div className="text-2xl font-bold text-cyan-400">
                    {result.currentPercentage.toFixed(1)}%
                  </div>
                </div>
                <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700">
                  <div className="text-sm text-gray-400 mb-1">Remaining</div>
                  <div className="text-2xl font-bold text-cyan-400">
                    {result.remainingClasses}
                  </div>
                </div>
              </div>

              {result.currentPercentage <= 25 ? (
                <div className="p-4 rounded-xl bg-red-900/20 border border-red-700 text-red-400 text-sm">
                  <p>Bhai tu to bilkul hi hopeless case hai 😭, Teri attendance 25% se bhi kam hai!</p>
                </div>
              ) : result.isAchievable ? (
                <div
                  className={`p-4 rounded-xl border ${
                    result.currentPercentage >= 75
                      ? 'bg-emerald-900/20 border-emerald-700 text-emerald-400'
                      : 'bg-amber-900/20 border-amber-700 text-amber-400'
                  }`}
                >
                  {result.currentPercentage >= 75 ? (
                    <div className="space-y-2">
                      <p className="text-sm">Bhai Kya krega College jaake, 75% se jaada h teri 😒</p>
                      {result.canSkipClasses > 0 && (
                        <p className="text-xs opacity-80">
                          Abe ghar baith ab <strong>{result.canSkipClasses}</strong>{' '}
                          {result.canSkipClasses === 1 ? 'class' : 'Din'} aur Bunk kr skta hai tu koi tension
                          nhi h 😎
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-2 text-sm">
                      <p>
                        Dekh bhai teri attendance jaada km nhi h bs <strong>{result.requiredClasses}</strong>{' '}
                        din aur college aajaa 😉
                      </p>
                      <p className="text-xs opacity-80">
                        {result.requiredClasses > result.remainingClasses
                          ? 'Attend all remaining classes to get as close as possible to 75%'
                          : `Agar tera mann nhi h college aane ka to tu ${
                              result.remainingClasses - result.requiredClasses
                            } class bunk kr skta hai 😌  `}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-red-900/20 border border-red-700 text-red-400 text-sm">
                  <p>Target Unattainable</p>
                  <p className="text-xs mt-1 opacity-80">
                    Even with {result.remainingClasses} remaining classes
                  </p>
                </div>
              )}

              {/* Info Button */}
              <button
                onClick={() => setShowDetails(true)}
                className="w-full flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <Info className="h-4 w-4" />
                View Calculation Details
              </button>
            </div>
          </div>
        )}

        {/* Calculation Details Modal */}
        {showDetails && result && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6 max-w-md w-full animate-fade-in">
              <h2 className="text-xl font-bold text-cyan-400 mb-4">Calculation Details</h2>
              <div className="space-y-3 text-sm">
                <div className="grid grid-cols-2 gap-2 p-3 bg-gray-900/50 rounded-lg">
                  <div className="text-gray-400">Total Classes:</div>
                  <div className="text-right text-cyan-400">{result.totalClasses}</div>
                </div>
                <div className="grid grid-cols-2 gap-2 p-3 bg-gray-900/50 rounded-lg">
                  <div className="text-gray-400">Classes Attended:</div>
                  <div className="text-right text-cyan-400">{result.attendedClasses}</div>
                </div>
                <div className="grid grid-cols-2 gap-2 p-3 bg-gray-900/50 rounded-lg">
                  <div className="text-gray-400">Current Attendance:</div>
                  <div className="text-right text-cyan-400">{result.currentPercentage.toFixed(1)}%</div>
                </div>
                <div className="grid grid-cols-2 gap-2 p-3 bg-gray-900/50 rounded-lg">
                  <div className="text-gray-400">Required Attendance:</div>
                  <div className="text-right text-cyan-400">75%</div>
                </div>
                <div className="grid grid-cols-2 gap-2 p-3 bg-gray-900/50 rounded-lg">
                  <div className="text-gray-400">Remaining Classes:</div>
                  <div className="text-right text-cyan-400">{result.remainingClasses}</div>
                </div>
                {result.currentPercentage >= 75 ? (
                  <div className="grid grid-cols-2 gap-2 p-3 bg-gray-900/50 rounded-lg">
                    <div className="text-gray-400">Can Skip:</div>
                    <div className="text-right text-emerald-400">{result.canSkipClasses} classes</div>
                  </div>
                ) : result.isAchievable ? (
                  <div className="grid grid-cols-2 gap-2 p-3 bg-gray-900/50 rounded-lg">
                    <div className="text-gray-400">Must Attend:</div>
                    <div className="text-right text-amber-400">{result.requiredClasses} classes</div>
                  </div>
                ) : null}
              </div>
              <button
                onClick={() => setShowDetails(false)}
                className="w-full mt-6 bg-gray-700 text-gray-200 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;