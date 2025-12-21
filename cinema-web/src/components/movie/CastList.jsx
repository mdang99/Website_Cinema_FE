"use client";
export default function CastList({ cast }) {
  return (
    <div className="bg-[#151821] rounded-xl p-6">
      <h3 className="font-semibold mb-4">Diễn viên</h3>

      <div className="space-y-3">
        {cast.map((name) => (
          <div key={name} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20" />
            <span className="text-sm">{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
