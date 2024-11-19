import { CommonModule, JsonPipe, NgFor, NgForOf, NgIf, NgSwitch } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CompactType, GridsterConfig, GridsterConfigService, GridsterItem, GridsterModule, GridType } from 'angular-gridster2';
import { DashboardLayout, mockDashboardLayout } from './mock-data';
import { BarChartModule, Color, GaugeModule, NgxChartsModule, PieChartModule, ScaleType } from '@swimlane/ngx-charts';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MetricsComponent } from './metrics/metrics.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { CreateNewDashboardComponent } from './create-new-dashboard/create-new-dashboard.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

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
    MatIconModule,
    MatMenuModule,
    MatSelectModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  options: any;
  layouts: DashboardLayout[] = mockDashboardLayout;
  currentLayout: DashboardLayout = this.layouts[0];
  showDebug = false; // Set to false in production
  lastChanged: any = null;
  customColorScheme: Color = {
    domain: [
      '#4CAF50', // Green 500
      '#81C784', // Green 300
      '#388E3C', // Green 700
      '#C8E6C9', // Green 100
      '#1B5E20', // Green 900
      '#66BB6A', // Green 400
      '#A5D6A7', // Green 200
      '#43A047', // Green 600
      '#2E7D32', // Green 800
      '#E8F5E9'  // Green 50
    ],
    name: '',
    selectable: false,
    group: ScaleType.Linear,
  };
  private saveTimeout: any;

  constructor(private dialog: MatDialog) {
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
      }
    };
  }

  initializeWidgets() {
    // Try to load saved layouts first
    const savedLayouts = localStorage.getItem('dashboardLayouts');
    if (savedLayouts) {
      this.layouts = JSON.parse(savedLayouts);
      this.currentLayout = this.layouts[0];
    } else {
      // Fall back to mock data if no saved layouts
      this.layouts = mockDashboardLayout;
      this.currentLayout = this.layouts[0];
    }
  }

  onDragEnd(event: any, widget: GridsterItem) {
    console.log('Widget position:', {
      x: widget.x,
      y: widget.y
    });
    this.saveLayout();
  }

  saveLayout() {
    // Debounce the save to avoid too many saves during drag
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
    }
    
    this.saveTimeout = setTimeout(() => {
      const layoutToSave = this.layouts.map(layout => ({
        ...layout,
        layout: layout.layout.map(widget => ({
          ...widget,
          x: widget.x,
          y: widget.y,
          cols: widget.cols,
          rows: widget.rows
        }))
      }));
      
      localStorage.setItem('dashboardLayouts', JSON.stringify(layoutToSave));
      console.log('Layouts saved:', layoutToSave);
    }, 500);
  }

  getYScaleMin(data: any[]): number {
    if (!data || data.length === 0) {
      return 0;
    }

    let min = Number.MAX_VALUE;
    data.forEach(item => {
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
    const height = widget.rows * 90;
    return [width, height];
  }

  getMetrics(metricNames: string[], data: any): { name: string; value: number }[] {
    return metricNames.map(name => ({
      name,
      value: data[name]
    }));
  }

  switchLayout(layoutName: string) {
    const layout = this.layouts.find(l => l.name === layoutName);
    if (layout) {
      this.currentLayout = layout;
    }
  }

  openCreateDashboardDialog() {
    const dialogRef = this.dialog.open(CreateNewDashboardComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.createNewDashboard(result.dashboardName);
      }
    });
  }

  createNewDashboard(dashboardName: string) {
    const newDashboard: DashboardLayout = {
      name: dashboardName,
      layout: [] // Start with an empty layout
    };
    this.layouts.push(newDashboard);
    this.switchLayout(dashboardName);
    this.saveLayout();
  }
}
