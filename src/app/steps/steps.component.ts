import { Component, OnInit } from '@angular/core';
import { Step } from '../services/models/Step';
import { AppRepositoryService } from '../services/apprepository.service';
import * as moment from 'moment';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsComponent implements OnInit {
  step: Step;
  steps: Step[];
  stepsSelected: Step[];

  constructor(public appRepository: AppRepositoryService) {
    this.step = new Step();
   }

  ngOnInit() {
   this.onGetSteps();
  }

  onRowSelected(data) {
    //console.log('on row selected event: ', event);
    //console.log('stepsSelected is: ', this.stepsSelected[0]);
    this.step.actionDate =  moment(this.stepsSelected[0].actionDate).format('MM/DD/YYYY');
    //this.step.actionDate = this.stepsSelected[0].actionDate;
    this.step.stepCount = this.stepsSelected[0].stepCount;
    this.step.calories = this.stepsSelected[0].calories;
    this.step.rating = this.stepsSelected[0].rating;
    this.step.id = this.stepsSelected[0].id;
    //console.log('step is: ', this.step);
  }

  onGetSteps() {
    this.appRepository.doGetStepsByUserId().subscribe((data: Step[]) => {
      //console.log('stepsdto list from server: ', data);
      this.steps = data;
      for (let i = 0; i < this.steps.length; i++) {
        this.steps[i].actionDate = moment(this.steps[i].actionDate).format('MM/DD/YYYY');
    }
    this.onNew();
      //console.log('steps list from server: ', this.steps);
    }, error => {
      console.log(error);
    });
  }

  onNew() {
    this.step = new Step();
    this.step.actionDate = moment().toDate();
  }

  onAdd() {
    this.step.userId = this.appRepository.activeUserId;
    console.log('step in add() ', this.step);
    this.appRepository.doPostSteps(this.step, 'steps/l1/do').subscribe((data: Step) => {
        console.log('step saved: ', data);
    });
  }

  onDelete() {
    this.appRepository.doDeleteStep(this.step.id).subscribe((data: any) => {
       console.log('deleted step', data);
      });
  }

  }
