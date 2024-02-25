import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  searchText: string = '';
  searchBoxClass: string = '';
  searchResultList: any = [];
  originalProjectsList: [] = [];
  highlightedItem: any = 0;
  highlightedSubItem: any = 0;
  
  constructor (
    private http: HttpClient,
  )
  {}

  ngOnInit() {
    this.preparePageData();
  }

  keyPressed(event: any) {
    if (['ArrowDown', 'ArrowUp', 'Return', 'Enter'].includes(event.key)) {
      
      // Down Arrow
      if (event.key === 'ArrowDown') {
        if (this.highlightedItem !== (this.searchResultList.length - 1)) {
          if (this.searchResultList[this.highlightedItem].groups.length === (this.highlightedSubItem + 1)) {
            this.highlightedItem += 1;
            this.highlightedSubItem = 0;
          }
          else {
            this.highlightedSubItem += 1;
          }
        }
        else {
          if (this.searchResultList[this.highlightedItem].groups.length === (this.highlightedSubItem + 1)) {
            this.highlightedItem = 0;
            this.highlightedSubItem = 0;
          }
          else {
            this.highlightedSubItem += 1;
          }
        }
      }

      // Up Arrow
      if (event.key === 'ArrowUp') {
        if (this.highlightedItem !== 0) {
          if (this.highlightedSubItem !== 0) {
            this.highlightedSubItem -= 1;
          }
          else {
            this.highlightedItem -= 1;
            this.highlightedSubItem = this.searchResultList[this.highlightedItem].groups.length - 1;
          }
        }
        else {
          if (this.highlightedSubItem === 0) {
            this.highlightedItem = (this.searchResultList.length - 1);
            this.highlightedSubItem = this.searchResultList[this.highlightedItem].groups.length - 1;
          }
          else {
            this.highlightedSubItem -= 1;
          }
        }
      }

      // Enter Button
      if (event.key === 'Enter') {
        this.openLink(this.searchResultList[this.highlightedItem].groups[this.highlightedSubItem].url);
      }
    }
  }

  preparePageData() {
    this.http.get('../assets/data.js', { responseType: 'text' }).subscribe(data2 => { 
      let splitData = data2.split(' = ');
      this.originalProjectsList = JSON.parse(splitData[1]);
      this.searchResultList = JSON.parse(splitData[1]);
    });
  }

  openLink(link: string) {
    window.open(link, "_blank");
  }

  checkProject(project: any) {
    let groupNames = project.groups.map((item: any) => item.name).join(',');
    return project.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
            groupNames.toLowerCase().includes(this.searchText.toLowerCase());
  }

  checkGroup(groupName: string) {
    return groupName.toLowerCase().includes(this.searchText.toLowerCase());
  }

}
