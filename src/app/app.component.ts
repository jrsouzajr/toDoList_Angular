import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToDo } from './to-do';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'to-do-list';

  inputToDo = new FormControl('', [Validators.required])

  toDoList: ToDo[] = []
  randomIdToDoList: number = 1;
  idItemEditing: number = 0;


  getErrorMessage() {
    if(this.inputToDo.hasError('required')){
      return 'You must type something'
    } else return;
  }

  addToList() {
    if(this.idItemEditing != 0) {
      this.toDoList.find(item => {
        if(item.id == this.idItemEditing) {
          item.text = this.inputToDo.value ? this.inputToDo.value : ''
        }
      })
      this.clearInput()
      return
    }
    let toDoItem: ToDo = { id: (this.randomIdToDoList = this.randomIdToDoList + 1), text: this.inputToDo.value ? this.inputToDo.value : '', status: false }
    this.toDoList.push(toDoItem);

    this.clearInput()
  }

  removeFromList(idElement: number) {
    this.toDoList = this.toDoList.filter(item => {
      return item.id != idElement;
    })
  }

  editFromList(idElement: number) {
    this.toDoList.find(item => {
      if (item.id == idElement) {
        this.idItemEditing = item.id;
        this.inputToDo.setValue(item.text)
      }
      return;
    })
  }

  finishFromList(idElement: number) {
    this.toDoList.find(item => {
      if(item.id == idElement) {
        item.status = !item.status
      }
      return
    })
  }

  clearInput() {
    this.inputToDo.reset();
    this.idItemEditing = 0;
  }
}
