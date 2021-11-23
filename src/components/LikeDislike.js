// import cx from 'classnames';
import { Component } from 'react';

export default class LikeDislike extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numLikes: 100,
      numDislikes: 25,
      isLiked: false,
      isDisliked: false,
    };
    this.handleLike = this.handleLike.bind(this);
    this.handleDislike = this.handleDislike.bind(this);
  }

  handleLike() {
    if (this.state.isLiked == false && this.state.isDisliked == false) {
      this.setState({
        ...this.state,
        isLiked: true,
        numLikes: this.state.numLikes + 1,
      });
    } else if (this.state.isLiked == true && this.state.isDisliked == false) {
      this.setState({
        ...this.state,
        isLiked: false,
        numLikes: this.state.numLikes - 1,
      });
    } else if (this.state.isLiked == false && this.state.isDisliked == true) {
      this.setState({
        ...this.state,
        isLiked: true,
        isDisliked: false,
        numLikes: this.state.numLikes + 1,
        numDislikes: this.state.numDislikes - 1,
      });
    }
  }

  handleDislike() {
    if (this.state.isLiked == false && this.state.isDisliked == false) {
      this.setState({
        ...this.state,
        isDisliked: true,
        numDislikes: this.state.numDislikes + 1,
      });
    } else if (this.state.isLiked == true && this.state.isDisliked == false) {
      this.setState({
        ...this.state,
        isLiked: false,
        isDisliked: true,
        numLikes: this.state.numLikes - 1,
        numDislikes: this.state.numDislikes + 1,
      });
    } else if (this.state.isLiked == false && this.state.isDisliked == true) {
      this.setState({
        ...this.state,
        isDisliked: false,
        numDislikes: this.state.numDislikes - 1,
      });
    }
  }

  render() {
    return (
      <>
        <div>
          <span className='likes-counter'>
            <button className='like-button' onClick={this.handleLike}>
              {'Like | ' + this.state.numLikes}
            </button>
          </span>
          <span className='dislikes-counter'>
            <button className='dislike-button' onClick={this.handleDislike}>
              {'Dislike | ' + this.state.numDislikes}
            </button>
          </span>
        </div>
        <style>{`
                          .like-button, .dislike-button {
                              font-size: 1rem;
                              padding: 5px 10px;
                              color:   #585858;
                          }
      
                          .liked, .disliked {
                              font-weight: bold;
                              color: #1565c0;
                          }
                      `}</style>
      </>
    );
  }
}
