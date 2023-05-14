import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { BudgetService } from '../services/budget.service';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Budget } from '../interfaces/buget.interface';

@Component({
  selector: 'home-budget-app',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public budgetForm!: FormGroup
  public total = 0

  public budgetDataForm: FormGroup = this.fb.group({
    clientName: ['', [Validators.required, Validators.minLength(3)]],
    budgetName: ['', [Validators.required, Validators.minLength(3)]]
  })

  get showPanel() {
    return this.budgetService.showPanel
  }

  set showPanel(value: any) {
    this.budgetService.showPanel = value
  }

  constructor(
    private router: Router,
    public budgetService: BudgetService,
    private fb: FormBuilder
  ) { }

  invalidField(clientName: string) {
    return this.budgetDataForm.controls[clientName].errors && this.budgetDataForm.controls[clientName].touched
  }

  ngOnInit(): void {
    this.router.getCurrentNavigation();
  }

  showBudgetList = () => {
    this.budgetService.showBudgetList = !this.budgetService.showBudgetList
    console.log(this.showBudgetList)
  }

  webCheck = (event: Event) => {
    const checkButton = event.target as HTMLInputElement;
    this.showPanel = checkButton.checked;
    this.budgetService.quantityWeb = checkButton.checked ? 1 : 0;
    this.budgetService.quantityPages = checkButton.checked ? 1 : 0;
    this.budgetService.quantityLang = checkButton.checked ? 1 : 0;
    this.totalResult();
    this.deleteError();
  };

  seoCheck = (event: Event) => {
    const checkButton = event.target as HTMLInputElement;
    this.budgetService.quantitySeo = checkButton.checked ? 1 : 0;
    this.totalResult();
    this.deleteError();
  };

  adsCheck = (event: Event) => {
    const checkButton = event.target as HTMLInputElement;
    this.budgetService.quantityAds = checkButton.checked ? 1 : 0;
    this.totalResult();
    this.deleteError();
  };

  saveQuantity = (pageLangQuantity: Budget) => {
    this.budgetService.quantityPages = pageLangQuantity.pages;
    this.budgetService.quantityLang = pageLangQuantity.languages;
    this.totalResult();
  };

  saveClientName = (event: Event) => {
    const checkButton = event.target as HTMLInputElement;
    this.budgetService.quantityAds = checkButton.checked ? 1 : 0;
    this.totalResult();
  };

  totalResult = () => {
    this.total = this.budgetService.totalResult();
  };

  saveDataBudget() {
    if (this.total != 0) {
      this.budgetService.saveDataBudget(this.budgetDataForm);
      this.budgetService.showPanel = false;
      this.resetForm()
    } else {
      const checkboxList = document.querySelectorAll('input[type=checkbox]');
      for (let i = 0; i < checkboxList.length; i++) {
        let checkbox = checkboxList[i] as HTMLInputElement;
        checkbox.classList.add('error');
      }
    }
  }

  resetForm() {
    this.budgetDataForm.reset();
    const checkboxes = document.querySelectorAll('input[type=checkbox]');
    checkboxes.forEach((checkbox) => {
      (checkbox as HTMLInputElement).checked = false;
    });
    this.budgetService.quantityWeb = 0;
    this.budgetService.quantityPages = 0;
    this.budgetService.quantityLang = 0;
    this.totalResult()
  }

  deleteError() {
    const checkboxList = document.querySelectorAll('.budgetCheckbox .error');

    for (let i = 0; i < checkboxList.length; i++) {
      let checkbox = checkboxList[i] as HTMLInputElement;
      checkbox.classList.remove('error')
    }
  }
}
