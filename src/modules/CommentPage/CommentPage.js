
import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom';
import ReactDOM from 'react-dom';
import MainCommentThread from './MainCommentThread';

let CommentIndex = ''
let CommentStatic = []
export default class CommentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentInput: '',
      postComments: [],
      replyBox: false,
      editreplyBox: false
    }
    this.CommentBinder = this.CommentBinder.bind(this);
    this.componentCleanup = this.componentCleanup.bind(this);
  }

  componentDidMount() {
    if(localStorage.getItem('Comments')){
      CommentStatic=JSON.parse(localStorage.getItem('Comments'))
      
    }
    window.addEventListener('beforeunload', this.componentCleanup);
    this.setState({postComments: CommentStatic})

   ReactDOM.findDOMNode(this.refs.comment).focus();
  }

  componentWillUnmount() {
        window.removeEventListener('beforeunload', this.componentCleanup); // remove the event handler for normal unmounting
    }

    componentCleanup() {
      console.log('xx')
   localStorage.setItem('Comments',JSON.stringify(CommentStatic))
    }

  CommentRemover(index) {
    if(CommentStatic[index].reply.replyByUser.id==localStorage.getItem('id')){
      CommentStatic.splice(index, 1)
    this.forceUpdate()
      

    } else{
      alert("No cheating, login from id and then delete")
    }
    
  }
  CommentLike(index) {
    CommentStatic[index].like_count++;
    this.forceUpdate()    
  }

  ReplyLike(index1, index2) {
    CommentStatic[index1].reply.replyToReply[index2].like_count++;
    this.forceUpdate()
    
  }
  shouldComponentUpdate(a,b){
    console.log('x')
    this.forceUpdate()
    return true
  }

  ReplyRemover(index1, index2) {
    if(CommentStatic[index1].reply.replyToReply[index2].replyToReplyByUser.id==localStorage.getItem('id')){
      CommentStatic[index1].reply.replyToReply.splice(index2, 1)
    this.forceUpdate()
      
    } else{
      alert("You cant delete this")
    }
    
  }

  savingComment(e, y){
    console.log(e.target.value);
    this.setState({commentInput: e.target.value})
  }

  CommentBinder(e,a,c) {
    if (e.charCode == '13') {
      if (this.refs.comment.value || a=='CommentEdit') {
        var startIndex= a=='CommentEdit'?c:0
        var ReplaceNoOfItems= a=='CommentEdit'?1:0
        CommentStatic.splice(startIndex, ReplaceNoOfItems, {
          "reply": {
            "rep_id": "1",
            "replyData": this.state.commentInput,
            "replyByUser": {
              "id": localStorage.getItem("id"),
              "name": localStorage.getItem("name"),
              "userImg": localStorage.getItem("img_url")
            },
            "replytime": (new Date()).toDateString,
            "replyToReply": []
          },
          "like_count": 0,
          "edit": false
        })
        this.setState({replyBox: false})
        this.refs.comment.value = ''
        this.refs.comment.blur()
        
      }
    }
  }

  HandleReply(e, a, c, d,f) {
    console.log(e,"1", a,"3", c, "4", d,f)
    if (e == '13') {
      if (a=='ReplyToReply' || a.refs.Reply.value) {
        var startIndex= a=='ReplyToReply'?c:0
        var ItemToRemove= a=='ReplyToReply'?1:0
        var ComentMainLoopIndex = a=='ReplyToReply'?f:c
        CommentStatic[ComentMainLoopIndex].reply.replyToReply.splice(startIndex, ItemToRemove, {
          "like_count": 0,
          "rep_tor_id": "111",
          "replyToReplyData": a=='ReplyToReply'?d:a.refs.Reply.value,
          "replyToReplyByUser": {
            "id": localStorage.getItem("id"),
            "name": localStorage.getItem("name"),
            "userImg": localStorage.getItem("img_url")
          }
        })
        this.setState({editreplyBox: false});
        ;
      }
    }
  }

  render() {
    var comments = CommentStatic.map((item, index) => {
      return <MainCommentThread CommentStatic={CommentStatic} ReplyBox={this.state.ReplyBox} EditreplyBox={this.state.editreplyBox} SavingComment = {this.savingComment.bind(this)}  ReplyLike={this.ReplyLike.bind(this)} CommentBinder={this.CommentBinder.bind(this)} CommentLike={this.CommentLike.bind(this)} ReplyRemover={this.ReplyRemover.bind(this)} CommentRemover={this.CommentRemover.bind(this)} OnCommentKeyPress={this.HandleReply.bind(this)} item={item} index={index} key={index}/>
    })
    return (
      <div className="comment_container">
        <input type="text" placeholder="Write a comment..." ref="comment" onChange={this.savingComment.bind(this)} onKeyPress={this.CommentBinder}></input>
        <div>
          {comments}
        </div>
      </div>
    )
  }
};

