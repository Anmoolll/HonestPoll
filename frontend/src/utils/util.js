export const saveSelectedOption = (pollId, seletedOptionId) => {
    localStorage.setItem(pollId, seletedOptionId);
}

export const getSelectedOption = (pollId) => {
    const selecetedId = localStorage.getItem(pollId);
    return selecetedId;
}

export const makeChartDataObjFromPollData = (poll) => {
  const options = poll?.data?.pollData?.options || [];

  // Generate a color for each option so we don't silently drop bars
  const baseColors = ["#3B82F6", "#EF4444", "#10B981", "#F59E0B", "#8B5CF6", "#EC4899", "#22C55E", "#F97316"];
  const backgroundColors = options.map((_, idx) => baseColors[idx % baseColors.length]);

  return {
    labels: options.map((option) => option.name),
    datasets: [
      {
        label: "Votes",
        data: options.map((option) => option.voteCount),
        backgroundColor: backgroundColors,
        borderWidth: 1,
      },
    ],
  };
};

export const formatDataByDate = (data) => {
  const fromatedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return fromatedData;
}