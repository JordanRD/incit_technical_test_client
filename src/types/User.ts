export type CurrentUser = {
    id: number;
    email: string;
    name: string;
    verified: boolean;
    hasPassword:boolean
};
export type UserDashboard = {
    id: number;
    email: string;
    name: string;
    logout_at: string;
    login_count: string;
    created_at: string;
};
export type UserDashboardStatistic = {
    todaysUsersCount: number;
    averageUsersLast7Days: number;
    usersCount: number;
};

export type UpdateUserInput = {
    name: string;
};
