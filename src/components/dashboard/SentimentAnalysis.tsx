
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

interface SentimentAnalysisProps {
  data: Array<{
    name: string
    value: number
  }>
}

export default function SentimentAnalysis({ data }: SentimentAnalysisProps) {
  return (
    <div className="flex min-w-72 flex-1 flex-col gap-2">
      <p className="text-base font-medium text-white">Sentiment Analysis</p>
      <p className="text-[32px] font-bold leading-tight text-white">
        75% Positive
      </p>
      <p className="text-base text-[#ABABAB]">Last 24h +5%</p>
      <div className="min-h-[180px] py-4">
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={data}>
            <XAxis dataKey="name" stroke="#ABABAB" />
            <YAxis stroke="#ABABAB" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#ABABAB"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
