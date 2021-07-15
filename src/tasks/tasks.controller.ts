import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task, TaskStatus } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    getTasks(
        @Query() filterDto: GetTaskFilterDto
    ): Task[] {
        if(Object.keys(filterDto).length > 0) {
            return this.tasksService.getTasksWithFilters(filterDto)
        }
        return this.tasksService.getAllTasks();
    }

    @Get('/:id') 
    getTaskById( @Param('id') id: string): Task {
        return this.tasksService.getTaskById(id)
    }


    @Post()
    createTask( @Body() createTaskDto: CreateTaskDto ): Task{
        return this.tasksService.createTask(createTaskDto);
    }

    @Patch('/:id')
    updateTaskStatus( @Param('id') id: string, @Body() updateTaskStatusDto: UpdateTaskStatusDto ): Task[] {
        const { status } = updateTaskStatusDto;
        return this.tasksService.updateTaskStatus(status, id)
    }

    @Delete('/:id')
    deleteTask( @Param('id') id: string ) {
        return this.tasksService.deleteTask(id)
    }

}
