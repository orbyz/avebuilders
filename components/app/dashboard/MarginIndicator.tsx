interface Props {
  marginPercentage: number;
  realProfit: number;
}

export default function MarginIndicator({
  marginPercentage,
}: {
  marginPercentage: number | null;
}) {
  if (marginPercentage === null) {
    return (
      <div className="flex items-center justify-center gap-2 text-gray-500 font-semibold">
        —
      </div>
    );
  }

  let color = "bg-green-500";
  let textColor = "text-green-500";

  if (marginPercentage < 0) {
    color = "bg-red-500";
    textColor = "text-red-500";
  } else if (marginPercentage < 5) {
    color = "bg-yellow-500";
    textColor = "text-yellow-500";
  }

  return (
    <div
      className={`flex items-center justify-center gap-2 font-semibold ${textColor}`}
    >
      <span className={`w-3 h-3 rounded-full ${color}`} />
      <span>{marginPercentage.toFixed(1)}%</span>
    </div>
  );
}
