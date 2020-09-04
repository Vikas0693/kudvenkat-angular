import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'noPhone'
})
export class EmployeeTitlePipe implements PipeTransform{
    transform(value: any, ...args: any[]) {
        if(value === '')
            return "---------";
        else 
            return value;
    }

}