import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-create-new-dashboard',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, MatIconModule, MatButtonModule, MatInputModule, MatDialogModule],
    templateUrl: './create-new-dashboard.component.html',
    styleUrls: ['./create-new-dashboard.component.scss'],
})
export class CreateNewDashboardComponent {
    dashboardForm: FormGroup;

    constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<CreateNewDashboardComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
        this.dashboardForm = this.fb.group({
            dashboardName: ['', Validators.required],
        });
    }

    onSubmit() {
        if (this.dashboardForm.valid) {
            this.dialogRef.close(this.dashboardForm.value);
        }
    }
}
