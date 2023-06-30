import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {formatDistanceToNow} from 'date-fns'

import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {name: '', comment: '', commentsList: []}

  deleteComment = id => {
    const {commentsList} = this.state
    this.setState({
      commentsList: commentsList.filter(comment => comment.id !== id),
    })
  }

  toggleLike = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, isLiked: !eachItem.isLiked}
        }
        return eachItem
      }),
    }))
  }

  displayCommentsList = () => {
    const {commentsList} = this.state

    return commentsList.map(eachComment => (
      <CommentItem
        commentDetails={eachComment}
        key={eachComment.id}
        toggleLike={this.toggleLike}
        deleteComment={this.deleteComment}
      />
    ))
  }

  onAddComment = event => {
    event.preventDefault()
    const {name, comment} = this.state
    const backGroundClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const newComment = {
      id: uuidv4(),
      name,
      comment,
      date: formatDistanceToNow(new Date()),
      isLiked: false,
      backGroundClassName,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      name: '',
      comment: '',
    }))
  }

  getNameInput = event => this.setState({name: event.target.value})

  getComment = event => this.setState({comment: event.target.value})

  render() {
    const {commentsList, name, comment} = this.state
    return (
      <div className="bg-container">
        <div className="app-container">
          <h1 className="heading">Comments</h1>
          <div className="comments-inputs">
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
              className="comments-img"
            />
            <form className="input-elements" onSubmit={this.onAddComment}>
              <p className="description">
                Your Comments on failing of this Generation
              </p>
              <input
                type="text"
                className="name input"
                placeholder="Your Name"
                value={name}
                onChange={this.getNameInput}
              />
              <textarea
                className="input"
                placeholder="Your Comment"
                rows="7"
                value={comment}
                onChange={this.getComment}
              />
              <button type="submit" className="add-button">
                Add Comment
              </button>
            </form>
          </div>
          <hr className="line" />
          <p className="comments-count">
            <span className="count">{commentsList.length}</span> Comments
          </p>
          <ul className="comments-list">{this.displayCommentsList()}</ul>
        </div>
      </div>
    )
  }
}

export default Comments
