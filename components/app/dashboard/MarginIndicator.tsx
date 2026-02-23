interface Props {
  marginPercentage: number;
  realProfit: number;
}

export default function MarginIndicator({
  marginPercentage,
  realProfit,
}: Props) {
  let color = "text-green-500";
  let icon = "🟢";

  if (realProfit < 0 || marginPercentage < 5) {
    color = "text-red-500";
    icon = "🔴";
  } else if (marginPercentage < 20) {
    color = "text-yellow-500";
    icon = "🟡";
  }

  return (
    <div className={`flex items-center gap-2 font-semibold ${color}`}>
      <span>{icon}</span>
      <span>{marginPercentage.toFixed(1)}%</span>
    </div>
  );
}
