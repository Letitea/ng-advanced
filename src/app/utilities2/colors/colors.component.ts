import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.css']
})
export class ColorsComponent implements OnInit {

  constructor(private router:Router,private route:ActivatedRoute) { }
  type:string|null='';
  name:string|null='';
  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      this.type=params.get('type');
    })
    this.route.queryParamMap.subscribe(param => {
      this.name = param.get('name');
    });
  }

  onTypeChange(action:string){

    switch(action){
      case '+':
        this.router.navigate(['/utilities/color',parseInt(this.type?this.type:'0')+1],{
          queryParamsHandling:'preserve',
          relativeTo:this.route
        });
        break;
      case '-':
        this.router.navigate(['/utilities/color',parseInt(this.type?this.type:'0')-1],{
          queryParamsHandling:'preserve',
          relativeTo:this.route
        });
        break;
    }
  }
}
