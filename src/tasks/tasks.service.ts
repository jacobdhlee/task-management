import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid'
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TasksController } from './tasks.controller';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTasksWithFilters(filter: GetTaskFilterDto): Task[] {
        const { status, search } = filter;
        let tasks = this.tasks;
        if(status) {
            tasks = tasks.filter(task => task.status === status);
        }
        if(search) {
            tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search))
        }
        return tasks;
    }

    getTaskById(id: string): Task {
        return this.tasks.find(task => task.id === id);
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto;
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        }
        this.tasks.push(task);
    
        return task;
    }

    updateTaskStatus(status: TaskStatus, id: string): Task[] {
        let index = this.tasks.findIndex(task => task.id === id);
        let task = this.tasks[index];
        task.status = status;
        this.tasks.splice(index, 1, task);

        return this.tasks;

    }

    deleteTask(id: string): void {
        this.tasks = this.tasks.filter(task => task.id !== id)
    }
}
