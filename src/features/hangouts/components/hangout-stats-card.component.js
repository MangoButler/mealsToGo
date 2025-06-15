import React from "react";
import { Card, Divider } from "react-native-paper";
import styled from "styled-components/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { PieChart } from "react-native-svg-charts";
import { Dimensions, View } from "react-native";
import { theme } from "../../../infrastructure/theme";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { safeSuccessRate } from "../../../utils/transformations";

const { height: screenHeight } = Dimensions.get("window");

const StyledCard = styled(Card)`
  margin: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

const CardContent = styled(Card.Content)`
  padding: ${(props) => props.theme.space[3]};
`;

const StatsRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${(props) => props.theme.space[2]};
`;

const LabelContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const StatLabel = styled(Text)`
  margin-left: ${(props) => props.theme.space[2]};
`;

const ChartContainer = styled.View`
  height: ${screenHeight * 0.2}px;
  width: 100%;
  align-self: center;
  /* align-items: center; */
  /* justify-content: center; */
  margin-top: ${(props) => props.theme.space[3]};
`;

const ChartNote = styled(Text)`
  text-align: center;
  margin-top: ${(props) => props.theme.space[3]};
`;

const CardTitle = styled(Text)`
  margin-top: ${(props) => props.theme.space[3]};
`;

const getIcon = (status) => {
  switch (status) {
    case "active":
      return "account-group";
    case "scheduled":
      return "calendar-clock";
    case "completed":
      return "check-circle-outline";
    case "cancelled":
      return "cancel";
    case "noShow":
      return "alert-circle-outline";
    default:
      return "information";
  }
};

const statusColors = {
  active: theme.colors.ui.success,
  scheduled: theme.colors.ui.secondary,
  completed: theme.colors.ui.primary,
  cancelled: theme.colors.ui.warning,
  noShow: theme.colors.ui.error,
};

export const HangoutStatsCard = ({
  stats,
  statsHint = "of scheduled users actually came",
  title = "Visit Statistics",
}) => {
  if (!stats) return null;

  const pieData = [
    {
      key: 1,
      value: stats.cancelled,
      svg: { fill: statusColors.cancelled },
      label: "Cancelled",
    },
    {
      key: 2,
      value: stats.noShow,
      svg: { fill: statusColors.noShow },
      label: "No Show",
    },
    {
      key: 3,
      value: stats.total - stats.cancelled - stats.noShow - stats.scheduled,
      svg: { fill: theme.colors.ui.success }, // blue for others
      label: "Attended/Scheduled",
    },
  ].filter((item) => item.value > 0);

  const showChart =
    stats.completed > 0 || stats.cancelled > 0 || stats.noShow > 0;

  return (
    <StyledCard>
      <CardTitle variant="labelCentered">{title}</CardTitle>
      <CardContent>
        {Object.keys(stats).map((key) => {
          if (key === "total") return null;
          return (
            <StatsRow key={key}>
              <LabelContainer>
                <MaterialCommunityIcons
                  name={getIcon(key)}
                  size={20}
                  color={statusColors[key] || "#757575"}
                />
                <StatLabel variant="body">
                  {key}: {stats[key]}
                </StatLabel>
              </LabelContainer>
              <Divider bold />
            </StatsRow>
          );
        })}

        {showChart && (
          <>
            <CardTitle variant="centeredInfoBold">Visit Outcomes</CardTitle>
            <ChartContainer>
              <PieChart
                style={{ height: screenHeight * 0.165 }}
                data={pieData}
              />
              <ChartNote variant="captionCentered">
                {safeSuccessRate(
                  stats.total,
                  stats.scheduled,
                  stats.cancelled,
                  stats.noShow
                )}
                % {statsHint}
              </ChartNote>
            </ChartContainer>
          </>
        )}
      </CardContent>
    </StyledCard>
  );
};
