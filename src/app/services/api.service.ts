import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as decodeJwt from "jwt-decode";
import { BlockerService } from "./blocker.service";
import { AccountService } from './account.service';

@Injectable()
export class ApiService {

    apiUrl = "http://localhost:8080/laceApi/";

    constructor(private http: HttpClient, private blocker: BlockerService) { }

    async post(endpoint: String, body: any = {}, blocks: Array<string> = []) {
        this.blocker.block(blocks);
        
        return new Promise<any>(resolve => {
            this.http.post<any>(this.apiUrl + endpoint, JSON.stringify(body), {
                headers: new HttpHeaders().append('LBT', 'LBTokenBearer ' + localStorage.getItem("lbt"))
            }).subscribe(
                response => {
                    //this.handleApiResponse(response, surpressErrors);
                    resolve(response);
                    this.blocker.unblock(blocks);
                },
                error => {
                    console.log(error);
                    this.blocker.unblock(blocks);
                    // this.handleApiResponse(error, surpressErrors);
                }
            );
        });
    }

    get(endpoint: String, blocks: Array<string> = []) {
        this.blocker.block(blocks);
        return new Promise<any>(resolve => {
            this.http.get<any>(this.apiUrl + endpoint, {
                headers: new HttpHeaders().append('LBT', 'LBTokenBearer ' + localStorage.getItem("lbt"))
            }).subscribe(
                response => {
                    resolve(response);
                    this.blocker.unblock(blocks);
                },
                error => {
                    console.log(error);
                    this.blocker.unblock(blocks);
                }
            );
        });
    }

    delete(endpoint: String, blocks: Array<string> = []) {
        this.blocker.block(blocks);
        return new Promise<any>(resolve => {
            this.http.delete(this.apiUrl + endpoint).subscribe(
                response => {
                    resolve(response);
                    this.blocker.unblock(blocks);
                },
                error => {
                    console.log(error);
                    this.blocker.unblock(blocks);
                }
            );
        })
    }

    getToken() {
        try {
            if (localStorage.getItem("lbt")) {
                var token = localStorage.getItem("lbt");
                if (token == null || token == undefined || token == "") {
                    return null;
                }
                return decodeJwt(token);
            } else {
                return null;
            }
        }
        catch (err) {
            return null;
        }
    }

    getHttpOptions() {
        return {
            observe: "response" as 'response',
            headers: new HttpHeaders()
                .set("Content-Type", "application/json; charset=utf-8")
                .set("Authorization", "Bearer " + localStorage.getItem("lbt"))
        };
    }

    async refreshToken() {
        let token = this.getToken();
        if (token != null || token != undefined) {
            token = await this.post("token/refresh-token", { Account: token.info.token.account, Wishlist: token.info.token.wishlist, Cart: token.info.token.cart });
        } else {
            token = await this.requestNewToken();
        }
        this.storeToken(token);
        return token;
    }

    async requestNewToken() {
        let token = await this.get("token/request-token");
        this.storeToken(token);
        return token;
    }

    async checkTokenForRefresh() {
        let token = this.getToken();
        if (token == null) {
            await this.requestNewToken();
            console.log("Requesting Token");
        } else {
            let expiry = token.exp;
            let current = Date.now() / 1000;
            if (expiry < current) {
                await this.refreshToken();
                console.log("Refreshing Token");
            } else {
                return null;
            }
        }
    }

    storeToken(token) {
        localStorage.setItem("lbt", token);
    }
}