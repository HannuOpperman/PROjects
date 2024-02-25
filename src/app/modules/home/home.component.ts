import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { DataFile } from './../../../app/data.js';

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
  
  constructor (
    private http: HttpClient,
  )
  {}

  ngOnInit() {
    this.preparePageData();
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

  checkSearchText() {
    console.log(this.searchText);
    console.log(this.searchBoxClass);
  
    debugger;

    this.searchBoxClass = 'dropdown-toggle';
  }

}
