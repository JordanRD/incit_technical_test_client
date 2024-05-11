import { create } from "zustand";

import { UserDashboard, UserDashboardStatistic } from "../../../../types/User";
import Repositories from "../../../../repositories/repositories";

type DashboardState = {
    dashboardUsers: UserDashboard[];
    dashboardStatistic: UserDashboardStatistic;
    getUserDashboard: () => Promise<void>;
    reset: () => void;
};

export const useDashboardState = create<DashboardState>((set) => {
    const initialValue = {
        dashboardUsers: [],
        dashboardStatistic: {
            todaysUsersCount: 0,
            averageUsersLast7Days: 0,
            usersCount: 0,
        },
    };
    return {
        ...initialValue,
        getUserDashboard: async () => {
            const dashboardData =
                await Repositories.userRepository.getUserDashboard();
            set({
                dashboardUsers:
                    dashboardData.users || initialValue.dashboardUsers,
                dashboardStatistic:
                    dashboardData.statistic || initialValue.dashboardStatistic,
            });
        },
        reset: () => {
            set({ ...initialValue });
        },
    };
});
