import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom';
import CommentPage from '../CommentPage/CommentPage';
export default class PostPage extends Component {
  constructor(props) {
    super(props);
  }

  logoutHandler(){
    localStorage.removeItem('id');
  }

  render() {
    return (
      <div className="post_container">
        <div className="post_update disp_inliFl">
          <div className="user_image">
            <img src={'https://scontent.fdel1-1.fna.fbcdn.net/v/t1.0-9/6995_4512611206120_364122604_n.jpg?oh=9993d830cf16bd7eb898ed811048e2af&oe=5A23C377'}  alt="na"></img>
          </div>
          <div className="user_details">
            <div className="post_username">Rijul Zalpuri</div>
            <div className="loc_time_container disp_inliFl">
              <div>{(new Date).toDateString()}</div>
              <div className="post_location">Hyderabad</div>
            </div>
          </div>
          <div className="logout_button">
            <Link to="/"><button onClick={this.logoutHandler.bind(this)}>Logout</button></Link>
          </div>
        </div>
        <div className="post">I Have Good News And Bad News To Tell You. The Bad News? I Have No Good News. And The Good News? I Have No Bad News.
          Well I could agree with you, but then we’d both be wrong. So great power comes with great electricity bills.
        </div>
        <CommentPage/>
      </div>
    )
  }
};
