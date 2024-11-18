import { CommonModule, JsonPipe, NgFor, NgForOf, NgIf, NgSwitch } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CompactType, GridsterConfig, GridsterConfigService, GridsterItem, GridsterModule, GridType } from 'angular-gridster2';
import { mockDashboardLayout } from './mock-data';
import { BarChartModule, Color, GaugeModule, NgxChartsModule, PieChartModule, ScaleType } from '@swimlane/ngx-charts';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MetricsComponent } from './metrics/metrics.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

interface DashboardWidget extends GridsterItem {
    id: string;
    type: string;
    title: string;
    content?: any;
}

@Component({
    selector: 'app-root',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        RouterOutlet,
        GridsterModule,
        NgSwitch,
        NgForOf,
        NgFor,
        JsonPipe,
        NgIf,
        NgxChartsModule,
        BarChartModule,
        PieChartModule,
        MatToolbarModule,
        GaugeModule,
        MetricsComponent,
        MatButtonModule,
        MatCardModule,
        MatIconModule
    ],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    options: any;
    widgets: Array<any> = mockDashboardLayout;
    showDebug = false; // Set to false in production
    lastChanged: any = null;
    customColorScheme: Color = {
        domain: [
            '#2196F3', // Blue 500
            '#64B5F6', // Blue 300
            '#1976D2', // Blue 700
            '#BBDEFB', // Blue 100
            '#0D47A1', // Blue 900
            '#42A5F5', // Blue 400
            '#90CAF9', // Blue 200
            '#1E88E5', // Blue 600
            '#1565C0', // Blue 800
            '#E3F2FD', // Blue 50
        ],
        name: '',
        selectable: false,
        group: ScaleType.Linear,
    };
    private saveTimeout: any;

    constructor() {
        this.initializeWidgets();
    }

    ngOnInit() {
        this.initializeGridsterOptions();
    }

    initializeGridsterOptions() {
        this.options = {
            gridType: GridType.VerticalFixed, // Fits the items to the screen
            displayGrid: 'onDrag&Resize', // Shows the grid lines
            pushItems: true, // Push items out of the way when dragging
            draggable: {
                enabled: true, // Enable dragging
                ignoreContent: true, // Allows clicking inside widgets without starting drag
                dropOverItems: true, // Allows dropping over other items
                dragHandleClass: 'drag-handle', // Only drag from header
                delayStart: 0, // No delay on drag start
            },
            resizable: {
                enabled: true,
            },
            minCols: 12, // Minimum number of columns
            maxCols: 12, // Maximum number of columns
            minRows: 500, // Minimum number of rows
            margin: 16, // Margin between items
            outerMargin: true, // Margin around the grid
            compactType: CompactType.None, // Don't auto-compact items
            maxRows: 500,
            fixedRowHeight: 112, // Fixed row height

            // Called when any item is changed (dragged, resized, etc)
            itemChangeCallback: (item: GridsterItem) => {
                this.lastChanged = item;
                this.saveLayout();
            },

            // Called when dragging starts
            dragStartCallback: (item: GridsterItem) => {
                console.log('Started dragging:', item);
            },

            // Called when dragging ends
            dragEndCallback: (item: GridsterItem) => {
                console.log('Finished dragging:', item);
                this.saveLayout();
            },
        };
    }

    initializeWidgets() {
        // Try to load saved layout first
        const savedLayout = localStorage.getItem('dashboardLayout');
        if (savedLayout) {
            this.widgets = JSON.parse(savedLayout);
        } else {
            // Fall back to mock data if no saved layout
            this.widgets = mockDashboardLayout;
        }
    }

    onDragEnd(event: any, widget: GridsterItem) {
        console.log('Widget position:', {
            x: widget.x,
            y: widget.y,
        });
        this.saveLayout();
    }

    getYScaleMin(data: any[]): number {
        if (!data || data.length === 0) {
            return 0;
        }

        let min = Number.MAX_VALUE;
        data.forEach((item) => {
            if (item.series) {
                item.series.forEach((seriesItem: any) => {
                    if (seriesItem.value < min) {
                        min = seriesItem.value;
                    }
                });
            } else if (item.value < min) {
                min = item.value;
            }
        });

        return min;
    }

    getViewDimensions(widget: any): [number, number] {
        const headerHeight = 44; // Height of the widget-header in pixels
        const width = widget.cols * 140; // Adjust the multiplier as needed
        const height = widget.rows * 90; // Subtract the header height
        return [width, height];
    }

    saveLayout() {
        // Debounce the save to avoid too many saves during drag
        if (this.saveTimeout) {
            clearTimeout(this.saveTimeout);
        }

        this.saveTimeout = setTimeout(() => {
            const layoutToSave = this.widgets.map((widget) => ({
                ...widget,
                x: widget.x,
                y: widget.y,
                cols: widget.cols,
                rows: widget.rows,
            }));

            localStorage.setItem('dashboardLayout', JSON.stringify(layoutToSave));
            console.log('Layout saved:', layoutToSave);
        }, 500);
    }

    getMetrics(metricNames: string[], data: any): { name: string; value: number }[] {
        return metricNames.map((name) => ({
            name,
            value: data[name],
        }));
    }
}
