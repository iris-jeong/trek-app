import { Form, useLoaderData, useParams } from "react-router-dom";

export default function Comments() {
  const comments = useLoaderData();
  const params = useParams();
  const postId = params.id;

  console.log(params);

  return (
    <ol>
      {comments.map((comment) => {
        return (
          <li key={comment.id}>
            {comment.comment}

            <Form method="post" action={`/comments/${comment.id}/destroy`}>
              <input type="hidden" name="postId" value={postId} />
              <button type="submit" className="btn btn-sm btn-danger">
                Delete
              </button>
            </Form>
          </li>
        );
      })}
    </ol>
  );
}
