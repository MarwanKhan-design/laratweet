import React, { Component } from "react";
import axios from "axios";

export class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            body: "",
            posts: [],
            loading: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.renderPosts = this.renderPosts.bind(this);
    }

    getPosts() {
        // this.setState({ loading: true });
        axios.get("/posts").then(response =>
            this.setState({
                posts: [...response.data.posts]
                // loading: true
            })
        );
    }

    componentWillMount() {
        this.getPosts();
        // console.log("Working");
    }
    componentDidMount() {
        this.interval = setInterval(() => {
            this.getPosts();
        }, 1000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    handleChange(e) {
        this.setState({
            body: e.target.value
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        // this.postData();
        axios
            .post("/posts", {
                body: this.state.body
            })
            .then(res => {
                this.setState({
                    posts: [res.data, ...this.state.posts],
                    body: ""
                });
            });
        this.setState({
            body: ""
        });
    }
    postData() {
        axios.post("/posts", {
            body: this.state.body
        });
    }
    renderPosts() {
        return this.state.posts.map(post => (
            <div key={post.id} className="media">
                <div className="media-left">
                    <img src={post.user.avatar} className="media-object mr-2" />
                </div>
                <div className="media-body">
                    <div className="user">
                        <a href={`/users/${post.user.username}`}>
                            <b>
                                {post.user.username} - {post.humanCreatedAt}
                            </b>
                        </a>
                    </div>
                    <p>{post.body}</p>
                </div>
            </div>
        ));
    }
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">Tweet Something</div>

                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <textarea
                                            className="form-control"
                                            rows="5"
                                            maxLength="140"
                                            value={this.state.body}
                                            placeholder="Whats up..."
                                            onChange={this.handleChange}
                                            required
                                        ></textarea>
                                    </div>
                                    <input
                                        type="submit"
                                        value="Post"
                                        className="form-control"
                                        onClick={this.handleSubmit}
                                    ></input>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">Recent Tweets</div>

                            <div className="card-body">
                                {!this.state.loading
                                    ? this.renderPosts()
                                    : "Loading"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
