import { Component, EventEmitter, Output, OnInit } from '@angular/core';

import { Budget } from 'src/app/interfaces/buget.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BudgetService } from '../../services/budget.service';


@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  isCollapsed: boolean = true;

  webCheck(event: any) {
    this.isCollapsed = !this.isCollapsed;
  }


  @Output() pagesAndLangQuantityEmitter = new EventEmitter<Budget>;

  constructor(

    private fb: FormBuilder,
    private budgetService: BudgetService

  ) { }

  ngOnInit(): void {

    const total = this.budgetService.totalResult()

    this.budgetForm.valueChanges.subscribe(form => this.pagesAndLangQuantityEmitter.emit(form));

  }

  calculateAddAndSubtract(inputPagLang: string, add: boolean = false, increment: number = 1): void {
    const valueControl = this.budgetForm.get(inputPagLang);

    if (valueControl) {
      const newValue = add ? valueControl.value + increment : Math.max(valueControl.value - increment, 1);
      valueControl.patchValue(newValue);
    }

  }

  public budgetForm: FormGroup = this.fb.group({

    pages: [1, [Validators.required, Validators.min(1)]],
    languages: [1, [Validators.required, Validators.min(1)]]

  })

}