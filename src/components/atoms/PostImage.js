function PostImage(props) {
    //Assigning variables to props (with disconstructed syntax). This is the same as "const imageUrlProp = props.imageUrlProp" and "const imageAltTextProp = props.imageAltText"
    const {image_url, image_altText} = props;
    //Returning an image tag using props parameters for attributes
    return <img src={ image_url } alt={ image_altText }/>
}

export default PostImage;