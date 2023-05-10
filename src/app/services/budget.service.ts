import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Budget } from 'src/app/interfaces/buget.interface';

@Injectable({
    providedIn: 'root'
})

export class BudgetService {

    public showPanel = false

    private webPrice: number = 500
    private seoPrice: number = 300
    private adsPrice: number = 200
    private extrasPrice: number = 30

    public quantityPages: number = 0
    public quantityLang: number = 0
    public quantityWeb: number = 0
    public quantitySeo: number = 0
    public quantityAds: number = 0

    public clientName: string = ''
    public budgetName: string = ''

    public total: number = 0

    public showBudgetList: boolean = false

    /*   public sortColumn: string = ''
      public sortDirection: string = 'asc' */

    public budgetList: Budget[] = []

    constructor() {

        this.budgetList = localStorage.getItem('budgetList') ? JSON.parse(localStorage.getItem('budgetList')!) : []

    }

    totalResult() {

        this.total = 0;

        this.total += this.quantityWeb * this.webPrice
        this.total += this.quantitySeo * this.seoPrice
        this.total += this.quantityAds * this.adsPrice
        this.total += this.quantityPages * this.quantityLang * this.extrasPrice

        return this.total

    }

    saveDataBudget(budgetDataForm: FormGroup) {

        let budget: Budget = {

            id: this.generateUniqueId(),
            web: this.webPrice,
            pages: this.quantityPages,
            languages: this.quantityLang,

            seo: this.seoPrice,
            ads: this.adsPrice,

            date: new Date(),

            clientName: budgetDataForm.value.clientName,
            budgetName: budgetDataForm.value.budgetName

        }

        if (budgetDataForm.invalid) {

            budgetDataForm.markAllAsTouched();
            return;

        }

        budget.total = this.totalResult()

        this.budgetList.push(budget);

        localStorage.setItem('budgetList', JSON.stringify(this.budgetList)) //Almacenar lista de presus convertida a String.

        console.log(this.budgetList);

    }

    generateUniqueId() {

        let id = 1;

        if (this.budgetList.length > 0) {


            const ids = this.budgetList.map(budget => (budget.id));
            const maxId = Math.max(...ids);
            id = maxId + 1;

            while (ids.includes(id)) {
                id++;
            }
        }

        return id;
    }

}