import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger, state } from '@angular/animations';
import { timer } from '../../../node_modules/rxjs';
import { DataService } from '../data/data.service';
import { Team } from '../bean/team';
import { Teamgoods } from '../bean/teamgoods';
import { MatTabChangeEvent } from '../../../node_modules/@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-team',
    templateUrl: './team.component.html',
    styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

    items = ["手机", "笔记本平板", "智能家居"];
    isShowAll: boolean = true;
    typelist$: Object;
    isHideGood: Array<boolean> = new Array<boolean>();
    TeamGoodsList$: Array<Teamgoods> = new Array<Teamgoods>();
    TeamGoodsListByType$: Array<Teamgoods> = new Array<Teamgoods>();
    catagory = "";
    teamId: String;
    tgId: String;
    date: number;
    phone: number;
    isLogin: boolean;
    constructor(private data: DataService, private activatedRoute: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        this.date = new Date().getTime();
        this.data.checklogin().subscribe(
            result => {
                this.phone = result["data"];
                this.isLogin = result["status"];
                if (this.isLogin) {
                    this.data.getAllTeamGoods().subscribe(
                        result => {
                            this.TeamGoodsList$ = result["data"];
                            for (let i = 0; i < this.TeamGoodsList$.length; i++) {
                                if (this.date >= +this.TeamGoodsList$[i].date) {
                                    this.isHideGood[i] = false;
                                } else {
                                    this.isHideGood[i] = true;
                                }
                            }
                        }
                    );
                } else {
                    //未登录
                    this.router.navigate(["login"]);
                }
            }
        );

    }

    showAll() {
        this.isShowAll = true;
    }

    hideAll() {
        this.isShowAll = false;
    }

    /**
     * 
     * @param index 
     */
    showTeamGoods(index) {
        this.date = new Date().getTime();
        this.isShowAll = false;
        this.catagory = this.items[index];
        console.log(this.catagory);
            this.data.getTeamGoods(this.catagory).subscribe(
                result => {
                    this.TeamGoodsListByType$ = result["data"];
                    for (let i = 0; i < this.TeamGoodsListByType$.length; i++) {
                        if (this.date >= +this.TeamGoodsListByType$[i].date) {
                            this.isHideGood[i] = false;
                        } else {
                            this.isHideGood[i] = true;
                        }
                    }
                }
            );
    }

    /**
     * tab转换事件
     * @param tabChangeEvent 
     */
    tabChanged(tabChangeEvent: MatTabChangeEvent) {
        console.log('tabChangeEvent => ', tabChangeEvent);
        console.log('index => ', tabChangeEvent.index);
        if (tabChangeEvent.index != 0) {
            this.showTeamGoods(tabChangeEvent.index - 2);
        }
    }
    showalert(i) {
        window.location.href = '/#/teamgood/' + i;
    }
}