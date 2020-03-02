import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Friend } from './friend.model';

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  selectedFriend: Friend;
  Friends: Friend[];

  readonly baseURL = 'http://localhost:3000/Friends/list';
  readonly baseURLCreate = 'http://localhost:3000/Friends/create';
  readonly baseURLUpdate = 'http://localhost:3000/Friends/update';
  readonly baseURLDelete = 'http://localhost:3000/Friends/delete';

  constructor(private http: HttpClient) {
   
   }

  postFriend(frnd: Friend) {
    return this.http.post(this.baseURLCreate, frnd);
  }

  getFriendList() {
    return this.http.get(this.baseURL);
  }

  putFriend(frnd: Friend) {
    return this.http.put(this.baseURLUpdate + `/${frnd._id}`, frnd);
  }

  deleteFriend(_id:string) {
    return this.http.delete(this.baseURLDelete + `/${_id}`);
  }

}
