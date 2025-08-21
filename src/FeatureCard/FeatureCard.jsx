
export default function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-gray-900/80 border border-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center gap-3 hover:scale-105 hover:border-blue-500 transition-all duration-200 z-1">
      <div className="text-blue-400">{icon}</div>
      <h3 className="text-lg font-bold text-blue-200">{title}</h3>
      <p className="text-gray-400 text-center text-sm">{desc}</p>
    </div>
  )
}

