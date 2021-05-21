import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'kanban-board',
  templateUrl: './kanbanBoard.component.html',
  styleUrls: ['./kanbanBoard.component.scss']
})
export class KanbanBoard implements OnInit {
  tasks: Task[];
  stagesNames: string[];
  stagesTasks: any[]; //Only used for rendering purpose
  taskName:string;

  ngOnInit() {
    // Each task is uniquely identified by its name. 
    // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.
    this.tasks = [
      { name: '0', stage: 0 },
      { name: '1', stage: 0 },
    ];
    this.stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
    this.configureTasksForRendering();
  }
  
  // this function has to be called whenever tasks array is changed to construct stagesTasks for rendering purpose
  configureTasksForRendering = () => {
    this.stagesTasks = [];
    for (let i = 0; i < this.stagesNames.length; ++i) {
      this.stagesTasks.push([]);
    }
    for (let task of this.tasks) {
      const stageId = task.stage;
      this.stagesTasks[stageId].push(task);
    }
  }

  generateTestId = (name) => {
    return name.split(' ').join('-');
  }
  
  addTask(value){
    if(value==null) return;
    if(this.tasks.map((e) => e.name).includes(value)){
      this.taskName = null;
      return;
    } 
    let temp:Task = {name:value,stage:0};
    this.tasks.push(temp);
    this.configureTasksForRendering();
    this.taskName = null;
  }

  moveTask(name:string, direction:string ){
    let pos = this.tasks.map((e) => e.name).indexOf(name);
    switch(direction){
      case'r':
        this.tasks[pos].stage = this.tasks[pos].stage + 1;
        break;
      case 'l':
        this.tasks[pos].stage = this.tasks[pos].stage - 1;
        break;  
    } 
    this.configureTasksForRendering();
  }

  deleteTask(name:string){
    let pos = this.tasks.map((e) => e.name).indexOf(name);
    this.tasks.splice(pos,1);
    this.configureTasksForRendering();
  }
}

interface Task { 
  name: string;
  stage: number;
}