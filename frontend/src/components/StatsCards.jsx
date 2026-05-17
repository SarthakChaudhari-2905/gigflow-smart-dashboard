const StatsCards = ({ stats }) => {
  const cards = [
    {
      title: "Total Leads",
      value: stats.totalLeads,
    },
    {
      title: "New",
      value: stats.newLeads,
    },
    {
      title: "Contacted",
      value: stats.contactedLeads,
    },
    {
      title: "Converted",
      value: stats.convertedLeads,
    },
    {
      title: "Lost",
      value: stats.lostLeads,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition"
        >
          <h3 className="text-gray-500 mb-2">
            {card.title}
          </h3>

          <p className="text-3xl md:text-4xl font-bold">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;