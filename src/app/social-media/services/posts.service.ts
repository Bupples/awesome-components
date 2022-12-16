import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Post } from "../models/post.model";

@Injectable()
export class PostsService {
    constructor(private http: HttpClient) { }

    public getPosts(): Observable<Post[]> {
        return this.http.get<Post[]>(`${environment.apiUrl}/posts`);
    }

    public addNewComment(postCommented: { comment: string, postId: number}): void {
        console.log(postCommented);
    }
}
