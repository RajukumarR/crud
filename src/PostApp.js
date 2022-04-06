import axios from "axios";
import React from "react";
import { Table, Button, Form } from "react-bootstrap";
const API_URL = "https://jsonplaceholder.typicode.com/posts";
class PostApp extends React.Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      id: "",
      userId: "",
      title: "",
      body: "",
    };
  }
  componentDidMount = () => {
    this.getPosts();
  };
  getPosts = async () => {
    try {
      const { data } = await axios.get(API_URL);
      this.setState({ posts: data });
    } catch (err) {
      console.error(err);
    }
  };
  createPost = async () => {
    try {
      const { userId, title, body } = this.state;
      const { data } = await axios.post(API_URL, {
        userId,
        title,
        body,
      });
      let posts = [...this.state.posts];
      posts.push(data);
      this.setState({ posts, userId: "", title: "", body: "" });
    } catch (err) {
      console.error(err);
    }
  };
  updatePost = async () => {
    try {
      const { id, userId, title, body, posts } = this.state;
      const { data } = await axios.put(`${API_URL}/${id}`, {
        userId,
        title,
        body,
      });
      const index = posts.findIndex((post) => post.id === id);
      posts[index] = data;

      this.setState({ posts, id: "", userId: "", title: "", body: "" });
    } catch (err) {
      console.error(err);
    }
  };
  deletePost = async (postId) => {
    try {
      await axios.delete(`${API_URL}/${postId}`);

      let posts = [...this.state.posts];
      posts = posts.filter(({ id }) => id !== postId);

      this.setState({ posts });
    } catch (e) {
      console.error(e);
    }
  };
  selectPost = (post) => {
    this.setState({ ...post });
  };
  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
    if (this.state.id) {
      this.updatePost();
    } else {
      this.createPost();
    }
  };
  render() {
    return (
      <>
        <h1>Welcome</h1>
        <Form onSubmit={this.handleSubmit}>
          <label> UserId :  </label>
          <input
            type="number"
            name="userId"
            value={this.state.userId}
            onChange={this.handleChange}
          />
          <label> Title :  </label>
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <label> Body :  </label>
          <input
            type="text"
            name="body"
            value={this.state.body}
            onChange={this.handleChange}
          />
          <input type="submit" />
        </Form>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>User ID</th>
              <th>Title</th>
              <th>Body</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((post) => {
              return (
                <tr key={post.id}>
                  <td>{post.id}</td>
                  <td>{post.userId}</td>
                  <td>{post.title}</td>
                  <td>{post.body}</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      onClick={() => this.selectPost(post)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline-primary"
                      onClick={() => this.deletePost(post.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </>
    );
  }
}

export default PostApp;
