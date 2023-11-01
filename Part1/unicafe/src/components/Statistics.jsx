import React from "react";
import StatiscticsLine from "./StatiscticsLine";

const Statistics = ({ goodCount, neutralCount, badCount }) => {
  const totalCount = goodCount + neutralCount + badCount;
  const findAverage = () => {
    const average = (goodCount - badCount) / totalCount;
    return average.toFixed(3);
  };
  const positivePercenage = ((goodCount / totalCount) * 100).toFixed(3);

  return goodCount === 0 && neutralCount === 0 && badCount === 0 ? (
    <div className="font-bold">No Feedback Given</div>
  ) : (
    <>
      <div class="relative overflow-x-auto">
        <table class="w-full text-center text-gray-500 dark:text-gray-400 border-2 border-black border-collapse">
          <thead class="text-black uppercase bg-gray-500">
            <tr>
              <th scope="col" class="px-6 py-3">
                Value
              </th>
              <th scope="col" class="px-6 py-3">
                Count
              </th>
            </tr>
          </thead>
          <tbody>
            <StatiscticsLine text="Good" count={goodCount} />
            <StatiscticsLine text="Neutral" count={neutralCount} />
            <StatiscticsLine text="Bad" count={badCount} />
            <StatiscticsLine text="Total" count={totalCount} />
            <StatiscticsLine text="Average" count={findAverage()} />
            <StatiscticsLine text="Positive" count={positivePercenage} />
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Statistics;
