import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Member, Response } from "./member";
import { environment } from '../environments/environment';

@Injectable()
export class MemberService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Response>(`${environment.apiURL}/member`);
    }

    getOne(id: number) {
        return this.http.get<Response>(`${environment.apiURL}/member/${id}`);
    }

    update(id: number, payload: Member) {
        return this.http.put<Response>(`${environment.apiURL}/member/${id}`, payload);
    }

    add(payload: Member) {
        return this.http.post<Response>(`${environment.apiURL}/member`, payload);
    }

    delete(id: number) {
        return this.http.delete<Response>(`${environment.apiURL}/member/${id}`);
    }
}