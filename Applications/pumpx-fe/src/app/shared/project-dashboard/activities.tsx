"use client";

import {
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
} from "recharts";
import { Box, Flex } from "rizzui";
import cn from "@/utils/class-names";
import SimpleBar from "@/components/ui/simplebar";
import WidgetCard from "@/components/cards/widget-card";
import { CustomTooltip } from "@/components/charts/custom-tooltip";
import { CustomYAxisTick } from "@/components/charts/custom-yaxis-tick";
import {
  ACTIVITIES_COLORS,
  activitiesData,
  activitiesStatus,
} from "@/data/project-dashboard";

export default function ProjectActivities({
  className,
}: {
  className?: string;
}) {
  return (
    <WidgetCard
      title="Activities"
      headerClassName="items-center"
      className={cn("@container dark:bg-gray-100/50", className)}
      action={<Legend />}
    >
      <SimpleBar>
        <Box className="h-[24rem] w-full pt-6 @lg:pt-8">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={activitiesData}
              margin={{
                top: 0,
                right: 0,
                bottom: 0,
                left: -40,
              }}
              className="[&_.recharts-cartesian-axis-tick-value]:-translate-x-1 [&_.recharts-cartesian-axis-tick-value]:translate-y-4 [&_.recharts-cartesian-axis-tick-value]:text-sm"
            >
              <CartesianGrid
                vertical={true}
                horizontal={false}
                strokeOpacity={1}
                strokeDasharray="0"
              />
              <XAxis
                type="number"
                tick={<CustomYAxisTick />}
                tickLine={false}
              />
              <YAxis
                className="[writing-mode:vertical-lr] rtl:[writing-mode:vertical-rl]"
                dataKey="label"
                type="category"
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                content={<CustomTooltip formattedNumber />}
                cursor={{
                  fill: "#3AA6B9",
                }}
              />
              <Bar
                radius={12}
                barSize={16}
                stroke={ACTIVITIES_COLORS[0]}
                dataKey="completed"
                fill="#3AA6B9"
              />
              <Bar
                radius={12}
                barSize={16}
                stroke={ACTIVITIES_COLORS[1]}
                dataKey="inProgress"
                fill="#365486"
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </SimpleBar>
    </WidgetCard>
  );
}

function Legend({ className }: { className?: string }) {
  return (
    <Flex gap="3" className={cn("text-xs @3xl:text-sm lg:gap-4", className)}>
      {activitiesStatus.map((item, index) => (
        <Flex align="center" gap="2" key={item.name}>
          <span
            className="size-2.5 rounded-full"
            style={{ backgroundColor: ACTIVITIES_COLORS[index] }}
          />
          <span className="whitespace-nowrap">{item.name}</span>
        </Flex>
      ))}
    </Flex>
  );
}
