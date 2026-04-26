import { motion } from "motion/react";
import { Clock, Waves, Trees, Skull, History } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  Tooltip,
} from "recharts";

interface Props {
  material: string;
}

const decompositionData: Record<string, any> = {
  Plastic: [
    { environment: "Ocean", years: 450, color: "#3B82F6" },
    { environment: "Landfill", years: 1000, color: "#1F2937" },
    { environment: "Compost", years: 0, color: "#10B981", label: "NEVER" },
  ],
  Aluminum: [
    { environment: "Ocean", years: 200, color: "#3B82F6" },
    { environment: "Landfill", years: 500, color: "#1F2937" },
    { environment: "Compost", years: 0, color: "#10B981" },
  ],
  Paper: [
    { environment: "Ocean", years: 0.1, color: "#3B82F6" },
    { environment: "Landfill", years: 5, color: "#1F2937" },
    { environment: "Compost", years: 0.2, color: "#10B981" },
  ],
  Glass: [
    { environment: "Ocean", years: 1000, color: "#3B82F6" },
    { environment: "Landfill", years: 1000000, color: "#1F2937" },
    { environment: "Compost", years: 0, color: "#10B981" },
  ],
  Default: [
    { environment: "Ocean", years: 50, color: "#3B82F6" },
    { environment: "Landfill", years: 100, color: "#1F2937" },
    { environment: "Compost", years: 1, color: "#10B981" },
  ],
};

export default function ImpactPulse({ material }: Props) {
  const data = Object.keys(decompositionData).find((k) =>
    material.toLowerCase().includes(k.toLowerCase()),
  )
    ? decompositionData[
        Object.keys(decompositionData).find((k) =>
          material.toLowerCase().includes(k.toLowerCase()),
        )!
      ]
    : decompositionData.Default;

  return (
    <div className="space-y-10">
      <div className="flex items-center gap-4">
        <div className="h-px bg-forest/10 flex-1" />
        <div className="flex items-center gap-2 text-earth-brown lowercase font-bold tracking-widest text-[10px]">
          <Clock className="w-3 h-3" />
          Biodegradation Time Travel
        </div>
        <div className="h-px bg-forest/10 flex-1" />
      </div>

      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-forest">
            If this {material} is abandoned...
          </h3>
          <p className="text-xs text-forest/40 max-w-[240px] mx-auto leading-relaxed">
            Visualization of how long this item will persist in our planet's
            ecosystems.
          </p>
        </div>

        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical">
              <XAxis type="number" hide />
              <YAxis
                dataKey="environment"
                type="category"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fontWeight: "bold" }}
              />
              <Tooltip
                cursor={{ fill: "transparent" }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-forest p-2 rounded-lg text-white text-[10px] font-bold">
                        {payload[0].value} YEARS
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="years" radius={[0, 10, 10, 0]} barSize={20}>
                {data.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Stat icon={<Waves />} label="Ocean" val={data[0].years + "y"} />
          <Stat icon={<History />} label="Landfill" val={data[1].years + "y"} />
          <Stat
            icon={<Trees />}
            label="Compost"
            val={data[2].years > 0 ? data[2].years + "y" : "0y"}
          />
        </div>
      </div>
    </div>
  );
}

function Stat({
  icon,
  label,
  val,
}: {
  icon: React.ReactNode;
  label: string;
  val: string;
}) {
  return (
    <div className="bg-off-white p-3 rounded-2xl border border-black/5 text-center space-y-1">
      <div className="text-forest/20 flex justify-center">{icon}</div>
      <div className="text-[8px] font-bold uppercase tracking-wider text-forest/40">
        {label}
      </div>
      <div className="text-xs font-bold text-forest">{val}</div>
    </div>
  );
}
