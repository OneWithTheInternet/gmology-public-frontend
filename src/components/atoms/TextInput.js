function TextField(props) {
    return <div className="commentInput">
        <textarea name="feedback" placeholder={props.placeholder} required></textarea>
    </div>
}

export default TextField