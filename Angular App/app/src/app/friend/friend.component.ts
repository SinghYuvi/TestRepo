import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { FriendService } from '../Shared/friend.service';
import { Friend } from '../Shared/friend.model';

declare var M: any;

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css'],
  providers: [FriendService] 
})
export class FriendComponent implements OnInit {

  constructor(public friendService:FriendService) { }

  ngOnInit() {
     this.resetForm();
     this.refreshFriendList();
  }

    resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.friendService.selectedFriend = {
      _id:"",
      FriendID: null,
      FriendName: "",
      Place: "",
    }
  }

  onSubmit(form: NgForm) {
   if(form.value._id == ""){
      this.friendService.postFriend(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshFriendList();
        M.toast({ html: 'Saved successfully', classes: 'rounded' });
      });
    }
    else{
      this.friendService.putFriend(form.value).subscribe((res) =>{
      this.resetForm(form);
      this.refreshFriendList();
      M.toast({ html: 'Updated successfully', classes: 'rounded' });
    });
    }
  }

  refreshFriendList() {
    this.friendService.getFriendList().subscribe((res) => {
      this.friendService.Friends = res as Friend[];
    });
  }

  onDelete(_id:string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.friendService.deleteFriend(_id).subscribe((res) => {
        console.log(res);
        this.refreshFriendList();
        this.resetForm(form);
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      }); 
    }
  }

  onEdit(frnd: Friend) {
  this.friendService.selectedFriend = frnd;
  }

}