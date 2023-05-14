import { Component } from '@angular/core';
import { Budget } from 'src/app/interfaces/buget.interface';
import { BudgetService } from 'src/app/services/budget.service';
// import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'history-budget',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {

  showBudgetHistory = false;

  showBudgetList() {
    this.showBudgetHistory = !this.showBudgetHistory;
  }

  public budgetList: Budget[] = [];
  public searchText: string = "";
  public currentOrder = this.sortById;
  public text_search: any = '';

  constructor(

    private budgetService: BudgetService

  ) {
    this.budgetList = this.budgetService.budgetList
  }

  closeBudgetList() {
    this.showBudgetHistory = false;
  }


  sortById() {
    this.currentOrder = this.sortById;
    this.budgetList = this.budgetList.sort((a: Budget, b: Budget) => {
      return a.id - b.id
    })
  }

  sortByClient() {
    this.currentOrder = this.sortByClient;
    this.budgetList = this.budgetList.sort((a: Budget, b: Budget) => {
      if (a.clientName > b.clientName) return 1;
      if (a.clientName < b.clientName) return -1;
      return 0;
    })
  }

  sortByBudget() {
    this.currentOrder = this.sortByBudget;
    this.budgetList = this.budgetList.sort((a: Budget, b: Budget) => {
      if (a.budgetName > b.budgetName) return 1;
      if (a.budgetName < b.budgetName) return -1;
      return 0;
    })
  }

  // resetBudgetList() {

  //   this.budgetList = this.budgetService.budgetList
  //   this.sortById()

  // }

  sortByDate() {
    this.currentOrder = this.sortByDate;
    this.budgetList = this.budgetList.sort((a: Budget, b: Budget) => {
      if ((a.date && b.date) && a.date > b.date) return 1;
      if ((a.date && b.date) && a.date < b.date) return -1;
      return 0;
    })
  }

  sortByTotal() {
    this.currentOrder = this.sortByTotal;
    this.budgetList = this.budgetList.sort((a: Budget, b: Budget) => {
      if ((a.total && b.total) && a.total > b.total) return 1;
      if ((a.total && b.total) && a.total < b.total) return -1;
      return 0;
    })
  }

  deleteBudget(index: number) {
    this.budgetList.splice(index, 1);
    localStorage.setItem('budgetList', JSON.stringify(this.budgetList));
  }

  searchByBudgetName(searchText: string) {

    this.budgetList = this.budgetService.budgetList
    this.budgetList = this.budgetList.filter((bg) => {
      return bg.budgetName.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
    })
    this.currentOrder();
  }
}