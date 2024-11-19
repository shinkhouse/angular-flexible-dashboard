import { GridsterItem } from 'angular-gridster2';

export interface DashboardWidget extends GridsterItem {
    id: string;
    type: string;
    title: string;
    content?: any;
}

export interface DashboardLayout {
    name: string;
    layout: DashboardWidget[];
}

export const mockDashboardLayout: DashboardLayout[] = [
    {
        name: 'Sales Dashboard',
        layout: [
            {
                id: 'widget1',
                type: 'chart',
                title: 'Monthly Revenue',
                cols: 4,
                rows: 3,
                x: 0,
                y: 0,
                content: {
                    chartType: 'line',
                    dataSource: 'revenue_metrics',
                    refreshInterval: 300000,
                    data: [
                        {
                            name: 'Revenue',
                            series: [
                                { name: 'January', value: 8000 },
                                { name: 'February', value: 9000 },
                                { name: 'March', value: 8500 },
                                { name: 'April', value: 9500 },
                                { name: 'May', value: 10000 },
                                { name: 'June', value: 11000 },
                                { name: 'July', value: 10500 },
                                { name: 'August', value: 9500 },
                                { name: 'September', value: 9000 },
                                { name: 'October', value: 8500 },
                                { name: 'November', value: 9500 },
                                { name: 'December', value: 10000 },
                            ],
                        },
                    ],
                },
            },
            {
                id: 'widget2',
                type: 'metric',
                title: 'Profit Goals',
                cols: 2,
                rows: 2,
                x: 4,
                y: 0,
                content: {
                    chartType: 'metric',
                    metrics: ['goal', 'achieved', 'remaining'],
                    data: {
                        goal: 120000,
                        achieved: 95000,
                        remaining: 25000,
                    },
                },
            },
            {
                id: 'widget3',
                type: 'chart',
                title: 'Top Products by Revenue',
                cols: 4,
                rows: 3,
                x: 6,
                y: 0,
                content: {
                    chartType: 'bar',
                    dataSource: 'top_products',
                    refreshInterval: 600000,
                    data: [
                        { name: '8oz Glass', value: 20000 },
                        { name: '12oz Glass', value: 15000 },
                        { name: '16oz Glass', value: 18000 },
                        { name: 'Topo Planter', value: 12000 },
                        { name: 'Small Bowl', value: 10000 },
                    ],
                },
            },
            {
                id: 'widget4',
                type: 'metric',
                title: 'Sales Conversion Rate',
                cols: 2,
                rows: 2,
                x: 0,
                y: 3,
                content: {
                    chartType: 'metric',
                    metrics: ['leads', 'conversions', 'conversionRate'],
                    data: {
                        leads: 300,
                        conversions: 75,
                        conversionRate: 25, // percentage
                    },
                },
            },
            {
                id: 'widget5',
                type: 'chart',
                title: 'Quarterly Profit',
                cols: 4,
                rows: 3,
                x: 2,
                y: 3,
                content: {
                    chartType: 'pie',
                    dataSource: 'quarterly_profit',
                    refreshInterval: 900000,
                    data: [
                        { name: 'Q1', value: 25000 },
                        { name: 'Q2', value: 30000 },
                        { name: 'Q3', value: 20000 },
                        { name: 'Q4', value: 25000 },
                    ],
                },
            },
            {
                id: 'widget6',
                type: 'metric',
                title: 'Customer Satisfaction',
                cols: 2,
                rows: 2,
                x: 6,
                y: 3,
                content: {
                    chartType: 'metric',
                    metrics: ['satisfied', 'neutral', 'dissatisfied'],
                    data: {
                        satisfied: 85,
                        neutral: 10,
                        dissatisfied: 5,
                    },
                },
            },
            {
                id: 'widget7',
                type: 'chart',
                title: 'Sales by Region',
                cols: 4,
                rows: 3,
                x: 8,
                y: 3,
                content: {
                    chartType: 'gauge',
                    dataSource: 'regional_sales',
                    refreshInterval: 1800000,
                    data: [
                        { name: 'North', value: 30000 },
                        { name: 'South', value: 25000 },
                        { name: 'East', value: 20000 },
                        { name: 'West', value: 25000 },
                    ],
                },
            },
            {
                id: 'widget8',
                type: 'chart',
                title: 'Revenue by Product Category',
                cols: 4,
                rows: 3,
                x: 0,
                y: 6,
                content: {
                    chartType: 'advanced-pie',
                    dataSource: 'product_category_revenue',
                    refreshInterval: 1200000,
                    data: [
                        { name: 'Drinkware', value: 60000 },
                        { name: 'Planters', value: 20000 },
                        { name: 'Bowls', value: 20000 },
                    ],
                },
            },
            {
                id: 'widget9',
                type: 'metric',
                title: 'Average Order Value',
                cols: 2,
                rows: 2,
                x: 4,
                y: 6,
                content: {
                    chartType: 'metric',
                    metrics: ['averageOrderValue'],
                    data: {
                        averageOrderValue: 50, // dollars
                    },
                },
            },
            {
                id: 'widget10',
                type: 'chart',
                title: 'Monthly Orders',
                cols: 4,
                rows: 3,
                x: 6,
                y: 6,
                content: {
                    chartType: 'line',
                    dataSource: 'monthly_orders',
                    refreshInterval: 300000,
                    data: [
                        {
                            name: 'Orders',
                            series: [
                                { name: 'January', value: 160 },
                                { name: 'February', value: 180 },
                                { name: 'March', value: 170 },
                                { name: 'April', value: 190 },
                                { name: 'May', value: 200 },
                                { name: 'June', value: 220 },
                                { name: 'July', value: 210 },
                                { name: 'August', value: 190 },
                                { name: 'September', value: 180 },
                                { name: 'October', value: 170 },
                                { name: 'November', value: 190 },
                                { name: 'December', value: 200 },
                            ],
                        },
                    ],
                },
            },
            {
                id: 'widget11',
                type: 'metric',
                title: 'Customer Retention Rate',
                cols: 2,
                rows: 2,
                x: 0,
                y: 9,
                content: {
                    chartType: 'metric',
                    metrics: ['retentionRate'],
                    data: {
                        retentionRate: 70, // percentage
                    },
                },
            },
            {
                id: 'widget12',
                type: 'chart',
                title: 'Top Customers by Revenue',
                cols: 4,
                rows: 3,
                x: 2,
                y: 9,
                content: {
                    chartType: 'bar',
                    dataSource: 'top_customers',
                    refreshInterval: 600000,
                    data: [
                        { name: 'Sarah Johnson', value: 895 },
                        { name: 'Michael Rodriguez', value: 742 },
                        { name: 'Emma Thompson', value: 678 },
                        { name: 'David Chen', value: 523 },
                        { name: 'Rachel Sullivan', value: 489 },
                    ],
                },
            },
            {
                id: 'widget13',
                type: 'metric',
                title: 'New vs Returning Customers',
                cols: 2,
                rows: 2,
                x: 6,
                y: 9,
                content: {
                    chartType: 'metric',
                    metrics: ['newCustomers', 'returningCustomers'],
                    data: {
                        newCustomers: 47,
                        returningCustomers: 32,
                    },
                },
            },
            {
                id: 'widget14',
                type: 'chart',
                title: 'Sales by Product Size',
                cols: 4,
                rows: 3,
                x: 8,
                y: 9,
                content: {
                    chartType: 'pie',
                    dataSource: 'product_size_sales',
                    refreshInterval: 1500000,
                    data: [
                        { name: '8oz', value: 456 },
                        { name: '12oz', value: 623 },
                        { name: '16oz', value: 789 },
                        { name: 'Flat', value: 234 },
                        { name: 'Small Bowl', value: 345 },
                        { name: '1.5oz', value: 167 },
                        { name: 'Topo Planter', value: 432 },
                        { name: 'Topo 12oz', value: 567 },
                    ],
                },
            },
            {
                id: 'widget15',
                type: 'metric',
                title: 'Average Lead Response Time',
                cols: 2,
                rows: 2,
                x: 0,
                y: 12,
                content: {
                    chartType: 'metric',
                    metrics: ['leadResponseTime'],
                    data: {
                        leadResponseTime: 2.5, // hours
                    },
                },
            },
        ],
    },
];
