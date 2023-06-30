import './index.css'

const CommentItem = props => {
  const {commentDetails, toggleLike, deleteComment} = props
  const {id, name, comment, date, isLiked, backGroundClassName} = commentDetails

  const likeImage = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const likeColor = isLiked ? 'active' : ''

  const clickLike = () => {
    toggleLike(id)
  }

  const onDelete = () => {
    deleteComment(id)
  }

  return (
    <li className="comment-item">
      <div className="comment-container">
        <div className={backGroundClassName}>
          <p className="initial">{name[0].toUpperCase()}</p>
        </div>
        <div>
          <div className="username-container">
            <p className="username">{name}</p>
            <p className="time">{date}</p>
          </div>
          <p className="comment">{comment}</p>
        </div>
      </div>
      <div className="buttons-container">
        <div className="like-container">
          <img src={likeImage} alt="like" className="like-image" />
          <button
            type="button"
            className={`button ${likeColor}`}
            onClick={clickLike}
          >
            Like
          </button>
        </div>
        <button
          type="button"
          className="button"
          onClick={onDelete}
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
            className="delete"
          />
        </button>
      </div>
    </li>
  )
}

export default CommentItem
