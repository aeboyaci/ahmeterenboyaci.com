import React from "react";
import Link from "next/link";

const PostCard = ({imageUrl, title, description, postedAt}) => {
    const url = `/blog/post/${title}`;

    return (
        <React.Fragment>
            <div className="col-md-4 col-sm-12">
                <div className="card mb-4 shadow-sm">
                    <img
                        src={imageUrl}
                        className="card-img-top w-100"
                        height="225"
                        width={"auto"}
                        alt="Post resmi"
                    />
                    <div className="card-body">
                        <h4>{title}</h4>
                        <p style={{textAlign: "justify"}} className="card-text ellipsis">{description}</p>
                        <div className="d-flex justify-content-between align-items-center">
                            <small className="text-muted">{postedAt}</small>
                            <div className="btn-group">
                                <Link href={url}>
                                    <a className="btn btn-outline-primary">
                                        Devamını oku
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default PostCard;
