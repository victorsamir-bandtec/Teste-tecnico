interface PostsDTO {
  title: string;
  content: string;
  user_id: number;
  id: number;
  comments: CommentDTO[];
}

interface CommentDTO {
  content: string;
  id: number;
  user_id: number;
}
