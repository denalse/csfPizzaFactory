import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  email!: string | null
  // emailURL!: string


  constructor(private router: Router, private ar: ActivatedRoute) { }

  ngOnInit(): void {
    this.email = this.ar.snapshot.paramMap.get("email"); // Snapshot param
  }

}
