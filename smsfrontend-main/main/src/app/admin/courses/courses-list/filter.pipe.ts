import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchQuery: string): any[] {
    if (!searchQuery) {
      return items; // Return all items if no search query is provided
    }
    searchQuery = searchQuery.toLowerCase(); // Convert search query to lowercase for case-insensitive matching

    return items.filter(item => {
      // Filter the items based on the courseName property
      return item.courseName.toLowerCase().includes(searchQuery);
    });
  }
}
