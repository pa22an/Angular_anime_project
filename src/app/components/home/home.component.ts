import { Anime, APIResponse } from './../../model';
import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public sort!: string;
  public animedata!: Array<Anime>;
  public animelists!: Array<Anime>;
  public topanimelists: Array<Anime> = [];
  public topanimedata: any;
  private routeSub!: Subscription;
  private topSub!: Subscription;
  private animeSub!: Subscription;
  private errorinClient: any;

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.getAnimePopularity();
    this.searchAnimes('one')
  }
  
  onSubmit(form: NgForm) {
    console.log('submit')
    console.log(form.value.search)
    this.routeSub = this.httpService
      .getSearchAnimeList(form.value.search)
      .subscribe((animeList: APIResponse<Anime>) => {
        this.animelists = animeList.results;
        console.log(animeList, 'submit');
        console.log(form.value.search)
        console.log(this.animelists, 'submitdatasear')
      });

    form.value.search = "";
  }

  searchAnimes(sort: string, search?: string): void {
    console.log('search')
    this.animeSub = this.httpService
      .getSearchAnimeList(sort, search)
      .subscribe((animeList: APIResponse<Anime>) => {
        this.animelists = animeList.results;
        console.log(animeList, 'search');
        console.log(sort, search)
        console.log(this.animelists, 'searchdatasear')
      });
  }

  getAnimePopularity(): void {
    console.log('top')
    this.topSub = this.httpService
      .getTopAnime()
      .subscribe((topAnimeList: Anime) => {
        this.topanimelists.push(topAnimeList);
        this.topanimedata = Object.values(this.topanimelists[0])[3];
        this.topanimedata = this.topanimedata.slice(0, 5);
        console.log(topAnimeList, 'toplist');
        console.log(this.topanimedata, 'topdataseardata')
      });
  }

  ngOnDestroy(): void {
    if (this.animeSub) {
      this.animeSub.unsubscribe();
    }

    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }

    if (this.topSub) {
      this.routeSub.unsubscribe();
    }
  }
}
