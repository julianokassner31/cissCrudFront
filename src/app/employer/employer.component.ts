import { Employer } from './../model/Employer';
import { EmployerService } from './../services/employer.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.scss']
})
export class EmployerComponent implements OnInit {

  employer: Employer;

  constructor(
    private route: ActivatedRoute,
    private employerService: EmployerService) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.employerService.getEmployer(id).subscribe(emp => this.employer = emp);
  }
}
